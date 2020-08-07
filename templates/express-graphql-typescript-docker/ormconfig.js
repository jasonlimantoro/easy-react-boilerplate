module.exports = [
	{
		name: "development",
		type: "mysql",
		synchronize: false,
		logging: true,
		url: process.env.DATABASE_URL,
		entities: ["src/entities/*.*"],
		dropSchema: false,
		migrations: ["src/migration/*.*"],
		cli: {
			migrationsDir: "src/migration",
		},
	},
	{
		name: "test",
		type: "mysql",
		synchronize: true,
		logging: false,
		entities: ["src/entities/*.*"],
		dropSchema: true,
	},
	{
		name: "production",
		type: "mysql",
		synchronize: false,
		logging: true,
		url: process.env.DATABASE_URL,
		entities: ["build/entities/*.*"],
		dropSchema: false,
		migrations: ["build/migration/*.*"],
	},
];
