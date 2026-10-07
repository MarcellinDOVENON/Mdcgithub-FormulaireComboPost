/**
 * Valide les champs du formulaire et affiche les erreurs graphiques.
 * @param {HTMLFormElement} form - L'élément formulaire.
 * @returns {boolean} True si tous les champs sont valides.
 */
export function validerFormulaire(form) {
    let isFormValid = true;
    const inputs = form.querySelectorAll("input");

    inputs.forEach(input => {
        const errorSpan = input.nextElementSibling;
        input.classList.add('touched');

        if (!input.checkValidity()) {
            errorSpan.textContent = input.validationMessage;
            isFormValid = false;
        } else {
            errorSpan.textContent = "";
        }
    });

    return isFormValid;
}

/**
 * Extrait et formate les données du formulaire.
 * @returns {Object} Le payload formaté.
 */
export function recupererDonneesFormulaire() {
    return {
        nom: document.getElementById("nom").value,
        prenom: document.getElementById("prenom").value,
        email: document.getElementById("email").value,
        age: parseInt(document.getElementById("age").value, 10)
    };
}
