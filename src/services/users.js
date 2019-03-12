// @flow
import bcrypt from 'bcrypt';

import config from '../config';
import User, { type UserType } from '../models/user';

async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(config.saltRounds);

  return bcrypt.hash(password, salt);
}

export function isValidPassword(
  realPassword: string,
  comparePassword: string,
): Promise<boolean> {
  return bcrypt.compare(comparePassword, realPassword);
}

export async function saveNewUser({
  email,
  password,
}: UserType): Promise<string> {
  const hashedPassword = await hashPassword(password);

  const newUser = new User({
    email,
    password: hashedPassword,
  });

  await newUser.save();

  return newUser.id;
}

export function findUserByEmail(email: string): User {
  return User.findOne({ email }).exec();
}

export function findUserById(id: string): User {
  return User.findById(id).exec();
}
