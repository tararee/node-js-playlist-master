(function() {
	angular.module('workoutlog.auth.signin', [
		'ui.router'
	])
	.config(signinConfig);

	function signinConfig($stateProvider) {
		$stateProvider
			.state('signin', {
				url: '/signin',
				templateUrl: '/components/auth/signin.html',
				controller: SigninController,
				controllerAs: 'ctrl',
				bindToController: this
			});
	}

	signinConfig.$inject = [ '$stateProvider' ];

	function SigninController( $state, UsersService ) {
		var vm = this;
		vm.user = {};
		vm.login = function() {
			UsersService.login(vm.user).then(function() {
				$state.go('define');
			});
		};
	}
	SigninController.$inject = [ '$state', 'UsersService' ];
})();