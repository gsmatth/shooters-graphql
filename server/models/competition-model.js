'use strict';

import mongoose from 'mongoose';

const competitionSchema = mongoose.Schema({
  userId: {type: mongoose.Schema.ObjectId, required:true},
  rifleId: {type: mongoose.Schema.ObjectId},
  rifleName: {type: String},
  location: {type: String, required: true},
  action: {type: String, required: true},
  caliber: {type: Number, required:true},
  dateOf: {type: String}
});

export default mongoose.model('competition', competitionSchema);