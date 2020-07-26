#!/usr/bin/env node
const inquirer = require("inquirer");
const fs = require("fs-extra");
const path = require("path");

const templatesDir = path.join(__dirname, "../templates");

const copyTemplate = (answers) => {
	const templateDir = `${templatesDir}/${answers.template}`;
	const appDir = path.join(process.cwd(), answers.appName);
	if (!fs.existsSync(appDir)) {
		fs.mkdirsSync(appDir);
	}
	console.log("copying from", templateDir, "to", appDir);
	fs.copySync(templateDir, appDir, {
		filter: function (src) {
			console.log(src);
			return !/(node_modules|dist)/.test(src);
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
