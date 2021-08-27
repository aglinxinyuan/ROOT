// function handleMessageResult(resultData) {
//     $("#person").file(resultData['person'])
//     $("#name").text(resultData['name'])
//     $("#time").text(resultData['time'])
//     $("#previewContent").text(resultData['previewContent'])
// }
//
//
// jQuery.ajax({
//     dataType: "json", // Setting return data type
//     method: "GET", // Setting request method
//     url: "activity"+window.location.search, // Setting request url, which is mapped by StarsServlet in Stars.java
//     success: (resultData) => handleMessageResult(resultData) // Setting callback function to handle data returned successfully by the StarsServlet
// });