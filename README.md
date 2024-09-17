# Purrfect Match Cat Adoption Web App

[![Amplify Status](https://img.shields.io/badge/amplify-aws-orange)](https://aws-amplify.github.io/)

The **Purrfect Match** Cat Adoption Web App is a React-based web application built with AWS Amplify. This application helps connect cat lovers with cats available for adoption. It allows users to browse, search, and filter through available cats, as well as manage user authentication for both adopters and administrators.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup](#setup)
- [Usage](#usage)
- [GraphQL Schema](#graphql-schema)
- [Contributing](#contributing)
- [License](#license)

## Overview

This project was developed as part of a cat adoption platform that allows users to:

- Browse and view cats available for adoption.
- Filter cats based on breed, age, and gender.
- Sign up or log in using AWS Cognito authentication.
- View detailed profiles of each cat, including images and descriptions.
- Administrators can add or update cat profiles via the GraphQL API.

## Features

- **Authentication**: Secure login and signup using AWS Amplify and Cognito.
- **GraphQL API**: Use AWS Amplify's GraphQL API to perform CRUD operations on cat profiles.
- **DynamoDB**: Store cat data, such as breed, age, description, and availability, in DynamoDB.
- **Responsive Design**: The web app is responsive and mobile-friendly.
- **Real-time Updates**: Subscriptions are used to update the UI in real time when new cats are added.

## Technologies Used

- **Frontend**:
  - [React](https://reactjs.org/)
  - [Ant Design](https://ant.design/) for UI components
  - [AWS Amplify](https://aws.amazon.com/amplify/) for authentication, API, and hosting
  - [GraphQL](https://graphql.org/) for API queries and mutations

- **Backend**:
  - AWS Amplify
  - AWS Cognito (for authentication)
  - AWS DynamoDB (for database)
  - AWS AppSync (for GraphQL API)

## Setup

### Prerequisites

- **Node.js** and **npm** or **yarn** installed
- AWS Amplify CLI installed globally: `npm install -g @aws-amplify/cli`

### Clone the Repository

```bash
git clone https://github.com/ervenderr/Purrfect-Match-Cat-Adaption-Web-App-AWS-Amplify.git
cd Purrfect-Match-Cat-Adaption-Web-App-AWS-Amplify
