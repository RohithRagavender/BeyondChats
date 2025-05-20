import React from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Mon", messages: 30 },
  { name: "Tue", messages: 45 },
  { name: "Wed", messages: 28 },
  { name: "Thu", messages: 60 },
  { name: "Fri", messages: 50 },
  { name: "Sat", messages: 75 },
  { name: "Sun", messages: 40 },
];

const stats = [
  { id: 1, label: "Active Users", value: "1,024", icon: "👥" },
  { id: 2, label: "Messages Today", value: "3,569", icon: "💬" },
  { id: 3, label: "New Signups", value: "76", icon: "🆕" },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.3, type: "spring", stiffness: 60 },
  }),
};

const glowingBorder = {
  background:
    "linear-gradient(270deg, #ff0080, #7928ca, #ff0080, #7928ca)",
  backgroundSize: "800% 800%",
  animation: "glow 8s ease infinite",
  borderRadius: "1rem",
  padding: "2px", // for border effect
};

const Dashboard = () => {
  return (
    <div className="min-h-screen p-8 bg-gradient-to-r from-purple-900 via-pink-700 to-red-700 relative overflow-hidden text-white font-sans">
      {/* Floating blurred colorful blobs */}
      <motion.div
        className="absolute rounded-full filter blur-3xl opacity-40"
        style={{
          width: 300,
          height: 300,
          background:
            "radial-gradient(circle at 30% 30%, #ff0080, transparent 70%)",
          top: 50,
          left: 50,
          zIndex: 0,
        }}
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute rounded-full filter blur-3xl opacity-30"
        style={{
          width: 400,
          height: 400,
          background:
            "radial-gradient(circle at 70% 70%, #7928ca, transparent 80%)",
          bottom: 50,
          right: 100,
          zIndex: 0,
        }}
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
      />

      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl font-extrabold mb-8 relative z-10"
        style={{
          textShadow:
            "0 0 8px #ff0080, 0 0 20px #ff0080, 0 0 40px #ff0080, 0 0 80px #ff0080",
        }}
      >
        BeyondChats Dashboard
      </motion.h1>

      <div className="flex gap-8 mb-12 relative z-10 flex-wrap">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.id}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            style={{
              ...glowingBorder,
              textShadow:
                "0 0 6px #fff, 0 0 10px #fff, 0 0 15px #ff0080, 0 0 20px #ff0080",
              backgroundColor: "rgba(0,0,0,0.7)",
            }}
            className="rounded-xl p-6 flex-1 min-w-[180px] max-w-xs shadow-xl cursor-pointer hover:brightness-110 transition"
          >
            <div className="text-5xl mb-4">{stat.icon}</div>
            <div className="text-4xl font-extrabold">{stat.value}</div>
            <div className="uppercase tracking-wide">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50, boxShadow: "0 0 10px #ff0080" }}
        animate={{
          opacity: 1,
          y: 0,
          boxShadow: [
            "0 0 10px #ff0080, 0 0 20px #ff0080, 0 0 30px #ff0080",
            "0 0 20px #ff0080, 0 0 40px #ff0080, 0 0 60px #ff0080",
            "0 0 10px #ff0080, 0 0 20px #ff0080, 0 0 30px #ff0080",
          ],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="rounded-xl p-6 max-w-full relative z-10"
        style={{
          height: 320,
          backgroundColor: "rgba(0,0,0,0.75)",
          borderRadius: "1rem",
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#fff" opacity={0.5} />
            <XAxis dataKey="name" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip
              contentStyle={{ backgroundColor: "rgba(0,0,0,0.85)", borderRadius: 6 }}
              labelStyle={{ color: "#fff" }}
              itemStyle={{ color: "#fff" }}
            />
            <Line
              type="monotone"
              dataKey="messages"
              stroke="#ff0080"
              strokeWidth={4}
              activeDot={{ r: 10 }}
              animationDuration={1500}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Neon glow keyframes */}
      <style>{`
        @keyframes glow {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
