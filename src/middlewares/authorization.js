// @flow
import type { $Request, $Response, $Next } from 'express';
import joi from 'joi';

import { verifyToken } from '../utils/authorization';
import UnauthorizedException from '../exceptions/UnauthorizedException';
import InvalidCredentialsException from '../exceptions/InvalidCredentialsException';
import ValidationException from '../exceptions/ValidationException';
import {
  findUserById,
  findUserByEmail,
  isValidPassword,
} from '../services/users';

export async function authorizeJwt(
  request: $Request,
  response: $Response,
  next: $Next,
): Promise<void> {
  try {
    const token = request.get('authorization');

    const decodedToken = verifyToken(token);

    if (!decodedToken) {
      throw new UnauthorizedException();
    }

    const user = await findUserById(decodedToken.sub);

    if (!user) {
      throw new UnauthorizedException();
    }

    next();
  } catch (error) {
    next(error);
  }
}

export async function verifyCredentials(
  request: $Request,
  response: $Response,
  next: $Next,
): Promise<void> {
  try {
    const { email, password } = request.body;
    const user = await findUserByEmail(email);

    if (!user) {
      throw new InvalidCredentialsException({ email, password });
    }

    const isMatch = await isValidPassword(user.password, password);

    if (!isMatch) {
      throw new InvalidCredentialsException({ email, password });
    }

    request.user = user;

    next();
  } catch (error) {
    next(error);
  }
}

export function validateAuthorizationBody(schema: Object): Function {
  return (request: $Request, response: $Response, next: $Next) => {
    const result = joi.validate(request.body, schema);

    if (result.error) {
      throw new ValidationException(result.error);
    }

    next();
  };
}
