function styleWelcomePage() {

    var trustSlider = document.getElementById("userTrustSilderWelcome");
    var userTrustInput = document.getElementById("userTrustInput");
    userTrustInput.innerHTML = trustSlider.value + "%";

    trustSlider.oninput = function () {

        userTrustInput.innerHTML = this.value + "%";
        userInput = this.value;
    }

    $("#userBaitBTN").click(function () {
        getUserCountry(true);
    });

}


function thinkAgainCompare() {

    $('html, body').animate({
        scrollTop: $("#welcome").offset().top
    }, 2000);
}


function showMoreInfo(){

    $("#moreStats").css("display", "block");

    $('html, body').animate({
        scrollTop: $("#moreStats").offset().top
    }, 1000);

    generateSelectionList();
    generateTopicSelection();
    updateTrustOverYearsChart(currentCountry, currentTopic);
    updateTrustOverYearsGraph(currentCountry, currentTopic);
}