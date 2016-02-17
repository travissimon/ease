/// <reference path="../../typings/app.d.ts" />

module app.pages.environments {

	class EnvironmentsRoutesConfigurator {

		static $inject = ['routeHelper', '$log'];
		constructor(routeHelper: app.components.routes.IRouteHelper, $log: ng.ILogService) {
			routeHelper.addRoutes(EnvironmentsRoutesConfigurator.getStates());
		}

		static getStates(): Array<angular.ui.IState> {
			return [
				{
					"name": "environment-index",
					"url": "/environments/index",
					"controller": "EnvironmentIndexController",
					"controllerAs": "vm",
					"templateUrl": "src/client/app/pages/environments/environment-index.template.html"
				}
			]
		}
	}

	app.Module.load('app.pages.environments').run(EnvironmentsRoutesConfigurator);

}
