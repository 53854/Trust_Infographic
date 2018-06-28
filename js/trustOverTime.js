function generateSelectionList() {

    $.each(countryIndex, function (key, country) {

        /* testCheck to filter non answerd regions*/
        var possibleCompare = getLatestAverageScoreOfTopicByCountry(key, "OtherPeople_1");

        if (possibleCompare > 0) {

            /* checking for whitespaces in names "replacing them" with nothing in order to get Continious IDs*/
            var newBtnID = country.replace(/ /g, "") + "Info";

            var newBtn = "<p id='" + newBtnID + "Btn'>" + country + "</p>";
            $("#trustCountryList").append(newBtn);

            $("#" + newBtnID + "Btn").click(function () {
                updateTrustOverYearsChart(key, currentTopic);
                updateTrustOverYearsGraph(key, currentTopic);
                currentCountry = key;
            });
        }
    });
}

function generateTopicSelection() {

    $.each(topicIndex, function (key, topic) {


        var newBtnID = topic.replace(/ /g, "") + "Info";

        var newBtn = "<p id='" + newBtnID + "Btn'>" + topic + "</p>";
        $("#trustTopicList").append(newBtn);

        $("#" + newBtnID + "Btn").click(function () {
            updateTrustOverYearsChart(currentCountry, key);
            updateTrustOverYearsGraph(currentCountry, key);
            currentTopic = key;
        });

    });
}


function updateTrustOverYearsChart(countryKey, topicKey) {

    $("#timeTopicText").html("How much did the average person in " + countryIndex[countryKey] + " trust " + topicIndex[topicKey]);

    $("#timeTable").html("<tr><th>Year</th><th>Average answer</th></tr>");

    var trustIN = topicIndex[topicKey];

    var attachStr = "<tr>";

    $.each(overView[countryKey], function (index, object) {

        /* Workaround for sorted overview construction*/
        var year = Object.keys(object)[0].slice(0, 4);

        attachStr += "<td>" + year + "</td>";

        $.each(object, function (index, period) {

            $.each(period, function (topic, scoreArray) {

                if (topic == topicKey) {

                    var topicScore = getAverageScore(scoreArray) * 10;

                    if (isNaN(topicScore)) {
                        attachStr += "<td>" + " No collected data" + "</td></tr><tr>";
                    } else {
                        attachStr += "<td>" + topicScore + "%" + "</td></tr><tr>";
                    }

                }

            });

        });

    });

    attachStr += "</tr>";

    var chartStr = attachStr.slice(0, -4);
    $("#timeTable").append(chartStr);


}


function updateTrustOverYearsGraph(countryKey, topicKey) {

    $("#timeTopicText").html("How much did the average person in " + countryIndex[countryKey] + " trust " + topicIndex[topicKey]);

    $("#timeTable").html("<tr><th>Year</th><th>Average answer</th></tr>");

    $.each(overView[countryKey], function (index, object) {

        /* Workaround for sorted overview construction*/
        var year = Object.keys(object)[0].slice(0, 4);

        $.each(object, function (index, period) {

            $.each(period, function (topic, scoreArray) {

                if (topic == topicKey) {

                    var topicScore = getAverageScore(scoreArray) * 10;

                    if (isNaN(topicScore)) {
                        topicScore = 0;
                    }

                    $(".y" + year +" rect").animate({width: topicScore * 0.9 + "%"}, 1000, "swing");
                    $(".y" + year +" .year").text(year + ": ");
                    $(".infoTextGrp #text" +year).attr("x", topicScore * 0.6 + "%");
                    $(".infoTextGrp #text" +year).text(topicScore + "%");

                }

            });

        });

    });

}

function switchGraphs(){

    if ( $("#overTimeData").css("display") == "none"){
        updateTrustOverYearsChart(currentCountry, currentTopic);
        $("#overTimeGraph").css("display", "none");
        $("#overTimeData").css("display", "block");
    } 
    else {
        updateTrustOverYearsGraph(currentCountry, currentTopic);
        $("#overTimeGraph").css("display", "block");
        $("#overTimeData").css("display", "none");
    }

}

    