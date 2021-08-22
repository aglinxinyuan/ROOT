function handleMainResult(resultData) {
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
        if (date<=resultData[i]["date"]) rowHTML = '<div class="block">';
        else rowHTML = '<div class="block grayout">';
        rowHTML +=
            '<a href="activity.html?id='+resultData[i]["id"]+'"><img  src="img/gym.png" height = 160 alt=""></a>' +
            '<div class="eventTitle pl-4"><div id="title" class="semiSC_7">' + resultData[i]["title"] + '</div></div>' +
            '<div class="eventLocation pl-4"><div id="location" class="semiSC_8"><img class="mr-1" src="img/location.png" height=10 alt="">' + resultData[i]["location"] + '</div></div>' ;
        element.append(rowHTML);
    }
}

$.ajax({
    dataType: "json", // Setting return data type
    method: "GET", // Setting request method
    url: "api/event", // Setting request url, which is mapped by StarsServlet in Stars.java
    success: (resultData) => handleMainResult(resultData) // Setting callback function to handle data returned successfully by the StarsServlet
});


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