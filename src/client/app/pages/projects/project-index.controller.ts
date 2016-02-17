/// <reference path="../../typings/app.d.ts" />

module app.pages.projects {
    'use strict';

	export interface ProjectIndexScope extends ng.IScope {
		vm: ProjectIndexController;
		newProject: () => void;
	}

	export class ProjectIndexController {

		static $inject = ['$scope', '$log', '$state', 'ProjectService'];
		constructor(private $scope: ProjectIndexScope, private $log: ng.ILogService, private $state: ng.ui.IStateService, private projectService: app.pages.projects.ProjectService) {
			this.init();
			var self = this;
			$scope.vm = this;

			$scope.newProject = function() {
				self.$state.go('new-project');
			};
		}

		init(): void {
		}
	}

	app.Module.load('app.pages.projects').addController('ProjectIndexController', ProjectIndexController);
}
