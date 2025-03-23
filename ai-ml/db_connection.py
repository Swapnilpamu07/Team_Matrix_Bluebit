from pymongo import MongoClient

# Replace with your MongoDB Atlas connection string
MONGO_URI = "mongodb+srv://<username>:<password>@cluster.qxnsl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster"

try:
    client = MongoClient(MONGO_URI)  # Connect to MongoDB
    db = client["JobRecommendationSystem"]  # Select the database

    # Test connection
    client.admin.command("ping")
    print("✅ Successfully connected to MongoDB Atlas!")

    # Define collections
    users_collection = db["users"]
    jobs_collection = db["jobs"]

except Exception as e:
    print(f"❌ Connection failed: {e}")

# from pymongo import MongoClient

# # Replace with your MongoDB Atlas connection string
# MONGO_URI = "mongodb+srv://adityajilla23:gnUS1OKL7AUXoFof@cluster.qxnsl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster"

# try:
#     client = MongoClient(MONGO_URI)  # Connect to MongoDB
#     db = client["JobRecommendationSystem"]  # Select the database

#     # Test connection
#     client.admin.command("ping")
#     print("✅ Successfully connected to MongoDB Atlas!")

# except Exception as e:
#     print(f"❌ Connection failed: {e}")


# users = [
#     {
#         "name": "Alice Johnson",
#         "email": "alice@example.com",
#         "skills": ["Python", "Machine Learning", "Data Analysis", "TensorFlow"],
#         "experience": 3,
#         "education": "B.Sc. in Computer Science",
#         "preferred_roles": ["Data Scientist", "ML Engineer"]
#     },
#     {
#         "name": "Bob Smith",
#         "email": "bob@example.com",
#         "skills": ["JavaScript", "React", "Node.js"],
#         "experience": 2,
#         "education": "B.Sc. in Software Engineering",
#         "preferred_roles": ["Frontend Developer", "Full Stack Developer"]
#     }
# ]

# # Insert into MongoDB
# users_collection = db["users"]
# users_collection.insert_many(users)

# print("✅ Users inserted successfully!")


# jobs = [
#     {
#         "title": "Machine Learning Engineer",
#         "company": "Google",
#         "location": "California, USA",
#         "required_skills": ["Python", "Machine Learning", "TensorFlow"],
#         "experience_needed": 2
#     },
#     {
#         "title": "Frontend Developer",
#         "company": "Facebook",
#         "location": "New York, USA",
#         "required_skills": ["JavaScript", "React", "CSS"],
#         "experience_needed": 1
#     }
# ]

# # Insert into MongoDB
# jobs_collection = db["jobs"]
# jobs_collection.insert_many(jobs)

# print("✅ Jobs inserted successfully!")

# for user in users_collection.find():
#     print(user)

# for job in jobs_collection.find():
#     print(job)


