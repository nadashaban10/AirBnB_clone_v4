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
});