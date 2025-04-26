import React, { useState } from 'react';
import quizData from './quizData';

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);

  const handleAnswerOptionClick = (option) => {
    const correctAnswer = quizData[currentQuestion].answer;
    setSelectedAnswer(option);
    if (option === correctAnswer) {
      setScore(score + 1);
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }

    setTimeout(() => {
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < quizData.length) {
        setCurrentQuestion(nextQuestion);
        setIsCorrect(null);
        setSelectedAnswer("");
      } else {
        setShowScore(true);
      }
    }, 1000);
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        {showScore ? (
          <div style={styles.scoreSection}>
            <h1 style={styles.congratsText}>👑 You are a True Princess! 👑</h1>
            <p style={styles.scoreText}>You scored {score} out of {quizData.length}</p>
          </div>
        ) : (
          <>
            <div style={styles.questionSection}>
              <div style={styles.questionCount}>
                Question {currentQuestion + 1} / {quizData.length}
              </div>
              <div style={styles.questionText}>
                {quizData[currentQuestion].question}
              </div>
            </div>
            <div style={styles.answerSection}>
              {quizData[currentQuestion].options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleAnswerOptionClick(option)}
                  style={{
                    ...styles.optionButton,
                    backgroundColor: selectedAnswer === option ? (isCorrect ? '#d4edda' : '#f8d7da') : 'white'
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
            {selectedAnswer && (
              <div style={styles.feedbackText}>
                {isCorrect ? 'Correct! 🌸✨' : 'Oops! Try again, Princess! 💔'}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: '100vh',
    backgroundColor: '#1e1e2f', // <- dark background
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px'
  },
  card: {
    background: 'linear-gradient(135deg, #ffc0cb, #ffccff)',
    padding: '40px 30px',
    borderRadius: '20px',
    boxShadow: '0 8px 20px rgba(255, 105, 180, 0.5)',
    width: '100%',
    maxWidth: '500px',
    textAlign: 'center',
  },
  scoreSection: {
    marginTop: '20px'
  },
  congratsText: {
    fontSize: '2rem',
    color: '#d6336c',
    marginBottom: '10px'
  },
  scoreText: {
    fontSize: '1.5rem',
    color: '#6a1b9a'
  },
  questionSection: {
    marginBottom: '20px'
  },
  questionCount: {
    fontSize: '1rem',
    color: '#6a1b9a',
    marginBottom: '10px'
  },
  questionText: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#8e24aa'
  },
  answerSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginTop: '20px'
  },
  optionButton: {
    padding: '12px',
    fontSize: '1rem',
    borderRadius: '10px',
    border: '2px solid #e75480',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    backgroundColor: 'white'
  },
  feedbackText: {
    marginTop: '20px',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#e91e63'
  }
};

export default Quiz;
