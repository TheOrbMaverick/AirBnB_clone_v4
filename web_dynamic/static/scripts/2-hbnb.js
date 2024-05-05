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
  
    const url = 'http://0.0.0.0:5001/api/v1/status/';
  
    function updateApiStatus() {
      $.ajax({
        type: 'GET',
        url: url,
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
