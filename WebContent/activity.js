let btn =$('.btn');
function handleMainResult(resultData) {
    console.log(resultData);

    const d = new Date();
    const date = d.getFullYear() + String(d.getMonth() + 1).padStart(2, '0') + String(d.getDate()).padStart(2, '0');

    let activityDate =  resultData['date'].substring(0,4) + resultData['date'].substring(5,7)+ resultData['date'].substring(8,10);

    console.log(date);
    console.log(activityDate);

    $("#activityTitle").text(resultData['title'])
    $("#name").text(resultData['creator'])
    $("#level").text(resultData['skill'])
    $("#time").text(resultData['date'])
    $("#location").text(resultData['location'])
    $("#about").text(resultData['description'])

    if (date>activityDate){
        btn.addClass('disabled')
        btn.text("Finished")
    }
    else{

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
}

$.ajax({
    dataType: "json", // Setting return data type
    method: "GET", // Setting request method
    url: "api/activity"+ window.location.search, // Setting request url, which is mapped by StarsServlet in Stars.java
    success: (resultData) => handleMainResult(resultData) // Setting callback function to handle data returned successfully by the StarsServlet
});



