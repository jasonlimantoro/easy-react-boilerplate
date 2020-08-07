/* eslint-disable no-console */
import { createConnection, getConnectionOptions } from "typeorm";
import config from "../lib/config";

function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

const logIf = (shouldLog = true) => (...args: any[]) => {
	if (shouldLog) console.log(...args);
};

export const startDb = async ({ env = "development" } = {}) => {
	let connection = await getConnectionOptions(env);
	const log = logIf(env !== "test");
	log("using connection", env);
	switch (env) {
		case "production":
			connection = {
				...connection,
				name: "default",
				url: config.DATABASE_URL,
			} as any;
			break;
		case "test":
			connection = {
				...connection,
				name: "default",
				url: config.DATABASE_URL + "_test",
			} as any;
			break;
		default:
			connection = {
				...connection,
				name: "default",
				url: config.DATABASE_URL,
			} as any;
	}
	log(connection);
	let retry = 0;
	while (retry < 10) {
		log("[DB]: Attempting to connect...");
		try {
			const result = await createConnection(connection);
			log("[DB]: Connection successful!");
			if (env !== "test") {
				console.log("[DB]: running migration");
				await result.runMigrations();
				console.log("[DB]: migration successful");
			}
			return result;
		} catch (e) {
			console.error(e);
			retry++;
			console.log(`[DB]: Attempting to retry (${retry})`);
			await sleep(2000);
		}
	}
	console.error(`[DB]: Retried ${retry} times. All failed`);
	return null;
};
