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
exports.TimeKeepingController = void 0;
const common_1 = require("@nestjs/common");
const time_keeping_service_1 = require("./time-keeping.service");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
let TimeKeepingController = class TimeKeepingController {
    constructor(timeKeepingService) {
        this.timeKeepingService = timeKeepingService;
    }
    getAllWorkShift() {
        return this.timeKeepingService.getAllWorkShift();
    }
    createWorkShift(data) {
        return this.timeKeepingService.createWorkShift(data);
    }
    deleteWorkShift(id) {
        return this.timeKeepingService.deleteWorkShift(id);
    }
    createCalendar(data) {
        return this.timeKeepingService.createCalendar(data);
    }
    getAllCalendar(query) {
        return this.timeKeepingService.getAllCalendar(query);
    }
    confirmCalendar(data) {
        return this.timeKeepingService.confirmCalendar(data);
    }
    createSalary(data) {
        return this.timeKeepingService.createSalary(data);
    }
    updateSalary(id, data) {
        return this.timeKeepingService.updateSalary(id, data);
    }
    getCalendarOfStaff(id) {
        return this.timeKeepingService.getCalendarOfStaff(id);
    }
    getSalary() {
        return this.timeKeepingService.getSalary();
    }
};
__decorate([
    roles_decorator_1.hasRoles('admin', 'staff'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    common_1.Get('/work-shift'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TimeKeepingController.prototype, "getAllWorkShift", null);
__decorate([
    roles_decorator_1.hasRoles('admin'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    common_1.Post('/work-shift'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TimeKeepingController.prototype, "createWorkShift", null);
__decorate([
    roles_decorator_1.hasRoles('admin'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    common_1.Delete('/work-shift/:workShiftId'),
    __param(0, common_1.Param('workShiftId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TimeKeepingController.prototype, "deleteWorkShift", null);
__decorate([
    roles_decorator_1.hasRoles('admin'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    common_1.Post('/calendar'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TimeKeepingController.prototype, "createCalendar", null);
__decorate([
    roles_decorator_1.hasRoles('admin', 'staff'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    common_1.Get('/calendar'),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TimeKeepingController.prototype, "getAllCalendar", null);
__decorate([
    roles_decorator_1.hasRoles('admin', 'staff'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    common_1.Put('/calendar/confirm'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TimeKeepingController.prototype, "confirmCalendar", null);
__decorate([
    roles_decorator_1.hasRoles('admin'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    common_1.Post('/salary'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TimeKeepingController.prototype, "createSalary", null);
__decorate([
    roles_decorator_1.hasRoles('admin'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    common_1.Put('/salary/:salaryId'),
    __param(0, common_1.Param('salaryId')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], TimeKeepingController.prototype, "updateSalary", null);
__decorate([
    roles_decorator_1.hasRoles('admin', 'staff'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    common_1.Get('/calendar/:staffId'),
    __param(0, common_1.Param('staffId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TimeKeepingController.prototype, "getCalendarOfStaff", null);
__decorate([
    common_1.Get('/salary'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TimeKeepingController.prototype, "getSalary", null);
TimeKeepingController = __decorate([
    common_1.Controller('time-keeping'),
    __metadata("design:paramtypes", [time_keeping_service_1.TimeKeepingService])
], TimeKeepingController);
exports.TimeKeepingController = TimeKeepingController;
//# sourceMappingURL=time-keeping.controller.js.map