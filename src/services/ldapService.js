const ldap = require('ldapjs');
const config = require('../../config/config');

class LDAPService {
  constructor() {
    this.client = ldap.createClient({
      url: config.ldap.url
    });
    this.baseDN = config.ldap.baseDN;
    this.bindDN = config.ldap.bindDN;
    this.bindPassword = config.ldap.bindPassword;
  }

  async addPhoneEntry(phoneData) {
    return new Promise((resolve, reject) => {
      this.client.bind(this.bindDN, this.bindPassword, (err) => {
        if (err) {
          reject(err);
          return;
        }

        const formattedPhone = phoneData.phoneNumber.replace('+', '');
        const dn = `uid=${formattedPhone},${this.baseDN}`;
        
        const entry = {
          objectClass: ['top', 'inetOrgPerson'],
          uid: formattedPhone,
          cn: formattedPhone,
          sn: formattedPhone,
          displayName: phoneData.friendlyName,
          telephoneNumber: phoneData.phoneNumber
        };

        this.client.add(dn, entry, (err) => {
          if (err) reject(err);
          resolve();
        });
      });
    });
  }

  async searchPhones() {
    return new Promise((resolve, reject) => {
      this.client.bind(this.bindDN, this.bindPassword, (err) => {
        if (err) {
          reject(err);
          return;
        }
  
        const opts = {
          filter: '(objectClass=inetOrgPerson)',
          scope: 'sub',
          attributes: ['telephoneNumber', 'displayName']
        };
  
        this.client.search(this.baseDN, opts, (err, res) => {
          if (err) {
            reject(err);
            return;
          }
  
          const entries = [];
          res.on('searchEntry', (entry) => {
            const attributes = entry.attributes;
            entries.push({
              phoneNumber: attributes.find(a => a.type === 'telephoneNumber')?.values[0] || '',
              friendlyName: attributes.find(a => a.type === 'displayName')?.values[0] || ''
            });
          });
  
          res.on('end', () => resolve(entries));
          res.on('error', reject);
        });
      });
    });
  }

  // Delete phone entries that where freindly name has been cleared/deleted in Talkdesk
  async deletePhoneEntry(phoneNumber) {
    return new Promise((resolve, reject) => {
        this.client.bind(this.bindDN, this.bindPassword, (err) => {
            if (err) {
                reject(err);
                return;
            }

            const formattedPhone = phoneNumber.replace('+', '');
            const dn = `uid=${formattedPhone},${this.baseDN}`;

            this.client.del(dn, (err) => {
                if (err) reject(err);
                resolve();
            });
        });
    });
}
}

module.exports = LDAPService;
