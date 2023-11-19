import 'react-native-devsettings';
import React from 'react';
import {
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {RealmProvider} from '@realm/react';
import {PersonSchema} from './schemas/Schema';
import {MainDataSchema} from './schemas/Main';
import {HymnSchema} from './schemas/Hymn';
import {HistorySchema} from './schemas/History';
import {VerseSchema} from './schemas/Verse';
import {NavigationContainer} from '@react-navigation/native';
import {MainNavigation} from './navigation/MainNavigation';
// import {migration} from './schemas/migration';

// import Realm from 'realm';

// const openRealm = async () => {
//   return await Realm.open({
//     schema: [
//       PersonSchema,
//       MainDataSchema,
//       HymnSchema,
//       HistorySchema,
//       VerseSchema,
//     ],
//     schemaVersion: 2,
//     migration,
//   });
// };

function App(): JSX.Element {
  // const [realm, setRealm] = useState(null);
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  // useEffect(() => {
  //   let isActive = true;
  //   openRealm().then(openedRealm => {
  //     if (isActive) {
  //       setRealm(openedRealm);
  //     }
  //   });

  //   return () => {
  //     isActive = false;
  //     if (realm) {
  //       // @ts-ignore
  //       realm.close();
  //     }
  //   };
  // }, []);

  // if (!realm) {
  //   return (
  //     <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
  //       <Text>Loading...</Text>
  //     </View>
  //   );
  // }

  return (
    <RealmProvider
      schema={[
        PersonSchema,
        MainDataSchema,
        HymnSchema,
        HistorySchema,
        VerseSchema,
      ]}>
      <SafeAreaView style={[backgroundStyle, styles.scrollContent]}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <NavigationContainer>
          <MainNavigation />
        </NavigationContainer>
      </SafeAreaView>
    </RealmProvider>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    height: Dimensions.get('screen').height,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
