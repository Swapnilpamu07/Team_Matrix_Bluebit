import React, { useState } from "react";
import axios from "axios";

function App() {
  const [formData, setFormData] = useState({
    job_role: "",
    job_location: "",
    job_field: "",
  });
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setJobs([]);

    try {
      const response = await axios.post("http://127.0.0.1:5000/scrape", formData);
      setJobs(response.data);
    } catch (err) {
      setError("Failed to fetch jobs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Job Scraper</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="job_role"
          placeholder="Job Role (e.g., Software Engineer)"
          value={formData.job_role}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="job_location"
          placeholder="Job Location (e.g., India)"
          value={formData.job_location}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="job_field"
          placeholder="Job Field (e.g., IT, Finance, Healthcare)"
          value={formData.job_field}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Scraping..." : "Fetch Jobs"}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      {jobs.length > 0 && (
        <div className="results">
          <h2>Scraped Jobs</h2>
          <ul>
            {jobs.map((job, index) => (
              <li key={index}>
                <strong>{job.title}</strong> at {job.company} ({job.location})  
                - <a href={job.link} target="_blank" rel="noopener noreferrer">View Job</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
