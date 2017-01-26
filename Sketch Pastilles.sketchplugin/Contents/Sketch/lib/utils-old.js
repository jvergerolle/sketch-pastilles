var utils = {
  is: function(layer, theClass){
      if(!layer) return false;
      var klass = layer.class();
      return klass === theClass;
  },
	addRectangle : function (x, y, opt, name, parent) {
    var	color = MSColor.alloc().init();

    var shape = MSRectangleShape.new();
    shape.name = name;
    shape.frame().width = opt.width;
    shape.frame().height = opt.height;
    shape.setCornerRadiusFromComponents(opt.borderRadiusTopLeft + "/" + opt.borderRadiusTopRight + "/" + opt.borderRadiusBottomRight + "/" + opt.borderRadiusBottomLeft);

    var rectangle = MSShapeGroup.shapeWithPath(shape);
    var fill = rectangle.style().addStylePartOfType(0);
    fill.color = MSImmutableColor.colorWithSVGString(opt.fill.color);

    if(opt.displayBorder){
      var stroke = rectangle.style().addStylePartOfType(1);
      stroke.color = MSImmutableColor.colorWithSVGString(opt.border.color);
    }

    parent.addLayers([rectangle]);

    var rc = this.getRect(rectangle);
    rc.setX(x);
    rc.setY(y-14);
	},
	addGroup : function (name, parent) {
    var group = MSLayerGroup.new();
    group.setName(name);
    parent.addLayers([group]);
    return group;
	},
	addText : function (x, y, text, parent) {
    //todo
    var text = MSTextLayer.new();
    text.setStringValue(text);
    parent.addLayers([text]);
	},
	removeLayer : function (group, layer) {
		if (group) {
			group.removeLayer(layer);
		}
	},
  getRect: function(layer){
   var rect = layer.absoluteRect();
      return {
          x: Math.round(rect.x()),
          y: Math.round(rect.y()),
          width: Math.round(rect.width()),
          height: Math.round(rect.height()),
          maxX: Math.round(rect.x() + rect.width()),
          maxY: Math.round(rect.y() + rect.height()),
          setX: function(x){ rect.setX(x); this.x = x; this.maxX = this.x + this.width; },
          setY: function(y){ rect.setY(y); this.y = y; this.maxY = this.y + this.height; },
          setWidth: function(width){ rect.setWidth(width); this.width = width; this.maxX = this.x + this.width; },
          setHeight: function(height){ rect.setHeight(height); this.height = height; this.maxY = this.y + this.height; }
      };
  },
  //	Tweaked from Character count plugin by Andrew Fiorillo - http://github.com/andrewfiorillo/sketch-character-count
  countTextLayerChar: function(layer){
  	var count;
  	if (!layer || this.is(layer,"MSTextLayer")){
  		count = false; //layer is not a MSTextLayer
  	}
  	else if (layer.isEditingText()){
  		count = layer.editingDelegate().textView().selectedRange().length;
  	}
  	else{
  		count = layer.stringValue().length();
  	}
  	return count;
  },
  hexToRgb : function (hex) {
		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result ? {
			r: parseInt(result[1], 16),
			g: parseInt(result[2], 16),
			b: parseInt(result[3], 16)
		} : null;
	}
}
