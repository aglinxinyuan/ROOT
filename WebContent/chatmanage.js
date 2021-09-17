
function handleCalendarResult(resultData) {

        console.log(resultData);
        // let id=parseInt(window.location.search.substring(3,1));
        let id=window.location.search.substring(4);
        console.log(id);

        let rowHTML;
            let element = $("#deleteChatRoom");
            rowHTML = '<li> <div class="eventDetial row">';
            rowHTML +=
                '<button class="button" onclick="openModal('+id+')">'+
                    '<div class="row">'+
                        '<div class="col-12 semiSC_6"><a data-toggle="modal" data-target="#ModalDelete">Delete</a>'+
                        '</div>'+
                    '</div>'+
                '</button>'
            element.append(rowHTML);

}

function openModal(id) {
    $('#ModalDelete').modal('show')
        $('#delete').html('<a type="button" class="btn" href="api/deleteChatRoom?id='+id+'">Delete</a>')

}


// this should be use to pull specific user info
$.ajax({
    dataType: "json", // Setting return data type
    method: "GET", // Setting request method
    url: "api/eventjoined", // Setting request url, which is mapped by StarsServlet in Stars.java
    success: (resultData) => handleCalendarResult(resultData) // Setting callback function to handle data returned successfully by the StarsServlet
});


//
// function activityInfo(id){
//     window.location.replace('activity.html?id='+id);
// }
//
//


