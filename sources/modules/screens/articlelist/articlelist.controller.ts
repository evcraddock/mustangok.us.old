module app {

  'use strict';

  /**
   * Displays the home screen.
   */
  export class ArticleListController {
    title: string;
    sectionTitle: string;
    sideHeader: string;
    isLoading: boolean = true;
    articles: Article[] = [];
    links: Link[] = [];
    pageInfo: Link;

    private logger: ILogger;
    private articleService: ArticleService;
    private linkService: LinkService;

    constructor(articleService: ArticleService, linkService: LinkService, logger: LoggerService, $state: any, $stateParams: any, private $templateCache: any) {

      this.logger = logger.getLogger('Article List');
      this.logger.log('init');
      this.articleService = articleService;
      this.linkService = linkService;
      // if ($state.$current.data) {
      //   this.title = $state.$current.data.title;
      //   this.sectionTitle = $state.$current.data.sectionTitle;
      //   // this.section = 
      // }
      this.sideHeader = $templateCache.get('modules/screens/' + $stateParams.category + '/sideheader.html');
      this.pageInfo = this.getLink($state.href($state.current.name));
      this.articles = this.getArticles($stateParams.category, $stateParams.tag);
      this.links = this.linkService.getLinks([$stateParams.category], null);
      this.isLoading = false;
    }

    private getArticles(category: string, tag: string) : Article[]{
      if (category != null && tag != null) {
        return this.articleService.getArticles([category], [tag]);
      }

      if (category != null) {
        return this.articleService.getArticles([category], null);
      }

      if (tag != null) {
        return this.articleService.getArticles(null, [tag]);
      }

      return null;
    }

    private getLink(url: string) : Link {
      var hurl : string = url.substr(1, url.length);

      return this.linkService.getLink(hurl);
    }
  }

  angular
    .module('app')
    .controller('articlelistController', ArticleListController);

}
