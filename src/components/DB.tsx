import React, {memo, useEffect, useState} from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import {
  adjectives,
  animals,
  colors,
  uniqueNamesGenerator,
} from 'unique-names-generator';
import {useQuery, useRealm} from '@realm/react';
import {useNavigation} from '@react-navigation/native';

type personType = {
  id?: number;
  name?: string;
};

const DBComponent = () => {
  const realm = useRealm();
  const persons = useQuery('Person');
  const [data, setData] = useState<personType[] | null>();
  const [nameToEdit, setNameToEdit] = useState<string | undefined>('');
  const [person, setPerson] = useState<personType | null>({id: 0, name: ''});
  const navigation = useNavigation();

  const onPressAddData = () => {
    realm.write(() => {
      // const persons = realm.objects('Person');
      const newPerson = realm.create('Person', {
        id: persons.length + 1,
        name: uniqueNamesGenerator({
          dictionaries: [adjectives, colors, animals],
          separator: ' ',
          style: 'capital',
        }),
      });
      console.log('data added:', newPerson);
      // setReload(!reload);
    });
  };

  const onPressExtractData = () => {
    console.log('get all data!!');
    // const persons = realm.objects('Person');
    console.log(persons);
  };

  const onPressFilteredData = () => {
    console.log('get filtered data!!');
    // const persons = realm.objects('Person');
    console.log(persons.filtered('name BEGINSWITH[c] "G"'));
    // console.log(persons.filtered('id == 3'));
  };

  const onPressCurrentItem = (item: personType) => () => {
    setNameToEdit(item.name);
    setPerson(item);
  };

  const onPressGoToHymns = () => {
    navigation.navigate('Hymns' as never);
  };

  const renderItem = (item: personType, index: number) => {
    return (
      <Pressable key={index} onPress={onPressCurrentItem(item)}>
        <Text style={styles.itemName}>
          [{item.id}] {item.name}
        </Text>
      </Pressable>
    );
  };

  const renderItemsFromDB = () => {
    return data?.map((item, index) => renderItem(item as personType, index));
  };

  const onPressEdit = () => {
    realm.write(() => {
      const personToUpdate = realm
        .objects('Person')
        .filtered('id == ' + person?.id)[0];
      personToUpdate.name = nameToEdit;
      setNameToEdit('');
    });
  };

  const updateDataForm = () => {
    return (
      <View style={styles.inputEditContainer}>
        <TextInput
          style={styles.input}
          value={nameToEdit}
          onChangeText={text => setNameToEdit(text)}
        />
        <Pressable style={styles.editButton} onPress={onPressEdit}>
          <Text>Edit</Text>
        </Pressable>
      </View>
    );
  };

  const content = () => {
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
        {updateDataForm()}
        <Pressable onPress={onPressGoToHymns} style={styles.button}>
          <Text>Go to Hymns</Text>
        </Pressable>
      </View>
    );
  };

  useEffect(() => {
    // const persons = realm.objects('Person');
    setData(persons as unknown as personType[]);
  }, [persons]);

  return (
    <ScrollView>
      {content()}
      {renderItemsFromDB()}
    </ScrollView>
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
  editButton: {
    backgroundColor: 'gray',
    height: 40,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  itemName: {
    fontFamily: 'Courier',
  },
  input: {
    width: '60%',
    height: 40,
    backgroundColor: 'lightgray',
    borderRadius: 5,
    paddingHorizontal: 5,
  },
  inputEditContainer: {
    flexDirection: 'row',
  },
});

export const DB = memo(DBComponent);
