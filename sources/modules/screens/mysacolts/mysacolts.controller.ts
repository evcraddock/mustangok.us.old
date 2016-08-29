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

    constructor(articleService: ArticleService, linkService: LinkService, logger: LoggerService, $state: any, private $templateCache: any) {     
      this.logger = logger.getLogger('MYSAColts');
      this.logger.log('init');
      this.articleService = articleService;
      this.linkService = linkService;
      this.sideHeader = $templateCache.get('modules/screens/mysacolts/sideheader.html');
      var allarticles: Article[] = this.articleService.getArticles(['mysacolts'], null);
      this.articles = (allarticles.length > 1) ? allarticles.slice(1) : null;
      this.article = allarticles[0];
      this.article.content = $templateCache.get(this.article.dataSource);

      this.article.overview = this.article.content.split('\n')[0];
      this.links = this.linkService.getLinks(['mysacolts'], null);

      this.isLoading = false;

      if ($state.$current.data) {
        this.title = $state.$current.data.title;
        this.sectionTitle = $state.$current.data.sectionTitle;
      }
    }
  }

  angular
    .module('app')
    .controller('mysacoltsController', MysaColtsController);

}
