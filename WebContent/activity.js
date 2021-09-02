function handleMainResult(resultData) {
    console.log(resultData);
    $("#activityTitle").text(resultData['title'])
    $("#name").text(resultData['creator'])
    $("#level").text(resultData['skill'])
    $("#time").text(resultData['date'])
    $("#location").text(resultData['location'])
    $("#about").text(resultData['description'])

        if (resultData['joined']) {
            btn.addClass('disabled')
            btn.text("Joined")
        }
        else{
            btn.html('<a herf="api/joinevent"'+window.location.search+'">Join</a>')
        }
}

$.ajax({
    dataType: "json", // Setting return data type
    method: "GET", // Setting request method
    url: "api/activity"+window.location.search, // Setting request url, which is mapped by StarsServlet in Stars.java
    success: (resultData) => handleMainResult(resultData) // Setting callback function to handle data returned successfully by the StarsServlet
});



