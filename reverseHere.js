// reverse geocoding and map
function getAddress(strCoord) {
// Instantiate a map and platform object:
    var platform = new H.service.Platform({
        'apikey': 'lWINAFLC8PMFmNVnNT0eNfS4H6syTeqaK2J22SxV8Q4'
    });
// Retrieve the target element for the map:
    var targetElement = document.getElementById('mapContainer');

// Get default map types from the platform object:
    var defaultLayers = platform.createDefaultLayers();

// Instantiate the map:
    let splitted = strCoord.split(',');
    let lat = Number(splitted[0]);
    let long = Number(splitted[1]);
    console.log("map");
    console.log(lat);
    console.log(long);
    var map = new H.Map(
        document.getElementById('mapContainer'),
        defaultLayers.vector.normal.map,
        {
            zoom: 15,
            center: {lat: lat, lng: long}

        });

// Create the parameters for the reverse geocoding request:
    var reverseGeocodingParameters = {
        prox: strCoord,
        mode: 'retrieveAddresses',
        maxresults: 1
    };


// Define a callback function to process the response:
    function onSuccess(result) {
        let location = result.Response.View[0].Result[0];

        /*console.log(location.Location.Address.Label);
        console.log(location.Location.Address.City);
        console.log(location.Location.Address.Label.City);
        console.log(location.Location.DisplayPosition.longitude);*/

        let address = location.Location.Address.Label;
        let splitted = address.split(',');

        let city = location.Location.Address.City
        let country = splitted[splitted.length - 1];
        console.log(city);
        console.log(country);
        sessionStorage.setItem("city", city);
        sessionStorage.setItem("country", country);
    };

// Get an instance of the geocoding service:
    var geocoder = platform.getGeocodingService();

// Call the geocode method with the geocoding parameters,
// the callback and an error callback function (called if a
// communication error occurs):
    geocoder.reverseGeocode(
        reverseGeocodingParameters,
        onSuccess,
        function (e) {
            alert(e);
        });

}

// load user position
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(loadPosition);
} else {
    window.alert("Geolocation is not supported by this browser.");
}

function loadPosition(position) {
    let strCoord = position.coords.latitude + "," + position.coords.longitude;
    getAddress(strCoord);
}
