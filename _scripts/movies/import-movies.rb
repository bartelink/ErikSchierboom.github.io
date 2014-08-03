require 'yaml'
require 'fileutils'
require './moviecollection'

if ARGV.length < 4 then
	puts "Import an DVD Profiler collection XML file.\n\n" + 
	     "ruby import-movies.rb [source-collection-xmlfile] [source-collection-image-directory] [destination-collection-yamlfile] [destination-collection-image-directory]";
	exit;
end

def importMovieCollection(movieCollection, destCatalogYamlfile)
	File.open(destCatalogYamlfile, 'w') do |out| 
		YAML.dump(movieCollection.movies, out)
	end
end

def importMovieCollectionImages(movieCatalog, srcCatalogImageDirectory, destCatalogImageDirectory)
	movieCatalog.each do |movie| 

		if movie.filename.nil? then
			next
		end

		srcFilename = File.join(srcCatalogImageDirectory, File.basename(movie.filename, '.*') + 'f.jpg')
		destImageFilename = File.join(destCatalogImageDirectory, File.basename(movie.filename, '.*') + '.png')

		importMovieCollectionImage(srcFilename, destImageFilename)
	end
end

def importMovieCollectionImage(srcImageFilename, destImageFilename)
	if File.file?(srcImageFilename) then
		# Use an imagemagick transformation to convert the image to its thumb version
		`convert \"#{srcImageFilename}\" -resize 180x180 -gravity Center -crop 180x180+0+0 +repage \"#{destImageFilename}\"`	
	end
end

# Extract the arguments into more meaningful name
srcCatalogXmlfile, srcCatalogImageDirectory, destCatalogYamlfile, destCatalogImageDirectory = ARGV

movieCatalog = MovieCollection.new(File.open(srcCatalogXmlfile))
importMovieCollection(movieCatalog, destCatalogYamlfile)
importMovieCollectionImages(movieCatalog, srcCatalogImageDirectory, destCatalogImageDirectory)