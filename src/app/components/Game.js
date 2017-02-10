import React, {Component} from "react";

import Items from "./Items";
import Buttons from "./Buttons";

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

			showQuantityAlert: false,
			showGameTitle: true,
			showPlayBtn: true,
			showRefreshBtn: false,
			showCells: true,
			showModal: false
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
					sec: i,
					score: 1000-i
				}
			});
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

	checkCellsNumber(number){
		const half = number/2;
		if( (half>32) || 
			(half<2) || 
			( (half*2) % 2 != 0) || 
			(typeof half !== 'number') 
		){
			this.setState({
				showQuantityAlert: true,
				showGameTitle: true,

				showPlayBtn: true,
				showRefreshBtn: false,
				showCells: true
			});
			return false;	
		}
		return true;
	}

	generateLinks(number){
		if(!this.checkCellsNumber(number)) return;

		const limit = 10;
		let num = number/2;
		let links = [];

		for(let i=0, k=0; i<num; i++, k++){
			if(k===limit){ k = 0; }
			links.push(`https://kde.link/test/${k}.png`);
		}
		return links;
	}
	
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
		let target = e.target;
		target.classList.toggle('opacity0');

		switch(true){
			case (arr[0] === target):
				arr = arr.filter(el => el !== target);
				break;
			case (arr.length >= 2):
				for(let elem of arr){ elem.classList.toggle('opacity0'); }
				arr = [];
				arr.push(target);
				break;
			default:
				arr.push(target);
				if(arr[0] && arr[1]){
					if (arr[0].src === arr[1].src){
						for(let elem of arr){
							elem.parentElement.classList.add('bg-danger');
							elem.parentElement.classList.remove('cool-shad-success');
							elem.classList.toggle('game-img-clicked');
						}
						arr = [];
					}
				}
		}

		let allImg = document.getElementsByClassName('game-img-clicked');

		if(allImg.length == this.state.quantity){
			this.stopTimer();
			this.showModal();
		}
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
			showCells: true
		});
	}

	play(){
		let genLinks = this.generateLinks(this.state.quantity);
		if(!genLinks) return;
		
		let doubledLinks = genLinks.concat(genLinks);

		let shuffledLinks = this.shuffleLinks(doubledLinks);

		this.setState({
			src: shuffledLinks,
			showQuantityAlert: false,
			showGameTitle: false,

			showPlayBtn: false,
			showRefreshBtn: true,
			showCells: false
		}, () => {
			this.goTimer();
		});
	}

	changeQuantity(quantity){this.setState({quantity})}

	
	showModal(){this.setState({showModal: true});}
	closeModal(){
		this.refreshGame();
		this.setState({
			showCells: true,
			showModal: false
		});
	}

	render(){
		const state = this.state;

		let cells = (
			<div id="cells" className="row text-xs-center mb-1">
				<input className="form-control form-control-cells" type="text" 
					value={state.quantity}
					onChange={e => this.changeQuantity(e.target.value)}
				/> cells
			</div>
		);
		let modal = (
			<div id="modal" className="modal-wrap">
				<h2>Your time: {state.timer.sec} sec</h2>
				<h2>Your score: {state.timer.score} pts</h2>
				<div>
					<button className="btn btn-info" 
						onClick={this.closeModal.bind(this)}>Close</button>
				</div>
			</div>
		);

		return(
			<div className="container-fluid py-3">
				{state.showGameTitle ? gameTitle : null}
				{state.showQuantityAlert ? quantityAlert : null}
				{state.showCells ? cells : null}

				<Buttons 
					showPlayBtn={state.showPlayBtn}
					showRefreshBtn={state.showRefreshBtn}
					play={this.play.bind(this)}
					refreshGame={this.refreshGame.bind(this)}
				/>

				<div className="row mt-1">
					<div className="col-xs-6 text-xs-right">
						{'Time: ' + state.timer.sec }
					</div>
					<div className="col-xs-6">
						{'Score: ' + state.timer.score }
					</div>
				</div>
				
				<Items images={state.src} handleClick={this.handleClick.bind(this)}/>
				

				{state.showModal ? modal : null}
			</div>
		);
	}
}
