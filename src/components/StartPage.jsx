import { Timer, AlertCircle } from 'lucide-react';
import { useState } from 'react';

const StartPage = ({ onStart }) => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const handleStart = () => {
        if (email.trim() && email.includes('@')) {
            setError('');
            onStart(email);
        } else {
            setError('Please enter a valid email address');
        }
    };
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 flex items-center justify-center p-6">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md border border-gray-100">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Timer className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                        Quiz Challenge
                    </h1>
                    <p className="text-gray-600 text-sm">
                        Test your knowledge with 15 carefully selected questions
                    </p>
                </div>

                <div className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                            placeholder="Enter your email"
                            onKeyPress={(e) => e.key === 'Enter' && handleStart()}
                        />
                    </div>

                    {error && (
                        <div className="text-red-600 text-sm flex items-center gap-2 bg-red-50 p-3 rounded-lg">
                            <AlertCircle className="w-4 h-4 flex-shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    <button
                        onClick={handleStart}
                        className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-6 rounded-xl hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                        Start Quiz Challenge
                    </button>
                </div>

                <div className="mt-6 text-center text-xs text-gray-500">
                    <p>⏱️ 30 minutes • 📝 15 questions • 🏆 Instant results</p>
                </div>
            </div>
        </div>
    );
};

export default StartPage;