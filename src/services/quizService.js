import API from "../api/api";

export const startQuiz = async ({
    subject,
    examType,
    examName,
    difficulty,
    numberOfQuestions,
}) => {
    const res = await API.post("/quiz/start", {
        subject,
        examType,
        examName: examName || null,
        difficulty,
        numberOfQuestions,
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