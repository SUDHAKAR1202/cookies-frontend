import React, { useState } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;


const API_BASE = "http://localhost:5000";

function App() {
  const [response, setResponse] = useState(null);

  const setCookie = async () => {
    const res = await axios.get(`${API_BASE}/set-cookie`, { withCredentials: true });
    setResponse(res.data);
  };

  const getCookie = async () => {
    const res = await axios.get(`${API_BASE}/get-cookie`, { withCredentials: true });
    setResponse(res.data);
  };

  const getStatus = async (code) => {
    try {
      const res = await axios.get(`${API_BASE}/status/${code}`);
      setResponse({ status: res.status, data: res.data });
    } catch (err) {
      setResponse({
        status: err.response?.status,
        data: err.response?.data,
      });
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Cookies and Response</h2>
      <button onClick={setCookie}>Set Cookie</button>&nbsp;
      <button onClick={getCookie}>Get Cookie</button>
      <br />
      <br />

      <button onClick={() => getStatus(200)}>Get 200 OK</button>&nbsp;
      <button onClick={() => getStatus(201)}>Get 201 Created</button>&nbsp;
      <button onClick={() => getStatus(400)}>Get 400 Bad Request</button>&nbsp;
      <button onClick={() => getStatus(404)}>Get 404 Not Found</button>&nbsp;
      <button onClick={() => getStatus(500)}>Get 500 Server Error</button>

      <pre
        style={{
          background: "#f4f4f4",
          padding: "10px",
          marginTop: "20px",
        }}
      >
        {JSON.stringify(response, null, 2)}
      </pre>
    </div>
  );
}


export default App;
