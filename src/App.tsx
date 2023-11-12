/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  Dimensions,
  SafeAreaView,
  // ScrollView,
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

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

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
        {/* <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={[backgroundStyle, styles.scrollContent]}> */}
        <NavigationContainer>
          <MainNavigation />
        </NavigationContainer>
        {/* </ScrollView> */}
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
