// Envelope.jsx
import { useState } from "react";

export default function Envelope({ onOpen }) {
  const [state, setState] = useState("idle"); // idle | opening | done

  const handleClick = () => {
    if (state !== "idle") return;
    setState("opening");
    setTimeout(() => {
      setState("done");
      setTimeout(onOpen, 300);
    }, 1400);
  };

  return (
    <div className="envelope-scene" onClick={handleClick}>
      <div className={`envelope-3d ${state}`}>
        {/* Back of envelope */}
        <div className="env-back" />

        {/* Side flaps */}
        <div className="env-flap env-flap-left" />
        <div className="env-flap env-flap-right" />
        <div className="env-flap env-flap-bottom" />

        {/* Top flap — animates open */}
        <div className="env-flap env-flap-top" />

        {/* Letter peeking out */}
        <div className={`env-letter-peek ${state === "opening" ? "peek" : ""}`}>
          <span>📜</span>
        </div>

        {/* Wax seal on front */}
        <div className={`env-seal ${state !== "idle" ? "seal-break" : ""}`}>
          <span>H</span>
        </div>
      </div>

      <p className={`env-hint ${state !== "idle" ? "hint-fade" : ""}`}>
        {state === "idle" ? "✦ Tap to unseal your letter ✦" : "Opening…"}
      </p>

      {/* Sparkles on open */}
      {state === "opening" && (
        <div className="sparkle-burst">
          {["✦","✧","⋆","✦","✧","⋆","✦","✧"].map((s, i) => (
            <span key={i} className="sparkle" style={{ "--i": i }}>{s}</span>
          ))}
        </div>
      )}
    </div>
  );
}
