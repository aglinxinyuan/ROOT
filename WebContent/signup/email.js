function sendEmail() {
    let e = window.location.search.substring(1);
    Email.send({
        Host : "smtp.gmail.com",
        Username : "service@ez-cross.com",
        Password : "erg43t32fwegv",
        To : e,
        From : "service@ez-cross.com",
        Subject : "Verification",
        Body : "https://ez-cross.com/signup/congratulation.html?"+btoa(e)
    });
}
sendEmail();