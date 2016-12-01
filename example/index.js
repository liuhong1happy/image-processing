require('./index.less');
var React = require('react');
var ReactDOM = require('react-dom');
var {GrayImage} = require('../lib/index');

ReactDOM.render(<div>
                <GrayImage src="images/test.jpg" width={698} height={494.4}/>
                </div>,document.getElementById("react-container"));