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

    $(".input-style-1.files input[type=file]").on('change', function(e) {
        addTextAndImagesCountToFilesInput($(this));
    });

    // add new product inputs group
    $(".input-style-1-group .inputs-label-container button").on('click', function(e) {
        let lastProductInputs = $(".inputs-container:last-child");
        lastProductInputs.clone().insertAfter(lastProductInputs);
        let lastAddedProductInputs = $(".inputs-container:last-child");
        lastAddedProductInputs.find(".remove-item-btn").removeClass("d-none");
        let newInputs = lastAddedProductInputs.find("input");
        newInputs.each(function() {
            $(this).val('');
        });
        if (!lastAddedProductInputs.find(".images-count-text").hasClass("d-none")) {
            lastAddedProductInputs.find(".images-count-text").addClass("d-none");
        }
        lastAddedProductInputs.find(".custom-file-upload span").empty();

        //TODO: fix the issue here (the firstChildTextInput and firstChildImagesInput are undefined)
        var firstChildTextInput = $(".inputs-container:first-child input[type=text]");
        var firstChildImagesInput = $(".inputs-container:first-child input[type=file]");
        var firstChildTextInputId = firstChildTextInput.attr("id");
        var firstChildTextInputName = firstChildTextInput.attr("name");
        var firstChildImagesInputId = firstChildImagesInput.attr("id");
        var firstChildImagesInputName = firstChildImagesInput.attr("name");

        var allProductsInputsGroups = $(".inputs-container");
        allProductsInputsGroups.each(function(index) {
            if (index == allProductsInputsGroups.length - 1) {
                let currentTextInput = $(this).find("input[type=text]");
                let currentImagesInput = $(this).find("input[type=file]");

                currentTextInput.attr("id", firstChildTextInputId + `_${index}`);
                currentTextInput.attr("name", firstChildTextInputName + `_${index}`);
                currentImagesInput.attr("id", firstChildImagesInputId + `_${index}`);
                currentImagesInput.attr("name", firstChildImagesInputName + `_${index}`);
            }
        });

        $(".input-style-1-group .remove-item-btn").each(function() {
            $(this).on('click', function(e) {
                $(this).closest(".inputs-container").remove();
            });
        });

        $(".input-style-1.files input[type=file]").each(function() {
            $(this).on('change', function(e) {
                addTextAndImagesCountToFilesInput($(this));
            });
        });
    });

    $(".agreement-text .checkbox input").on("change", function() {
        if (!$(this).prop('checked') == true) {
            $(".signup-form button[type=submit]").attr("disabled", true);
        } else {
            $(".signup-form button[type=submit]").attr("disabled", false);
        }
    });
});

function addTextAndImagesCountToFilesInput(selector) {
    let files = selector.get(0).files;
    let filesNames = [];
    if (files.length > 0) {
        for (var i = 0; i < files.length; ++i) {
            filesNames.push(files[i].name);
        }
    }
    let newLabelText = "";
    filesNames.forEach(function(fileName, index) {
        if (index == filesNames.length - 1) {
            newLabelText += (fileName);
        } else {
            newLabelText += (fileName + ", ");
        }
    });
    selector.closest("label").find("span").empty().text(newLabelText);
    selector.closest(".form-group").find(".images-count-text").removeClass("d-none").find("span").text(filesNames.length);
}