function initMap() {
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 6,
    center: { lat: 26.9124, lng: 75.7873 }, // Jaipur coordinates
  });

  var directionsService = new google.maps.DirectionsService();

  var waypoints = [
    { location: { lat: 28.6139, lng: 77.2088 } },
    { location: { lat: 26.8467, lng: 80.9462 } },
    { location: { lat: 26.9124, lng: 75.7873 } },
    { location: { lat: 30.7333, lng: 76.7794 } },
    { location: { lat: 30.0668, lng: 79.0193 } },
    { location: { lat: 31.1048, lng: 77.1734 } },
    { location: { lat: 23.2599, lng: 77.4126 } },
    { location: { lat: 21.2514, lng: 81.6296 } },
    { location: { lat: 23.0225, lng: 72.5714 } },
    { location: { lat: 19.076, lng: 72.8777 } },
    { location: { lat: 15.2993, lng: 74.124 } },
    { location: { lat: 12.9716, lng: 77.5946 } },
    { location: { lat: 13.0827, lng: 80.2707 } },
    { location: { lat: 8.5241, lng: 76.9366 } },
    { location: { lat: 15.9129, lng: 79.7399 } },
    { location: { lat: 17.385, lng: 78.4867 } },
    { location: { lat: 20.2961, lng: 85.8245 } },
    { location: { lat: 22.5726, lng: 88.3639 } },
    { location: { lat: 23.6102, lng: 85.2799 } },
    { location: { lat: 25.5941, lng: 85.1376 } },
    { location: { lat: 27.533, lng: 88.5122 } },
    { location: { lat: 26.2006, lng: 92.9376 } },
    { location: { lat: 25.467, lng: 91.3662 } },
    { location: { lat: 23.9408, lng: 91.9882 } },
    { location: { lat: 26.1584, lng: 94.5624 } },
    { location: { lat: 24.6637, lng: 93.9063 } },
    { location: { lat: 23.1645, lng: 92.9376 } },
    { location: { lat: 28.218, lng: 94.7278 } },
    { location: { lat: 34.0837, lng: 74.7973 } },
    { location: { lat: 34.1526, lng: 77.577 } },
  ];

  var userPosition = { lat: 27.4924, lng: 77.6737 }; // Example user position

  function calculateAndDisplayRoute(start, end, waypoints, segmentTraveled, map) {
    var request = {
      origin: start,
      destination: end,
      waypoints: waypoints,
      travelMode: "DRIVING",
    };

    directionsService.route(request, function (result, status) {
      if (status === "OK") {
        var route = result.routes[0];
        var legs = route.legs;

        var colorSegmentTraveled = "#0000FF"; // Blue for traveled segments
        var colorSegmentUntraveled = "#FF0000"; // Red for untraveled segments

        for (var i = 0; i < legs.length; i++) {
          var leg = legs[i];
          var color = colorSegmentUntraveled; // Default to untraveled color

          if (segmentTraveled && i < segmentTraveled) {
            color = colorSegmentTraveled;
          }

          if (request.waypoints[i] && userPosition.lat >= request.waypoints[i].location.lat) {
            color = colorSegmentTraveled;
          }

          var polyline = new google.maps.Polyline({
            path: leg.steps.flatMap((step) => step.path),
            strokeColor: color,
            strokeOpacity: 1.0,
            strokeWeight: 5,
            map: map,
          });
        }
      } else {
        console.error("Directions request failed due to " + status);
      }
    });
  }

  function splitWaypoints(waypoints, chunkSize) {
    var chunks = [];
    for (var i = 0; i < waypoints.length; i += chunkSize) {
      chunks.push(waypoints.slice(i, i + chunkSize));
    }
    return chunks;
  }

  var origin = { lat: 26.9124, lng: 75.7873 }; // Jaipur
  var destination = { lat: 34.1526, lng: 77.577 }; // Ladakh
  var chunkSize = 23; // Max waypoints per request (25 - origin and destination)
  var waypointChunks = splitWaypoints(waypoints, chunkSize);

  function calculateAllRoutes() {
    for (var j = 0; j < waypointChunks.length; j++) {
      var chunk = waypointChunks[j];
      var start = j === 0 ? origin : chunk[0].location;
      var end = j === waypointChunks.length - 1 ? destination : chunk[chunk.length - 1].location;
      var waypointsForChunk = chunk.slice(1, chunk.length - 1);

      calculateAndDisplayRoute(start, end, waypointsForChunk, j, map);
    }
  }

  calculateAllRoutes();

  var locations = [
    { position: { lat: 28.6139, lng: 77.2088 }, title: "New Delhi" },
    { position: { lat: 26.8467, lng: 80.9462 }, title: "Lucknow" },
    { position: { lat: 26.9124, lng: 75.7873 }, title: "Jaipur" },
    { position: { lat: 30.7333, lng: 76.7794 }, title: "Chandigarh" },
    { position: { lat: 30.0668, lng: 79.0193 }, title: "Dehradun" },
    { position: { lat: 31.1048, lng: 77.1734 }, title: "Shimla" },
    { position: { lat: 23.2599, lng: 77.4126 }, title: "Bhopal" },
    { position: { lat: 21.2514, lng: 81.6296 }, title: "Raipur" },
    { position: { lat: 23.0225, lng: 72.5714 }, title: "Ahmedabad" },
    { position: { lat: 19.0760, lng: 72.8777 }, title: "Mumbai" },
    { position: { lat: 15.2993, lng: 74.1240 }, title: "Panaji" },
    { position: { lat: 12.9716, lng: 77.5946 }, title: "Bangalore" },
    { position: { lat: 13.0827, lng: 80.2707 }, title: "Chennai" },
    { position: { lat: 8.5241, lng: 76.9366 }, title: "Thiruvananthapuram" },
    { position: { lat: 15.9129, lng: 79.7399 }, title: "Amaravati" },
    { position: { lat: 17.3850, lng: 78.4867 }, title: "Hyderabad" },
    { position: { lat: 20.2961, lng: 85.8245 }, title: "Bhubaneswar" },
    { position: { lat: 22.5726, lng: 88.3639 }, title: "Kolkata" },
    { position: { lat: 23.6102, lng: 85.2799 }, title: "Ranchi" },
    { position: { lat: 25.5941, lng: 85.1376 }, title: "Patna" },
    { position: { lat: 27.5330, lng: 88.5122 }, title: "Gangtok" },
    { position: { lat: 26.2006, lng: 92.9376 }, title: "Dispur" },
    { position: { lat: 25.4670, lng: 91.3662 }, title: "Shillong" },
    { position: { lat: 23.9408, lng: 91.9882 }, title: "Agartala" },
    { position: { lat: 26.1584, lng: 94.5624 }, title: "Kohima" },
    { position: { lat: 24.6637, lng: 93.9063 }, title: "Imphal" },
    { position: { lat: 23.1645, lng: 92.9376 }, title: "Aizawl" },
    { position: { lat: 28.2180, lng: 94.7278 }, title: "Itanagar" },
    { position: { lat: 34.0837, lng: 74.7973 }, title: "Srinagar" },
    { position: { lat: 34.1526, lng: 77.5770 }, title: "Leh" },
  ];

  locations.forEach(function (location) {
    new google.maps.Marker({
      position: location.position,
      map: map,
      title: location.title,
    });
  });

  new google.maps.Marker({
    position: userPosition,
    map: map,
    title: "Your Current Location",
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
    },
  });

  map.setCenter(userPosition);
}
