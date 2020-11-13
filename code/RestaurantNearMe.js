var http = require('http')
var console = require('console')
module.exports.function = function restaurantNearMe(foodtype, location) {
  var latitude = location.point.latitude;
  var longitude = location.point.longitude;
  var url = "https://developers.zomato.com/api/v2.1/search";
  var options = {
    format: "json",
    headers: {
      "Accept": "application/json",
      "user-key": "cd830f4f567a995967a4a0f641b21007"
    },
    query: {
      "lat": latitude,
      "lon": longitude,
      "radius": 0
    }
  }
  var response = http.getUrl(url, options);
  var allrestaurants = response.restaurants;
  var requiredRes = [];
  if (foodtype == "Veg") {
    requiredRes = allrestaurants.map(rest => {
      var list = rest.restaurant.highlights;
      if (list.length > 0 && list.indexOf("Pure Veg") > -1) {
        return rest.restaurant.name;
      }
      else return "";
    });
  }
  else {
    requiredRes = allrestaurants.map(rest => {
      var list = rest.restaurant.highlights;
      if (list.length > 0 && list.indexOf("Pure Veg") <= -1) {
        return rest.restaurant.name;
      }
      else return "";
    });
  }
  //var requiredRes = requiredRes.find(rest => rest != null);
  if(requiredRes.length === 0){
    return {restaurantName: ["No such restaurant near you"]};
  }
  return { restaurantName: requiredRes };
}
