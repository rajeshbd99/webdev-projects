const donationModal = document.getElementById('donation-modal');
const closeModalBtn = document.getElementById('close-modal-btn');
const donationBtn = document.getElementById('donation-btn');
const historyBtn = document.getElementById('history-btn');
const donationSection = document.getElementById('donation-section');
const historySection = document.getElementById('history-section');
const balanceElement = document.getElementById('account-balance');

// Toggle between Donation and History Sections
donationBtn.addEventListener('click', () => {
    donationSection.classList.remove('hidden');
    historySection.classList.add('hidden');
    donationBtn.classList.add('bg-green-400', 'text-white');
    donationBtn.classList.remove('bg-gray-400', 'text-black');
    historyBtn.classList.add('bg-gray-400', 'text-black');
    historyBtn.classList.remove('bg-green-400', 'text-white');
});

historyBtn.addEventListener('click', () => {
    donationSection.classList.add('hidden');
    historySection.classList.remove('hidden');
    historyBtn.classList.add('bg-green-400', 'text-white');
    historyBtn.classList.remove('bg-gray-400', 'text-black');
    donationBtn.classList.add('bg-gray-400', 'text-black');
    donationBtn.classList.remove('bg-green-400', 'text-white');
});


// Open and close Modal
function showModal() {
    donationModal.classList.remove('hidden');
}

closeModalBtn.addEventListener('click', () => {
    donationModal.classList.add('hidden');
});

// Donation Input
function handleDonation(cardId) {
    const card = document.getElementById(cardId);
    const inputElement = card.querySelector('input');
    const donationValue = parseFloat(inputElement.value);

    if (validateDonation(donationValue)) {
        const currentBalance = parseFloat(balanceElement.textContent);
        const currentAmountElement = card.querySelector('span[id^="card-"]');

        if (donationValue <= currentBalance) {
            const updatedBalance = currentBalance - donationValue;
            balanceElement.textContent = updatedBalance.toFixed(2) + " BDT";
            const currentAmount = parseFloat(currentAmountElement.textContent);
            currentAmountElement.textContent = (currentAmount + donationValue).toFixed(2) + " BDT";

            showModal();
            addHistoryLog(cardId, donationValue);
        } else {
            alert('Insufficient balance');
        }
    } else {
        alert('Invalid donation amount');
    }

    inputElement.value = '';
}

// Validation
function validateDonation(donation) {
    return donation && !isNaN(donation) && parseFloat(donation) > 0;
}

// History Section
function addHistoryLog(cardId, donationValue) {
    const historyList = document.getElementById('history-list');
    const time = new Date().toString();
    const cardTitle = document.querySelector(`#${cardId} h3`).textContent;
    const historyItem = document.createElement('li');
    historyItem.innerHTML = `
        <div class="p-4 md:p-8 border-gray-400 border rounded-xl mt-4 md:mt-8">
            <div class="space-y-3">
                <h2 class="text-text-primary font-bold text-xl">
                    <span>${donationValue}</span> BDT is Donated to <span>${cardTitle}</span>
                </h2>
                <p class="text-text-gray">Date: <span>${time}</span></p>
            </div>
        </div>
    `;

    historyList.appendChild(historyItem);
}

