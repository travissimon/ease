/// <reference path="../../typings/app.d.ts" />

module app.pages.projects {
    'use strict';

	export interface NewProjectScope extends ng.IScope {
		vm: NewProjectController;
		navigateToExternal(): void;
	}

	export class NewProjectController {

		static $inject = ['$scope', '$log', '$state', 'ProjectService'];
		constructor(private $scope: NewProjectScope, private $log: ng.ILogService, private $state: ng.ui.IStateService, private projectService: app.pages.projects.ProjectService) {
			this.init();
			var self = this;
			$scope.vm = this;

			$scope.navigateToExternal = function() {
				self.$state.go('project-external-services');
			}

			$scope.$watch(function() {
				return self.projectService.newProject.name;
			}, function(newVal) {
				if (newVal == null) {
					return;
				}
				self.projectService.newProject.shortName = self.kebabCase(newVal);
			});
		}

		init(): void {
		}

		private spaceRe = /(\W)+/g;
		public kebabCase(input: string): string {
			var lc = input.toLowerCase();
			return lc.replace(this.spaceRe, '-');
		}

	}

	app.Module.load('app.pages.projects').addController('NewProjectController', NewProjectController);
}
