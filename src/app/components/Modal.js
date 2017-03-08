import React from "react";

export default function({time, score, closeModal}){
	return(
		<div id="modal" className="modal-wrap">
			<h2>Your time: {time} sec</h2>
			<h2>Your score: {score} pts</h2>
			<div>
				<button className="btn btn-info" 
					onClick={closeModal}>Close</button>
			</div>
		</div>
	);
}