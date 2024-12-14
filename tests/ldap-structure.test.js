require('dotenv').config();
const ldap = require('ldapjs');

async function showLDAPStructure() {
    const client = ldap.createClient({
        url: process.env.LDAP_URL
    });

    const opts = {
        scope: 'sub',
        filter: '(objectClass=*)',
        attributes: ['objectClass', 'ou', 'uid', 'telephoneNumber', 'displayName']
    };

    client.bind(process.env.LDAP_BIND_DN, process.env.LDAP_BIND_PASSWORD, (err) => {
        client.search('dc=local,dc=dev', opts, (err, res) => {
            res.on('searchEntry', (entry) => {
                const attributes = entry.attributes.reduce((acc, attr) => {
                    acc[attr.type] = attr.values;
                    return acc;
                }, {});
                
                console.log('\nEntry DN:', entry.objectName);
                console.log('Attributes:', JSON.stringify(attributes, null, 2));
            });
            res.on('end', () => {
                client.unbind();
                process.exit(0);
            });
        });
    });
}

showLDAPStructure();
