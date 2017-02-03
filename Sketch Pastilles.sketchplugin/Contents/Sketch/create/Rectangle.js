@import '~/Library/Application Support/com.bohemiancoding.sketch3/Plugins/Sketch Pastilles.sketchplugin/Contents/Sketch/lib/utils.js'

//Define constructor
var Rectangle = function(name, width, height, radius){
  this.name = name;
  this.x = 0;
  this.y = 0;
  this.width = width;
  this.height = height;
  this.radius = radius;

  //Rectangle proportions
  this.element = MSRectangleShape.new();
  this.element.name = this.name;
  this.element.frame().width = this.width;
  this.element.frame().height = this.height;
  this.element.setCornerRadiusFromComponents(this.radius.topLeft + ";" + this.radius.topRight + ";" + this.radius.bottomRight + ";" + this.radius.bottomLeft);

  //Rectangle creation
  this.shape = MSShapeGroup.shapeWithPath(this.element);
};

//Getters
Rectangle.prototype.getRectangleShape = function(){
  return this.element;
}

Rectangle.prototype.getRectangle = function(){
  return this.shape;
}

Rectangle.prototype.getX = function(){
  return this.x;
}

Rectangle.prototype.getY = function(){
  return this.y;
}

Rectangle.prototype.getWidth = function(){
  return this.width;
}

Rectangle.prototype.getHeight = function(){
  return this.height;
}

//Setters
Rectangle.prototype.setName = function(name){
  this.name = name;
  this.element.name = name;
}

Rectangle.prototype.setX = function(x){
  var rect = utils.getRect(this.shape);
  this.x = x;
  rect.setX(x);
}

Rectangle.prototype.setY = function(y){
  var rect = utils.getRect(this.shape);
  this.y = y;
  rect.setY(y);
}

Rectangle.prototype.setFillColor = function(color){
  this.fill = this.shape.style().addStylePartOfType(0);
  this.fill.color = MSImmutableColor.colorWithSVGString(color).newMutableCounterpart();
}

Rectangle.prototype.setStrokeColor = function(color){
  this.stroke = this.shape.style().addStylePartOfType(1);
  this.stroke.color = MSImmutableColor.colorWithSVGString(color).newMutableCounterpart();
}
