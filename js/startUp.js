var trustData = [];
var overView;
var countryIndex;
var topicIndex;

var loaded = false;

$(function () {

    getData("TempJSON/TypedDataSet.Json", function() {
        fillData(function() {
            doneloading();
            //getUserCountry(false);
        }); 
    }); 
    setupDevButtons();
    styleWelcomePage();
});

/* "data": object which cotains the resulting data from the get request*/
function getData(url, _callback1){
    $.getJSON(url, function (data) {
        trustData = data.value;
        overView = sortData();
        countryIndex = getCountryIndex();
        topicIndex = geTopicIndex()

        _callback1();
    });
}



function doneloading(){
    $(".loading").css("display", "none");
    $("#startScreen").css("display", "block");
    Console.Log(overview);
}
