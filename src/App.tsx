import { useCallback, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {Keyboard} from './KeyEntry'
import {HangmanWord} from './Word'
import "./assets/styles/styles.css"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Type definition for the new word structure
type WordEntry = {
  word: string
  description: string
}

const categories: Record<string, string> = {
  code: '/data/codeList.json',
  jobs: '/data/softwareTitles.json',
  tools: '/data/softwaretools.json',
  cybersecurity: '/data/cybersecurity.json',
  buzzwords: '/data/business-buzzwords.json',
  places: '/data/worldwide-places.json',
  programmingTerms: 'data/programming-terms.json'
}

const getBackgroundImage = (category: string | undefined) => {
  if (!category) return ""
  return `/img/${category}-bg.png`
}

function App() {
  const { category } = useParams()
  const navigate = useNavigate()
  const [wordList, setWordList] = useState<WordEntry[]>([])
  const [wordToGuess, setWordToGuess] = useState<WordEntry | null>(null)
  const [guessedLetters, setGuessedLetters] = useState<string[]>([])

  // Lowercase version of the word for comparison (avoid repeating)
  const normalizedWord = wordToGuess?.word.toLowerCase() || ""

  useEffect(() => {
    if (!category || !categories[category]) {
      navigate("/")
      return
    }

    const loadWords = async () => {
      try {
        const response = await fetch(categories[category])
        const data: WordEntry[] = await response.json()
        setWordList(data)
        const randomEntry = data[Math.floor(Math.random() * data.length)]
        setWordToGuess(randomEntry)
        setGuessedLetters([])  // Reset guesses on new word load
      } catch (err) {
        console.error("Error loading word list:", err)
        toast.error("Failed to load words for this category.")
      }
    }

    loadWords()
  }, [category, navigate])

  // Filter guessed letters that are NOT in the word (case insensitive)
  const incorrectLetters = guessedLetters.filter(
    letter => !normalizedWord.includes(letter)
  )

  // Check if player lost (6 incorrect guesses)
  const isLoser = incorrectLetters.length >= 6

  // Check if player won: every letter in the word has been guessed (case insensitive)
  const isWinner = normalizedWord
    ? normalizedWord.split("").every(letter => guessedLetters.includes(letter))
    : false

  const addGuessedLetter = useCallback(
    (letter: string) => {
      letter = letter.toLowerCase()  // Ensure lowercase
      if (!wordToGuess || guessedLetters.includes(letter) || isLoser || isWinner) return
      setGuessedLetters(curr => [...curr, letter])
    },
    [guessedLetters, isWinner, isLoser, wordToGuess]
  )

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase()
      if (!key.match(/^[a-z]$/)) return
      e.preventDefault()
      addGuessedLetter(key)
    }

    document.addEventListener("keypress", handler)
    return () => document.removeEventListener("keypress", handler)
  }, [addGuessedLetter])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key !== "Enter") return
      e.preventDefault()
      if (wordList.length === 0) return
      setGuessedLetters([])
      const newWord = wordList[Math.floor(Math.random() * wordList.length)]
      setWordToGuess(newWord)
    }

    document.addEventListener("keypress", handler)
    return () => document.removeEventListener("keypress", handler)
  }, [wordList])

  useEffect(() => {
    if (isWinner)
      toast.success("Yippee you got it right!!! Refresh to play again.", { autoClose: 1500 })
  }, [isWinner])

  useEffect(() => {
    if (isLoser && wordToGuess)
      toast.error(`Nice Try... Answer was "${wordToGuess.word}" -- Refresh to try again`, { autoClose: 4000 })
  }, [isLoser, wordToGuess])

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${getBackgroundImage(category)})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          minHeight: "100vh"
        }}
      >
        <h1 style={{ color: "azure", textAlign: "center" }}>
          {`Guess the word from category: ${category}`}
        </h1>
        <Dropdown current={category || ""} />
        <div className="all">
          <div style={{
            maxWidth: "800px",
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            margin: "0 auto",
            alignItems: "center"
          }}>
            {wordToGuess && (
              <>
                <HangmanWord
                  reveal={isLoser}
                  guessedLetters={guessedLetters}
                  wordToGuess={wordToGuess.word}
                />
                <p style={{ color: "lightgray", fontStyle: "italic", marginTop: "-1rem" }}>
                  Hint: {wordToGuess.description}
                </p>
              </>
            )}
            <div style={{ alignSelf: "stretch", width: "780px" }}>
              <Keyboard
                disabled={isWinner || isLoser}
                activeLetters={guessedLetters.filter(l => normalizedWord.includes(l))}
                inactiveLetters={incorrectLetters}
                addGuessedLetter={addGuessedLetter}
              />
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  )
}

export default App

function Dropdown({ current }: { current: string }) {
  const navigate = useNavigate()
  const options = [
    { value: "code", label: "Programming Languages" },
    { value: "jobs", label: "Tech Jobs" },
    { value: "tools", label: "Software Tools" },
    { value: "cybersecurity", label: "Cybersecurity" },
    { value: "buzzwords", label: "Business Buzzwords" },
    { value: "places", label: "World Landmarks" },
    { value: "programmingTerms", label: "Programming Concepts" }
  ];

  return (
    <div style={{ textAlign: "center", marginBottom: "1rem" }}>
      <select
        value={current}
        onChange={(e) => navigate(`/${e.target.value}`)}
        style={{ fontSize: "1rem", padding: "0.5rem" }}
      >
        <option value="" disabled>Select Category</option>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}