/// <reference path="../../typings/app.d.ts" />

module app.pages.deployments {
    'use strict';

	export interface DeploymentIndexScope extends ng.IScope {
		vm: DeploymentIndexController;
	}

	export class DeploymentIndexController {

		static $inject = ['$scope', '$log', 'DeploymentService'];
		constructor(private $scope: DeploymentIndexScope, private $log: ng.ILogService, private deploymentService: app.pages.deployments.DeploymentService) {
			this.init();
			$scope.vm = this;
		}

		init(): void {
		}

		private getRelativeDate(time: number) : string {
			return moment.unix(time).fromNow();
		}

		private notRunningRe = /(restarting)|(paused)|(created)/g;
		private badRe = /(exited)|(dead)/g;
		private getStatusIcon(container) {
			var status = container.status.toLowerCase();
			if (status.startsWith('up')) {
				return 'fa fa-smile-o text-success';
			} else if (this.notRunningRe.test(status)) {
				return 'fa fa-meh-o text-warning';
			} else {
				return 'fa fa-frown-o text-danger';
			}
		}

	}

	app.Module.load('app.pages.deployments').addController('DeploymentIndexController', DeploymentIndexController);
}
