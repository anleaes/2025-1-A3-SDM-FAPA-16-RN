import 'react-native-gesture-handler';
import DrawerNavigator from '@/navigation/DrawerNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { registerRootComponent } from 'expo';

const App = () => (
  <NavigationContainer>
    <DrawerNavigator />
  </NavigationContainer>
);

registerRootComponent(App);

export default App