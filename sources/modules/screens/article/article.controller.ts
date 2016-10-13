module app {

  'use strict';

  export class ArticleController {
    title: string;
    sectionTitle: string;
    sideHeader: string;
    isLoading: boolean = true;
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
      $stateParams: any,
      $templateCache: any) {

      this.logger = logger.getLogger('Permalink');
      this.logger.log('init');
      this.articleService = articleService;
      this.linkService = linkService;
      this.cache = $templateCache;
      this.loadData($stateParams.category, $stateParams.permalink);
      this.linkService.getLinks([$stateParams.category], null)
      .then((links: Link[]) => {
        if (links.length > 0) {
          this.links = links;
        }
      });

      this.sideHeader = $templateCache.get('modules/screens/' + $stateParams.category + '/sideheader.html');
      if ($state.$current.data) {
        this.title = $state.$current.data.title;
        this.sectionTitle = $state.$current.data.sectionTitle;
      }
    }

    loadData(prefix: string, articlename: string) : Article {

      if (prefix.length === 0 || articlename.length === 0) {
        return null;
      }

      var articleUrl = '/' + prefix + '/articles/' + articlename;

      this.articleService.getArticle(articleUrl)
      .then((article: Article) => {

          if (article) {
            this.article = article;
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
    .controller('articleController', ArticleController);

}

