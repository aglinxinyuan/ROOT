let map;


// store all the locations that needed to be represented
let places = ["130 Sims Dr Syracuse, NY",
    "130 Sims Dr Syracuse, NY",
    "222 Waverly Ave Syracuse, NY 13244",
    "Eggers Hall 200 Syracuse, NY 13244",
    "Syracuse University, Address"];




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


    const contentString =
        '<div class= "infowindow" id="content">' +
        // '<div id="siteNotice">' +
        // "</div>" +
        '<h1 id="firstHeading" class="firstHeading">Location</h1>' +
        '<div id="bodyContent">' +
        "<p><b>This location</b>, has following activities going on: </p>" +
        '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
        "https://en.wikipedia.org/w/index.php?title=Uluru</a> " +
        "(last visited June 22, 2009).</p>" +
        "</div>" +
        "</div>";
    const infowindow = new google.maps.InfoWindow({
        content: contentString,
    });

    const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";




    function geocode(loc){
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
        geocode(places[i]);
    }

}


