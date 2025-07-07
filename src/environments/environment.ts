import { secret } from './environment.secret';

export const environment = {
  production: false,
  supabaseUrl: secret.supabaseUrl,
  supabaseKey: secret.supabaseKey,
};
