import "./App.css";
import { useEffect, useState } from "react";
import listOfWords from "./verbs";
import Sokiable from "./images.jpeg";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [verbs, setVerbs] = useState(listOfWords);
  const [score, setScore] = useState(0);
  const [mistake, setMistake] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [question, setQuestion] = useState(null);

  function getRandomWord() {
    const randomIndex = Math.floor(Math.random() * verbs.length);
    return verbs[randomIndex];
  }

  function createQuestion() {
    const word = getRandomWord();
    const options = [...word.wrongAnswers, word.pastParticiple];

    options.sort(() => Math.random() - 0.5);
    return { word, options };
  }

  function handleChange(e) {
    setSelectedAnswer(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (question.word.pastParticiple === selectedAnswer) {
      setScore(score + 1);
      toast.success(`Successfully! Your score:${score + 1}`);
    } else if (mistake === 2) {
      toast("Ви зробили 3 помилки! Гра закінчена.");
      document.getElementById("quationForm").classList.add("hidden");
      setTimeout(() => {
        document.getElementById("quationForm").classList.remove("hidden");
      }, 2000);
      document.getElementById("meme").classList.remove("hidden");
      setTimeout(() => {
        document.getElementById("meme").classList.add("hidden");
      }, 2000);

      setVerbs(listOfWords);
      setScore(0);
      setMistake(0);
    } else {
      setMistake(mistake + 1);
      toast.error(`Помилка! Залишилось ${2 - mistake} спроби `);
    }
    setVerbs((prevArray) => prevArray.filter((word) => word !== question.word));
    setSelectedAnswer(null);
  }

  useEffect(() => {
    setQuestion(createQuestion());
  }, [verbs]);

  return (
    <>
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      <div className="App">
        <p className="title">Easy way to learn past participle words</p>
        <p className="score">Score: {score}</p>
        <div className="questionContainer">
          {question && (
            <form
              id="quationForm"
              className="questionForm"
              action="submit"
              onSubmit={handleSubmit}
            >
              <p>
                Яка правильна форма слова {question.word.base}(
                {question.word.ukrainian}) в past participle?
              </p>
              {question.options.map((option, index) => (
                <label key={index} htmlFor={`answer${index}`}>
                  <input
                    type="radio"
                    id={`answer${index}`}
                    name="answer"
                    value={option}
                    onChange={handleChange}
                    checked={selectedAnswer === option}
                  />
                  {option}
                </label>
              ))}
              <button type="submit">submit</button>
            </form>
          )}
        </div>
        <img id="meme" alt="Meme" src={Sokiable} className="meme hidden" />
      </div>
    </>
  );
}

export default App;
