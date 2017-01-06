//Libraries
@import '~/Library/Application Support/com.bohemiancoding.sketch3/Plugins/Sketch Pastilles.sketchplugin/Contents/Sketch/lib/layerSearch.js'

var getTextLayerInfoInContainer = function(container){
	var info = [];
	var searchResults = findTextLayer_inContainer(container);

	if(searchResults.length > 0)
	{
	    for (var i = 0; i < searchResults.length; i++)
	    {
					var characterCount = utils.countTextLayerChar(searchResults[i]);
	        if(characterCount && characterCount > 0){
						var rect = utils.getRect(searchResults[i]);
	        	var obj = {
	        		x:rect.x,
	        		y:rect.y,
							width:rect.width,
							height:rect.height,
	        		count:characterCount,
							text:searchResults[i].stringValue(),
							alignment:searchResults[i].textAlignment(), //0=left / 1=right / 2=center
							artboard:searchResults[i].parentArtboard()
	        	};
	        	info.push(obj);
	        }
	    };
	}
	return info;
}
