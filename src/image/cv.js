const Canvas = require('./canvas');
var canvas = new Canvas();

var Color = function(r,g,b,a){
	this.r = r || 0;
	this.g = g || 0;
	this.b = b || 0;
	this.a = a || 0;
}

Color.prototype.cvtGray = function(){
	var { r,g,b } = this;
	this.r = this.g = this.b = (r * 299 + g * 587 + b * 114) / 1000; 
	if(this.r!=0) this.a = this.a || 255; // 避免透明度缺失
}

var Mat = function (__row, __col, __data, __buffer){ 
	this.row = __row || 0; 
	this.col = __col || 0; 
	this.channel = 4; 
	this.buffer = __buffer || new ArrayBuffer(__row * __col * 4); 
	this.data = new Uint8ClampedArray(this.buffer); 
	__data && this.data.set(__data); 
	this.bytes = 1; 
	this.type = "CV_RGBA"; 
} 

function imread(__image){ 
	var width = __image.width, 
	height = __image.height; 
	canvas.createImageDataByImage(__image);
	var imageData = canvas.getImageData();
	tempMat = new Mat(height, width , imageData.data); 
	return tempMat; 
} 

function cvtColor(src, cvt){
	if(src.type && src.type === "CV_RGBA"){ 
		var row = src.row, col = src.col; 
		var dst = new Mat(row, col); 
		var data = src.data;
		var data2 = dst.data;
		var pix1, pix2, pix = src.row * src.col * 4; 
		while (pix){ 
			var r = data[pix -= 4], g = data[pix1 = pix + 1], b = data[pix2 = pix + 2], a = data2[pix + 3];
			var color = cvt(r,g,b,a);

			data2[pix] = color.r;
			data2[pix1] = color.g;
			data2[pix2] = color.b;
			data2[pix + 3] = color.a;
		} 
	}else{
		return src;
	}
	return dst;
}

function cvtMatrix(src, cvt){
	
}

function cvtGray(src){
	return cvtColor(src,function(r,g,b,a){
		var color = new Color(r,g,b,a);
		color.cvtGray();
		return color;
	})
}

module.exports = {
	Color: Color,
	Mat: Mat,
	imread: imread,
	cvtColor: cvtColor,
	cvtMatrix: cvtMatrix,
	cvtGray: cvtGray,
	Canvas: Canvas,
	canvas: canvas
}