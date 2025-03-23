import time
import os
import pandas as pd
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager

def scrape_jobs(job_role, job_location, job_field):
    job_role = job_role.strip().replace(" ", "%20")
    job_location = job_location.strip().replace(" ", "%20")
    job_field = job_field.strip().replace(" ", "%20")

    LINKEDIN_URL = f"https://www.linkedin.com/jobs/search/?keywords={job_role}%20{job_field}&location={job_location}"
    NAUKRI_URL = f"https://www.naukri.com/{job_role.replace('%20','-')}-jobs-in-{job_location.replace('%20','-')}"

    options = Options()
    options.add_argument("--headless")  # Run without UI
    options.add_argument("--disable-gpu")
    options.add_argument("--disable-blink-features=AutomationControlled")
    options.add_experimental_option("excludeSwitches", ["enable-automation"])
    options.add_experimental_option("useAutomationExtension", False)

    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
    wait = WebDriverWait(driver, 10)

    all_jobs = []

    # ✅ Scrape LinkedIn Jobs
    driver.get(LINKEDIN_URL)
    time.sleep(5)
    try:
        jobs = wait.until(EC.presence_of_all_elements_located((By.CLASS_NAME, "base-card")))
        for job in jobs[:10]:
            try:
                title = job.find_element(By.CSS_SELECTOR, ".base-search-card__title").text.strip()
                company = job.find_element(By.CSS_SELECTOR, ".base-search-card__subtitle").text.strip()
                location = job.find_element(By.CSS_SELECTOR, ".job-search-card__location").text.strip()
                job_link = job.find_element(By.TAG_NAME, "a").get_attribute("href")
                all_jobs.append({"source": "LinkedIn", "title": title, "company": company, "location": location, "link": job_link})
            except:
                continue
    except:
        pass

    # ✅ Scrape Naukri Jobs
    driver.get(NAUKRI_URL)
    time.sleep(5)
    try:
        jobs = wait.until(EC.presence_of_all_elements_located((By.CLASS_NAME, "jobTuple")))
        for job in jobs[:10]:
            try:
                title = job.find_element(By.CLASS_NAME, "title").text.strip()
                company = job.find_element(By.CLASS_NAME, "companyName").text.strip()
                location = job.find_element(By.CLASS_NAME, "location").text.strip()
                job_link = job.find_element(By.TAG_NAME, "a").get_attribute("href")
                all_jobs.append({"source": "Naukri", "title": title, "company": company, "location": location, "link": job_link})
            except:
                continue
    except:
        pass

    driver.quit()
    return all_jobs
