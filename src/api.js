import { shuffle } from "./utils";
let isFetching = false;

export async function fetchQuestions() {
    const API_URL = import.meta.env.VITE_API;
    if (isFetching) {
        console.warn("Fetch blocked to prevent duplicate requests");    
        return [];
    };
    isFetching = true;
    try {
        const res = await fetch(API_URL);
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