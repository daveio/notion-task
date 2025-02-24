# frozen_string_literal: true

require_relative "../metadata"
require_relative "../api"

# Commands module contains all CLI command implementations
module Commands
  # Command to get NotionTask version
  class New
    def initialize(args, options)
      @args = args
      @options = options
      @api = NotionAPI.new
      run
    end

    def run
      puts @api.new_task(@args.join(" "))
    end
  end
end
