'use strict';
import mongoose from 'mongoose';

const matchSchema = mongoose.Schema({
  userId:               {type: mongoose.Schema.ObjectId, required: true},
  competitionId:        {type: mongoose.Schema.ObjectId, required: true},
  matchNumber:          {type: Number, required: true},
  targetNumber:         {type: Number, required: true},
  distanceToTarget:     {type: Number, required: true},
  relay:                {type: Number},
  startTime:            {type: String},
  temperature:          {type: Number},
  windClockDirection:   {type: Number},
  windSpeed:            {type: Number},
  lightClockDirection:  {type: Number},
  weather:              {type: String}
});

export default mongoose.model('match', matchSchema);