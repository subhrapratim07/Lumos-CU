// Invitation.jsx
import { useState } from "react";
import Envelope from "../components/Envelope";
import Letter from "../components/Letter";
import MagicBackground from "../components/MagicBackground";

export default function Invitation() {
  const [opened, setOpened] = useState(false);
  const user = JSON.parse(localStorage.getItem("user") || "null");

  return (
    <div className="page invitation-page">
      <MagicBackground />

      {!opened ? (
        <div className="invitation-envelope-wrap">
          <p className="invitation-eyebrow">✦ Your Letter Has Arrived ✦</p>
          <Envelope onOpen={() => setOpened(true)} />
        </div>
      ) : (
        <div className="invitation-letter-wrap">
          <Letter user={user} />
        </div>
      )}
    </div>
  );
}
