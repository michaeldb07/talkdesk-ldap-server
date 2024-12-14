# Talkdesk LDAP Directory Sync

## Overview
Service that synchronizes phone numbers and their friendly name between Talkdesk and LDAP. As Talkdesk is a CCaaS solution Agent do not typically have assigned phone numbers but are assigned to Studio flows and then routing assignments to Agents occur within a studio flow via conditional statments or the use of functions with case statements. This service requires the phone number to have a friendly name. The removal of a friendly name and use of the sync API endpoint would remove the phone number entry from LDAP directory.

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
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
Create a .env file with the following variables:
```bash
PORT=3000
LDAP_URL=ldap://localhost:389
LDAP_BIND_DN=cn=admin,dc=local,dc=dev
LDAP_BIND_PASSWORD=admin
TALKDESK_CLIENT_ID=your-client-id
TALKDESK_CLIENT_SECRET=your-client-secret
```

4. Initialize LDAP directory:
```bash
node  src/setup/init-ldap.js
```

5. Start the server:
```bash
node src/server.js
```

## Michael Brown - Principal Solution Architect
