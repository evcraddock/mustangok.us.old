module app {

  'use strict';

  /**
   * Displays the home screen.
   */
  export class HomeController {
    title: string;
    sectionTitle: string;
    sideHeader: string;
    isLoading: boolean = true;
    articles: Article[] = [];
    article: Article;
    links: Link[] = [];

    private logger: ILogger;
    private articleService: ArticleService;
    private linkService: LinkService;

    constructor(articleService: ArticleService, linkService: LinkService, logger: LoggerService, $state: any, private $templateCache: any) {

      
      this.logger = logger.getLogger('Home');
      this.logger.log('init');
      this.articleService = articleService;
      this.linkService = linkService;
      this.sideHeader = $templateCache.get('modules/screens/home/sideheader.html');
      var allarticles: Article[] = this.articleService.getArticles(null, null);
      this.articles = allarticles.slice(1);
      this.article = allarticles[0];
      this.article.content = $templateCache.get(this.article.dataSource);

      this.article.overview = this.article.content.split('\n')[0];
      this.links = this.linkService.getLinks(null, null);

      this.isLoading = false;

      if ($state.$current.data) {
        this.title = $state.$current.data.title;
        this.sectionTitle = $state.$current.data.sectionTitle;
      }
    }
  }

  angular
    .module('app')
    .controller('homeController', HomeController);

}
