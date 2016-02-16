/// <reference path="typings/app.d.ts" />

((): void => {
	app.Module.create('app', [
		"app.components.navbar",
		"app.components.profiling",
		"app.components.routes",
		"app.components.stacktrace",
		"app.layout",
		"app.pages.home",
		"app.pages.projects",
		"ui.router"
	]);
})()
