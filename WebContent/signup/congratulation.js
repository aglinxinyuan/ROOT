$.ajax({
    dataType: "json", // Setting return data type
    method: "GET", // Setting request method
    url: "api/verification?id="+atob(window.location.search.substring(1)), // Setting request url, which is mapped by StarsServlet in Stars.java
    success: (resultData) => handleMainResult(resultData) // Setting callback function to handle data returned successfully by the StarsServlet
});