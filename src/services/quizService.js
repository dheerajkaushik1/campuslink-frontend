import API from "../api/api";

export const startQuiz = async (subject, difficulty) => {
    const res = await API.post("/quiz/start", {
        subject,
        difficulty,
    });

    return res.data;
};

export const submitQuiz = async (quizId, answers) => {
    const res = await API.post("/quiz/submit", {
        quizId,
        answers,
    });

    return res.data;
};

export const getLeaderboard = async () => {
    const res = await API.get("/quiz/leaderboard");
    return res.data;
};