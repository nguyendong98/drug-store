import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from "mongoose";
import {Role} from '../interface/auth.interface';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        @InjectModel('role') private roleModel: Model<Role>,
    ) {}

    async canActivate(context: ExecutionContext) {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!roles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const roleName = await this.roleModel.findById(user.roleId);
        const hasRole = () => roles.indexOf(roleName.description) > -1;
        let hasPermission: boolean = false;

        if (hasRole()) {
            hasPermission = true;
        };
        return user && hasPermission;
    }
}
