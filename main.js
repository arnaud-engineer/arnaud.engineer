document.addEventListener("DOMContentLoaded", function(event) { 

  	document.getElementById("button1").onclick = function(){
		var a = document.getElementById('iframepage');
		document.getElementById('iframepage').src = "cv.html";
	};
	document.getElementById("button2").onclick = function(){
		document.getElementById('iframepage').src = "contact.html";
	};

});