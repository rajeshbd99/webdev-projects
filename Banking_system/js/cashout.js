document.getElementById('btn-cash-out').addEventListener('click',function(event){
    event.preventDefault();

    const cashOut = document.getElementById('input-cash-out').value;
    const pinNumber = document.getElementById('input-cash-out-pin-nuber').value;

    if(pinNumber === '1234'){
        const balance = document.getElementById('account-balance').innerText;

        const newBalance = parseFloat(balance) - parseFloat(cashOut);

        document.getElementById('account-balance').innerText = newBalance;
    }
    else{
        alert('Invalid Pin');
    }
})