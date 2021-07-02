// const imgDiv = document.querySelector('.Pic');
// const img = document.querySelector('#photo');
// const file = document.querySelector('#file');
// const uploadBtn = document.querySelector('#uploadBTN');
//
//
// document.querySelector("#file").addEventListener("change", function(){
//         const reader = new FileReader();
//
//         reader.addEventListener("load", function(){
//             let result = reader.result.toString();
//             localStorage.setItem("recent-image", result);
//         });
//         reader.readAsDataURL(this.files[0]);
//
// })

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


$("#jquery-upload-button").click(function(){
    let formData = new FormData();
    let file = $("#file")[0].files[0];
    formData.append('file', file);

    $.ajax({
        url:'upload.php',
        type:'post',
        data: formData,
        contentType: false,
        processData: false,
        success:function(data){
                if (data !== 0){
                alert('Successful JQuery file upload to: '+ data);
            }
            else{
                alert('JQuery file upload error.');
            }
        },
    });
});

//
// $(document).ready(function(){
//
//     $("#but_upload").click(function(){
//
//         let fd = new FormData();
//         let files = $('#file')[0].files;
//
//         // Check file selected or not
//         if(files.length > 0 ){
//             fd.append('file',files[0]);
//
//             $.ajax({
//                 url: 'upload.php',
//                 type: 'post',
//                 data: fd,
//                 contentType: false,
//                 processData: false,
//                 success: function(response){
//                     if(response !== 0){
//                         $("#img").attr("src",response);
//                         $(".preview img").show(); // Display image element
//                     }else{
//                         alert('file not uploaded');
//                     }
//                 },
//             });
//         }else{
//             alert("Please select a file.");
//         }
//     });
// });