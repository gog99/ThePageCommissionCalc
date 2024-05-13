function clearOtherInput(inputId) {
    const otherInputId = inputId === 'takeHome' ? 'charge' : 'takeHome';
    document.getElementById(otherInputId).value = '';
}

function calculateCommission() {
    const takeHome = document.getElementById('takeHome').value;
    const charge = document.getElementById('charge').value;
    const chargeVAT = document.getElementById('chargeVAT') ? document.getElementById('chargeVAT').checked : false;
    const result = document.getElementById('result');

    if (takeHome && !charge) {
        const commissionRates = [
            { min: 0, max: 10000, rate: 0.15 },
            { min: 10001, max: 50000, rate: 0.11 },
            { min: 50001, max: 100000, rate: 0.075 },
            { min: 100001, max: 200000, rate: 0.06 },
            { min: 200001, max: 500000, rate: 0.0475 },
            { min: 500001, max: 1000000, rate: 0.04 }
        ];

        let chargeAmount = parseFloat(takeHome);
        for (const rate of commissionRates) {
            if (chargeAmount >= rate.min && chargeAmount <= rate.max) {
                chargeAmount /= (1 - rate.rate);
                break;
            }
        }

        if (chargeVAT) {
            result.textContent = `To take home £${takeHome}, you should charge £${chargeAmount.toFixed(2)} (excluding VAT)`;
        } else {
            chargeAmount *= 1.2;
            result.textContent = `To take home £${takeHome}, you should charge £${chargeAmount.toFixed(2)} (including VAT)`;
        }
    } else if (charge && !takeHome) {
        let commissionAmount = parseFloat(charge);

        const commissionRates = [
            { min: 0, max: 10000, rate: 0.15 },
            { min: 10001, max: 50000, rate: 0.11 },
            { min: 50001, max: 100000, rate: 0.075 },
            { min: 100001, max: 200000, rate: 0.06 },
            { min: 200001, max: 500000, rate: 0.0475 },
            { min: 500001, max: 1000000, rate: 0.04 }
        ];

        for (const rate of commissionRates) {
            if (commissionAmount >= rate.min && commissionAmount <= rate.max) {
                let commission = commissionAmount * rate.rate;
                if (chargeVAT) {
                    commission *= 0.8; // Reduce commission by 20% if VAT is charged
                }
                result.textContent = `For a charge of £${charge}, you will owe a commission of £${commission.toFixed(2)}`;
                break;
            }
        }
    } else {
        result.textContent = 'Please enter either the amount to take home or the amount to charge.';
    }
}

