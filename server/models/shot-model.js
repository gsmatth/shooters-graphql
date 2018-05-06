'use strict';
import mongoose from 'mongoose';

const shotSchema = mongoose.Schema({
  userId:         {type: mongoose.Schema.ObjectId, required: true},
  matchId:        {type: mongoose.Schema.ObjectId},
  barrelName:     {type: String},
  barrelId:       {type: mongoose.Schema.ObjectId},
  isXValue:       {type: Boolean, required: true},
  score:          {type: String, required: true},
  dateOf:         {type: String},
  shotNumber:     {type: Number, required: true},
  polarCoords:    {type: Array},
  cartesianCoords: {type: Array},
  elevation:      {type: Number},
  windage:        {type: Number},
  practice:       {type: Boolean},
  sighter:        {type: Boolean},
  record:         {type: Boolean}
});

export default mongoose.model('shot', shotSchema);