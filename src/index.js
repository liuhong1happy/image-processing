var React = require('react');
var ReactDOM = require('react-dom');

var Cv = require('./image/cv');

class GrayImage extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			loaded: false
		}
	}
	componentDidMount(){
		var _self = this;
		var pWidth = parseFloat(this.props.width), pHeight = parseFloat(this.props.height);
		this.canvas = new Cv.Canvas(this.props.id);
		this.canvas.createImageByUri(this.props.src,function(){
			_self.canvas.show();
			
			var {width,height} = _self.canvas.getSize();

			var data = _self.canvas.getImageData();
			
			var mat = new Cv.Mat(data.height,data.width,data.data);
			var gMat = Cv.cvtGray(mat);
			var imgData = _self.canvas.createImageDataByMat(gMat);
			_self.canvas.putImageData(imgData);
			
			if(!isNaN(pWidth) || !isNaN(pHeight)){
				width =  !isNaN(pWidth)? pWidth : width;
				height = !isNaN(pHeight) ? pHeight : height;
				_self.canvas.element.style.width = width +"px";
				_self.canvas.element.style.height = height + "px";
			}
			
			_self.setState({
				loaded: true
			})
		});
	}
	render(){
		return <canvas id={this.props.id || "ip-canvas"} />
	}
}

module.exports = {
	GrayImage: GrayImage
}