import { useEffect, useState, useRef } from "react";
import "./styles/Loading.css";
import { useLoading } from "../context/LoadingProvider";

const Loading = ({ percent }: { percent: number }) => {
  const { setIsLoading } = useLoading();
  const [isExiting, setIsExiting] = useState(false);
  const [isReadyToExit, setIsReadyToExit] = useState(false);
  const minTimeElapsed = useRef(false);

  // Guarantee the logo show plays for at least 1.6s so the animation feels intentional and cinematic
  useEffect(() => {
    const timer = setTimeout(() => {
      minTimeElapsed.current = true;
      if (percent >= 100) {
        setIsReadyToExit(true);
      }
    }, 1600);

    // Safety fallback to prevent any stalling on slow connections
    const safetyTimer = setTimeout(() => {
      setIsReadyToExit(true);
    }, 4500);

    return () => {
      clearTimeout(timer);
      clearTimeout(safetyTimer);
    };
  }, [percent]);

  // When percent >= 100 and min time elapsed, trigger the exit transition
  useEffect(() => {
    if (percent >= 100 && minTimeElapsed.current) {
      setIsReadyToExit(true);
    }
  }, [percent]);

  // Trigger exit and kick off hero entrance FX in perfect sync
  useEffect(() => {
    if (isReadyToExit && !isExiting) {
      setIsExiting(true);

      import("./utils/initialFX").then((module) => {
        if (module.initialFX) {
          module.initialFX();
        }
      });

      const exitTimer = setTimeout(() => {
        setIsLoading(false);
      }, 850);
      return () => clearTimeout(exitTimer);
    }
  }, [isReadyToExit, isExiting, setIsLoading]);

  const displayPercent = Math.min(100, Math.max(0, percent));

  const handleSkip = () => {
    setIsReadyToExit(true);
  };

  return (
    <aside
      className={`logo-reveal-overlay ${isExiting ? "logo-reveal-exit" : ""}`}
      onClick={handleSkip}
      title="Click anywhere to enter"
      aria-label="Portfolio Loading"
    >
      {/* Background ambient lighting */}
      <div className="logo-reveal-glow-1" />
      <div className="logo-reveal-glow-2" />
      <div className="logo-reveal-grid" />

      {/* Center Stage: Monogram & Logo Reveal */}
      <div className="logo-reveal-center">
        {/* Animated Emblem Badge */}
        <div className="logo-badge-container">
          <div className="logo-badge-ring" />
          <div className="logo-badge-box">
            <svg
              className="logo-badge-svg"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="50%" stopColor="#5eead4" />
                  <stop offset="100%" stopColor="#14b8a6" />
                </linearGradient>
              </defs>

              {/* Geometric hexagon outline */}
              <polygon
                points="50,6 88,28 88,72 50,94 12,72 12,28"
                stroke="url(#logoGrad)"
                strokeWidth="2.5"
                strokeDasharray="260"
                strokeDashoffset="0"
                className="logo-badge-polygon"
              />
            </svg>

            {/* Glowing Monogram */}
            <div className="logo-monogram">
              <span className="logo-char-m">M</span>
              <span className="logo-dot">·</span>
              <span className="logo-char-s">S</span>
            </div>
          </div>
        </div>

        {/* Name & Title Typography */}
        <div className="logo-text-group">
          <h1 className="logo-name">
            <span>MOHAMMED</span> <span>SAHAL</span>
          </h1>
          <div className="logo-subtitle-wrap">
            <span className="logo-status-dot" />
            <p className="logo-subtitle">FULL STACK AI DEVELOPER</p>
          </div>
        </div>

        {/* Sleek Laser Loading Track */}
        <div className="logo-progress-section">
          <div className="logo-progress-bar-track">
            <div
              className="logo-progress-bar-fill"
              style={{ width: `${displayPercent}%` }}
            />
          </div>
          <div className="logo-progress-meta">
            <span className="logo-progress-label">INITIALIZING SYSTEM</span>
            <span className="logo-progress-value">{displayPercent}%</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Loading;

export const setProgress = (setLoading: (value: number) => void) => {
  let percent: number = 0;

  let interval = setInterval(() => {
    if (percent <= 50) {
      let rand = Math.round(Math.random() * 5);
      percent = percent + rand;
      setLoading(percent);
    } else {
      clearInterval(interval);
      interval = setInterval(() => {
        percent = percent + Math.round(Math.random());
        setLoading(percent);
        if (percent > 91) {
          clearInterval(interval);
        }
      }, 2000);
    }
  }, 100);

  function clear() {
    clearInterval(interval);
    setLoading(100);
  }

  function loaded() {
    return new Promise<number>((resolve) => {
      clearInterval(interval);
      interval = setInterval(() => {
        if (percent < 100) {
          percent++;
          setLoading(percent);
        } else {
          resolve(percent);
          clearInterval(interval);
        }
      }, 2);
    });
  }
  return { loaded, percent, clear };
};
