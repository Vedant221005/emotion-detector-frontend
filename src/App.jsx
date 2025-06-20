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
  const [faceDetected, setFaceDetected] = useState(null); // ✅ new state for border logic
  const navigate = useNavigate();

  // 🔁 Auto-check face presence every 2 seconds
  useEffect(() => {
    const interval = setInterval(async () => {
      if (webcamRef.current) {
        const imageSrc = webcamRef.current.getScreenshot();
        if (!imageSrc) return;

        try {
          const res = await axios.post("http://localhost:5000/detect_emotion", {
            image: imageSrc,
          });

          const detected = res.data.emotion;
          setFaceDetected(detected !== "no_face");
        } catch (err) {
          console.error("Auto face check error", err);
        }
      }
    }, 2000); // every 2 sec

    return () => clearInterval(interval);
  }, []);

  const capture = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) return;

    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/detect_emotion", {
        image: imageSrc,
      });

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

  const sadMoods = ["sad", "angry", "fear"];
  const isNegativeMood = sadMoods.includes(emotion.toLowerCase());

  return (
    <div
      id="rootElement"
      className="relative min-h-screen p-6 flex flex-col items-center justify-center 
                 bg-gradient-to-br from-indigo-100 to-pink-100 
                 dark:from-gray-900 dark:to-gray-800 transition-all duration-500"
    >
      {/* Toggle Switch */}
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
      <div
        className="absolute top-16 right-4 w-[340px] bg-white/60 dark:bg-gray-700/40 p-4 rounded-xl shadow-md text-sm text-gray-800 dark:text-gray-200"
      >
        <p className="font-bold mb-2">🎯 Face Detection Guide</p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <span className="font-medium text-green-600">Green Border</span>: Face detected successfully
          </li>
          <li>
            <span className="font-medium text-red-600">Red Border</span>: No face detected — adjust your position
          </li>
          <li>
            <span className="font-medium text-blue-600">Blue Border</span>: Waiting for face detection
          </li>
        </ul>
      </div>

      <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r 
                   from-purple-600 to-blue-500 dark:from-pink-400 dark:to-purple-400 
                   mb-8 drop-shadow-lg transition-all duration-500 text-center">
        Emotion Detector
      </h1>

      {/* Webcam Section with Dynamic Border */}
      <div
        className={`w-full max-w-xl rounded-xl overflow-hidden p-1 shadow-xl transition-all duration-300 
          ${
            faceDetected === null
              ? "border-4 border-blue-600"
              : faceDetected
              ? "border-4 border-green-500"
              : "border-4 border-red-500"
          }`}
      >
        <Webcam
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="w-full h-[400px] object-cover rounded-lg"
        />
      </div>

      <button
        onClick={capture}
        className="mt-6 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 
                   hover:from-purple-600 hover:to-blue-600 text-white font-bold 
                   rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
      >
        {loading ? "Detecting..." : "Detect Emotion"}
      </button>

      {error && (
        <div className="mt-4 text-red-600 font-semibold text-lg animate-pulse">
          {error}
        </div>
      )}

      {emotion && (
        <div className="mt-8 w-full max-w-lg text-center animate-fade-in">
          <div className="text-3xl font-bold text-gray-800 dark:text-white transition-all mb-3">
            Detected Emotion:{" "}
            <span className="capitalize text-purple-700 dark:text-pink-400">
              {emotionEmojis[emotion.toLowerCase()] || "🙂"} {emotion}
            </span>
          </div>

          {emotionSuggestions[emotion.toLowerCase()] && (
            <div className="mt-4 bg-white/40 dark:bg-gray-700/40 backdrop-blur-xl 
                            p-6 rounded-xl shadow-lg border border-white/20 dark:border-gray-500">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                💡 Suggestions for You:
              </h2>
              <ul className="list-disc list-inside text-gray-800 dark:text-gray-200 space-y-2 text-left">
                {emotionSuggestions[emotion.toLowerCase()].map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {isNegativeMood && (
            <button
              onClick={() => navigate("/games")}
              className="mt-6 px-6 py-2 bg-yellow-500 hover:bg-yellow-600 
                         text-white rounded-full font-semibold shadow-lg 
                         transition duration-300"
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
