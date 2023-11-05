// import React from 'react';
// import Realm, {ObjectSchema} from 'realm';
// import {createRealmContext} from '@realm/react';
// import {Text, View} from 'react-native';

// class Profile extends Realm.Object<Profile> {
//   _id!: Realm.BSON.ObjectId;
//   name!: string;

//   static schema: ObjectSchema = {
//     name: 'Profile',
//     properties: {
//       _id: 'objectId',
//       name: 'string',
//     },
//     primaryKey: '_id',
//   };
// }

// const realmConfig: Realm.Configuration = {
//   schema: [Profile],
// };

// const {RealmProvider, useRealm, useObject, useQuery} =
//   createRealmContext(realmConfig);

// export const AppWrapper = () => {
//   return (
//     <RealmProvider>
//       <Text>REALM!!</Text>
//     </RealmProvider>
//   );
// };
