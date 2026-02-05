"use client";

import { useState } from "react";
import FloatingHearts from "./components/FloatingHearts";

const noTexts = [
  "No 😒",
  "Really? 😑",
  "Are you serious? 😐",
  "Last chance 😤",
  "Aloo bht hugai ab bachodi😭",
  "yes kr bhi de 😭",
  "bht hurha aab tera boil egg",
  "game khelne aiy he kia? moti😤",
  "Aloo masti nhiii😤",
  "Aloo hugai teri bachodi aab yes kr😤"
];
  const hearts = ["❤️", "💖", "💘", "💝", "💗"];
  const BLAST_COUNT = 50; // 🔥 jitna zyada, utna blast

export default function Home() {
 const [isNoFloating, setIsNoFloating] = useState(false);
const [noCount, setNoCount] = useState(0);
const [noPosition, setNoPosition] = useState({ top: 60, left: 55 });
const [showImage, setShowImage] = useState(false); // ✅ new state
const [showLove, setShowLove] = useState(false); // YES button trigger


const handleYesClick = () => {
  setShowLove(true); // trigger heart blast + GIF + text
};


 const handleNoHover = () => {
  const nextCount = Math.min(noCount + 1, noTexts.length-1);
  setNoCount(nextCount);
  setIsNoFloating(true);

  // 5th hover trigger
  if (nextCount >= 9) {
    setShowImage(true); // show image
    return; // no more movement
  }

  setNoPosition({
    top: Math.random() * 80,
    left: Math.random() * 80,
  });
};



  return (
    <main style={styles.container}>
      <FloatingHearts />

{/* Intro GIF → hide on hover image OR YES click */}
{!showLove && !showImage && (
  <img
    src="/bear3.gif"
    alt="Valentine Intro"
    style={styles.introGif}
  />
)}


      {!showLove && <h1 style={styles.text}>Inshirah will you be my Valentine? 💖</h1>}

      {/* YES button (normal) */}
        {showImage && !showLove && (
    <img
      src="/image.png"
      alt="Love"
      style={styles.centerImage}
    />
  )}
  
       <div style={styles.buttonRow}>
   {!showLove && (
  <button style={styles.yesButton} onClick={handleYesClick}>
    Yes 💕
  </button>
)}
 {!showLove && (
      <button
        style={{
          ...styles.noButton,
          ...(isNoFloating && {
            position: "absolute",
            top: `${noPosition.top}%`,
            left: `${noPosition.left}%`,
          }),
        }}
        onMouseEnter={handleNoHover}
      >
        {noTexts[noCount]}
      </button>
    )}
  {/* ❤️ YES button magic */}

{showLove && (
  <div style={styles.loveContainer}>
    {/* Heart Blast */}
    <div className="heart-blast">
      {Array.from({ length: BLAST_COUNT }).map((_, i) => {
  const randomHeart = hearts[Math.floor(Math.random() * hearts.length)];

  return (
    <span
      key={i}
      style={{
        position: "absolute",
        fontSize: `${Math.random() * 30 + 20}px`,
        top: `${Math.random() * 80}%`,
        left: `${Math.random() * 80}%`,
        animation: `floatUp ${Math.random() * 2 + 2}s ease-out forwards`,
      }}
    >
      {randomHeart}
    </span>
  );
})}

    </div>

    {/* GIF */}
    <img
      src="/bear2.gif" // place this in public folder
      alt="Panda Kiss"
      style={styles.gif}
    />

    {/* Romantic Text */}
    <h2 style={styles.romanticText}>
      I knew you’d say yes! You’re amazing dumboo 😍💖
      <br></br>
      from Muzammil

    </h2>
  </div>
)}

</div>  

    </main>
  );
}

const styles = {
  introGif: {
  width: "180px",
  height: "180px",
  // marginBottom: "20px",
  borderRadius: "20px",
  // objectFit: "cover",
  zIndex: 2,
  // boxShadow: "0 0 15px rgba(255,0,100,0.4)",
},

  loveContainer: {
  position: "fixed" as const,   // absolute → fixed so it’s relative to viewport
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  textAlign: "center" as const,
  zIndex: 10,                  // make sure it’s on top of everything
  pointerEvents: "none",       // optional, so clicks don’t block
  width: "100%",               // ensure GIF + text can center
  height: "100%",              // full viewport
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "center",
  justifyContent: "center",
},


gif: {
  width: "250px",
  height: "250px",
  borderRadius: "20px",
  objectFit: "cover",
  boxShadow: "0 0 20px rgba(255,0,100,0.5)",
  marginBottom: "20px",  // text below
  pointerEvents: "none", // avoid blocking clicks
},


romanticText: {
  fontSize: "2rem",
  color: "#fff",
  fontWeight: "bold",
  textShadow: "2px 2px 8px rgba(0,0,0,0.7)",
},

  centerImage: {
  margin: "20px",
  width: "250px",
  height: "200px",
  borderRadius: "20px",
  zIndex: 3,
  objectFit: "cover",
  boxShadow: "0 0 20px rgba(255,0,100,0.5)",
},

  buttonRow: {
  display: "flex",
  gap: "20px",
  zIndex: 2,
},

  container: {
    position: "relative" as const,
    height: "100vh",
    background: "linear-gradient(135deg, #ff9a9e, #fad0c4)",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  text: {
    fontSize: "3rem",
    color: "#fff",
    marginBottom: "40px",
    textAlign: "center" as const,
    fontWeight: "bold",
    zIndex: 2,
  },
  yesButton: {
    padding: "14px 32px",
    fontSize: "18px",
    backgroundColor: "#ff4d6d",
    color: "#fff",
    border: "none",
    borderRadius: "30px",
    cursor: "pointer",
    zIndex: 2,
  },
  noButton: {
    
    padding: "14px 32px",
    minWidth: "130px",     // 🔥 FIXED WIDTH
    height: "52px",        // 🔥 FIXED HEIGHT
    backgroundColor: "#fff",
    color: "#ff4d6d",
    border: "2px solid #ff4d6d",
    borderRadius: "30px",
    cursor: "pointer",
    transition: "top 0.25s ease, left 0.25s ease",
    zIndex: 3,
  },
};
