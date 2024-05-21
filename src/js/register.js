const form = document.getElementById("register-form")

const username = document.getElementById("username")
const lastname = document.getElementById("last-name")
const email = document.getElementById("email")
const password = document.getElementById("password")
const confirmPassword = document.getElementById("confirm-password")


form.addEventListener("submit", async (event) => {
    event.preventDefault()
    const checkPasswords = validatePasswords(password, confirmPassword)
    const checkEmail = await validateEmail(email)

  if (checkPasswords === true && checkEmail === true) {
    await createUser(username,lastname,email,password)
    window.location.href= "/"
  }

})


//Check that the passwords are not the same
function validatePasswords(password, confirmPassword){
    if(password.value === confirmPassword.value){
        return true
    }else {
        return false
    }
}

//validate if the email doesn't exist
async function validateEmail(email) {
    const response = await fetch(`http://localhost:3000/users?email=${email.value}`)//Trae el usuario ingresado
    const data = await response.json()

    if(data.length === 0){
        return true
    }else {
        return false
    }
}



async function createUser(username,lastName,email,password) {
    const newUser ={
        username: username.value,
        lastName: lastName.value,
        email: email.value,
        password:  password.value
    }

    await fetch("http://localhost:3000/users", 
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUser)
        }
    )
}