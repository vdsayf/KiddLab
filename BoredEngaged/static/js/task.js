// 3 questions
// 10000 people
// $.67
// 1min

var psiTurk = new PsiTurk(uniqueId, adServerLoc, mode);
var currentview;

psiTurk.preloadPages(["screen1Tester.html", "screen2xo.html", "screen2vowels.html", "videoScreen1.html", "videoScreen2.html", "interesting.html", "answerPage.html", "screen6Tester.html" , "thanks.html"]);

//psiturk.preloadImages(imagelist)
//psiturk.finishInstructions()
var wholeTime = "wholeTime";
var tasktime = "tasktime";
var interest = "interest";
var enjoy = "enjoy";
var age = "age";
var gender = "gender";
var race = "race";
var racetext = "racetext";
var ethnicity = "ethnicity";
var problem = "problem";
var ladder = "ladder";
var language = "language";
var languagetext = "languagetext";
var fluenttwo = "fluenttwo";
var oneFirst = true;
var invisibleResponse = "";
var animalResponse = "";

var startWhole;
var endWhole;

var screenone = function()
{

psiTurk.showPage("screen1Tester.html");
    
 if (Math.floor(Math.random() * (2)) == 1){
 	oneFirst = false;
 	document.getElementById("prompt1").style.display = "none";
 } else {
 	document.getElementById("prompt3").style.display = "none";
 }
 //condition = 0;

    $("#next").click(function()
    {
        if (condition == 0){
            currentview = new screenVideo1();
        } else if (condition == 1){
        	currentview = new screenVideo2();
        } else if (condition == 2) {
            currentview = new screenOX();
        } else {
            currentview = new screenVowels();
        }
    });

};

var screenVideo1 = function (){

    psiTurk.showPage("videoScreen1.html")
    //short video
    var start = Date.now();
    var end;
    $("#next").click(function()
    {
    	end = Date.now();
    	duration = end-start
    	if ( duration > 287000) {
        // if (duration > 2000) {
        //SHOULD BE 287000

    		$("#error").animate({opacity: 0});
    		currentview = new screenInteresting();

    	} else {

    		$("#error").animate({opacity: 1}, 500);

    	}
    });
}

var screenVideo2 = function (){

    psiTurk.showPage("videoScreen2.html")
    //long video
    var start = Date.now();
    var end;
    $("#next").click(function()
    {
    	end = Date.now();
    	duration = end-start
    	if ( duration > 322000) { //5:22 timer
    		// SHOULD BE 322000
    		$("#error").animate({opacity: 0});
    		currentview = new screenInteresting();

    	} else {

    		$("#error").animate({opacity: 1}, 500);

    	}
    });
}

var screenInteresting = function(){
	psiTurk.showPage("interesting.html")

	$("#next").click(function()
    {   
        if (!$('[name="interest"]:checked').val() || !$('[name="enjoy"]:checked').val()){
            $("#error").animate({opacity: 1}, 500);
        } else {
            $("#error").animate({opacity: 0}, 500);
            interest = $('[name="interest"]:checked').val();
            enjoy = $('[name="enjoy"]:checked').val();
            currentview = new screenAnswer();
        }
    });
}

var screenVowels = function (){

    psiTurk.showPage("screen2vowels.html");


    var elements = [];
    var paragraph = "While the manufacture of rubber goods is in no sense a secret industry, the majority of buyers and users of such goods have never stepped inside of a rubber mill, and many have very crude ideas as to how the goods are made up. In ordinary garden hose, for instance, the process is as follows: The inner tubing is made of a strip of rubber fifty feet in length, which is laid on a long zinc-covered table and its edges drawn together over a hose pole. The cover, which is of what is called “friction,” that is cloth with rubber forced through its meshes, comes to the hose maker in strips, cut on the bias, which are wound around the outside of the tube and adhere tightly to it. The hose pole is then put in something like a fifty foot lathe, and while the pole revolves slowly, it is tightly wrapped with strips of cloth, in order that it may not get out of shape while undergoing the process of vulcanizing. When a number of these hose poles have been covered in this way they are laid in a pan set on trucks and are then run into a long boiler, shut in, and live steam is turned on. When the goods are cured steam is blown off, the vulcanizer opened and the cloths are removed. The hose is then slipped off the pole by forcing air from a compressor between the rubber and the hose pole."
    var words = paragraph.split(" ");
    var storeWord;

    for (i = 0; i < words.length; i++){
        if (i%15 ==0){
            elements += "<br>";
        }
        storeWord =  words[i];
        elements += "<button type = \"button\" class = \"wordButton\" onClick = \"vowelClick(this)\" id = '" + i + "'>" + storeWord + "</button>";
        elements += " ";
        
    }

    document.getElementById("wordpuzzle").innerHTML = "<div>" + elements + "</div>";
    document.getElementById("next").style.display = "none";

    var start = Date.now();
    var end;

    $("#next").click(function()
    {
    	end = Date.now();
    	tasktime = end-start
        currentview = new screenAnswer();
    });

};


