import Router from 'express';
import userRouter from './userRouter';
import testingRouter from './testingRouter';

const router = Router();

router.use('/user', userRouter);
router.use('/testing', testingRouter);

export default router;
