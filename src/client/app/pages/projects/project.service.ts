/// <reference path="../../typings/app.d.ts" />

module app.pages.projects {
    'use strict';

	export class ProjectService {

		static $inject = ['$log', '$http'];
		constructor(private $log: ng.ILogService, private $http: ng.IHttpService) {
			this.clear();
			this.loadProjects();
			this.loadAvailableBuildTemplates();
		}

		public isLoading = false;
		public currentProjects = [];
		public availableBuildTemplates: any[] = [];

		public newProject = {
			name: '',
			type: '',
			contact: '',
			email: '',
			description: '',
			githubUrl: '',
			buildTemplate: 0
		};		

		public clear() {
			this.newProject.name = "";
			this.newProject.type = "";
			this.newProject.contact = "";
			this.newProject.email = "";
			this.newProject.description = "";
			this.newProject.githubUrl = "";
			this.newProject.buildTemplate = 0;
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
					console.log('templates: ' + self.availableBuildTemplates.join(','));
				}, function loadProjectsErrorCallback(error) {
					self.isLoading = false;
					self.$log.error(error);
				}
			);
		}
	}

	app.Module.load('app.pages.projects').addService('ProjectService', ProjectService);
}
