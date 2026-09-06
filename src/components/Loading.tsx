import { useEffect, useState } from "react";
import "./styles/Loading.css";
import { useLoading } from "../context/LoadingProvider";

const Loading = ({ percent }: { percent: number }) => {
  const { setIsLoading } = useLoading();
  const [loaded, setLoaded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (percent >= 100) {
      const timer1 = setTimeout(() => {
        setLoaded(true);
        const timer2 = setTimeout(() => {
          setIsLoaded(true);
        }, 600);
        return () => clearTimeout(timer2);
      }, 300);
      return () => clearTimeout(timer1);
    }
  }, [percent]);

  useEffect(() => {
    if (isLoaded) {
      const timer = setTimeout(() => {
        handleEnter();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isLoaded]);

  const handleEnter = () => {
    if (clicked) return;
    setClicked(true);
    import("./utils/initialFX").then((module) => {
      setTimeout(() => {
        if (module.initialFX) {
          module.initialFX();
        }
        setIsLoading(false);
      }, 850);
    });
  };

  const getPhaseTag = (val: number) => {
    if (val < 25) return "MERN STACK ARCHITECTURE";
    if (val < 50) return "AI & NEURAL INTEGRATIONS";
    if (val < 75) return "3D WEBGL ENVIRONMENT";
    if (val < 100) return "FINALIZING INTERFACE";
    return "WELCOME • EXPERIENCE READY";
  };

  const displayPercent = Math.min(100, Math.max(0, percent));

  return (
    <div className={`kinetic-loader ${clicked ? "kinetic-loader-exit" : ""}`}>
      {/* Dynamic Ambient Nebula Glows */}
      <div className="kinetic-ambient kinetic-ambient-1"></div>
      <div className="kinetic-ambient kinetic-ambient-2"></div>
      <div className="kinetic-noise-overlay"></div>

      {/* Top Header */}
      <header className="kinetic-header">
        <div className="kinetic-brand">
          <span className="kinetic-monogram">MS</span>
          <span className="kinetic-brand-name">MOHAMMED SAHAL PK</span>
        </div>
        <div className="kinetic-header-status">
          <span className="kinetic-pulse-dot"></span>
          <span className="kinetic-status-text">
            {displayPercent < 100 ? "COMPILING ASSETS" : "READY"}
          </span>
        </div>
      </header>

      {/* Main Center Content */}
      <main className="kinetic-main">
        {/* Animated Subtitle / Phase Indicator */}
        <div className="kinetic-phase">
          <span className="kinetic-phase-num">
            {displayPercent < 100
              ? `0${Math.floor(displayPercent / 25) + 1} //`
              : "✦ //"}
          </span>
          <span className="kinetic-phase-title">{getPhaseTag(displayPercent)}</span>
        </div>

        {/* Massive Typographic Percentage Counter */}
        <div className="kinetic-counter-wrap">
          <h1 className="kinetic-counter">
            <span className="kinetic-counter-digits">{displayPercent}</span>
            <span className="kinetic-counter-pct">%</span>
          </h1>
        </div>

        {/* Minimalist Glowing Progress Line */}
        <div className="kinetic-progress-container">
          <div className="kinetic-progress-track">
            <div
              className="kinetic-progress-fill"
              style={{ width: `${displayPercent}%` }}
            >
              <div className="kinetic-progress-glow"></div>
            </div>
          </div>
          <div className="kinetic-progress-labels">
            <span>FULL STACK AI DEVELOPER</span>
            <span>{displayPercent}%</span>
          </div>
        </div>

        {/* Interactive Enter Action */}
        <div
          className={`kinetic-action-wrap ${
            loaded ? "kinetic-action-visible" : ""
          }`}
        >
          <button
            className="kinetic-enter-btn"
            onClick={handleEnter}
            data-cursor="disable"
          >
            <span className="kinetic-btn-text">EXPLORE PORTFOLIO</span>
            <span className="kinetic-btn-arrow">→</span>
          </button>
        </div>
      </main>

      {/* Bottom Footer */}
      <footer className="kinetic-footer">
        <span className="kinetic-location">KERALA, INDIA</span>
        <span className="kinetic-version">PORTFOLIO v2.0 • 2026</span>
      </footer>
    </div>
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
