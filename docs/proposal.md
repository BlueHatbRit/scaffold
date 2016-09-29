# Shrapnel Proposal

User account management, feature toggles, exception tracking, and miscellaneous user data storage are all important tools when creating a prototype application. The issue is that when creating a new prototype you're often on a tight time scale. Developing these tools can take a huge amount of time yet provide incredible benefits to prototyping.

There are current players in the market such as Raygun (exception tracking), Google Analytics (analytics logging and breakdowns), and LaunchDarkly (feature flags as a service). One problem with these solutions is they're modelled for more established products and their data is often only useful in relation to user data which you are expected to already have and maintain. Another issue is they are often very "unopinionated" which is a great benefit for an established system but can be time consuming to mold into the form required. While opinionated platforms often offer much faster setup and results, this is discussed a lot in terms of application frameworks.

By creating an opinionated "back-end as a service", this project aims to help developers in the early stages of a new product. The product will include a suite of tools that are often assumed to be created "in-house" by developers.

## Project goals

The goal of the project is to create a minimal viable product (MVP) of the solution. The core features and potential expansion features are listed below. The product will be in the form of a Software as a Service (SaaS) model as a public facing

### Core MVP features

* User account and session service - Handing registration and modification of user accounts, as well as user sessions for activities that require authentication.
* Feature flagging - The ability to flag features in different ways such as:
  * Simple on/off - A simple on/off for all users
  * Account type - Such as staff shipping a feature or only enabling a feature for pro users rather than trial users.
  * Population based - Slowly roll out a feature across the population of users by percentages to help ensure feature stability.
* Web interface - For the developer to manage the customers API keys, configuring feature flags, and viewing any other features.
* HTTP RESTful API - The main interface that the developer will use to interact with the system.

### Future / expansion features

* Basic user data storage - Give the developer the ability to store miscellaneous data against a user in a document style format.
* Refactor experimentation - Track data on critical code path refactoring experiments.
* Exception / error tracking - Allow the developer to send up stack traces from production exceptions and errors for analysis.
* Analytic platform - An analytics platform tailored to prototype / early products. With the aim of collecting and displaying information on areas users are using the most, how long they spend in said areas of the application and such.

# Workflow and methodologies

The project will use a combination of GitHub Flow and Kanban. It will use take advantage of the branch-based workflow in GitHub Flow and using a Kanban board for priority visibility.

Due to this choice in methodologies, the project will use Git and GitHub for VCS along with GitHub Issues, Pull Requests, and Projects. This will further help to keep everything in one place and easily accessible, as well as backed up via Git.

As this will be a solo project, code reviews will not be possible so the project will use TDD/BDD in appropriate places to ensure the quality of the system on a functional level.

# Potential tools and technologies

There are a huge range of tools and technology choices out there for this sort of product. Below is a potential stack

* Ruby and Ruby on Rails - Main application server for the web console and api
* MySQL - Persistent data storage
* Redis - As a session store
* Amazon Web Services - Hosting infrastructure and scalability tools, this will cover hardware requirements other than development machines
* Travis CI - Continuous integration and deployment
* GitHub - Git hosting and project management
* Git - Version control system
* DataDog - Infrastructure monitoring

The majority of the spending on this project will be for server infrastructure but no funding will be required as prices should be relatively minimal.

# Special risk consideration

The application will be storing user data and hashed passwords. As a result, ethical approval may be required by the universities ethical approval committee. Decisions will need to be made as to the best approach for storing passwords, possibilities include BCrypt hashing.
