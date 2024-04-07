$(document).ready(function() {
    let amenitiesChecked = {};

    $('.amenities input[type="checkbox"]').change(function() {
        const amenityId = $(this).closest('li').data('id');
        const amenityName = $(this).closest('li').data('name');

        if (this.checked) {
            amenitiesChecked[amenityId] = amenityName;
        } else {
            delete amenitiesChecked[amenityId];
        }

        let amenitiesList = Object.values(amenitiesChecked).join(', ');
        $('div.amenities h4').text('Amenities: ' + amenitiesList);
    });
    $.get('http://127.0.0.1:5001/api/v1/places_search', function(data, status) {
        console.log(status);
        console.log(data);
        if (status === 'success') {
            if (data.status === 'OK') {
                $('#api_status').addClass('available');
            } else {
                $('#api_status').removeClass('available');
            }
        }
    });
$('.filters button').click(function() {
        $.ajax({
            type:'POST',
            url:'http://127.0.0.1:5001/api/v1/places_search',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify({ amenities: Object.keys(amenitiesChecked) }),
        success: function(places){
                for (let i = 0; i < places.length; i++) {
                    $('.places').append(`
                        <article>
                            <div class="title_box">
                                <h2> ${places[i].name}</h2>
                                <div class="price_by_night"> ${places[i].price_by_night} </div>
                            </div>
                            <div class="information">
                                <div class="max_guest">${places[i].max_guest}
                                    ${places[i].max_guest > 1 ? 'Guests' : 'Guest'} </div>
                                <div class="number_rooms">${places[i].number_rooms}
                                    ${places[i].number_rooms > 1 ? 'Bedrooms' : 'Bedroom'}  </div>
                                <div class="number_bathrooms">${places[i].number_bathrooms}
                                    ${places[i].number_bathrooms > 1 ? 'Bathrooms' : 'Bathroom'}  </div>
                            </div>
                            <div class="user">
                            </div>
                            <div class="description">
                                ${places[i].description}
                            </div>
                        </article>
                    `);
                }
            }
        });
    });
});
