Dynamic Gold Carding Module Design Document
===

Demo: https://youtu.be/GKwWbeGyAKw
Live demo: https://goldcard.vercel.app/payers
Backend spec: https://testwork-g1it.onrender.com/
Repo: https://github.com/AbhinavMir/testwork

## Introduction

The Dynamic Gold Carding Module is designed to streamline the prior authorization (PA) process for high-performing healthcare providers. This document outlines the system architecture, database schema, API endpoints, and frontend pages required to implement the module.

## System Architecture
- [x] Backend: Node.js and Express.js server for handling API requests and database operations
- [x] Database: PostgreSQL for storing provider, payer, and gold carding-related data
- [x] Frontend: React.js for building the user interface - used Next JS for routing
- [x] Authentication: JSON Web Tokens (JWT) or sessions for user authentication and authorization
- [x] Cron Job: node-cron for automating the gold carding evaluation process

## Database Schema
- [x] providers table: stores healthcare provider information
- [x] cpt-code table: stores CPT codes relevant to gold carding
- [x] payer table: stores information about payers
- [x] gold_carding_criteria table: defines gold carding criteria
- [x] provider_gold_carding_status table: tracks providers' gold carding status
- [x] gold_carding_evaluation_results table: stores the results of gold carding evaluations

## API Endpoints
### Providers
- [x] POST /providers - Create a new provider
- [x] GET /providers - Get a list of all providers
- [x] GET /providers/:id - Get a specific provider by ID
- [x] PUT /providers/:id - Update a provider's information
- [x] DELETE /providers/:id - Delete a provider

### Payers
- [x] POST /payers - Create a new payer
- [x] GET /payers - Get a list of all payers
- [x] GET /payers/:id - Get a specific payer by ID
- [x] PUT /payers/:id - Update a payer's information
- [x] DELETE /payers/:id - Delete a payer

### CPT Codes
- [x] POST /cpt-codes - Create a new CPT code
- [x] GET /cpt-codes - Get a list of all CPT codes
- [x] GET /cpt-codes/:id - Get a specific CPT code by ID
- [x] PUT /cpt-codes/:id - Update a CPT code
- [x] DELETE /cpt-codes/:id - Delete a CPT code

### Gold Carding Criteria
- [x] POST /gold-carding-criteria - Create new gold carding criteria
- [x] GET /gold-carding-criteria - Get a list of all gold carding criteria
- [x] GET /gold-carding-criteria/:id - Get specific gold carding criteria by ID
- [x] PUT /gold-carding-criteria/:id - Update gold carding criteria
- [x] DELETE /gold-carding-criteria/:id - Delete gold carding criteria

### Gold Carding Evaluations
- [x] POST /gold-carding-evaluations - Trigger a gold carding evaluation for a provider
- [x] GET /gold-carding-evaluations - Get a list of all gold carding evaluations
- [x] GET /gold-carding-evaluations/:id - Get a specific gold carding evaluation by ID

## Frontend Pages
- [x] Login Page - Allow users to log in to the system
- [x] Dashboard - Display an overview of the system, including key metrics and recent evaluations
- [x] Providers Page - Show a list of all providers with options to add, edit, or delete providers
- [x] Provider Details Page - Display detailed information about a specific provider, including their gold carding status and evaluation history
- [x] Payers Page - Show a list of all payers with options to add, edit, or delete payers
- [x] Payer Details Page - Display detailed
