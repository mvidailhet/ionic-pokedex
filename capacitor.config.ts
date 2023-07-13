import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.mitch.ion_pokedex',
  appName: 'ionic-pokedex',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
