function handleMainResult(resultData) {
    $("#university").text(resultData['university'])
    $("#title").text(resultData['title'])
    $("#location").text(resultData['location'])
}


jQuery.ajax({
    dataType: "json", // Setting return data type
    method: "GET", // Setting request method
    url: "activity"+window.location.search, // Setting request url, which is mapped by StarsServlet in Stars.java
    success: (resultData) => handleMainResult(resultData) // Setting callback function to handle data returned successfully by the StarsServlet
});