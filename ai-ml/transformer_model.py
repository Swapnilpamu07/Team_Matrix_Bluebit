from sentence_transformers import SentenceTransformer, util
import numpy as np
from db_connection import users_collection, jobs_collection  # Import MongoDB collections

# Load pre-trained Sentence Transformer model
model = SentenceTransformer("all-MiniLM-L6-v2")

def recommend_jobs(user_email):
    user = users_collection.find_one({"email": user_email})
    if not user:
        return "User not found!"
    
    # Convert user skills & experience into a single text representation
    user_text = " ".join(user["skills"]) + f" {user['experience']} years experience"
    user_embedding = model.encode(user_text, convert_to_tensor=True)

    matching_jobs = []
    
    for job in jobs_collection.find():
        job_text = f"{job['title']} requires {', '.join(job['required_skills'])}. Experience: {job['experience_needed']} years"
        job_embedding = model.encode(job_text, convert_to_tensor=True)

        # Compute similarity score between user and job
        similarity = util.pytorch_cos_sim(user_embedding, job_embedding).item()
        
        # Only recommend jobs with similarity > 0.5 (threshold)
        if similarity > 0.5:
            matching_jobs.append({
                "Job Title": job["title"],
                "Company": job["company"],
                "Location": job["location"],
                "Similarity Score": round(similarity, 2)
            })
    
    # Sort jobs by highest similarity score
    matching_jobs = sorted(matching_jobs, key=lambda x: x["Similarity Score"], reverse=True)
    
    return matching_jobs

# Test Recommendation for a user
recommended_jobs = recommend_jobs("alice@example.com")

if recommended_jobs:
    print("Recommended Jobs for Alice:")
    for job in recommended_jobs:
        print(job)
else:
    print("No suitable job found.")
