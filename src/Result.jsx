import { useLocation, useNavigate } from "react-router-dom";

export default function Result() {
  const navigate = useNavigate();
  const location = useLocation();
  const { score, total } = location.state || { score: 0, total: 0 };

  return (
    <div className="card fade-in">
      <h2>🎉 Quiz Completed!</h2>
      <p className="score">
        You scored <strong>{score}</strong> out of <strong>{total}</strong>
      </p>
      <button className="btn" onClick={() => navigate("/quiz")}>
        Try Again 🔁
      </button>
      <button className="btn home" onClick={() => navigate("/")}>
        Go Home 🏠
      </button>
    </div>
  );
}
