// @flow
import express from 'express';

import { authorizeJwt } from '../middlewares/authorization';
import { getTodos } from '../controllers/todos';

const router = express.Router();

router.route('/').get(authorizeJwt, getTodos);

export default router;
