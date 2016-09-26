# Shrapnel

Elliot Blackburns Computing & Games Dev Final Year Project

## Important Documentation

* [Initial Project Proposal](./docs/proposal.md)

## Project Installation

### Requirements

* Vagrant for VM management
* Ansible for VM provisioning

### Vagrant setup steps

* `ansible-galaxy install -r requirements.yml` - Install the required ansible-galaxy roles.
* `vagrant up` - Bring up the vagrant box

_**Warning:** some default credentials for MySQL are stored in the Ansible provisioning files. These are not secure and should only be used for development purposes on a secured machine and throwaway VM. Do not use them for production values!_
