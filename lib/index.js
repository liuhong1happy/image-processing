'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var ReactDOM = require('react-dom');

var Cv = require('./image/cv');

var GrayImage = function (_React$Component) {
	_inherits(GrayImage, _React$Component);

	function GrayImage(props) {
		_classCallCheck(this, GrayImage);

		var _this = _possibleConstructorReturn(this, (GrayImage.__proto__ || Object.getPrototypeOf(GrayImage)).call(this, props));

		_this.state = {
			loaded: false
		};
		return _this;
	}

	_createClass(GrayImage, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _self = this;
			var pWidth = parseFloat(this.props.width),
			    pHeight = parseFloat(this.props.height);
			this.canvas = new Cv.Canvas(this.props.id);

			this.canvas.createImageByUri(this.props.src, function () {
				_self.canvas.show();

				var _self$canvas$getSize = _self.canvas.getSize(),
				    width = _self$canvas$getSize.width,
				    height = _self$canvas$getSize.height;

				var data = _self.canvas.getImageData();

				var mat = new Cv.Mat(data.height, data.width, data.data);
				var gMat = Cv.cvtGray(mat);
				var imgData = _self.canvas.createImageDataByMat(gMat);
				_self.canvas.putImageData(imgData);

				if (!isNaN(pWidth) || !isNaN(pHeight)) {
					width = !isNaN(pWidth) ? pWidth : width;
					height = !isNaN(pHeight) ? pHeight : height;
					_self.canvas.element.style.width = width + "px";
					_self.canvas.element.style.height = height + "px";
				}

				_self.setState({
					loaded: true
				});
			});
		}
	}, {
		key: 'render',
		value: function render() {
			return React.createElement('canvas', { id: this.props.id || "ip-canvas" });
		}
	}]);

	return GrayImage;
}(React.Component);

module.exports = {
	GrayImage: GrayImage
};