function getInputFieldValueById(id){
    const inputValue = document.getElementById(id).value;
    return inputValue;
}

function getTextFieldValueById(id){
    const textValue = document.getElementById(id).innerText;
    return textValue;
}

function showSectionById(id){
    document.getElementById('add-money-form').classList.add('hidden');
    document.getElementById('cash-out-form').classList.add('hidden');
    document.getElementById('transaction-section').classList.add('hidden');

    
    document.getElementById(id).classList.remove('hidden');
}