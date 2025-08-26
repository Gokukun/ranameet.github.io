let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}




let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll=() => {
    sections.forEach(sec =>{
        let top = window.scrollY;
        let offset =sec.offsetTop - 150;
        let height =sec.offsetHeight;
        let id =sec.getAttribute('id');

        if(top >=offset && top <offset + height ){
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id +']').classList.add('active');

            });

        };


    });
    let header = document.querySelector('header');

    header.classList.toggle('sticky',window.scrollY > 100);

};

document.querySelector("form").addEventListener("submit", function(e) {
    e.preventDefault();
    var form = this;
    fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
    }).then(response => {
        if (response.ok) {
            document.getElementById("form-result").innerHTML = "Message sent successfully!";
            form.reset();
        } else {
            document.getElementById("form-result").innerHTML = "Failed to send message.";
        }
    });
});