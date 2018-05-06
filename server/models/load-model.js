'use strict';
import mongoose from 'mongoose';

const loadSchema = mongoose.Schema({
  userId:             {type: mongoose.Schema.ObjectId, required: true},
  loadName:           {type: String},
  brassBrand:         {type: String},
  brassCaliber:       {type: Number},
  brassLot:           {type: String},
  powderBrand:        {type: String},
  powderName:         {type: String},
  powderWeight:       {type: Number},
  powderLot:          {type: String},
  bulletBrand:        {type: String},
  bulletCaliber:      {type: Number},
  bulletWeight:       {type: Number},
  bulletLot:          {type: String},
  primerBrand:        {type: String},
  primerName:         {type: String},
  primerLot:          {type: String},
  roundOAL:           {type: Number},
  muzzleVelocity:     {type: Number}
});

export default mongoose.model('load', loadSchema);