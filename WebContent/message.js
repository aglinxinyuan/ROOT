function handleChatResult(resultData) {

    console.log(resultData);

    let element = $("#chatList");

    for (let i = 0; i <=resultData.length-1 ; i++) {
        let rowHTML;
        rowHTML ="";
        rowHTML +=
            '<li style="display: none"><div class="friendBox mb-3 pl-3">'+
            '<div class="row">'+
            '<div class="col-3 mt-3 pl-2 pr-0"><img id="person" src="img/alex.png" height=65% alt=""></div>'+
            '<div class="col-9 mt-2 pl-0 pr-0">'+
            '<div class="row pt-2">'+
            '<div class="col-8">'+
            '<div id="name" class="semiSC_5 ">'+ resultData[i]["name"]+'</div>'+
            '</div>'+
            '<div class="col-4">'+
            '<a type="button" class="btn addBtn" href="api/addFriend?id='+resultData[i]["id"]+'">Add</a>' +
            '</div>'+
            '</div>'+
            '<div class="row mt-1">'+
            '<div class="col ">'+
            '<div id="emailAddress" class="semiSC_4">'+ resultData[i]["email"]+'</div>'+
            '</div>'+
            '</div>'+
            '</div>'+
            '</div></div></li>';
        element.append(rowHTML);
    }



}

$.ajax({
    dataType: "json", // Setting return data type
    method: "GET", // Setting request method
    url: "api/userlist", // Setting request url, which is mapped by StarsServlet in Stars.java
    success: (resultData) => handleChatResult(resultData) // Setting callback function to handle data returned successfully by the StarsServlet
});
