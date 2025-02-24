# frozen_string_literal: true

require_relative "lib/metadata"

Gem::Specification.new do |s|
  s.name = Metadata.name
  s.version = Metadata.version
  s.summary = Metadata.summary
  s.description = Metadata.description
  s.authors = Metadata.authors
  s.email = Metadata.email
  s.files = Metadata.files
  s.homepage = Metadata.homepage
  s.license = Metadata.license
  s.required_ruby_version = Metadata.required_ruby_version || ">= 3.4.2"
  s.executables = Metadata.executables
  Metadata.dependencies.each_key do |key|
    s.add_dependency(key, Metadata.dependencies[key])
  end
  Metadata.development_dependencies.each_key do |key|
    s.add_development_dependency(key, Metadata.development_dependencies[key])
  end
  s.metadata["rubygems_mfa_required"] = "true"
end
