<!--<div id="pageHeader">** PRCO304 - Elliot Blackburn**</div>-->
# Project Initiation Document

## 1. Introduction

Feature flags, usage analytics, and exception logging are just some of the many modern software engineering tools. Many teams end up building their own solutions early on in projects. This is because larger solutions are often too narrow which can result in a myriad of solutions, or they can be very expensive which can result in a large investment for new projects. As a result many teams and organisations fall back to building their own systems which accommodate their specific needs and can be built on over time. This approach works really well if you are a team of experienced web developers, but it can be very inaccessible as an individual or small team of mobile developers.

This projects aim is to create a solution to this problem for mobile and game developers in the form of a minimal viable product (MVP). The product will give developers a platform which handles user accounts, user sessions, and application feature flags. There is also potential for expansion into a fourth feature such as usage analytics or crash reporting.

## 2. Market for the Solution

<!-- Discuss what the market is, why it's there, and what key players are around it -->
This project is not bespoke and thus has no single client, instead it is aimed at a mass market of individuals with the potential for enterprise users as well.

<!-- Point out that the project will be aimed towards building an open source platform rather than closed source -->

## 3. Project Objectives

1. Analyse existing products in the developer tooling market which offer features such as: feature flagging, account management, session management, usage analytics, and crash reporting. Note the pros and cons of open source solutions.
2. Scope out project milestones which will work towards a minimal viable product.
3. Analyse development tools and environments and decided on a technology stack that would best accommodate the solution.
4. Build a software solution which makes it gives easy access to modern software engineering tools for mobile and game developers who do not have expert web engineering expertise.

## 4. Initial Scope

The initial scope of this project is small with a view to creating a minimal viable product in an attempt to achieve product/market.

The term "developer" and "administrator" refer to types of people on a mobile or game development project. They would be the target customers of this product. The term "user" in this section refers to one of the developers / administrators customers that may be using their application.

1. A selection of currently successful modern tools which aim to help developers create a high quality product will be chosen. Their positives and negatives will be explored and noted to help guide my product design.
3. Select appropriate technologies and libraries that will help to speed up the development process. This should reduce the chances that I will "re-invent the wheel" during the project. It will also be vital for creating a product which can expand and scale in the future.
4. The proposed MVP will allow
  1. The developer to setup the initial application by creating an initial administrator account.
  3. Administrators and developers to generate a single set of API keys.
  4. Administrators and developers create, edit, and delete feature flags with arbitrary names.
  5. Those feature flags to be toggled on and off using various flags.
  6. Anyone to register an account.
  7. Administrator to assign accounts the rights of an administrator or developer.
  8. API calls to be made to handle authentication and session management for both users and developers/administrators.
  9. An API call to be made to check the status of an individual feature flag, or all feature flags, for the current authenticated user.
5. Make changes to the system design and interfaces based upon feedback from teams / individual developers that may find this system useful.

## 5. Method of Approach

To create this application, I will need to adopt a development workflow which will allow me to ensure that milestones are completed correctly and on time. This will also help to ensure that a high quality system is output, this is further discussed in section 8.

### 5.1 Methodology and Workflow

I will be combining my experience in both open source and commercial software for my projects methodology and my general workflow. As my main task management methodology I will be using Kanban. It's a very light weight methodology which allows for great speed and very last minute change which is important on a small project with a small team.

To compliment this, I will also be using a light-weight workflow for completing the tasks that come through the Kanban process. The workflow I've chosen is a customisation is GitHub Flow, it takes from general open source practices and has essentially just formalised and documented it. As the workflow is partially built around discussion, I will have to make modifications as this is an independent project. As a result I will be removing "discuss and review" stage and instead I will be replacing it simply with a continuous integration (CI) process. This will run my automated tests and at least provide validation that my system has not been broken as a result of changes.

### 5.2 Potential technologies and tools

The following are potential technologies and tools that may be used to complete this project.

* Git - For project version control
* GitHub - As a central repository host and as a project management system by making use of the Issues, Pull Requests, and Projects features.
* Node.js + Express.js - For the main server-side application for managing the core business logic of the application as well as serving up web based user interfaces and serving API calls.
* Ember.js - As the "developer panel" for managing things such as feature flags.
* Nginx - To act as the reverse-proxy for the main application to aid with security and optimisation.
* Ubuntu - The operation system that the main application will run on
* Vagrant - For a developer environment which can easily be rebuilt.
* Puppet - Provisioning scripts for the vagrant environment.
* MySQL - Persistent relational data storage.
* Redis - Session store
* Npm - Package manager for importing node.js libraries.
* Mocka + Should.js - Testing framework and assertion library for automated tests.
* Grunt - As a general task automation system for things such as running tests or generating static assets.
* Amazon Web Services - To host a production-like environment for testing and development.
* Wercker - A continuous integration service for running unit tests and triggering deployments.

A full and proper evaluation will take place during the span of the project and any of those listed above may change.

## 6. Project Plan

<table id="projectPlan">
  <tr>
    <th>Stage</th>
    <th>Expected Start Date</th>
    <th>Expected End Date</th>
    <th>Product of Stage</th>
  </tr>
  <tr>
    <td>Initiation</td>
    <td>N/A</td>
    <td>20<sup>th</sup> Dec 2016</td>
    <td>Project Initiation Document</td>
  </tr>
  <tr>
    <td>Investigation and analysis</td>
    <td>30<sup>th</sup> Jan 2017</td>
    <td>1<sup>st</sup> Feb 2017</td>
    <td>Analyse and investigate current products. Document features, design, development techniques, and technology stacks.</td>
  </tr>
  <tr>
    <td>Research technology stacks</td>
    <td>2<sup>nd</sup> Feb 2017</td>
    <td>8<sup>th</sup> Feb 2017</td>
    <td>Research technology stacks and environments that will help to develop the MVP quickly and easily.</td>
  </tr>
  <tr>
    <td>High level product design</td>
    <td>9<sup>th</sup> Feb 2017</td>
    <td>17<sup>th</sup> Feb 2017</td>
    <td>Fleshed out software architecture. Rough API documentation to build to. Style guide and wireframes for web interfaces. Initial database schema.</td>
  </tr>
  <tr>
    <td>Development increment 1</td>
    <td>20<sup>th</sup> Feb 2017</td>
    <td>6<sup>th</sup> March 2017</td>
    <td>User account management </td>
  </tr>
</table>

### 6.1 Outline of project schedule

### 6.2 Control Plan

### 6.3 Communication Plan

## 7. Project Risk

## 8. Solution Quality Outline

### 8.1 Overall Solution Quality

### 8.2 Usability Testing

### 8.3 Functional Testing

## 9 Legal, Ethical, and Professional Issues

### 9.1 University Ethics Policy

### 9.2 Module Ethics Approval

### 9.3 Further Considerations
