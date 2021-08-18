function handleMainResult(resultData) {
    $("#activityTitle").text(resultData['title'])
    $("#name").text(resultData['creator'])
    $("#level").text(resultData['skill'])
    $("#time").text(resultData['date'])
    $("#location").text(resultData['location'])
    $("#about").text(resultData['description'])
}

$.ajax({
    dataType: "json", // Setting return data type
    method: "GET", // Setting request method
    url: "api/activity"+window.location.search, // Setting request url, which is mapped by StarsServlet in Stars.java
    success: (resultData) => handleMainResult(resultData) // Setting callback function to handle data returned successfully by the StarsServlet
});

let btn = $('.btn');
btn.click(function(){
    $(this).addClass('disabled');
    $(this).text("Joined")
    sessionStorage.setItem(window.location.search, "joined");
});

if(sessionStorage.getItem(window.location.search)==="joined")
{

    btn.addClass('disabled');
    btn.text("Joined")
}