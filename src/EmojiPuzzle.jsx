import React, { useState, useEffect } from "react";

const originalPuzzles = [
  { emoji: "The 🦁👑", answer: "The Lion King" },
  { emoji: "👨‍⚕️💔🥃🚬😡", answer: "Kabir Singh" },
  { emoji: "🕷️🧑", answer: "Spider Man" },
  { emoji: "The 🏃‍♂️ And The 😡🔥", answer: "The Fast and the Furious" },
  { emoji: "🌙🕛 in 🇫🇷🗼✨", answer: "Midnight in Paris" },
  { emoji: "🌧️💑🎶", answer: "Aashiqui 2" },
  { emoji: "👧🏼🎀👹😨👻🌘 comes 🏚️", answer: "Annabelle Comes Home" },
];

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const EmojiPuzzle = () => {
  const [puzzles, setPuzzles] = useState([]);
  const [current, setCurrent] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [result, setResult] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    // Shuffle once when the component mounts
    setPuzzles(shuffleArray(originalPuzzles));
  }, []);

  const checkAnswer = () => {
    if (!puzzles.length) return;

    const correct = puzzles[current].answer.toLowerCase().trim();
    const user = userAnswer.toLowerCase().trim();

    if (user === correct) {
      setResult("✅ Correct!");
      setIsCorrect(true);
    } else {
      setResult("❌ Try Again!");
      setIsCorrect(false);
    }
  };

  const nextPuzzle = () => {
    if (!isCorrect || current + 1 >= puzzles.length) return;
    setCurrent((prev) => prev + 1);
    setUserAnswer("");
    setResult("");
    setIsCorrect(false);
  };

  if (!puzzles.length) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-md p-6 rounded-xl shadow-xl w-full max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
        🎬 Guess the Movie Name from Emoji
      </h2>

      <div className="text-4xl mb-4">{puzzles[current].emoji}</div>

      <input
        type="text"
        placeholder="Type the movie name..."
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        className="w-full p-2 rounded-lg border mb-3 text-center"
        disabled={isCorrect}
      />

      <button
        onClick={checkAnswer}
        className={`bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg mr-2 ${
          isCorrect ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={isCorrect}
      >
        Check
      </button>

      <button
        onClick={nextPuzzle}
        className={`bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg ${
          !isCorrect ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={!isCorrect || current + 1 >= puzzles.length}
      >
        Next
      </button>

      <div className="mt-4 text-lg font-bold text-purple-700 dark:text-purple-300">
        {result}
      </div>
    </div>
  );
};

export default EmojiPuzzle;
