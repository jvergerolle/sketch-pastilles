@import '~/Library/Application Support/com.bohemiancoding.sketch3/Plugins/Sketch Pastilles.sketchplugin/Contents/Sketch/lib/utils.js'

//Define constructor
var Textfield = function(text){
  this.x = 0;
  this.y = 0;
  this.color = "#000000"
  this.string = text;
  this.name = text;

  //Text proportions
  this.element = MSTextLayer.new();
  this.element.name = this.name;
  this.element.setStringValue(this.string);
  this.element.setTextColor(MSImmutableColor.colorWithSVGString(this.color).newMutableCounterpart());

  //Create Width and Height values
  var rect = utils.getRect(this.element);
  this.width = rect.width;
  this.height = rect.height;
};

//Getters
Textfield.prototype.getTextfield = function(){
  return this.element;
}

Textfield.prototype.getString = function(){
  return this.string;
}

Textfield.prototype.getX = function(){
  return this.x;
}

Textfield.prototype.getY = function(){
  return this.y;
}

Textfield.prototype.getWidth = function(){
  return this.width;
}

Textfield.prototype.getHeight = function(){
  return this.height;
}

Textfield.prototype.getColor = function(){
  return this.color;
}

//Setters
Textfield.prototype.setX = function(x){
  var rect = utils.getRect(this.element);
  this.x = x;
  rect.setX(x);
}

Textfield.prototype.setY = function(y){
  var rect = utils.getRect(this.element);
  this.y = y;
  rect.setY(y);
}

Textfield.prototype.setString = function(text){
  this.string = text;
  this.element.setStringValue(this.string);
}

Textfield.prototype.setColor = function(color){
  this.color = color;
  this.element.setTextColor(MSImmutableColor.colorWithSVGString(this.color).newMutableCounterpart());
}
