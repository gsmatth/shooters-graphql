'use strict';
import mongoose from 'mongoose';

const rifleSchema = mongoose.Schema({
  userId:             {type: mongoose.Schema.ObjectId, required: true},
  rifleName:          {type: String},
  rifleBrand:         {type: String},
  rifleModel:         {type: String},
  rifleAction:        {type: String},
  rifleCategory:      {type: String},
  barrelName:         {type: String},
  barrelId:           {type: mongoose.Schema.ObjectId},
  userId:             {type: mongoose.Schema.ObjectId},  
});

export default mongoose.model('rifle', rifleSchema);