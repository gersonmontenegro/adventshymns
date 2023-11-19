import {MainData} from './../schemas/Main';

export type RootStackParamList = {
  Demo: undefined;
  Home: undefined;
  Hymns: undefined;
  HymnDetail: {hymn: MainData};
};
