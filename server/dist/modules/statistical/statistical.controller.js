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
exports.StatisticalController = void 0;
const common_1 = require("@nestjs/common");
const statistical_service_1 = require("./statistical.service");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
let StatisticalController = class StatisticalController {
    constructor(statisticalService) {
        this.statisticalService = statisticalService;
    }
    getRevenue(query) {
        return this.statisticalService.getRevenue(query);
    }
    getRevenueByDate(query) {
        return this.statisticalService.getRevenueByDate(query);
    }
    getUserByMonth(query) {
        return this.statisticalService.getUserByMonth(query);
    }
};
__decorate([
    roles_decorator_1.hasRoles('admin'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    common_1.Get('/revenue'),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StatisticalController.prototype, "getRevenue", null);
__decorate([
    roles_decorator_1.hasRoles('admin'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    common_1.Get('/revenue/date'),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StatisticalController.prototype, "getRevenueByDate", null);
__decorate([
    roles_decorator_1.hasRoles('admin'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    common_1.Get('/user'),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StatisticalController.prototype, "getUserByMonth", null);
StatisticalController = __decorate([
    common_1.Controller('statistical'),
    __metadata("design:paramtypes", [statistical_service_1.StatisticalService])
], StatisticalController);
exports.StatisticalController = StatisticalController;
//# sourceMappingURL=statistical.controller.js.map