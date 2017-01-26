var onRun = function(context)
{
	//Libraries
	@import '~/Library/Application Support/com.bohemiancoding.sketch3/Plugins/Sketch Pastilles.sketchplugin/Contents/Sketch/config.js'
	@import '~/Library/Application Support/com.bohemiancoding.sketch3/Plugins/Sketch Pastilles.sketchplugin/Contents/Sketch/lib/utils.js'
	@import '~/Library/Application Support/com.bohemiancoding.sketch3/Plugins/Sketch Pastilles.sketchplugin/Contents/Sketch/create/Group.js'
	@import '~/Library/Application Support/com.bohemiancoding.sketch3/Plugins/Sketch Pastilles.sketchplugin/Contents/Sketch/create/Rectangle.js'
	@import '~/Library/Application Support/com.bohemiancoding.sketch3/Plugins/Sketch Pastilles.sketchplugin/Contents/Sketch/create/Text.js'

	//get javascript API root object
	var sketch = context.api();

	//Define containers
	var doc = context.document;
	var page = doc.currentPage();
	var artboards = page.artboards();

	//Loop through layers
	try{
		init(conf);
	}
	catch(error){
		context.api().alert(error.message,"Javascript Error");
	}

	//Define init
	function init(conf){
		//For each artboard in page
		for (var a = 0; a < artboards.length; a++)
		{
			//Get MSTextLayers with text
			var txtLayers = utils.getTextLayerInfoInContainer(artboards[a]);

			//Render pastilles
			if(txtLayers.length > 0){
				var pastilleGroup = new Group("Pastilles : "+artboards[a].name());
				artboards[a].addLayers([pastilleGroup.getGroup()]);

				for (var i = 0; i < txtLayers.length; i++)
				{
					//log("add pastille with count "+txtLayers[i].count+" for text :"+txtLayers[i].text);
					var group = new Group("pastille "+i);
					pastilleGroup.addLayer(group.getGroup());

					var rectangle = new Rectangle("pastille", conf.pastilles.style.width, conf.pastilles.style.height, conf.pastilles.style.radius);
					if(conf.pastilles.style.displayBorder) rectangle.setStrokeColor(conf.pastilles.style.border.color);
					rectangle.setFillColor(conf.pastilles.style.fill.color);
					group.addLayer(rectangle.getRectangle());
					rectangle.setX(txtLayers[i].x);
					rectangle.setY(txtLayers[i].y);

					//var text = new Text(txtLayers[i].count);
					//group.addLayer(text.getRectangle());
					//text.setX(txtLayers[i].x);
					//text.setY(txtLayers[i].y);
				}
			}
		}
	}
};
