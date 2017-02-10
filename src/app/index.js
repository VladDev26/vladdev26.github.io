import React from "react";
import {render} from "react-dom";

import Game from "./components/Game";

import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./css/style.css";


render(<Game/>, document.getElementById('app'));