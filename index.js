/**
 * Created by kuikui on 2015/9/28.
 */

var radius = 8;
var margin_top = 60;
var margin_left = 30;
var curShowTimeSeconds = 0;
var win_Width = document.documentElement.clientWidth-20;
var win_Height = document.documentElement.clientHeight-20;

var balls = [];
var colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"];
//var end_time = new Date();
	//end_time.setTime(end_time.getTime() + 3600*1000*24);
	window.onload = function () {
		var canvas = document.getElementById("canvas");
		var context =canvas.getContext("2d");
		canvas.width = win_Width;
		canvas.height = win_Height;
		curShowTimeSeconds = getCurShowTimeSeconds();
		setInterval(function(){
			render(context);
			update();
		},100);
	}

function getCurShowTimeSeconds() {
	var curTime = new Date();
	//var ret = end_time.getTime()-curTime.getTime();
	//ret = Math.round(ret/1000);
	var ret = curTime.getHours() * 3600 + curTime.getMinutes() * 60 + curTime.getSeconds();
	//return ret >=0 ? ret : 0;
	return ret;
};
function update(){
	var nextShowTimeSeconds = getCurShowTimeSeconds();
	var nextHouer = parseInt(nextShowTimeSeconds/3600);
	var nextMinutes = parseInt((nextShowTimeSeconds-nextHouer*3600)/60);
	var nextSeconds = nextShowTimeSeconds%60;

	var curHouer = parseInt(curShowTimeSeconds/3600);
	var curMinutes = parseInt((curShowTimeSeconds-curHouer*3600)/60);
	var curSeconds = curShowTimeSeconds%60;

	if(nextSeconds != curSeconds){
		if(parseInt(curHouer/10) != parseInt(nextHouer/10)){
			addBalls(margin_left+0, margin_top,parseInt(curHouer/10))
		}
		if(parseInt(curHouer%10) != parseInt(nextHouer%10)){
			addBalls(margin_left+15*(radius+1), margin_top,parseInt(curHouer%10))
		}

		if(parseInt(curMinutes/10) != parseInt(nextMinutes/10)){
			addBalls(margin_left+39*(radius+1), margin_top,parseInt(curHouer/10))
		}
		if(parseInt(curMinutes%10) != parseInt(nextMinutes%10)){
			addBalls(margin_left+54*(radius+1), margin_top,parseInt(curMinutes%10))
		}

		if(parseInt(curSeconds/10) != parseInt(nextSeconds/10)){
			addBalls(margin_left+78*(radius+1), margin_top,parseInt(curHouer/10))
		}
		if(parseInt(curSeconds%10) != parseInt(nextSeconds%10)){
			addBalls(margin_left+93*(radius+1), margin_top,parseInt(curSeconds%10))
		}
		curShowTimeSeconds = nextShowTimeSeconds;
	}
	updateBalls();
};

function updateBalls() {
	for (var i = 0; i < balls.length; i++) {
		balls[i].x += balls[i].vx;
		balls[i].y += balls[i].vy;
		balls[i].vy += balls[i].g;
		if (balls[i].y >= win_Height - radius) {
			balls[i].y = win_Height - radius;
			balls[i].vy = -balls[i].vy * 0.55;
		}
	};
	var cnt = 0;
	for (var i = 0; i < balls.length; i++){
		if (balls[i].x + radius > 0 && balls[i].x - radius < win_Width) {
			balls[cnt++] = balls[i];
		}
	}
	while (balls.length > cnt) {
		balls.pop();
	}
};
function addBalls(X, Y, num){
	for (var i = 0; i < digit[num].length; i++){
		for (var j = 0; j < digit[num][i].length; j++){
			if(digit[num][i][j] == 1){
				var aball = {
					x : X+j*2*(radius+1)+(radius+1),
					y : Y+i*2*(radius+1)+(radius+1),
					g : 2.5+Math.random(),
					vx : Math.pow(-1,Math.ceil(Math.random()*1000))*4,
					vy : -2,
					color : colors[Math.floor(Math.random()*colors.length)]
				};
				balls.push(aball);
			};
		};
	};
};
function render(cxt){
	cxt.clearRect(0,0,cxt.canvas.width,cxt.canvas.height);
	var houer = parseInt(curShowTimeSeconds/3600);
	var minutes = parseInt((curShowTimeSeconds-houer*3600)/60);
	var seconds = curShowTimeSeconds%60;
	renderDigit(margin_left,margin_top,parseInt(houer/10),cxt);
	renderDigit(margin_left+15*(radius+1),margin_top,parseInt(houer%10),cxt);
	renderDigit(margin_left+30*(radius+1),margin_top,10,cxt);
	renderDigit(margin_left+39*(radius+1),margin_top,parseInt(minutes/10),cxt);
	renderDigit(margin_left+54*(radius+1),margin_top,parseInt(minutes%10),cxt);
	renderDigit(margin_left+69*(radius+1),margin_top,10,cxt);
	renderDigit(margin_left+78*(radius+1),margin_top,parseInt(seconds/10),cxt);
	renderDigit(margin_left+93*(radius+1),margin_top,parseInt(seconds%10),cxt);

	for(var i = 0;i < balls.length; i++){
		cxt.fillStyle = balls[i].color;
		cxt.beginPath();
		cxt.arc(balls[i].x, balls[i].y, radius, 0, 2*Math.PI, true);
		cxt.closePath();
		cxt.fill();
	}
};
function renderDigit(x,y,num,cxt){
	cxt.fillStyle = "rgb(0,102,150)";
	for(var i=0 ; i < digit[num].length; i++){
		for(var j=0; j < digit[num][i].length; j++){
			if(digit[num][i][j] == 1){
				cxt.beginPath();
				cxt.arc(x+j*2*(radius+1)+(radius+1),y+i*2*(radius+1)+(radius+1),radius,0,2*Math.PI,false);
				cxt.closePath();
				cxt.fill();
			}
		}
	}
};