module app {

  'use strict';

  export class CalendarController {
    title: string;
    sectionTitle: string;
    sideHeader: string;
    isLoading: boolean = true;
    category: string;
    tag: string;
    links: Link[] = [];

    private logger: ILogger;
    private linkService: LinkService;

    constructor(
      linkService: LinkService,
      logger: LoggerService,
      $state: any,
      $stateParams: any,
      private $templateCache: any) {

      this.logger = logger.getLogger('Calendar');
      this.logger.log('init');
      
      this.category = $stateParams.category;
      this.tag = $stateParams.tag;
      var org = (this.category) ? this.category : 'home';

      this.sideHeader = $templateCache.get('modules/screens/sidemenu/' + org + '.html');

      this.linkService = linkService;

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
      })
      .finally(() => {
        this.isLoading = false;
      });
    }
  }

  angular
    .module('app')
    .controller('calendarController', CalendarController);

}
