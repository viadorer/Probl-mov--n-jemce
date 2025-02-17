// Kalkulačka nákladů problémového nájemníka
const calculator = {
    // Základní parametry
    baseParams: {
        hourlyRate: 0,
        monthlyRent: 0,
        location: 'praha' // praha, brno, ostatni
    },

    // Časové náklady (v hodinách)
    timeSpent: {
        communication: {
            calls: { min: 2, max: 3, description: 'Telefonáty a SMS měsíčně' },
            visits: { min: 4, max: 5, description: 'Osobní návštěvy měsíčně' },
            reminders: { min: 1, max: 2, description: 'Psaní upomínek měsíčně' }
        },
        administration: {
            documentation: { min: 2, max: 3, description: 'Fotodokumentace a protokoly' },
            contracts: { min: 1, max: 2, description: 'Příprava dokumentů' }
        }
    },

    // Fixní náklady (v Kč)
    fixedCosts: {
        legal: {
            consultation: { min: 5000, max: 8000, description: 'Právní konzultace' },
            documents: { min: 3000, max: 5000, description: 'Právní dokumenty' },
            court: { min: 5000, max: 10000, description: 'Soudní poplatky' },
            execution: { min: 10000, max: 15000, description: 'Náklady na exekuci' }
        },
        repairs: {
            painting: { min: 15000, max: 25000, description: 'Vymalování' },
            locks: { min: 2000, max: 3500, description: 'Výměna zámků' },
            floors: { min: 20000, max: 35000, description: 'Oprava podlah' },
            equipment: { min: 10000, max: 30000, description: 'Oprava vybavení' }
        },
        administration: {
            newContract: { min: 2000, max: 4000, description: 'Nová nájemní smlouva' }
        }
    },

    // Výpočet celkových nákladů
    calculateTotalCosts() {
        const hourlyRate = this.baseParams.hourlyRate;
        const monthlyRent = this.baseParams.monthlyRent;

        // Výpočet časových nákladů
        let totalTimeHours = 0;
        Object.values(this.timeSpent).forEach(category => {
            Object.values(category).forEach(item => {
                totalTimeHours += (item.min + item.max) / 2;
            });
        });
        const timeCosts = totalTimeHours * hourlyRate;

        // Výpočet fixních nákladů
        let totalFixedCosts = 0;
        Object.values(this.fixedCosts).forEach(category => {
            Object.values(category).forEach(item => {
                totalFixedCosts += (item.min + item.max) / 2;
            });
        });

        // Ušlý zisk z nájmu (3 měsíce neplacení + 2 měsíce řešení situace)
        const lostRent = monthlyRent * 5;

        // Celkové náklady
        return {
            timeCosts,
            fixedCosts: totalFixedCosts,
            lostRent,
            total: timeCosts + totalFixedCosts + lostRent,
            timeSpent: totalTimeHours
        };
    },

    // Formátování částky
    formatCurrency(amount) {
        return new Intl.NumberFormat('cs-CZ', {
            style: 'currency',
            currency: 'CZK',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    },

    // Aktualizace UI
    updateUI() {
        const results = this.calculateTotalCosts();
        
        // Aktualizace výsledků v UI
        document.getElementById('totalCosts').textContent = this.formatCurrency(results.total);
        document.getElementById('timeCosts').textContent = this.formatCurrency(results.timeCosts);
        document.getElementById('fixedCosts').textContent = this.formatCurrency(results.fixedCosts);
        document.getElementById('lostRent').textContent = this.formatCurrency(results.lostRent);
        document.getElementById('timeSpent').textContent = `${Math.round(results.timeSpent)} hodin`;
    }
};

// Export pro použití v jiných souborech
export default calculator;
