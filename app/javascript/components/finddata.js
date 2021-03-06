import {fetchData} from './fetchapi.js'
import {map} from './vue.js'
import {implementGeoJson} from './vue.js'
import { addLoc } from './vue.js'
import { addDept } from './vue.js'
const BASE_URL = 'https://api.teamtailor.com/v1/';


const checkIfLocation = (job) => {
  //For each job, if location mentioned, print it.
  const locations = receiveLocation({
    number: 1,
    size:10
  })
  let jobLoc = []
  locations.then(function(value){
    if(job.relationships.locations.data.length != 0) {
      job.relationships.locations.data.forEach ((element) => {
          let loc = value.filter(el => el.id === element.id);
          let location = {
            id: loc[0].id,
            city: loc[0].attributes.city,
            country: loc[0].attributes.country,
          }
          jobLoc.push(location)
        })
    } else {
      jobLoc = []
    }
    addLoc(jobLoc)
  })
}

const checkIfDepartment = (job) => {
  //For each job, if department mentioned, print it.
  const departments = receiveDepartment({
    number: 1,
    size:10
  })
  let jobDept = []
  departments.then(function(value){
    if(job.relationships.department.data) {
      let deptId = job.relationships.department.data.id
        let dept = value.filter(el => el.id === deptId);
        let department = {
          id: dept[0].id,
          name: dept[0].attributes.name,
          pictures: dept[0].attributes.pictures,
        }
        jobDept.push(department)
    } else {
      jobDept = []
    }
    addDept(jobDept)
  })
}

const receiveLocation = (params) => {
  return fetchData(`${BASE_URL}locations`)
}

const receiveDepartment = (params) => {
  return fetchData(`${BASE_URL}departments`)
}

export {checkIfLocation}
export {checkIfDepartment}
export {receiveDepartment}
export {receiveLocation}
