//SLIDER
;(function(){
	$('.slider').unslider({
		nav: false,
		keys: false
	});
})();








;(function(){
	var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
	var xhr = new XHR();
	
	// xhr.open('GET', 'http://api.pixplorer.co.uk/image?word=doge&amount=5&size=tb', true);
	xhr.open('GET', 'https://pixabay.com/api/?key=2696808-a99aca4232c52551e38c21475&image_type=photo', true);
	xhr.onload = function(){
		var data = JSON.parse(this.responseText);
		console.log(data);
	}
	xhr.send();
	
})();








// ;(function(){
// 	var text;
// 	$('.searchform__subm').on('click', function(){
// 		text = $('.searchform__text').val();
// 		statement();
// 		return false;
// 	});

// 	var query;
// 	function statement(){
// 		if(text === undefined || text === ""){
// 			query = 'https://pixabay.com/api/?key=2696808-a99aca4232c52551e38c21475'+
// 					'&image_type=photo';
// 			getImgs(query);
// 		}else{
// 			query = 'https://pixabay.com/api/?key=2696808-a99aca4232c52551e38c21475'+
// 					'&q='+ text +
// 					'&image_type=photo';
// 			getImgs(query);
// 			console.log(text);
// 		}
// 	}
// 	statement();
	

// 	function getImgs(query){
// 		var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
// 		var xhr = new XHR();

// 		// https://pixabay.com/api/docs/
		

// 		xhr.open('GET', query, true);
// 		xhr.onload = function(){
// 			var urls = [];
// 			var data = JSON.parse(this.responseText);
// 			// console.log(data.hits);
			
// 			for(var i=0; i<8; i++){urls.push(data.hits[i].webformatURL);}
// 			// console.log(urls);
			
// 			for(var j=0; j<urls.length; j++){
// 				$('.acts__link').eq(j).css({
// 					// 'width': data.hits[j].webformatWidth/2,
// 					// 'height': data.hits[j].webformatHeight/2,
// 					'height': data.hits[j].webformatHeight,
// 					'background': 'url("'+ urls[j] +'")',
// 					'background-repeat': 'no-repeat',
// 					'background-size': 'cover',
// 					'background-position': 'center'
// 				});
// 			}

// 			$('.acts').masonry({
// 				// columnWidth: 100,
// 				itemSelector: '.acts__elem',
// 				// true - если у вас все блоки одинаковой ширины
// 				singleMode: false,

// 				isResizable: true,

// 				isAnimated: false

// 				// gutter: 10
// 			});
// 		}
// 		xhr.send();
// 	}
// })();