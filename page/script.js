const form = document.getElementById("contactForm");

form.addEventListener("submit", async function(e){

e.preventDefault();

const data = {
name: form.name.value,
email: form.email.value,
message: form.message.value,
phone: form.phone.value
};

const res = await fetch("http://localhost:3000/send",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(data)
});

const result = await res.text();

document.getElementById("result").innerText = result;

form.reset();

});