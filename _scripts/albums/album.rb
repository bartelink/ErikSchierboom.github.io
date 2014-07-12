class Album
	attr :id, :title, :artist, :year, :filename

	def initialize(albumXml)
		title = albumXml.at_xpath('Title')
		artist = albumXml.xpath('Artists/Artist')[0]
		year = albumXml.at_xpath('Year')

		@id = albumXml['CDDBID']
		@title = title.content
		@artist = artist.nil? || artist.content.strip.empty? ? nil : artist.content
		@year = year.nil? ? nil : year.content.to_i
		@filename = @id.nil? ? nil : @id + '.png'
	end
end