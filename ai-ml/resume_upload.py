import os
import pdfplumber
from flask import Flask, request, render_template
from werkzeug.utils import secure_filename
from db_connection import users_collection  # Import MongoDB connection

app = Flask(__name__)

# Define upload folder
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

# Allowed file types
ALLOWED_EXTENSIONS = {"pdf"}

def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

def extract_text_from_pdf(pdf_path):
    text = ""
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            text += page.extract_text() + "\n"
    return text.strip()

@app.route("/", methods=["GET", "POST"])
def upload_resume():
    if request.method == "POST":
        if "resume" not in request.files:
            return "No file part"
        
        file = request.files["resume"]
        
        if file.filename == "":
            return "No selected file"
        
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            filepath = os.path.join(app.config["UPLOAD_FOLDER"], filename)
            file.save(filepath)

            # Extract text from PDF
            resume_text = extract_text_from_pdf(filepath)

            # Store resume text in MongoDB
            user_data = {
                "name": request.form.get("name"),
                "email": request.form.get("email"),
                "resume_text": resume_text
            }
            users_collection.insert_one(user_data)

            return f"✅ Resume uploaded successfully for {user_data['name']}!"

    return '''
        <form method="post" enctype="multipart/form-data">
            Name: <input type="text" name="name" required><br>
            Email: <input type="email" name="email" required><br>
            Upload Resume (PDF): <input type="file" name="resume" accept=".pdf" required><br>
            <input type="submit" value="Upload">
        </form>
    '''

if __name__ == "__main__":
    app.run(debug=True)
