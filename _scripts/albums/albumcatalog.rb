require 'nokogiri'
require './album'

class AlbumCatalog
	include Enumerable

	attr :albums

	def initialize(catalogXml)
		@albums = Nokogiri::XML(catalogXml)
			.xpath("//Album")
			.collect {|albumXml| Album.new(albumXml)}
			.sort_by {|album| [album.artist.to_s, album.year.to_s, album.title.to_s]}
	end

	def each(&block)
		@albums.each(&block)
	end
end