module app {
	'use strict';

	export class ArticleService {

		private logger: ILogger;
		private ROUTES = {
		  articleUri: '/articles'
		};

		constructor(
			logger: LoggerService,
			private $templateCache: any,
			private $filter: any,
			private $q: ng.IQService,
	        private restService: RestService,
			private contextService: ContextService) {

			this.logger = logger.getLogger('ArticleService');
      		this.logger.log('init');
		}

		getArticle(url: string) : ng.IPromise<Article> {
			var params = { 'url': url };

			return this.queryArticles(params)
			.then((response) => {
				if (response) {
					return response[0];
				}

				return this.$q.reject();
			})
			.catch(function() {
				return this.$q.reject();
			});
		}

		getAllArticles(categories: string[], tags: string[]) : ng.IPromise<Article[]> {
			var params = {};

			if (categories.length > 0) {
				params['categories'] = categories;
			}

			if (tags.length > 0) {
				params['tags'] = tags;
			}

			return this.queryArticles(params);
		}

		queryArticles(params?: any): ng.IPromise<Article[]>  {
			var articles : Article[] = [];

		    return this.restService
		        .get(this.ROUTES.articleUri, params, true)
		        .then((response) => {
		        	if (response.data) {
		        		response.data.forEach((item) => {
				            articles.push(this.converttoArticle(item));
				        });

		        		return articles;
		        	}

		        	return this.$q.reject();
		        })
		        .catch(function() {
		          return articles;
		        });
	    }

	    private converttoArticle(data : any) : Article {
	    	var article = new Article(
	    		data.title,
	    		data.url,
	    		data.publishDate,
	    		data.dataSource,
	    		data.banner,
	    		data.author,
	    		data.categories,
	    		data.tags
    		);

	    	article.content = data.content;

			return article;
	    }
	}

	angular
    .module('app')
    .service('articleService', ArticleService);
}
