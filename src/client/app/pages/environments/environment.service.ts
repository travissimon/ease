/// <reference path="../../typings/app.d.ts" />

module app.pages.environments {
    'use strict';

	export class EnvironmentService {

		static $inject = ['$log', '$http'];
		constructor(private $log: ng.ILogService, private $http: ng.IHttpService) {
			this.loadEnvironments();
		}

		public isLoading = false;
		public currentEnvironments = [];

		public loadEnvironments() {
			var url: string = '/proxy/goobernet/v1/environments';
			var self = this;
			this.isLoading = true;
			this.$http.get(url).then(
				function loadProjectsCallback(response) {
					self.isLoading = false;
					self.currentEnvironments = <any[]>response.data;
				}, function loadProjectsErrorCallback(error) {
					self.isLoading = false;
					self.$log.error(error);
				}
			);
		}
	}

	app.Module.load('app.pages.environments').addService('EnvironmentService', EnvironmentService);
}
