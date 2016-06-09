$(function(){
  $.getJSON("./flare.json", function(jsonData){
    var visDiv = new CodeFlower("#flowerDiv", 1028, 860);
    visDiv.update(jsonData);

    var countries = jsonData.children;
    var competitors = countries.children;

    $.each(countries, function(i, item){
      var competitors = item.children;
      $.each(competitors, function(i, item){
        if(item.in){
          if(item.in === "no"){
            $("#outOfCompBoard").append('<li id="li' + item.name + '">' + item.name + '</li>');
            return "rgb(150,150,150)";
          }
          $("#leaderBoard").append('<li id="li' + item.name + '">' + item.name + " " + item.goals + '</li>');
        }
      });
    });

    sortLeaderBoard();
  })
  .fail(function(){
    alert("Failed to load data! Please notify CHV!");
  });

  function sortLeaderBoard(){
    var mylist = $('#leaderBoard');
    var listitems = mylist.children('li').get();
    var numberOfGoals = parseInt($("#currentGoals").text().substr($("#currentGoals").length-2));

    if(numberOfGoals === 0){
      numberOfGoals = 1;
    }

    listitems.sort(function(a, b) {
      var firstValue = $(a).text().substr($(a).length - 4);
      var compA = firstValue / numberOfGoals;
      if(compA === 0){
        compA = firstValue;
      }
      var secondValue = $(b).text().substr($(a).length - 4);
      var compB = secondValue / numberOfGoals;
      if(compB === 0){
        compB = secondValue;
      }

      return (compA < compB) ? -1 : (compA > compB) ? 1 : 0;
    })
    $.each(listitems, function(idx, itm) { mylist.append(itm); });

    for(var i = 0; i < listitems.length; i++){

    }
  }
});
