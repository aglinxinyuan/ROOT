

let currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(n) {
    $(".tab")[n].style.display = "block";
}

function nextPrev(n) {
    // This function will figure out which tab to display
    const x = $(".tab");
    // Exit the function if any field in the current tab is invalid:
    if (n === 1 && !validateForm()) return false;
    // Hide the current tab:
    x[currentTab].style.display = "none";
    // Increase or decrease the current tab by 1:
    currentTab = currentTab + n;
    // if you have reached the end of the form...
    if (currentTab >= x.length) {
        // ... the form gets submitted:
        $.ajax(
            "api", {
                method: "POST",
                data: $("#signup_form").serialize(),
                success: window.location.replace("verification.html?"+$("#email").val())
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
    x = $(".tab")
    y = x[currentTab].getElementsByTagName("input");
    // A loop that checks every input field in the current tab:
    for (i = 0; i < y.length; i++) {
        // If a field is empty...
        if (y[i].value === "") {
            // add an "invalid" class to the field:
            y[i].className += " invalid";
            // and set the current valid status to false
            valid = false;
        }
    }

    let password = $("#password");
    let confirm = $("#confirm");
    if (password.val() !== confirm.val()) {
        confirm.className += " invalid";
        valid = false;
    }
    return valid; // return the valid status
}
