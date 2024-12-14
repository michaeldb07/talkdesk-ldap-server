require('dotenv').config();
const ldap = require('ldapjs');

async function setupLDAP() {
    console.log('Using LDAP configuration:', {
        url: process.env.LDAP_URL,
        bindDN: process.env.LDAP_BIND_DN
    });

    const client = ldap.createClient({
        url: process.env.LDAP_URL
    });

    const entry = {
        objectClass: ['organizationalUnit'],
        ou: 'phones'
    };

    client.bind(process.env.LDAP_BIND_DN, process.env.LDAP_BIND_PASSWORD, (err) => {
        if (err) {
            console.log('Bind error:', err);
            return;
        }
        
        client.add('ou=phones,dc=local,dc=dev', entry, (err) => {
            if (err) {
                console.log('Add error:', err);
                return;
            }
            console.log('Successfully created phones OU');
            client.unbind();
        });
    });
}

setupLDAP();
