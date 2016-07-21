$(function() {
	$.extend(WorkoutLog,{
		definition: {
			userDefinitions: [],
			create: function() {
				var def = {
					desc: $("#def-description").val(),
					type: $("#def-logtype").val()
				};
				var postData = { definition: def };
				var define = $.ajax({
					type: "POST",
					url: WorkoutLog.API_BASE + "definition",
					data: JSON.stringify(postData),
					contentType: 'application/json'
				});

				define.done(function(data) {
					WorkoutLog.definition.userDefinitions.push(data.definition);
				});

				define.fail(function() {
					console.log('oh no');
				});
			},
			fetchAll: function() {
				var getDefs = $.ajax({
					type: "GET",
					url: WorkoutLog.API_BASE + "definition",
					headers: {
						"Authorization": window.localStorage.getItem("sessionToken")
					}
				})
				.done(function(data) {
					WorkoutLog.definition.userDefinitions = data;
				})
				.fail(function(err) {
					console.log(err);
				});
			}
		}
	});

	$("#def-save").on("click", WorkoutLog.definition.create);

	if (window.localStorage.getItem("sessionToken")) {
		WorkoutLog.definition.fetchAll();
	}
});