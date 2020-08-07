import { Connection } from "typeorm";
import { startDb } from "../src/utils/startDb";
import { graphqlInvoke } from "./utils/graphqlInvoke";
import faker from "faker";
import { User } from "../src/entities/User";
import bcyrpt from "bcryptjs";

let connection: Connection | null;

beforeEach(async () => {
	connection = await startDb({ env: "test" });
});

afterEach(async () => {
	await connection?.close();
});

const source = `
	mutation Login($input: LoginInput!){
		login(input: $input)
	}
`;

describe("Login", () => {
	it("should be able to login", async () => {
		const userData = {
			email: faker.internet.email(),
			password: faker.internet.password(),
		};

		await User.create({
			email: userData.email,
			password: bcyrpt.hashSync(userData.password),
		}).save();

		const response = await graphqlInvoke({
			source,
			variableValues: {
				input: userData,
			},
		});
		expect(response.data).toEqual({
			login: true,
		});
	});
});
