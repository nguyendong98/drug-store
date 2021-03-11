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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductCredentialsDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class ProductCredentialsDto {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], ProductCredentialsDto.prototype, "idCategory", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], ProductCredentialsDto.prototype, "name", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], ProductCredentialsDto.prototype, "description", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], ProductCredentialsDto.prototype, "sku", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], ProductCredentialsDto.prototype, "keyword", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], ProductCredentialsDto.prototype, "contraindicated", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], ProductCredentialsDto.prototype, "dative", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], ProductCredentialsDto.prototype, "dosageAndUsage", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], ProductCredentialsDto.prototype, "preservation", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], ProductCredentialsDto.prototype, "ingredient", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], ProductCredentialsDto.prototype, "packing", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], ProductCredentialsDto.prototype, "idTradeMark", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], ProductCredentialsDto.prototype, "idProducer", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], ProductCredentialsDto.prototype, "idUnit", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], ProductCredentialsDto.prototype, "price", void 0);
exports.ProductCredentialsDto = ProductCredentialsDto;
//# sourceMappingURL=product.credentials.dto.js.map