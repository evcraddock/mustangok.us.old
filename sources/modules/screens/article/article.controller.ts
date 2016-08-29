module app {

  'use strict';

  /**
   * Displays the home screen.
   */
  export class ArticleController {
    title: string;
    sectionTitle: string;
    sideHeader: string;
    article: Article;
    links: Link[] = [];

  	private logger: ILogger;
    private articleService: ArticleService;
    private linkService: LinkService;

    constructor(articleService: ArticleService, linkService: LinkService, logger: LoggerService, $state: any, $stateParams: any, private $templateCache: any) {
      this.logger = logger.getLogger('Permalink');
      this.logger.log('init');
      this.articleService = articleService;
      this.linkService = linkService;
      this.article = this.getArticle($stateParams.category, $stateParams.permalink);
      this.links = this.linkService.getLinks([$stateParams.category], null);
      this.sideHeader = $templateCache.get('modules/screens/' + $stateParams.category + '/sideheader.html');
      if ($state.$current.data) {
        this.title = $state.$current.data.title;
        this.sectionTitle = $state.$current.data.sectionTitle;
      }
    }

    getArticle(prefix: string, articlename: string) : Article {
      if (prefix.length === 0 || articlename.length === 0) {
        return null;
      }  

      var articleUrl = "/" + prefix + '/articles/' + articlename;

      return this.articleService.getArticle(articleUrl);
    }
  }

angular
    .module('app')
    .controller('articleController', ArticleController);

}

