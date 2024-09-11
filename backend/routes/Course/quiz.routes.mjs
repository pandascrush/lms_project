import express from "express";
import {
  addQuestion,
  createQuiz,
  fetchQuizQuestions,
  getQuestion,
  getQuestionsByModuleAndCourse,
  getQuizType,
} from "../../controller/Course/quiz.controller.mjs";
const router = express.Router();

router.post("/addquestion", addQuestion);
router.get("/getquestion", getQuestion);
router.get("/questions/:course/:module", getQuestionsByModuleAndCourse);
router.get("/getquiztype", getQuizType);
router.get("/fetch/:courseId/:moduleId/:quizTypeId", fetchQuizQuestions);

router.post("/createquiz", createQuiz);

export default router;
