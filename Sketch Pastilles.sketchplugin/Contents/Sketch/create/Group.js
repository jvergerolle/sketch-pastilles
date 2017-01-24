//Define constructor
var Group = function(name){
  this.name = name;
  this.element = MSLayerGroup.new();
  this.element.setName(this.name);
}

//Methods
Group.prototype.addLayer = function(layer){
  this.element.addLayers([layer]);
}

Group.prototype.addToContainer = function(container){
  container.addLayers([this.element]);
}

//Getters
Group.prototype.getGroup = function(){
  return this.element;
}

Group.prototype.getName = function(){
  return this.name;
}

//Setters
Group.prototype.setName = function(name){
  this.element.setName(name);
}
