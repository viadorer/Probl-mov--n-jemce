// Kalkulačka nákladů problémového nájemníka
const calculator = {
    // Základní parametry
    baseParams: {
        hourlyRate: 300, // výchozí hodnota
        monthlyRent: 15000, // výchozí hodnota
        location: 'praha' // praha, brno, ostatni
    },
    
    // Nastavení parametrů kalkulačky
    setParams(hourlyRate, monthlyRent) {
        // Kontrola vstupních hodnot
        this.baseParams.hourlyRate = parseFloat(hourlyRate) || 300;
        this.baseParams.monthlyRent = parseFloat(monthlyRent) || 15000;
        
        console.log(`Nastaveny parametry: hourlyRate=${this.baseParams.hourlyRate}, monthlyRent=${this.baseParams.monthlyRent}`);
        this.updateUI();
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
        try {
            console.log('Začátek výpočtu celkových nákladů');
            
            // Převod na čísla a ošetření neplatných hodnot
            const hourlyRate = parseFloat(this.baseParams.hourlyRate) || 300;
            const monthlyRent = parseFloat(this.baseParams.monthlyRent) || 15000;

            console.log(`Hodnoty pro výpočet: hourlyRate=${hourlyRate}, monthlyRent=${monthlyRent}`);

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
            const results = {
                timeCosts: Math.round(timeCosts),
                fixedCosts: Math.round(totalFixedCosts),
                lostRent: Math.round(lostRent),
                total: Math.round(timeCosts + totalFixedCosts + lostRent),
                timeSpent: totalTimeHours
            };
            
            console.log('Výsledky výpočtu:', results);
            return results;
        } catch (error) {
            console.error('Chyba při výpočtu celkových nákladů:', error);
            return {
                timeCosts: 0,
                fixedCosts: 0,
                lostRent: 0,
                total: 0,
                timeSpent: 0
            };
        }
    },

    // Formátování částky
    formatCurrency(amount) {
        try {
            // Zajistíme, že amount je číslo
            const numAmount = parseFloat(amount) || 0;
            return new Intl.NumberFormat('cs-CZ', {
                style: 'currency',
                currency: 'CZK',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).format(numAmount);
        } catch (error) {
            console.error('Chyba při formátování částky:', error);
            return '0 Kč';
        }
    },

    // Aktualizace UI
    updateUI() {
        try {
            console.log('Začátek aktualizace UI...');
            const results = this.calculateTotalCosts();
            
            // Kontrola existence elementů před aktualizací
            const elements = {
                totalCosts: document.getElementById('totalCosts'),
                timeCosts: document.getElementById('timeCosts'),
                fixedCosts: document.getElementById('fixedCosts'),
                lostRent: document.getElementById('lostRent'),
                timeSpent: document.getElementById('timeSpent')
            };
            
            // Kontrola dostupnosti všech elementů
            const missingElements = Object.entries(elements).filter(([key, el]) => !el);
            if (missingElements.length > 0) {
                console.error('Chybějící elementy v DOM:', missingElements.map(([key]) => key));
                return false;
            }
            
            // Bezpečná aktualizace výsledků v UI s ošetřením chyb
            try {
                elements.totalCosts.textContent = this.formatCurrency(results.total);
            } catch (e) {
                console.error('Chyba při aktualizaci totalCosts:', e);
            }
            
            try {
                elements.timeCosts.textContent = this.formatCurrency(results.timeCosts);
            } catch (e) {
                console.error('Chyba při aktualizaci timeCosts:', e);
            }
            
            try {
                elements.fixedCosts.textContent = this.formatCurrency(results.fixedCosts);
            } catch (e) {
                console.error('Chyba při aktualizaci fixedCosts:', e);
            }
            
            try {
                elements.lostRent.textContent = this.formatCurrency(results.lostRent);
            } catch (e) {
                console.error('Chyba při aktualizaci lostRent:', e);
            }
            
            try {
                elements.timeSpent.textContent = `${Math.round(results.timeSpent)} hodin`;
            } catch (e) {
                console.error('Chyba při aktualizaci timeSpent:', e);
            }
            
            console.log('UI kalkulačky úspěšně aktualizováno');
            return true;
        } catch (error) {
            console.error('Chyba při aktualizaci UI kalkulačky:', error);
            return false;
        }
    }
};

// Export pro použití v jiných souborech
export default calculator;
