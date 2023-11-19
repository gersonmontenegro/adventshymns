import {History} from './History';
import {Hymn} from './Hymn';

export const MainDataSchema = {
  name: 'MainData',
  primaryKey: 'id',
  properties: {
    id: 'int',
    number: 'int',
    title: 'string',
    searchableTitle: 'string',
    hymn: 'Hymn', // Link to HymnSchema
    history: 'History[]', // Array of History items
  },
};

export interface MainData {
  id: number;
  number: number;
  title: string;
  searchableTitle: string;
  hymn: Hymn;
  history: History[];
  length: number;
}
