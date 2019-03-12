// @flow
import Es6Error from 'es6-error';

class NotFoundException extends Es6Error {
  type = 'NotFoundException';
  status = 404;
  code = '005';

  constructor(payload?: ?Object = null) {
    super('Not Found');

    this.payload = payload;
  }
}

export default NotFoundException;
