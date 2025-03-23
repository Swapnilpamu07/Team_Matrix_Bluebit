// src/services/jobService.js
export const fetchScrapedJobs = async ({ jobRole, jobLocation, jobField }) => {
  try {
    const response = await fetch("http://localhost:5000/scrape-jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jobRole, jobLocation, jobField }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch jobs");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return [];
  }
};
