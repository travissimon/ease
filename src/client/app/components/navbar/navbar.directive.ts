/// <reference path="../../typings/app.d.ts" />

module app.components.navbar {
    'use strict';

	interface NavbarScope extends ng.IScope {
		sections: Array<SiteSection>;
	}


	interface SiteSection {
		state: string;
		text: string;
		isActive: boolean;
	}

	class NavbarDirective implements ng.IDirective {
		bindToController: boolean = false;
		restrict: string = 'EA';
		scope: {};
		templateUrl: string = 'app/components/navbar/navbar.template.html';
		link = (scope: NavbarScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {
			this.$log.debug('Navbar directive: creating sections in link method');
			scope.sections = [{
				state: 'home',
				text: 'Home',
				isActive: true,
			}, {
				state: 'project-index',
				text: 'Projects',
				isActive: false,
			}, {
				state: 'environment-index',
				text: 'Environments',
				isActive: false,
			}, {
				state: 'deployment-index',
				text: 'Deployments',
				isActive: false,
			}];
		};


		constructor(private $log: ng.ILogService) {
		}

		static factory(): ng.IDirectiveFactory {
			var directive = ($log: ng.ILogService) => {
				return new NavbarDirective($log);
			};

			directive['$inject'] = ['$log'];

			return directive;
		}

	}

	app.Module.load('app.components.navbar').addDirective('appNavbar', NavbarDirective.factory());
}
