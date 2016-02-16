/// <reference path="../../typings/app.d.ts" />

module app.components.projects {
    'use strict';

	export class ProjectService {

		static $inject = ['$log', '$http'];
		constructor(private $log: ng.ILogService, private $http: ng.IHttpService) {
			this.clear();
			this.loadProjects();
		}

		public isLoading = false;
		public currentProjects = [];

		public newProject = {
			name: '',
			type: '',
			contact: '',
			email: '',
			description: '',
			githubUrl: '',
			buildTemplate: 0
		};
		
		public availableBuildTemplates: any[] = [];

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
	}

	app.Module.load('app.pages.projects').addService('ProjectService', ProjectService);
}
