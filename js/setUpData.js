/* Sorted in keys, still to be translated*/
/* Sorted by Country -> Years -> Topics*/
function sortData() {

    var sortedData = {};

    $.getJSON("http://opendata.cbs.nl/ODataApi/odata/80518ENG/Countries", function (data) {

        $.each(data.value, function (index, country) {

            sortedData[country.Key] = getPeriods();

        })
    });

    return sortedData;
}

function getPeriods() {

    var periods = [];

    $.getJSON("http://opendata.cbs.nl/ODataApi/odata/80518ENG/Periods", function (data) {

        $.each(data.value, function (index, period) {

            var year = {};
            year[period.Key] = getTopics();

            periods.push(year);

        })
    });

    return periods;
}


function getTopics() {

    var topics = {};

    $.getJSON("https://opendata.cbs.nl/ODataApi/odata/80518ENG/DataProperties", function (data) {

        $.each(data.value, function (index, topic) {

            if (topic.Type == "Topic") {
                topics[topic.Key] = [];
            }

        })
    });

    return topics;

}

function getTopicScores(topic) {

    $.each(trustData, function (index, value) {

        var score = value[topic];

        if (score != null) {
            if (overView[value.Countries]) {

                $.each(overView[value.Countries], function (index, period) {

                    if (period[value.Periods]) {

                        $.each(period[value.Periods], function (key, scores) {

                            if (key == topic) {
                                this.push(score);
                            }

                        });

                    }
                });

            }

        }

    })
}


function fillData(_callback2) {

    $.getJSON("https://opendata.cbs.nl/ODataApi/odata/80518ENG/DataProperties", function (data) {

        $.each(data.value, function (index, topic) {

            if (topic.Type == "Topic") {
                getTopicScores(topic.Key);
            }

        })

        _callback2();
    });


}

function getCountryIndex() {

    var countryIndex = {};

    $.getJSON("http://opendata.cbs.nl/ODataApi/odata/80518ENG/Countries", function (data) {

        $.each(data.value, function (index, country) {

            countryIndex[country.Key] = country.Title;

        })
    });

    return countryIndex;
}


function geTopicIndex() {

    var topicIndex = {};

    $.getJSON("https://opendata.cbs.nl/ODataApi/odata/80518ENG/DataProperties", function (data) {

        $.each(data.value, function (index, topic) {

            if(topic.Type == "Topic" && topic.ParentID == 3){
                topicIndex[topic.Key] = topic.Title;
            }
            
        })
    });

    return topicIndex;
}