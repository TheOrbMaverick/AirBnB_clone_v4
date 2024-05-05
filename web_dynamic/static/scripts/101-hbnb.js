$(document).ready(function () {
    const checkedAmenities = {};
    const checkedStates = {};
    const checkedCities = {};

    function updateAmenitiesList() {
        const amenitiesList = Object.values(checkedAmenities).join(", ");
        $(".amenities > h4").text(amenitiesList);
    }

    function updateLocationsList() {
        const statesList = Object.values(checkedStates).join(", ");
        const citiesList = Object.values(checkedCities).join(", ");
        $(".locations > h4").text(statesList + ", " + citiesList);
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

    $(".locations input[type='checkbox']").change(function () {
        const id = $(this).closest("li").data("id");
        const name = $(this).closest("li").data("name");

        if ($(this).is(":checked")) {
            checkedCities[id] = name;
        } else {
            delete checkedCities[id];
        }

        updateLocationsList();
    });

    const apiUrl = 'http://0.0.0.0:5001/api/v1/places_search/';

    function updatePlaces() {
        $.ajax({
            type: 'POST',
            url: apiUrl,
            contentType: 'application/json',
            data: JSON.stringify({
                amenities: Object.keys(checkedAmenities),
                states: Object.keys(checkedStates),
                cities: Object.keys(checkedCities)
            }),
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

    $(".filters button").click(function () {
        updatePlaces();
    });

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

    // Event listener for the span next to the Reviews h2
    $(".reviews h2 span").click(function () {
        const reviewsElement = $(this).parent().next(); // Get the reviews element
        if ($(this).text() === "show") {
            // Fetch and display reviews
            // Assuming there's a function fetchAndDisplayReviews() to fetch and display reviews
            fetchAndDisplayReviews();
            $(this).text("hide"); // Change the text to "hide"
        } else {
            // Hide reviews
            reviewsElement.empty(); // Remove all review elements from the DOM
            $(this).text("show"); // Change the text to "show"
        }
    });

    // Function to fetch and display reviews
    function fetchAndDisplayReviews() {
        // Implementation of fetching and displaying reviews
    }
});