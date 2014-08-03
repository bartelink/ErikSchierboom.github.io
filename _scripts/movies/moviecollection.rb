require 'nokogiri'
require './movie'

class MovieCollection
	include Enumerable

	attr :movies

	def initialize(collectionXml)
		@movies = Nokogiri::XML(collectionXml)
			.xpath("//Collection/DVD")
			.select  {|movieXml| movieXml.at_xpath('BoxSet/Parent').content.empty? }			
			.collect {|movieXml| Movie.new(movieXml)}
			.sort_by {|movie| [movie.title.to_s, movie.year.to_s]}
	end

	def each(&block)
		@movies.each(&block)
	end
end