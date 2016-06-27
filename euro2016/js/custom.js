var competitors = [];
var numberofgames = 51;
$(function(){
  $("#outOfCompDiv").css("visibility", "hidden");

  loadData();

});

function loadData(){
  $.getJSON("./competitorData.json", function(jsonData){
    //Reset data in order to "refresh" data.
    competitors = [];

    var visDiv = new CodeFlower("#flowerDiv", 930, 860);
    visDiv.update(jsonData);

    var countries = jsonData.children;

    $.each(countries, function(i, country){
      $.each(country.children, function(i, competitor){
        competitors.push(competitor);
      });
    });
  })
  .done(function(){
    addAndSortLeaderBoard();
    addAndSortLeaderBoardByAverage();
  })
  .fail(function(){
    alert("Failed to load data! Please notify CHV!");
  });
}

function addAndSortLeaderBoard(){
  var mylist = $('#leaderBoard');
  var insiders = [];
  var outsiders = [];

  $.each(competitors, function(idx, competitor) {
    if(competitor.in) {
      if(competitor.in === "no") {
        outsiders.push(competitor);
        outsiders.sort(function(a,b){
          return a.name - b.name;
        });
      } else {
        insiders.push(competitor);
        insiders.sort(function(a,b){
          var firstValue = a.goals;
          var secondValue = b.goals;

          return Math.abs(totalGoals-firstValue) - Math.abs(totalGoals-secondValue);
        });
      }
    }
  });

  $.each(insiders, function(idx, competitor){
    $("#leaderBoard").append('<li id="li' + competitor.name + '">' + competitor.name + " " + competitor.goals + '</li>');
  });

  $.each(outsiders, function(idx, competitor){
    $("#outOfCompBoard").append('<li id="li' + competitor.name + '">' + competitor.name + '</li>');
  });

  if($("#outOfCompBoard li").length > 0){
    $("#outOfCompDiv").css("visibility", "visible");
  }
}

function addAndSortLeaderBoardByAverage(){
  var mylist = $('#leaderBoardAverage');
  var insiders = [];
  var outsiders = [];
  $.each(competitors, function(idx, competitor) {
    mylist.append(competitor);

    if(competitor.in){
      if(competitor.in === "no") {
        outsiders.push(competitor);
        outsiders.sort(function(a,b){
          return a.name - b.name;
        });
      } else {
        insiders.push(competitor);
        insiders.sort(function(a,b){
          var first = (a.goals / numberofgames).toFixed(2);
          var second = (b.goals / numberofgames).toFixed(2);
          return Math.abs(averageGoals - first) - Math.abs(averageGoals - second) || a.name - b.name;
        });
      }
    }
  });

  $.each(insiders, function(idx, competitor){
    var competitorsAverage = (competitor.goals / numberofgames).toFixed(2);
    $("#leaderBoardAverage").append('<li id="li' + competitor.name + '">' + competitor.name + " " + competitorsAverage + '</li>');
  });

  $.each(outsiders, function(idx, competitor){
    $("#outOfCompBoardAverage").append('<li id="li' + competitor.name + '">' + competitor.name + '</li>');
  });
}
