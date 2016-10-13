module app {
	'use strict';

	export class LinkService {

		private logger: ILogger;
		private ROUTES = {
		  linkUri: '/links'
		};

		constructor(logger: LoggerService,
					private $filter: any,
					private $q: ng.IQService,
	                private restService: RestService,
					private contextService: ContextService) {
			this.logger = logger.getLogger('LinkService');
      		this.logger.log('init');
		}

		getLink(url: string) : ng.IPromise<Link> {
			var params = { 'url': url };

			return this.queryLinks(params)
			.then((response) => {
				if (response) {
					var link : Link = response[0];

					return link;
				}

				return this.$q.reject();
			})
			.catch(function() {
				return this.$q.reject();
			});
		}

		getLinks(categories : string[], tags : string[]): ng.IPromise<Link[]> {
			var params = {};

			if (categories && categories.length > 0) {
				params['categories'] = categories;
			}

			if (tags && tags.length > 0) {
				params['tags'] = tags;
			}

			return this.queryLinks(params);
		}

		queryLinks(params?: any): ng.IPromise<Link[]>  {
			var links : Link[] = [];

		    return this.restService
	        .get(this.ROUTES.linkUri, params, true)
	        .then((response) => {
	        	if (response.data) {
	        		response.data.forEach((item) => {
			            links.push(this.converttolink(item));
			        });

	        		return links;
	        	}

	        	return this.$q.reject();
	        })
	        .catch(function() {
	          return links;
	        });
	    }

	    private converttolink(data : any) : Link {
	    	var link = new Link(
	    		data.title,
	    		data.linkTitle,
	    		data.url,
	    		data.banner,
	    		data.author,
	    		data.categories,
	    		data.tags
    		);

			return link;
	    }

		// private linkData(): Link[] {
		//   var links : Link[] = [];
		//   links.push(new Link(
		//   	'Mustang Highschool News',
		//   	'Mustang Highschool News',
		//   	'/highschool/articles',
		//   	'',
		//   	'Erik Craddock',
		//   	['highschool', 'sports'],
		//   	['football'])
		//   );

		//   links.push(new Link(
		//   	'Class of 2020 News',
		//   	'Freshman News',
		//   	'/classof2020/articles',
		//   	'',
		//   	'Erik Craddock',
		//   	['classof2020', 'highschool', 'school'],
		//   	[''])
		//   );

		//   links.push(new Link(
		//   	'Class of 2020 Football News',
		//   	'Freshman Football',
		//   	'/classof2020/football/articles',
		//   	'',
		//   	'Erik Craddock',
		//   	['classof2020', 'highschool', 'sports'],
		//   	['football'])
		//   );

		//   links.push(new Link(
		//   	'MYSA Colts News',
		//   	'MYSA Colts News',
		//   	'/mysacolts/articles',
		//   	'',
		//   	'Erik Craddock',
		//   	['mysacolts', 'sports'],
		//   	['football'])
		//   );
		//   return links;
		// }
	}

	angular
    .module('app')
    .service('linkService', LinkService);
}
