// src/components/JobResults.js
const JobResults = ({ jobs }) => {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-3">Scraped Jobs</h2>
      {jobs.length === 0 ? (
        <p>No jobs found. Try a different search.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Source</th>
              <th className="border p-2">Title</th>
              <th className="border p-2">Company</th>
              <th className="border p-2">Location</th>
              <th className="border p-2">Link</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, index) => (
              <tr key={index} className="text-center">
                <td className="border p-2">{job.source}</td>
                <td className="border p-2">{job.title}</td>
                <td className="border p-2">{job.company}</td>
                <td className="border p-2">{job.location}</td>
                <td className="border p-2">
                  <a href={job.link} target="_blank" rel="noopener noreferrer" className="text-blue-600">
                    View Job
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default JobResults;
