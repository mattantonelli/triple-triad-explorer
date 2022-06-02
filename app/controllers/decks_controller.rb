class DecksController < ApplicationController
  def index
    @decks = TripleTriad.decks.sort_by { |deck| -deck[:rating] }
    @count = @decks.size

    @decks = @decks.each_with_object(Hash.new { |h, k| h[k] = [] }) do |deck, h|
      h[deck[:purpose][:type]] << deck
    end

    @decks['General'] = { 'General' => @decks['General'] }
    # @decks['General'] = {}

    %w(Rule NPC).each do |purpose|
      @decks[purpose] = @decks[purpose].each_with_object(Hash.new { |h, k| h[k] = [] }) do |deck, h|
        h[deck[:purpose][:name]] << deck
      end
    end
  end
end
