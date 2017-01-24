//Define constructor
var Text = function(text){
  this.x = 0;
  this.y = 0;
  this.width = width;
  this.height = height;
  this.string = text;

  //Text proportions
  this.element = MSTextLayer.new();
  this.element.setStringValue(this.string);
};

//Getters
Text.prototype.getText = function(){
  return this.element;
}

Text.prototype.getString = function(){
  return this.string;
}

Text.prototype.getX = function(){
  return this.x;
}

Text.prototype.getY = function(){
  return this.y;
}

Text.prototype.setX = function(x){
  var rect = this.getRect(this.element);
  this.x = x;
  rect.setX(x);
}

Text.prototype.setY = function(y){
  var rect = this.getRect(this.element);
  this.y = y;
  rect.setY(y);
}

//Setters
Text.prototype.setString = function(text){
  this.string = text;
  this.element.setStringValue(this.string);
}
