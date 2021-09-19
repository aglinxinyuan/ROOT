let login_form = $("#login_form");




function handleLoginResult(resultDataString) {
    let resultDataJson = JSON.parse(resultDataString);
    if (resultDataJson["status"] === "success") window.location.replace("../main.html");
    else $("#login_error_message").html(resultDataJson["message"]);
}

function submitLoginForm(formSubmitEvent) {
    formSubmitEvent.preventDefault();
    $.ajax(
        "api", {
            method: "POST",
            data: login_form.serialize(),
            success: handleLoginResult
        }
    );
}

login_form.submit(submitLoginForm);













