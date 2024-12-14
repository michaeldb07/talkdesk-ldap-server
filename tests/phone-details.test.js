require('dotenv').config();
const TalkdeskService = require('../src/services/talkdeskService');

async function testPhoneDetails() {
    const service = new TalkdeskService();
    const phoneDetails = await service.getPhoneDetails();
    console.log('Phone Details:', JSON.stringify(phoneDetails, null, 2));
}

testPhoneDetails();
