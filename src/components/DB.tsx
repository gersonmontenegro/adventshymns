import React, {memo} from 'react';
import Realm from 'realm';
import {Pressable, StyleSheet, Text, View} from 'react-native';
// import {AppWrapper} from '../models/Profile';
import {PersonSchema} from '../schemas/Schema';

const realm = new Realm({
  schema: [PersonSchema],
});

const DBComponent = () => {
  const onPressAddData = () => {
    realm.write(() => {
      const newPerson = realm.create('Person', {
        id: 3,
        name: 'Gonzalo',
      });
      console.log('data added:', newPerson);
    });
  };
  const onPressExtractData = () => {
    console.log('get all data!!');
    const persons = realm.objects('Person');
    console.log(persons);
  };
  const onPressFilteredData = () => {
    console.log('get filtered data!!');
    const persons = realm.objects('Person');
    console.log(persons.filtered('name BEGINSWITH[c] "G"'));
    // console.log(persons.filtered('id == 3'));
  };
  return (
    <View>
      <Text>Use data:</Text>
      <Pressable onPress={onPressAddData} style={styles.button}>
        <Text>Add data!</Text>
      </Pressable>
      <Pressable onPress={onPressExtractData} style={styles.button}>
        <Text>Extract data</Text>
      </Pressable>
      <Pressable onPress={onPressFilteredData} style={styles.button}>
        <Text>Extract filtered data</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'gray',
    height: 40,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginVertical: 2,
  },
});

export const DB = memo(DBComponent);
