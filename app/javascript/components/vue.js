// const MAPBOX_API_KEY = 'pk.eyJ1IjoibmFkaWFhZyIsImEiOiJjazJnOWszZHEwOWp1M25wY3JkNjZyd3JlIn0.MxYIWsY8YvQCo6jKzOGGqw'
let features = [];

const vue = (value, location, department) => {
  // console.log('ici dans vue', value)
  // console.log(location[0])
  // console.log(department)
  let data = ``
  // console.log(location)
  // console.log(location[0])
  if (location && department[0]) {
    console.log('la')
    location.forEach((data) => {
      data = `<p> ${location[0].city} - ${department[0].name}</p> `
    })
  }
  // console.log(data)
  const element = `<li class="job-li">
    <a href="${value.links["careersite-job-url"]}" class="link-job">
      <p> ${value.attributes.title}</p>
      ${data}
    </a>
  </li>`;
  results.insertAdjacentHTML("beforeend", element);
  // map(location.concat());
}

const map = (featuresTab) => {
  mapboxgl.accessToken = 'pk.eyJ1IjoibmFkaWFhZyIsImEiOiJjazJnOWszZHEwOWp1M25wY3JkNjZyd3JlIn0.MxYIWsY8YvQCo6jKzOGGqw';
  var map = new mapboxgl.Map({
  container: 'map', // container id
  style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
  center: [18.85, 52.35], // starting position [lng, lat]
  zoom: 3 // starting zoom
  });

  var geojson = {
    type: 'FeatureCollection',
    features: featuresTab
  };
  console.log(geojson)
  // add markers to map
  geojson.features.forEach(function(marker) {

    // create a HTML element for each feature
    var el = document.createElement('div');
    el.className = 'marker';

    // make a marker for each feature and add to the map
    new mapboxgl.Marker(el)
      .setLngLat(marker.geometry.coordinates)
      .addTo(map);
  });
}

const implementGeoJson = (marker) => {
  marker.forEach ((data) => {
    features.push({
      type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [data.long, data.lat]
        },
        properties: {
          title: 'Mapbox',
          description: ''
        }
    })
  })
  return features
}

export {vue};
export {map};
export {implementGeoJson}
