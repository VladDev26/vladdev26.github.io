import React from "react";
import {render} from "react-dom";

import Game from "./components/Game";

import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./css/style.css";

const App = () => (
	<div>
		<Game/>
	</div>
);


render(<App/>, document.getElementById('app'));