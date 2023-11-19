import {useNavigation, useRoute} from '@react-navigation/native';
import React, {memo} from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Verse} from '../../schemas/Verse';

const HymnDetailComponent = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {
    // @ts-ignore
    hymn: {history, title},
  } = route.params;

  const renderHistory = ({verse}: {verse: Verse}) => {
    return (
      <View style={styles.verseContainer}>
        <Text style={styles.verse}>{verse.content}</Text>
      </View>
    );
  };

  const onPressBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View>
        <Pressable onPress={onPressBack}>
          <Text>{'< Back'}</Text>
        </Pressable>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <ScrollView>{history.map(renderHistory)}</ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  verseContainer: {
    marginBottom: 10,
    alignItems: 'center',
  },
  titleContainer: {
    margin: 10,
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  verse: {
    textAlign: 'center',
  },
});

export const HymnDetail = memo(HymnDetailComponent);
