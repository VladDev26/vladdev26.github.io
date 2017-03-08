import React from "react";
import {render} from "react-dom";

// IE classList polyfill 
import "./polyfills/classList.min.js";


import Game from "./components/Game";

import "bootstrap/dist/css/bootstrap.min.css";
import "./css/style.css";


render(<Game/>, document.getElementById('app'));