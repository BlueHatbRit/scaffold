# -*- mode: ruby --
# vi: set ft=ruby :

Vagrant.configure(2) do |config|
  config.vm.box = "geerlingguy/ubuntu1404"

  config.vm.provider :virtualbox do |v|
    v.name = "rails"
    v.memory = 512
    v.cpus = 2
    v.customize ["modifyvm", :id, "--natdnshostresolver1", "on"]
    v.customize ["modifyvm", :id, "--ioapic", "on"]
  end

  config.vm.hostname = "rails"
  config.vm.network :private_network, ip: "192.168.33.8"

  # Set the name of the VM. See: http://stackoverflow.com/a/17864388/100134
  config.vm.define :rails do |rails|
  end

  # Ansible provisioner.
  config.vm.provision "ansible" do |ansible|
    ansible.playbook = "provisioning/playbook.yml"
    ansible.inventory_path = "provisioning/inventory"
    ansible.sudo = true
  end
end
