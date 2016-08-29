module app {

  'use strict';
  export class Link {
    constructor(
    public title: string,
    public linktitle: string,
    public url: string,
    public banner: string,
    public author: string,
    public categories: string[],
    public tags: string[]
    ) {}
  }
}
