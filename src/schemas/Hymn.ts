export const HymnSchema = {
  name: 'Hymn',
  properties: {
    id: 'int',
    number: 'int',
    title: 'string',
    searchableTitle: 'string',
    mp3Url: 'string',
    mp3UrlInstr: 'string',
    mp3Filename: 'string',
  },
};

export interface Hymn {
  id: number;
  number: number;
  title: string;
  searchableTitle: string;
  mp3Url: string;
  mp3UrlInstr: string;
  mp3Filename: string;
}
