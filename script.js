function calculateCommission() {
    const takeHome = document.getElementById('takeHome').value;
    const charge = document.getElementById('charge').value;
    const chargeVAT = document.getElementById('chargeVAT').checked;
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
            chargeAmount *= 1.2;
            result.textContent = `To take home £${takeHome}, you should charge £${chargeAmount.toFixed(2)}`;
        } else {
            result.textContent = `To take home £${takeHome}, you should charge £${chargeAmount.toFixed(2)}`;
        }
    } else if (charge && !takeHome) {
        let commissionAmount = parseFloat(charge);
        let totalCommission = 0;

        const commissionRates = [
            { min: 0, max: 10000, rate: 0.15 },
            { min: 10001, max: 50000, rate: 0.11 },
            { min: 50001, max: 100000, rate: 0.075 },
            { min: 100001, max: 200000, rate: 0.06 },
            { min: 200001, max: 500000, rate: 0.0475 },
            { min: 500001, max: 1000000, rate: 0.04 }
        ];

        for (const rate of commissionRates) {
            const rangeMax = Math.min(commissionAmount, rate.max);
            const rangeMin = Math.max(commissionAmount - rate.max, rate.min);
            const rangeAmount = rangeMax - rangeMin;
            if (rangeAmount > 0) {
                const commission = rangeAmount * rate.rate;
                totalCommission += commission;
            }
        }

        if (chargeVAT) {
            let vatDeductible = totalCommission * 0.2;
            result.textContent = `For a charge of £${charge}, you will owe a commission of £${totalCommission.toFixed(2)} (£${vatDeductible.toFixed(2)} is VAT deductible)`;
        } else {
            result.textContent = `For a charge of £${charge}, you will owe a commission of £${totalCommission.toFixed(2)}`;
        }
    } else {
        result.textContent = 'Please enter either the amount to take home or the amount to charge.';
    }
}