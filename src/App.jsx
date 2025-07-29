import { useState } from 'react';
import StartPage from './components/StartPage';
import QuizPage from './components/QuizPage';
import './App.css';
import ResultPage from './components/ResultPage';

export default function App() {
  const [stage, setStage] = useState('start');
  const [userEmail, setUserEmail] = useState('');
  const [quizData, setQuizData] = useState({});

  const startQuiz = (email) => {
    setUserEmail(email);
    setStage('quiz');
  };

  const finishQuiz = (questions, answers) => {
    setQuizData({ questions, answers });
    setStage('result');
  };

  const restartQuiz = () => {
    setStage('start');
    setUserEmail('');
    setQuizData({});
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      <div className="w-full max-w-6xl">
        {stage === 'start' && <StartPage onStart={startQuiz} />}
        {stage === 'quiz' && <QuizPage onFinish={finishQuiz} />}
        {stage === 'result' && (
          <div className="text-center">
            <ResultPage questions={quizData.questions} answers={quizData.answers} />
            <div className="py-8">
              <button
                onClick={restartQuiz}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 text-lg"
              >
                🚀 Take Another Quiz
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
