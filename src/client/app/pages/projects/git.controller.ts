/// <reference path="../../typings/app.d.ts" />

module app.pages.projects {
    'use strict';

	export interface GitScope extends ng.IScope {
		vm: GitController;
	}

	export class GitController {

		static $inject = ['$scope', '$log'];
		constructor(private $scope: GitScope, private $log: ng.ILogService) {
			this.init();
			$scope.vm = this;
		}

		init(): void {
		}

	}

	app.Module.load('app.pages.projects').addController('GitController', GitController);
}
