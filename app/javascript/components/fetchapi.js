import { vue } from './vue.js'
import { checkIfLocation} from './finddata.js'
import { checkIfDepartment} from './finddata.js'
const API_KEY = 'lrQqeKhgWSv7WS38KntM48UFQJvvYlQfx0R2lt-H';
const VERSION = 20161108;
const BASE_URL = 'https://api.teamtailor.com/v1/';

const receiveMessageJobHome = (event) => {
  event.preventDefault();
  const job = receiveJob({
    number: 1,
    size:10
  })
  job.then(function(value){
    value.forEach((job) => {
      let location = checkIfLocation(job);
      let department = checkIfDepartment(job);
      vue(job, location, department);
    });
  })
};

const receiveJob = (params) => {
  return fetchData(`${BASE_URL}jobs?include=department,locations&page%5Bsize%5D=${params.size}&page%5Bnumber%5D=${params.number}`)
};

const fetchData = (url) => {
  const headers = {
    'Authorization': `Token token=${API_KEY}`,
    'X-Api-Version': VERSION,
    'Content-Type': 'application/vnd.api+json'
  };

  const method = ('GET');
  let options = {
    method,
    headers,
  }

  return fetch(url, options)
    .then(response => response.json())
    // .then((data) => {
      .then(json => {
        return new Promise((res, rej) => {
            if(!json || json.errors) {
                rej(json);
            }
            else res(json.data || {});
        })
    });
};

export {receiveMessageJobHome};
export {fetchData};
