function handleUserListResult(resultData) {

    console.log(resultData);
}

$.ajax({
    dataType: "json", // Setting return data type
    method: "GET", // Setting request method
    url: "api/userinfo", // Setting request url, which is mapped by StarsServlet in Stars.java
    success: (resultData) => handleUserListResult(resultData) // Setting callback function to handle data returned successfully by the StarsServlet
});

