document.getElementById('button-login').addEventListener('click',function(event){
    event.preventDefault();
    const phoneNumber = document.getElementById('phone-number').value;
    const pinNumber = document.getElementById('pin-number').value;
    
    if(phoneNumber === '1234567890' && pinNumber === '1234'){
        window.location.href = 'home.html';
    }
    else{
        alert('phonenumber is 1 to 0 and Passwoerd is 1234');
    }
})