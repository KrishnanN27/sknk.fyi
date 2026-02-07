import { motion } from "framer-motion";

export default function Widget({ title, children }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="
        relative
        rounded-2xl
        bg-[#0f1117]
        border border-white/10
        p-6
        shadow-[0_10px_40px_rgba(0,0,0,0.6)]
      "
    >
      <div className="text-[11px] uppercase tracking-widest text-white/50 mb-4">
        {title}
      </div>
      {children}
    </motion.div>
  );
}
