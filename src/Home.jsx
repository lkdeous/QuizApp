import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="card fade-in">
      <h1>🌿 Welcome to QuizApp</h1>
      <p>Test your knowledge and challenge yourself!</p>
      <button className="btn start" onClick={() => navigate("/quiz")}>
        Start Quiz 🚀
      </button>
    </div>
  );
}
