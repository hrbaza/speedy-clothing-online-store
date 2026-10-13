import express from 'express';
import { loginUser, registerUser, adminLogin, validateToken, getProfile } from '../controllers/userController.js';
import authUser from '../middleware/auth.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/admin', adminLogin);
userRouter.get('/validate', validateToken);
userRouter.get('/profile', authUser, getProfile);

export default userRouter;