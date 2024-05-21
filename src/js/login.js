const form = document.querySelector("form")
const email = document.querySelector("#email")
const password = document.querySelector("#password")


form.addEventListener('submit', async(event) =>{
    event.preventDefault()
    const user = await validateEmail(email)
    if(user === false){
        alert("Esta persona no esta registrada")
    }else {
        if (user.password === password.value) {

            localStorage.setItem("userOnline",JSON.stringify(user))

            window.location.href= "/src/pages/dashboard.html"
        }else{
            alert("la pss es incorrecta")
        }
    }
})



async function validateEmail(email) {
    const response = await fetch(`http://localhost:3000/users?email=${email.value}`)//Trae el usuario ingresado
    const data = await response.json()

    if(data.length === 1){
        return data[0]
    } else {
        return false
    }
}