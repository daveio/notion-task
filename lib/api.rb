# frozen_string_literal: true

# code: language=ruby

require "httparty"
require "json"

# Notion API class
#
# @author Dave Williams
# @since 0.0.1
class NotionAPI
  # Initialize the Notion API class
  #
  # @return [NotionApi]
  def initialize
    if ENV.fetch("NOTION_TASK_API_KEY", false) && ENV.fetch("NOTION_TASK_DATABASE", false)
      @key = ENV.fetch("NOTION_TASK_API_KEY")
      @database = ENV.fetch("NOTION_TASK_DATABASE")
      @headers = {
        "Authorization" => "Bearer #{@key}",
        "Content-Type" => "application/json",
        "Notion-Version" => "2022-02-22"
      }
    else
      raise "NOTION_TASK_API_KEY and NOTION_TASK_DATABASE must be set"
    end
  end

  def GET(path)
    response = HTTParty.get("https://api.notion.com/v1/#{path}", headers: @headers)
    response.body
  end

  def POST(path, body)
    response = HTTParty.post("https://api.notion.com/v1#{path}", headers: @headers, body: body)
    response.body
  end

  def get_tasks
    query = {
      sorts: [
        {
          property: "Title",
          direction: "ascending"
        }
      ]
    }
    resp = POST("/databases/#{@database}/query", query.to_json)
    puts resp
  end
end
