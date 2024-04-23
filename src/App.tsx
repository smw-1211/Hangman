import { useCallback, useEffect, useState } from 'react'
import words from './assets/data/codeList.json'
import {Keyboard} from './KeyEntry'
import {HangmanWord} from './Word'
import "./assets/styles/styles.css"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function getWord() {
  return words[Math.floor(Math.random() * words.length)]
}

function App() {
  const [wordToGuess, setWordToGuess] = useState(getWord)
  const [guessedLetters, setGuessedLetters] = useState<string[]>([])

  const incorrectLetters = guessedLetters.filter(
    ( letter: any) => !wordToGuess.includes(letter)
  )

  const isLoser = incorrectLetters.length >= 6
  const isWinner = wordToGuess
    .split("")
    .every((letter: any) => guessedLetters.includes(letter))

  const addGuessedLetter = useCallback(
    (letter: string) => {
      if (guessedLetters.includes(letter) || isLoser || isWinner) return

      setGuessedLetters((currentLetters: any) => [...currentLetters, letter])
    },
    [guessedLetters, isWinner, isLoser]
  )

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key
      if (!key.match(/^[a-z]$/)) return

      e.preventDefault()
      addGuessedLetter(key)
    }

    document.addEventListener("keypress", handler)

    return () => {
      document.removeEventListener("keypress", handler)
    }
  }, [guessedLetters])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key
      if (key !== "Enter") return

      e.preventDefault()
      setGuessedLetters([])
      setWordToGuess(getWord())
    }

    document.addEventListener("keypress", handler)

    return () => {
      document.removeEventListener("keypress", handler)
    }
  }, [])

  //show the success msg
  useEffect(() => {
    if (isWinner) {
      toast.success("Yippee you got it right!!!   Refresh to play again.", { autoClose: 1500, position: "top-right" })
    }
  }, [isWinner]);

  //show the error msg
  useEffect(() => {
    if (isLoser) {
      toast.error(`Nice Try... Answer was ${wordToGuess} -- Refresh to try again`, { autoClose: 4000, position: "top-right" })
    }
  }, [isLoser]);

  return (
    <>
    <h1 style={{ color: "azure", textAlign: "center"}}>Guess the programming language</h1>
    <div className="all">
    <div style={{ maxWidth: "800px", display: "flex", flexDirection: "column", gap: "2rem", margin: "0 auto", alignItems: "center"}}>
      <HangmanWord
        reveal={isLoser}
        guessedLetters={guessedLetters}
        wordToGuess={wordToGuess}
      />
      <div style={{ alignSelf: "stretch", width: "780px" }}>
        <Keyboard
          disabled={isWinner || isLoser}
          activeLetters={guessedLetters.filter((letter: any) =>
            wordToGuess.includes(letter)
          )}
          inactiveLetters={incorrectLetters}
          addGuessedLetter={addGuessedLetter}
        />
      </div>
    </div>
    </div>
    <ToastContainer />
    </>
  )
}

export default App
