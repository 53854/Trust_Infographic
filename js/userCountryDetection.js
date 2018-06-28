/* Getting the users location by IP, from "http://ip-api.com/" */

var userCountry;
var userInput = 50;

var currentCountry = "L008691";
var currentTopic = "OtherPeople_1";

function getUserCountry(action) {

    $.getJSON('http://ip-api.com/json?callback=?', function (data) {
        var location = JSON.parse(JSON.stringify(data));

        userCountry = getCompareCountry(location.country);
        currentCountry = userCountry.key;
        if (action) {
            showUserCountry(userCountry);
        }
    });

}


function getCompareCountry(userOrigin) {

    var compareCountry = {};

    $.each(countryIndex, function (key, country) {

        if (country.includes(userOrigin)) {

            compareCountry["name"] = country;
            compareCountry["key"] = key;
        }

        var possibleCompare = getLatestAverageScoreOfTopicByCountry(key, currentTopic)

        if (possibleCompare > 0) {

            /* checking for whitespaces in names "replacing them" with nothing in order to get Continious IDs*/
            var newBtnID = country.replace(/ /g,"")

            var newBtn = "<p id='" + newBtnID + "Btn'>" + country + "</p>";
            $("#compareCountryList").append(newBtn);

            $("#" + country + "Btn").click(function () {
                showComapre(key, country, userInput);
                $(".compareScoreTextGrp #compareBaitIntro").text("You trust otherst others about");
            });
        }

    })
    return compareCountry;
}

function showUserCountry(origin) {


    $("#compareToYourCountry").css("display", "block");

    $('html, body').animate({
        scrollTop: $("#compareToYourCountry").offset().top
    }, 1500);

    $("body").css("overflow", "hidden");

    showComapre(origin.key, origin.name, userInput);

}


function showComapre(compareKey, compareName, userInput) {

    var compareScore = getLatestAverageScoreOfTopicByCountry(compareKey, currentTopic) * 10;

    var differecne = 0;

    if (compareScore < userInput) {
        differecne = 100 - Math.round(compareScore / userInput * 100 * 100) / 100;
    } else if (compareScore > userInput) {
        differecne = 100 - Math.round(userInput / compareScore * 100 * 100) / 100;
    }

    $("#differencePerCent").text(differecne.toFixed(2) + "%");
    $("#compareBaitIntro").css("display", "block");
    $("#comapreBaitTetxt").css("display", "block");

    if(differecne < 0.1){
        $("#compareBaitIntro").css("display", "none");
        $("#differencePerCent").html("You seem to trust others " + "<br>" + "just as much as people in " + compareName);
        $("#comapreBaitTetxt").css("display", "none");
    }
    else if (compareScore < userInput) {
        $("#comapreBaitTetxt").text("more than the averege in " + compareName);
    } else {
        $("#comapreBaitTetxt").text("less than the averege in " + compareName);
    }

    $(".userOriginBar rect").animate({width: compareScore + "%"}, 1500, "swing");
    $(".userOriginBar .name").text(compareName);
    $(".compareScoreTextGrp #originScore").text(compareScore + "%");
    $(".compareScoreTextGrp #originScore").attr("x", compareScore + "%");
    $(".userInputBar rect").animate({width: userInput + "%"}, 1000, "swing");
    $(".compareScoreTextGrp #userScore").text(userInput + "%");
    $(".compareScoreTextGrp #userScore").attr("x", userInput + "%");

}