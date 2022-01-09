$(document).ready(function() {
    $(".signup-form").validate();

    //assign the value to the hidden input of phone
    var phoneDropdownInput = $(".input-style-1.phone-dropdown");
    phoneDropdownInput.find("input[type=hidden]").val(phoneDropdownInput.find("select").val());
    phoneDropdownInput.find("select").on('change', function(e) {
        let hiddenInput = $(this).closest(".inputs-container").find("input[type=hidden]");
        let telInputValue = $(this).closest(".inputs-container").find("input[type=tel]").val();
        hiddenInput.val($(this).val() + telInputValue);
    });

    phoneDropdownInput.find("input[type=tel]").on("input", function() {
        let hiddenInput = $(this).closest(".inputs-container").find("input[type=hidden]");
        hiddenInput.val(phoneDropdownInput.find("select").val());
        let hiddenInputCurrentValue = hiddenInput.val();
        let hiddenInputNewValue = hiddenInputCurrentValue + $(this).val();
        hiddenInput.val(hiddenInputNewValue);
    });

    if (!$(".agreement-text .checkbox input").prop('checked') == true) {
        $(".signup-form button[type=submit]").attr("disabled", true);
    }

    $(".agreement-text .checkbox input").on("change", function() {
        if (!$(this).prop('checked') == true) {
            $(".signup-form button[type=submit]").attr("disabled", true);
        } else {
            $(".signup-form button[type=submit]").attr("disabled", false);
        }
    });
});