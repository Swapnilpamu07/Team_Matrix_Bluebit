// src/pages/HomePage.js
import { useState } from "react";
import JobForm from "../components/JobForm";
import JobResults from "../components/JobResults";
import { fetchScrapedJobs } from "../services/jobService";

const HomePage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (searchParams) => {
    setLoading(true);
    const data = await fetchScrapedJobs(searchParams);
    setJobs(data);
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <JobForm onSearch={handleSearch} />
      {loading && <p className="mt-4 text-blue-500">Scraping jobs, please wait...</p>}
      <JobResults jobs={jobs} />
    </div>
  );
};

export default HomePage;
