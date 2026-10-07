import { validerFormulaire, recupererDonneesFormulaire } from './validation.js';
import { envoyerFormulaire } from './api.js';

const form = document.getElementById("accessForm");
const statusDisplay = document.getElementById("statusDisplay");

// La fonction de rappel devient asynchrone pour pouvoir utiliser "await"
form.addEventListener("submit", async function(event) {
    event.preventDefault();
    
    const estValide = validerFormulaire(form);

    if (estValide) {
        const payload = recupererDonneesFormulaire();

        // Vérification de la majorité
        if (payload.age >= 18) {
            statusDisplay.textContent = "✅ Accès autorisé : Vous êtes majeur ! Bienvenue.";
            statusDisplay.className = "success-box";
        } else {
            statusDisplay.textContent = "❌ Accès refusé : Vous êtes mineur !";
            statusDisplay.className = "error-box";
        }

        // Exécution de la requête asynchrone avec try/catch
        try {
            const data = await envoyerFormulaire(payload);
            statusDisplay.textContent += "\nRéponse serveur: " + JSON.stringify(data, null, 2);
        } catch (error) {
            statusDisplay.textContent += "\nErreur POST: " + error.message;
        }

    } else {
        statusDisplay.className = "";
        statusDisplay.textContent = "";
    }
});
