// @flow
import type { $Request, $Response, $Next } from 'express';

import { saveNewUser, findUserByEmail } from '../services/users';
import { signToken } from '../utils/authorization';
import UserAlreadyExistsException from '../exceptions/UserAlreadyExistsException';

export async function signUp(
  request: $Request,
  response: $Response,
  next: $Next,
): Promise<void> {
  try {
    const { email, password } = request.body;

    const user = await findUserByEmail(email);

    if (user) {
      throw new UserAlreadyExistsException(email);
    }

    const id = await saveNewUser({
      email,
      password,
    });

    const token = signToken(id);

    response.status(200).json({ token });

    next();
  } catch (error) {
    next(error);
  }
}

export function signIn(request: $Request, response: $Response, next: $Next) {
  const {
    user: { id },
  } = request;

  const token = signToken(id);

  response.status(200).json({ token });

  next();
}
