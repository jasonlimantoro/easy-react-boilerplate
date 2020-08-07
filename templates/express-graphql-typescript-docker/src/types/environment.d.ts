declare namespace NodeJS {
	export interface ProcessEnv {
		NODE_ENV: "development" | "production";
		PORT: string;
		SESSION_SECRET: string;
		REDIS_URL?: string;
		DATABASE_URL?: string;
	}
}
