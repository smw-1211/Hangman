type HangmanWordProps = {
  guessedLetters: string[]
  wordToGuess: string
  reveal?: boolean
}

export function HangmanWord({
  guessedLetters,
  wordToGuess,
  reveal = false,
}: HangmanWordProps) {
  return (
    <div
      style={{
        display: "flex",
        gap: ".25em",
        fontSize: "6rem",
        fontWeight: "bold",
        textTransform: "uppercase",
        fontFamily: "monospace",
      }}
    >
      {wordToGuess.split("").map((letter, index) => {
        const lowerLetter = letter.toLowerCase()
        const isGuessed = guessedLetters.includes(lowerLetter)

        return (
          <span style={{ borderBottom: ".1em solid azure" }} key={index}>
            <span
              style={{
                visibility: isGuessed || reveal ? "visible" : "hidden",
                color: !isGuessed && reveal ? "red" : "azure",
              }}
            >
              {letter}
            </span>
          </span>
        )
      })}
    </div>
  )
}
