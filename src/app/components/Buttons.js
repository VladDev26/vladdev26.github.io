import React from "react";

function Buttons({play, refreshGame, showPlayBtn, showRefreshBtn}) {
	let playBtn = (
		<button className="btn btn-primary"
			onClick={play}
		>Play</button>
	);
	let refreshBtn = (
		<button className="btn btn-primary"
			onClick={refreshGame}
		>Refresh</button>
	);
	return(
		<div className="row text-xs-center">
			{showPlayBtn ? playBtn : null}
			{showRefreshBtn ? refreshBtn : null}
		</div>
	);
};

export default Buttons;