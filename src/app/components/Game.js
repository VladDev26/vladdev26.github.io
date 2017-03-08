import React, {Component} from "react";
import axios from "axios";

import Items from "./Items";
import Buttons from "./Buttons";
import Modal from "./Modal";

import {quantityAlert, gameTitle} from "../const/elements";

import initState from '../const/initState';

let arr = [];

export default class Game extends Component{

	constructor(){
		super();
		this.state = {...initState};

		this.play = this.play.bind(this);
		this.refreshGame = this.refreshGame.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.changeQuantity = this.changeQuantity.bind(this);
	}

	componentDidMount(){
		this.fetchFieldSize();
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

	fetchFieldSize(){
		axios.get('https://kde.link/test/get_field_size.php')
			.then(response => {
				let {height, width} = response.data;
				this.setState({quantity: height * width});
			});
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
		const num = number/2;
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
							elem.parentElement.classList.add('bg-success');
							elem.parentElement.classList.remove('cool-shad-primary');
							elem.classList.toggle('visib-hidden');
						}
						arr = [];
					}
				}
		}

		let allImg = document.getElementsByClassName('visib-hidden');

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

	changeQuantity(e){
		this.setState({quantity: e.target.value});
	}

	
	showModal(){this.setState({showModal: true})}
	closeModal(){
		this.refreshGame();
		this.setState({
			showCells: true,
			showModal: false
		});
	}

	render(){
		const state = this.state;
		const {changeQuantity, play, refreshGame, handleClick, closeModal} = this;

		let cells = (
			<div id="cells" className="row text-xs-center mb-1">
				<input className="form-control form-control-cells" type="text" 
					value={state.quantity}
					onChange={changeQuantity}
				/> cells
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
					play={play}
					refreshGame={refreshGame}
				/>

				<div className="row mt-1">
					<div className="col-xs-6 text-xs-right">
						{'Time: ' + state.timer.sec }
					</div>
					<div className="col-xs-6">
						{'Score: ' + state.timer.score }
					</div>
				</div>
				
				<Items images={state.src} handleClick={handleClick}/>
				

				{state.showModal ? 
					<Modal 
						time={state.timer.sec}
						score={state.timer.score}
						closeModal={closeModal}/> : 
					null}
			</div>
		);
	}
}
