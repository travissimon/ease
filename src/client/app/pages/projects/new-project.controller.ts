/// <reference path="../../typings/app.d.ts" />

module app.pages.projects {
    'use strict';

	export interface NewProjectScope extends ng.IScope {
		vm: NewProjectController;
	}

	export class NewProjectController {

		static $inject = ['$scope', '$log'];
		constructor(private $scope: NewProjectScope, private $log: ng.ILogService) {
			this.init();
			$scope.vm = this;
		}

		init(): void {
		}

	}

	app.Module.load('app.pages.projects').addController('NewProjectController', NewProjectController);
}
