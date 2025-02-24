# frozen_string_literal: true

# code: language=ruby

# Notion API class
#
# @author Dave Williams
# @since 0.0.1
class NotionAPI
  # Initialize the Notion API class
  #
  # @return [NotionApi]
  def initialize
    if ENV.fetch("NOTION_API_KEY", false) && ENV.fetch("NOTION_DATABASE_ID", false)
      @key = ENV.fetch("NOTION_API_KEY")
      @database = ENV.fetch("NOTION_DATABASE_ID")
    else
      raise "NOTION_API_KEY and NOTION_DATABASE_ID must be set"
    end
  end

  def get_tasks
    response = HTTParty.get("https://api.notion.com/v1/databases/#{@database}/query", headers: {"Authorization" => "Bearer #{@key}"})
    puts response.body
  end
end
