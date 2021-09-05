function handleChatResult(resultData) {

    console.log(resultData);

    let element = $("#chatList");

    for (let i = 0; i <=resultData.length-1 ; i++) {
        let rowHTML;
        rowHTML ="";
        rowHTML +=
            '<li><a type="button" href="chat.html?='+resultData[i]["id"]+'">' +
            '<div class="chatBox mb-3">'+
            '<div class="row">'+
            '<div class="col-3 mt-2 pl-2 pr-0"><span class="person"><img id="person" src="img/alex.png" height=65% alt=""></span></div>'+
            '<div class="col-9 mt-2 pl-0 pr-0">'+
            '<div class="row pt-2">'+
            '<div class="col-8">'+
            '<div id="name" class="semiSC_5 ">'+ resultData[i]["name"]+'</div>'+
            '</div>'+
            '<div class="col-4">'+
            '<div id="time">time</div>'+
            '</div>'+
            '</div>'+
            '<div class="row mt-1">'+
            '<div class="col ">'+
            '<div id="emailAddress" class="semiSC_4">'+ resultData[i]["name"]+'</div>'+
            '</div>'+
            '</div>'+
            '</div>'+
            '</div></div></a></li>';
        element.append(rowHTML);
    }





}

$.ajax({
    dataType: "json", // Setting return data type
    method: "GET", // Setting request method
    url: "api/chatRoom", // Setting request url, which is mapped by StarsServlet in Stars.java
    success: (resultData) => handleChatResult(resultData) // Setting callback function to handle data returned successfully by the StarsServlet
});
