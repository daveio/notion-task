# frozen_string_literal: true

# code: language=ruby

# Module containing metadata for the NotionTask gem specification
module Metadata
  def self.version
    '0.0.2'
  end

  def self.name
    'notion-task'
  end

  def self.summary
    'Notion task manager'
  end

  def self.description
    'A tool to help manage Notion tasks'
  end

  def self.author
    'Dave Williams'
  end

  def self.email
    'dave@dave.io'
  end

  def self.files
    ['lib/notion-task.rb']
  end

  def self.executables
    ['notion-task']
  end

  def self.authors
    ['Dave Williams']
  end

  def self.license
    'MIT'
  end

  def self.homepage
    'https://github.com/daveio/notion-task'
  end

  def self.required_ruby_version
    '>= 3.3.6'
  end

  def self.dependencies
    {
      'commander' => '~> 5.0.0',
      'notion-ruby-client' => '~> 1.2.2',
      'terminal-table' => '~> 4.0.0'
    }
  end

  def self.development_dependencies
    {
      'pry' => '~> 0.15.2',
      'solargraph' => '~> 0.51.2',
      'standard' => '~> 1.45.0',
    }
  end

  def self.api_key
    api_key = ENV.fetch('NOTION_TASK_API_KEY', false)
    abort('NOTION_TASK_API_KEY is not set. Set it to your API key.') unless api_key

    api_key
  end

  def self.task_database
    task_database = ENV.fetch('NOTION_TASK_DATABASE', false)
    abort('NOTION_TASK_DATABASE is not set. Set it to the ID of your database.') unless task_database

    task_database
  end
end
