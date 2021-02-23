import * as mongoose from 'mongoose';

export const WorkShiftSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  startTime: String,
  endTime: String,
  createAt: {
    type: Date,
    default: Date.now
  },
  updateAt: Date
});


export const TimeKeepingSchema = new mongoose.Schema({
  idStaff: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'account'
  },
  idWorkShift: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'work-shift'
  },
  date: Date,
  completed: Boolean,
  createAt: {
    type: Date,
    default: Date.now
  },
  updateAt: Date
})

export const SalarySchema = new mongoose.Schema({
  valueOfHour: Number,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date
})
