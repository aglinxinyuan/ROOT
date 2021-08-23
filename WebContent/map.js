let map;

// store all the locations that needed to be represented
const activities = [""];
const places = [""];
const idlist = [""];




function handleMapResult(resultData) {


    for (let i = 0; i < resultData.length-1 ; i++) {
        activities.push(resultData[i]["title"]);
        places.push(resultData[i]["location"]);
        idlist.push(resultData[i]["id"]);
    }
}

$.ajax({
    dataType: "json", // Setting return data type
    method: "GET", // Setting request method
    url: "api/event", // Setting request url, which is mapped by StarsServlet in Stars.java
    success: (resultData) => handleMapResult(resultData) // Setting callback function to handle data returned successfully by the StarsServlet
});


function initMap() {

    map = new google.maps.Map(document.getElementById("map"), {
        center: new google.maps.LatLng(43.039235545230916, -76.13521875124395),
        zoom: 16,
    });

    const img = new Image();
    img.src = './img/orangewhitecircle.png';


    const icons = {
        activity: {
            icon: img.src,
        },
    };






    function geocode(loc,infowindow){
        let lat,lng;
        axios.get('https://maps.googleapis.com/maps/api/geocode/json',{
            params:{
                address: loc,
                key: 'AIzaSyCRgoiGsS5sT-jnQ1DbD61LI_1AdoynHIg'
            }
        })
            .then( function subFunction(response){
                // Log full response in the console
                console.log(response);

                // Formatted Address
                let formattedAddress = (response.data.results[0].formatted_address);
                let formattedAddressOutput = `
                <ul class = "list-group">
                <li class ="list-group-item">${formattedAddress}</li>
                </ul>
            `;


                // Geometry
                lat= (response.data.results[0].geometry.location.lat);
                lng= (response.data.results[0].geometry.location.lng);

                const marker = new google.maps.Marker({
                    position: response.data.results[0].geometry.location,
                    icon: icons["activity"].icon,
                    map: map,
                });



                marker.addListener("click", () => {
                    infowindow.open({
                        anchor: marker,
                        map,
                        shouldFocus: false,
                    });
                });


            })
            .catch(function (error){
                console.log(error);
            })
    }

    for (let i = 0; i < places.length; i++){

        const contentString =
            '<div class= "infowindow" id="content">' +
            // '<div id="siteNotice">' +
            // "</div>" +
            '<div id="firstHeading" class="firstHeading semiSC_12">'+ places[i] +'</div>' +
            '<div id="bodyContent">' +
            "<p><b>This location</b>, has following activities going on: </p>" +
            '<p>'+ activities[i]+'<a href="activity.html?id='+idlist[i]+'">' +
            "</p>" +
            "</div>" +
            "</div>";
        const infowindow = new google.maps.InfoWindow({
            content: contentString,
        });

        geocode(places[i],infowindow);

    }

}


