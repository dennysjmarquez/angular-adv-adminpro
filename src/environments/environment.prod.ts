import {defaultEnvironment} from './environment.defaults';

export const environment = {
   ...defaultEnvironment,
   production: true,
   baseUrl: 'http://localhost:3005/api'
};
