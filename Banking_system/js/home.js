document.getElementById('btn-add-money').addEventListener('click',function(event){
    //prevent page from reloading
    event.preventDefault();
    
    const addMoneyInput = getInputFieldValueById('input-add-money');
    const pinNumberInput = getInputFieldValueById('input-pin-nuber');
    
    if(isNaN(addMoneyInput)){
        alert('Please enter a valid number');
        return;
    }

    if(pinNumberInput === '1234'){
        const balance = getTextFieldValueById('account-balance');
        
        const newBalance = parseFloat(balance) + parseFloat(addMoneyInput);

        document.getElementById('account-balance').innerText = newBalance; 

        const p = document.createElement('p');
        p.innerText = `Added ${addMoneyInput}. New balance is ${newBalance}`;
        document.getElementById('transaction-container').appendChild(p);    
        
    }
    else{
        alert('Pin is 1234');
    }

})