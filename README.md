
# 🕹️ Guess the Word

#### A Category-Based Hangman Game   **:trophy:**

## 🧩 All About the Project  

**"Guess the Word"** 🧠🎯 is a modern twist on the classic Hangman game ✍️, built using **React** ⚛️ and **Vite** ⚡. It challenges players to test their knowledge across various domains 🌍 through an interactive and fast-paced word-guessing experience ⏱️. From programming terms 👨‍💻 to world wonders 🏛️, this game sharpens your brain 🧠 and entertains at the same time! 🎉

Leveraging **React** for dynamic UI 🎨 and **Vite** for blazing-fast development and bundling 🚀, this project is perfect for both learning 📚 and leisure 🕹️, and offers an immersive and interactive gameplay experience while reinforcing amazing recognition skills 🌟.

## 🎮 Gameplay Mechanism
 **🧠 Word Selection**: Randomly select a word from one of the available categories:

  - Programming Languages
  - Programming Terms
  - Wonders of the World
  - Programming Fields
  - Business Buzzwords
  - Cybersecurity Terms
  - Tools Used in Software  

 **🎯 Guessing Mechanism**: Players guess letters through an interactive interface. Incorrect guesses reduce the number of remaining attempts.


## **🏆 Win/Loss Conditions**:

>  `Word Selection`: 
>  Randomly select a word from a predefined list or database.

>  `Additional Hint`: 
>  Make use of hints given below the block to guess the right word **:smiley:**.

>  `Guessing Mechanism`: 
>  Allow players to guess letters one at a time through an interactive interface. Incorrect guesses deduct from available attempts.  

>  `Win/Loss Conditions`: 
>  Declare victory if the player guesses the programming language within a specified number of attempts. End the game if the attempts exceed the maximum limit. 


## 🚀 How to Run This Project Locally 

1.  **Clone the repository**

```bash

git clone https://github.com/smw-1211/Hangman

cd Hangman

``` 

2.  **Install dependencies**

```bash

npm i

``` 

3.  **Start the development server**

```bash

npm run dev

```  

4.  **Open in browser**
Navigate to `http://localhost:5173` (or the terminal-specified URL) to start playing!

---

## 📁 Project Structure Highlights

-  `src/`: Reusable UI components like `KeyEntry`, `Word` and `App`, etc.

-  `public/data/`: Word lists organized by category in json format.

-  `public/img/`: Asset files used as background for each category.

-  `src/App.tsx`: Core game logic and UI structure.

-  `vite.config.js`: Vite configuration for efficient bundling.

  
## 🤝 Contributions
Contributions are welcome! Feel free to fork the repo, make changes, and submit a PR **:smiley:**.