import { UserModule } from "@models/user/user.module";
import { Module, forwardRef } from "@nestjs/common";
import { CaslAbilityFactory } from "./casl-ability.factory";
import { GroupUserModule } from "@models/group-user";
import { CaslGuard } from "./casl.guard";

@Module({
	imports: [
		forwardRef(() => UserModule),
		GroupUserModule
	],
	providers: [CaslAbilityFactory, CaslGuard],
	exports: [CaslAbilityFactory, CaslGuard]
})
export class CaslModule { }