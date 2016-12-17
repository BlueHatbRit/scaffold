# Scaffold - Project Initiation Document
** PRCO304 - Elliot Blackburn**

## 1. Introduction

Feature flags, usage analytics, and exception logging are just some of the many modern software engineering tools. Many teams end up building their own solutions early on in projects. This is because larger solutions are often too narrow which can result in a myriad of solutions, or they can be very expensive which can result in a large investment for new projects. As a result many teams and organisations fall back to building their own systems which accommodate their specific needs and can be built on over time. This approach works really well if you are a team of experienced web developers, but it can be very inaccessible as an individual or small team of mobile developers.

This projects aim is to create a solution to this problem for mobile and game developers in the form of a minimal viable product (MVP). The product will give developers a platform which handles user accounts, user sessions, and application feature flags. There is also potential for expansion into a fourth feature such as usage analytics or crash reporting.

## 2. Market for the solution

<!-- Discuss what the market is, why it's there, and what key players are around it -->
This project is not bespoke and thus has no single client, instead it is aimed at a mass market of individuals with the potential for enterprise users as well.

<!-- Point out that the project will be aimed towards building an open source platform rather than closed source -->

## 3. Project objectives

1. Analyse existing products in the developer tooling market which offer features such as: feature flagging, account management, session management, usage analytics, and crash reporting. Note the pros and cons of open source solutions.
2. Scope out project milestones which will work towards a minimal viable product.
3. Analyse development tools and environments and decided on a technology stack that would best accommodate the solution.
4. Build a software solution which makes it gives easy access to modern software engineering tools for mobile and game developers who do not have expert web engineering expertise.

## 4. Initial scope

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

## 5. Method of approach

To create this application, I will need to adopt a development workflow which will allow me to ensure that milestones are completed correctly and on time. This will also help to ensure that a high quality system is output, this is further discussed in section 8.

### 5.1 Methodology and workflow

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

## 6. Project plan

### 6.1 Outline of initial project schedule

<table>
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
    <td>10<sup>th</sup> March 2017</td>
    <td>Account creation via web interface and session management via web interface and Rest API</td>
  </tr>
  <tr>
    <td>Development increment 2</td>
    <td>13<sup>th</sup> March 2017</td>
    <td>31<sup>st</sup> March 2017</td>
    <td>Feature flag management via web interface and querying via Rest API</td>
  </tr>
  <tr>
    <td>User testing and debugging</td>
    <td>3<sup>rd</sup> April 2017</td>
    <td>7<sup>th</sup> April 2017</td>
    <td>Gather (potential) user feedback. Based on that feedback, create a plan of potential changes to the product.</td>
  </tr>
  <tr>
    <td>Development increment 3 (optional)</td>
    <td>10<sup>th</sup> April 2017</td>
    <td>21<sup>st</sup> April 2017</td>
    <td>Implement product changes derived from user feedback.</td>
  </tr>
  <tr>
    <td>Reflective report</td>
    <td>24<sup>th</sup> April 2017</td>
    <td>5<sup>th</sup> April 2017</td>
    <td>Finalise reflective report.</td>
  </tr>
</table>

### 6.2 Control plan

To ensure the project stays on track, a number of PRINCE2 control techniques will be applied.

1. Weekly highlight reports (as dictated by the PRCO304 module) will be submitted to the project supervisor. These will also act as end-of-stage reports and will ensure that progress is being made correctly.
2. Regular review meetings with the project supervisor will also occur to ensure that the highlight reports are understood and to also solicit any advice required.
3. Risk management is dictated in section 7.
4. A communication plan is dictated in section 6.3.
5. A quality plan is dictated in section 8.
6. Exception reports can be generated if a major roadblock is met or something in the project goes significantly wrong. This will also generate an exception plan to resolve the issue(s).

### 6.3 Communication plan

Regular review meetings will be held with the project supervisor to ensure communication flows correctly during the process. Additional meetings may be held ad-hoc as required.

All project management systems will also be made available to the project supervisor should the need arise for quick remote inspection of the projects progress.

