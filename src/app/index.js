import React from "react";
import ReactDOM from "react-dom";

import {Game} from "./components/Game";

require("../../node_modules/bootstrap/dist/css/bootstrap.min.css");
require("./css/style.css");

export class App extends React.Component{
	render(){
		return(
			<div>
				<Game/>
			</div>
		);
	}
}


ReactDOM.render(<App/>, document.getElementById('app'));
// <IndexRoute component={Home} />