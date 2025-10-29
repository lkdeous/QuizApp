import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Quiz() {
  const navigate = useNavigate();

  // --- initial questions ---
  const [questions, setQuestions] = useState([
    {
      question: "What is the capital of Japan?",
      options: ["Beijing", "Seoul", "Tokyo", "Bangkok"],
      correct: "Tokyo",
    },
    {
      question: "Which element has the chemical symbol 'O'?",
      options: ["Gold", "Oxygen", "Osmium", "Iron"],
      correct: "Oxygen",
    },
    {
      question: "Which planet is known as the Blue Planet?",
      options: ["Venus", "Earth", "Neptune", "Uranus"],
      correct: "Earth",
    },
  ]);

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showManager, setShowManager] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  // --- handle answer ---
  const handleAnswer = (option) => {
    if (option === questions[current].correct) {
      setScore(score + 1);
    }
    const next = current + 1;
    if (next < questions.length) {
      setCurrent(next);
    } else {
      navigate("/result", { state: { score, total: questions.length } });
    }
  };

  // --- new question form ---
  const [form, setForm] = useState({
    question: "",
    options: ["", "", "", ""],
    correct: "",
  });

  const handleOptionChange = (index, value) => {
    const updated = [...form.options];
    updated[index] = value;
    setForm({ ...form, options: updated });
  };

  // --- add or update question ---
  const handleSave = () => {
    if (!form.question || form.options.some((o) => !o) || !form.correct) {
      alert("Please fill in all fields!");
      return;
    }

    if (editIndex !== null) {
      const updated = [...questions];
      updated[editIndex] = form;
      setQuestions(updated);
      setEditIndex(null);
      alert("Question updated!");
    } else {
      setQuestions([...questions, form]);
      alert("Question added!");
    }

    setForm({ question: "", options: ["", "", "", ""], correct: "" });
  };

  // --- delete question ---
  const handleDelete = (index) => {
    const updated = questions.filter((_, i) => i !== index);
    setQuestions(updated);
  };

  // --- edit question ---
  const handleEdit = (index) => {
    setForm(questions[index]);
    setEditIndex(index);
  };

  return (
    <div className="card fade-in">
      <h2>📘 Quiz Time</h2>

      <button
        className="btn"
        style={{ marginBottom: "15px" }}
        onClick={() => setShowManager(!showManager)}
      >
        {showManager ? "Back to Quiz" : "Manage Questions ⚙️"}
      </button>

      {/* ------------- Quiz Mode ------------- */}
      {!showManager ? (
        <div>
          {questions.length > 0 ? (
            <>
              <h3>
                Question {current + 1} / {questions.length}
              </h3>
              <p className="question">{questions[current].question}</p>
              <div className="options">
                {questions[current].options.map((opt) => (
                  <button key={opt} onClick={() => handleAnswer(opt)}>
                    {opt}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <p>No questions available. Please add some in Manager mode.</p>
          )}
        </div>
      ) : (
        /* ------------- Question Manager ------------- */
        <div className="manager">
          <h3>{editIndex !== null ? "Edit Question ✏️" : "Add Question ➕"}</h3>

          <input
            type="text"
            placeholder="Enter question"
            value={form.question}
            onChange={(e) => setForm({ ...form, question: e.target.value })}
          />

          {form.options.map((opt, i) => (
            <input
              key={i}
              type="text"
              placeholder={`Option ${i + 1}`}
              value={opt}
              onChange={(e) => handleOptionChange(i, e.target.value)}
            />
          ))}

          <input
            type="text"
            placeholder="Correct answer"
            value={form.correct}
            onChange={(e) => setForm({ ...form, correct: e.target.value })}
          />

          <button className="btn" onClick={handleSave}>
            {editIndex !== null ? "Update Question" : "Add Question"}
          </button>

          <hr />

          <h3>All Questions 📋</h3>
          {questions.map((q, i) => (
            <div key={i} className="q-item">
              <p>
                <strong>{i + 1}.</strong> {q.question}
              </p>
              <button className="btn small" onClick={() => handleEdit(i)}>
                Edit
              </button>
              <button
                className="btn small danger"
                onClick={() => handleDelete(i)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
