var utils = {
  is: function(layer, theClass){ //Thanks to utom - https://github.com/utom
      if(!layer) return false;
      var klass = layer.class();
      return klass === theClass;
  },

  hexToRgb : function (hex) { //Thanks to utom - https://github.com/utom
		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result ? {
			r: parseInt(result[1], 16),
			g: parseInt(result[2], 16),
			b: parseInt(result[3], 16)
		} : null;
	},

  getRect: function(layer){ //Thanks to utom - https://github.com/utom
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

  countTextLayerChar: function(layer){ //Thanks to Andrew Fiorillo - https://github.com/andrewfiorillo
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

  findLayersMatchingPredicate_inContainer_filterByType: function(predicate, container, layerType) { //Thanks to Aby Nimbalkar - https://github.com/abynim
      var scope;
      switch (layerType) {
          case MSPage :
              scope = doc.pages()
              return scope.filteredArrayUsingPredicate(predicate)
          break;

          case MSArtboardGroup :
              if(typeof container !== 'undefined' && container != nil) {
                  if (container.className == "MSPage") {
                      scope = container.artboards()
                      return scope.filteredArrayUsingPredicate(predicate)
                  }
              } else {
                  // search all pages
                  var filteredArray = NSArray.array()
                  var loopPages = doc.pages().objectEnumerator(), page;
                  while (page = loopPages.nextObject()) {
                      scope = page.artboards()
                      filteredArray = filteredArray.arrayByAddingObjectsFromArray(scope.filteredArrayUsingPredicate(predicate))
                  }
                  return filteredArray;
              }
          break;

          default :
              if(typeof container !== 'undefined' && container != nil) {
                  scope = container.children()
                  return scope.filteredArrayUsingPredicate(predicate)
              } else {
                  // search all pages
                  var filteredArray = NSArray.array()
                  var loopPages = doc.pages().objectEnumerator(), page;
                  while (page = loopPages.nextObject()) {
                      scope = page.children()
                      filteredArray = filteredArray.arrayByAddingObjectsFromArray(scope.filteredArrayUsingPredicate(predicate))
                  }
                  return filteredArray;
              }
      }
      return NSArray.array() // Return an empty array if no matches were found
  },

  findFirstLayerMatchingPredicate_inContainer_filterByType: function(predicate, container, layerType) { //Thanks to Aby Nimbalkar - https://github.com/abynim
      var filteredArray = this.findLayersMatchingPredicate_inContainer_filterByType(predicate, container, layerType)
      return filteredArray.firstObject()
  },

  findTextLayer_inContainer: function(container) { //Thanks to Aby Nimbalkar - https://github.com/abynim
      var predicate = NSPredicate.predicateWithFormat("className == 'MSTextLayer'");
      return this.findLayersMatchingPredicate_inContainer_filterByType(predicate, container);
  },

  getTextLayerInfoInContainer: function(container){
    var info = [];
    var searchResults = this.findTextLayer_inContainer(container);

    if(searchResults.length > 0){
        for (var i = 0; i < searchResults.length; i++){
            var characterCount = this.countTextLayerChar(searchResults[i]);
            if(characterCount && characterCount > 0){
              var rect = this.getRect(searchResults[i]);
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
}
