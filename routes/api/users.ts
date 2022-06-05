import { NextFunction, Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';
import config from '../../config';
import UserModel from '../../models/user.model';
import authenticationMiddleware from '../../middleware/authentication.middleware';

const routes = Router();
const userModel = new UserModel();

routes.post(
  '/',
  authenticationMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await userModel.create(req.body);
      const token = jwt.sign({ user }, config.tokenSecret as unknown as string);
      res.json({
        status: 'success',
        data: { ...user, token },
        message: 'user created successfully'
      });
    } catch (err) {
      next(err);
    }
  }
);

routes.get(
  '/',
  authenticationMiddleware,
  async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await userModel.index();
      res.json({
        status: 'success',
        data: { users },
        message: 'users retrieved successfully'
      });
    } catch (err) {
      next(err);
    }
  }
);

routes.get(
  '/:id',
  authenticationMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await userModel.show(req.params.id as unknown as number);
      res.json({
        status: 'success',
        data: { user },
        message: 'user retrieved successfully'
      });
    } catch (err) {
      next(err);
    }
  }
);

routes.patch(
  '/:id',
  authenticationMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await userModel.edit(req.body);
      res.json({
        status: 'success',
        data: { user },
        message: 'user updated successfully'
      });
    } catch (err) {
      next(err);
    }
  }
);

routes.delete(
  '/:id',
  authenticationMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await userModel.delete(req.params.id as unknown as number);
      res.json({
        status: 'success',
        data: { user },
        message: 'user deleted successfully'
      });
    } catch (err) {
      next(err);
    }
  }
);

routes.post('/authenticate', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userName, password } = req.body;

    const user = await userModel.authenticate(userName, password);
    const token = jwt.sign({ user }, config.tokenSecret as unknown as string);
    if (!user) {
      return res.json({
        status: 'success',
        message: 'the username and password do not match please try again'
      });
    }
    return res.json({
      status: 'success',
      data: { ...user, token },
      message: 'user authenticated successfully'
    });
  } catch (err) {
    return next(err);
  }
});

export default routes;
