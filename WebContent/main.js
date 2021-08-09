function handleMainResult(resultData) {
    let element = $("#events");
    for (let i = 0; i < resultData.length; i++) {
        let rowHTML = '<div class="block">' +
            '<a href="http://google.com"><img  src="img/gym.png" height = 160 alt=""></a>' +
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
//         const latitude = position.coords.latitude;
//         const longitude = position.coords.longitude;
//
//         const geoApiUrl = 'http://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}localityLanguage=en'
//
//         fetch(geoApiUrl)
//             .then(res => res.json())
//             .then(data => {
//                 status.textContent = data.city
//             })
//     }
//
//     const err = (position) =>{
//         status.textContent = 'Unable to retrieve your location'
//     }
//
//     navigator.geolocation.getCurrentPosition(success, err);
//
// }
// document.querySelector('#find-state').addEventListener('click', findMyState);