const imgDiv = document.querySelector('.Pic');
const img = document.querySelector('#photo');
const file = document.querySelector('#file');
const uploadBtn = document.querySelector('#uploadBTN');


document.querySelector("#file").addEventListener("change", function(){
        const reader = new FileReader();

        reader.addEventListener("load", function(){
            let result = reader.result.toString();
            localStorage.setItem("recent-image", result);
        });
        reader.readAsDataURL(this.files[0]);

})