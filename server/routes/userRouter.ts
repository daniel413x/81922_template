import Router from 'express';
import UserController from '../controllers/UserController';
import checkRoleMiddleware from '../middleware/checkRoleMiddleware';
import authMiddleware from '../middleware/authMiddleware';
import { REGISTERED } from '../utils/consts';

const router = Router();

router.get(
  '/auth',
  authMiddleware,
  (req, res) => UserController.auth(req, res),
);
router.post(
  '/guesttoken',
  (req, res) => UserController.createGuestToken(req, res),
);
router.post(
  '/registration',
  (req, res, next) => UserController.registration(req, res, next),
);
router.post(
  '/login',
  (req, res, next) => UserController.login(req, res, next),
);
router.put(
  '/',
  checkRoleMiddleware(REGISTERED),
  (req, res) => UserController.edit(req, res),
);
router.delete(
  '/:id',
  (req, res) => UserController.delete(req, res),
);

export default router;
