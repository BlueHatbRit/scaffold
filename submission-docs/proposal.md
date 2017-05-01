# Project Proposal

## Keywords

Web application, HTTP API, mobile SDK

## Problem area

Web development has come forward leaps and bounds with deployment and prototyping tools over the last decade. Web engineers now have access to feature flagging, easy user systems, exception tracking, analytics, build servers, deployment services, and so many more tools. Mobile and game development on the other hand hasn't advanced nearly as far with it's tooling. Most of these tools are dependant on solid user account systems, something which many mobile developers struggle with. There are very few of brands of these tools which are designed for mobile or game infrastructure.

## Product

This product will be a chain of development tools centred around a user account service aimed at mobile and game developers. The tool will be open source so developers can easily deploy and manage it themselves, but without needing the up-to-date knowledge to build secure web systems.

The product will have a web interface and an API with room for expansion into SDKs for platforms like Xamarin, Unity3D, and React-Native.

## Final deliverables

The toolchain can be compiled in a very iterative fashion which means that the core deliverables can be few in number. This leaves plenty of room to then build upon the product as a platform. The initial deliverables will be:

* A user account service where the applications users can register, and staff can view basic account details. This service will securely store user data.
* User account types for creating "staff" or "pro" user definitions.
* An API for user session creation and management.
* Simple "on/off" feature flag creation and deletion through web interface.
* Account type based feature flags (to "staff ship" features, or enable for pro-users only, etc).
* API call to request the status of a particular feature for the authenticated user.
* API call to request the status of all features for the authenticated user.

## Expansion deliverables

If the core deliverables above are all met and time permits, then the following is a priority ordered list of features that may also be added to the product.

* Population based feature flags. This will enable a developer to ship a feature to 10% of a user base for example.
* API call to log exceptions with al ink to the user that triggered them.
* Web interface to view logged exceptions and their details.
* "Feature usage" analytics API to allow a developer to log when a user makes use of a praticular feature.
* Web interface to view analytic results and breakdowns.
* Beta user signup page to allow current users to be either invited or openly join the beta programme.
* API calls to support beta programme (request the status of the user).
* Platform SDKs - To help developers make use of the product with a smaller learning curve. IE: Xamarin, Unity3D, React-Native, etc.

## Approach and workflows

As the project will have one developer, a full blown agile framework like SCRUM would not be appropriate. Instead, I'll be employing a methodology which still steers towards the agile principles but with a lot less friction. I'll be making use of GitHub Flow and using a branch/pull request based workflow, this will fit in well with my usage of Git and GitHub for version control and documentation. I'll be making use of issues and milestones or organise my work and ensure my workflow is visible.

This will also perfectly set the project up to be open sourced at the end of the project should I be able to secure university permission to do so.

## Suggested technologies

There are a number of technologies I am very familiar with which could be used to create this application and API. Below I've listed all the technologies and their role in the project. For some roles I've suggested multiple potential technologies to give myself options.

### Server frameworks and technologies

* Node.js + Express.js - Core web server logic for serving up the web application and serving API requests.
* Ruby + Ruby On Rails - Core web server logic for serving up the web application and serving API requests.

### Data storage

* MySQL - Persistent data storage for things like user accounts, and feature flags.
* PostgreSQL - Persistent data storage for things like user accounts, and feature flags.
* Redis - To act as a session store for persistent sessions. This will enable me to offer other session options than just web cookies.
* MongoDB - Data storage for large data sets like analytics or exception logs.
* DynamoDB - Data storage for large data sets like analytics or exception logs.

### DevOps tooling

* Travis-CI - A CI server which favours non-container based apps.
* Wercker - A CI server which favours container based apps.
* Amazon AWS - Server infrastructure for testing the application.
* Heroku - A server infrastructure for testing the application.
* Git - Project version control.
* GitHub - Centralised version control node and project management.
* BitBucket - Centralised version control node and project management.

## Requirements

For the majority of the development I won't need any additional hardware. However I may need to seek financial support for server infrastructure through services like Amazon AWS or DigitalOcean to test the services properly.

I will also need ethical approval to collect user data during the testing of this application. I will no doubt need to develop a small mobile application to demonstrate the deliverable. This will include the collection and secure storage of user data.

## Risks

The core risks to the project are mostly the project not completing due to poor time estimates on my part. As this is all work I've done for two years in the industry, I feel my estimates will be fairly reasonable and I'm not very worried about this being a prevalent issue. To ensure this is the case I'll be using milestones with my tasks to ensure I'm on track with work early on.

The other risk is data protection, but this can be properly solved through correct use of data hashing and encryption. For example, passwords would need to be hashed using something such as BCrypt before being stored in the database.
