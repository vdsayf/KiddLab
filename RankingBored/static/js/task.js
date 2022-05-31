var psiTurk = new PsiTurk(uniqueId, adServerLoc, mode);
var currentview;

psiTurk.preloadPages(["introScreen.html", "preRank.html", "ranking.html", "demographics.html", "thanks.html"]);

var data;
var startWhole;
var endWhole;
var rate1;
var rate2;
var rate3;
var rate4;
var rate5;
var turtle;
var unicorn;
var lion;
var cat;
var spider;

var samp1;
var samp2;
var samp3;
var samp4;
var samp5;

var sampArray;
var lowestFive;

var passTest;

//demographic stuff
var gender = "NA";
var age = "NA";
var race = "NA";
var racetext = "NA";
var ethnicity = "NA";
var language = "NA";
var languagetext = "NA";
var fluenttwo = "NA";


//Class for sampling
//this really helps
class Samp {
    constructor(id, ani, inv){
        this.id = id
        this.ani = ani
        this.inv = inv
    }
}

//Shuffles array
function shuffleArray(array) 
{
    for (var i = array.length - 1; i > 0; i--) 
    {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

//arrays for looping for divs in HTML
var ansArray = ["ans1","ans2","ans3","ans4","ans5"]
var rankArray = ["rank1","rank2","rank3","rank4","rank5"]

condition = 0
var introScreen = function(){
    psiTurk.showPage("introScreen.html");
    //going through data to see the entries that were rated the fewest times
    //so we don't get entries with no ratings
    //bottom 5 stored in arrayBottom
    //condition + 4 is the csv array count we will look at

    shuffleArray(data)
//shuffling for randomness
    /* YOYO
    console.log("YOYO", condition)
    YOYO
    */
    data.sort(comparingColumn)
//sorting to get least used ones
//we shuffle then sort just in case every sample has the same count
    function comparingColumn(a, b) {

        if (a[condition + 4] === b[condition + 4]) {

            return 0;
            
        } else {

            return (a[condition + 4] - b[condition + 4]);
        }
    }

    //taking least rated 5

    samp1 = new Samp(data[0][1], data[0][2], data[0][3])
    samp2 = new Samp(data[1][1], data[1][2], data[1][3])
    samp3 = new Samp(data[2][1], data[2][2], data[2][3])
    samp4 = new Samp(data[3][1], data[3][2], data[3][3])
    samp5 = new Samp(data[4][1], data[4][2], data[4][3])

    /* YOYO
    console.log("HERE IS AFTER", "\n", data[0][0], data[1][0], data[2][0], data[3][0], data[4][0])
    console.log("HERE IS AFTER", "\n", data[0], data[1], data[2], data[3], data[4])

    //YOYO
    */



    sampArray = [samp1, samp2, samp3, samp4, samp5]
    shuffleArray(sampArray);

    $("#next").click(function()
    {
        currentview = new preRank();
    });

}

var preRank = function(){

    var pre1 = new Samp("turtle","It looks like an mountain range but it is actually a massive turtle. Most of its body is underground and feeds on magma heat.",null)
    var pre2 = new Samp("unicorn","It is a unicorn that has a white horn and its fur sparkles. It has black hooves and and a long tail and mane.",null)
    var pre3 = new Samp("lion","A lion that has green feathers instead of fur. It has insect wings and six insect legs.",null)
    var pre4 = new Samp("cat","A cat with black and brown patches on its fur and a fluffy tail, and one beige paw. It has a collar.",null)
    var pre5 = new Samp("spider","A spider that can spin webs and catch flies with its web. It can crawl up walls and lower itself down to the ground.",null)

    preArray = [pre1, pre2, pre3, pre4, pre5]

    shuffleArray(preArray)

    psiTurk.showPage("preRank.html");

    for (i = 0; i < 5; i++){
        document.getElementById(ansArray[i]).innerHTML = preArray[i].ani;
    }

    var ready = false;
    var checkErr = function(){	
    for (i = 0; i < 5; i++){

        if (!document.getElementById(rankArray[i]).value){ //checks if value
            return false
        }
        if (document.getElementById(rankArray[i]).value < 1){ //checks if value <1
            return false
        }
        if (document.getElementById(rankArray[i]).value > 5){ //checks if value >5
            return false
        }
        for (j = i+1; j < 5; j++){ //checks if any 2 values are same
            if (document.getElementById(rankArray[i]).value == document.getElementById(rankArray[j]).value){
                return false
            }
        }
    }
    return true
}

$("#next").click(function()
{
    ready = checkErr()
    if (ready) {
        $("#error").animate({opacity: 0});
        //check if spider or cat answer is above 4
        for (i = 0; i < 5; i++){
            preArray[i].inv = document.getElementById(rankArray[i]).value
        }
        turtle = pre1.inv
        unicorn = pre2.inv
        lion = pre3.inv
        cat = pre4.inv
        spider = pre5.inv

        if (pre4.inv < 3 || pre5.inv < 3){
            passTest = "false"
        } else {
            passTest = "true"
        }
        currentview = rankAns();
    } else {
        $("#error").animate({opacity: 1}, 500);
    }
});

}

var rankAns = function(){

    psiTurk.showPage("ranking.html");
    //choosing which prompt to show\
    //condition 0 is animal
    //condition 1 is invisible
    //you can set more conditions
    if (condition == 0){
        document.getElementById("invPrompt").style.display = "none";
    } else {
        document.getElementById("aniPrompt").style.display = "none";
    }
    //filling html with corresponding answers
    if (condition == 0){
        for (i = 0; i < 5; i++){
            document.getElementById(ansArray[i]).innerHTML = sampArray[i].ani;
        }
    } else {
        for (i = 0; i < 5; i++){
            document.getElementById(ansArray[i]).innerHTML = sampArray[i].inv;
        }
    }


var ready = false;
var checkErr = function(){
    for (i = 0; i < 5; i++){

        if (!document.getElementById(rankArray[i]).value){ //checks if value
            return false
        }
        if (document.getElementById(rankArray[i]).value < 1){ //checks if value <1
            return false
        }
        if (document.getElementById(rankArray[i]).value > 5){ //checks if value >5
            return false
        }
        for (j = i+1; j < 5; j++){ //checks if any 2 values are same
            if (document.getElementById(rankArray[i]).value == document.getElementById(rankArray[j]).value){
                return false
            }
        }
    }
    return true
}

$("#next").click(function()
{
    ready = checkErr()
    if (ready) {
        $("#error").animate({opacity: 0});
        rate1 = document.getElementById(rankArray[0]).value
        rate2 = document.getElementById(rankArray[1]).value
        rate3 = document.getElementById(rankArray[2]).value
        rate4 = document.getElementById(rankArray[3]).value
        rate5 = document.getElementById(rankArray[4]).value

        currentview = demographic();
    } else {
        $("#error").animate({opacity: 1}, 500);
    }
});

}

var demographic = function()
{
    psiTurk.showPage("demographics.html");
    //demographics

    $("#next").click(function()
    {



    	endWhole = Date.now();
    	wholeTime = endWhole - startWhole;
        gender = $('[name="gender"]:checked').val();
        age = $("#age").val();

        var checkArray = [];
        //For race checkboxes

        $('#checkboxes input:checked').each(function() {
        	checkArray.push($(this).attr('value'));
        });
        if (checkArray.length > 0) {
        	race = checkArray.join(' ');
        }
        racetext = $("#racetext").val();        
        ethnicity = $('[name="ethnicity"]:checked').val();
        language = $('[name="language"]:checked').val();
        languagetext = $("#languagetext").val();
        fluenttwo = $('[name="fluenttwo"]:checked').val();

        psiTurk.recordTrialData([wholeTime, condition, passTest, gender, age, race, racetext, ethnicity, language, languagetext, fluenttwo,
            samp1.id, rate1, 
            samp2.id, rate2, 
            samp3.id, rate3, 
            samp4.id, rate4, 
            samp5.id, rate5]);

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
        url: "counts.csv", 
        success: function(file_content) 
        {
            data = $.csv.toArrays(file_content);
            console.log(data);
            currentview = introScreen();
            startWhole = Date.now();
        }
    });
}));