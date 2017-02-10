import React from "react";

const Buttons = props => {
	let playBtn = (
		<button className="btn btn-primary"
			onClick={props.play}
		>Play</button>
	);
	let refreshBtn = (
		<button className="btn btn-primary"
			onClick={props.refreshGame}
		>Refresh</button>
	);
	return(
		<div className="row text-xs-center">
			{props.showPlayBtn ? playBtn : null}
			{props.showRefreshBtn ? refreshBtn : null}
		</div>
	);
};

export default Buttons;