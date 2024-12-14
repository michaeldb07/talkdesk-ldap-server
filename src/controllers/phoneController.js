const LDAPService = require('../services/ldapService');
const TalkdeskService = require('../services/talkdeskService');

class PhoneController {
    constructor() {
        this.ldapService = new LDAPService();
        this.talkdeskService = new TalkdeskService();
    }

    async syncPhones(req, res) {
        try {
            // Get existing phones from LDAP
            const existingPhones = await this.ldapService.searchPhones();
            
            // Get phones from Talkdesk (only ones with friendly names)
            const talkdeskPhones = await this.talkdeskService.getPhoneDetails();
            
            const results = {
                added: 0,
                skipped: 0,
                deleted: 0,
                total: talkdeskPhones.length
            };
    
            // Find phones to delete (in LDAP but not in Talkdesk)
            const talkdeskPhoneNumbers = talkdeskPhones.map(p => p.phoneNumber);
            for (const existingPhone of existingPhones) {
                if (!talkdeskPhoneNumbers.includes(existingPhone.phoneNumber)) {
                    await this.ldapService.deletePhoneEntry(existingPhone.phoneNumber);
                    results.deleted++;
                }
            }
    
            // Add new phones
            for (const phone of talkdeskPhones) {
                const exists = existingPhones.some(ep => ep.phoneNumber === phone.phoneNumber);
                if (!exists) {
                    await this.ldapService.addPhoneEntry(phone);
                    results.added++;
                } else {
                    results.skipped++;
                }
            }
    
            res.json({
                message: 'Phone synchronization completed',
                results
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getPhones(req, res) {
        try {
            const phones = await this.ldapService.searchPhones();
            res.json(phones);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = PhoneController;
