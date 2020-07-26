#!/usr/bin/env node
const inquirer = require("inquirer");
const fs = require("fs-extra");
const path = require("path");
const { ncp } = require("ncp");

const promiseCopy = (...args) => {
	return new Promise((resolve, reject) => {
		ncp(...args, (err) => {
			if (err) reject(err);
			resolve();
		});
	});
};

const templatesDir = path.join(__dirname, "../templates");

const copyTemplate = async (answers) => {
	const templateDir = `${templatesDir}/${answers.template}`;
	const appDir = path.join(process.cwd(), answers.appName);
	if (!fs.existsSync(appDir)) {
		fs.mkdirsSync(appDir);
	}
	console.log(fs.readdirSync(templateDir));
	await promiseCopy(templateDir, appDir, {
		filter: function (filepath) {
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
	.then(async (answers) => {
		const resultDir = await copyTemplate(answers);
		console.log("Copied to", resultDir, "!");
		console.log("Done.");
	});
