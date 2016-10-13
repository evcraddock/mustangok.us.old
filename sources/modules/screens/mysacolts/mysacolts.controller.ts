module app {

  'use strict';

  /**
   * Displays the home screen.
   */
  export class MysaColtsController {
    title: string;
    sectionTitle: string;
    sideHeader: string;
    isLoading: boolean = true;
    quote: string = null;
    redwhite: string;
    articles: Article[] = [];
    article: Article;
    links: Link[] = [];

    private logger: ILogger;
    private articleService: ArticleService;
    private linkService: LinkService;
    private cache: any;

    constructor(
      articleService: ArticleService,
      linkService: LinkService,
      logger: LoggerService,
      $state: any,
      $templateCache: any) {

      this.logger = logger.getLogger('MYSAColts');
      this.logger.log('init');
      this.articleService = articleService;
      this.linkService = linkService;
      this.cache = $templateCache;
      this.sideHeader = $templateCache.get('modules/screens/mysacolts/sideheader.html');

      this.loadData('mysacolts', null);
      this.isLoading = false;

      if ($state.$current.data) {
        this.title = $state.$current.data.title;
        this.sectionTitle = $state.$current.data.sectionTitle;
      }
    }

    loadData(category: string, tag: string) {
      var allarticles = [];
      var categories = [];
      var tags = [];

      if (category) {
        categories.push(category);
      }

      if (tag) {
        tags.push(tag);
      }

      this.linkService.getLinks(categories, tags)
      .then((links: Link[]) => {
        if (links.length > 0) {
          return links;
        }
      });

      this.articleService.getAllArticles(categories, tags)
      .then((articles: Article[]) => {
              allarticles = articles;

              if (allarticles.length > 0) {
                      this.articles = allarticles.slice(1);
                      this.article = allarticles[0];
                      this.article.content = this.cache.get(this.article.dataSource);

                      this.article.overview = this.article.content.split('\n')[0];
                    }
      })
      .finally(() => {
        // return [];
        this.isLoading = false;
      });
    }
  }

  angular
    .module('app')
    .controller('mysacoltsController', MysaColtsController);

}
