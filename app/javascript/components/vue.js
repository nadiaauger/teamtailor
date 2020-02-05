let features = [];
let i = 0;
let j = 0;
// This file contains all the printing's functions
const vue = (value) => {
  const element = `<li class="job-li">
    <a href="${value.links["careersite-job-url"]}" class="link-job">
      <p class="job-title"> ${value.attributes.title}</p>
      <div class="d-flex justify-content-between">
        <div class="d-flex">
          <i class="fas fa-map-marker-alt "></i>
          <p id="desc-loc"></p>
        </div>
        <div class="d-flex">
          <p id="desc-dept"></p>
          <i class="fas fa-building"></i>
        </div>
      </div>
    </a>
  </li>`;
  results.insertAdjacentHTML("beforeend", element);
}

const vueDepartment = (value) => {
  value.forEach((data) => {
    const element = `
    <div class="card" style="background-image: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(https://source.unsplash.com/random)">
      ${data.attributes.name}
    </div>`
    cardsdept.insertAdjacentHTML("beforeend", element);
  })
}

const vueLocation = (value) => {
  let markers = {}
  value.forEach((data) => {
    markers = implementGeoJson(data)
  })
  map(features)
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
  features.push({
    type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [marker.attributes.long, marker.attributes.lat]
      },
      properties: {
        title: 'Mapbox',
        description: ''
      }
  })
  return features
}

const addLoc = (location) => {
  const ul = document.querySelector('#results');
  const items = ul.getElementsByTagName("li");
  if (location.length > 0) {
    location.forEach((loc) => {
      items[i].querySelector("#desc-loc").insertAdjacentHTML("beforeend", ` ${loc.city}`)
      items[i].querySelector(".fa-map-marker-alt").style.display = 'block';
    })
  }
  i += 1
}

const addDept = (department) => {
  const ul = document.querySelector('#results');
  const items = ul.getElementsByTagName("li");
  if (department.length > 0) {
    department.forEach((dept) => {
      items[j].querySelector("#desc-dept").insertAdjacentHTML("beforeend", ` ${dept.name}`)
      items[j].querySelector(".fa-building").style.display = 'block';
      console.log(items[j].querySelector(".fas fa-building"))
    })
  }
  j += 1
}


export {vue};
export {map};
export {implementGeoJson}
export {vueDepartment}
export {vueLocation}
export {addLoc}
export {addDept}
