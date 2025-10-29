import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Quiz() {
  const [questions, setQuestions] = useState([
    {
      question: "What is the capital of Japan?",
      options: ["Beijing", "Seoul", "Tokyo", "Bangkok"],
      correct: "Tokyo",
    },
    {
      question: "Which element has the symbol 'O'?",
      options: ["Gold", "Oxygen", "Osmium", "Iron"],
      correct: "Oxygen",
    },
    {
      question: "Which planet is called the Blue Planet?",
      options: ["Venus", "Earth", "Neptune", "Uranus"],
      correct: "Earth",
    },
  ]);

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showManager, setShowManager] = useState(false);
  const [form, setForm] = useState({
    question: "",
    options: ["", "", "", ""],
    correct: "",
  });
  const [editIndex, setEditIndex] = useState(null);

  const navigate = useNavigate();

  function handleAnswer(opt) {
    if (opt === questions[current].correct) {
      setScore(score + 1);
    }

    const next = current + 1;
    if (next < questions.length) {
      setCurrent(next);
    } else {
      navigate("/result", { state: { score, total: questions.length } });
    }
  }

  function handleOptionChange(i, value) {
    const newOptions = [...form.options];
    newOptions[i] = value;
    setForm({ ...form, options: newOptions });
  }

  function handleSave() {
    if (!form.question || !form.correct || form.options.some((x) => !x)) {
      alert("Please fill all fields!");
      return;
    }

    if (editIndex !== null) {
      const newQ = [...questions];
      newQ[editIndex] = form;
      setQuestions(newQ);
      setEditIndex(null);
      alert("Question updated!");
    } else {
      setQuestions([...questions, form]);
      alert("Question added!");
    }

    setForm({ question: "", options: ["", "", "", ""], correct: "" });
  }

  function handleDelete(i) {
    const newQ = questions.filter((q, index) => index !== i);
    setQuestions(newQ);
  }

  function handleEdit(i) {
    setForm(questions[i]);
    setEditIndex(i);
  }

  return (
    <div className="card fade-in">
      <h2>📘 Quiz Time</h2>

      <button className="btn" onClick={() => setShowManager(!showManager)}>
        {showManager ? "Back to Quiz" : "Manage Questions ⚙️"}
      </button>

      
      {!showManager ? (
        <div>
          {questions.length > 0 ? (
            <div>
              <h3>
                Question {current + 1} / {questions.length}
              </h3>
              <p className="question">{questions[current].question}</p>

              <div className="options">
                {questions[current].options.map((opt, i) => (
                  <button key={i} onClick={() => handleAnswer(opt)}>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <p>No questions yet. Please add some.</p>
          )}
        </div>
      ) : (

        
        <div className="manager">
          <h3>{editIndex !== null ? "Edit Question ✏️" : "Add Question ➕"}</h3>

          <input
            type="text"
            placeholder="Question"
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
            {editIndex !== null ? "Update" : "Add"}
          </button>

          <hr />

          <h3>All Questions 📋</h3>
          {questions.map((q, i) => (
            <div key={i} className="q-item">
              <p>
                <b>{i + 1}.</b> {q.question}
              </p>
              <div>
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Quiz;
