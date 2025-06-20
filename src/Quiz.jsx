import React, { useState, useEffect } from "react";

// Original questions (will be shuffled)
// const originalQuestions = [
//   {
//     question: "What is the capital of France?",
//     options: ["Berlin", "Madrid", "Paris", "Lisbon"],
//     answer: "Paris",
//   },
//   {
//     question: "Which language runs in a web browser?",
//     options: ["Java", "C", "Python", "JavaScript"],
//     answer: "JavaScript",
//   },
//   {
//     question: "What does CSS stand for?",
//     options: [
//       "Central Style Sheets",
//       "Cascading Style Sheets",
//       "Cascading Simple Sheets",
//       "Cars SUVs Sailboats",
//     ],
//     answer: "Cascading Style Sheets",
//   },
//   {
//     question: "Which year was JavaScript launched?",
//     options: ["1996", "1995", "1994", "none of the above"],
//     answer: "1995",
//   },
// ];

const originalQuestions = [
  {
    question: "What’s the most accurate description of a college group project?",
    options: [
      "Teamwork and collaboration",
      "One person does everything",
      "Magical chaos",
      "Just vibes",
    ],
    answer: "One person does everything",
  },
  {
    question: "What is the ultimate college currency?",
    options: ["Money", "Canteen coupons", "Attendance", "Sleep"],
    answer: "Attendance",
  },
  {
    question: "When a professor says 'This is an easy question,' what should you do?",
    options: [
      "Answer confidently",
      "Panic silently",
      "Fake a call",
      "Disappear",
    ],
    answer: "Panic silently",
  },
  {
    question: "What’s the most common diet during exams?",
    options: [
      "Balanced meals",
      "Coffee and stress",
      "Air and anxiety",
      "Maggi and regret",
    ],
    answer: "Maggi and regret",
  },
  {
    question: "What does a college student’s alarm clock usually say?",
    options: [
      "Time to grind!",
      "You can do it!",
      "Try again tomorrow",
      "Why even bother?",
    ],
    answer: "Try again tomorrow",
  },
  {
    question: "What's the true purpose of Wi-Fi in college?",
    options: [
      "Research papers",
      "Online classes",
      "Netflix and memes",
      "Connecting with faculty",
    ],
    answer: "Netflix and memes",
  },
  {
    question: "What’s the real meaning of 'I'll start tomorrow'?",
    options: [
      "Strong motivation",
      "Genuine plan",
      "Definitely never",
      "Pure delusion",
    ],
    answer: "Definitely never",
  },
];


const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

const Quiz = () => {
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [timer, setTimer] = useState(15);

  useEffect(() => {
    // Shuffle questions on mount
    setShuffledQuestions(shuffleArray(originalQuestions));
  }, []);

  useEffect(() => {
    if (timer === 0) {
      nextQuestion();
    }
    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(countdown);
  }, [timer]);

  const handleOptionClick = (option) => {
    if (selected) return;
    setSelected(option);
    if (option === shuffledQuestions[currentQuestion].answer) {
      setScore(score + 1);
    }
    setTimeout(() => {
      nextQuestion();
    }, 1000);
  };

  const nextQuestion = () => {
    if (currentQuestion + 1 < shuffledQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelected(null);
      setTimer(15);
    } else {
      setShowResult(true);
    }
  };

  if (shuffledQuestions.length === 0) return null; // Avoid rendering before shuffle

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-cyan-100 to-blue-200 dark:from-gray-900 dark:to-gray-800 px-4 py-10">
      <h1 className="text-4xl font-bold text-purple-700 dark:text-purple-300 mb-8">
        ❓🎓 Campus Chronicles: The Quiz
      </h1>

      {!showResult ? (
        <div className="w-full max-w-xl bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6">
          <div className="mb-4 text-right text-gray-700 dark:text-white">
            ⏱️ Time left: <span className="font-semibold">{timer}s</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            {shuffledQuestions[currentQuestion].question}
          </h2>
          <ul className="space-y-3">
            {shuffledQuestions[currentQuestion].options.map((option, index) => (
              <li
                key={index}
                onClick={() => handleOptionClick(option)}
                className={`cursor-pointer p-3 rounded-md border transition-all
                  ${selected === option
                    ? option === shuffledQuestions[currentQuestion].answer
                      ? "bg-green-400 text-white border-green-600"
                      : "bg-red-400 text-white border-red-600"
                    : "hover:bg-blue-100 dark:hover:bg-gray-600 border-gray-300 dark:border-gray-500"}`}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-3xl font-bold text-green-700 dark:text-green-400 mb-4">
            🎉 Quiz Completed!
          </h2>
          <p className="text-lg text-gray-800 dark:text-gray-200">
            You scored <span className="font-bold">{score}</span> out of {shuffledQuestions.length}
          </p>
        </div>
      )}
    </div>
  );
};

export default Quiz;
