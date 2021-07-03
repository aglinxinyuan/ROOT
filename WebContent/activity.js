function handleActivityResult(resultData) {
    $("#title").text(resultData['title'])
    $("#name").text(resultData['name'])
    $("#level").text(resultData['level'])
    $("#time").text(resultData['time'])
    $("#location").text(resultData['location'])
    $("#about").text(resultData['about'])
}


jQuery.ajax({
    dataType: "json", // Setting return data type
    method: "GET", // Setting request method
    url: "activity"+window.location.search, // Setting request url, which is mapped by StarsServlet in Stars.java
    success: (resultData) => handleActivityResult(resultData) // Setting callback function to handle data returned successfully by the StarsServlet
});