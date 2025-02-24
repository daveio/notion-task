# frozen_string_literal: true

# code: language=ruby

# typed: true

require_relative "monkeypatch"
require "rubygems"
require "commander"
require_relative "metadata"
require_relative "commands/version"

# Main application class for NotionTask command-line interface
class NotionTask
  include Commander::Methods

  sig { void }
  def run
    setup_program
    setup_commands
    run!
  end

  private

  sig { void }
  def setup_program
    program :name, Metadata.name
    program :version, Metadata.version
    program :description, Metadata.description
    program :help, "Documentation", "https://github.com/daveio/notion-task"
  end

  sig { void }
  def setup_commands
    setup_version_command
  end

  sig { void }
  def setup_version_command
    command :version do |c|
      c.syntax = "notion-task version"
      c.summary = "Show the version of the running notion-task"
      c.description = c.summary
      c.example c.summary, "notion-task version"
      c.when_called Commands::Version
    end
  end
end
