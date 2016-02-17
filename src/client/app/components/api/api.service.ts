/// <reference path="../../typings/app.d.ts" />

module app.components.api {
    'use strict';

	export class ApiService {

		static $inject = ['$log'];
		constructor(private $log: ng.ILogService) {
		}
	}

	app.Module.load('app.components.api').addService('ApiService', ApiService);
}
