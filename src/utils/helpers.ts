import {HymnsData} from '../assets';

export const normalizeString = (str: string) =>
  str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

export const insertHymns = (realm: any) => {
  HymnsData.map(entryData => {
    realm.write(() => {
      const hymn = realm.create('Hymn', {
        ...entryData.hymn,
        searchableTitle: normalizeString(entryData.hymn.title),
        searchableNumber: entryData.hymn.number.toString(),
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
        searchableNumber: entryData.number.toString(),
        hymn,
        history: historyObjects,
      });
    });
  });
};

export const removeData = (realm: any) => {
  realm.write(() => {
    realm.deleteAll();
    console.log('data removed');
  });
};

export const onPressReadHymns = () => {
  HymnsData.map(item => {
    console.log(item.number, item.title);
  });
};
