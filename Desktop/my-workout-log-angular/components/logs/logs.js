(function(){
	angular
		.module('workoutlog.logs', ['ui.router'])
		.config(logsConfig);

	logsConfig.$inject = [ '$stateProvider' ];
	function logsConfig($stateProvider){
		$stateProvider
			.state('logs', {
				url: '/logs',
				templateUrl: '/components/logs/logs.html',
				controller: LogsController,
				controllerAs: 'ctrl',
				bindToController: this,
				resolve: {
				getUserDefinitions: [
					'DefineService',
					function(DefineService) {
						return DefineService.fetch();
					}
				]
			}

		});
	}

	LogsController.$inject = [ 'DefineService', 'LogsService' ];
	function LogsController( DefineService, LogsService ) {
		var vm = this;
		vm.log = {};
		vm.userDefinitions = DefineService.getDefinitions();
		vm.save = function() {
			LogsService.save(vm.log);
		};
	}
})();