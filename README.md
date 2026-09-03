## 🚀 StartupForge 

StartupForge is a full-stack startup team-building platform that connects startup founders with skilled collaborators. Founders can publish startup ideas, create opportunities, review applications, and build their teams, while collaborators can discover opportunities, apply to teams, and manage their applications.

The platform also includes role-based dashboards for Founders, Collaborators, and Admins, secure authentication, Stripe payments, server-side pagination, search/filtering, and a responsive modern UI.

🌐 Project Overview

StartupForge creates a bridge between startup founders and talented developers, designers, marketers, and other professionals.

👨‍💼 Founder
Create and manage startup profiles
Publish team opportunities
Manage opportunities
Review collaborator applications
Accept or reject applicants
Purchase premium packages through Stripe when required
View startup and team statistics
👨‍💻 Collaborator
Browse startups and opportunities
Search opportunities
Filter opportunities
View opportunity details
Apply to opportunities
Track application status
Manage personal profile
🛡️ Admin
View platform statistics
Manage users
Block/unblock users
Approve/remove startups
Manage platform transactions
Monitor overall platform activities
✨ Key Features
🔐 Authentication & Authorization
Better Auth authentication
Email/password authentication
Google authentication
Secure authentication using environment variables
Role-based access control
Founder, Collaborator, and Admin roles
Protected private routes
JWT Authentication



The Browse Opportunities page supports:

Search

Users can search opportunities by:

Role title
Required skills


Filtering

Users can filter opportunities by:

Work type
Industry


📄 Server-Side Pagination

Server-side pagination has been implemented on the Browse Opportunities page.

# 👨‍💼 Founder Dashboard

The Founder Dashboard contains:

Overview
Total opportunities
Total applications
Accepted members
Startup statistics
My Startup
Create startup
View startup
Update startup
Delete startup
Add Opportunity

Founders can create new opportunities with:

Role title
Required skills
Work type
Commitment level
Deadline
Manage Opportunities
View opportunities
Edit opportunities
Delete opportunities
Applications
View applications
Accept applicants
Reject applicants
Update application status
# 👨‍💻 Collaborator Dashboard

The Collaborator Dashboard contains:

Overview

Provides a summary of the collaborator's activities.

My Applications


Collaborators can update:

Name
Profile image
Skills
Bio
# 🛡️ Admin Dashboard

The Admin Dashboard provides platform-level management.

Overview

Displays:

Total users
Total startups
Total opportunities
Total revenue
Manage Users

Admins can:

View users
Block users
Unblock users
Manage Startups

Admins can:

View startups
Approve startups
Remove startups
Transactions

Admins can view:

User
Payment amount
Transaction date
Payment status

🛠️ Technologies Used
# Frontend
Next.js
JavaScript
Tailwind CSS
Responsive UI components
# Backend
Express.js
MongoDB
JWT Authentication
HTTPOnly Cookies
Middleware-based authorization

The frontend and backend are deployed separately with production-ready configuration.



This project was created for educational and assessment purposes.