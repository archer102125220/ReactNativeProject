/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);

if (typeof document === 'object') {
  AppRegistry.runApplication(appName, {
    rootTag: document.getElementById('root'),
  });
}
