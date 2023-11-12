import {Verse} from './Verse';

export const HistorySchema = {
  name: 'History',
  properties: {
    position: 'int',
    timestamp: 'int',
    verse: 'Verse', // Link to VerseSchema
  },
};

export interface History {
  position: number;
  timestamp: number;
  verse: Verse;
}
