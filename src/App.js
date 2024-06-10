import "./App.css";
import { useEffect, useState } from "react";
import listOfWords from "./verbs";

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
    const options = [word.pastParticiple];
    while (options.length < 4) {
      const randomWord = getRandomWord().pastParticiple;
      if (!options.includes(randomWord)) {
        options.push(randomWord);
      }
    }
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
    } else if (mistake === 3) {
      alert("Ви зробили 3 помилки!Гра закінчена.");
      setVerbs(listOfWords);
      setScore(0);
      setMistake(0);
    } else {
      setMistake(mistake + 1);
      alert(`Помилка!Залишилось ${3 - mistake} спроби`);
    }
    setVerbs((prevArray) => prevArray.filter((word) => word !== question.word));
    setSelectedAnswer(null);
  }

  useEffect(() => {
    setQuestion(createQuestion());
  }, [verbs]);

  return (
    <>
      <div className="App">
        <p className="title">Easy way to learn past participle words</p>
        <p className="score">Score: {score}</p>

        <div className="questionContainer">
          {question && (
            <form
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
      </div>
    </>
  );
}

export default App;
