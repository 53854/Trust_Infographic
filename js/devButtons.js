function setupDevButtons(){

    $("#logDataSetBtn").click(function () {
        console.log(trustData);
    });
    $("#logDataProperties").click(function () {
        getDataInfo();
    });
    $("#logCountryInfoBtn").click(function () {
        getCountriesInfo();
    });
    $("#logPersonalCharbtn").click(function () {
        getCharacteristicsInfo();
    });
    $("#logCategoriesBtn").click(function () {
        getCategoryInfo();;
    });
    $("#logSortedDataBtn").click(function () {
        console.log(overView);
    });
    $("#logSortedTopicsBtn").click(function () {
        console.log(topicIndex);
    })
    $("#toggleDevStuffBtn").click(function () {
        toggleDevStuff();
        console.log("toggled Dev stuff");
    });

    $("#trustMeBtn").click(function () {
        fillData(function() {
            console.log("good decision");
        });
        $("#startScreen").css("display", "none");
        $(".content").css("display", "block");
        $("#welcome").css("display", "block");
    });

    /* sneaky dev button toggle (german umlaut "ü")*/
    $(document).keypress(function(key) {
        if(key.which == 252) {
            toggleDevStuff();
        }
        else{ console.log(key.which) }
    });

}

function toggleDevStuff(){
    if ( $(".devButtons").css("display") == "none"){
        $(".devButtons").css("display", "inline-block");
    } 
    else {
        $(".devButtons").css("display", "none");
    }
}


function getDataInfo(){
    $.getJSON("TempJSON/DataProperties.Json", function (data) {
        console.log(data.value)
    });
}

function getCountriesInfo(){
    $.getJSON("TempJSON/Countries", function (data) {
        console.log(data.value)
    });
}

function getCharacteristicsInfo(){
    $.getJSON("TempJSON/PersonalCharacteristics", function (data) {
        console.log(data.value)
    });
}

function getCategoryInfo(){
    $.getJSON("TempJSON/CategoryGroups", function (data) {
        console.log(data.value)
    });
}