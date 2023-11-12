export const VerseSchema = {
  name: 'Verse',
  properties: {
    number: 'int',
    content: 'string',
  },
};

export interface Verse {
  number: number;
  content: string;
}
