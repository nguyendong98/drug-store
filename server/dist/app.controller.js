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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const nest_sendgrid_1 = require("@anchan828/nest-sendgrid");
let AppController = class AppController {
    constructor(appService, sendGrid) {
        this.appService = appService;
        this.sendGrid = sendGrid;
    }
    getHello() {
        return this.appService.getHello();
    }
    async root(data) {
        const mailTo = data.email;
        await this.sendGrid.send({
            to: mailTo,
            from: "dv.pharmacyy@gmail.com",
            subject: "Đặt hàng thành công",
            text: "and easy to do anywhere, even with Node.js",
            html: "" +
                "<div>Bạn đã đặt hàng thành công, hãy chờ xác nhận của quản trị viên</div>" +
                "<div>Hóa đơn của bạn: </div>" +
                data.bill.map(val => (`<div>${val.name} x ${val.qty}</div>`)) +
                `<div>Tổng số tiền phải trả: <b>${data.totalAmount.toLocaleString()} VND</b></div>`
        });
    }
    async approve(data) {
        const mail = data.email;
        await this.sendGrid.send({
            to: mail,
            from: "dv.pharmacyy@gmail.com",
            subject: "Đơn hàng được duyệt",
            text: "and easy to do anywhere, even with Node.js",
            html: "" +
                "<div>Đơn hàng của bạn đã được duyệt, sản phẩm sẽ được giao đến bạn trong thời gian sớm nhất</div>"
        });
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
__decorate([
    common_1.Post('/mail'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "root", null);
__decorate([
    common_1.Post('/mail/approve'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "approve", null);
AppController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [app_service_1.AppService,
        nest_sendgrid_1.SendGridService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map