$(document).ready(function(){

    // Fetch data from the Represent Civic Information API
    $.ajax({
        url: "https://represent.opennorth.ca",
        dataType: 'jsonp',
        success: function(results){
            console.log(results);
        }
    });

    // Do functions with it

    console.log('Compiled');
});
