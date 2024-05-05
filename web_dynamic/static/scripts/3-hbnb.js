$(document).ready(function () {
    const checkedAmenities = {};

    function updateAmenitiesList() {
      const amenitiesList = Object.values(checkedAmenities).join(", ");
      $(".amenities > h4").text(amenitiesList);
    }

    $(".amenities input[type='checkbox']").change(function () {
      const amenityId = $(this).closest("li").data("id");

      if ($(this).is(":checked")) {
        checkedAmenities[amenityId] = $(this).closest("li").data("name");
      } else {
        delete checkedAmenities[amenityId];
      }

      updateAmenitiesList();
    });

    const apiUrl = 'http://0.0.0.0:5001/api/v1/places_search/';

    function updatePlaces() {
      $.ajax({
        type: 'POST',
        url: apiUrl,
        contentType: 'application/json',
        data: JSON.stringify({}),
        success: function (data) {
          $(".places").empty();
          for (const place of data) {
            const article = $("<article>");
            const titleBox = $("<div>").addClass("title_box");
            titleBox.append($("<h2>").text(place.name));
            titleBox.append($("<div>").addClass("price_by_night").text("$" + place.price_by_night));
            article.append(titleBox);
            const information = $("<div>").addClass("information");
            information.append($("<div>").addClass("max_guest").text(place.max_guest + " Guest" + (place.max_guest != 1 ? "s" : "")));
            information.append($("<div>").addClass("number_rooms").text(place.number_rooms + " Bedroom" + (place.number_rooms != 1 ? "s" : "")));
            information.append($("<div>").addClass("number_bathrooms").text(place.number_bathrooms + " Bathroom" + (place.number_bathrooms != 1 ? "s" : "")));
            article.append(information);
            const description = $("<div>").addClass("description").html(place.description);
            article.append(description);
            $(".places").append(article);
          }
        }
      });
    }

    updatePlaces();

    const apiUrlStatus = 'http://0.0.0.0:5001/api/v1/status/';

    function updateApiStatus() {
      $.ajax({
        type: 'GET',
        url: apiUrlStatus,
        success: function (data) {
          if (data.status === 'OK') {
            $('#api_status').addClass('available');
          } else {
            $('#api_status').removeClass('available');
          }
        }
      });
    }

    updateApiStatus();
});
