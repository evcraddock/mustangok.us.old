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
    category: string;
    tag: string;
    currentPage: number = 1;
    itemsPerPage: number = 3;

    private logger: ILogger;
    private articleService: ArticleService;
    private linkService: LinkService;
    private cache: any;

    constructor(
      articleService: ArticleService,
      linkService: LinkService,
      logger: LoggerService,
      $state: any,
      $stateParams: any,
      $templateCache: any) {

      this.logger = logger.getLogger('Home');
      this.logger.log('init');
      this.articleService = articleService;
      this.linkService = linkService;
      this.cache = $templateCache;

      this.category = $stateParams.category;
      this.tag = $stateParams.tag;
      var org = (this.category) ? this.category : 'home';

      this.sideHeader = $templateCache.get('modules/screens/sidemenu/' + org + '.html');
      this.loadData();

      if ($state.$current.data) {
        this.title = $state.$current.data.title;
        this.sectionTitle = $state.$current.data.sectionTitle;
      }
    }

    loadData() {
      var allarticles = [];
      var categories = [];
      var tags = [];

      if (this.category) {
        categories.push(this.category);
      }

      if (this.tag) {
        tags.push(this.tag);
      }

      this.linkService.getLinks(categories, tags)
      .then((links: Link[]) => {
        if (links.length > 0) {
          this.links = links;
        }
      });

      this.articleService.getAllArticles(categories, tags)
      .then((articles: Article[]) => {
        allarticles = articles;

        if (allarticles.length > 0) {
          this.articles = allarticles.slice(1);
          this.article = allarticles[0];

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
