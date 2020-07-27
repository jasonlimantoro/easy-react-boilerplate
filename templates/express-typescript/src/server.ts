import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import "express-async-errors";
import { errorHandler } from "./lib/middleware";

export const startServer = () => {
	const app = express();
	app.use(morgan("common"));
	app.use(bodyParser.json());

	const whitelist = ["http://localhost:3000", "http://localhost:5000"];
	app.use(
		cors({
			origin(origin, callback) {
				if (!origin || whitelist.indexOf(origin!) !== -1) {
					callback(null, true);
				} else {
					callback(new Error("Not allowed by CORS"));
				}
			},
		})
	);

	app.get("/", (_req, res) => res.send("Hello World!"));

	app.use(require("./routes").default);

	app.use(errorHandler);

	return app;
};
