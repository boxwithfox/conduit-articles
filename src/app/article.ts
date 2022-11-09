import { Author } from "./author";

export interface Artcile {
  slug: string,
  title: string,
  description: string,
  body: string,
  tagList: string[],
  createdAt: Date,
  updatedAt: Date,
  favourited: boolean,
  favoritesCount: number,
  author: Author,
}