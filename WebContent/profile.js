function handleProfileResult(resultData) {
    console.log("something here");
    // $("#name").text(resultData[15]['title'])
    // $("#aboutme").text(resultData[15]['location'])
    $("#name").text(resultData[0]['name'])
    $("#email").text(resultData[0]['email'])
    $("#aboutme").text(resultData[0]['email'])
    $("#gender").text(resultData[0]['gender'])
    $("#school").text(resultData[0]['school'])
    $("#major").text(resultData[0]['major'])
    console.log("something here");
    console.log(resultData);
}

$.ajax({
    dataType: "json", // Setting return data type
    method: "GET", // Setting request method
    url: "api/userinfo", // Setting request url, which is mapped by StarsServlet in Stars.java
    success: (resultData) => handleProfileResult(resultData) // Setting callback function to handle data returned successfully by the StarsServlet
});



