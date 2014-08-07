class Movie
	attr :id, :title, :year, :filename

	def initialize(movieXml)
		@id = movieXml.at_xpath('ID').content
		@title = movieXml.at_xpath('Title').content
		@year = movieXml.at_xpath('ProductionYear').content.to_i
		@filename = @id + '.png'
	end
end