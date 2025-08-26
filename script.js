let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');

};




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

    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');

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

document.getElementById("contactForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    const form = event.target;
    const message = document.getElementById("formMessage");

    try {
        let response = await fetch(form.action, {
            method: "POST",
            body: new FormData(form),
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            message.textContent = "Message sent successfully!";
            message.style.color = "green";
            message.style.display = "block";
            form.reset();
        } else {
            message.textContent = "Failed to send message. Please try again.";
            message.style.color = "red";
            message.style.display = "block";
        }
    } catch (error) {
        message.textContent = "Something went wrong. Try again later!";
        message.style.color = "red";
        message.style.display = "block";
    }
});