import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const emotionSuggestions = {
  sad: ["🎧 Listen to calming music", "📓 Try journaling your thoughts", "🤖 Chat with a support bot", "🎥 Watch motivational videos"],
  angry: ["🧘 Do deep breathing exercises", "📖 Read peaceful quotes", "💆 Try stress relief tips"],
  happy: ["😊 Share your happiness", "💪 Keep spreading positivity", "🙏 Reflect on what you're grateful for"],
  neutral: ["💡 Learn a fun fact", "🧠 Try a productivity tip", "🗣️ Ask yourself: How are you really feeling?"],
  fear: ["😊 Use positive affirmations", "🦶 Try grounding techniques", "🎧 Listen to guided meditation"],
};

const emotionEmojis = {
  sad: "😢",
  angry: "😠",
  happy: "😄",
  neutral: "😐",
  fear: "😨",
};

function App() {
  const webcamRef = useRef(null);
  const [emotion, setEmotion] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [error, setError] = useState("");
  const [faceDetected, setFaceDetected] = useState(null);
  const [showPreloader, setShowPreloader] = useState(true);
  const [startSlideUp, setStartSlideUp] = useState(false);
  const [showEDMerge, setShowEDMerge] = useState(false);
  const [slideOut, setSlideOut] = useState(false);
  const [showMainContent, setShowMainContent] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const slideTimer = setTimeout(() => setStartSlideUp(true), 1000);
    const edMergeTimer = setTimeout(() => setShowEDMerge(true), 2500);
    const slideOutTimer = setTimeout(() => {
      setSlideOut(true);         // Slide up preloader
      setShowMainContent(true);  // Start sliding in main content AT THE SAME TIME
    }, 3500);

    const removePreloaderTimer = setTimeout(() => setShowPreloader(false), 4200);

    return () => {
      clearTimeout(slideTimer);
      clearTimeout(edMergeTimer);
      clearTimeout(slideOutTimer);
      clearTimeout(removePreloaderTimer);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (webcamRef.current) {
        const imageSrc = webcamRef.current.getScreenshot();
        if (!imageSrc) return;

        try {
          const response = await axios.post(
            "https://emotion-backend-buea.onrender.com/detect_emotion",
            { image: imageSrc },
            { headers: { "Content-Type": "application/json" } }
          );
          const detected = response.data.emotion;
          setFaceDetected(detected !== "no_face");
        } catch (err) {
          console.error("Auto face check error", err);
        }
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const capture = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) return;

    setLoading(true);
    setError("");

    try {
          const response = await axios.post(
            "https://emotion-backend-buea.onrender.com/detect_emotion",
            { image: imageSrc },
            { headers: { "Content-Type": "application/json" } }
          );

      const detected = response.data.emotion;

      if (detected === "no_face") {
        setEmotion("");
        setError("Please position your face properly in the frame.");
      } else {
        setEmotion(detected);
        setError("");
      }
    } catch (err) {
      console.error("Error detecting emotion:", err);
      setEmotion("Error detecting emotion");
      setError("⚠️ Something went wrong while detecting emotion.");
    } finally {
      setLoading(false);
    }
  };

  const toggleDarkMode = () => {
    const root = document.getElementById("rootElement");
    root.classList.toggle("dark");
    setIsDarkMode(!isDarkMode);
  };

  const showGameButton = ["sad", "angry", "fear", "neutral"].includes(emotion.toLowerCase());

  // ------------------ PRELOADER -------------------
  if (showPreloader) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center bg-black text-white text-5xl sm:text-6xl font-extrabold tracking-wide overflow-hidden transition-transform duration-700 ease-in-out
          ${slideOut ? "-translate-y-full" : "translate-y-0"}`}
      >
        {!startSlideUp ? (
          <span>
            <span className="text-blue-400">E</span>motion{" "}
            <span className="text-pink-400">D</span>etector
          </span>
        ) : showEDMerge ? (
          <div className="flex gap-20 animate-merge items-center">
            <span className="text-blue-400">E</span>
            <span className="text-pink-400">D</span>
          </div>
        ) : (
          <div className="flex space-x-1">
            <span className="text-blue-400">E</span>
            <span className="animate-slide-up">m</span>
            <span className="animate-slide-up">o</span>
            <span className="animate-slide-up">t</span>
            <span className="animate-slide-up">i</span>
            <span className="animate-slide-up">o</span>
            <span className="animate-slide-up">n</span>
            <span className="text-pink-400">D</span>
            <span className="animate-slide-up">e</span>
            <span className="animate-slide-up">t</span>
            <span className="animate-slide-up">e</span>
            <span className="animate-slide-up">c</span>
            <span className="animate-slide-up">t</span>
            <span className="animate-slide-up">o</span>
            <span className="animate-slide-up">r</span>
          </div>
        )}
      </div>
    );
  }

  // ------------------ MAIN PAGE -------------------
  return (
    <div
      id="rootElement"
      className={`relative min-h-screen p-4 sm:p-6 flex flex-col items-center justify-center
        bg-gradient-to-br from-indigo-100 to-pink-100 
        dark:from-gray-900 dark:to-gray-800 transition-all duration-500
        transform transition-transform ease-in-out duration-700
        ${showMainContent ? "opacity-100" : "opacity-0"}
      `}
    >

      {/* Toggle Dark Mode */}
      <button
        onClick={toggleDarkMode}
        className="absolute top-4 right-4 flex items-center gap-2 bg-white dark:bg-gray-700 
                   border border-gray-300 dark:border-gray-500 px-4 py-2 rounded-full 
                   shadow-md transition duration-300 text-sm font-medium text-gray-800 dark:text-white"
      >
        <span
          className={`w-5 h-5 rounded-full flex items-center justify-center text-sm transition ${
            isDarkMode ? "bg-gray-600" : "bg-yellow-400"
          }`}
        >
          {isDarkMode ? "🌙" : "☀️"}
        </span>
        {isDarkMode ? "Dark mode" : "Light mode"}
      </button>

      {/* Face Detection Guide */}
      <div className="mt-20 sm:mt-0 sm:absolute sm:top-16 sm:right-4 w-full max-w-xs bg-white/60 dark:bg-gray-700/40 p-4 rounded-xl shadow-md text-sm text-gray-800 dark:text-gray-200">
        <p className="font-bold mb-2">🎯 Face Detection Guide</p>
        <ul className="list-disc list-inside space-y-1">
          <li><span className="font-medium text-green-600">Green Border</span>: Face detected successfully</li>
          <li><span className="font-medium text-red-600">Red Border</span>: No face detected — adjust your position</li>
          <li><span className="font-medium text-blue-600">Blue Border</span>: Waiting for face detection</li>
        </ul>
      </div>

      {/* Heading */}
      <h1 className="text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r 
                   from-purple-600 to-blue-500 dark:from-pink-400 dark:to-purple-400 
                   mb-6 sm:mb-8 drop-shadow-lg transition-all text-center">
        Emotion Detector
      </h1>

      {/* Webcam */}
      <div className={`w-full max-w-md sm:max-w-xl rounded-xl overflow-hidden p-1 shadow-xl transition-all duration-300 ${
        faceDetected === null
          ? "border-4 border-blue-600"
          : faceDetected
          ? "border-4 border-green-500"
          : "border-4 border-red-500"
      }`}>
        <Webcam
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="w-full h-[300px] sm:h-[400px] object-cover rounded-lg"
          videoConstraints={{ facingMode: "user" }}
        />
      </div>

      {/* Detect Button */}
      <button
        onClick={capture}
        className="mt-6 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 
                   hover:from-purple-600 hover:to-blue-600 text-white font-bold 
                   rounded-full shadow-lg transition duration-300 transform hover:scale-105"
      >
        {loading ? "Detecting..." : "Detect Emotion"}
      </button>

      {/* Error Message */}
      {error && (
        <div className="mt-4 text-red-600 font-semibold text-lg animate-pulse text-center px-2">
          {error}
        </div>
      )}

      {/* Result Display */}
      {emotion && (
        <div className="mt-8 w-full max-w-lg text-center animate-fade-in">
          <div className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white transition-all mb-3">
            Detected Emotion:{" "}
            <span className="capitalize text-purple-700 dark:text-pink-400">
              {emotionEmojis[emotion.toLowerCase()] || "🙂"} {emotion}
            </span>
          </div>

          {emotionSuggestions[emotion.toLowerCase()] && (
            <div className="mt-4 bg-white/40 dark:bg-gray-700/40 backdrop-blur-xl p-6 rounded-xl shadow-lg border border-white/20 dark:border-gray-500">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3">💡 Suggestions for You:</h2>
              <ul className="list-disc list-inside text-gray-800 dark:text-gray-200 space-y-2 text-left">
                {emotionSuggestions[emotion.toLowerCase()].map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}
            {showGameButton && (
              <button
                onClick={() => navigate("/games")}
                className="mt-6 px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full font-semibold shadow-lg transition duration-300"
              >
                🎮 Play Uplifting Games
              </button>
            )}
        </div>
      )}
    </div>
  );
}

export default App;
