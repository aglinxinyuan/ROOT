// function handleMessageResult(resultData) {
//
//     document.getElementById("name").value = resultData[0]['name'];
//     document.getElementById("gender").value = resultData[0]['gender'];
//     document.getElementById("school").value = resultData[0]['school'];
//     document.getElementById("major").value = resultData[0]['major'];
//     document.getElementById("birth").value = resultData[0]['birth'];
//     document.getElementById("email").value = resultData[0]['email'];
//     document.getElementById("phone").value = resultData[0]['phone'];
//     document.getElementById("aboutme").value = resultData[0]['aboutme'];
// }
//
// $.ajax({
//     dataType: "json", // Setting return data type
//     method: "GET", // Setting request method
//     url: "api/message", // Setting request url, which is mapped by StarsServlet in Stars.java
//     success: (resultData) => handleMessageResult(resultData) // Setting callback function to handle data returned successfully by the StarsServlet
// });


function handleChatResult(resultData) {
    let element = $("#messages")

    for (let i = resultData.length-1; i >=0 ; i--) {
        let rowHTML="";
        rowHTML +=
            '<li><div class="block mb-3">' +
            '<a href="activity.html?id='+resultData[i]["id"]+'"><img  src="img/gym.png" height = 160 alt=""></a>' +
            '<div class="eventTitle pl-4"><div id="title" class="semiSC_7">' + resultData[i]["title"] + '</div></div>' +
            '<div class="eventLocation pl-4"><div id="location" class="semiSC_8"><img class="mr-1" src="img/location.png" height=10 alt="">' + resultData[i]["location"] + '</div></div></li>' ;
        element.append(rowHTML);
    }
}

$.ajax({
    dataType: "json", // Setting return data type
    method: "GET", // Setting request method
    url: "api/chatroom", // Setting request url, which is mapped by StarsServlet in Stars.java
    success: (resultData) => handleChatResult(resultData) // Setting callback function to handle data returned successfully by the StarsServlet
});



function submitMessage_form(){


    $.ajax(
        "api/message", {
            method: "POST",
            data: $("#message_form").serialize(),
             success: window.location.replace("chat.html")
        }
    );

}
