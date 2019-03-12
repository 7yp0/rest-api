// @flow
import joi from 'joi';

export const schemas = {
  authSchema: joi.object().keys({
    email: joi
      .string()
      .required()
      .email(),
    password: joi.string().required(),
  }),
};
