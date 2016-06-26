var totalGoals;
var averageGoals;
var updated;
var nrOfGames;

$.getJSON("./matchData.json", function(matchjson){
  //Data loaded, but do not do anything until EVERYTHING is loaded!
})
.done(function(matchjson){
  totalGoals = 0;
  averageGoals = 0;
  updated = "";
  nrOfGames = 0;

  var matches = matchjson.matches;
  updated = matchjson.updated;

  $("#lastUpdate").append(updated);

  $.each(matches, function(i, match){
    var goalsInMatch = match.goals.homegoals + match.goals.awaygoals;
    totalGoals += goalsInMatch;

    $('#matchList').append("<li>" + match.teams.home + " - " + match.teams.away + "</li>");
    $('#goalList').append("<li>" + match.goals.homegoals + " - " + match.goals.awaygoals + "</li>");
  });

  averageGoals = (totalGoals / matches.length).toFixed(2);
  nrOfGames = matches.length;

  $("#currentGoals").append(totalGoals);
  $("#currentGoalsAverage").append(averageGoals);
  $("#currentGames").append(nrOfGames);

})
.error(function(){
  alert("Failed to fetch match data. Please contact CHV.");
});
