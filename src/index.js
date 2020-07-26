#!/usr/bin/env node
const inquirer = require("inquirer");
const fs = require("fs-extra");
const path = require("path");

const templatesDir = path.join(__dirname, "../templates");

const copyTemplate = (answers) => {
	const templateDir = `${templatesDir}/${answers.template}`;
	const appDir = `${process.cwd()}/${answers.appName}`;
	if (!fs.existsSync(appDir)) {
		fs.mkdirsSync(appDir);
	}
	fs.copySync(templateDir, appDir, {
		filter: function (src) {
			return !/(node_modules|dist)/.test(src);
		},
	});
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
		copyTemplate(answers);
		console.log("Copied to", answers.appName, "directory!");
		console.log("Done.");
	});
