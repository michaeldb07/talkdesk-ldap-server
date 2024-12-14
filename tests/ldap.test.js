require('dotenv').config();
const LDAPService = require('../src/services/ldapService');

async function testLDAPConnection() {
    const ldapService = new LDAPService();
    
    console.log('Testing LDAP connection...');
    
    // First test: Add a single phone entry
    const testPhone = {
        phoneNumber: '+17205945112',
        friendlyName: 'Main Line'
    };
    
    await ldapService.addPhoneEntry(testPhone);
    console.log('Successfully added phone entry');
    
    // Second test: Search for phones
    const phones = await ldapService.searchPhones();
    console.log('Retrieved phones:', JSON.stringify(phones, null, 2));
}

testLDAPConnection();
