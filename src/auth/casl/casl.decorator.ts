
import { EAction } from "@base/base.interface";
import { CustomDecorator, SetMetadata } from "@nestjs/common";
import { PermissionObjectType } from "./casl-ability.factory";
// action, object
export type RequiredPermission = [EAction, PermissionObjectType]
export const PERMISSION_CHECKER_KEY = "permission_checker_params_key";
export const CheckPermissions = (...params: RequiredPermission[]): CustomDecorator<string> =>
	SetMetadata(PERMISSION_CHECKER_KEY, params);