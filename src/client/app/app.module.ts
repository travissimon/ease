/// <reference path="typings/app.d.ts" />

((): void => {
	app.Module.create('app', [
		"app.components.api",
		"app.components.navbar",
		"app.components.profiling",
		"app.components.routes",
		"app.components.stacktrace",
		"app.layout",
		"app.pages.deployments",
		"app.pages.environments",
		"app.pages.home",
		"app.pages.projects",
		"ui.router"
	]);
})()
