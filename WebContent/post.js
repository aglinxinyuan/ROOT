let createPost_form = $("#createPost_form");


function handlePostResult(resultData) {
    $("#postTitle").text(resultData['postTitle'])
    $("#postDescription").text(resultData['postDescription'])
    $("#postLocation").text(resultData['postLocation'])
}


function submitPostForm(formSubmitEvent) {
    formSubmitEvent.preventDefault();
    $.ajax(
        "api/login", {
            method: "POST",
            data: createPost_form.serialize(),
            success: handlePostResult
        }
    );
}

createPost_form.submit(submitPostForm);




$(function(){
    $("#fileupload5").change(function(event) {
        let var1 = URL.createObjectURL(event.target.files[0]);
        $("#upload-img1").attr("src",var1);
        console.log(event);
    });

    $("#fileupload6").change(function(event) {
        let var2 = URL.createObjectURL(event.target.files[0]);
        $("#upload-img2").attr("src",var2);
        console.log(event);
    });

})
