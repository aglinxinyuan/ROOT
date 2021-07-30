function handleMainResult(resultData) {
    $("#university").text(resultData['university'])
    $("#title").text(resultData['title'])
    $("#location").text(resultData['location'])
}


jQuery.ajax({
    dataType: "json", // Setting return data type
    method: "GET", // Setting request method
    url: "activity"+window.location.search, // Setting request url, which is mapped by StarsServlet in Stars.java
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