const { connect } = require('mongoose');
let { MONGODB_URI } = require('../core/config');
const { logger } = require('../utils/logger');
const { throwError } = require('../utils/handleErrors');

module.exports = class Database {
  static async db() {
    try {
    const connection =  connect(MONGODB_URI);

      if (!connection) {
        throwError('Unable to connect to database', 500);
      }
      logger.info('Database connection successful!');
    } catch (err) {
      logger.error('Database connection failed!');
    }
  }
};
