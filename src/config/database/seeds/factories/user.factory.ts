import { User } from "@models/user/entities/user.entity";
import { setSeederFactory } from "typeorm-extension";

export default setSeederFactory(User, async (faker) => {
	const user = new User();
	return user;
});
