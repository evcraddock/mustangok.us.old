module app {

  'use strict';

  /**
   * Displays the home screen.
   */
  export class TwentyTwentyController {
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

      
      this.logger = logger.getLogger('Classof2020');
      this.logger.log('init');
      this.articleService = articleService;
      this.linkService = linkService;
      this.sideHeader = $templateCache.get('modules/screens/classof2020/sideheader.html');
      var allarticles: Article[] = this.articleService.getArticles(['classof2020'], null);
      this.articles = allarticles.slice(1);
      this.article = allarticles[0];
      this.article.content = $templateCache.get(this.article.dataSource);
      //var overview = this.article.content.match('/\n/g)||[]');

      this.article.overview = this.article.content.split('\n')[0];
      this.links = this.linkService.getLinks(['classof2020'], null);

      this.isLoading = false;

      if ($state.$current.data) {
        this.title = $state.$current.data.title;
        this.sectionTitle = $state.$current.data.sectionTitle;
      }
    }
  }

  angular
    .module('app')
    .controller('twentytwentyController', TwentyTwentyController);

}
