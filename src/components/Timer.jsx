import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

const Timer = ({ duration, onTimeUp }) => {
    const [timeLeft, setTimeLeft] = useState(duration);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(interval);
                    onTimeUp();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [onTimeUp]);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const isLowTime = timeLeft < 300;
    const isCritical = timeLeft < 60;

    return (
        <div className={`flex items-center gap-3 px-4 py-2 rounded-xl font-mono text-lg font-bold transition-all duration-300 ${isCritical
            ? 'bg-red-100 text-red-700 border-2 border-red-300 animate-pulse'
            : isLowTime
                ? 'bg-orange-100 text-orange-700 border-2 border-orange-300'
                : 'bg-blue-100 text-blue-700 border-2 border-blue-300'
            }`}>
            <Clock className="w-5 h-5" />
            <span>
                {minutes}:{seconds.toString().padStart(2, '0')}
            </span>
            {isLowTime && <span className="text-xs font-normal">hurry up!</span>}
        </div>
    );
};

export default Timer;
