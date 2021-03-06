var queryURL = "https://api.traitify.com/v1/assessments";

Traitify.setHost("https://api.traitify.com");
Traitify.setPublicKey("00ab5e14b27740a08449fdf7ca441885");


$('#questionBtn').on("click", function () {
    window.location = './questions.html';
});


var lastTest = localStorage.getItem("Test_ID");
if (lastTest) {
    renderQuiz(lastTest);
} else {
    $.ajax({
        url: queryURL,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa("17330cfb2aff43ce8e99dd4889736e0b:x"));
        },
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        processData: false,
        data: '{ "deck_id": "career-deck" }',
    })
        .then(function (response) {
            localStorage.setItem("Test_ID", response.id);
            renderQuiz(response.id)
        });
}
function renderQuiz(testID) {
    assessment = Traitify.ui.component();
    assessment.assessmentID(testID);
    assessment.target(".traitify");
    assessment.render()
    assessment.on("Results.Initialized", function () {
        $("#resultsBtn").removeClass("uk-hidden").css({
            "margin-left": "1132px",
            "background": "red",
            "font-weight": "1000px"
        });
        localStorage.setItem("Check", true);
    });
}

function checkIfComplete() {
    if (localStorage.getItem("Check")) {
        $("#resultsBtn").removeClass("uk-hidden").css({
            "margin-left": "1132px",
            "background": "red",
            "font-weight": "1000px"
        });
    }
}
checkIfComplete();
$("#resultsBtn").on('click', function () {
    window.location = "./results.html";
})