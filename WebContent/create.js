let currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(n) {
    const x = document.getElementsByClassName("tab");
    x[n].style.display = "block";
}

function nextPrev(n) {
    // This function will figure out which tab to display
    const x = document.getElementsByClassName("tab");
    // Exit the function if any field in the current tab is invalid:
    if (n === 1 && !validateForm()) return false;
    // Hide the current tab:
    x[currentTab].style.display = "none";
    // Increase or decrease the current tab by 1:
    currentTab = currentTab + n;
    // if you have reached the end of the form...
    if (currentTab >= x.length) {
        // ... the form gets submitted:
        document.getElementById("createEvent_form").submit();
        return false;
    }
    // Otherwise, display the correct tab:
    showTab(currentTab);
}






let createEvent_form = $("#createEvent_form");


function handleEventResult(resultData) {
    $("#evenTitle").text(resultData['evenTitle'])
    $("#eventDescription").text(resultData['eventDescription'])
    $("#eventLocation").text(resultData['eventLocation'])
    $("#eventDate").text(resultData['eventDate'])
}


function submitEventForm(formSubmitEvent) {
    formSubmitEvent.preventDefault();
    $.ajax(
        "api/login", {
            method: "POST",
            data: createEvent_form.serialize(),
            success: handleEventResult
        }
    );
}

createEvent_form.submit(submitEventForm);









$(function(){
    $("#fileupload1").change(function(event) {
        let var1 = URL.createObjectURL(event.target.files[0]);
        $("#upload-img1").attr("src",var1);
        console.log(event);
    });

    $("#fileupload2").change(function(event) {
        let var2 = URL.createObjectURL(event.target.files[0]);
        $("#upload-img2").attr("src",var2);
        console.log(event);
    });

    $("#fileupload3").change(function(event) {
        let var3 = URL.createObjectURL(event.target.files[0]);
        $("#upload-img3").attr("src",var3);
        console.log(event);
    });

    $("#fileupload4").change(function(event) {
        let var4 = URL.createObjectURL(event.target.files[0]);
        $("#upload-img4").attr("src",var4);
        console.log(event);
    });
})

