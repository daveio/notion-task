#!/usr/bin/env node

import dotenv from "dotenv";
import { Command } from "commander";
import chalk from "chalk";
import figlet from "figlet";
import { addTask } from "./notion";
import { promptForTaskDetails } from "./prompt";
import Conf from "conf";

// Load environment variables
dotenv.config();

// Initialize config store
const config = new Conf({
  projectName: "notion-tasks-cli",
  schema: {
    notionApiKey: {
      type: "string",
    },
    notionDatabaseId: {
      type: "string",
    },
  },
});

// Display title banner
console.log(chalk.cyan(figlet.textSync("Notion Tasks", { horizontalLayout: "full" })));

const program = new Command();

program.version("1.0.0").description("A CLI to add tasks to your Notion database");

program
  .command("config")
  .description("Configure your Notion API key and database ID")
  .action(async () => {
    const { prompt } = await import("enquirer");

    const response = await prompt([
      {
        type: "input",
        name: "notionApiKey",
        message: "Enter your Notion API key:",
        initial: (config.get("notionApiKey") as string) || process.env.NOTION_API_KEY || "",
      },
      {
        type: "input",
        name: "notionDatabaseId",
        message: "Enter your Notion database ID:",
        initial: (config.get("notionDatabaseId") as string) || process.env.NOTION_DATABASE_ID || "",
      },
    ]);

    config.set(response);
    console.log(chalk.green("✓ Configuration saved successfully!"));
  });

program
  .command("add")
  .description("Add a new task to your Notion database")
  .option("-q, --quick <title>", "Quickly add a task with just a title")
  .action(async (options) => {
    // Get API key and database ID from config or environment variables
    const notionApiKey = (config.get("notionApiKey") as string) || process.env.NOTION_API_KEY;
    const notionDatabaseId = (config.get("notionDatabaseId") as string) || process.env.NOTION_DATABASE_ID;

    if (!notionApiKey || !notionDatabaseId) {
      console.log(chalk.red("Error: Notion API key or database ID not configured."));
      console.log(chalk.yellow('Please run "notion-task config" or set environment variables.'));
      return;
    }

    try {
      let taskDetails;

      if (options.quick) {
        // Quick add mode with just a title
        taskDetails = {
          title: options.quick,
          description: "",
          dueDate: null,
          priority: "Medium",
          status: "Not Started",
        };
      } else {
        // Interactive mode
        taskDetails = await promptForTaskDetails();
      }

      await addTask(notionApiKey, notionDatabaseId, taskDetails);
    } catch (error) {
      console.error(chalk.red("Failed to add task:"), error);
    }
  });

program.parse(process.argv);

// If no args, show help
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
