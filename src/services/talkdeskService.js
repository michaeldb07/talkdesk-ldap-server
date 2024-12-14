const axios = require('axios');
const config = require('../../config/config');

class TalkdeskService {
  constructor() {
    this.baseUrl = 'https://api.talkdeskapp.com';
    this.tokenUrl = 'https://thunderplayground.talkdeskid.com/oauth/token';
    this.clientId = config.talkdesk.clientId;
    this.clientSecret = config.talkdesk.clientSecret;
    this.accessToken = null;
    this.refreshToken = null;
    this.tokenExpiry = null;
  }

  async ensureValidToken () {
    if (!this.accessToken) {
        await this.getAccessToken();
    }
    return this.accessToken;
  }

  async getAccessToken() {
    try {
      const credentials = Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64');
      
      const tokenRequest = new URLSearchParams({
        grant_type: 'client_credentials'
      });
  
      const response = await axios({
        method: 'post',
        url: `${this.tokenUrl}?grant_type=client_credentials`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${credentials}`
        }
      });
      
      this.accessToken = response.data.access_token;
      this.refreshToken = response.data.refresh_token;
      this.tokenExpiry = Date.now() + (response.data.expires_in * 1000);
  
      return this.accessToken;
    } catch (error) {
      console.log('Full error:', error.response?.data);
      this.refreshToken = null;
      throw new Error(`OAuth token fetch failed: ${error.message}`);
    }
  }    

  async getPhoneDetails() {
    try {
      await this.ensureValidToken();
  
      const response = await axios({
        method: 'get',
        url: `${this.baseUrl}/phone-details/numbers`,
        params: {
          page: 1,
          per_page: 50
        },
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${this.accessToken}`
        }
      });
  
      const phoneNumbers = response.data._embedded.phone_numbers
        .filter(phone => phone.friendly_name)
        .map(phone => ({
          phoneNumber: phone.phone_number,
          friendlyName: phone.friendly_name
        }));
  
      return phoneNumbers;
    } catch (error) {
      throw new Error(`Failed to fetch phone details: ${error.message}`);
    }
  }  
}

module.exports = TalkdeskService;
