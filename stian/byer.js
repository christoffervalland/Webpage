<<<<<<< HEAD
var data;

$.get("byer.json").done(function(cityData){
  data = cityData;
  console.log(data);
});

$("#searchButton").click(function(){
  var searchTerm = $("#searchField").val();
  for (var i = 0; i < data.length; i++){
    if(data[i].postnummer == searchTerm){
      console.log("i " + data[i].postnummer);
      $("#searchResult").text("Du søkte etter: " + searchTerm + ", og renten der er: " + data[i].rente);
    }
  }
});
=======
var data;

$.get("byer.json").done(function(cityData){
  data = cityData;
  console.log(data);
});

$("#searchButton").click(function(){
  var searchTerm = $("#searchField").val();
  for (var i = 0; i < data.length; i++){
    if(data[i].postnummer == searchTerm){
      console.log("i " + data[i].postnummer);
      $("#searchResult").text("Du søkte etter: " + searchTerm + ", og renten der er: " + data[i].rente);
    }
  }
});
>>>>>>> origin/master
