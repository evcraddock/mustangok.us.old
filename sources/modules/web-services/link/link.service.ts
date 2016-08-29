module app {
	'use strict';

	export class LinkService {

		private logger: ILogger;

		constructor(logger: LoggerService, private $templateCache: any, private $filter: any) {
			this.logger = logger.getLogger('LinkService');
      		this.logger.log('init');
		}

		getLink(url: string) : Link {
			var links: Link[] = this.linkData();
			var searchfilter = this.$filter('filter')(links, url, true, 'url');
			var link: Link = searchfilter[0];
			return link;
		}

		getLinks(categories : string[], tags : string[]) : Link[] {
			var links : Link[] = this.linkData();
			var searchFilter : Link[] = [];

			if (tags != null && tags.length > 0) {
				searchFilter = links.filter(link => {
           			for (let art of tags) {
           				return link.tags.indexOf(art) > -1;
           			}
           			return false;
           		});
			}

			if (categories != null && categories.length > 0) {
				searchFilter = links.filter(link => {
           			for (let cat of categories) {
           				return link.categories.indexOf(cat) > -1;
           			}
           			return false;
           		});
			}

			return (searchFilter.length > 0) ?searchFilter : links;
		}

		private linkData(): Link[] {
		  var links : Link[] = [];
		  links.push(new Link(
		  	'Mustang Highschool News',
		  	'Mustang Highschool News',
		  	'/highschool/articles',
		  	'',
		  	'Erik Craddock',
		  	['highschool', 'sports'],
		  	['football'])
		  );

		  links.push(new Link(
		  	'Class of 2020 News',
		  	'Freshman News',
		  	'/classof2020/articles',
		  	'',
		  	'Erik Craddock',
		  	['classof2020', 'highschool', 'school'],
		  	[''])
		  );

		  links.push(new Link(
		  	'Class of 2020 Football News',
		  	'Freshman Football',
		  	'/classof2020/football/articles',
		  	'',
		  	'Erik Craddock',
		  	['classof2020', 'highschool', 'sports'],
		  	['football'])
		  );

		  links.push(new Link(
		  	'MYSA Colts News',
		  	'MYSA Colts News',
		  	'/mysacolts/articles',
		  	'',
		  	'Erik Craddock',
		  	['mysacolts', 'sports'],
		  	['football'])
		  );
		  return links;
		}
	}

	angular
    .module('app')
    .service('linkService', LinkService);
}
