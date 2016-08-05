(function() {
	angular.module('workoutlog')
	.service('LogsService', LogsService);

	LogsService.$inject = [ '$http', 'API_BASE' ];
	function LogsService($http, API_BASE) {
		var logsService = this;

		logsService.workouts = [];

		logsService.save = function(log) {
			return $http.post(API_BASE + 'log', {
				log: log
			}).then(function(response) {
				logsService.workouts.push(response.data);
			});
		};

		logsService.fetch = function() {
			return $http.get(API_BASE + 'log')
			.then(function(response) {
				logsService.workouts = response.data;
			});
		};

		logsService.get = function() {
			return logsService.workouts;
		};
	}
})();