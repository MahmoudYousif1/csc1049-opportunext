# **OPPORTUNEXT FUNCTIONAL SPECIFICATION**

| Name                 | Student ID |
| :------------------- | :--------- |
| Mahmoud Yousif       | 22703519   |
| Alexander Yakushenko | 22533439   |

## **Table of Contents**

### **1. Introduction**
- [1.1 Purpose](#11-purpose)
- [1.2 Scope](#12-scope)
- [1.3 Definitions, Acronyms, and Abbreviations](#13-definitions-acronyms-and-abbreviations)
- [1.4 References](#14-references)
- [1.5 Overview](#15-overview)

### **2. The Overall Description**
- [2.1 Product Perspective](#21-product-perspective)
  - [2.1.1 System Interfaces](#211-system-interfaces)
    - [External System Interfaces](#external-system-interfaces)
    - [Internal System Interfaces](#internal-system-interfaces)
  - [2.1.2 Interfaces](#212-interfaces)
  - [2.1.3 Hardware Interfaces N/A](#213-hardware-interfaces-na)
  - [2.1.4 Software Interfaces](#214-software-interfaces)
  - [2.1.5 Communications Interfaces](#215-communications-interfaces)
  - [2.1.6 Memory Constraints](#216-memory-constraints)
  - [2.1.7 Operations](#217-operations)
  - [2.1.8 Site Adaptation Requirements](#218-site-adaptation-requirements)
- [2.2 Product Functions](#22-product-functions)
- [2.3 User Characteristics](#23-user-characteristics)
- [2.4 Constraints](#24-constraints)
- [2.5 Assumptions and Dependencies](#25-assumptions-and-dependencies)
- [2.6 Apportioning of Requirements](#26-apportioning-of-requirements)

### **3. Specific Requirements**
- [3.1 External Interfaces](#31-external-interfaces)
- [3.2 Functions](#32-functions)
- [3.3 Performance Requirements](#33-performance-requirements)
- [3.4 Logical Database Requirements](#34-logical-database-requirements)
- [3.5 Design Constraints](#35-design-constraints)
  - [3.5.1 Standards Compliance](#351-standards-compliance)
- [3.6 Software System Attributes](#36-software-system-attributes)
  - [3.6.1 Reliability](#361-reliability)
  - [3.6.2 Availability](#362-availability)
  - [3.6.3 Security](#363-security)
  - [3.6.4 Maintainability](#364-maintainability)
  - [3.6.5 Portability](#365-portability)

### **4. Change Management Process**
- [4.1 Change Management Process](#41-change-management-process)

### **5. Document Approvals**
- [5.1 Document Approvals](#51-document-approvals)

### **6. Supporting Information**
- [List of Figures](#list-of-figures)
- [List of Tables](#list-of-tables)

### **7. Schedule**
- [7.1 Gantt Chart](#71-gantt-chart)

# **1\.  Introduction**

The subsequent sections of this Software Requirements Specification (SRS) document present a detailed overview of our 3rd year project. This document aids developers in constructing a scalable, user-focused platform and is directed towards system designers, the project coordinator, the project supervisor, and the CSC1049 module demonstration panel.

## **1.1  Purpose**

This SRS aims to specify the requirements for creating a web-based job recommendation platform that utilises AI algorithms to evaluate user CVs and recommend them with appropriate job ads.

**This SRS is designated for:**

* Project stakeholders encompass project managers, clients, and business analysts who require comprehension of the system's aims and functionality.
* Development Team: Software engineers, frontend and backend developers, and database administrators tasked with implementing the system according to these specifications.

## **1.2  Scope**

**Product Synopsis**
OpportuNext is a web tool that aids job seekers in locating appropriate employment possibilities by evaluating their CVs and suggesting job ads that correspond with their skills, experience, and career objectives. The site enables users to upload their CVs, which are subsequently parsed for key information using the NLTK library. The system offers tailored job recommendations based on the users’ CVs using a model trained on an extensive data set of job offers obtained from Kaggle.

**Key Features:**

* User Registration and Authentication: Secure enrolment and login procedures.
* CV Upload and Parsing: Users may upload their CVs in multiple formats (PDF, DOCX, etc.).
* Job Exploration and Inquiry: Users are able to explore, search, and refine job postings.
* Customised Job Recommendations: Employment suggestions derived from CV analysis.
* Search bar: Allows users to search for and navigate through job listings.

**Objectives/Aims:**
**Job Seekers:** Optimised job search procedure with customised suggestions.

**Employers:** Indirect advantages via enhanced job seeker satisfaction and superior candidate-job alignment in the marketplace.

## **1.3  Definitions, Acronyms, and Abbreviations.**

| Term                     | Definition                                                                                                                                                                                                 |
| :----------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| API                      | **Application Programming Interface:** A set of protocols and tools for building software applications.                                                                                              |
| CV                       | **Curriculum Vitae:** A detailed document highlighting an individual’s professional and academic history.                                                                                           |
| HTTP/HTTPS Rest Protocol | **Hypertext Transfer Protocol:** Uses standard HTTP methods like GET, POST, PUT, and DELETE to enable communication between clients and servers.                                                     |
| ODBC Protocol            | **Open Database Connectivity:**  Provides a consistent method for applications to access data stored in various databases without needing to understand the underlying database-specific protocols.  |
| DRF                      | **Django REST Framework:** A powerful and flexible toolkit for building Web APIs in Django.                                                                                                          |
| NLP                      | **Natural language models:** A field of computer science and artificial intelligence that allows computers to communicate with human language.                                                       |
| NLTK                     | **The Natural Language Toolkit:** A Python library used for tokenisation and parsing.                                                                                                                |
| Haystack                 | **HayStack:** Haystack is a Python library that adds powerful search capabilities to Django applications, enabling users to perform efficient and advanced searches across the job posting database. |
| Tailwind                 | **Tailwind:** A lightweight open-source CSS framework used for styling and designing the site components.                                                                                            |

**Table 1: Definitions, Acronyms, Abbreviations**

## **1.4  References**

This document uses IEEE referencing styling for citing research.

**\[1\] \-** **Figma, Accessed 12/11/2024**
 **[Figma: The Collaborative Interface Design Tool](https://www.figma.com/)**

**\[2\] \- Data seeding with CSV files Accessed 15/11/2024**
[**https://haddad-tech.medium.com/automatic-data-seeding-using-csv-and-custom-django-admin-command-99b6c3aad819**](https://haddad-tech.medium.com/automatic-data-seeding-using-csv-and-custom-django-admin-command-99b6c3aad819)

**\[3\] \- Tailwind Documentation, Accessed 20/11/2024**
[**https://v2.tailwindcss.com/docs/installation**](https://v2.tailwindcss.com/docs/installation)

**\[4\] \- Haystack implemented in Django, Accessed 20/11/2024**
[**https://www.youtube.com/watch?v=lKanpfkhxv0**](https://www.youtube.com/watch?v=lKanpfkhxv0)

**\[5\] \- NLTK & Python, Accessed 25/11/2024**
[**https://realpython.com/nltk-nlp-python/**](https://realpython.com/nltk-nlp-python/)

## **1.5  Overview**

This document is structured into 6 primary sections:

**Sectio 1 \-** Offers a summary of the SRS, encompassing its objectives, scope, definitions, references, and a concise outline of the document's organisation.

**Section 2** \- provides an overview of the system, encompassing product perspective, product functions, user attributes, constraints, assumptions, dependencies, and the distribution of needs.

**Section 3 \-** explores comprehensive functional and non-functional requirements, system design, and other specifications critical for the development and deployment of OpportuNext.

**Section 4 \-** The change management process.

**Section 5** \- Contains Document approval from supervisor.

**Section 6 \-** Supporting Information & Appendix.

# **2\.  The Overall Description**

This section offers a comprehensive overview of OpportuNext,  delineating the key aspects that affect its requirements. This serves as the basis for the comprehensive specifications outlined in the next sections.

## **2.1  Product Perspective**

OpportuNext is a standalone web application engineered to enhance job matching between job seekers and companies through the utilisation of powerful AI technologies. It functions within the extensive framework of online employment marketplaces yet differentiates itself through tailored recommendations powered by advanced NLP techniques, semantic analysis, and clustering algorithms designed to match candidates with jobs based on their skills and experience.

**Evaluation Against Other/Current Systems:**

* **Comparable Platforms \-**  Services such as LinkedIn and Indeed provide job suggestions but may not employ sophisticated algorithms for individualised CV evaluation.
* **Differentiation enhances** personalisation by examining the semantic content of CVs and job descriptions using NLP techniques and clustering algorithms, resulting in more precise job matching.

### **2.1.1 System Interfaces**

![Figure 1 - System Architecture Diagram](Diagrams/figure%201%20-%20System%20Architecture%20Diagram.png)

**[ Figure 1\]** System architecture diagram Showcasing the system interfaces

#### **External System Interfaces**

| Interface                           | Functionality                                                                                                                         | Specification                                                                                                                                                                                                                      |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Database Server (MySQL)**   | Manages persistent storage for user accounts, profiles, uploaded CVs, parsed CV data, job postings, and personalised recommendations. | The backend application interacts with the MySQL database using Django's Object-Relational Mapping (ORM) layer.Utilises standard SQL queries abstracted by the ORM, facilitating database operations without direct SQL scripting. |
| **External Job Data Sources** | Provides job posting data used for populating job listings and training the recommendation algorithms.                                | Data is imported from Kaggle datasets in CSV format. Data parsing and transformation processes handle various data formats like CSV and JSON.                                                                                      |

**Table 2: External system intefaces**

#### **Internal System Interfaces**

| Interface                                               | Functionality                                                                                                                                                                      | Specification                                                                                                                                                                                                                                                                                                                                                                        |
| ------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Frontend Application (React & Tailwind)**       | Provides the user interface for interaction with the system, accessible through web browsers.                                                                                      | Communicates with the backend via RESTful APIs over HTTPS. Exchanges data in JSON format. Implements client-side rendering and handles user interactions, input validation, and state management.                                                                                                                                                                                    |
| **Backend Application (Django and DRF)**          | Serves as the core of the application, processing business logic, handling data operations, and orchestrating interactions between components.                                     | Exposes RESTful API endpoints for all functionalities required by the frontend. Implements authentication and authorisation using Django's built-in authentication system. Interfaces with the database using Django's ORM and with machine learning models for CV parsing and recommendations. Integrates Haystack for advanced search capabilities over the job postings database. |
| **Authentication System (Django Authentication)** | Manages user authentication and authorisation internally. Handles user registration, login, logout, and password management.                                                       | Utilises Django's built-in authentication framework. Stores user credentials securely using password hashing algorithms. Supports session management and permission controls.                                                                                                                                                                                                        |
| **Models and NLP Components**                     | Processes uploaded CVs to extract relevant information using Natural Language Processing (NLP) techniques. Generates personalised job recommendations based on the extracted data. | Utilises libraries such as NLTK Implemented as internal modules within the backend application. Communicates with the backend application through internal function calls                                                                                                                                                                                                            |
| **Communication Protocols and Standards**         | Ensures secure and standardised communication across all system interfaces.                                                                                                        | Security: All communications occur over HTTPS to ensure data encryption and security.  Data Formats: Uses standard JSON for data exchange between the frontend and backend.                                                                                                                                                                                                          |

**Table 3: Internal system intefaces**

### **2.1.2 Interfaces**

**User Interface**
The principal interface for users is a web-based Graphical User Interface (GUI) accessible through contemporary web browsers. It encompasses The following 7 interfaces.

**1\. Home page before login**
Showcases the homepage and about section. User’s can view job listings but must login to upload CVs and access their information.

![Figure 2.1 - Homepage wireframe 1](Diagrams/Figure%202.1%20-%20Homepage%20wireframe%201.png)

**\[Figure 2.1\]: Initial** home page wireframe before user logs in

**2\. Authentication Forms**
Sign-up & login pages for user registration and login.
![Figure 2.2 - Login, Sign-up pages](Diagrams/figure%202.2%20-%20Login_Sign-up%20pages.png)

**\[figure 2.2\] \-** Wireframe implementation of sign-up and login pages

**3\. Navigation**
Implemented a full-page navigation panel system.
![Figure 2.3 - Navigation panel interface](Diagrams/figure%202.3%20-%20navigation%20panel%20interface.png)

**\[Figure 2.3\] \-** Wireframe of the navigation panel

**4\. Home page after login**
Now that the user has logged in and authenticated, they are taken to a new homepage that allows the user to upload their cv, view job listings, view their dashboard, etc.

![Figure 2.4 - Logged-in user interface](Diagrams/figure%202.4%20-%20Logged-in%20user%20interface.png)

**\[Figure 2.4\] \-** Implementation of the logged-in user interface

**5\. CV Upload**
 This is a wireframe implementation of how a user would upload their CV once they have logged in. Once the user uploads the CV, they are then taken to the recommendation page according to their CV.
![Figure 2.5 - CV upload interface](Diagrams/figure%202.5%20-%20CV%20upload%20interface.png)

**\[Figure 2.5\] \-** CV upload section


**6\. Dashboard & Profile management**
Showcasing user profiles, CV submission options, and employment suggestions

![Figure 2.6 - Profile management interface](Diagrams/figure%202.6%20-%20Profile%20management%20interface.png)

**\[Figure 2.6\]** \- Sample design of Profile management

**7\. Job Listing Pages**
 Enabling visitors to peruse, search, and refine job ads.
![Figure 2.7 - Job listings interface](Diagrams/figure%202.7%20-%20Job%20listings%20Interface.png)

**\[Figure 2.7\] \-** Job listings page wireframe

**8\. Recommendation Page**
Once the user uploads their Cv, they’ll be taken this page with job recommendations tailored to their skills and experience, etc.

![Figure 2.8 - Recommendation page](Diagrams/figure%202.8%20-%20Recommendation%20page.png)

**\[Figure 2.8\] \-** Recommendations page

**Accessibility Specifications:**

* Adherence to ADA Standards: Guaranteeing platform accessibility for people with disabilities through screen reader compatibility, keyboard navigation assistance, and proper contrast ratios.
* Responsive Design: Guaranteeing functionality across diverse platforms, encompassing computers, tablets, and smartphones.

### **2.1.3 Hardware Interfaces N/A**

OpportuNext is a web-based tool that does not necessitate direct engagement with particular hardware components.

### **2.1.4 Software Interfaces**

OpportuNext interacts with various software components and external  systems to deliver its core functionalities. This section details both external and internal software interfaces, outlining their roles and specifications and how they integrate within the system, particularly emphasising the use of Django's many-to-many relationships with SQL, React Vite for frontend development, Tailwind CSS for styling, and Framer Motion for animations.

**External software Interfaces**

| Name                     | Functionality                                                                                                                                | Specification                                                                                                                                                                                                              |
| :----------------------- | :------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **MySQL**          | Manages persistent storage for user accounts, profiles, uploaded CVs, parsed CV data, job postings, and personalised recommendations.        | \- The backend application interacts directly with the MySQL database using custom SQL queries to manage many-to-many relationships. \- Utilises standard SQL commands for creating, reading, updating, and deleting data. |
| **Haystack**       | Provides powerful full-text search capabilities, enabling users to perform efficient and advanced searches across the job postings database. | \- Integrated within the Django backend to enhance search functionality. \- Handles indexing of job postings and manages search queries, returning relevant results based on user input.                                   |
| **Kaggle Dataset** | Provides comprehensive job posting data used for populating job listings and training the recommendation algorithms.                         | \- Data imported from Kaggle in CSV format. \- Utilises data parsing and transformation processes to handle various data formats like CSV and JSON.                                                                        |

**Table 4: External software interfaces**

**Internal software Interfaces**

| Name                                  | Functionality                                                                                                     | Specification                                                                                                                                                                                                                                                                                           |
| :------------------------------------ | :---------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Django**                      | Serves as the primary backend framework, handling data processing and API management.                             | \- Utilises Django's built-in authentication system for managing user sessions and permissions. \- Implements many-to-many relationships directly using custom SQL queries and junction tables to manage associations between models such as users and job postings.                                    |
| **Django REST Framework (DRF)** | Facilitates the creation of RESTful APIs, enabling seamless communication between the frontend and backend.       | \- Provides viewsets and routers to streamline API development. \- Ensures secure and efficient data exchange in JSON format over HTTPS.                                                                                                                                                                |
| **React Vite**                  | Builds the dynamic and responsive user interface for OpportuNext with enhanced development speed and performance. | \- Utilises Vite as the build tool for React, providing fast bundling and optimised build processes. \- Communicates with the backend via RESTful APIs over HTTPS. \- Exchanges data in JSON format. \- Implements client-side rendering, user interactions, input validation, and state management.    |
| **Tailwind CSS**                | Provides a utility-first CSS framework for designing and styling the frontend components.                         | \- Ensures a consistent and responsive design across various devices. \- Facilitates rapid UI development with pre-defined classes and customisation options. \- Works seamlessly with React Vite to apply styles efficiently and maintain design consistency.                                          |
| **Framer Motion**               | Adds smooth and interactive animations to the user interface, enhancing the overall user experience.              | \- Integrated within the React Vite frontend to create dynamic animations and transitions. \- Utilises declarative animation APIs to implement complex motion effects with minimal code. \- Enhances user interactions by providing visual feedback and improving the aesthetic appeal of the platform. |
| **NLTK**                        | Performs natural language processing tasks to parse and extract information from uploaded CVs.                    | \- Utilises tokenisation, parsing, and entity recognition to identify key skills, experiences, and qualifications. \- Integrated within the backend application to process CV data in real-time.                                                                                                        |
| **TensorFlow**                  | Trains and deploys machine learning models for generating personalised job recommendations.                       | \- Implements semantic analysis and clustering algorithms to match candidate profiles with job postings. \-integrated as internal modules within the backend for seamless data processing.                                                                                                              |
| **Data Seed (Custom Command)**  | Automates the initial population of the MySQL database with cleaned and parsed job posting data from CSV files.   | **\-** Runs custom management commands to automate data seeding during deployment or initialisation phases. \- Handles data parsing and transformation to align with the database schema, particularly managing many-to-many relationships through junction tables.                               |

**Table 5: Internal software interfaces**

### **2.1.5 Communications Interfaces**

OpportuNext employs standardised communication protocols to ensure secure and efficient data exchange between various system components and external entities. This section outlines the primary communication interfaces and their specifications.

**REST protocol over HTTP/HTTPS**

* The REST API server is the communication interface between the client-side application and the back-end services. It enables secure and efficient transfer of data.
* Follows REST architectural principles and adheres to HTTP/HTTPS protocols for communication. Payloads are encoded in JSON format

**ODBC Protocol**

* Facilitates seamless interaction between the Django backend and the MySQL database and allows for efficient data retrieval, insertion, updating, and deletion operations.
* The system uses ODBC drivers to establish connections with the MySQL database.

### **2.1.6 Memory Constraints**

The OpportuNext platform is designed to be deployed as a web application with no significant memory constraints on the client-side, as the processing of data will occur on the server side.

**Server-side**

* Memory requirements will mostly depend on the size of the job dataset and the number of concurrent users.
* With the current dataset of 152 MB, it is estimated that dataset processing will require about 300 MB of RAM. With an estimate of 50-100 MB per user session, 8 GB of RAM should be sufficient to accommodate up to 100 users.

**Client-side**

* No significant RAM requirements; devices with 4 GB of RAM and modern browsers should be sufficient for comfortable use.

**Performance Optimization**

* Tailwind CSS ensures that the frontend remains lightweight and efficient, reducing memory overhead on client devices.
* Framer Motion is optimised to provide smooth animations without significant memory consumption.

### **2.1.7 Operations**

OpportuNext operates in multiple modes to support both user interactions and automated backend processes, ensuring seamless functionality and performance.

**Normal Operation**

**User Activities**

* Log in and authenticate.
* Upload CVs in supported formats (PDF, DOCX).
* Browse, search, and filter job listings.
* Receive personalised job recommendations.
* Manage profiles and job preferences via the dashboard.

**Interactive Operations**

**Real-Time Actions**

* Update personal information and job preferences.
* Upload and parse CVs using NLTK.
* Conduct job searches and apply filters.

**Unattended Operations**

**Automated Processes**

* Background CV parsing and data extraction.
* Data clustering and recommendation generation.
* Regularly update search indexes in Elasticsearch.

### **2.1.8 Site Adaptation Requirements**

The OpportuNext platform is a web-based application hosted on cloud infrastructure. As such, it does not require any physical installation, specific environmental configurations or site-specific adaptations
All required configurations, such as database setup and system initialisation, are handled during server provisioning and do not depend on the customer’s physical or technical environment.

## **2.2  Product Functions**

| Function Name                                  | Description                                                                                                                                   | Features                                                                                                                                                                                    |
| ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **User Registration and Authentication** | Allows users to create accounts, log in, and manage their authentication credentials securely.                                                | \- Secure sign-up and login processes. \- Password recovery and reset mechanisms.                                                                                                           |
| **User Profile Management**              | Enables users to create and manage their personal profiles, including uploading and editing CVs.                                              | \- Profile creation with personal information fields. \- Editing capabilities for profile details such as name, email, and profile picture.                                                 |
| **CV Upload and Parsing**                | Allows users to upload their CVs, which are automatically parsed to extract relevant information using NLP techniques.                        | \- Support for uploading CVs in supported formats. \- Automated parsing of CV content to identify key skills, experience, education, and other details using the NLTK library.              |
| **Customized Job Recommendations**       | Generates personalised job recommendations by matching parsed CV data with job postings.                                                      | \- Clustering algorithms for relevant job matches. \- Recommends jobs tailored to the user's skills & experience.                                                                           |
| **Job Exploration and Search**           | Provides users with tools to browse, search, and filter available job postings.                                                               | \- Advanced search bar with keyword functionality. \- Filtering options based on location, salary, job type, experience level, and other criteria.                                          |
| **Data Seeding and Initialization**      | Automates the initial population of the database with job postings and other necessary data using CSV files and custom Django-admin commands. | \- Custom management commands to import data from CSV files. \- Error handling and logging during the data import process. \- Scheduled data updates to ensure job listings remain current. |

**Table 6: Product functions**

![Figure 3 - Goal Model Diagram](Diagrams/figure%203%20-%20Goal%20Model%20Diagram.png)

**\[Figure 3\]** \- Sample Goal Model (What We Hope to achieve)

Our goal model is divided into three tiers: business goals, usage goals, and system goals. The broad objectives that we intend to achieve for our users are represented by business goals. Usage goals represent the functionality provided to users and are developed directly from business objectives. System objectives, which are generated from usage goals, highlight the technical and quality components of the system. Decomposition is shown by the arrows, which show how each objective is generated from a higher-level goal.

## **2.3  User Characteristics**

**Job Seekers**The primary users of Opportunext are job seekers from a wide range of backgrounds, education levels, and work experiences. The platform is designed to accommodate this diversity, ensuring inclusivity and ease of use for all.

* **Education Level**Users may range from individuals with no formal education seeking entry-level jobs (e.g. retail, labour or service jobs) to highly educated professionals with advanced degrees (e.g. engineers, accountants, specialists)
* **Experience Level**The experience level of users will also vary. Experience levels might include entry-level job seekers, for example, recent graduates, mid-career professionals, and individuals with several years of experience looking to advance their careers, or experienced professionals seeking senior positions or niche opportunities in their respective fields.
* **Technical Expertise**
  Basic digital literacy and technology skills.

**Impact on System Design**

* **User Interface Design**
  The platform must feature a simple, intuitive interface to ensure accessibility for users with varying levels of technical expertise.

1. Simple navigation
2. Clear instructions for tasks such as uploading CVs or using filters
3. Displaying useful error messages
4. Minimising actions needed for key functionalities

* **Inclusivity**The platform must support users with different job-seeking preferences. Some users may find the job recommendation algorithm useful and helpful, while others may prefer manual search options.The platform must also be accessible to users with limited technical knowledge through simple navigation and clear instructions.
* **Accessibility Considerations**
  The design must cater to users with varying physical and technological access

1. Screen reader compatibility and keyboard navigation for users with disabilities
2. Optimisation for low-bandwidth connections to support users in rural or underserved areas

## **2.4  Constraints**

1. Regulatory Policies

* The system must comply with data protection regulations such as GDPR
* These regulation require secure storage of user data and mechanisms for users to manage their personal data

2. Technical Constraints

* CV’s and job descriptions will vary in format and quality, making accurate parsing challenging

3. Functional Constraints

* Must make sure recommendations are accurate and relevant
* Ensuring fast response times for recommendations
* The system might struggle to recommend jobs for niche or highly specific roles

4. Hardware Limitations

* Must provide sufficient processing power and memory to handle multiple concurrent users.

## **2.5 Assumptions and Dependencies**

**User Assumptions**

* Users will have access to internet and devices capable of running a modern web browser
* Users will provide accurate and complete CVs to achieve relevant job recommendations

**Technological Assumptions**

* The clustering algorithm will provide relevant recommendations to users

**Dependencies**

**Job Dataset Source**

* The system relies on an external Kaggle dataset for job postings and model training

**Full-Text Search Integration (Haystack)**

* The platform search function relies on Haystack for advanced search capabilities to index and retrieve job postings efficiently

**Internet Connectivity**

* The system depends on users having stable internet connections to access the platform.

**Security Frameworks**

* The system depends on standard security protocols (e.g. HTTPS ) to protect data in transit

**File Parsing Libraries**

* The system relies on external libraries ( e.g. NLTK ) to parse uploaded CV and job postings for keyword extraction

## **2.6 Apportioning of Requirements.**

**Advanced search filtering**
Filtering options based on location, salary, job type, experience level, and other criteria.

**CV format**
Accepting CVs in other formats like Docx and starting with only PDF.

**Mobile Website**
The mobile version of the design differs from the desktop not only in the size of the elements but also in the elements themselves (e.g. drag-and-drop elements may not be applicable to most phones)

# **3\.  Specific Requirements**

## **3.1 External Interfaces**

| Name              | Description                            | Source | Accuracy               | Timing           | Window Format            | Command Format                      | End Messages                  |
| :---------------- | :------------------------------------- | :----- | :--------------------- | :--------------- | :----------------------- | :---------------------------------- | :---------------------------- |
| login  Interface  | Users log in using email & password    | User   | 100% Accuracy required | 5 seconds        | login screen with fields | HTTP post to login API endpoint     | Success: “Login successful” |
| Sign-up Interface | Create new account with email/password | User   | Valid email format     | 5 seconds        | form with fields         | HTTP post to sign-up API endpoint   | “Account created”           |
| CV Upload         | Upload CV for parsing                  | User   | size 10 mb             | 5 seconds        | upload/ drag & drop      | HTTP post to CV upload API endpoint | “uploaded successfully.”    |
| Job Search        | Search for jobs using keywords         | User   | Valid keyword          | within 3 seconds | Search bar field         | HTTP get to jobs API endpoint       | "Error, no jobs found.”      |

**Table 7: User Interfaces**

| Name                | Description                  | Source            | Timing               | Formats         | Command Formats                     | End messages                |
| ------------------- | ---------------------------- | ----------------- | -------------------- | --------------- | ----------------------------------- | --------------------------- |
| Parsed CV Data      | Ouputs keywords from user CV | CV upload by User | 15 seconds at least  | String          | Backend process triggered by upload | N/A                         |
| Job recommendations | Job suggestions based on CV  | Parsed CV data    | Display within 2 min | Scrollable grid | HTTP get from the system            | “Error, provide CV fist.” |

**Table 8: System interfaces**

## **3.2 Functions**

![Figure 4 - Use Case Diagram](Diagrams/figure%204%20-%20Use%20Case%20Diagram.png)

**\[Figure 4\]** Use case diagram

The interaction among the user and the four primary capabilities of the system—User Registration, Login, Upload CV, and Search for Jobs—is shown in this use case diagram.

The user actor interacts with these use cases, supplying inputs such as email, password, and CV file. While the login use case verifies these credentials for account access, the user registration use case lets the user create an account by entering legitimate credentials.

Once logged in, the user can upload a CV, allowing the system to parse the CV for pertinent job information, and can then use keywords or filters to search for jobs with the system showing matching job ads. The dashed arrows show dependencies between use cases, meaning that some actions—like Upload CV and Search for Jobs—demand a prior login.

**3.2.1 USE CASE 1**

| Use case             | User Registration                                                                                                                                                                                                     |
| :------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ID                   | 3.2.1                                                                                                                                                                                                                 |
| Actor                | User                                                                                                                                                                                                                  |
| Trigger              | The user attempts to create an account on the site                                                                                                                                                                    |
| Pre-conditions       | The user has access to the registration page                                                                                                                                                                          |
| Post-conditions      | user account is created successfully                                                                                                                                                                                  |
| Success Scenario     | 1\. The user navigates to the registration page <br />2\. User provides valid email and password <br />3\. System validates the input data <br />4\. The system creates a new user account and stores the credentials |
| Quality Requirements | User credentials should be securely stored, and email verification should be successfully sent                                                                                                                        |

**Table 9: Use case 1**

![Figure 4.1 - Signup Sequence Diagram](Diagrams/figure%204.1%20-%20Signup%20%20Sequence%20Diagram.png)

**\[Figure 4.1\] \- Sign-up Sequence Diagram**


**3.2.2 USE CASE 2**

| Use case             | Login                                                                                                                                                                     |
| :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ID                   | 3.2.2                                                                                                                                                                     |
| Actor                | User                                                                                                                                                                      |
| Trigger              | The user attempts to login                                                                                                                                                |
| Pre-conditions       | User has an existing account                                                                                                                                              |
| Post-conditions      | User is logged into their account                                                                                                                                         |
| Success Scenario     | 1\. User enters email and password <br />2\. System checks if the credentials match existing records <br />3\. System logs the user in and redirects to the user homepage |
| Quality Requirements | System should respond within 3 seconds, and incorrect credentials should generate appropriate error messages                                                              |

**Table 10: Use case 2**


![Figure 4.2 - Login Sequence Diagram](Diagrams/figure%204.2%20-%20Login%20Sequence%20Diagram.png)

**\[Figure 4.2\] \- Login Sequence Diagram**


**3.2.3 USE CASE 3**

| Use case             | Upload CV                                                                                                                                                                                                                           |
| :------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ID                   | 3.2.3                                                                                                                                                                                                                               |
| Actor                | User                                                                                                                                                                                                                                |
| Trigger              | User attempts to upload a CV                                                                                                                                                                                                        |
| Pre-conditions       | User is logged in and navigates to the CV upload page                                                                                                                                                                               |
| Post-conditions      | CV is uploaded and processed for parsing                                                                                                                                                                                            |
| Success Scenario     | 1\. User selects a CV file (PDF, DOCX) <br />2\. System processes and parses the CV for relevant information <br />3. System stores parsed data for job recommendation purposes <br />4. System provides a confirmation to the user |
| Quality Requirements | CV file must be processed and parsed within a few seconds, and only valid file formats should be accepted                                                                                                                           |

**Table 11: Use case 3**


![Figure 4.3 - CV Upload Sequence Diagram](Diagrams/figure%204.3%20-%20CV%20Upload%20Sequence%20Diagram.png)

**\[Figure 4.3\] \- CV Upload Sequence Diagram**


**3.2.4 USE CASE 4**

| Use case             | Job Search                                                                                                                                                                                                    |
| :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ID                   | 3.2.4                                                                                                                                                                                                         |
| Actor                | User                                                                                                                                                                                                          |
| Trigger              | User enters a search query for job listings                                                                                                                                                                   |
| Pre-conditions       | User is logged in                                                                                                                                                                                             |
| Post-conditions      | A list of jobs matching the search criteria is displayed to the user                                                                                                                                          |
| Success Scenario     | 1\. User navigates to the job search page <br />2\. User enters keywords or filters for job search <br />3\. System performs a search in the job database <br />4\. System displays relevant jobs to the user |
| Quality Requirements | Search results should be returned within 3 seconds for most queries                                                                                                                                           |
**Table 12: Use case 4**


![Figure 4.4 - Job Search Sequence Diagram](Diagrams/Figure%204.4%20-%20Job%20Search%20Sequence%20Diagram.png)


**\[Figure 4.4\] \- Job Search Sequence Diagram**

## **3.3 Performance Requirements**

**Static Numerical Requirements**

1. Supported Users

* The system should support up to 100 concurrent users

2. Information to be Handled

* The system shall handle a dataset of about 30,000 job postings with associated metadata

3. Simultaneous API Requests

* The backend shall process up to 20 API requests per second without performance degradation

**Dynamic Numerical Requirements**

1. CV Parsing

* The system shall parse and store CV information within 15 seconds of CV upload

2. Job Recommendation Generation

* the system shall generate job recommendation for a user within 2 minutes of CV upload

3. Data Upload and Processing

* The system shall process uploaded CV within 15 seconds for files up to 10 MB

4. Search functionality

* The system shall return search results within 3 seconds for 90% of queries

## **3.4 Logical Database Requirements**

**3.4.1 Types of Information**

* User Data:

- Personal details
- Login credentials
- Users CV
- Users Skills ( tags ) extracted from the CV

* Job Data

- Job Title
- Job Description
- Job Location
- Job keywords ( tags )

**3.4.2 Data Entities and Their Relationships**
![Figure 5 - ERD Diagram](Diagrams/figure%205%20-%20ERD%20Diagram.png)

**\[Figure 5\] (ERD) represents a job recommendation system.**

**Entities**

* **User entity** represents the user and contains personal information
* **CV entity** contains the CV uploaded by the user
* **A job entity** contains job data such as title, description and location
* **Tag entity** stores the keywords used by user and job entities

**Relationships**

* 1 to 1 Relationship between User and CV to store CV of a user
* Many to Many User-Tag relationship to store tags associated with the user
* Many to Many Job-Tag Relationship to store tags associated with the Job
* Many to Many Recommendation relationship to represent jobs recommended to the user

**3.4.3 Database design considerations**

* Tag table

- Since both users and jobs will have tags associated with them, it was decided to make one table to use for both since jobs and users may also share some tags. This eliminates redundancy
- This also allows us to make many to many job-tag and user-tag relationships, which is a more scalable approach than storing tags associated with the user or job in their own respective tables. This should also lead to improved lookup times for tags by the system.

## **3.5 Design Constraints**

### **3.5.1  Standards Compliance**

  **Data Protection Standards:**

* The system must comply with GDPR for data privacy and security
* User data (e.g. CVs, profile info)

  **3.5.2 Hardware Constraints**
* The system shall be hosted locally on a device with at least 8 GB of RAM.

  **3.5.3 Security Requirements**

  **Authentication**
* The system must use secure authentication methods, such as hashed passwords and token-based authentication for APIs

  **Encryption**
* All communications between the frontend and backend must use HTTPS
* All sensitive data must  be encrypted using AES-256 for storage

  **3.5.4 Integration Constraints**
  **Backend and Frontend Framework**
* The system relies on React, Framer Motion, and Django and Tailwind frameworks for frontend and backend, respectively. Any updates to these frameworks must not break the system
* The system also uses ML model libraries like Scikit and Tensorflow.

  **3.5.5 Compatibility Constraints**
* The system must be compatible with modern browsers, such as Chrome, Firefox, and Safari (latest versions).
* The system must support responsive design to function seamlessly on desktop or mobile devices.

## **3.6 Software System Attributes**

### **3.6.1 Reliability**

| Attribute             | Details                                                                                                                                                                |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| NFR                   | Reliability as a non-functional requirement refers to the system's consistent and dependable operation over time without failure or unexpected behaviour.              |
| Rationale             | The system must provide uninterrupted services, ensuring that users can access and use features as needed, without unexpected crashes or downtimes.                    |
| Satisfaction Criteria | The system should maintain a Mean Time Between Failures (MTBF) of at least 60 days, ensuring seamless user experience and recovery from failures without loss of data. |
| Measurement           | Regular monitoring of system logs for unexpected failures, maintaining logs for any crashes, and calculating MTBF to ensure it meets the requirements.                 |

**Table 13: System Attributes \- Reliability**

### **3.6.2 Availability**

| Attribute             | Details                                                                                                                                                                                                      |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| NFR                   | Availability as a non-functional requirement means that the system should be accessible and operational for users as required, without disruptions.                                                          |
| Rationale             | Availability as a non-functional requirement means that the system should be accessible and operational for users as required, without disruptions.                                                          |
| Satisfaction Criteria | The system should guarantee 99.9% availability, ensuring minimal downtime and rapid recovery in the event of failures. The system should allow users to restart after failure without significant data loss. |
| Measurement           | Track system uptime and response times using uptime monitoring tools. Maintain system logs to determine recovery times in case of downtime and calculate overall availability.                               |

**Table 14: System Attributes \- Availability**

### **3.6.3 Security**

| Attribute             | Details                                                                                                                                                                                      |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| NFR                   | Security as a non-functional requirement involves protecting the system from unauthorised access, data breaches, and ensuring data integrity and confidentiality.                            |
| Rationale             | To maintain user trust, the system must ensure user data security and confidentiality. Secure handling of user credentials, uploaded documents, and other personal information is paramount. |
| Satisfaction Criteria | Passwords should be hashed and salted. Access should be restricted based on user roles.                                                                                                      |
| Measurement           | vulnerability assessments, and monitoring for suspicious activities.                                                                                                                         |

**Table 15: System Attributes \- Security**

### **3.6.4 Maintainability**

| Attribute             | Details                                                                                                                                                                              |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| NFR                   | Maintainability refers to the ease with which the system can be updated, modified, and repaired without significant downtime or complications.                                       |
| Rationale             | To ensure future changes, bug fixes, and feature enhancements can be carried out easily. Maintainability helps ensure longevity and adaptability of the system.                      |
| Satisfaction Criteria | The system should use a modular architecture with well-documented code. Each module should be easily replaceable or upgradable without significant impact on the rest of the system. |
| Measurement           | Measure the time and complexity of adding new features or fixing bugs. Use metrics like change request processing time and number of dependencies between modules.                   |

**Table 16: System Attributes \- Maintainability**

### **3.6.5 Portability**

| Attribute             | Details                                                                                                                                                                        |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| NFR                   | Portability refers to the ability to transfer the software from one environment to another, ensuring compatibility across different platforms and systems.                     |
| Rationale             | To ensure the system can be deployed in different environments, such as local servers, cloud-based servers, or different operating systems.                                    |
| Satisfaction Criteria | The system should be containerised using Docker to ensure easy deployment on multiple platforms, including Windows, Linux, and macOS, with at least 95% code portability.      |
| Measurement           | Test the system across various environments and platforms to evaluate compatibility. Use metrics like the number of environment-specific issues encountered during deployment. |

**Table 17: System Attributes \- Portability**

4. # **Change Management Process**

The process diagram depicts an iterative lifetime with increments, emphasising our systematic approach to managing changes. By following a cycle of analysis, planning, implementation, and testing, we ensure that each change is thoroughly reviewed for its impact and efficiently integrated into the system. This iterative strategy allows for continual improvement, risk management, and validation at all stages.

![Figure 6 - Process Management Diagram](Diagrams/figure%206%20-%20Process%20Management%20Diagram.png)

**\[Figure 6\]** Process Management Diagram

5. # **Document Approvals**

*Identify the approvers of the SRS document. Approver name, signature, and date should be used.*

**Supervisor:** Michael Scriney

**Date:** 28/11/2024

6. # **Supporting Information**

**APPENDIX**

### **List of Figures:**

1. **Figure 1:** System Architecture Diagram Showcasing the System Interfaces.
2. **Figure 2.1:** Initial Home Page Wireframe Before User Logs In.
3. **Figure 2.2:** Wireframe Implementation of Sign-Up and Login Pages.
4. **Figure 2.3:** Wireframe of the Navigation Panel.
5. **Figure 2.4:** Implementation of the Logged-In User Interface.
6. **Figure 2.5:** CV Upload Section.
7. **Figure 2.6:** Sample Design of Profile Management.
8. **Figure 2.7:** Job Listings Page Wireframe.
9. **Figure 2.8:** Recommendations Page.
10. **Figure 3:** Sample Goal Model (What We Hope to Achieve).
11. **Figure 4:** Use Case Diagram.
12. **Figure 4.1:** Sipn-up Sequence Diagram.
13. **Figure 4.2:** Login Sequence Diagram.
14. **Figure 4.3:** CV upload Sequence Diagram.
15. **Figure 4.4:** Job Search Sequence Diagram.
16. **Figure 5:** Entity-Relationship Diagram (ERD) Representing a Job Recommendation System.
17. **Figure 6:** Process Management Diagram.

---

**List of Tables:**

1. **Table 1**: Definitions, Acronyms, and Abbreviations.
2. **Table 2**: External System Interfaces.
3. **Table 3**: Internal System Interfaces.
4. **Table 4**: External Software Interfaces.
5. **Table 5**: Internal Software Interfaces.
6. **Table 6**: Product Functions.
7. **Table 7**: User Interfaces.
8. **Table 8**: System Interfaces.
9. **Table 9**: Use Case 1 \- User Registration.
10. **Table 10**: Use Case 2 \- Login.
11. **Table 11**: Use Case 3 \- Upload CV.
12. **Table 12**: Use Case 4 \- Job Search.
13. **Table 13**: System Attributes \- Reliability.
14. **Table 14**: System Attributes \- Availability.
15. **Table 15**: System Attributes \- Security.
16. **Table 16**: System Attributes \- Maintainability.
17. **Table 17**: System Attributes \- Portability.

# **7\. Schedule**

![Figure 7 - Gantt Chart Diagram](Diagrams/figure%207%20-%20Gantt%20Chart%20Diagram.png)

**\[Figure 7\] \- Gantt Chart Diagram**

**UI/UX Design & Planning (25 Nov \- 2 Dec)**

***Alex:***

* **Task A:** Research UI trends and best practices.
* **Task B:** Create wireframes and initial layout designs.

***Mahmoud:***

* **Task C:** Develop mockups for key pages.
* **Task D:** Collaborate with stakeholders to finalize design features.

**Database Setup and Backend Planning (15 Dec \- 30 Dec)**

***Alex:***

* **Task A:** Set up database schema.
* **Task B:** Implement MySQL integration.

***Mahmoud:***

* **Task C:** Plan backend API endpoints.
* **Task D:** Document database requirements.

**User Authentication System (15 Dec \- 17 Dec)**

***Alex:***

* **Task A:** Set up authentication using Django.***Mahmoud:***
* **Task B:** Implement user registration and login.

**Frontend Development Setup (17 Dec \- 1 Jan)**

***Alex:***

* **Task A:** Set up React environment.
* **Task B:** Integrate Tailwind CSS.

***Mahmoud:***

* **Task C:** Develop reusable components.
* **Task D:** Establish routing and page navigation.

**CV Upload and Parsing Feature (29 Dec \- 10 Jan)**

***Alex:***

* **Task A:** Implement file upload feature.
* **Task B:** Develop UI for uploading CV.

***Mahmoud:***

* **Task C:** Integrate NLP parsing using NLTK.
* **Task D:** Store parsed data into the database.

**Job System Recommendation Development (20 Dec \- 15 Jan)**

***Alex:***

* **Task A:** Train machine learning model for recommendations.

***Mahmoud:***

* **Task B:** Implement a model API for job recommendations.

**Frontend Integration (27 Dec \- 30 Jan)**

***Alex:***

* **Task A:** Connect frontend with backend API.

***Mahmoud:***

* **Task B:** Develop user dashboard for viewing job recommendations.

**Advanced Search and Filtering Features (5 Jan \- 18 Jan)**

***Alex:***

* **Task A:** Add filtering options for job listings.

***Mahmoud:***

* **Task B:** Integrate Haystack for advanced search.

**Testing & Bug Fixing (1 Jan \- 2 Feb)**

***Alex:***

* **Task A:** Conduct unit testing on frontend components.

***Mahmoud:***

* **Task B:** Perform integration testing for backend APIs.

**Final Adjustments & Integration (1 Feb \- 20 Feb)**

***Alex:***

* **Task A:** Fine-tune the frontend UI.

***Mahmoud:***

* **Task B:** Resolve issues from user testing.

**Project Demonstration (24 Feb \- 28 Feb)**

***Alex:***

* **Task A:** Prepare demo environment.
* **Task B:** Present system features.

***Mahmoud:***

* **Task C: Assist in Q\&A during demonstration.**
