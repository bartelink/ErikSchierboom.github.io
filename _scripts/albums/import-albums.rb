require 'yaml'
require 'fileutils'
require './albumcatalog'

if ARGV.length < 4 then
	puts "Import an OrangeCD catalog XML file.\n\n" + 
	     "ruby import-cds.rb [source-catalog-xmlfile] [source-catalog-image-directory] [destination-catalog-yamlfile] [destination-catalog-image-directory]";
	exit;
end

def importAlbumCatalog(albumCatalog, destCatalogYamlfile)
	File.open(destCatalogYamlfile, 'w') do |out| 
		YAML.dump(albumCatalog.albums, out)
	end
end

def importAlbumCatalogImages(albumCatalog, srcCatalogImageDirectory, destCatalogImageDirectory)
	albumCatalog.each do |album| 

		if album.filename.nil? then
			next
		end

		srcFilename = File.join(srcCatalogImageDirectory, File.basename(album.filename, '.*') + '.jpg')
		destImageFilename = File.join(destCatalogImageDirectory, File.basename(srcFilename, '.*') + '.png')

		importAlbumCatalogImage(srcFilename, destImageFilename)
	end
end

def importAlbumCatalogImage(srcImageFilename, destImageFilename)
	if File.file?(srcImageFilename) then
		# Use an imagemagick transformation to convert the image to its thumb version
		`convert \"#{srcImageFilename}\" -resize 180x180 -gravity Center -crop 180x180+0+0 +repage \"#{destImageFilename}\"`	
	end
end

# Extract the arguments into more meaningful name
srcCatalogXmlfile, srcCatalogImageDirectory, destCatalogYamlfile, destCatalogImageDirectory = ARGV

albumCatalog = AlbumCatalog.new(File.open(srcCatalogXmlfile))
importAlbumCatalog(albumCatalog, destCatalogYamlfile)
importAlbumCatalogImages(albumCatalog, srcCatalogImageDirectory, destCatalogImageDirectory)