require('dotenv').config();
const LDAPService = require('../src/services/ldapService');

async function testPhones() {
    const ldapService = new LDAPService();
    
    try {
        const existingPhones = await ldapService.searchPhones();
        console.log('Existing phones:', JSON.stringify(existingPhones, null, 2));

        const testPhones = [
            {
                phoneNumber: "+17205945112",
                friendlyName: "Main Line"
            },
            {
                phoneNumber: "+17205945143",
                friendlyName: "Premium Support"
            }
        ];

        for (const phone of testPhones) {
            const exists = existingPhones.some(ep => ep.phoneNumber === phone.phoneNumber);
            if (!exists) {
                await ldapService.addPhoneEntry(phone);
                console.log(`Added new phone: ${phone.phoneNumber} (${phone.friendlyName})`);
            } else {
                console.log(`Phone ${phone.phoneNumber} already exists`);
            }
        }
    } finally {
        ldapService.client.unbind();
        process.exit(0);
    }
}

testPhones();
