"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeKeepingModule = void 0;
const common_1 = require("@nestjs/common");
const time_keeping_controller_1 = require("./time-keeping.controller");
const time_keeping_service_1 = require("./time-keeping.service");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const time_keeping_schema_1 = require("./time-keeping.schema");
const auth_schema_1 = require("../auth/auth.schema");
let TimeKeepingModule = class TimeKeepingModule {
};
TimeKeepingModule = __decorate([
    common_1.Module({
        imports: [
            config_1.ConfigModule.forRoot(),
            mongoose_1.MongooseModule.forFeature([
                { name: 'work-shift', schema: time_keeping_schema_1.WorkShiftSchema },
                { name: 'role', schema: auth_schema_1.RoleSchema },
                { name: 'account', schema: auth_schema_1.AccountSchema },
                { name: 'time-keeping', schema: time_keeping_schema_1.TimeKeepingSchema },
                { name: 'salary', schema: time_keeping_schema_1.SalarySchema }
            ]),
        ],
        controllers: [time_keeping_controller_1.TimeKeepingController],
        providers: [time_keeping_service_1.TimeKeepingService],
        exports: [time_keeping_service_1.TimeKeepingService]
    })
], TimeKeepingModule);
exports.TimeKeepingModule = TimeKeepingModule;
//# sourceMappingURL=time-keeping.module.js.map