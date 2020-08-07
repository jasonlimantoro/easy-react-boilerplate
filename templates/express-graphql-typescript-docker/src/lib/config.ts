const config = {
	COOKIE_NAME: "sid",
	SESSION_SECRET: process.env.SESSION_SECRET,
	REDIS_URL: process.env.REDIS_URL,
	DATABASE_URL: process.env.DATABASE_URL,
};

export default config;
