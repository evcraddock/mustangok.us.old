module app {

  'use strict';

  export class ArticleListController {
    title: string;
    sectionTitle: string;
    sideHeader: string;
    errorMessage: string;
    isLoading: boolean = true;
    articles: Article[] = [];
    links: Link[] = [];
    pageInfo: Link;

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

      this.logger = logger.getLogger('Article List');
      this.logger.log('init');
      this.articleService = articleService;
      this.linkService = linkService;
      this.cache = $templateCache;

      if ($state.$current.data) {
        this.title = $state.$current.data.title;
        this.sectionTitle = $state.$current.data.sectionTitle;
      }

      this.getLink($state.href($state.current.name));
      this.loadData($stateParams.category, $stateParams.tag);
    }

    private loadData(category: string, tag: string) {
      var categories = [];
      var tags = [];

      this.sideHeader = this.cache.get('modules/screens/' + category + '/sideheader.html');

      if (category) {
        categories.push(category);
      }

      if (tag) {
        tags.push(tag);
      }

      this.linkService.getLinks(categories, tags)
      .then((links: Link[]) => {
        if (links.length > 0) {
          this.links = links;
        }
      });

      this.articleService.getAllArticles(categories, tags)
      .then((response) => {
        if (response) {
          this.articles = response;
        }
      })
      .catch(function() {
        this.errorMessage = 'failed to load articles';
      })
      .finally(function() {
        this.isLoading = false;
      });
    }

    private getLink(url: string) {
      var hurl : string = url.substr(1, url.length);

      this.linkService.getLink(hurl)
      .then((link: Link) => {
        if (link) {
          this.pageInfo = link;
        }
      });
    }
  }

  angular
    .module('app')
    .controller('articlelistController', ArticleListController);

}
