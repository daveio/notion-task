# `notion-task`

`notion-task` is a command-line tool for managing tasks in a Notion database.

It doesn't care how you invoke it, so you might like to set a shell alias for `task` if it doesn't clash with anything else.

## Before you start

You need to set two environment variables.

### `NOTION_TASK_API_KEY`

Set `NOTION_TASK_API_KEY` to the API key you obtained from Notion when you configured your internal integration.

### `NOTION_TASK_DATABASE`

Set `NOTION_TASK_DATABASE` to the ID of the Notion database which you want `notion-task` to interact with.

### `sh` / `bash` / `zsh`

```sh
export NOTION_TASK_API_KEY="ntn_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
export NOTION_TASK_DATABASE="abcdef0123456789abcdef0123456789"
```

### `fish`

```fish
set -gx NOTION_TASK_API_KEY "ntn_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
set -gx NOTION_TASK_DATABASE "abcdef0123456789abcdef0123456789"
```

## Installation

```sh
gem install notion-task
```

## Usage

### Show version

```sh
notion-task version
```
