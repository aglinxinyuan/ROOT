function handleCalendarResult(resultData) {
    let element = $("#events");
    const d = new Date();

    let month = [];
    month[0] = "01";
    month[1] = "02";
    month[2] = "03";
    month[3] = "04";
    month[4] = "05";
    month[5] = "06";
    month[6] = "07";
    month[7] = "08";
    month[8] = "09";
    month[9] = "10";
    month[10] = "11";
    month[11] = "12";

    const date = d.getFullYear() + month[d.getMonth()] + d.getDate();
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
    url: "api/eventjoined", // Setting request url, which is mapped by StarsServlet in Stars.java
    success: (resultData) => handleCalendarResult(resultData) // Setting callback function to handle data returned successfully by the StarsServlet
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


// function searchFunction() {
//     let input, filter, ul, li, a, i, txtValue;
//     input = document.getElementById("searchInput");
//     filter = input.value.toUpperCase();
//     ul = document.getElementById("events");
//     li = ul.getElementsByTagName("li");
//     for (i = 0; i < li.length; i++) {
//         a = li[i].getElementsByTagName("div")[0];
//         txtValue = a.textContent || a.innerText;
//         if (txtValue.toUpperCase().indexOf(filter) > -1) {
//             li[i].style.display = "";
//         } else {
//             li[i].style.display = "none";
//         }
//     }
// }
//

// Select all the same element class, and grant them click function
const card = document.querySelectorAll(".card__inner");
card.forEach(card =>card.addEventListener("click", function (e) {
    card.classList.toggle('is-flipped');
}));

