// src/components/JobForm.js
import { useState } from "react";

const JobForm = ({ onSearch }) => {
  const [jobRole, setJobRole] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [jobField, setJobField] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!jobRole || !jobLocation || !jobField) {
      alert("Please fill in all fields");
      return;
    }
    onSearch({ jobRole, jobLocation, jobField });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Job Scraper</h2>
      <div className="mb-3">
        <label className="block text-sm font-medium">Job Role</label>
        <input
          type="text"
          value={jobRole}
          onChange={(e) => setJobRole(e.target.value)}
          placeholder="Software Engineer"
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-3">
        <label className="block text-sm font-medium">Location</label>
        <input
          type="text"
          value={jobLocation}
          onChange={(e) => setJobLocation(e.target.value)}
          placeholder="India"
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-3">
        <label className="block text-sm font-medium">Job Field</label>
        <input
          type="text"
          value={jobField}
          onChange={(e) => setJobField(e.target.value)}
          placeholder="IT, Finance, Healthcare"
          className="w-full p-2 border rounded"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Search Jobs
      </button>
    </form>
  );
};

export default JobForm;
