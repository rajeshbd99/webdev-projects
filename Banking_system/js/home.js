document.getElementById('btn-add-money').addEventListener('click',function(event){
    //prevent page from reloading
    event.preventDefault();
    
    const addMoneyInput = document.getElementById('input-add-money').value;
    const pinNumberInput = document.getElementById('input-pin-nuber').value;
    

    if(pinNumberInput === '1234'){
        const balance = document.getElementById('account-balance').innerText;
        
        const newBalance = parseFloat(balance) + parseFloat(addMoneyInput);

        document.getElementById('account-balance').innerText = newBalance; 
        
    }
    else{
        alert('Invalid Pin');
    }

})