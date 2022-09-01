import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import ApiError from '../error/ApiError';
import { IUser } from '../types/types';
import { ADMIN, REGISTERED } from '../utils/consts';
import User from '../db/models/User';
import BaseController from './BaseController';
import { assignBodyAndProcessImages } from '../utils/functions';

const generateJwt = ({
  id,
  email,
  roles,
  avatar,
}: any, expiresIn?: string) => jwt.sign(
  {
    id,
    email,
    roles,
    avatar,
  },
  process.env.S_KEY!,
  {
    expiresIn,
  },
);

class UserController extends BaseController<User> {
  constructor() {
    super(User);
  }

  async registration(req: Request, res: Response, next: NextFunction) {
    const {
      email,
      password,
    } = req.body;
    const incompleteForm = !email || !password;
    if (incompleteForm) {
      return next(ApiError.badRequest('Incomplete form'));
    }
    const formattedEmail = ['', ''];
    email.split('@').forEach((p: string, i: number) => {
      formattedEmail[i] = p;
    });
    const [local, domain] = formattedEmail;
    const expectedLength = formattedEmail.length === 2;
    const validEmail = expectedLength && local && domain;
    if (!validEmail) {
      return next(ApiError.badRequest('Invalid email format'));
    }
    const validPassword = /(?=^\S{6,256}$)^.+$/i.test(password);
    if (!validPassword) {
      return next(ApiError.badRequest('Invalid password'));
    }
    const emailTaken = await User.findOne({ where: { email } });
    if (emailTaken) {
      return next(ApiError.conflict('Account with that email already exists'));
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({
      id: uuidv4(),
      email,
      password: hashPassword,
      roles: [REGISTERED],
    });
    if (process.env.NODE_ENV !== 'production') {
      user.roles.push(ADMIN);
    }
    const token = generateJwt(user, '24h');
    return res.json({ token });
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const {
      email,
      password: reqPassword,
    } = req.body;
    const user: IUser | null = await User.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      return next(ApiError.internal('Username/email not found'));
    }
    const userPassword = user.password;
    const comparePassword = bcrypt.compareSync(
      reqPassword,
      userPassword,
    );
    if (!comparePassword) {
      return next(ApiError.internal('Incorrect password'));
    }
    const token = generateJwt(user, '24h');
    return res.json({ token });
  }

  async auth(req: Request, res: Response) {
    const { user } = res.locals;
    const token = generateJwt(user, '24h');
    return res.json({ token });
  }

  async createGuestToken(req: Request, res: Response) {
    const id = uuidv4();
    const token = generateJwt({ id }, '365d');
    return res.json({ token });
  }

  async edit(req: Request, res: Response) {
    let updatedVals;
    if (req.files) {
      updatedVals = assignBodyAndProcessImages(req);
    } else {
      updatedVals = req.body;
    }
    if ('password' in updatedVals) {
      const hashPassword = await bcrypt.hash(updatedVals.password, 5);
      updatedVals.password = hashPassword;
    }
    const { id } = res.locals.user;
    const updatedObj = await User.update(updatedVals, { where: { id }, returning: true });
    const token = generateJwt(updatedObj[1][0], '24h');
    return res.json({ token });
  }

  async delete(req: Request, res: Response) {
    this.execDestroy(req, res);
  }
}

export default new UserController();
