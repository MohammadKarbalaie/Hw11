document.addEventListener('DOMContentLoaded', function() {  
    const btn1 = document.getElementById("gologinbtn") as HTMLButtonElement | null;  
    const user = document.getElementById("username") as HTMLInputElement | null;  
    const Submitbtn = document.getElementById("sbtn") as HTMLButtonElement | null;  
    const inputpass = document.getElementById("password") as HTMLInputElement | null;  
    const eyes = document.getElementById("eyes") as HTMLElement | null;  
    const gosignup = document.getElementById("gosignup") as HTMLParagraphElement | null;  
    const btn2 = document.getElementById('goonboardingbtn') as HTMLButtonElement | null;  

    
    if (btn2) {  
     btn2.addEventListener('click', function() {  
      window.location.href = "/index.html";  
     });  
    }  
    
    if (btn1) {  
     btn1.addEventListener('click', function() {  
      window.location.href = "/login.html";  
     });  
    }  
    
    if (gosignup) {  
     gosignup.addEventListener('click', function() {  
      window.location.href = "/signup.html";  
     });  
    }  
    
    function ActiveBtn(): void {  
        if (inputpass && user) {  
         if (inputpass.value !== "" && user.value !== "") {  
           if (Submitbtn) {  
            Submitbtn.style.backgroundColor = "black";  
           }  
         } else {  
           if (Submitbtn) {  
            Submitbtn.style.backgroundColor = "";  
           }  
         }  
        }  
       }  
       
       if (inputpass) {  
        inputpass.addEventListener("input", ActiveBtn);  
       }  
       
       function Eyecontrolpass(): void {  
        if (inputpass && eyes) {  
         if (inputpass.type === "password") {  
           inputpass.type = "text";  
           eyes.classList.remove("fa-eye");  
           eyes.classList.add("fa-eye-slash");  
         } else {  
           inputpass.type = "password";  
           eyes.classList.remove("fa-eye-slash");  
           eyes.classList.add("fa-eye");  
         }  
        }  
       }  
       
       if (eyes) {  
        eyes.addEventListener('click', Eyecontrolpass);  
       }  
     });