module app {
	'use strict';

	export class ArticleService {

		private logger: ILogger;

		constructor(logger: LoggerService, private $templateCache: any, private $filter: any) {
			this.logger = logger.getLogger('ArticleService');
      		this.logger.log('init');
		}

		getArticle(url: string) : Article {
			var articles: Article[] = this.articleData();
			var searchfilter = this.$filter('filter')(articles, url, true, 'url');
			var article: Article = searchfilter[0];
			article.content = this.$templateCache.get(article.dataSource);		  
			return article;
		}

		getArticles(categories : string[], tags : string[]) : Article[] {
			// var articles : Article[] = this.articleData();
			var searchFilter  : Article[] = this.articleData();

			if (tags != null && tags.length > 0) {
				searchFilter = searchFilter.filter(article => {
           			for (let art of tags) {
           				return article.tags.indexOf(art) > -1;
           			}
           			return false;
           		});
			}

			if (categories != null && categories.length > 0) {
				searchFilter = searchFilter.filter(article => {
           			for (let cat of categories) {
           				return article.categories.indexOf(cat) > -1;
           			}
           			return false;
           		});
			}

			return searchFilter;
		}

		private articleData(): Article[] {
		  var articles : Article[] = [];

		  articles.push(new Article(
		  	'Freshman Merchandise Trailer Schedule - 2016',
		  	'/classof2020/articles/freshman-merchandise-schedule-2016',
		  	new Date(2016, 8, 26),
		  	'articles/freshman-merchandise-trailer-schedule-2016.md',
		  	'/images/articles/bronco_stadium.jpg',
		  	'Louis Krivanek',
		  	['classof2020','highschool','sports'],
		  	['football'])
		  );

		  articles.push(new Article(
		  	'Freshman Mustangs vs Edmond Santa Fe',
		  	'/classof2020/articles/mustang-vs-edmond-santa-fe-freshman',
		  	new Date(2016, 8, 26),
		  	'articles/freshman-edmond-santa-fe-2016.md',
		  	'/images/articles/bronco_stadium.jpg',
		  	'Elvis Leeper',
		  	['classof2020','highschool','sports'],
		  	['football'])
		  );

		  articles.push(new Article(
		  	'MYSA Colts - First Practice',
		  	'/mysacolts/articles/first-practice',
		  	new Date(2016, 8, 21),
		  	'articles/mysa-colts-first-practice.md',
		  	'/images/articles/mysa-soccer-field.jpg',
		  	'Erik Craddock',
		  	['mysacolts', 'sports'],
		  	['soccer'])
		  );

		  articles.push(new Article(
		  	'Freshman Scrimmage West Moore',
		  	'/classof2020/articles/west-moore-scrimmage',
		  	new Date(2016, 8, 20),
		  	'articles/west-moore-scrimmage.md',
		  	'/images/articles/west-moore-scrimmage-2016.jpg',
		  	'Erik Craddock',
		  	['classof2020','highschool','sports'],
		  	['football', 'scrimmage'])
		  );

		  // articles.push(new Article(
		  // 	'First day of school',
		  // 	'/classof2020/articles/first-day-school',
		  // 	new Date(2016, 8, 18),
		  // 	'articles/first-day-school-2016.md',
		  // 	'/images/articles/mhs_photo.jpeg',
		  // 	'Erik Craddock',
		  // 	['classof2020', 'highschool'],
		  // 	[])
		  // );

		  articles.push(new Article(
		  	'Freshman Red White Scrimmage',
		  	'/classof2020/articles/red-white-scrimmage',
		  	new Date(2016, 8, 13),
		  	'articles/red-white-scrimmage.md',
		  	'/images/articles/redwhitescrimmage.jpg',
		  	'Erik Craddock',
		  	['classof2020', 'highschool', 'sports'],
		  	['football', 'scrimmage'])
		  );
		  
		  return articles;
		}
	}

	angular
    .module('app')
    .service('articleService', ArticleService);
}
