import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:category" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)

function HomePage() {
  const navigate = useNavigate()
  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h2>Select a Category to Start</h2>
      <select onChange={(e) => navigate(`/${e.target.value}`)} defaultValue="">
        <option value="" disabled>Choose Category</option>
        <option value="code">Programming Languages</option>
        <option value="jobs">Tech Jobs</option>
        <option value="tools">Software Tools</option>
        <option value="cybersecurity">Cybersecurity</option>
        <option value="buzzwords">Business Buzzwords</option>
        <option value="places">World Landmarks</option>
        <option value="programmingTerms">Programming Concepts</option>
      </select>
    </div>
)}