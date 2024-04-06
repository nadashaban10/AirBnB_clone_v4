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
    $.get('http://127.0.0.1:5001/api/v1/status/', function(data, status) {
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
    $.ajax({
        type:'POST',
        URL:'http://127.0.0.1:5000/api/v1/places_search',
        contentType: 'application/json',
        dataType: 'json',
        data: '{}',
        success: function(places){
            for (let i = 0; i < places.lenght; i++) {
                $('.places').append(<article>
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
                    );
                        }
                      },
                    });
                });