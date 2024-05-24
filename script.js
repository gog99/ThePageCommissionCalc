function calculateCommission() {
    const takeHome = parseFloat(document.getElementById('takeHome').value);
    const charge = parseFloat(document.getElementById('charge').value);
    const chargeVAT = document.getElementById('chargeVAT').checked;
    const result = document.getElementById('result');

    const commissionRates = [
        { min: 0, max: 10000, rate: 0.15 },
        { min: 10000, max: 50000, rate: 0.11 },
        { min: 50000, max: 100000, rate: 0.075 },
        { min: 100000, max: 200000, rate: 0.06 },
        { min: 200000, max: 500000, rate: 0.0475 },
        { min: 500000, max: 1000000, rate: 0.04 }
    ];

    const VAT_RATE = 0.2;

    function getCommissionRate(amount) {
        for (const rate of commissionRates) {
            if (amount >= rate.min && amount < rate.max) {
                return rate.rate;
            }
        }
        return 0.04; // Default to highest rate if amount exceeds 1m
    }

    function calculateCharge(takeHome, chargeVAT) {
        let chargeAmount = takeHome;
        let commissionRate;

        // Iterate through commission rates and calculate the required charge amount
        for (const rate of commissionRates) {
            commissionRate = rate.rate;
            let proposedCharge = chargeAmount / (1 - commissionRate);

            // Check if proposed charge exceeds the next bracket
            if (proposedCharge > rate.max) {
                chargeAmount = proposedCharge;
                continue;
            } else {
                chargeAmount = proposedCharge;
                break;
            }
        }

        if (chargeVAT) {
            chargeAmount *= (1 + VAT_RATE);
        }

        return chargeAmount;
    }

    if (takeHome && !charge) {
        let chargeAmount = calculateCharge(takeHome, chargeVAT);
        result.textContent = `To take home £${takeHome.toFixed(2)}, you should charge £${chargeAmount.toFixed(2)}`;
    } else if (charge && !takeHome) {
        let commissionRate = getCommissionRate(charge);
        let commissionAmount = charge * commissionRate;

        if (chargeVAT) {
            let vatDeductible = commissionAmount * VAT_RATE;
            result.textContent = `For a charge of £${charge.toFixed(2)}, you will owe a commission of £${commissionAmount.toFixed(2)} (£${vatDeductible.toFixed(2)} is VAT deductible)`;
        } else {
            result.textContent = `For a charge of £${charge.toFixed(2)}, you will owe a commission of £${commissionAmount.toFixed(2)}`;
        }
    } else {
        result.textContent = 'Please enter either the amount to take home or the amount to charge.';
    }
}

document.getElementById('calculate').addEventListener('click', calculateCommission);
