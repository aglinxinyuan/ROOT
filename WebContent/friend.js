function handleUserListResult(resultData) {

    console.log(resultData);

    let element = $("#userlist");

    for (let i = 0; i <=resultData.length-1 ; i++) {
        let rowHTML;
        rowHTML = '<li><div class="block mb-3">';
        rowHTML +=
            '<div class="row friendBox mb-1 pl-3">'+
            '<div class="col-3 mt-2 pl-2 pr-0"><span class="person"><img id="person" src="img/alex.png" height=65% alt=""></span></div>'+
            '<div class="col-9 mt-2 pl-0 pr-0">'+
            '<div class="row pt-2">'+
            '<div class="col">'+
            '<div id="name" class="semiSC_5 ">'+ resultData[i]["name"]+'</div>'+
            '</div>'+
            '</div>'+
            '<div class="row mt-1">'+
            '<div class="col ">'+
            '<div id="emailAddress" class="semiSC_4">'+ resultData[i]["email"]+'</div>'+
            '</div>'+
            '</div>'+
            '</div>'+
            '</div>';
        element.append(rowHTML);
    }






}

$.ajax({
    dataType: "json", // Setting return data type
    method: "GET", // Setting request method
    url: "api/userlist", // Setting request url, which is mapped by StarsServlet in Stars.java
    success: (resultData) => handleUserListResult(resultData) // Setting callback function to handle data returned successfully by the StarsServlet
});

