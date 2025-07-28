# 🧠 Quiz App

A responsive and dynamic Quiz Application built with **React**, **Tailwind CSS**, and the **Open Trivia DB API**. It includes a countdown timer, question navigation, result analysis, and visual feedback on quiz progress.

---

## 🚀 Features

- 🌐 Fetches 15 random questions from Open Trivia DB
- ✅ Tracks answered and visited questions
- ⏱️ Countdown timer with color-coded urgency
- 📱 Fully responsive using Tailwind CSS
- 📊 Instant result page on submit

---

## 🛠️ Tech Stack

- **React.js**
- **Tailwind CSS**
- **Lucide-react**
- **Open Trivia DB API**

---

## 📦 Installation

```bash
git clone https://github.com/your-username/quiz-app.git
cd quiz-app
npm install
npm run dev
```

📁 Folder Structure
```
src/
├── components/
│   ├── NavigationPanel.jsx
│   ├── QuestionCard.jsx
│   ├── QuizPage.jsx
│   ├── ResultPage.jsx
│   ├── StartPage.jsx
│   └── Timer.jsx
├── api.js
├── utils.js
├── App.jsx
├── main.jsx
└── app.css
```

🌐 API Used
``` GET https://opentdb.com/api.php?amount=15 ```


🎮 How It Works
1. User enters their email to begin.
2. App fetches 15 multiple-choice questions from Open Trivia DB.
3. A countdown timer starts (default: 30 minutes).
4. User navigates questions and selects answers.
5. On submission or when time runs out, the result is calculated and shown.

🎨 UI Feedback
- 🟩 Green: Answered question
- 🔵 Blue: Current question
- ⚪️ Gray: Unanswered (Pending)
- 🟠 Orange / 🔴 Red: Timer alert (less than 5 or 1 minute)
