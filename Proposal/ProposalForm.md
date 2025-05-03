# SCHOOL OF COMPUTING CA326 YEAR 3 PROJECT PROPOSAL FORM

## SECTION A

**TITLE**: OpportuNext  
**SUPERVISOR**: Michael Scriney  
**STUDENT 1**: Mahmoud Yousif, ID: 22703519  
**STUDENT 2**: Alexander Yakushenko, ID: 22533439  
**DATASET USED**: LinkedIn Job Postings (2023 - 2024) (kaggle.com)


## DESCRIPTION

This project intends to redefine the job search experience with an intelligent job suggestion engine and cutting-edge web-based tools. The platform aims to bridge the gap between job seekers and employers by leveraging free datasets and constructing a better approach, resulting in a more efficient and customized process for both parties. 

Users can find job openings, apply for them, and receive career suggestions based on their personal skills, qualifications, and work experience. The platform solves a major issue encountered on traditional job boards: job recommendations are sometimes general and fail to suit the complex needs of users, particularly novice or inexperienced job seekers. 

These platforms often use simple keyword matching, which can result in useless employment suggestions. As a result, users may struggle to find jobs that match their experiences or goals. Users can submit their CVs into the application, which are then thoroughly analyzed to extract important information such as technical capabilities, professional achievements, and previous experiences. 

This information is utilized to create a complete user profile, which is the foundation for providing highly relevant employment matches. By focusing on matching job seekers with positions that fit their backgrounds, this platform is more than simply a job search engine; it is a personalized job discovery tool that grows with the user. 

Whether a user is a recent graduate or a seasoned professional, the platform learns from their interactions and improves its recommendations over time. This dynamic and personalized approach not only saves customers time but also allows them to discover opportunities that they would not have found otherwise.

## FEATURES & COMPONENTS

1. **User Registration**
   - Users are required to upload their CVs during registration.
   - The platform uses a trained model to extract information from the CV, such as:
     - Technical skills
     - Qualifications
     - Past experiences
     - Professional achievements
   - This data is structured to build a personalized user profile, forming the foundation for tailored job recommendations.

2. **Job Search and Application**
   - Users can browse job listings, search for specific roles, and apply directly through the platform.
   - The platform provides a user-friendly interface to manage applications and track application status.

3. **Personalized Job Recommendations**
   - The core functionality revolves around the personalized job recommendation engine.
   - Machine learning algorithms match users with jobs that best fit their skills and experiences.
   - The platform analyses both the user’s profile (extracted from their CV) and job descriptions to recommend positions aligning with the candidate’s qualifications.

## PROJECT IMPLEMENTATION

### Division of Work


- **Alexander Yakushenko (Backend & Model Development)**
  - **Data Preparation**
    - Download the dataset from Kaggle.
    - Clean and preprocess the data:
      - Handle missing values, remove duplicates.
      - Extract necessary details from job descriptions (e.g., skills, experience level).
  - **Model Development**
    - Train a model that works efficiently.
    - Cross-validate models for optimal performance and evaluate them.
    - Integrate the completed model with the Django backend.
    - Expose endpoints for the frontend to consume job recommendations via REST APIs.
    - Personalize job recommendations by aligning extracted CV data with job descriptions.
    - Ensure models can be deployed and work efficiently in real-time scenarios.
    - Optimize for scalability and performance to handle job searches and recommendations quickly.

- **Mahmoud Yousif (Front-End and User Experience)**
  - **User Registration & CV Upload**
    - Develop the frontend interface using React.js:
      - Design user-friendly registration forms.
      - Implement file upload for CVs.
      - Ensure the uploaded CV is sent to the backend for processing.
  - **Job Search and Application**
    - Create a job search interface where users can browse job listings fetched from the backend.
    - Filter jobs based on preferences (e.g., location, title).
    - View job details and apply directly through the platform.
    - Implement a dashboard for users to track their job applications.
  - **Integration with Django Backend**
    - Consume APIs from the Django backend:
      - Get personalized job recommendations.
      - Display job listings.
      - Send application data back to the backend.
      - Ensure real-time updates (e.g., for application status changes).
                                                                                                                           

## PROGRAMMING LANGUAGES

- **Python**
  - Used for backend development with Django, data processing, and model training.

- **JavaScript**
  - Used for front-end development with React.js and Vite for dynamic user interfaces and Tailwind for styling and customization.

## HARDWARE/SOFTWARE PLATFORM

- **Hardware**: Standard PC or laptop capable of running development environments.
- **Software**: Windows OS to run development tools and IDEs.

## SPECIAL HARDWARE/SOFTWARE REQUIREMENTS

- No special hardware/software required.

## PROGRAMMING TOOLS

- **Django**
  - Web framework for backend development, handles user authentication, data models, and API endpoints.

- **React/Vite**
  - Frontend library (React) and build tool (Vite) providing a responsive user interface and efficient development workflow.

- **OpenAI API**
  - External API for advanced features like natural language processing, enhancing job description analysis and potentially assisting in resume parsing.

- **MySQL**
  - Database management system to store user data, job listings, and application statuses.

- **Tailwind**
  - Modern CSS framework for rapid and responsive UI design with utility-first classes.

## LEARNING CHALLENGES

- **Django**: Understanding how to use Django’s REST framework for building APIs.
- **React**: Mastering component lifecycle and state management techniques.
- **Machine Learning**: Training and evaluating models for recommendation systems.
- **API Integration**: Handling asynchronous requests in React.
- **Database Management**: Structuring relational databases and designing efficient queries in MySQL.
- **Collaboration**: Familiarizing with Git and working as a team.
