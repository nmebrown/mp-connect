$(document).ready(function(){

    // Receive form information from user on submit
    $('form').on('submit', function(event) {
        event.preventDefault();

        // Set up a Handlebars template for the Representative Contact Card
        var source = document.getElementById("representative-card").innerHTML;
        var template = Handlebars.compile(source);

        // Capture postal code for API lookup
        var postal_code = $('form').find('#postal_code').val();

        // Fetch data from the Represent Civic Information API
        $.ajax({
            url: "https://represent.opennorth.ca/postcodes/" + postal_code,
            dataType: 'jsonp',
            success: function(results){
                var representative = {};
                var length = results.representatives_centroid.length;
                var template_data = [];

                // For every postal code, there is an array of representative data
                // We are looping to find the House of Commons (MP) dataset.
                // This is a brittle, quick implementation and could be further
                // improved by catching missing rep data or API errors with fallbacks.
                for(i=0;i<length;i++) {
                    representative = results.representatives_centroid[i];

                    if (representative.representative_set_name == "House of Commons") {
                        template_data = {
                            full_name: representative.name,
                            email_address: representative.email,
                            phone_number: representative.email, // which phone number?
                            image: representative.photo_url,
                            riding_location: representative.district_name,
                            party_affiliation: representative.party_name
                        };
                        break;
                    }
                }

                // Render the Handlebars template with the rep data
                $('.js-form-response').html(template(template_data));
            }
        });
    });
});
