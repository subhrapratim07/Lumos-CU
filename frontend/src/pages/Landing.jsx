import { useNavigate } from "react-router-dom";
import MagicBackground from "../components/MagicBackground";
import { useEffect, useState } from "react";

export default function Landing() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  return (
    <div className="page landing-page">
      <MagicBackground />

      <div className={`landing-content ${visible ? "revealed" : ""}`}>
        
        {/* ✅ REPLACED SVG WITH IMAGE */}
        <div className="crest-wrapper">
          <img
            src="https://i.ibb.co/mrVJJVbx/logo-2.png"
            alt="Lumos Logo"
            className="crest-image"
          />
        </div>

        <div className="landing-title-block">
          <p className="landing-eyebrow">A Magical Invitation Awaits</p>

          <h1 className="landing-title">
            <span className="word-hogwarts">LUMOS</span>
            <span className="word-portal">Fresher's Portal</span>
          </h1>

          <div className="title-ornament">
            <span className="ornament-line" />
            <span className="ornament-diamond">◆</span>
            <span className="ornament-line" />
          </div>

          <p className="landing-sub">
            The gates of the wizarding world stand open.<br />
            Your letter has been sent. Your destiny awaits.
          </p>
        </div>

        <button className="btn-portal" onClick={() => navigate("/login")}>
          <span className="btn-glow" />
          <span className="btn-text">✦ ALOHOMORA ✦</span>
        </button>

        <p className="landing-footer">
          ✦ &nbsp; Fresher's 2k26 &nbsp; ✦
        </p>
      </div>
    </div>
  );
}