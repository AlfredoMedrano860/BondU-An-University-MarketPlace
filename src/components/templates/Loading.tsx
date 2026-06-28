import { useEffect, useState } from "react";
import logo from "../../assets/imgs/logo.png";
import "../../assets/styles/components/Loading.css";

type LoadingProps = {
  duration?: number; // ms
  onFinish?: () => void;
};

export default function Loading({ duration = 2800, onFinish }: LoadingProps) {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);
      if (elapsed >= duration) {
        setVisible(false);
        onFinish?.();
        return;
      }
      requestAnimationFrame(tick);
    };
    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [duration, onFinish]);

  if (!visible) return null;

  return (
    <div className="bu-loading">
      <div className="bu-loading-inner">
        <img src={logo} alt="bondu logo" className="bu-loading-logo" />
        <div className="bu-loading-sub">An University Marketplace</div>
      </div>

      <div className="bu-loading-progress">
        <div className="bu-loading-progress-bar" style={{ width: `${progress}%` }} />
        <div className="bu-loading-progress-head" style={{ left: `calc(${progress}% - 8px)` }} />
      </div>
    </div>
  );
}
