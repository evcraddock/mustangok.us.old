module app {
	'use strict';

	export class ArticleService {

		private logger: ILogger;
		private ROUTES = {
		  articleUri: '/articles'
		};
		private articleDirectory: string;

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
					var article : Article = response[0];
					article.content = this.loadArticleContent(article);
					return article;
				}

				return this.$q.reject();
			})
			.catch(function() {
				return this.$q.reject();
			});
		}

		loadArticleContent(article: Article) : string {
			var dataSource = this.articleDirectory + article.dataSource;
			var content = this.$templateCache.get(dataSource);

			return content;
		}

		getSingleArticle(article: Article) : Article {
			var dataSource = this.articleDirectory + article.dataSource;
			article.content = this.$templateCache.get(dataSource);
			return article;
		}

		setArticleLocation(directory: string) {
			this.articleDirectory = directory;
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

		// private articleData(): Article[] {
		//   var articles : Article[] = [];

		//   articles.push(new Article(
		//   	'Freshman football practice changes',
		//   	'/classof2020/articles/9-28-2016-freshmen-football-practice-changes',
		//   	new Date(2016, 8, 28),
		//   	'articles/9-28-2016-freshmen-football-practice-changes.md',
		//   	'/images/articles/bronco_stadium.jpg',
		//   	'Louis Krivanek',
		//   	['classof2020', 'highschool', 'sports'],
		//   	['football'])
		//   );

		//   articles.push(new Article(
		//   	'Freshman Yukon away game - 2016',
		//   	'/classof2020/articles/9-26-2016-yukon-away-game',
		//   	new Date(2016, 8, 26),
		//   	'articles/9-26-2016-Yukon-away-game.md',
		//   	'/images/articles/freshman-yukon-roadwin-2016.jpg',
		//   	'Erik Craddock',
		//   	['classof2020', 'highschool', 'sports'],
		//   	['football'])
		//   );

		//   articles.push(new Article(
		//   	'Freshman Stillwater game - 2016',
		//   	'/classof2020/articles/9-16-2016-freshmen-stillwater-game',
		//   	new Date(2016, 8, 16),
		//   	'articles/9-16-2016-freshmen-stillwater-game.md',
		//   	'/images/articles/bronco_stadium.jpg',
		//   	'Louis Krivanek',
		//   	['classof2020', 'highschool', 'sports'],
		//   	['football'])
		//   );

		//   articles.push(new Article(
		//   	'Mustang Youth football and Highschool partnership',
		//   	'/myfa/articles/youth-football-highschool-partnership',
		//   	new Date(2016, 8, 16),
		//   	'articles/9-16-2016-youth-football-highschool-partnership.md',
		//   	'/images/articles/bronco_stadium.jpg',
		//   	'Louis Krivanek',
		//   	['myfa', 'highschool', 'sports'],
		//   	['football'])
		//   );

		//   articles.push(new Article(
		//   	'Freshman Homecoming buckets- 2016',
		//   	'/classof2020/articles/9-14-2016-homecoming-buckets',
		//   	new Date(2016, 8, 14),
		//   	'articles/9-14-2016-homecoming-buckets.md',
		//   	'/images/articles/bronco_stadium.jpg',
		//   	'Louis Krivanek',
		//   	['classof2020', 'highschool', 'sports'],
		//   	['football'])
		//   );

		//   articles.push(new Article(
		//   	'Western Days parade information for freshman - 2016',
		//   	'/classof2020/articles/9-4-2016-western-days-parade-info',
		//   	new Date(2016, 8, 4),
		//   	'articles/9-4-2016-western-days-parade-info.md',
		//   	'/images/articles/westerndays-2016.jpeg',
		//   	'Louis Krivanek',
		//   	['classof2020', 'highschool', 'sports'],
		//   	['football'])
		//   );

		//   articles.push(new Article(
		//   	'Freshman Merchandise Trailer Schedule - 2016',
		//   	'/classof2020/articles/freshman-merchandise-schedule-2016',
		//   	new Date(2016, 7, 26),
		//   	'articles/freshman-merchandise-trailer-schedule-2016.md',
		//   	'/images/articles/bronco_stadium.jpg',
		//   	'Louis Krivanek',
		//   	['classof2020', 'highschool', 'sports'],
		//   	['football'])
		//   );

		//   articles.push(new Article(
		//   	'Freshman Mustangs vs Edmond Santa Fe',
		//   	'/classof2020/articles/mustang-vs-edmond-santa-fe-freshman',
		//   	new Date(2016, 7, 26),
		//   	'articles/freshman-edmond-santa-fe-2016.md',
		//   	'/images/articles/bronco_stadium.jpg',
		//   	'Elvis Leeper',
		//   	['classof2020', 'highschool', 'sports'],
		//   	['football'])
		//   );

		//   articles.push(new Article(
		//   	'MYSA Colts - First Practice',
		//   	'/mysacolts/articles/first-practice',
		//   	new Date(2016, 7, 21),
		//   	'articles/mysa-colts-first-practice.md',
		//   	'/images/articles/mysa-soccer-field.jpg',
		//   	'Erik Craddock',
		//   	['mysacolts', 'sports'],
		//   	['soccer'])
		//   );

		//   articles.push(new Article(
		//   	'Freshman Scrimmage West Moore',
		//   	'/classof2020/articles/west-moore-scrimmage',
		//   	new Date(2016, 7, 20),
		//   	'articles/west-moore-scrimmage.md',
		//   	'/images/articles/west-moore-scrimmage-2016.jpg',
		//   	'Erik Craddock',
		//   	['classof2020', 'highschool', 'sports'],
		//   	['football', 'scrimmage'])
		//   );

		//   // articles.push(new Article(
		//   // 	'First day of school',
		//   // 	'/classof2020/articles/first-day-school',
		//   // 	new Date(2016, 8, 18),
		//   // 	'articles/first-day-school-2016.md',
		//   // 	'/images/articles/mhs_photo.jpeg',
		//   // 	'Erik Craddock',
		//   // 	['classof2020', 'highschool'],
		//   // 	[])
		//   // );

		//   articles.push(new Article(
		//   	'Freshman Red White Scrimmage',
		//   	'/classof2020/articles/red-white-scrimmage',
		//   	new Date(2016, 7, 13),
		//   	'articles/red-white-scrimmage.md',
		//   	'/images/articles/redwhitescrimmage.jpg',
		//   	'Erik Craddock',
		//   	['classof2020', 'highschool', 'sports'],
		//   	['football', 'scrimmage'])
		//   );

		//   return articles;
		// }
	}

	angular
    .module('app')
    .service('articleService', ArticleService);
}
