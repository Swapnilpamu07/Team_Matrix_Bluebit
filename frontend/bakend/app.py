from flask import Flask, request, jsonify
from flask_cors import CORS
from scraper import scrape_jobs

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

@app.route("/scrape", methods=["POST"])
def scrape():
    try:
        data = request.json
        job_role = data.get("job_role")
        job_location = data.get("job_location")
        job_field = data.get("job_field")

        if not job_role or not job_location or not job_field:
            return jsonify({"error": "Missing required fields"}), 400

        jobs = scrape_jobs(job_role, job_location, job_field)
        return jsonify(jobs)
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
