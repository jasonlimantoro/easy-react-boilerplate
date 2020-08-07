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

const query = `
query { me { id email } }
`;

describe("me query", () => {
	it("should know logged in user", async () => {
		const user = await User.create({
			email: faker.internet.email(),
			password: faker.internet.password(),
		}).save();
		const response = await graphqlInvoke({
			source: query,
			userId: user.id,
		});
		expect(response.data).toEqual({
			me: {
				email: user.email,
				id: user.id,
			},
		});
	});
	it("should return null", async () => {
		await User.create({
			email: faker.internet.email(),
			password: faker.internet.password(),
		}).save();
		const response = await graphqlInvoke({
			source: query,
		});
		expect(response.data).toEqual({
			me: null,
		});
	});
});
