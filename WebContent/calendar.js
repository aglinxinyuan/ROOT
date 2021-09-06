function handleCalendarResult(resultData) {

    console.log(resultData);

    let months = [ "Jan.", "Feb.", "March", "Apr.", "May", "June",
        "July", "Aug.", "Sept.", "Oct.", "Nov.", "Dec." ];
    const d = new Date();
    const date = d.getFullYear() + String(d.getMonth() + 1).padStart(2, '0') + String(d.getDate()).padStart(2, '0');


    for (let i = 0; i <= resultData.length-1 ; i++) {

        let year = resultData[i]['date'].substring(0,4);
        let month = resultData[i]['date'].substring(4,6);
        month = months[[parseInt(month)-1]];

        let day = resultData[i]['date'].substring(6,8);
        let rowHTML;

        if (date<=resultData[i]["date"]){
            let element = $("#eventsjoined");
            rowHTML = '<li> <div class="eventDetial row">';
            rowHTML +=
                '<div class="timeline">' +
                '<div class="month semiSC">'+year+'</div>' +
                '<div class="month semiSC">'+month+'</div>' +
                '<div class="date semiSC">'+day+'</div>' +
                '<div class="time">'+ resultData[i]['time']+'</div>' +
                '</div>' +
                '<div class="card ml-3 mt-3">'+
                '<div class="card__inner">'+
                '<div class="card__face card__face--front">'+
                '<div class="block">'+
                ' <div class="coverImg"><img src="img/gym.png" height=90 alt=""></div>'+
                '<div class="eventTitle pl-3">'+
                '<div id="title" class="semiSC_7">'+ resultData[i]["title"] +'</div>'+
                '</div>'+
                '<div class="eventLocation pl-3">'+
                '<div id="location" class="semiSC_8"><img class="mr-1" src="img/location.png" height=10 alt="">'+ resultData[i]["location"] +'</div>'+
                '</div>'+
                '</div>'+
                '</div>'+
                '<div class="card__face card__face--back">'+
                '<div class="block row">'+
                '<div class="smallBlock col-6"><img src="img/gym.png" height=90 alt=""></div>'+
                '<button class="yellowButton col-3" onclick="activityInfo('+resultData[i]['id']+')"><img src="img/info.png" height=20 alt=""></button>'+
                '<button class="redButton col-3" onclick="openModal('+resultData[i]['id']+','+ resultData[i]['isCreator'] + ')">'+
                '<img src="./img/delete.png" height=20 alt=""></button>'+
                '</div>'+
                '</div>'+
                '</div>'+
                '</div>'+
                '</div>';
            element.append(rowHTML);
        }
        else{
            let element = $("#eventsjoinedPast");
            rowHTML = '<li> <div class="eventDetial grayout row">';
            rowHTML +=
                '<div class="timeline">' +
                '<div class="month semiSC">'+year+'</div>' +
                '<div class="month semiSC">'+month+'</div>' +
                '<div class="date semiSC">'+day+'</div>' +
                '<div class="time">'+ resultData[i]['time']+'</div>' +
                '</div>' +
                '<div class="card ml-3 mt-3">'+
                '<div class="card__inner">'+
                '<div class="card__face card__face--front">'+
                '<div class="block">'+
                ' <div class="coverImg"><img src="img/gym.png" height=90 alt=""></div>'+
                '<div class="eventTitle pl-3">'+
                '<div id="title" class="semiSC_7">'+ resultData[i]["title"] +'</div>'+
                '</div>'+
                '<div class="eventLocation pl-3">'+
                '<div id="location" class="semiSC_8"><img class="mr-1" src="img/location.png" height=10 alt="">'+ resultData[i]["location"] +'</div>'+
                '</div>'+
                '</div>'+
                '</div>'+
                '<div class="card__face card__face--back">'+
                '<div class="block row">'+
                '<div class="smallBlock col-6"><img src="img/gym.png" height=90 alt=""></div>'+
                '<button class="yellowButton col-3" onclick="activityInfo('+resultData[i]['id']+')"><img src="img/info.png" height=20 alt=""></button>'+
                '<button class="redButton col-3" onclick="openModal('+resultData[i]['id']+','+ resultData[i]['isCreator'] + ')">'+
                '<img src="./img/delete.png" height=20 alt=""></button>'+
                '</div>'+
                '</div>'+
                '</div>'+
                '</div>'+
                '</div>';
            element.append(rowHTML);
        }



    }

    // Select all the same element class, and grant them click function
    const card = document.querySelectorAll(".card__inner");
    card.forEach(card =>card.addEventListener("click", function (e) {
        card.classList.toggle('is-flipped');
    }));

}

function openModal(id,isCreator) {
    $('#ModalEventDeleted').modal('show')
    if(isCreator){
        $('#delete').html('<a type="button" class="btn greyBtn" href="api/deleteEventAsCreator?id='+id+'">Delete</a>')
        $('#noticeTitle').html('Delete Event')
        $('#noticeContent').html('Are you sure you want to Delete this event as creator?')
    }
    else{
        $('#delete').html('<a type="button" class="btn greyBtn" href="api/deleteEvent?id='+id+'">Unjoin</a>')
        $('#noticeTitle').html('Unjoin Event')
        $('#noticeContent').html('Are you sure you want to quit this event?')
    }
}

$.ajax({
    dataType: "json", // Setting return data type
    method: "GET", // Setting request method
    url: "api/eventjoined", // Setting request url, which is mapped by StarsServlet in Stars.java
    success: (resultData) => handleCalendarResult(resultData) // Setting callback function to handle data returned successfully by the StarsServlet
});



function activityInfo(id){
    window.location.replace('activity.html?id='+id);
}


function searchFunction() {
    let input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("eventsjoined");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("div")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}



