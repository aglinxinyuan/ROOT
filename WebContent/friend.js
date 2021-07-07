function handleFriendResult(resultData) {
    $("#person").file(resultData['person'])
    $("#name").text(resultData['name'])
    $("#emailAddress").text(resultData['emailAddress'])
}


jQuery.ajax({
    dataType: "json", // Setting return data type
    method: "GET", // Setting request method
    url: "activity"+window.location.search, // Setting request url, which is mapped by StarsServlet in Stars.java
    success: (resultData) => handleFriendResult(resultData) // Setting callback function to handle data returned successfully by the StarsServlet
});