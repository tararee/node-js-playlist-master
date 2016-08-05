(function(){
	angular.module('workoutlog.history', ['ui.router'])
	.config(historyConfig);

	historyConfig.$inject = [ '$stateProvider' ];
	function historyConfig($stateProvider) {
		$stateProvider
			.state('history', {
				url: '/history',
				templateUrl: '/components/history/history.html',
				controller: HistoryController,
				controllerAs: 'ctrl',
				bindToController: this,
				resolve: {
					fetchHistory: [
					'LogsService',
					function(LogsService) {
						return LogsService.fetch();
					}
				]
			}

		});
	}

	HistoryController.$inject = [ 'LogsService' ];
	function HistoryController( LogsService ) {
		var vm = this;
		vm.history = LogsService.get();
	}
})();