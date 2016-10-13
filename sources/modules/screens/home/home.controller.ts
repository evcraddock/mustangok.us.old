module app {

  'use strict';

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
    private cache: any;

    constructor(
      articleService: ArticleService,
      linkService: LinkService,
      logger: LoggerService,
      $state: any,
      $templateCache: any) {

      this.logger = logger.getLogger('Home');
      this.logger.log('init');
      this.articleService = articleService;
      this.linkService = linkService;
      this.cache = $templateCache;
      this.sideHeader = $templateCache.get('modules/screens/home/sideheader.html');
      this.loadData();

      if ($state.$current.data) {
        this.title = $state.$current.data.title;
        this.sectionTitle = $state.$current.data.sectionTitle;
      }
    }

    loadData() {
      var allarticles = [];

      this.linkService.getLinks(null, null)
      .then((links: Link[]) => {
        if (links && links.length > 0) {
          this.links = links;
        }
      });

      this.articleService.queryArticles()
      .then((articles: Article[]) => {
          allarticles = articles;

          if (allarticles.length > 0) {
            this.articles = allarticles.slice(1);
            this.article = this.articleService.getSingleArticle(allarticles[0]);
            this.article.overview = this.article.content.split('\n')[0];
          }
      })
      .finally(() => {
        this.isLoading = false;
      });
    }
  }

  angular
    .module('app')
    .controller('homeController', HomeController);

}
