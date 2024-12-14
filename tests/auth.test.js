require('dotenv').config();
const TalkdeskService = require('../src/services/talkdeskService');

async function testAuth() {
    const service = new TalkdeskService();
    
    // Log the configuration being used
    console.log('Environment variables loaded:', {
        TALKDESK_CLIENT_ID: process.env.TALKDESK_CLIENT_ID ? 'Set' : 'Not set',
        TALKDESK_CLIENT_SECRET: process.env.TALKDESK_CLIENT_SECRET ? 'Set' : 'Not set'
    });

    console.log('Using configuration:', {
        tokenUrl: service.tokenUrl,
        clientId: service.clientId,
        clientSecret: '***' // masked for security
    });

    try {
        const token = await service.getAccessToken();
        console.log('Authentication successful. Token received:', token);
    } catch (error) {
        console.log('Request details:', {
            url: error.config?.url,
            method: error.config?.method,
            headers: error.config?.headers,
            data: error.config?.data
        });
        throw error;
    }
}

testAuth();

