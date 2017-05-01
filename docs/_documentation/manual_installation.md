---
title: Manual Installation
position: 2
---

The following guide has been tested on Ubuntu 14.05 LTS, it will not detail how to install the various software dependencies like MySQL or Redis.

This guide has only been tested on Ubuntu 14.05 LTS, commands may differ on other operating systems or Ubuntu versions.

### Dependencies

Before installing Scaffold, there are a number of dependencies you will need installed and configured that Scaffold relies on.

#### Node.js

Scaffold requires version 6 or above of Node.js to run, we support both Node.js 6 and 7 currently. Along with your Node.js installation you should also ensure NPM (node package manager) 3.10 or above is installed.

#### Yarn

Scaffold uses Yarn for package management. This can be easily installed using the NPM with the following command:

`$ npm install yarn -g`

#### MySQL

MySQL is used for persistent data storage, you will need a MySQL Database accessible which can be accessed by the Scaffold application. The following should be configured and accessible to Scaffold.

* A blank database with a default charset of `utf8`.
* A user which is able to access the database with the ability to create, alter, update, and delete tables and table content.

If you're hosting this database on a separate server, please ensure the correct permissions are applied to the network and the database user.

#### Redis

Scaffold uses Redis to store temporary data such as sessions. You will need an instance set up and accessible by the Scaffold application. A default installation of Redis is normally configured fine for this, but you may wish to tweak settings to make it more secure.

#### NGinx / A reverse proxy

For node applications it is common practice to implement a reverse proxy. We recommend NGinx, but you are free to choose.

### Downloading Scaffold

For production environments you should download the latest Scaffold version form the [releases page](https://github.com/BlueHatbRit/scaffold/releases). **You should not use git to download Scaffold unless you are developing for the Scaffold project.**

Once you have downloaded your copy of Scaffold, extract it's content to your desired location you'll be ready to install.

### Installation

#### 1. Create the config file

In the Scaffold directory you will have a file called `config.example.json`, this is a full example of the JSON configuration file that Scaffold needs to run. You should rename it to `config.production.json` and change the configurations to suit your needs. Below are details of the config file. **All configuration variables labeled as "secrets" should be a randomly generated salt. If you believe the security of these secrets is ever compromised, you should re-generate them as soon as possible.**

```
{
  "port": 2368,
  "database": {
    "client": "mysql",
    "connection": {
      "host": "localhost",
      "user": "app",
      "password": "secret",
      "database": "app_dev",
      "charset": "utf8"
    }
  },

  "auth": {
    "secret": "secret"
  },
  
  "session": {
    "secret": "another secret",
    "store": {
      "host": "localhost",
      "port": 6379
    }
  }
}
```

#### 2. Install libraries

Using yarn, we will now install the libraries that Scaffold depends on. When in the Scaffold application directory, run the following:

```bash
$ yarn install
```

#### 3. Migrate the database to the correct version

_At this point you may get errors if your MySQL instance is not accessible by Scaffold or has incorrect permissions._

Using yarn we will run some pre-defined Scaffold scripts:

```bash
$ yarn run db-init && yarn run db-up
```

Once you have completed the above steps, Scaffold should be ready to start.

### Starting Scaffold

In a production environment you will want to ensure that Scaffold continues to run in the background. You may have your own preference of how to do this, one popular option is using [forever](https://npmjs.com/package/forever), the NPM package.

To start Scaffold from the command line in the foreground use the following command in the Scaffold application directory.

```bash
$ NODE_ENV=production node index.js
```

✨ **Your Scaffold instance should now be running** ✨