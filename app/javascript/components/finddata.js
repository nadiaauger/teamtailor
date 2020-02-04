import {fetchData} from './fetchapi.js'
import {map} from './vue.js'
import {implementGeoJson} from './vue.js'
const BASE_URL = 'https://api.teamtailor.com/v1/';


const checkIfLocation = (job) => {
  const locations = receiveLocation({
    number: 1,
    size:10
  })
  let jobLoc = []
  let features = []
  locations.then(function(value){
    if(job.relationships.locations.data.length != 0) {
      job.relationships.locations.data.forEach ((element) => {
          let loc = value.filter(el => el.id === element.id);
          let location = {
            id: loc[0].id,
            city: loc[0].attributes.city,
            country: loc[0].attributes.country,
            lat: loc[0].attributes.lat,
            long: loc[0].attributes.long
          }
          jobLoc.push(location)
        })
      features = implementGeoJson(jobLoc)
    } else {
      jobLoc = []
    }
    console.log('features', features)
    map(features)
    return jobLoc
  })
}

const checkIfDepartment = (value) => {
  const departments = receiveDepartment({
    number: 1,
    size:10
  })
  let jobDept = []
  if(value.relationships.department.data) {
    let deptId = value.relationships.department.data.id
    departments.then(function(value){
      let dept = value.filter(el => el.id === deptId);
      let department = {
        id: dept[0].id,
        name: dept[0].attributes.name,
        pictures: dept[0].attributes.pictures,
      }
      jobDept.push(JSON.stringify(department))
    })
  } else {
    jobDept = []
  }
  return jobDept
}

const receiveLocation = (params) => {
  return fetchData(`${BASE_URL}locations`)
}

const receiveDepartment = (params) => {
  return fetchData(`${BASE_URL}departments`)
}

const getValueByid = (id, data) => {
  return data.filter(
      function(data){ return data.id == id }
  );
}

export {checkIfLocation}
export {checkIfDepartment}
