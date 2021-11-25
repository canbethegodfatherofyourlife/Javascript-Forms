let formEle = document.getElementById('form')

let nameEle = document.getElementById('name')
let nameErrEle = document.getElementById('nameErrMssg')

let emailEle = document.getElementById('email')
let emailErrEle = document.getElementById('emailErrMssg')

let statusEle = document.getElementById('status')

let maleEle = document.getElementById('male')
let femaleEle = document.getElementById('female')

let formData = {
    name : "",
    email : "",
    status: "Active",
    gender: "Male"
}

statusEle.addEventListener("change",function(event){
    formData.status = event.target.value
})

maleEle.addEventListener("change",function(event){
    formData.gender = event.target.value
})

femaleEle.addEventListener("change",function(event){
    formData.gender = event.target.value
})

nameEle.addEventListener("blur",function(event){
    if (event.target.value===""){
        nameErrEle.textContent = "*Required"
    }else{
        nameErrEle.textContent = ""
    }
    formData.name = event.target.value;
})

emailEle.addEventListener("blur",function(event){
    if (event.target.value===""){
        emailErrEle.textContent = "*Required"
    }else{
        emailErrEle.textContent = ""
    }
    formData.email = event.target.value;
})

function validateformdata(){
    let {name,email} = formData

    if (name === ""){
        nameErrEle.textContent = "*Required"
    }

    if (email === ""){
        emailErrEle.textContent = "*Required"
    }
}

function submitformData(){
    let url = "https://gorest.co.in/public-api/users"

    let options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization:
            "Bearer d1177b6e8363d34789f45eed563c5010911626a7f215611f682adf74c7ddd0be"
        },
        body: JSON.stringify(formData)
      };

      fetch(url,options)
      .then(function(response){
          return response.json()
      })
      .then(function(jsonData){
          console.log(jsonData)
          if (jsonData.code === 422) {
            if (jsonData.data[0].message === "has already been taken") {
                emailErrEle.textContent = "Email Already Exists";
            }
          }
      })
}

formEle.addEventListener('submit',function(event){
    event.preventDefault()
    validateformdata()
    submitformData()
})