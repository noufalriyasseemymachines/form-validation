const form=document.getElementById("registrationForm");
const personalDatacheckBox=document.getElementById("personalDataCheckbox");
const hiddenContainer=document.getElementById("hiddenContainer");
const firstNameError=document.getElementById("firstNameError");
const lastNameError=document.getElementById("lastNameError");
const addressError=document.getElementById("addressError");
const passwordError=document.getElementById("passwordError");
const confirmPasswordError=document.getElementById("confirmPasswordError");
const phoneError=document.getElementById("phoneError");
const emailError=document.getElementById("emailError");
const birthdayError=document.getElementById("birthdayError");
const genderError=document.getElementById("genderError");
const termsError=document.getElementById("termsError");

personalDatacheckBox.addEventListener("change",function(){
    if(personalDatacheckBox.checked){
        hiddenContainer.style.display="block";
    }
    else{
        hiddenContainer.style.display="none";
    }
});

form.addEventListener("submit",function(event){
    event.preventDefault();

    let isValid=true;

    clearErrors();

    const firstName = form.firstName.value.trim();
    const nameRegex = /^[A-Za-z]+$/;

    if (!firstName){
    showMessage(firstNameError, "First Name is required");
    isValid = false;
    }
    else if (!nameRegex.test(firstName)){
    showMessage(firstNameError, "First Name can only contain alphabets");
    isValid = false;
    }
    else{
        showMessage(firstNameError, "Success");
        firstNameError.style.color="green"
        form.firstName.classList.remove("error-input")
    }

    const lastName=form.lastName.value.trim();
    if(!lastName){
        showMessage(lastNameError,"Last Name Is Requred")
        isValid=false;
    }
    else if(!nameRegex.test(lastName)){
        showMessage(lastNameError,"Last Name Can Only Contain alphabets");
        isValid=false
    }
    else{
        showMessage(lastNameError,"Success");
        lastNameError.style.color="green"
        form.lastName.classList.remove("error-input")
    }

    const address=form.address.value.trim();
    const addressRegex=/^[A-Za-z0-9,]+$/;
    if(!address){
        showMessage(addressError,"Address Is Required");
        isValid=false;
    }
    else if(!addressRegex.test(address)){
        showMessage(addressError,"Address Can Only Contain Alphabets, Numbers And Comma");
        isValid=false
    }
    else{
        showMessage(addressError,"Success");
        addressError.style.color="green"
        form.address.classList.remove("error-input")
    }

    const password=form.password.value;
    if(password.length<6){
        showMessage(passwordError,"Password Must Be Atleast 6 Charectors");
        isValid=false;
    }
    else{
        showMessage(passwordError,"Success");
        passwordError.style.color="green"
        form.password.classList.remove("error-input")
    }

    const confirmPassword=form.confirmPassword.value;
    if(!confirmPassword){
        showMessage(confirmPasswordError,"Confirm Password Is Required");
        isValid=false;
    }
    else if(confirmPassword !== password){
        showMessage(confirmPasswordError,"Password Do Not Match");
        isValid=false;
    }
    else{
        showMessage(confirmPasswordError,"Password Matched");
        confirmPasswordError.style.color="green"
        form.confirmPassword.classList.remove("error-input")
    }

    const phone=form.phone.value;
    if (!/^\d{10}$/.test(phone)){
        showMessage(phoneError,"Phone Number Must Be Exactly 10 Digits")
        isValid=false;
    }
    else{
        showMessage(phoneError,"Success");
        phoneError.style.color="green"
        form.phone.classList.remove("error-input")
    }

    if(personalDatacheckBox.checked){
        const email = form.email.value.trim();
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        
        if (!email){
            showMessage(emailError, "Email is required");
            isValid = false;
        } else if (!emailRegex.test(email)){
            showMessage(emailError, "Invalid email format");
            isValid = false;
        }
        else{
            showMessage(emailError, "Success");
            emailError.style.color="green";
            form.email.classList.remove("error-input");
        }
       
    
        const birthday=new Date(form.birthday.value)
        const today=new Date()
        const age = today.getFullYear() - birthday.getFullYear();
        const isMinor=age <18;
        if(!age){
            showMessage(birthdayError,"Birthday is required");
            isValid=false;
        }
        else if(isMinor){
            showMessage(birthdayError,"Age Must Be Atleast 18 Years");
            isValid=false;
        }
        else{
            showMessage(birthdayError,"You are adult");
            birthdayError.style.color="green"
            form.email.classList.remove("error-input")
        }

        const gender=form.gender.value;
        if(!gender){
            showMessage(genderError,"Gender Is Required");
            isValid=false;
        }
        else{
            showMessage(genderError,"Success");
            genderError.style.color="green"
        }
    }

    const termsAccepted=form.terms.checked;
    if(!termsAccepted){
        showMessage(termsError,"You Must Accept The Terms and Conditions");
        isValid=false
    }

    if(isValid){
        window.location.href = "home.html";
        clearInputs()
    

    }
    else{
        const firstError=document.querySelector('.error-input');
        if(firstError){
            firstError.scrollIntoView({behavior:"smooth",block:"center"})
        }
    }
})

function showMessage(errorElement,errorMessage){
    errorElement.textContent=errorMessage;
    const input=errorElement.previousElementSibling;
    input.classList.add("error-input")
}

function clearErrors(){
    document.querySelectorAll(".error").forEach(e =>textContent="");
    document.querySelectorAll(".error-input").forEach(e=>e.classList.remove("error-input"));
}

function clearInputs(){
    const inputs=form.querySelectorAll('input');
    inputs.forEach((input)=>{
        input.value="";
    })
}
