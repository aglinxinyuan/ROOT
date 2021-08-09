$.get( "api/user", function( data ) {
    if (data==="null") {
        window.location.replace("login.html")
    }
    else {
        window.location.replace("main.html")
    }
});