import {fetchData} from './fetchapi.js'
const BASE_URL = 'https://api.teamtailor.com/v1/';


const checkIfLocation = (value) => {
  const locations = receiveLocation({
    number: 1,
    size:10
  })
  let jobLoc = []
  if(value.relationships.locations.data.length != 0) {
    value.relationships.locations.data.forEach ((element) => {
      locations.then(function(value){
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
    })
  } else {
    jobLoc = []
  }
  return jobLoc
}

const checkIfDepartment = (value) => {
  const departments = receiveDepartment({
    number: 1,
    size:10
  })
  // console.log(value)
  let jobDept = []
  // console.log('jesuisla', value.relationships.department.data)
  if(value.relationships.department.data) {
    let deptId = value.relationships.department.data.id
    // console.log('jesuisrentree', value.relationships.department.data.id)
    departments.then(function(value){
      let dept = value.filter(el => el.id === deptId);
      let department = {
        id: dept[0].id,
        name: dept[0].attributes.name,
        pictures: dept[0].attributes.pictures,
      }
      jobDept.push(department)
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
