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
exports.ReceiptController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const receipt_service_1 = require("./receipt.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const roles_guard_1 = require("../auth/guards/roles.guard");
let ReceiptController = class ReceiptController {
    constructor(receiptService) {
        this.receiptService = receiptService;
    }
    create(req, data) {
        return this.receiptService.createReceipt(req.user._id, data);
    }
    getWarehouse(query) {
        return this.receiptService.getWarehouse(query);
    }
};
__decorate([
    roles_decorator_1.hasRoles('admin', 'staff'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    common_1.Post(''),
    __param(0, common_1.Request()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ReceiptController.prototype, "create", null);
__decorate([
    common_1.Get('/warehouse'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ReceiptController.prototype, "getWarehouse", null);
ReceiptController = __decorate([
    swagger_1.ApiTags('Receipt'),
    common_1.Controller('receipt'),
    __metadata("design:paramtypes", [receipt_service_1.ReceiptService])
], ReceiptController);
exports.ReceiptController = ReceiptController;
//# sourceMappingURL=receipt.controller.js.map