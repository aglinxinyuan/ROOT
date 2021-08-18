let currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab



$('.click').click(function(){
    $(".signup").text(this.id);
    $("#tag").val(this.id);
});


$("#evenDate").datepicker();
$("#evenTime").timepicker({
    timeFormat: 'HH:mm'
});

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
    if (currentTab >= 3) {
        // ... the form gets submitted:
        $.ajax(
            "api/create", {
                method: "POST",
                data: $("#createEvent_form").serialize(),
                success: window.location.replace("main.html")
            }
        );
        return false;
    }
    // Otherwise, display the correct tab:
    showTab(currentTab);
}

function validateForm() {
    // This function deals with validation of the form fields
    let x, y, i, valid = true;
    x = document.getElementsByClassName("tab");
    y = x[currentTab].getElementsByTagName("input");
    // A loop that checks every input field in the current tab:
    for (i = 0; i < y.length; i++) {
        // If a field is empty...
        if ((currentTab === 0 || currentTab === 2) && (y[i].value === "")) {
            // add an "invalid" class to the field:
            y[i].className += " invalid";
            // and set the current valid status to false
            valid = false;
        }
    }

    return valid; // return the valid status
}


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

