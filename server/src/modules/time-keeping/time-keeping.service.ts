import {ConflictException, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model, mongo} from 'mongoose';
import {Account} from '../auth/interface/auth.interface';
const moment = require('moment');

@Injectable()
export class TimeKeepingService {
    constructor(
        @InjectModel('work-shift') private workShiftModel: Model<any>,
        @InjectModel('account') private accountModel: Model<Account>,
        @InjectModel('time-keeping') private timeKeepingModel: Model<any>,
        @InjectModel('salary') private salaryModel: Model<any>,

    ) {}

    async getAllWorkShift(): Promise<any> {
        try {
            const res = await this.workShiftModel.find();
            return res;
        } catch (e) {
            throw e;
        }
    }
    async createWorkShift(data: any): Promise<any> {
        const {name, startTime, endTime} = data;
        try {
            const workShift = new this.workShiftModel({
                name,
                startTime,
                endTime
            })
            await workShift.save();
            return workShift;
        } catch (e) {
            throw e;
        }
    }

    async deleteWorkShift(id: string) {
        try {
            const res = await this.workShiftModel.findByIdAndDelete(id);
            return res;
        } catch (e) {
            throw e;
        }
    }
    async getAllCalendar(query): Promise<any> {
        try {
            if (query && query.date) {
                query.date = new Date(query.date);
                const res = await this.timeKeepingModel.find().populate({path: 'idStaff'});
                const resFilter = res.filter(val => moment(val.date).format('DD/MM/YYYY') === moment(query.date).format('DD/MM/YYYY'));
                return resFilter;
            }
            else if (query && query.weekFromDate && query.weekToDate) {
                query.weekFromDate = new Date(query.weekFromDate);
                query.weekToDate = new Date(query.weekToDate);
                const res = await this.timeKeepingModel.find().populate({path: 'idStaff'});
                const resFilter = res.filter(val => val.date >= query.weekFromDate &&
                                                    val.date <= query.weekToDate
                );
                return resFilter;
            }
            else if (query && query.year && query.month) {
                const res = await this.timeKeepingModel.find().populate({path: 'idStaff'}).populate({path: 'idWorkShift'});
                const resFilter = res.filter(val => Number(moment(val.date).format('YYYY')) === Number(query.year) &&
                                                  Number(moment(val.date).format('MM')) === Number(query.month)
                )
                return resFilter;
            } else {
                const res = await this.timeKeepingModel.find();
                return res;
            }
        } catch (e) {
            throw e;
        }
    }

    async createCalendar(data: any): Promise<any> {
        const {date, idWorkShift, staff} = data;
        if (moment(date).format('DD/MM/yyyy') < moment(new Date()).format('DD/MM/yyyy')) {
            throw new ConflictException();
        }
        try {
            const timeKeeping = await this.timeKeepingModel.find({idWorkShift: idWorkShift});
            if (timeKeeping && timeKeeping.length > 0) {
                const timeKeepingByDate = timeKeeping.filter(val => moment(val.date).format('DD/MM/YYYY') === moment(date).format('DD/MM/YYYY'));
                if (timeKeepingByDate && timeKeepingByDate.length > 0) {
                    throw new ConflictException({message: 'calendar is exist'}, 'calendar conflict');
                }
            }
            const dataReturn = [];
            for (const item of staff) {
                const idStaff = await this.accountModel.findById(item._id);
                const calendar = new this.timeKeepingModel({
                    date,
                    idWorkShift,
                    idStaff,
                    completed: false
                })
                await calendar.save();
                dataReturn.push(calendar);
            }
            return dataReturn;

        } catch (e) {
            throw e;
        }
    }

    async getSalary() {
        try {
            const res = await this.salaryModel.find();
            return res;
        } catch (e) {
            throw e;
        }
    }
    async createSalary(data: {
        valueOfHour: number
    }): Promise<any> {
        const valueOfHour = Number(data.valueOfHour);
        try {
            const data = new this.salaryModel({
                valueOfHour
            })
            await data.save();
            return data;
        } catch (e) {
            throw e;
        }
    }

    async  updateSalary(id: string, data: { valueOfHour: number }): Promise<any> {
        const valueOfHour = Number(data.valueOfHour);
        try {
            const res = await this.salaryModel.findByIdAndUpdate(id, {
                valueOfHour,
            }, {
                new: true,
                upsert: false,
                runValidators: true
            })
            await res.save();
            console.log(res);
            return res;
        } catch (e) {
            throw e;
        }
    }

    async getCalendarOfStaff(id: string): Promise<any> {
        try {
            const res = await this.timeKeepingModel.find({idStaff: id})
                .populate({path: 'idWorkShift'})
            return res;
        } catch (e) {
            throw e;
        }
    }


    async confirmCalendar(data: {
        idStaff: string,
        idWorkShift: string,
        date: any
    }): Promise<any> {
        const { idStaff, idWorkShift, date } = data;
        try {
            const res = await this.timeKeepingModel.findOneAndUpdate(
                {idStaff, idWorkShift, date}, {
                completed: true
            }, {
                new: true,
                upsert: true
            })
            await res.save();
            return res;

        } catch (e) {
            throw e;
        }
    }

}
