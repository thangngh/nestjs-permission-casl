import { Role } from "@models/role";
import { setSeederFactory } from "typeorm-extension";

export default setSeederFactory(Role, async (faker) => {
	const role = new Role();
	return role;
});
