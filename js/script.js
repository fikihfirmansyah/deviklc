var COLOURS = [ '#9cd7ff', '#d4ffdc', '#FFEBCD','#ffb2a8', '#cff6ff', '#FFFFFF', '#E0E0E0'];
//var COLOURS = ['#003049', '#ffd166', '#06d6a0', '#c9ada7', '#d62828', '#577399', '#495867'];
var radius = 0;
var randomColor = 0;

function colourChange() {
	randomColor = parseInt( 0 + (COLOURS.length - 0) * Math.random(), 10 ) ;
}

const menu = document.querySelector('.menu');
const btn = menu.querySelector('.nav-tgl');
const navItem1 = menu.querySelector('.nav-item1');
const navItem2 = menu.querySelector('.nav-item2');
const navItem3 = menu.querySelector('.nav-item3');
const navItem4 = menu.querySelector('.nav-item4');
const navItem5 = menu.querySelector('.nav-item5');
btn.addEventListener('click', evt => {
	menu.classList.toggle('active');
	colourChange();
});
navItem1.addEventListener('click', evt => {
	menu.classList.toggle('active');
	colourChange();
});
navItem2.addEventListener('click', evt => {
	menu.classList.toggle('active');
	colourChange();
});
 navItem3.addEventListener('click', evt => {
 	menu.classList.toggle('active');
 	colourChange();
 });

// navItem4.addEventListener('click', evt => {
// 	menu.classList.toggle('active');
// 	colourChange();
// });
// navItem5.addEventListener('click', evt => {
// 	menu.classList.toggle('active');
// 	colourChange();
// });

var TxtRotate = function(el, toRotate, period) {
	this.toRotate = toRotate;
	this.el = el;
	this.loopNum = 0;
	this.period = parseInt(period, 10) || 2000;
	this.txt = '';
	this.tick();
	this.isDeleting = false;
  };
  
  TxtRotate.prototype.tick = function() {
	var i = this.loopNum % this.toRotate.length;
	var fullTxt = this.toRotate[i];
  
	if (this.isDeleting) {
	  this.txt = fullTxt.substring(0, this.txt.length - 1);
	} else {
	  this.txt = fullTxt.substring(0, this.txt.length + 1);
	}
  
	this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';
  
	var that = this;
	var delta = 300 - Math.random() * 100;
  
	if (this.isDeleting) { delta /= 2; }
  
	if (!this.isDeleting && this.txt === fullTxt) {
	  delta = this.period;
	  this.isDeleting = true;
	} else if (this.isDeleting && this.txt === '') {
	  this.isDeleting = false;
	  this.loopNum++;
	  delta = 500;
	}
  
	setTimeout(function() {
	  that.tick();
	}, delta);
  };
  
  window.onload = function() {
	var elements = document.getElementsByClassName('txt-rotate');
	for (var i=0; i<elements.length; i++) {
	  var toRotate = elements[i].getAttribute('data-rotate');
	  var period = elements[i].getAttribute('data-period');
	  if (toRotate) {
		new TxtRotate(elements[i], JSON.parse(toRotate), period);
	  }
	}
	// INJECT CSS
	var css = document.createElement("style");
	css.type = "text/css";
	css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #000 }";
	document.body.appendChild(css);
  };
  

Sketch.create({

	container: document.getElementById( 'background-content' ),
	autoclear: false,
	retina: 'auto',

	update: function() {
		radius = 300;
	},

	click: () => colourChange(),

	touchmove: function() {

		for ( var i = this.touches.length - 1, touch; i >= 0; i-- ) {

			touch = this.touches[i];

			this.lineCap = 'round';
			this.lineJoin = 'round';
			this.fillStyle = this.strokeStyle = COLOURS[ randomColor % COLOURS.length ];
			this.lineWidth = radius;

			this.beginPath();
			this.moveTo( touch.ox, touch.oy );
			this.lineTo( touch.x, touch.y );
			this.stroke();
		}
	},

	touchend: () => colourChange()
});

$(document).ready(function($) {
	"use strict";

	// Element fade in animation

	$(".animate").each(function(e) {
		var $this = $(this);
		setTimeout(function(){
			$this.addClass("idle");
		}, e * 100);
	});
});

// Wrap every letter in a span
var textWrapper = document.querySelector('.ml12');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: true})
  .add({
    targets: '.ml12 .letter',
    translateX: [40,0],
    translateZ: 0,
    opacity: [0,1],
    easing: "easeOutExpo",
    duration: 1200,
    delay: (el, i) => 500 + 30 * i
  }).add({
    targets: '.ml12 .letter',
    translateX: [0,-30],
    opacity: [1,0],
    easing: "easeInExpo",
    duration: 1100,
    delay: (el, i) => 100 + 30 * i
  });


// Flipping Animation

(function () {

	var word = ['Android Developer 📱', 'UI Designer', 'Front-end Developer', 'Video Editor', 'UX Designer'];
	var element = document.getElementsByClassName('flipText')[0];
	var wordIndex = 1;

	var resetAnimation = function () {
		element.classList.remove('flip');
	}

	setInterval(function () {
		switch (wordIndex) {
			case 0:
				element.classList.add('flip');
				element.textContent = word[wordIndex];
				wordIndex = 1;
				setTimeout(resetAnimation, 1000);
				break;

			case 1:
				element.classList.add('flip');
				element.textContent = word[wordIndex];
				wordIndex = 2;
				setTimeout(resetAnimation, 1000);
				break;

			case 2:
				element.classList.add('flip');
				element.textContent = word[wordIndex];
				wordIndex = 3;
				setTimeout(resetAnimation, 1000);
				break;

			case 3:
				element.classList.add('flip');
				element.textContent = word[wordIndex];
				wordIndex = 4;
				setTimeout(resetAnimation, 1000);
				break;

			case 4:
				element.classList.add('flip');
				element.textContent = word[wordIndex];
				wordIndex = 0;
				setTimeout(resetAnimation, 1000);
				break;

			// case 5:
			// 	element.classList.add('flip');
			// 	element.textContent = word[wordIndex];
			// 	wordIndex = 0;
			// 	setTimeout(resetAnimation, 1000);
			// 	break;
		}
	}, 2000)
}());