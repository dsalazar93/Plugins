// var player;
// var add;
// var addDos;

// function onYouTubeIframeAPIReady(){
// 	player =new YT.Player('playerPlace',{
// 		width: '500',
// 		height:'300',
// 		videoId: 'G6B85EhAXqE',
// 		playerVars:{
// 			'autoplay':1,
// 			'controls':1,
// 			'disablekb':1,
// 			'modestbranding':1,
// 			'rel':0,
// 			'showinfo':0
// 		},

// 	events:{
// 		'onStateChange': onStateChangehome,
// 		'onPlaybackQualityChange' : onPlaybackQualityChangehome
// 	}

// 	});
// }
// function onStateChangehome(events){

// 	if(events.data == 1){
// 		add = setTimeout(textoDos , 5000);
// 		addDos = setTimeout(textoTres , 4000);




// 	}

// 	if(events.data == 2){
// 		clearTimeout(add);
// 		clearTimeout(addDos);
// 	}


// }

// function onPlaybackQualityChangehome(events){

// 	player.setPlaybackQuality('hd720');

// 	if(events.data == "small"){
// 		console.log('es pequeño');
// 	}
// }



// function textoDos(){
// 	$("#dos").html('hola soy el tiempo 10000');
// 	// $("#uno").addClass("desaperecer");

// }

// function textoTres(){
// 	$("#uno").html('hola soy');
// 	// $("#uno").addClass("desaperecer");

// }


// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
var videotime = 0;
function onYouTubeIframeAPIReady() {
	player = new YT.Player('player', {
		height: '390',
		width: '640',
		videoId: 'M7lc1UVf-VE',
		events: {
			'onReady': onPlayerReady,
			'onStateChange': onPlayerStateChange
		}
	});
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
	event.target.playVideo();
	function updateTime() {
		var oldTime = videotime;
		if(player && player.getCurrentTime) {
			videotime = player.getCurrentTime();

			console.log(videotime);
			document.getElementById("time").innerHTML = videotime;
		}
		if(videotime !== oldTime) {
			onProgress(videotime);
		}
	}
	timeupdater = setInterval(updateTime, 100);
}

// when the time changes, this will be called. 
function onProgress(currentTime) {
	if(currentTime > 20) {
		console.log("the video reached 20 seconds!");
	}
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
    
    
var done = false;
function onPlayerStateChange(event) {

	if (event.data == YT.PlayerState.PLAYING && !done) {
		add = setTimeout(TextoAdd, 10000);
		addDos = setTimeout(TextoAddDos, 20000);
		done = true;
	}
	
	if(event.data == 1){
		// add = setTimeout(TextoAdd, 10000);
		// addDos = setTimeout(TextoAddDos, 20000);
	}

	if(event.data == 2){
		clearTimeout(add);
		clearTimeout(addDos);
	}
}

function TextoAdd() {
	$( "#lnt-add-text" ).append( "<p>texto 1</p>" );
}

function TextoAddDos() {
	$( "#lnt-add-text" ).append( "<p>texto 2</p>" );
}