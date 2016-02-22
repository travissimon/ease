/// <reference path="../../typings/app.d.ts" />

module app.pages.home {
    'use strict';

	export interface HomepageScope extends ng.IScope {
		vm: HomepageController;
	}

	export class HomepageController {

		static $inject = ['$scope', '$log', 'HomepageService'];
		constructor(private $scope: HomepageScope, private $log: ng.ILogService, private homepageService: app.pages.home.HomepageService) {
			this.init();
			$scope.vm = this;
		}

		init(): void {
		}

		public getDeploymentForEnvironment(environment, easement) {
			for (var i = 0; i < easement.deployments.length; i++) {
				var env = easement.deployments[i].environment;
				if (env === environment) {
					return easement.deployments[i];
				}
			}
			return null;
		}

		public easementHasContainer(environment, easement) {
			var deployment = this.getDeploymentForEnvironment(environment, easement);
			return deployment != null && deployment.container != null;
		}

		public getTimeDisplay(timeStr) {
			return moment(timeStr).fromNow();
		}

		public getDurationDisplay(amnt) {
			return moment.duration(amnt).as('seconds') + ' seconds';
		}

		private getRelativeDate(time: number) : string {
			return moment.unix(time).fromNow();
		}

		private notRunningRe = /(restarting)|(paused)|(created)/g;
		private badRe = /(exited)|(dead)/g;
		private getStatusIcon(container) {
			if (container == null || container.status == null) {
				return 'fa fa-frown-o text-danger';
			}
			var status = container.status.toLowerCase();
			if (status.startsWith('up')) {
				return 'fa fa-smile-o text-success';
			} else if (this.notRunningRe.test(status)) {
				return 'fa fa-meh-o text-warning';
			} else {
				return 'fa fa-frown-o text-danger';
			}
		}

		private canCreate(environment, easement) {
			var deployment = this.getDeploymentForEnvironment(environment, easement);
			return (deployment == null || deployment.container == null);
		}

		private canPlay(environment, easement) {
			var deployment = this.getDeploymentForEnvironment(environment, easement);
			if (deployment == null || deployment.container == null) {
				return false
			}
			var status = deployment.container.status;
			if (status.startsWith('up')) {
				return false; // already running
			}
			return this.notRunningRe.test(status);
		}

		private canPause(environment, easement) {
			var deployment = this.getDeploymentForEnvironment(environment, easement);
			if (deployment == null || deployment.container == null) {
				return false
			}
			var status = deployment.container.status.toLowerCase();
			return status.startsWith('up');
		}

		private canStop(environment, easement) {
			return this.canPause(environment, easement);
		}

		private canDelete(environment, easement) {
			var deployment = this.getDeploymentForEnvironment(environment, easement);
			return deployment != null && deployment.container != null;
		}

		private getPlayText(environment, easement) {
			return 'Create ' + environment + ' ' + easement.name;
		}

	}

	app.Module.load('app.pages.home').addController('HomepageController', HomepageController);
}
