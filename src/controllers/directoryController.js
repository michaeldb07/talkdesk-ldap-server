const TalkdeskService = require('../services/talkdeskService');
const LDAPService = require('../services/ldapService');

class DirectoryController {
  constructor() {
    this.talkdeskService = new TalkdeskService();
    this.ldapService = new LDAPService();
  }

  async syncDirectory(req, res) {
    try {
      const phoneDetails = await this.talkdeskService.getPhoneDetails();
      
      for (const phone of phoneDetails) {
        await this.ldapService.addPhoneEntry({
          phoneNumber: phone.phone_number,
          friendlyName: phone.friendly_name
        });
      }

      res.status(200).json({ message: 'Directory sync completed' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getDirectory(req, res) {
    try {
      const phones = await this.ldapService.searchPhones();
      res.status(200).json(phones);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new DirectoryController();
