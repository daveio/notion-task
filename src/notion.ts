import { Client } from "@notionhq/client";
import chalk from "chalk";
import ora from "ora";
import { format } from "date-fns";

interface TaskDetails {
  title: string;
  description: string;
  dueDate: Date | null;
  priority: string;
  status: string;
}

export async function addTask(apiKey: string, databaseId: string, taskDetails: TaskDetails): Promise<void> {
  const spinner = ora("Adding task to Notion...").start();

  try {
    const notion = new Client({
      auth: apiKey,
    });

    const { title, description, dueDate, priority, status } = taskDetails;

    // Create the properties object for the Notion page
    const properties: any = {
      // Assuming the title property in your database is called "Name"
      Name: {
        title: [
          {
            text: {
              content: title,
            },
          },
        ],
      },
      // Assuming you have these properties in your database
      Priority: {
        select: {
          name: priority,
        },
      },
      Status: {
        select: {
          name: status,
        },
      },
    };

    // Add due date if provided
    if (dueDate) {
      properties["Due Date"] = {
        date: {
          start: format(dueDate, "yyyy-MM-dd"),
        },
      };
    }

    // Create the page in Notion
    await notion.pages.create({
      parent: {
        database_id: databaseId,
      },
      properties,
      children: description
        ? [
            {
              object: "block",
              type: "paragraph",
              paragraph: {
                rich_text: [
                  {
                    type: "text",
                    text: {
                      content: description,
                    },
                  },
                ],
              },
            },
          ]
        : [],
    });

    spinner.succeed(chalk.green("Task added successfully! 🎉"));

    // Display task details
    console.log("\n" + chalk.bold("Task Details:"));
    console.log(chalk.cyan("Title:      ") + title);
    if (description) {
      console.log(chalk.cyan("Description:") + description);
    }
    if (dueDate) {
      console.log(chalk.cyan("Due Date:   ") + format(dueDate, "PPP"));
    }
    console.log(chalk.cyan("Priority:   ") + priorityColor(priority) + priority);
    console.log(chalk.cyan("Status:     ") + statusColor(status) + status);
  } catch (error: any) {
    spinner.fail(chalk.red("Failed to add task"));

    if (error.code === "notionhq_client_response_error") {
      console.error(chalk.red("\nNotion API Error:"), error.message);

      if (error.status === 401) {
        console.log(chalk.yellow('\nTip: Your API key might be invalid. Run "notion-task config" to update it.'));
      } else if (error.status === 404) {
        console.log(chalk.yellow("\nTip: Your database ID might be invalid or you might not have access to it."));
        console.log(chalk.yellow('Run "notion-task config" to update your database ID.'));
      }
    } else {
      console.error(chalk.red("\nError details:"), error);
    }

    process.exit(1);
  }
}

function priorityColor(priority: string): string {
  switch (priority) {
    case "High":
      return chalk.red("● ");
    case "Medium":
      return chalk.yellow("● ");
    case "Low":
      return chalk.green("● ");
    default:
      return "";
  }
}

function statusColor(status: string): string {
  switch (status) {
    case "Not Started":
      return chalk.gray("○ ");
    case "In Progress":
      return chalk.blue("◐ ");
    case "Completed":
      return chalk.green("● ");
    default:
      return "";
  }
}
