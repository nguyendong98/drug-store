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
exports.OrderController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const order_service_1 = require("./order.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const roles_guard_1 = require("../auth/guards/roles.guard");
let OrderController = class OrderController {
    constructor(orderService) {
        this.orderService = orderService;
    }
    getAll(query) {
        return this.orderService.getAll(query);
    }
    create(req, data) {
        return this.orderService.create(req.user._id, data);
    }
    approveOrder(req, data) {
        return this.orderService.approveOrder(req.user._id, data);
    }
    getById(_id) {
        return this.orderService.getDetail(_id);
    }
    createNow(req, data) {
        return this.orderService.createOrderNow(req.user._id, data);
    }
};
__decorate([
    common_1.Get(''),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getAll", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post(''),
    __param(0, common_1.Request()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "create", null);
__decorate([
    roles_decorator_1.hasRoles('admin', 'staff'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    common_1.Put('/approve'),
    __param(0, common_1.Request()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "approveOrder", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Get('/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "getById", null);
__decorate([
    roles_decorator_1.hasRoles('admin', 'staff'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    common_1.Post('/now'),
    __param(0, common_1.Request()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "createNow", null);
OrderController = __decorate([
    swagger_1.ApiTags('Order'),
    common_1.Controller('order'),
    __metadata("design:paramtypes", [order_service_1.OrderService])
], OrderController);
exports.OrderController = OrderController;
//# sourceMappingURL=order.controller.js.map