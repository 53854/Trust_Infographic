
function getAverageScore(topicArr){
    
    var averageScore = 0;
    var counter = 0;

    $.each(topicArr, function (index, value){

        averageScore += value;
        counter += 1;

    })

    averageScore /= counter;

    averageScore = Math.round( averageScore * 10) / 10;

    return averageScore;

}

/* Gets the 2014 average score for a specific topic for a specific country*/
function getLatestAverageScoreOfTopicByCountry(countryKey, topicKey){

    var latestAvgScore = 0;

    var year = "2014JJ00"

    $.each(overView[countryKey], function(index, period){

        if(period[year]){

            $.each(period[year], function(key, scores){

                if(key == topicKey){
                    
                    latestAvgScore = getAverageScore(this);
                    
                }

            });
    
        }
    });

    return latestAvgScore;

}



