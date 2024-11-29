# 🚀 Notification Handler Service
A **TypeScript-based notification handler built with AWS SAM** that processes email and SMS notifications using AWS Lambda, Amazon SES, and Amazon SNS.

***
## 📚 Table of Contents

- [Project Overview](#-project-overview)
- [Folder Structure](#-folder-structure)
- [Prerequisites](#️-prerequisites)
- [Quick Start](#-quick-start)

***

## 📋 Project Overview
This project demonstrates a notification system using AWS SAM and TypeScript. The system processes two types of notifications:

**1. Email Notifications:** Sent using Amazon Simple Email Service (SES).
**2. SMS Notifications:** Sent using Amazon Simple Notification Service (SNS).

***
## 📁 Folder Structure

```bash
  source/
  ├── package.json            # Dependencies and scripts
  ├── template.yaml           # SAM template for AWS resources
  ├── tsconfig.json           # TypeScript configuration
  ├── handler.ts              # Lambda entry point
  ├── notification/
  │   ├── email.ts            # Email notification logic
  │   ├── sms.ts              # SMS notification logic
  │   ├── processor.ts        # Notification processing logic
  │   ├── types/              # TypeScript interfaces and types
  │   │   └── index.ts
  │   ├── utils/              # Utility functions
  │       └── index.ts
  ├── tests/                  # Unit tests
  │   └── ...                 # Test files
  ├── dist/                   # Compiled output
  ├── .aws-sam/               # SAM build artifacts
  ├── events/                 # Sample event payloads
  └── node_modules/           # Dependencies
```

***

## 🛠️ Prerequisites
* **Node.js** (version 18 or higher)
* **AWS CLI** installed and configured with your credentials
* **AWS SAM CLI** installed
* **TypeScript** installed globally (npm install -g typescript)
* **Amazon SES** setup:
  * A verified email in Amazon SES (sandbox or production mode).
* **Amazon SNS** setup:
  * Ensure permissions to publish messages to an SNS topic.

### 🔑 Configuration Notes
* **Email Configuration:**
  * Update ``senderEmail`` in ``notification/email.ts`` with your verified SES email.
* **SNS Permissions:**
  * Ensure that the Lambda role allows ``SNS:Publish`` to your desired topic.

***

## 🚀 Quick Start

**1. Clone the repository**
```bash
git clone https://github.com/mvelezg99/notification-aws-handler.git
cd source
```

**2. Install dependencies**
```bash
npm install
```

**3. Build the project 🔨**
```bash
npm run build
```

**4. Build the SAM application 💻**
```bash
npm run sam:build
```

**5. Start the local SAM application 🚀**
```bash
npm run sam:start
```

**6. Test the lambda function 🤓**
Use a tool like Postman or cURL to test the Lambda function locally.
* Endpoint: ``http://127.0.0.1:3000/notifications``
* Method: ``POST``
* **Body Example:**
```js
// For Email
{
  "type": "email",
  "id": "1",
  "timestamp": "2024-12-01T12:00:00Z",
  "recipient": "recipient@example.com",
  "subject": "Hello",
  "body": "This is a test email."
}
```

```js
// For SMS
{
  "type": "sms",
  "id": "2",
  "timestamp": "2024-12-01T12:00:00Z",
  "phoneNumber": "+1234567890",
  "message": "This is a test SMS."
}
```

