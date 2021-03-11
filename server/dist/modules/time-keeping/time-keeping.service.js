"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeKeepingService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const moment = require('moment');
let TimeKeepingService = class TimeKeepingService {
    constructor(workShiftModel, accountModel, timeKeepingModel, salaryModel) {
        this.workShiftModel = workShiftModel;
        this.accountModel = accountModel;
        this.timeKeepingModel = timeKeepingModel;
        this.salaryModel = salaryModel;
    }
    async getAllWorkShift() {
        try {
            const res = await this.workShiftModel.find();
            return res;
        }
        catch (e) {
            throw e;
        }
    }
    async createWorkShift(data) {
        const { name, startTime, endTime } = data;
        try {
            const workShift = new this.workShiftModel({
                name,
                startTime,
                endTime
            });
            await workShift.save();
            return workShift;
        }
        catch (e) {
            throw e;
        }
    }
    async deleteWorkShift(id) {
        try {
            const res = await this.workShiftModel.findByIdAndDelete(id);
            return res;
        }
        catch (e) {
            throw e;
        }
    }
    async getAllCalendar(query) {
        try {
            if (query && query.date) {
                query.date = new Date(query.date);
                const res = await this.timeKeepingModel.find().populate({ path: 'idStaff' });
                const resFilter = res.filter(val => moment(val.date).format('DD/MM/YYYY') === moment(query.date).format('DD/MM/YYYY'));
                return resFilter;
            }
            else if (query && query.weekFromDate && query.weekToDate) {
                query.weekFromDate = new Date(query.weekFromDate);
                query.weekToDate = new Date(query.weekToDate);
                const res = await this.timeKeepingModel.find().populate({ path: 'idStaff' });
                const resFilter = res.filter(val => val.date >= query.weekFromDate &&
                    val.date <= query.weekToDate);
                return resFilter;
            }
            else if (query && query.year && query.month) {
                const res = await this.timeKeepingModel.find().populate({ path: 'idStaff' }).populate({ path: 'idWorkShift' });
                const resFilter = res.filter(val => Number(moment(val.date).format('YYYY')) === Number(query.year) &&
                    Number(moment(val.date).format('MM')) === Number(query.month));
                return resFilter;
            }
            else {
                const res = await this.timeKeepingModel.find();
                return res;
            }
        }
        catch (e) {
            throw e;
        }
    }
    async createCalendar(data) {
        const { date, idWorkShift, staff } = data;
        if (moment(date).format('DD/MM/yyyy') < moment(new Date()).format('DD/MM/yyyy')) {
            throw new common_1.ConflictException();
        }
        try {
            const timeKeeping = await this.timeKeepingModel.find({ idWorkShift: idWorkShift });
            if (timeKeeping && timeKeeping.length > 0) {
                const timeKeepingByDate = timeKeeping.filter(val => moment(val.date).format('DD/MM/YYYY') === moment(date).format('DD/MM/YYYY'));
                if (timeKeepingByDate && timeKeepingByDate.length > 0) {
                    throw new common_1.ConflictException({ message: 'calendar is exist' }, 'calendar conflict');
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
                });
                await calendar.save();
                dataReturn.push(calendar);
            }
            return dataReturn;
        }
        catch (e) {
            throw e;
        }
    }
    async getSalary() {
        try {
            const res = await this.salaryModel.find();
            return res;
        }
        catch (e) {
            throw e;
        }
    }
    async createSalary(data) {
        const valueOfHour = Number(data.valueOfHour);
        try {
            const data = new this.salaryModel({
                valueOfHour
            });
            await data.save();
            return data;
        }
        catch (e) {
            throw e;
        }
    }
    async updateSalary(id, data) {
        const valueOfHour = Number(data.valueOfHour);
        try {
            const res = await this.salaryModel.findByIdAndUpdate(id, {
                valueOfHour,
            }, {
                new: true,
                upsert: false,
                runValidators: true
            });
            await res.save();
            console.log(res);
            return res;
        }
        catch (e) {
            throw e;
        }
    }
    async getCalendarOfStaff(id) {
        try {
            const res = await this.timeKeepingModel.find({ idStaff: id })
                .populate({ path: 'idWorkShift' });
            return res;
        }
        catch (e) {
            throw e;
        }
    }
    async confirmCalendar(data) {
        const { idStaff, idWorkShift, date } = data;
        try {
            const res = await this.timeKeepingModel.findOneAndUpdate({ idStaff, idWorkShift, date }, {
                completed: true
            }, {
                new: true,
                upsert: true
            });
            await res.save();
            return res;
        }
        catch (e) {
            throw e;
        }
    }
};
TimeKeepingService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('work-shift')),
    __param(1, mongoose_1.InjectModel('account')),
    __param(2, mongoose_1.InjectModel('time-keeping')),
    __param(3, mongoose_1.InjectModel('salary')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], TimeKeepingService);
exports.TimeKeepingService = TimeKeepingService;
//# sourceMappingURL=time-keeping.service.js.map