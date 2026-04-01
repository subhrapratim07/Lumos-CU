import { useEffect, useRef } from "react";

export default function MagicBackground() {
  const canvasRef = useRef(null);
  const audioRef = useRef(null); // ✅ added

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let animationFrame;
    let t = 0;
    let flash = 0;

    // ✅ PLAY MUSIC
    const playMusic = () => {
      if (audioRef.current) {
        audioRef.current.volume = 0.4;
        audioRef.current.play().catch(() => {
          console.log("Autoplay blocked, waiting for click...");
        });
      }
    };

    playMusic();

    const handleUserInteraction = () => {
      playMusic();
      window.removeEventListener("click", handleUserInteraction);
    };

    window.addEventListener("click", handleUserInteraction);

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // ✨ Sparkles
    const sparkles = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 0.5,
      speedY: Math.random() * 0.3 + 0.1,
      alpha: Math.random(),
      phase: Math.random() * Math.PI * 2,
    }));

    // 🌫️ Fog layers
    const fogs = Array.from({ length: 5 }, () => ({
      x: Math.random() * canvas.width,
      y: canvas.height * (0.6 + Math.random() * 0.2),
      size: Math.random() * 400 + 200,
      speed: Math.random() * 0.15 + 0.05,
    }));

    // 🌊 Water waves
    const waves = Array.from({ length: 40 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * 200,
      w: Math.random() * 120,
      speed: Math.random() * 0.3 + 0.1,
    }));

    const drawSparkles = () => {
      sparkles.forEach((s) => {
        s.y -= s.speedY;
        if (s.y < 0) s.y = canvas.height;

        s.alpha = 0.5 + Math.sin(t * 2 + s.phase) * 0.5;

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 220, 150, ${s.alpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = "rgba(255,200,120,0.8)";
        ctx.fill();
      });

      ctx.shadowBlur = 0;
    };

    const drawFog = () => {
      fogs.forEach((f) => {
        f.x += f.speed;
        if (f.x > canvas.width + f.size) f.x = -f.size;

        const grad = ctx.createRadialGradient(
          f.x,
          f.y,
          50,
          f.x,
          f.y,
          f.size
        );

        grad.addColorStop(0, "rgba(200,200,255,0.08)");
        grad.addColorStop(1, "rgba(0,0,0,0)");

        ctx.globalAlpha = 0.6;
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 1;
      });
    };

    const drawWaterReflection = () => {
      const baseY = canvas.height * 0.7;

      waves.forEach((w) => {
        w.x += w.speed;
        if (w.x > canvas.width) w.x = 0;

        ctx.fillStyle = "rgba(255, 200, 120, 0.05)";
        ctx.fillRect(w.x, baseY + w.y, w.w, 1);
      });
    };

    const drawLightning = () => {
      if (Math.random() > 0.998 && flash <= 0) {
        flash = 0.0;
      }

      if (flash > 0) {
        ctx.fillStyle = `rgba(255,255,255,${flash})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        flash *= 0.0;
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.imageSmoothingEnabled = true;

      ctx.fillStyle = "rgba(0,0,0,0.45)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drawFog();
      drawSparkles();
      drawWaterReflection();
      drawLightning();

      t += 0.008;
      animationFrame = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("click", handleUserInteraction);
    };
  }, []);

  return (
    <>
      {/* 🎵 Background Music */}
      <audio ref={audioRef} src="/music.mp3" loop />

      {/* 🏰 Background Image */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage:
            "url('https://i.ibb.co/hJLNK3tg/download-16.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 0,
        }}
      />

      {/* ✨ Magic Layer */}
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
        }}
      />
    </>
  );
}