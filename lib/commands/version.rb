# frozen_string_literal: true

require_relative "../metadata"
require_relative "../api"

# Commands module contains all CLI command implementations
module Commands
  # Command to get NotionTask version
  class Version
    def initialize(args, options)
      @args = args
      @options = options
      run
    end

    def run
      notion_api = NotionAPI.new
      puts notion_api.get_tasks
      puts "notion-task #{Metadata.version}"
    end
  end
end
