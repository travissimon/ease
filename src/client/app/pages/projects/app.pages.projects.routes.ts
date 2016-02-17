/// <reference path="../../typings/app.d.ts" />

module app.pages.projects {

	class ProjectsRoutesConfigurator {

		static $inject = ['routeHelper', '$log'];
		constructor(routeHelper: app.components.routes.IRouteHelper, $log: ng.ILogService) {
			routeHelper.addRoutes(ProjectsRoutesConfigurator.getStates());
		}

		static getStates(): Array<angular.ui.IState> {
			return [
				{
					"name": "project-index",
					"url": "/projects/index",
					"controller": "ProjectIndexController",
					"controllerAs": "vm",
					"templateUrl": "src/client/app/pages/projects/project-index.template.html"
				},
				{
					"name": "new-project",
					"url": "/projects/new",
					"controller": "NewProjectController",
					"controllerAs": "vm",
					"templateUrl": "src/client/app/pages/projects/new-project.template.html"
				},
				{
					"name": "projects-git",
					"url": "/projects/git",
					"controller": "GitController",
					"controllerAs": "vm",
					"templateUrl": "src/client/app/pages/projects/git.template.html"
				}
			]
		}
	}

	app.Module.load('app.pages.projects').run(ProjectsRoutesConfigurator);
}
