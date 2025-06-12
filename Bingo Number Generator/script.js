var numberArray = new Array();
var pickedNumberArray = new Array();
var lock = false;
function init() {
	initNumberArray();
	createNumbers();
	// First try to load from local storage
	if(localStorage.getItem("numberArray") != null){									
		restoreVariables();
		glowNumbers();
	}
	
}

function storeVariables(){
	localStorage.setItem("numberArray", JSON.stringify(numberArray));
	localStorage.setItem("pickedNumberArray", JSON.stringify(pickedNumberArray));
}

function restoreVariables(){
	numberArray = JSON.parse(localStorage.getItem("numberArray"));
	pickedNumberArray = JSON.parse(localStorage.getItem("pickedNumberArray"));
}


function createNumbers(){

	var numbersTableDiv = document.getElementById("numbersTableDiv");
	var tableHTML = "<table id=\"numbersTable\">";
	var cellIndex = 1;
	for (var i=0;i<6;i++)
	{ 
		tableHTML = tableHTML + "<tr>";
		for (var j=0;j<15;j++)
		{
			tableHTML = tableHTML + "<td id=\"cell" + cellIndex + "\">" + cellIndex + "</td>";
			cellIndex = cellIndex + 1;
		}
		tableHTML = tableHTML + "</tr>";
	}
	tableHTML = tableHTML + "</table>";

	numbersTableDiv.innerHTML = tableHTML;
}

function initNumberArray(){
	for (var i=0;i<90;i++) { 
		numberArray[i] = i+1;
	}
}


function pickARandomNumber(){ 
    if(!lock){
    lock = true;
    // Initial setup
    randomNumber = $('#randomNumber');
    var randomIndex;
    // Animate
    animationTimer = setInterval(function() {
	    randomIndex = Math.floor(Math.random() * numberArray.length);
	    if(numberArray.length == 0) {
		randomNumber.html('THE&nbsp;END') ;
	    } else {
		randomNumber.text('' + numberArray[randomIndex]) ;
	    }
        }, 20);
    // Set timeout to stop random counter
    setTimeout(function(){
	clearInterval(animationTimer)
	updateArrays(randomIndex);
	lock = false;				
	},3000);
    }
		
}

function glowNumbers(){
	for(var i=0;i<pickedNumberArray.length;i++){
		var cell = document.getElementById("cell" + pickedNumberArray[i]);
		cell.className = cell.className + " glowingText";
	}
}

function updateArrays(pickedIndex){
	pickedNumberArray.push(numberArray[pickedIndex]); 
	numberArray.splice(pickedIndex,1);
	storeVariables();
	glowNumbers();
}

$(document).keydown(function(event) {
	 if ( event.keyCode == 13) {
		event.preventDefault();
		pickARandomNumber();
	 } else if ( event.keyCode == 27) {
		event.preventDefault();
		askForRestart();
	 }
});

function askForRestart() {
	if(confirm('Do you want to reset the number?')){
		localStorage.clear();
		location.reload();
	}
}