<br/> <!-- pdf formatting -->

## 7. Project risk

There are a number of risks to consider on a large project such as this. Below are a number of the initial risks and the plans to combat them, this will grow during the life time of the project. Many of these risks are solved by other elements of this document, but some will require further thought. This does not include ethical considerations, those are covered in section 9.

<center>
  <table>
    <tr>
      <th>Risk</th>
      <th>Management Strategy</th>
    </tr>
    <tr>
      <td>Underestimating schedule stages</td>
      <td>Contingency time has been added into each stage in an attempt to combat this risk. Highlight reports will also be generated to track progress. In the event of an overrun of 1 week or more on a particular stage, an exception report will be generated and an exception plan will be created to rectify the issue.</td>
    </tr>
    <tr>
      <td>Over scoped project</td>
      <td>A minimalist project plan has been created to reduce the scope as much as possible. Weekly reports will also ensure that scope is being met. In the event that the project seems to be too large, more features may be cut to create a smaller MVP.</td>
    </tr>
    <tr>
      <td>Difficulty learning technologies</td>
      <td>I will be selecting a technology stack which I have extensive experience with to work with.</td>
    </tr>
    <tr>
      <td>Loss of data (technology failure)</td>
      <td>This will be managed in three ways.
        <ol> <!-- Markdown ordered lists in tables don't function that well, falling back to html. -->
          <li>The codebase will use a distributed reversion control system. One where an entire history of the codebase is shared across all nodes. There will also be a central node which will host the repository thus ensuring multiple machines maintain a (relatively) up to date version of the code base. IE: my working laptop, the cloud hosted service (github), and any other machines used to work on the project such as my desktop machine.</li>
          <li>Database migration will be controlled alongside the application codebase through the use of migration scripts to ensure the structure is not lost.</li>
          <li>Any production or production-like systems will have appropriate backup schedules run automatically which can be used to restore from. IE: the main production database may have a daily backup that is run.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td>Bug fixing / additional feature development breaks pre-existing systems</td>
      <td>Functional, unit, and integration tests will be written to automatically ensure that changes to the codebase do not break pre-existing features. These tests will be run as part of the CI.</td>
    </tr>
  </table>
</center>

<br/> <!-- pdf formatting -->

## 8. Solution quality outline

A quality product is absolutely vital to an MVP. As such it's important to ensure that systems and practices are put in place to ensure stable quality of a high level.

The over all quality of the solution is relatively subjective due to this not being a bespoke solution. As a result it is important to implement systems to ensure that the product functions and that it is easy to use.

### 8.2 Usability quality and testing

Many techniques will be applied to ensure that the application is found easy to use by the target audience. Below is an initial list of some which may be applied.

* Standard Conventions - Many conventions have been pre-established and are well understood by most people. These include things like underlining hyperlinks.
* A Pre-existing Style Framework - Instead of creating my own style guide and framework, I will select one such as Twitter Bootstrap for the web interface. This will give the application a familiar feel and ensure that accessibility requirements are met.

With a mass-market solution, it is important to test it with real / potential users as soon as possible and on a regular basis. The following is a list of some testing techniques I will make use of.

* Hallway Usability Testing - During development I will attempt to situate myself around course mates who are my target audience (game / mobile developers). This will enable me to ask them to test out small bits of functionality and collect informal feedback on the design and user journey.
* Usage Observations - For longer testing sessions I will approach potential users and ask them to attempt a number of tasks to make use of the system. I will observe their actions and make note of where they struggle to accomplish tasks.

### 8.3 Functional, unit, and integration testing

Automated functional, unit, and integration testing will be applied to the project and will be run as part of the CI process. This will ensure that changes to the codebase do not break pre-existing systems. This has be benefit of providing confidence that the code does what it should, and also that changes will not damage the system.

## 9 Ethical issues

During user testing I may need to collect user data such as email addresses and passwords. The university requires an ethical approval process for this which will ensure my process is both ethical and reasonable.
