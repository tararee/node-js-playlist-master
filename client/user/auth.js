$(function() {
	$.extend(WorkoutLog, {
		signup: function() {
			var username = $("#su_username").val();
			var password = $("#su_password").val();
			var user = { 
				user: { 
					username: username,
					password: password 
				}
			};

			var signup = $.ajax({
				type: "POST",
				url: WorkoutLog.API_BASE + "user",
				data: JSON.stringify( user ),
				contentType: "application/json"
			});

			signup.done(function(data) {
				if (data.sessionToken) {
					WorkoutLog.setAuthHeader(data.sessionToken);
				}

				$("#signup-modal").modal("hide");
				$(".disabled").removeClass("disabled");
				$("#loginout").text("Logout");

			}).fail(function() {
				$("#su_error").text("There was an issue with sign up").show();
			});
		},

		login: function() {
			var username = $("#li_username").val();
			var password = $("#li_password").val();
			var user = { 
				user: { 
					username: username,
					password: password 
				}
			};

			var login = $.ajax({
				type: "POST",
				url: WorkoutLog.API_BASE + "login",
				data: JSON.stringify( user ),
				contentType: "application/json"
			});

			login.done(function(data) {
				if (data.sessionToken) {
					WorkoutLog.setAuthHeader(data.sessionToken);
				}

				$("#login-modal").modal("hide");
				$(".disabled").removeClass("disabled");
				$("#loginout").text("Logout");

			}).fail(function() {
				$("#li_error").text("There was an issue with sign up").show();
			});
		},

		loginout: function() {
			if (window.localStorage.getItem("sessionToken")) {
				window.localStorage.removeItem("sessionToken");
				$("#loginout").text("Login");
			}

			// TODO: on logout make sure stuff is disabled
		}	
	});

	// bind events
	$("#login").on("click", WorkoutLog.login);
	$("#signup").on("click", WorkoutLog.signup);
	$("#loginout").on("click", WorkoutLog.loginout);

	if (window.localStorage.getItem("sessionToken")) {
		$("#loginout").text("Logout");
	}
});

