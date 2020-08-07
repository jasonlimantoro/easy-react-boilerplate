import "reflect-metadata";
require("dotenv").config();
import { startServer } from "./server";
import { startDb } from "./utils/startDb";

const port = process.env.PORT || 4000;

(async () => {
	await startDb({ env: process.env.NODE_ENV });
	const app = await startServer();
	app.listen(port, () => {
		// eslint-disable-next-line no-console
		console.log("Listening on port", port);
	});
})();
