module app {

  'use strict';

  /**
   * Displays the home screen.
   */
  export class TwentyTwentyCalendarController {
    title: string;
    sectionTitle: string;
    sideHeader: string;
    isLoading: boolean = true;
    links: Link[] = [];

    private logger: ILogger;
    private articleService: ArticleService;
    private linkService: LinkService;

    constructor(linkService: LinkService, logger: LoggerService, $state: any, private $templateCache: any) {

      
      this.logger = logger.getLogger('Classof2020Calendar');
      this.logger.log('init');
      
      this.sideHeader = $templateCache.get('modules/screens/classof2020/sideheader.html');
      this.linkService = linkService;
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
    .controller('twentytwentycalendarController', TwentyTwentyCalendarController);

}
