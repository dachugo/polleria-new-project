import { secret } from './environment.secret';

export const environment = {
  production: true,
  supabaseUrl: secret.supabaseUrl,
  supabaseKey: secret.supabaseKey,
};
