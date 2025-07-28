import { useEffect, useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { fetchQuestions } from '../api';
import QuestionCard from './QuestionCard';
import NavigationPanel from './NavigationPanel';
import Timer from './Timer';

const QuizPage = ({ onFinish }) => {
    const [questions, setQuestions] = useState([]);
    const [currentIdx, setCurrentIdx] = useState(0);
    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [visited, setVisited] = useState(new Set([0]));

    const goToQuestion = (idx) => {
        setCurrentIdx(idx);
        setVisited(prev => new Set(prev).add(idx));
    };
    useEffect(() => {
        const loadQuestions = async () => {
            try {
                const questionData = await fetchQuestions();
                setQuestions(questionData ?? []);
                setError(false);
            } catch (err) {
                console.error('Failed to load questions:', err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        loadQuestions();
    }, []);

    const handleAnswer = (answer) => {
        setAnswers({ ...answers, [currentIdx]: answer });
    };

    const finishQuiz = () => {
        onFinish(questions, answers);
    };

    if (loading || questions.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-blue-50">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600 font-semibold">Loading your quiz...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-red-100">
                <div className="text-center text-red-600">
                    <AlertCircle className="w-16 h-16 mx-auto mb-4" />
                    <p className="font-semibold text-lg">Failed to load questions. Please try again.</p>
                </div>
            </div>
        );
    }

    const answeredCount = Object.keys(answers).length;
    const progress = (answeredCount / questions.length) * 100;

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
            <div className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                Quiz Challenge
                            </h1>
                            <p className="text-sm text-gray-600 mt-1">
                                Question {currentIdx + 1} of {questions.length} • {answeredCount} answered
                            </p>
                        </div>
                        <Timer duration={1800} onTimeUp={finishQuiz} />
                    </div>

                    <div className="mt-4">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <div className="lg:col-span-1">
                        <NavigationPanel
                            questions={questions}
                            currentIdx={currentIdx}
                            setCurrentIdx={goToQuestion}
                            answers={answers}
                            visited={visited}
                        />
                    </div>

                    <div className="lg:col-span-3 space-y-6">
                        {questions[currentIdx] && (
                            <QuestionCard
                                question={questions[currentIdx].question}
                                options={questions[currentIdx].options}
                                onAnswer={handleAnswer}
                                selected={answers[currentIdx]}
                            />
                        )}

                        <div className="flex justify-between items-center">
                            <button
                                onClick={() => goToQuestion(Math.max(0, currentIdx - 1))}
                                disabled={currentIdx === 0}
                                className="px-6 py-3 text-gray-600 border-2 border-gray-300 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition-all duration-200"
                            >
                                ← Previous
                            </button>

                            <div className="flex gap-3">
                                {currentIdx === questions.length - 1 ? (
                                    <button
                                        onClick={finishQuiz}
                                        className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                                    >
                                        Submit Quiz 🎯
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => goToQuestion(Math.min(questions.length - 1, currentIdx + 1))}
                                        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                                    >
                                        Next →
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuizPage;
