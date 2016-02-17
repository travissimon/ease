/// <reference path="../../typings/app.d.ts" />

module app.pages.deployments {
    'use strict';

	export class DeploymentService {

		static $inject = ['$log', '$http'];
		constructor(private $log: ng.ILogService, private $http:ng.IHttpService) {
			this.loadDeployments();
			this.loadContainers();
		}

		public isLoading = false;
		public currentContainers = [];
		public currentDeployments = [];

		public loadDeployments() {
			var url: string = '/proxy/goobernet/v1/deployments';
			var self = this;
			this.isLoading = true;
			this.$http.get(url).then(
				function loadContainersCallback(response) {
					self.isLoading = false;
					self.currentDeployments = <any[]>response.data;
				}, function loadContainersErrorCallback(error) {
					self.isLoading = false;
					self.$log.error(error);
				}
			);
		}

		public loadContainers() {
			var url: string = '/proxy/goobernet/v1/containers';
			var self = this;
			this.isLoading = true;
			this.$http.get(url).then(
				function loadContainersCallback(response) {
					self.isLoading = false;
					self.currentContainers = <any[]>response.data;
				}, function loadContainersErrorCallback(error) {
					self.isLoading = false;
					self.$log.error(error);
				}
			);
		}

	}

	app.Module.load('app.pages.deployments').addService('DeploymentService', DeploymentService);
}
