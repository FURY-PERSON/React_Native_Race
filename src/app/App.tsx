import {store} from '@/app/providers/store';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {enableFreeze} from 'react-native-screens';
import {Provider} from 'react-redux';
import {Navigation} from './providers/navigation';
import {Provider as PaperProvider} from 'react-native-paper';

enableFreeze(true);

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <PaperProvider>
          <Navigation />
        </PaperProvider>
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
