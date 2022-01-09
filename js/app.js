$(document).ready(function() {
    //lazy loading
    if ($("img.lazy").length > 0) {
        $("img.lazy").lazy({
            effect: "fadeIn",
        });
    }

    $("i.convert-svg").each(function() {
        var $img = $(this);
        convertSvgToIcon($img);
    });

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
});

function convertSvgToIcon($img) {
    var imgID = $img.attr("id");
    var imgClass = $img.attr("class");
    var imgURL = $img.attr("data-src");
    if (typeof imgURL === "undefined") {
        return false;
    }

    $svg = getSvgIconByUrl(imgURL);
    if ($svg == null) {
        return false;
    }

    // Add replaced image's ID to the new SVG
    if (typeof imgID !== "undefined") {
        $svg = $svg.attr("id", imgID);
    }
    // Add replaced image's classes to the new SVG
    if (typeof imgClass !== "undefined") {
        $svg = $svg.attr("class", imgClass + " replaced-svg");
    }
    $img.replaceWith($svg);
}

function getSvgIconByUrl(imgURL) {
    var $svg = null;

    $.ajax({
        url: imgURL,
        type: "get",
        dataType: "xml",
        async: false,
        success: function(data) {
            $svg = $(data).find("svg");

            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr("xmlns:a");

            // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
            if (!$svg.attr("viewBox") && $svg.attr("height") && $svg.attr("width")) {
                $svg.attr("viewBox", "0 0 " + $svg.attr("height") + " " + $svg.attr("width"));
            }
        },
    });

    return $svg;
}

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