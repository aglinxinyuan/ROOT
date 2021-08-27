function handlePersonalInfoResult(resultData) {

    document.getElementById("name").value = resultData[0]['name'];
    document.getElementById("gender").value = resultData[0]['gender'];
    document.getElementById("school").value = resultData[0]['school'];
    document.getElementById("major").value = resultData[0]['major'];
    document.getElementById("birth").value = resultData[0]['birth'];
    document.getElementById("email").value = resultData[0]['email'];
    document.getElementById("phone").value = resultData[0]['phone'];
    document.getElementById("aboutme").value = resultData[0]['aboutme'];
}

$.ajax({
    dataType: "json", // Setting return data type
    method: "GET", // Setting request method
    url: "api/userinfo", // Setting request url, which is mapped by StarsServlet in Stars.java
    success: (resultData) => handlePersonalInfoResult(resultData) // Setting callback function to handle data returned successfully by the StarsServlet
});


function submitEditProfile_form(){

    console.log("something updated")
    $.ajax(
        "api/editProfile", {
            method: "POST",
            data: $("#editProfile_form").serialize(),
            success: window.location.replace("profile.html")
        }
    );

}
