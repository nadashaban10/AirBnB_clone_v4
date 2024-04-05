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
});
