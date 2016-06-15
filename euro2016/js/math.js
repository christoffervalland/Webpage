var totalGoals = 0;
var averageGoals = 0;
var updated = "";

$.getJSON("./matchData.json", function(matchjson){
  //Data loaded, but do not do anything until EVERYTHING is loaded!
})
.done(function(matchjson){
  totalGoals = 0;
  averageGoals = 0;
  updated = "";

  var matches = matchjson.matches;
  updated = matchjson.updated;

  $("#lastUpdate").append(updated);

  $.each(matches, function(i, match){
    var goalsInMatch = match.goals.homegoals + match.goals.awaygoals;
    totalGoals += goalsInMatch;

    $('#matchList').append("<li>" + match.teams.home + " - " + match.teams.away + "</li>");
    $('#goalList').append("<li>" + match.goals.homegoals + " - " + match.goals.awaygoals + "</li>");
  })

  averageGoals = (totalGoals / matches.length).toFixed(2);

  $("#currentGoals").append(totalGoals);
  $("#currentGoalsAverage").append(averageGoals);
})
.error(function(){
  alert("Failed to fetch match data. Please contact CHV.");
});
