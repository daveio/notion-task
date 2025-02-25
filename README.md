# Notion Tasks CLI

A command-line interface for adding tasks to your Notion database with a pretty, interactive UI.

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/notion-tasks-cli.git
cd notion-tasks-cli

# Install dependencies
npm install

# Build the project
npm run build

# Link the package globally
npm link
```

## Configuration

Before using the CLI, you need to configure it with your Notion API key and database ID:

```bash
notion-task config
```

Alternatively, you can create a `.env` file with the following variables:

```
NOTION_API_KEY=your_notion_api_key
NOTION_DATABASE_ID=your_notion_database_id
```

### Getting Your Notion API Key

1. Go to [https://www.notion.so/my-integrations](https://www.notion.so/my-integrations)
2. Create a new integration
3. Copy the "Internal Integration Token"

### Getting Your Database ID

1. Open your Notion database in the browser
2. The database ID is the part of the URL after the workspace name and before the question mark:
   `https://www.notion.so/workspace-name/{database_id}?...`

Remember to share your database with your integration!

## Usage

### Add a task interactively

```bash
notion-task add
```

This will prompt you for task details like title, description, due date, priority, and status.

### Quick add a task

```bash
notion-task add -q "Buy groceries"
```

This will add a task with the given title and default values for other fields.

## License

MIT
