module app {

  'use strict';

  export class TwentyTwentyCalendarController {
    title: string;
    sectionTitle: string;
    sideHeader: string;
    isLoading: boolean = true;
    links: Link[] = [];

    private logger: ILogger;
    private linkService: LinkService;

    constructor(
      linkService: LinkService,
      logger: LoggerService,
      $state: any,
      private $templateCache: any) {

      this.logger = logger.getLogger('Classof2020Calendar');
      this.logger.log('init');
      this.sideHeader = $templateCache.get('modules/screens/classof2020/sideheader.html');
      this.linkService = linkService;
      this.linkService.getLinks(['classof2020'], null)
      .then((links: Link[]) => {
        if (links.length > 0) {
          return links;
        }
      });

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
