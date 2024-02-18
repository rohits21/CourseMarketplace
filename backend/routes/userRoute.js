import express from 'express';
import { changePassword, forgetPassword, getuserProfile, loginUser, logoutUser, registerUser, resetPassword, updateUserProfile, addToPlaylist, removeFromPlaylist, updateUserProfilePicture, getAllUser, updateUserRole, deleteUser } from '../controllers/userController.js';
import { authorizeAdmin, isAuthenticated } from '../middlewares/auth.js';
import singleUpload from '../middlewares/multer.js';

const router = express.Router();

router.route('/register').post(singleUpload, registerUser)
router.route('/login').post(loginUser)
router.route('/logout').get(logoutUser)
router.route('/me').get( isAuthenticated, getuserProfile)
router.route('/changepassword').put(isAuthenticated, changePassword)
router.route('/updateprofile').put(isAuthenticated, updateUserProfile)
router.route("/updateprofilepicture").put(isAuthenticated,singleUpload, updateUserProfilePicture)
router.route('/forgetpassword').post(forgetPassword)
router.route('/resetpassword/:token').put(resetPassword)
router.route('/addtoplaylist').post(isAuthenticated,addToPlaylist)
router.route('/removefromplaylist').delete(isAuthenticated,removeFromPlaylist)
router.route('/admin/getallusers').get(isAuthenticated, authorizeAdmin,getAllUser )
router.route('/admin/updateuserrole/:id').put(isAuthenticated, authorizeAdmin,updateUserRole )
router.route('/admin/deleteuser/:id').delete(isAuthenticated, authorizeAdmin, deleteUser)

export default router;