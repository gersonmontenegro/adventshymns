import React, {memo, useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useQuery} from '@realm/react';
import {Hymn} from '../schemas/Hymn';
import {MainData} from '../schemas/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../utils/types';
import {normalizeString} from '../utils/helpers';

const HymnsComponent = () => {
  const mainData = useQuery('MainData');
  const [searchTextByVerse, setSearchTextByVerse] = useState<string>('');
  const [searchResult, setSearchResult] = useState<MainData[]>([]);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const onPressSearchHymnByVerse = useCallback(() => {
    console.log('lets search!', searchTextByVerse);
    const normalizedText = normalizeString(searchTextByVerse);
    const result = mainData.filtered(
      '(searchableTitle CONTAINS[c] $0) OR (history.verse.content CONTAINS[c] $1)',
      normalizedText,
      normalizedText,
    );
    console.log(result.length);
    // @ts-ignore
    setSearchResult(result as Hymn[]);
  }, [mainData, searchTextByVerse]);

  const onPressHymnName = (hymn: MainData) => () => {
    navigation.navigate('HymnDetail', {hymn});
  };

  const renderItem = ({item}: {item: MainData}) => {
    return (
      <Pressable
        onPress={onPressHymnName(item)}
        style={styles.hymnButton}
        key={`${item.number}-${item.title}`}>
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

  useEffect(() => {
    onPressSearchHymnByVerse();
  }, [onPressSearchHymnByVerse]);

  return (
    <View style={styles.container}>
      <Text>Hymn List</Text>
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
