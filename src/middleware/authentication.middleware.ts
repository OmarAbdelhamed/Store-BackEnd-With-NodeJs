import { NextFunction, Request, Response } from 'express';
import Error from '../interfaces/error.interface';
import config from '../config';
import jwt from 'jsonwebtoken';

const handleUnauthorizedError = (next: NextFunction) => {
  const error: Error = new ErrorEvent('Login Error: Please try again');
  error.status = 401;
  next(error);
};

const ValidateTokenMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.get('Authorization');
    if (authHeader) {
      const bearer = authHeader.split(' ')[0].toLowerCase();
      const token = authHeader.split(' ')[1];
      if (token && bearer === 'bearer') {
        const decode = jwt.verify(
          token,
          config.tokenSecret as unknown as string
        );
        if (decode) {
          next();
        } else {
          handleUnauthorizedError(next);
        }
      } else {
        //failed to auth. user
        handleUnauthorizedError(next);
      }
    } else {
      // no token provided
      handleUnauthorizedError(next);
    }
  } catch (error) {
    // token type is not bearer
    handleUnauthorizedError(next);
  }
};

export default ValidateTokenMiddleware;
