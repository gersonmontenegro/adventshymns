import React, {memo} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {insertHymns} from '../utils/helpers';
import {useRealm} from '@realm/react';

const InsertDataComponent = () => {
  const realm = useRealm();

  const onPressHymnsData = () => {
    insertHymns(realm);
  };

  return (
    <View>
      <View style={styles.inputEditContainer}>
        <Pressable style={styles.editButton} onPress={onPressHymnsData}>
          <Text>Insert data</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  editButton: {
    backgroundColor: 'gray',
    height: 40,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  inputEditContainer: {
    flexDirection: 'row',
    marginVertical: 2,
  },
});

export const InsertData = memo(InsertDataComponent);
