(function() {
	angular
		.module('workoutlog.auth.signin', ['ui.router'])
		.config(signinConfig);

		function signinConfig($stateProvider) {
			$stateProvider
				.state('signin', {
					url: '/signin',
					templateUrl: '/auth/signin.html',
					controller: SignInController,
					controllerAs: 'ctrl',
					bindToController: this
				});
		}

		signinConfig.$inject = ['$stateProvider'];

		function SignInController($state, UsersService) {
			var vm = this;
			vm.user = {};
			vm.submit = function() {
				UsersService.create(vm.user).then(function(response) {
					$state.go('define');
				});
			};
		}

		SignInController.$inject = [ '$state', 'UsersService' ];
})();