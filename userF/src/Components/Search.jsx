import React, { useState } from 'react';
const apiUrl = process.env.REACT_APP_API_URL;

function Search() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearchClick = () => {
    setSearchOpen(!searchOpen);
  };

  const handleSearchInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/search?query=${query}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      if (response.ok) {
        setResults(data.products); // Assuming your API returns an object with a 'products' array
      } else {
        console.error('Search failed:', data);
        setResults([]);
      }
    } catch (error) {
      console.error('Error:', error);
      setResults([]);
    }
  };

  return (
    <div>
      <nav>
        <ul>
          <li>
            <i className="Sicon fas fa-search" onClick={handleSearchClick} />
          </li>
        </ul>
      </nav>
      {searchOpen && (
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={handleSearchInputChange}
          />
          <button onClick={handleSearch}>Search</button>
          <div className="search-results">
            {results.length > 0 ? (
              <ul>
                {results.map((product) => (
                  <li key={product._id}>
                    <img src={product.images} alt={product.title} />
                    <h5>{product.title}</h5>
                    <p>Price: ₹{product.price}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No results found</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;
