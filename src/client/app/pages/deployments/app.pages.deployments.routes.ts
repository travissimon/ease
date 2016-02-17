/// <reference path="../../typings/app.d.ts" />

module app.pages.deployments {

	class DeploymentsRoutesConfigurator {

		static $inject = ['routeHelper', '$log'];
		constructor(routeHelper: app.components.routes.IRouteHelper, $log: ng.ILogService) {
			routeHelper.addRoutes(DeploymentsRoutesConfigurator.getStates());
		}

		static getStates(): Array<angular.ui.IState> {
			return [
				{
					"name": "deployment-index",
					"url": "/deployments/index",
					"controller": "DeploymentIndexController",
					"controllerAs": "vm",
					"templateUrl": "src/client/app/pages/deployments/deployment-index.template.html"
				}
			]
		}
	}

	app.Module.load('app.pages.deployments').run(DeploymentsRoutesConfigurator);

}
