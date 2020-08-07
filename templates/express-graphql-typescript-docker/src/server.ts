import express from "express";
import { ApolloServer } from "apollo-server-express";
import connectRedis from "connect-redis";
import session from "express-session";
import { redis } from "./utils/redis";
import morgan from "morgan";
import config from "./lib/config";
import { createSchema } from "./utils/createSchema";

const isProd = process.env.NODE_ENV === "production";

export const startServer = async () => {
	const RedisStore = connectRedis(session);
	const app = express();

	app.use(
		session({
			name: config.COOKIE_NAME,
			store: new RedisStore({
				client: redis,
			}),
			proxy: true, // In order for heroku to work, must use proxy
			secret: config.SESSION_SECRET as string,
			resave: false,
			saveUninitialized: false,
			cookie: {
				httpOnly: true,
				secure: isProd,
				maxAge: 1000 * 60 * 60 * 24, // 1d
			},
		})
	);
	app.use(morgan("common"));

	app.get("/", (_req, res) => res.send("Hello World!"));

	const apolloServer = new ApolloServer({
		schema: await createSchema(),
		context: ({ req, res }) => ({ req, res }),
		...(!isProd
			? {
					playground: {
						settings: {
							"request.credentials": "include",
						},
					},
			  }
			: {}),
	});

	apolloServer.applyMiddleware({ app });

	return app;
};