var screenOX = function (){

    psiTurk.showPage("screen2xo.html");


    var elements = [];
    var storeXO;

    for (i = 0; i < 250; i++){
        if (i%25 ==0){
            elements += "<br>";
        }

        var random = Math.floor(Math.random() * (2)); 

        if (random == 1){
            storeXO = "X";
        } else {
            storeXO = "O";
        }
        random = Math.floor(Math.random() * (2));

        elements += "<button type = \"button\" class = \"buttonClass\" onClick = \"XOclick(this)\" id = '" + i + "'>" + storeXO + "</button>";
    }

    document.getElementById("xopuzzle").innerHTML = "<div>" + elements + "</div>";
    document.getElementById("next").style.display = "none";
    var start = Date.now();
    var end;

    $("#next").click(function()
    {
    	end = Date.now();
    	tasktime = end-start
        currentview = new screenAnswer();
    });

};

var screenAnswer = function(){

	psiTurk.showPage("answerPage.html");

    var bothFilled = false;

	if (oneFirst){
		document.getElementById("prompt3").style.display = "none";
	} else {
		document.getElementById("prompt1").style.display = "none";
	}


	$("#next").click(function()
    {
        if (oneFirst){
            if ($.trim($("#animal1").val()) &&
                $.trim($("#invisible2").val())) {
                bothFilled = true;
            }
        } else {

            if ($.trim($("#invisible2").val()) &&
                $.trim($("#animal3").val())) {

                bothFilled = true;
            }
        }

    	if (!bothFilled) {
            $("#error").animate({opacity: 1}, 500);

    	} else {
            invisibleResponse = $("#invisible2").val().replace(/,/g, '');
            if (oneFirst){
                animalResponse = $("#animal1").val().replace(/,/g, '');
            } else {
                animalResponse = $("#animal3").val().replace(/,/g, '');
            }

            $("#error").animate({opacity: 0});
            currentview = new screensix();
    	}
    });

};

var screensix = function()
{
    psiTurk.showPage("screen6Tester.html");
    //demographics

    $("#next").click(function()
    {
    	endWhole = Date.now();
    	wholeTime = endWhole - startWhole;
        age = $("#age").val();
        gender = $('[name="gender"]:checked').val();
        race = $('[name="race"]:checked').val();
        racetext = $("#racetext").val();        
        ethnicity = $('[name="ethnicity"]:checked').val();
        problem = $('[name="problem"]:checked').val();
        ladder = $('[name="ladder"]:checked').val();
        language = $('[name="language"]:checked').val();
        languagetext = $("#languagetext").val();
        fluenttwo = $('[name="fluenttwo"]:checked').val();


        psiTurk.recordTrialData([wholeTime, condition, tasktime, interest, enjoy, gender, age, language, languagetext, fluenttwo, ladder, problem, race, racetext, ethnicity, animalResponse, invisibleResponse]);

                psiTurk.saveData(
                {
                    success: function()
                    {
                        psiTurk.completeHIT();
                        psiTurk.showPage('thanks.html');
                    }
                });
    });
};

$(window).on("load", (function()
{
    $.ajax(
    {
        success: function()
        {
            currentview = new screenone();
            startWhole = Date.now();
        }
    });
}));