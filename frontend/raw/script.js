$(document).ready(function() {
    var max_fields = 10; // maximum input boxes allowed
    var wrapper = $(".input_fields_wrap"); // Fields wrapper
    var add_button = $(".add_field_button"); // Add button ID

    var x = 1; // initial text box count

    $(add_button).click(function(e) { // on add input button click
        e.preventDefault();
        if (x < max_fields) { // max input box allowed
            // text box increment
            $(wrapper).append('<div class="input-box"><input type="text" name="mytext[]"/><a href="#" class="remove_field">Remove</a></div>'); // add input box
            x++;
        }
    });

    $(wrapper).on("click", ".remove_field", function(e) { // user click on remove text
        e.preventDefault();
        $(this).parent('div').remove();
        x--;
    });
});
