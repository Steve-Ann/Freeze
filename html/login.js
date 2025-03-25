sessionStorage;

let signinform = document.getElementById('signinForm');
signinform.addEventListener("submit", (e) => {
  e.preventDefault();

  let email = document.getElementById("email");
  let password = document.getElementById("password");

  if (email.value === "" || password.value === "") {
    alert("Empty email or password");
  } else {
    
    let users = new Map([
      ["admin@freeze.com", "P@$$w0rd"],
      ["sales@freeze.com", "P@$$w0rd"],
      ["info@freeze.com", "P@$$w0rd"]
    ]);
    
    console.log(users);
    for (const [key, value] of users) {
      if (email.value == key) {
        if (password.value == value) {
          console.log("Login successful.");                                 
          sessionStorage.setItem('current_user', email.value)
          console.log("Session variable added: " + email.value);
          window.location.href = 'homepage.html'
        } 
      } 
    }    
  }
});


function sessionCheck() {
  const urlParams = new URLSearchParams(window.location.search);
  const authenticate = urlParams.get('authenticate');
}
