import React from "react";

const Items = props => {
	let image = props.images.map((item, i) => (
		<div key={i} className="card bg-success cool-shad-success mb-0 dib">
			<img className="card-img-top img-fluid opacity0"
			 	onClick={props.handleClick} src={item} alt={i} />
		</div>
	));
	return(
		<div className="row py-1 text-xs-center">
			<div id="wrapper" className="mx-auto">{image}</div>
		</div>
	);
};

export default Items;