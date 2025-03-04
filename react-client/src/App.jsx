import { useState, useEffect } from 'react' //useEffect for API call
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios' //for HTTP requests

function App() {
  const [data, setData] = useState(null); // State to store API response
  const [count, setCount] = useState(0)

  // Fetch data from the API when the component loads
  const apiURL = 'http://localhost:3000';
  useEffect(() => {
    axios
      .get(`${apiURL}`)
      .then((response) => setData(response.data)) // Set response data into state
      .catch((error) => console.error("Error fetching data:", error));
  }, []); // Empty dependency array means this runs once when the component mounts


  return (
    <>
      {/* Display API response */}
      <h2>API Test!</h2>
      {data ? <p>API Response: {JSON.stringify(data.now).replace(/"/g, '')}</p> : <p>Loading...</p>}
    </>
  )
}

export default App
