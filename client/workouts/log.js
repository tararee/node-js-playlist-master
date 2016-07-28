$(function() { // same as $(document).ready(function() {
	$.extend(WorkoutLog, {
		log: {
			workouts: [],
			
			setDefinitions: function() {
				var defs = WorkoutLog.definition.userDefinitions;
				var len = defs.length;
				var opts;
				for (var i = 0; i < len; i++) {
					opts = "<option value='" + defs[i].id + "'>" + defs[i].description + "</option>";
				}
				$("#log-definition").append(opts);
			}	
		}
	});
});