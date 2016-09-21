# Project Proposal

## Product overview

Shrapnel is a tool for developers to aid building prototypes and small applications. Using a SaaS model, Shrapnel takes the pain out of the basic server side systems and infrastructure. The product is designed to handle user account systems for the developer and use that as a platform to build some of the more complex tools that help when building either a prototype or long running application.

When building a new mass market application, you often want to employ tools such as feature flags, user analytics, and very basic data storage. However this can often add weeks or more to the development process, ultimately costing money and hindering the developer, team, or organisation from "failing fast". What's more, it can often take web expertise that a solo developer or small team may not have. This can result in poor quality, and poorly secured systems.

Shrapnel aims to fill that gap, providing a number of developer tools built around a user account management system. As a SaaS designed for developers, it attempts to speed up the development flow of an application and either support them until they transition onto a bigger in-house system or through the entire life time of an application.

This project hopes to create a viable first iteration MVP. If the project provides viable then I've added scope for further features to add more value to the product.

The application would consist of two core elements from the users perspective. First being a web console which would allow the addition of new "apps" to their account, configuration of the individual tools, and a basic view of data associated with their "apps". The second element is the RESTful API accessible via HTTP calls. This is what will allow the user to link their product up with their Shrapnel app.

## Workflow and methodologies

The project will use a combination of GitHub Flow and Kanban. It will use take advantage of the branch-based workflow in GitHub Flow and using a Kanban board for priority visibility.

Due to this choice in methodologies, the project will use Git and GitHub for VCS along with GitHub Issues, Pull Requests, and Projects. This will further help to keep everything in one place and easily accessible, as well as backed up via Git.

As this will be a solo project, code reviews will not be possible so the project will use TDD/BDD in appropriate places to ensure the quality of the system on a functional level.

## Deliverables and priorities

The features that this project includes are quite few in number to stick close to an MVP. They are intended to be wrapped into a full shippable product. There is also plenty of room for future expansion and additional features if time permits or the project continues. The core deliverables at the end of this project are below with further features in the next section.

1. User account management for applications - Account registration, authenticated sessions, and session verification.
2. Feature flag service - Feature flagging based on user accounts to include features such as:
  - Simple on/off toggle.
  - Customisable account levels and gating, ie: pro users, trial users, staff users.
  - Scalable shipping such as rolling out to a small percentage of the user base to test to ensure system stability.

## Potential extension or future features

Many further tools and features will help to take the pain away from developing software. Below is another priority list which can be stacked under the above list of core features.

1. JSON Data Storage - Store a small amount of data against each user in JSON format with the ability to retrieve and update it at will.
2. Exception/error tracking - Send up exception/error stack traces and have alerts
3. Data export system - If a product does well, they may wish to move to their own infrastructure. A basic way to export data is a good gesture of will to customers and makes it less of a commitment to begin an application with Shrapnel.

## Tools and technologies

There is a huge range of tools and technology choices out there for this sort of product. I've listed some of the core technologies below that may be used.

* Ruby and Ruby on Rails - Main application server for the web console and api
* MySQL - Persistent data storage
* Redis - Session store
* Amazon Web Services - Hosting and scalibility, this will cover hardware requirements other than development machines
* Travis CI - Continious integration and deployment
* GitHub - Git hosting and project management
* Git - Version control system

There will be no additional funding required nor additional support from external companies.

## Special risk consideration

Aside from normal software project risks, there are no special risks that have been identified at this point.
