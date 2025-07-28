import { CheckCircle } from 'lucide-react';

const QuestionCard = ({ question, options, onAnswer, selected }) => {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h2
                className="text-xl font-semibold text-gray-800 mb-8 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: question }}
            />

            <div className="space-y-4">
                {options.map((option, index) => {
                    const isSelected = selected === option;
                    const letters = ['A', 'B', 'C', 'D'];

                    return (
                        <button
                            key={index}
                            onClick={() => onAnswer(option)}
                            className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 transform hover:scale-[1.02] ${isSelected
                                ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-300 text-blue-800 shadow-md'
                                : 'bg-gray-50 border-gray-200 hover:bg-gray-100 hover:border-gray-300 text-gray-700'
                                }`}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${isSelected
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-300 text-gray-600'
                                    }`}>
                                    {letters[index]}
                                </div>
                                <span
                                    className="flex-1"
                                    dangerouslySetInnerHTML={{ __html: option }}
                                />
                                {isSelected && <CheckCircle className="w-5 h-5 text-blue-600" />}
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default QuestionCard