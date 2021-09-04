function handleMainResult(resultData) {
    let element = $("#events");
    const d = new Date();

    const date = d.getFullYear() + String(d.getMonth() + 1).padStart(2, '0') + String(d.getDate()).padStart(2, '0');
    for (let i = resultData.length-1; i >=0 ; i--) {
        let rowHTML;
        if (date<=resultData[i]["date"]) rowHTML = '<li><div class="block mb-3">';
        else rowHTML = '<li><div class="block grayout mb-3">';
        rowHTML +=
            '<a href="activity.html?id='+resultData[i]["id"]+'"><img  src="img/gym.png" height = 160 alt=""></a>' +
            '<div class="eventTitle pl-4"><div id="title" class="semiSC_7">' + resultData[i]["title"] + '</div></div>' +
            '<div class="eventLocation pl-4"><div id="location" class="semiSC_8"><img class="mr-1" src="img/location.png" height=10 alt="">' + resultData[i]["location"] + '</div></div></li>' ;
        element.append(rowHTML);
    }
}

$.ajax({
    dataType: "json", // Setting return data type
    method: "GET", // Setting request method
    url: "api/event", // Setting request url, which is mapped by StarsServlet in Stars.java
    success: (resultData) => handleMainResult(resultData) // Setting callback function to handle data returned successfully by the StarsServlet
});


// Show the ModalEventCreated if a new event is created.
$(document).ready(function() {
    if(window.location.href.indexOf('#ModalEventCreated') !== -1) {
        $('#ModalEventCreated').modal('show');

        $(document.body).click(function() {
            window.location.replace('main.html');
        });
    }

});


function searchFunction() {
    let input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("events");
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







//
// const findMyState = ()=> {
//     const status = document.querySelector('.status');
//
//     const success = (position) =>{
//         console.log(position)
//         const geoApiUrl = 'http://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}localityLanguage=en'
//
//         fetch(geoApiUrl)
//             .then(res => res.json())
//             .then(data => {
//                 status.textContent = data.city
//             })
//     }
//     const err = (position) =>{
//         status.textContent = 'Unable to retrieve your location'
//     }
//     navigator.geolocation.getCurrentPosition(success, err);
//
// }
// document.querySelector('#find-state').addEventListener('click', findMyState);