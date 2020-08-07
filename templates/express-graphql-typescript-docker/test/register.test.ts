import { Connection } from "typeorm";
import { startDb } from "../src/utils/startDb";
import { graphqlInvoke } from "./utils/graphqlInvoke";
import faker from "faker";
import { User } from "../src/entities/User";

let connection: Connection | null;

beforeEach(async () => {
	connection = await startDb({ env: "test" });
});

afterEach(async () => {
	await connection?.close();
});

const source = `
mutation Register($input: RegisterInput!) { 
	register(input: $input) {
		id
		email
	}
 }
`;

describe("Register", () => {
	it("should create user", async () => {
		const userData = {
			email: faker.internet.email(),
			password: faker.internet.password(),
		};
		const response = await graphqlInvoke({
			source,
			variableValues: {
				input: userData,
			},
		});
		expect(response.data).toMatchObject({
			register: {
				email: userData.email,
			},
		});
		const user = await User.findOne({ where: { email: userData.email } });
		expect(user).toBeDefined();
	});
});
