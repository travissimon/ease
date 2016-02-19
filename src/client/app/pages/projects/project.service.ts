/// <reference path="../../typings/app.d.ts" />

module app.pages.projects {
    'use strict';

	export class ProjectService {

		static $inject = ['$log', '$http', '$q'];
		constructor(private $log: ng.ILogService, private $http: ng.IHttpService, private $q: ng.IQService) {
			this.clear();
			this.loadProjects();
			this.loadAvailableBuildTemplates();
		}

		public isLoading = false;
		public currentProjects = [];
		public availableBuildTemplates: any[] = [];

		public newProject = {
			name: '',
			shortName: '',
			description: '',
			email: '',
			contactName: '',
			githubUrl: '',
			buildTemplate: '',
		};		

		public clear() {
			this.newProject.name = '';
			this.newProject.shortName = '';
			this.newProject.description = '';
			this.newProject.email = '';
			this.newProject.contactName = '';
			this.newProject.githubUrl = 'https://github.inside.nicta.com.au/';
			this.newProject.buildTemplate = '';
		}

		public loadProjects() {
			var url: string = '/proxy/goobernet/v1/projects';
			var self = this;
			this.isLoading = true;
			this.$http.get(url).then(
				function loadProjectsCallback(response) {
					self.isLoading = false;
					self.currentProjects = <any[]>response.data;
				}, function loadProjectsErrorCallback(error) {
					self.isLoading = false;
					self.$log.error(error);
				}
			);
		}

		public loadAvailableBuildTemplates() {
			var url: string = '/proxy/goobernet/v1/templates';
			var self = this;
			this.isLoading = true;
			this.$http.get(url).then(
				function loadTemplatesCallback(response) {
					self.isLoading = false;
					self.availableBuildTemplates = <any[]>response.data;
				}, function loadProjectsErrorCallback(error) {
					self.isLoading = false;
					self.$log.error(error);
				}
			);
		}

		public queryForJob(jobName: string): ng.IPromise<any> {
			var deferred = this.$q.defer();
			var promise = deferred.promise;

			var url: string = '/proxy/goobernet/v1/job/' + jobName;
			var self = this;
			this.isLoading = true;
			this.$http.get(url).then(
				function loadTemplatesCallback(response) {
					self.isLoading = false;
					deferred.resolve(<any>response.data)
				}, function loadProjectsErrorCallback(error) {
					self.isLoading = false;
					deferred.reject(error);
				}
			);

			return promise;
		}

		public createJob(): ng.IPromise<any> {
			var deferred = this.$q.defer();
			var promise = deferred.promise;

			var url: string = '/proxy/goobernet/v1/job/' + this.newProject.shortName;
			var self = this;
			this.isLoading = true;

			var jsonStr = JSON.stringify(this.newProject)
			this.$http.post(url, jsonStr).then(
				function loadTemplatesCallback(response) {
					self.isLoading = false;
					deferred.resolve(<any>response.data)
				}, function loadProjectsErrorCallback(error) {
					self.isLoading = false;
					deferred.reject(error);
				}
			);

			return promise;			
		}
	}

	app.Module.load('app.pages.projects').addService('ProjectService', ProjectService);
}
