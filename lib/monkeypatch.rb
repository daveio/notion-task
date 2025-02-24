# frozen_string_literal: true

# code: language=ruby

# typed: true

# Sorbet monkey patch
class Module
  include T::Sig
end
