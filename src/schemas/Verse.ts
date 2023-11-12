export const VerseSchema = {
  name: 'Verse',
  properties: {
    number: 'int',
    content: 'string',
    searchableContent: 'string',
  },
};

export interface Verse {
  number: number;
  content: string;
  searchableContent: string;
}
