import { useEffect, useState } from "react";

const HOUSE_DATA = {
  Gryffindor: { emoji: "🦁", color: "#c41e3a", accent: "#f0c040", words: "brave and daring" },
  Slytherin: { emoji: "🐍", color: "#2a623d", accent: "#c0c0c0", words: "cunning and ambitious" },
  Ravenclaw: { emoji: "🦅", color: "#222f5b", accent: "#946b2d", words: "wise and witty" },
  Hufflepuff: { emoji: "🦡", color: "#ecb939", accent: "#372e29", words: "loyal and true" },
};

export default function Letter({ user }) {
  const [visible, setVisible] = useState(false);
  const house = HOUSE_DATA[user?.house] || null;

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  return (
    <div className={`letter-scene ${visible ? "letter-in" : ""}`}>
      
      <div className="scroll-cap scroll-cap-top">
        <div className="scroll-roll" />
      </div>

      <div className="parchment-body">
        
        {/* Header */}
        <div className="letter-header">
          <div className="letter-crest-small">🏰</div>
          <div className="letter-school">
            <p className="letter-school-name">UNIVERSITY OF CALCUTTA</p>
            <p className="letter-school-sub">Department of Computer Science & Engineering</p>
          </div>
        </div>

        <div className="letter-divider">
          <span>⋆ ── ✦ ── ⋆</span>
        </div>

        {/* Changed */}
        <p className="letter-date">
          Presents Fresher’s Party 2K26
        </p>

        <p className="letter-salutation">
          Dear <strong className="letter-name">{user?.name || "Student"}</strong>,
        </p>

        {/* Changed */}
        <p className="letter-body">
          We are pleased to inform you that you have been selected to attend a most enchanting evening at our very own Hogwarts. The castle doors shall open to welcome you into a night filled with magic, mystery, and unforgettable moments.
        </p>

        <div className="letter-batch-block">
          <p className="letter-batch-label">Event</p>
          <h3 className="letter-batch">LUMOS</h3>
          <p className="letter-signatory">
            Date: 10th April
          </p>
          <p className="letter-sign">
            Time: 11 AM | Venue: 206
          </p>
        </div>

        {house && (
          <div className="letter-house" style={{ "--hcolor": house.color, "--hacc": house.accent }}>
            <span className="house-emoji">{house.emoji}</span>
            <div className="house-text">
              <p className="house-label">Your House</p>
              <p className="house-name">{user.house}</p>
              <p className="house-trait">"{house.words}"</p>
            </div>
          </div>
        )}

        {/* Changed */}
        <p className="letter-body">
          Prepare yourself for an experience where spells aren’t just cast—but memories are created, friendships are forged, and legends begin.
          <p className="letter p">
           <br></br> 
          Your presence is eagerly awaited. Do not keep the magic waiting.</p>
        </p>

        <div className="letter-divider">
          <span>⋆ ── ✦ ── ⋆</span>
        </div>

        {/* Changed Footer Info */}
        <div className="letter-footer">
          <p className="letter-sign">Mischief Managed,</p>
          <p className="letter-signatory">
           The Senior Council of CU CSE.
          </p> 
        </div>

        {/* Changed */}
        <p className="letter-ps">
          ✨ <em>It’s your time to shine.</em> ✨
        </p>
      </div>

      <div className="scroll-cap scroll-cap-bottom">
        <div className="scroll-roll" />
      </div>
    </div>
  );
}