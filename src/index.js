#!/usr/bin/env node
const inquirer = require("inquirer");
const fs = require("fs-extra");
const path = require("path");
const copyDir = require("copy-dir");

const templatesDir = path.join(__dirname, "../templates");

const copyTemplate = (answers) => {
	const templateDir = `${templatesDir}/${answers.template}`;
	const appDir = path.join(process.cwd(), answers.appName);
	if (!fs.existsSync(appDir)) {
		fs.mkdirsSync(appDir);
	}
	console.log(fs.readdirSync(templateDir));
	copyDir.sync(templateDir, appDir, {
		mode: true, // keep file mode
		cover: true, // cover file when exists, default is true
		filter: function (_, filepath) {
			if (/(node_modules|dist)/.test(filepath)) {
				return false;
			}
			return true;
		},
	});
	return appDir;
};

inquirer
	.prompt([
		{ name: "appName", message: "Enter app name", default: "app" },
		{
			name: "template",
			type: "list",
			message: "Choose a template",
			choices: fs.readdirSync(templatesDir),
		},
		{
			name: "confirmation",
			type: "confirm",
			message: "Are you sure?",
		},
	])
	.then((answers) => {
		const resultDir = copyTemplate(answers);
		console.log("Copied to", resultDir, "!");
		console.log("Done.");
	});
