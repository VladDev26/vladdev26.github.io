import React, {Component} from "react";
import {quantityAlert, gameTitle} from "../const/elements";

let arr = [];

export default class Game extends Component{

	constructor(){
		super();
		this.state = {
			src: [],

			hwData: {},
			loaded: false,
			timer: {
				sec: 0,
				score: 1000
			},
			quantity: 54,
			flag: false,

			showQuantityAlert: false,
			showGameTitle: true,
			showPlayBtn: true,
			showRefreshBtn: false,
			showCells: true,
		};
	}

	componentDidMount(){
		this.getFieldSize();
	}


	
	goTimer(){
		this.timer = setInterval(count.bind(this), 1000);
		
		let i = this.state.timer.sec;

		function count(){
			i<1000 ? i++ : this.stopTimer()
			
			this.setState({
				timer: {
					// timer,
					sec: i,
					score: 1000-i
				}
			});
			// console.log('timer is on!');
		}
	}
	stopTimer(){clearInterval(this.timer);}

	getFieldSize(){
		let xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if(xhr.readyState == 4 && xhr.status == 200) {
				const parsed = JSON.parse(xhr.responseText);
				this.setState({
					hwData: parsed,
					loaded: true,
					quantity: parsed.height*parsed.width
				});
			}
		}.bind(this);
		xhr.open('GET', 'https://kde.link/test/get_field_size.php', true);
		xhr.send(null);
	}

	generateLinks(number){
		// check
		const quantity = number/2;
		if( (quantity>32) || 
			(quantity<2) || 
			( (quantity*2) % 2 != 0) || 
			(typeof quantity !== 'number') 
		){
			console.log('error in generateLinks');
			// this.refreshGame();
			return false;	
		}

		const imgs = 10;
		let links = [];
		for(let i=0; i<quantity; i++){
			if(i<imgs){
				links.push('https://kde.link/test/'+i+'.png');
			}else if(i<imgs*2){
				let j = i-imgs;
				links.push('https://kde.link/test/'+j+'.png');
			}else if(i<imgs*3){
				let k = i-imgs*2;
				links.push('https://kde.link/test/'+k+'.png');
			}else if(i<imgs*4){
				let l = i-imgs*3;
				links.push('https://kde.link/test/'+l+'.png');
			}
		}
		return links;
	}
	doubleLinks(arr){return arr.concat(arr);}
	shuffleLinks(doubled){
		function shuffle(a) {
			for (let i = a.length; i; i--) {
				let j = Math.floor(Math.random() * i);
				[a[i - 1], a[j]] = [a[j], a[i - 1]];
			}
		}
		shuffle(doubled);
		return doubled;
	}

	

	handleClick(e){
		e.target.classList.toggle('opacity0');

		function checkTwin(a){return a !== e.target;}

		if(arr[0] === e.target){
			arr = arr.filter(checkTwin);
			// console.log('stage 1');
		}else if(arr.length>=2){
			arr[0].classList.toggle('opacity0');
			arr[1].classList.toggle('opacity0');
			arr = [];
			arr.push(e.target);
			// console.log('stage 2');
		}else{
			arr.push(e.target);
			if(arr[0] && arr[1]){
				if (arr[0].src === arr[1].src){
					arr[0].parentElement.className += ' bg-danger';
					arr[1].parentElement.className += ' bg-danger';

					arr[0].parentElement.classList.toggle('cool-shad-success');
					arr[1].parentElement.classList.toggle('cool-shad-success');

					arr[0].classList.toggle('game-img-clicked');
					arr[1].classList.toggle('game-img-clicked');

					arr = [];
				}
			}
			// console.log('stage 3');
		}
		let allImg = document.getElementsByClassName('game-img-clicked');

		if(allImg.length == this.state.quantity){
			this.stopTimer();
			this.showModal();
		}
	}

	showModal(){
		const modal = document.getElementById('modal');
		modal.style.width = window.innerWidth + 'px';
		modal.style.height = window.innerHeight + 'px';
		modal.classList.toggle('dnone');
	}

	refreshGame(){
		this.stopTimer();
		this.setState({
			src: [],
			timer:{
				sec: 0,
				score: 1000
			},
			showGameTitle: true,

			showPlayBtn: true,
			showRefreshBtn: false,
			showCells: false
		});

		console.log('refreshed!');
	}

	play(){
		let quantity = this.state.quantity;

		let stage1 = this.generateLinks(quantity);
		if(!stage1){
			this.refreshGame();
			this.setState({
				showQuantityAlert: true,
				showGameTitle: false,

				showPlayBtn: true,
				showRefreshBtn: false,
				showCells: true
			});
			return false;
		}

		let stage2 = this.doubleLinks(stage1);
		let stage3 = this.shuffleLinks(stage2);

		this.setState({
			src: stage3,
			showQuantityAlert: false,
			showGameTitle: false,

			showPlayBtn: false,
			showRefreshBtn: true,
			showCells: false
		});
		this.goTimer();
	}

	closeModal(){
		this.refreshGame();
		this.setState({showCells: true});
		modal.classList.toggle('dnone');
	}

	changeQuantity(e){
		this.setState({quantity: e.target.value});
	}

	

	render(){
		let image = this.state.src.map((item, i) => {
			return(
				<div key={i} className="card bg-success cool-shad-success mb-0 dib">
					<img className="card-img-top img-fluid opacity0"
					 	onClick={this.handleClick.bind(this)} src={item} alt=""/>
				</div>
			);
		});

		let playBtn = (
			<button className="btn btn-primary"
				onClick={this.play.bind(this)}
			>Play</button>
		);
		let refreshBtn = (
			<button className="btn btn-primary dnone"
				onClick={this.refreshGame.bind(this)}
			>Refresh</button>
		);
		let cells = (
			<div id="cells" className="row text-xs-center mb-1">
				<input className="form-control form-control-cells" type="text" 
					value={this.state.quantity}
					onChange={this.changeQuantity.bind(this)}
				/> cells
			</div>
		);

		return(
			<div className="container-fluid py-3">
				{this.state.showGameTitle ? gameTitle : null}
				{this.state.showQuantityAlert ? quantityAlert : null}
				{this.state.showCells ? cells : null}

				<div className="row text-xs-center">
					{this.state.showPlayBtn ? playBtn : null}
					{this.state.showRefreshBtn ? refreshBtn : null}
				</div>

				<div className="row mt-1">
					<div className="col-xs-6 text-xs-right">
						{'Time: ' + this.state.timer.sec }
					</div>
					<div className="col-xs-6">
						{'Score: ' + this.state.timer.score }
					</div>
				</div>
				
				<div className="row py-1 text-xs-center">
					<div id="wrapper" className="mx-auto">{image}</div>
				</div>
				<div id="modal" className="dnone modal-wrap">
					<h2>Your time: {this.state.timer.sec} sec</h2>
					<h2>Your score: {this.state.timer.score} pts</h2>
					<div>
						<button className="btn btn-info" 
							onClick={this.closeModal.bind(this)}>Close</button>
					</div>
				</div>
			</div>
		);
	}
}
