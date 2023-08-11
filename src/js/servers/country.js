class CountryAPI {
  static cachedValues = {};
	
  static async get(arrayCountryCodes) {
    const toFetch = arrayCountryCodes.filter(x => ! Object.keys(CountryAPI.cachedValues).includes(x));
    const result = await CountryAPI.fetchOnly(toFetch);
	  
    result.forEach(r => CountryAPI.cachedValues[r.isoAlpha2] = r);
	  
    return Object.values(CountryAPI.cachedValues).filter(x => arrayCountryCodes.includes(x.isoAlpha2));
  }
	  
  static async fetchOnly(arrayCountryCodes) {
    const suffix = arrayCountryCodes.map((a, i) => "c" + i.toString() + "=" + a).join('&');
    const address = localStorage.getItem("countryUrl")  + "?" + suffix;
    const response = await fetch(address);

    if (response.status === 200) {
      let text = await response.json();
      return JSON.parse(text.result).documents;
    } else {
      let text = await response.json();
      alert(text);
      alert("Response not 200: " + response.status + ". Error: " + JSON.stringify(response.body));
      alert("Endpoint used: " + localStorage.getItem("entityUrl"));
      return [];
    }
  }
}

export default CountryAPI;