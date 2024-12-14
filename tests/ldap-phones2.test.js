require('dotenv').config();
const LDAPService = require('../src/services/ldapService');

async function testPhones() {
    const ldapService = new LDAPService();
    
    try {
        const testPhone = {
            phoneNumber: "+17205945199",
            friendlyName: "Sales Support"
        };

        await ldapService.addPhoneEntry(testPhone);
        console.log(`Added new phone: ${testPhone.phoneNumber} (${testPhone.friendlyName})`);

        const allPhones = await ldapService.searchPhones();
        console.log('\nAll phones in directory:', JSON.stringify(allPhones, null, 2));
    } finally {
        ldapService.client.unbind();
        process.exit(0);
    }
}

testPhones();
