import React, { useState } from 'react'
import { useLazyQuery, gql } from '@apollo/client'

const QUERY_SEARCH_COUNTRY = gql`
  query Country($code: ID!) {
    country(code: $code) {
      name
      capital
      code
      currency
    }
  }
`;

function Search() {

  const [countrySearch, setCountrySearch] = useState('');
  const [searchCountry, { data }] = useLazyQuery(QUERY_SEARCH_COUNTRY);
  return (
    <div className="search">
      <div className="inputs">
        <input
          type="text"
          placeholder="Enter Country Code (ex. BR)..."
          className="input"
          onChange={e => { setCountrySearch(e.target.value) }} />
        <button onClick={() => {
          searchCountry({
            variables: {
              code: countrySearch.toUpperCase()
            }
          })
        }}>Search For Country</button>
      </div>
      <div className="searchCountry">
        {data &&
          <div className="countryDisplay">
            <h1>{data.country.name}</h1>
            <h2>Capital: {data.country.capital}</h2>
            <h2>Currency: {data.country.currency}</h2>
            <h2>Code: {data.country.code}</h2>
          </div>
        }
      </div>
    </div>
  )
}

export default Search
