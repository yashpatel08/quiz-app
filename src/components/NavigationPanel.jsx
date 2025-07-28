const NavigationPanel = ({ questions, currentIdx, setCurrentIdx, answers, visited }) => {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                Question Overview
            </h3>
            <div className="grid grid-cols-5 gap-3">
                {questions.map((_, idx) => {
                    const isAnswered = answers[idx];
                    const isCurrent = idx === currentIdx;
                    const isVisited = visited?.has(idx); // safe check

                    let btnStyle = 'bg-gray-100 text-gray-600 hover:bg-gray-200 border-2 border-gray-200 hover:border-gray-300'; // pending

                    if (isVisited) {
                        btnStyle = 'bg-yellow-100 text-yellow-800 border-yellow-300 hover:bg-yellow-200';
                    }

                    if (isAnswered) {
                        btnStyle = 'bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-md hover:shadow-lg';
                    }

                    if (isCurrent) {
                        btnStyle = 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg';
                    }

                    return (
                        <button
                            key={idx}
                            onClick={() => setCurrentIdx(idx)}
                            className={`w-10 h-10 rounded-xl text-sm font-bold flex items-center justify-center transition-all duration-200 transform hover:scale-105 ${btnStyle}`}
                        >
                            {idx + 1}
                        </button>
                    );
                })}
            </div>

            <div className="mt-4 grid grid-cols-4 gap-2 text-xs">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded"></div>
                    <span className="text-gray-600">Current</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded"></div>
                    <span className="text-gray-600">Answered</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-100 border border-yellow-300 rounded"></div>
                    <span className="text-gray-600">Visited</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gray-200 rounded border"></div>
                    <span className="text-gray-600">Pending</span>
                </div>
            </div>
        </div>
    );
};

export default NavigationPanel;
