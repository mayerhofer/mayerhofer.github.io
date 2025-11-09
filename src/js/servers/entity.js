function assembleUrl(entity, filter) {
  const base = localStorage.getItem("entityUrl");
  let query = '/' + entity;
  if (typeof filter === 'object') {
    let keys = Object.keys(filter);
    if (keys.length > 0) {
      query += '?' + keys.map(k => k + '=' + filter[k]).join('&');
    }
  }

  return base + query;
}
async function operate(route, payload, filter) {
  try {
    let response = await fetch(assembleUrl(route, filter), payload);

    if (response.status >= 200 && response.status <= 202) {
      const body = await response.json();
      const items = body.result ?? body;

      return typeof items === "string" ? JSON.parse(items) : items;
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

  async save(data) {
    if (data._id) {
      await operate(this.route, buildPayload(data, 'PUT'));
    } else {
      const response = await operate(this.route, buildPayload(data, 'POST'));
      data._id = response.insertedId;
    }
    return data;
  }
	
  async delete(data) {
    return await operate(this.route, buildPayload(data, 'DELETE'));
  }
}

export default EntityAPI;