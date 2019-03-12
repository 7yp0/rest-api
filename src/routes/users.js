// @flow
import express from 'express';

import {
  verifyCredentials,
  validateAuthorizationBody,
} from '../middlewares/authorization';
import { schemas } from '../utils/validation';
import { signUp, signIn } from '../controllers/users';

const router = express.Router();

router
  .route('/signup')
  .post(validateAuthorizationBody(schemas.authSchema), signUp);

router
  .route('/signin')
  .post(
    validateAuthorizationBody(schemas.authSchema),
    verifyCredentials,
    signIn,
  );

export default router;
