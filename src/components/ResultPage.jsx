import { CheckCircle, AlertCircle } from 'lucide-react';
const ResultPage = ({ questions, answers }) => {
    const calculateScore = () => {
        let correct = 0;
        questions.forEach((q, index) => {
            if (answers[index] === q.correctAnswer) {
                correct++;
            }
        });
        return correct;
    };

    const score = calculateScore();
    const percentage = Math.round((score / questions.length) * 100);
    const getGrade = () => {
        if (percentage >= 90) return { grade: 'A+', color: 'text-green-600', bg: 'bg-green-50' };
        if (percentage >= 80) return { grade: 'A', color: 'text-green-600', bg: 'bg-green-50' };
        if (percentage >= 70) return { grade: 'B', color: 'text-blue-600', bg: 'bg-blue-50' };
        if (percentage >= 60) return { grade: 'C', color: 'text-yellow-600', bg: 'bg-yellow-50' };
        return { grade: 'F', color: 'text-red-600', bg: 'bg-red-50' };
    };

    const gradeInfo = getGrade();

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 py-8">
            <div className="max-w-5xl mx-auto px-6">
                <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8 border border-gray-100">
                    <div className="text-center">
                        <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                            Quiz Complete! 🎉
                        </h1>
                        <p className="text-gray-600 mb-6">Here's how you performed</p>

                        <div className="flex justify-center items-center gap-8 mb-6">
                            <div className="text-center">
                                <div className="text-4xl font-bold text-blue-600">{score}</div>
                                <div className="text-sm text-gray-600 font-semibold">Correct</div>
                            </div>
                            <div className="text-3xl text-gray-400">/</div>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-gray-800">{questions.length}</div>
                                <div className="text-sm text-gray-600 font-semibold">Total</div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-green-600">{percentage}%</div>
                                <div className="text-sm text-gray-600 font-semibold">Score</div>
                            </div>
                            <div className="text-center">
                                <div className={`text-4xl font-bold ${gradeInfo.color}`}>{gradeInfo.grade}</div>
                                <div className="text-sm text-gray-600 font-semibold">Grade</div>
                            </div>
                        </div>

                        <div className={`inline-block px-6 py-3 rounded-xl ${gradeInfo.bg} ${gradeInfo.color} font-semibold`}>
                            {percentage >= 80 ? "Excellent work! 🌟" :
                                percentage >= 60 ? "Good job! 👍" :
                                    "Keep practicing! 💪"}
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
                        <h2 className="text-2xl font-bold text-white">📊 Detailed Report</h2>
                        <p className="text-blue-100">Review your answers and learn from mistakes</p>
                    </div>

                    <div className="divide-y divide-gray-100">
                        {questions.map((q, i) => {
                            const userAnswer = answers[i];
                            const isCorrect = userAnswer === q.correctAnswer;

                            return (
                                <div key={i} className="p-6 hover:bg-gray-50 transition-colors duration-200">
                                    <div className="flex items-start gap-4">
                                        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                            }`}>
                                            {i + 1}
                                        </div>

                                        <div className="flex-1">
                                            <h3
                                                className="font-semibold text-gray-800 mb-4 text-lg"
                                                dangerouslySetInnerHTML={{ __html: q.question }}
                                            />

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                                <div>
                                                    <h4 className="text-sm font-bold text-gray-600 mb-2">Your Answer:</h4>
                                                    <div className={`p-4 rounded-xl border-2 ${isCorrect
                                                        ? 'bg-green-50 border-green-200 text-green-800'
                                                        : userAnswer
                                                            ? 'bg-red-50 border-red-200 text-red-800'
                                                            : 'bg-gray-50 border-gray-200 text-gray-600'
                                                        }`}>
                                                        <span dangerouslySetInnerHTML={{ __html: userAnswer || 'No answer selected' }} />
                                                    </div>
                                                </div>

                                                <div>
                                                    <h4 className="text-sm font-bold text-gray-600 mb-2">Correct Answer:</h4>
                                                    <div className="p-4 rounded-xl bg-green-50 border-2 border-green-200 text-green-800">
                                                        <span dangerouslySetInnerHTML={{ __html: q.correctAnswer }} />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                {isCorrect ? (
                                                    <>
                                                        <CheckCircle className="w-5 h-5 text-green-600" />
                                                        <span className="text-sm font-bold text-green-600">Correct! Well done! ✨</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <AlertCircle className="w-5 h-5 text-red-600" />
                                                        <span className="text-sm font-bold text-red-600">Incorrect - Review this topic 📚</span>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ResultPage;