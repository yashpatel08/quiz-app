import { shuffle } from "./utils";
let isFetching = false;

export async function fetchQuestions() {
    if (isFetching) {
        console.warn("Fetch blocked to prevent duplicate requests");    
        return [];
    };
    isFetching = true;
    try {
        const res = await fetch('https://opentdb.com/api.php?amount=15');
        const data = await res.json();
        return data.results.map(q => ({
            question: q.question,
            options: shuffle([q.correct_answer, ...q.incorrect_answers]),
            correctAnswer: q.correct_answer
        }));
    } finally {
        isFetching = false;
    }
}