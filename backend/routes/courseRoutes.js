import express from 'express';
import { addLecture, deleteCourse, deleteLecture, getAllCourses } from '../controllers/courseController.js';
import { createCourse, getCourseLectures } from '../controllers/courseController.js';
import singleUpload from '../middlewares/multer.js';
import { authorizeAdmin, authorizeSubscribers, isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

router.route("/courses").get(getAllCourses)

router.route("/createcourse").post(isAuthenticated, authorizeAdmin, singleUpload, createCourse)

router.route("/course/:id").get(isAuthenticated, authorizeSubscribers ,getCourseLectures)

router.route("/addlecture/:id").put(isAuthenticated, authorizeAdmin,singleUpload,addLecture)

router.route("/deletecourse/:id").delete(isAuthenticated, authorizeAdmin, deleteCourse)

router.route("/deletelecture", isAuthenticated, authorizeAdmin, deleteLecture)

export default router;