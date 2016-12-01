var Canvas = function(id){
	this.id = id || "ip-canvas";
	this.element = document.getElementById(this.id) || document.body.appendChild(document.createElement('canvas'));
	this.element.id = this.id;
	this.element.style.display = "none";
	this.context = this.element.getContext("2d");
	this.image = null;
	this.dataUrl = null;
	this.imgData = null;
	this.type = "uri";
}

Canvas.prototype.setSize = function(width,height){
	this.width = width;
	this.height = height;
	
	this.element.style.width = width+"px";
	this.element.style.height = height+"px";
	this.element.width = width;
	this.element.height = height;
}

Canvas.prototype.getSize = function(){
	return {
		width: this.width,
		height: this.height
	}
}

Canvas.prototype.createImageByUri = function(uri,callback){
	var _self = this;
	this.type = "uri";
	this.image = new Image();
	this.image.onload = function(e){
		//_self.image.src = uri;
		_self.setSize(_self.image.width, _self.image.height);
		_self.context.drawImage(_self.image,0,0);
		var result= _self.element.toDataURL();  
		var data = _self.context.getImageData(0,0, _self.image.width, _self.image.height);
		_self.dataUrl = result;
		_self.imgData = data;
		callback(e);
	}
	this.image.src = uri;
}

Canvas.prototype.createImageByFile = function(file,callback){
	var _self = this;
	this.type = "file";
	this.image = new Image();
	var reader = new FileReader();
	reader.onload = (function(theFile) {
			return function(e) {
				var result = e.target.result;
				_self.image.src = result;
				_self.dataUrl = result;
				_self.image.onload = function(e){
					_self.context.drawImage(_self.image,0,0);
					var data = _self.context.getImageData(0,0, _self.image.width, _self.image.height);
					_self.imgData = data;
					callback(e);
				};
			};
	})(file);
	reader.readAsDataURL(file);
}

Canvas.prototype.getDataURL = function(){
	  this.dataUrl = this.element.toDataURL();  
	  return this.dataUrl;
}

Canvas.prototype.getImageData = function(){
	this.imgData= this.context.getImageData(0,0, this.width, this.height);
	return this.imgData;
}

Canvas.prototype.getImageDataByImage = function(__image){
	this.image = __image;
	this.context.drawImage(this.image,0,0);
	var data = this.context.getImageData(0,0, this.image.width, this.image.height);
	this.imgData = data;
	return this.imgData;
}

Canvas.prototype.getDataURLByImage = function(__image){
	this.image = __image;
	this.context.drawImage(this.image,0,0);
	var result= this.element.toDataURL();  
	this.dataUrl = result;
	return this.dataUrl;
}

Canvas.prototype.createImageDataByMat = function(__imgMat){
	var width = __imgMat.col;
	var height = __imgMat.row;
	var imageData = this.context.createImageData(width, height); 
	imageData.data.set(__imgMat.data); 
	return imageData; 
}

Canvas.prototype.putImageData = function(__imgData){
	this.imgData = __imgData;
	this.context.putImageData(__imgData,0,0);
	var result= this.element.toDataURL();
	this.dataUrl = result;
	return this.imgData;
}

Canvas.prototype.show = function(){
	this.element.style.display = "";
}

module.exports = Canvas;