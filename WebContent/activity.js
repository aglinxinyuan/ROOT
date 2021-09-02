let btn =$('.btn');
function handleMainResult(resultData) {
    console.log("this happened 1");
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
            btn.html('<a href="api/join'+window.location.search+'">Join</a>')
            btn.click(function() {
                window.location.replace('activity.html'+window.location.search);
            });

        }
}

$.ajax({
    dataType: "json", // Setting return data type
    method: "GET", // Setting request method
    url: "api/activity"+window.location.search, // Setting request url, which is mapped by StarsServlet in Stars.java
    success: (resultData) => handleMainResult(resultData) // Setting callback function to handle data returned successfully by the StarsServlet
});



