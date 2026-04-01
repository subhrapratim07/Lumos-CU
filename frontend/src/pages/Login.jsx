// Login.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MagicBackground from "../components/MagicBackground";

export default function Login() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!name.trim() || !phone.trim()) {
      setError("Please fill in both fields, young wizard.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await axios.post("https://lumos-cu.onrender.com/api/users/login/api/users/login", {
        name,
        phone,
      });
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/invitation");
    } catch {
      setError("The enchantment failed. Invalid credentials ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page login-page">
      <MagicBackground />

      <div className="login-card">
        {/* Wax seal top */}
        <div className="wax-seal">
          <span className="seal-letter">H</span>
        </div>

        <div className="login-header">
          <p className="login-eyebrow">Restricted Section</p>
          <h2 className="login-title">Wizard Identification</h2>
          <div className="title-ornament small">
            <span className="ornament-line" />
            <span className="ornament-diamond">◆</span>
            <span className="ornament-line" />
          </div>
          <p className="login-sub">Speak your name and the enchanted phrase to proceed.</p>
        </div>

        <div className="login-fields">
          <div className="field-group">
            <label className="field-label">Your Name</label>
            <div className="field-wrapper">
              <span className="field-icon">🔮</span>
              <input
                className="magic-input"
                type="text"
                placeholder="e.g. Harry Potter"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              />
            </div>
          </div>

          <div className="field-group">
            <label className="field-label">Enchanted Phrase (Phone No)</label>
            <div className="field-wrapper">
              <span className="field-icon">🔮</span>
              <input
                className="magic-input"
                type="tel"
                placeholder="Your Phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              />
            </div>
          </div>
        </div>

        {error && <p className="login-error">{error}</p>}

        <button
          className="btn-portal login-btn"
          onClick={handleLogin}
          disabled={loading}
        >
          <span className="btn-glow" />
          <span className="btn-text">
            {loading ? "Casting Spell… 🌀" : "Reveal My Invitation ✦"}
          </span>
        </button>

        <p className="login-disclaimer">
          Only those whose names appear in the Great Hall Ledger may enter.
        </p>
      </div>
    </div>
  );
}
