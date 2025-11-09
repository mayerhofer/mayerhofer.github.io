import React, { useState, useEffect } from "react";
import EntityAPI from "../servers/entity.js";
import Dropdown from "../html/dropdown";

// props: {country: string, countryImg: array, handleChange: function}
export default function FlagCombo({ country: initialCountry = 'Spain', countryImg = [], handleChange }) {
  const [country, setCountry] = useState(initialCountry);
  const [countries, setCountries] = useState(countryImg);

  useEffect(() => {
    if (!Array.isArray(countries) || countries.length === 0) {
      const countryAPI = new EntityAPI('countries');
      countryAPI.get({list: ['PL', 'IT', 'CH', 'BR', 'ES', 'DE', 'FR', 'AD', 'PT'].join(",")}).then(data => {
        setTimeout(() => {
          setCountries(data);
        }, 1000);
      });
    }
  }, [countries]);

  useEffect(() => {
    setCountry(initialCountry);
  }, [initialCountry]);

  const onChange = (val) => {
    setCountry(val);
    if (typeof handleChange === 'function') handleChange(val);
  };

  return (
    <Dropdown
      options={countries.map(c => ({
        value: c.name,
        label: c.flag ? (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={`data:image/png;base64,${c.flag}`} alt={c.name + " flag"} style={{ width: 40, height: 28 }} />
          </div>
        ) : c.name
      }))}
      selected={country}
      onChange={onChange}
      includeEmpty={false}
    />
  );
}