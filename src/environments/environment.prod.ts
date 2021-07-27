import {audience, clientId, domain} from '../../auth_config.json';

export const environment = {
  production: true,
  auth: {
    domain,
    clientId,
    redirectUri: window.location.origin,
    audience
  },
  serv: {
    serverUrl: 'https://api-jb.herokuapp.com/'
  }
};
