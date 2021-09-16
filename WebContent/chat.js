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
    console.log(resultData);
    let elementTop = $("#topBar");
    let rowHTMLTop = "";
    rowHTMLTop +=
        '<div class="topbar_short">'+
        '<div class="row ml-0 pt-4">'+
        '<div class="col-3 mt-4" > <a HREF="message.html"><img class ="back" src="img/whiteback.png" height = 13 alt=""></a></div>' +
         '<div class="col-6 mt-3 mb-3" > <div class="title_centered_white ">testname here</div></div>'+
         '<div class="col-3 mt-4" > <a HREF="chatmanage.html'+ window.location.search +'"><img src="img/more.png" height = 6 alt=""></a></div>'+
         '</div>'+
         '</div>'
    elementTop.append(rowHTMLTop);

    let element = $("#messages");
    for (let i = 0 ; i <=resultData.length-1 ; i++) {
        let rowHTML="";
        if(resultData[i]["self"] === 1){
            rowHTML +=
                '<li class ="out">' +
                '<div class ="chat-img"><img alt="" src="img/julia.png" ></div>' +
                '<div class="chat-body">' +
                '<div class="chat-message"><p>'+ resultData[i]["message"] + '</p></div>' +
                '</div>' +
                '<div  class="time semiSC">' + resultData[i]["time"]+ '</div>' +
                '</li>'
            element.append(rowHTML);
        }
        else{
            rowHTML +=
                '<li class ="in">' +
                '<div class ="chat-img"><img alt="" src="img/alex.png" ></div>' +
                '<div class="chat-body">' +
                '<div class="chat-message"><p>'+ resultData[i]["message"] + '</p></div>' +
                '</div>' +
                '<div  class="time semiSC">' + resultData[i]["time"]+ '</div>' +
                '</li>'
            element.append(rowHTML);
        }

    }
}



$.ajax({
    dataType: "json", // Setting return data type
    method: "GET", // Setting request method
    url: "api/chatroom" + window.location.search, // Setting request url, which is mapped by StarsServlet in Stars.java
    success: (resultData) => handleChatResult(resultData) // Setting callback function to handle data returned successfully by the StarsServlet
});



$("#message_form").keypress(function (e) {
    if (e.which === 13) {
        console.log("formsubmitted");
        $.ajax({
                url: "api/message" + window.location.search,
                method: "POST",
                data: $("#message_form").serialize(),
                success: window.location.replace("chat.html")
            }
        );
    }
});


