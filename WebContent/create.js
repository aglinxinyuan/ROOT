let createEvent_form = $("#createEvent_form");


function handleEventResult(resultData) {
    $("#evenTitle").text(resultData['evenTitle'])
    $("#eventDescription").text(resultData['eventDescription'])
    $("#eventLocation").text(resultData['eventLocation'])
    $("#eventDate").text(resultData['eventDate'])
}


function submitEventForm(formSubmitEvent) {
    formSubmitEvent.preventDefault();
    $.ajax(
        "api/login", {
            method: "POST",
            data: createEvent_form.serialize(),
            success: handleEventResult
        }
    );
}

createEvent_form.submit(submitEventForm);











$(function(){
    $("#fileupload1").change(function(event) {
        let var1 = URL.createObjectURL(event.target.files[0]);
        $("#upload-img1").attr("src",var1);
        console.log(event);
    });

    $("#fileupload2").change(function(event) {
        let var2 = URL.createObjectURL(event.target.files[0]);
        $("#upload-img2").attr("src",var2);
        console.log(event);
    });

    $("#fileupload3").change(function(event) {
        let var3 = URL.createObjectURL(event.target.files[0]);
        $("#upload-img3").attr("src",var3);
        console.log(event);
    });

    $("#fileupload4").change(function(event) {
        let var4 = URL.createObjectURL(event.target.files[0]);
        $("#upload-img4").attr("src",var4);
        console.log(event);
    });
})


// $("#jquery-upload-button").click(function(){
//     let formData = new FormData();
//     let file = $("#file")[0].files[0];
//     formData.append('file', file);
//
//     $.ajax({
//         url:'upload.php',
//         type:'post',
//         data: formData,
//         contentType: false,
//         processData: false,
//         success:function(data){
//                 if (data !== 0){
//                 alert('Successful JQuery file upload to: '+ data);
//             }
//             else{
//                 alert('JQuery file upload error.');
//             }
//         },
//     });
// });

//
// $(document).ready(function (){
//     $('form#uploadform').submit(function (e){
//         e.preventDefault();
//         let FormData = new FormData(this);
//         $.ajax({
//            type:"post",
//             url:'upload.php',
//             data: FormData,
//             cache: false,
//             processData:false,
//             contentType: false,
//             success: function (data){
//                console.log(data);
//             }
//         });
//     })
// })
//

