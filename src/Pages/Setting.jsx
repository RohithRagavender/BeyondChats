import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";

const GlowToggle = ({ isOn, toggle }) => {
  return (
    <motion.div
      onClick={toggle}
      className="toggle-wrapper"
      initial={false}
      animate={{ backgroundColor: isOn ? "#4ade80" : "#374151" }}
      style={{
        cursor: "pointer",
        width: 60,
        height: 30,
        borderRadius: 30,
        padding: 3,
        boxShadow: isOn
          ? "0 0 8px 3px #4ade80"
          : "0 0 4px 1px #111827",
        display: "flex",
        alignItems: "center",
      }}
    >
      <motion.div
        className="toggle-circle"
        layout
        transition={{ type: "spring", stiffness: 700, damping: 30 }}
        style={{
          height: 24,
          width: 24,
          borderRadius: "50%",
          background: "white",
          boxShadow: isOn ? "0 0 8px #34d399" : "none",
        }}
      />
    </motion.div>
  );
};

export default function SettingsWow() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const handleSave = () => {
    // Save logic here...
    setShowConfetti(true);

    // Stop confetti after 3 seconds
    setTimeout(() => setShowConfetti(false), 3000);
  };

  return (
    <div
      style={{
        background: isDarkMode ? "#111827" : "#f9fafb",
        color: isDarkMode ? "white" : "#111827",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        gap: 20,
        alignItems: "center",
        justifyContent: "center",
        padding: 40,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h1>Settings - Wow Effect</h1>

      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <label style={{ fontWeight: "bold", fontSize: 18 }}>
          Dark Mode
        </label>
        <GlowToggle isOn={isDarkMode} toggle={toggleDarkMode} />
      </div>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleSave}
        style={{
          backgroundColor: "#3b82f6",
          color: "white",
          border: "none",
          borderRadius: 8,
          padding: "12px 24px",
          fontSize: 16,
          cursor: "pointer",
          boxShadow: "0 6px 12px rgba(59, 130, 246, 0.5)",
        }}
      >
        Save Settings
      </motion.button>

      <AnimatePresence>
        {showConfetti && (
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            recycle={false}
            numberOfPieces={200}
            gravity={0.3}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
