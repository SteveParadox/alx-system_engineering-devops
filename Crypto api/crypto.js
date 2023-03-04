import React, { useState, useEffect } from "react";

const LandingPage = () => {
  // State for holding the user's email address
  const [email, setEmail] = useState("");
  // State for holding the cryptocurrency data
  const [data, setData] = useState(null);
  // State for holding any error messages
  const [error, setError] = useState(null);

  // Handler function for updating email state when the input changes
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // Handler function for submitting the form
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted email:", email);
    // Perform any necessary actions, such as sending the email to a backend
  };

  // Use the useEffect hook to fetch data from the API
  useEffect(() => {
    fetch("https://api.coinmarketcap.com/v1/ticker/")
      .then((response) => response.json())
      .then((json) => {
        setData(json);
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  return (
    <div className="landing-page">
      <h1>Welcome to CryptoCoin</h1>
      <p>
        CryptoCoin is the future of digital currency. Sign up to stay updated on
        our latest news and promotions.
      </p>
      {data ? (
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Price (USD)</th>
            </tr>
          </thead>
          <tbody>
            {data.map((coin, index) => (
              <tr key={coin.id}>
                <td>{index + 1}</td>
                <td>{coin.name}</td>
                <td>{coin.price_usd}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : error ? (
        <p>{error.message}</p>
      ) : (
        <p>Loading data...</p>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleEmailChange}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default LandingPage;
