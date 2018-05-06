'use strict';

import mongoose from 'mongoose';
import user from '../models/user-model';

  exports.dropUserCollection = function() {
    console.log('entered dropUserCollection');
    const BASE_URL = 'mongodb://localhost:27107/';
    const MONGO_URL = `${BASE_URL}${process.env.TEST_DB}`;
    mongoose.connect(MONGO_URL);
    const db = mongoose.connection;
    db.user.drop();
  };
