module.exports = {
    ldap: {
      url: process.env.LDAP_URL,
      bindDN: process.env.LDAP_BIND_DN,
      bindPassword: process.env.LDAP_BIND_PASSWORD,
      baseDN: 'ou=phones,dc=local,dc=dev'
    },
    talkdesk: {
      apiUrl: process.env.TALKDESK_API_URL,
      clientId: process.env.TALKDESK_CLIENT_ID,
      clientSecret: process.env.TALKDESK_CLIENT_SECRET
    }
  };
  