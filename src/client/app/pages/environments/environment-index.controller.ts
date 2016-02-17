/// <reference path="../../typings/app.d.ts" />

module app.pages.environments {
    'use strict';

	export interface EnvironmentIndexScope extends ng.IScope {
		vm: EnvironmentIndexController;
		newEnvironment: () => void;
	}

	export class EnvironmentIndexController {

		static $inject = ['$scope', '$log', '$state', 'EnvironmentService'];
		constructor(private $scope: EnvironmentIndexScope, private $log: ng.ILogService, private $state: ng.ui.IStateService, private environmentService: app.pages.environments.EnvironmentService) {
			this.init();
			var self = this;
			$scope.vm = this;

			$scope.newEnvironment = function() {
				self.$state.go('new-environment');
			}
		}

		init(): void {
		}

	}

	app.Module.load('app.pages.environments').addController('EnvironmentIndexController', EnvironmentIndexController);
}
