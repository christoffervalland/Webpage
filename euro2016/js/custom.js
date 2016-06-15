$(function(){

  $("#outOfCompDiv").css("visibility", "hidden");

  $.getJSON("./competitorData.json", function(jsonData){
    //Data is loaded, but don't do anything until ALL data is loaded.
  })
  .done(function(jsonData){
    var visDiv = new CodeFlower("#flowerDiv", 930, 860);
    visDiv.update(jsonData);

    var countries = jsonData.children;

    $.each(countries, function(i, item){
      var competitors = item.children;
      $.each(competitors, function(i, item){
        if(item.in){
          if(item.in === "no"){
            $("#outOfCompBoard").append('<li id="li' + item.name + '">' + item.name + '</li>');
          } else {
            $("#leaderBoard").append('<li id="li' + item.name + '">' + item.name + " " + item.goals + '</li>');
            var competitorsAverage = (item.goals / 51).toFixed(2);
            $("#leaderBoardAverage").append('<li id="li' + item.name + '">' + item.name + " " + competitorsAverage + '</li>');
          }
        }
      });
    });

    sortLeaderBoard();
    sortLeaderBoardByAverage();

    if($("#outOfCompBoard li").length > 0){
      $("#outOfCompDiv").css("visibility", "visible");
    }
  })
  .fail(function(){
    alert("Failed to load data! Please notify CHV!");
  });

  function sortLeaderBoard(){
    var mylist = $('#leaderBoard');
    var listitems = mylist.children('li').get();

    if(totalGoals === 0){
      totalGoals = 1;
    }

    listitems.sort(function(a, b) {
      var firstValue = $(a).text().substr($(a).length - 4);
      var secondValue = $(b).text().substr($(a).length - 4);

      return Math.abs(totalGoals-firstValue) - Math.abs(totalGoals-secondValue);
    })
    $.each(listitems, function(idx, itm) { mylist.append(itm); });
  }

  function sortLeaderBoardByAverage(){
    var mylist = $('#leaderBoardAverage');
    var listitems = mylist.children('li').get();

    if(averageGoals === 0){
      averageGoals = 1;
    }

    listitems.sort(function(a,b){
      var firstCompetitor = $(a).text().substr($(a).length-5);
      var secondCompetitor = $(b).text().substr($(b).length-5);
      return Math.abs(averageGoals-firstCompetitor) - Math.abs(averageGoals-secondCompetitor);
    });

    $.each(listitems, function(idx, itm) { mylist.append(itm); });
  }
});
