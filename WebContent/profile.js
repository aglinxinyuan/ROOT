function handleProfileResult(resultData) {
    $("#name").text(resultData['title'])
    $("#aboutme").text(resultData['description'])
    $("#school").text(resultData['location'])
    $("#major").text(resultData['skill'])
}

$.ajax({
    dataType: "json", // Setting return data type
    method: "GET", // Setting request method
    url: "api/activity"+window.location.search, // Setting request url, which is mapped by StarsServlet in Stars.java
    success: (resultData) => handleProfileResult(resultData) // Setting callback function to handle data returned successfully by the StarsServlet
});

