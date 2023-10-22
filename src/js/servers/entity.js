function assembleUrl(entity, filter) {
  const base = localStorage.getItem("entityUrl");
  let query = '?entity=' + entity;
  if (filter) {
    query += '&' + Object.keys(filter).map(k => k + '=' + filter[k]).join('&');
  }

  return base + query;
}
async function operate(route, payload, filter) {
  try {
    let response = await fetch(assembleUrl(route, filter), payload);

    if (response.status >= 200 && response.status <= 202) {
      let body = await response.json();

      return body.documents ?? body;
    } else {
      alert("Response not 200: " + response.status + ". Error: " + JSON.stringify(response.body));
      alert("Endpoint used: " + localStorage.getItem("entityUrl"));
      return [];
    }
  } catch (ex) {
    alert(ex);
    return [];
  }
}
function buildPayload(data, method) {
  return {
    method: method,
    body: JSON.stringify(data),
    headers: {
       origin: "https://mayerhofer.github.io",
      'Content-Type': 'application/json'
    }
  };
}

class EntityAPI {
  constructor(route) {
    this.route = route;
  }

  async get(filter) {
    return await operate(this.route, null, filter);
  }
	
  async insert(data) {
    return await operate(this.route, buildPayload(data, 'POST'));
  }
	
  async update(data) {
    return await operate(this.route, buildPayload(data, 'PUT'));
  }
	
  async delete(data) {
    return await operate(this.route, buildPayload(data, 'DELETE'));
  }
}

export default EntityAPI;