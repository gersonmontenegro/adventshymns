import React, {memo, useState} from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {HymnsData} from '../assets';
import {useQuery, useRealm} from '@realm/react';
import {Hymn} from '../schemas/Hymn';
import {MainData} from '../schemas/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/types';

const HymnsComponent = () => {
  const realm = useRealm();
  const hymns = useQuery('Hymn');
  const mainData = useQuery('MainData');
  const [searchText, setSearchText] = useState<string>('');
  const [searchTextByVerse, setSearchTextByVerse] = useState<string>('');
  const [searchResult, setSearchResult] = useState<Hymn[]>([]);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const button = (onPressEvent: any, title: string) => {
    return (
      <Pressable onPress={onPressEvent} style={styles.button}>
        <Text>{title}</Text>
      </Pressable>
    );
  };

  const onPressReadHymns = () => {
    HymnsData.map(item => {
      console.log(item.number, item.title);
    });
  };

  const normalizeString = (str: string) =>
    str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  const onPressInsertHymns = () => {
    HymnsData.map(entryData => {
      realm.write(() => {
        const hymn = realm.create('Hymn', {
          ...entryData.hymn,
          searchableTitle: normalizeString(entryData.hymn.title),
        });

        const historyObjects = entryData.history.map(historyItem => {
          return realm.create('History', {
            position: historyItem.position,
            timestamp: historyItem.timestamp,
            verse: realm.create('Verse', {
              ...historyItem.verse,
              searchableContent: normalizeString(historyItem.verse.content),
            }),
          });
        });

        realm.create('MainData', {
          id: entryData.id,
          number: entryData.number,
          title: entryData.title,
          searchableTitle: normalizeString(entryData.title),
          hymn,
          history: historyObjects,
        });
        // console.log('Inserted:', entryData.number);
      });
    });
  };

  const onPressRemoveData = () => {
    realm.write(() => {
      realm.deleteAll();
      console.log('data removed');
    });
  };

  const onPressSearchHymn = () => {
    console.log('looking for:', normalizeString(searchText));
    const normalizedText = normalizeString(searchText);
    const result = hymns.filtered(
      `searchableTitle CONTAINS[c] "${normalizedText}"`,
    );
    // @ts-ignore
    setSearchResult(result as Hymn[]);
  };

  const onPressSearchHymnByVerse = () => {
    console.log('looking for:', normalizeString(searchText));
    const normalizedText = normalizeString(searchTextByVerse);
    const result = mainData.filtered(
      'history.verse.content CONTAINS[c] $0',
      normalizedText,
    );
    // @ts-ignore
    setSearchResult(result as Hymn[]);
  };

  const onPressHymnName = (hymn: MainData) => () => {
    navigation.navigate('HymnDetail', {hymn});
  };

  const renderItem = ({item}: {item: MainData}) => {
    return (
      <Pressable onPress={onPressHymnName(item)} style={styles.hymnButton}>
        <View style={styles.hymnNumberContainer}>
          <Text>{item.number}</Text>
        </View>
        <View style={styles.hymnNameContainer}>
          <Text>{item.title}</Text>
        </View>
      </Pressable>
    );
  };

  const listResult = () => {
    // @ts-ignore
    return <FlatList data={searchResult} renderItem={renderItem} />;
  };

  const searchDataForm = (
    onPressEvent: any,
    title: string,
    value: string,
    onChangeText: any,
  ) => {
    return (
      <View style={styles.inputEditContainer}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={text => onChangeText(text)}
        />
        <Pressable style={styles.editButton} onPress={onPressEvent}>
          <Text>{title}</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text>Manage DB</Text>
      {button(onPressReadHymns, 'Read hymns')}
      {button(onPressInsertHymns, 'Insert hymns')}
      {button(onPressRemoveData, 'Remove data')}
      {button(onPressSearchHymn, 'Search data')}
      {searchDataForm(onPressSearchHymn, 'Search', searchText, setSearchText)}
      {searchDataForm(
        onPressSearchHymnByVerse,
        'Search by verse',
        searchTextByVerse,
        setSearchTextByVerse,
      )}
      {listResult()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
  },
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
    marginVertical: 2,
  },
  hymnButton: {
    flexDirection: 'row',
  },
  hymnNumberContainer: {
    width: 40,
  },
  hymnNameContainer: {
    flex: 1,
  },
});

export const Hymns = memo(HymnsComponent);
