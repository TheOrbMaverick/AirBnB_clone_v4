$(document).ready(function (){
    const checkedAmenities = {};

    function updateAmenities() {
        const amenitiesList = Object.values(checkedAmenities).join(", ")
        $(".Amenities > h4").text(amenitiesList)
    }

    $("amenities input[type = 'checkbox']").change(function () {
        amenityId = $(this).closest("li").data("id");

        if ($(this).is(":checked")) {
            checkedAmenities[amenityId] = $(this).closest("li").data("name");
        } else {
            delete checkedAmenities[amenityId]
        }

        updateAmenities();
    });
});
