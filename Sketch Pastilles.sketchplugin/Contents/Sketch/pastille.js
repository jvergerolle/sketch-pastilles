var onRun = function(context)
{
	//Libraries
	@import '~/Library/Application Support/com.bohemiancoding.sketch3/Plugins/Sketch Pastilles.sketchplugin/Contents/Sketch/lib/config.js'
	@import '~/Library/Application Support/com.bohemiancoding.sketch3/Plugins/Sketch Pastilles.sketchplugin/Contents/Sketch/lib/utils.js'
	@import '~/Library/Application Support/com.bohemiancoding.sketch3/Plugins/Sketch Pastilles.sketchplugin/Contents/Sketch/lib/getTextLayerInfo.js'

	//get javascript API root object
	var sketch = context.api();

	//Define containers
	var doc = context.document;
	var page = doc.currentPage();
	var artboards = page.artboards();

	try{
		//For each artboard in page
		for (var a = 0; a < artboards.length; a++)
		{
			//Get MSTextLayers with text
			var txtLayers = getTextLayerInfoInContainer(artboards[a]);

			//Render pastilles
			if(txtLayers.length > 0){
				var pastilleGroup = utils.addGroup("Pastilles : "+artboards[a].name(),artboards[a]);

				for (var i = 0; i < txtLayers.length; i++)
				{
					//log("add pastille with count "+txtLayers[i].count+" for text :"+txtLayers[i].text);
					var gp = utils.addGroup("pastille "+i, pastilleGroup);
					utils.addRectangle(txtLayers[i].x, txtLayers[i].y, conf.pastilles.style, "pastille",gp);
					utils.addText(txtLayers[i].x, txtLayers[i].y, txtLayers[i].count, gp);
				}
			}
		}
	}
	catch(error){context.api().alert(error.message,"Javascript Error");}
};
