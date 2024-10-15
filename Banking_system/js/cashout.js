document.getElementById('btn-cash-out').addEventListener('click',function(event){
    event.preventDefault();

    const cashOut = getInputFieldValueById('input-cash-out');
    const pinNumber = getInputFieldValueById('input-cash-out-pin-nuber');

    if(isNaN(cashOut)){
        alert('Please enter a valid number');
        return;
    }

    if(pinNumber === '1234'){
        const balance = getTextFieldValueById('account-balance');

        if(parseFloat(balance) < parseFloat(cashOut)){
            alert('Insufficient balance');
            return;
        }

        const newBalance = parseFloat(balance) - parseFloat(cashOut);

        document.getElementById('account-balance').innerText = newBalance;

        const p = document.createElement('p');
        p.innerText = `Cashed out ${cashOut}. New balance is ${newBalance}`;
        document.getElementById('transaction-container').appendChild(p);  

    }
    else{
        alert('Pin is 1234');
    }
})