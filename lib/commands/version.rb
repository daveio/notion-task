# frozen_string_literal: true

# typed: true

require_relative "../monkeypatch"
require_relative "../metadata"

# Commands module contains all CLI command implementations
module Commands
  # Command to get NotionTask version
  class Version
    sig { params(args: T::Array[String], options: T::Hash[Symbol, T.untyped]).void }
    def initialize(args, options)
      @args = args
      @options = options
      run
    end

    sig { void }
    def run
      puts "notion-task #{Metadata.version}"
    end
  end
end
