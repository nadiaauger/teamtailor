const vue = (value, location, department) => {
  console.log('ici dans vue', value)
  console.log('ici loc', location)
  console.log('ici dpt', department)
  const element = `<li class="list-inline-item">
    <a href="${value.links["careersite-job-url"]}" alt="">
      ${value.attributes.title}
    </a>
  </li>`;
  results.insertAdjacentHTML("beforeend", element);
}

export {vue};
