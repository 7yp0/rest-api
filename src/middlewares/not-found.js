// @flow

import NotFoundException from '../exceptions/NotFoundException';

export const notFound = () => {
  throw new NotFoundException();
};
