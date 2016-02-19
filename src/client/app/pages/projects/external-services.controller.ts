/// <reference path="../../typings/app.d.ts" />

module app.pages.projects {
    'use strict';

	export interface ExternalServicesScope extends ng.IScope {
		vm: ExternalServicesController;
		jobState: string;
		job: any;
		errorMessage: string;
	}

	export class ExternalServicesController {

		static $inject = ['$scope', '$log', 'ProjectService'];
		constructor(private $scope: ExternalServicesScope, private $log: ng.ILogService, private projectService: app.pages.projects.ProjectService) {
			this.init();
			$scope.vm = this;

			$scope.jobState = this.NONE_SPECIFIED;
			$scope.job = null;
			$scope.errorMessage = '';

			if (this.projectService.newProject.shortName.length > 0) {
				this.queryForJob($scope);
			}
		}

		init(): void {
		}

		private NONE_SPECIFIED = 'None Specified';
		private QUERYING = 'Querying';
		private UNKNOWN = 'Unknown';
		private EXISTS = 'Exists';
		private DOES_NOT_EXIST = 'Does Not Exist';

		public getTimeDisplay(timeStr) {
			return moment(timeStr).fromNow();
		}

		public getDurationDisplay(amnt) {
			return moment.duration(amnt).as('seconds') + ' seconds';
		}

		public queryForJob($scope) {
			$scope.jobState = this.QUERYING;
			$scope.job = null;
			
			var self = this;
			this.projectService.queryForJob(this.projectService.newProject.shortName).then(
				function queryForJobCallback(response) {
					$scope.jobState = (response == null ? self.UNKNOWN : self.EXISTS);
					$scope.job = response;
				}, function queryErrorCallback(err) {
					if (err.status == 404) {
						$scope.errorMessage = err;
						$scope.jobState = self.DOES_NOT_EXIST;
						$scope.job = null;						
					} else {
						$scope.errorMessage = err;
						$scope.jobState = self.UNKNOWN;
						$scope.job = null;
					}
				}
			);
		}

	}

	app.Module.load('app.pages.projects').addController('ExternalServicesController', ExternalServicesController);
}
