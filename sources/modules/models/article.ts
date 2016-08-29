module app {

  'use strict';
  export class Article {
    content: string;
    overview: string;

    constructor(
    public title: string,
    public url: string,
    public publishDate: Date,
    public dataSource: string,
    public banner: string,
    public author: string,
    public categories: string[],
    public tags: string[]
    ) {


    }
  }
}
