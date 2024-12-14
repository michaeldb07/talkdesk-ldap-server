# Talkdesk LDAP Directory Sync

## Overview
Service that synchronizes phone directory information between Talkdesk and LDAP, maintaining friendly names and phone numbers in a centralized directory.

## System Architecture
### Components
- Express Server: Handles API endpoints and business logic
- LDAP Service: Manages directory operations
- Talkdesk Service: Integrates with Talkdesk API

### Data Flow
1. Talkdesk API provides phone data
2. Sync process filters and transforms data
3. LDAP directory updates with valid entries

## API Documentation
### Endpoints
- GET /api/phones/phones
  - Returns all phone entries from LDAP directory
  - Response: Array of phone objects with numbers and friendly names

- POST /api/phones/sync
  - Synchronizes phone data between Talkdesk and LDAP
  - Response: Operation results including added, skipped, and deleted counts

- GET /health
  - Basic health check endpoint
  - Response: Status OK

## Setup Guide
### Prerequisites
- Node.js
- OpenLDAP Server
- Talkdesk API Credentials

### Installation
1. Clone the repository:
```bash
git clone [repository-url]
cd talkdesk-ldap-directory

2. Install dependencies:
npm install

3. Configure environment variables:
Create a .env file with the following variables:
PORT=3000
LDAP_URL=ldap://localhost:389
LDAP_BIND_DN=cn=admin,dc=local,dc=dev
LDAP_BIND_PASSWORD=admin
TALKDESK_CLIENT_ID=your-client-id
TALKDESK_CLIENT_SECRET=your-client-secret

4. Initialize LDAP directory:
node  src/setup/init-ldap.js

5. Start the server:
node src/server.js

