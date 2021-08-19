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
        // library: {
        //     icon: iconBase + "library_maps.png",
        // },
        // info: {
        //     icon: iconBase + "info-i_maps.png",
        // },
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

                // Address Components
                // let addressComponents = response.data.results[0].address_components;
                // let addressComponentsOutput = '<ul class = "list-group">';
                // for(let i =0; i < addressComponents.length; i++){
                //     addressComponentsOutput += `
                //     <li class="list-group-item"><srong>${addressComponents[i].types[0]}</srong>: ${addressComponents[i].long_name}</li>
                // `;
                // }
                // addressComponentsOutput += '</u>'

                // Geometry
                lat= (response.data.results[0].geometry.location.lat);
                lng= (response.data.results[0].geometry.location.lng);
                // console.log("returned value:"+lat);
                // console.log("returned value:"+lng);

                const marker = new google.maps.Marker({
                    position: response.data.results[0].geometry.location,
                    icon: icons["activity"].icon,
                    map: map,
                });

                // const markers = locations.map((location,i) =>{
                //     return new google.maps.Marker({
                //     position: response.data.results[0].geometry.location,
                //     icon: icons["activity"].icon,
                //     map: map,
                //     label: labels[i % labels.length],
                //     });
                // });
                //
                //     new MarkerClusterer(map, marker, {
                //         imagePath:
                //             "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
                //     });



                marker.addListener("click", () => {
                    infowindow.open({
                        anchor: marker,
                        map,
                        shouldFocus: false,
                    });
                });




            //     let geometryOutput = `
            //     <ul class = "list-group">
            //     <li class ="list-group-item"><strong>Latitude</strong>:${lat}</li>
            //     <li class ="list-group-item"><strong>Longitude</strong>:${lng}</li>
            //     </ul>
            // `;


                //output to app
                // document.getElementById('formatted-address').innerHTML = formattedAddressOutput;
                // document.getElementById('address-components').innerHTML = addressComponentsOutput;
                // document.getElementById('geometry').innerHTML = geometryOutput;

                // console.log("lat's value: " + response.data.results[0].geometry.location.lat);

            })
            .catch(function (error){
                console.log(error);
            })
    }

    for (let i = 0; i < places.length; i++){
        geocode(places[i]);
    }

}


