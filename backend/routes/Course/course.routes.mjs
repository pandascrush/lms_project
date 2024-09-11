import express from "express";
import upload from "../../middleware/fileUpload.mjs";
import {
  addCourse,
  addModule,
  getActivityData,
  getCourse,
  getModule,
  getModuleByCourseId,
  getModulesByCourseId,
  getStructuredData,
  submitCourseContent,
} from "../../controller/Course/course.controller.mjs";
const router = express.Router();

router.post("/addcourse", upload.single("courseImage"), addCourse);
router.post("/addmodule", upload.single("moduleImage"), addModule);
router.get("/getcourse", getCourse);
router.get("/getmodule", getModule);
router.get("/getmodule/:courseId", getModulesByCourseId); // using isnide the Lessons compoennt
router.get("/getmodules/:courseId", getModuleByCourseId); // using inside the Coursecontent component
router.post("/submitcon", upload.single("image"), submitCourseContent); // using inside the Coursecontent component
router.get("/structured-data", getStructuredData);

router.get("/activity/:course_id/:module_id", getActivityData);

export default router;
