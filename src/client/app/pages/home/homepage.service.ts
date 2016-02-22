/// <reference path="../../typings/app.d.ts" />

module app.pages.home {
    'use strict';

	export class HomepageService {

		static $inject = ['$log', '$http', '$q'];
		constructor(private $log: ng.ILogService, private $http: ng.IHttpService, private $q: ng.IQService) {
			this.loadOverview()
		}

		public isLoading = false;
		public overview = null;

		public loadOverview() {
			var url: string = '/proxy/goobernet/v1/overview';
			var self = this;
			this.isLoading = true;
			this.$http.get(url).then(
				function loadProjectsCallback(response) {
					self.isLoading = false;
					self.overview = <any>response.data;
				}, function loadProjectsErrorCallback(error) {
					self.isLoading = false;
					self.$log.error(error);
				}
			);
		}
	}

	app.Module.load('app.pages.home').addService('HomepageService', HomepageService);
}
