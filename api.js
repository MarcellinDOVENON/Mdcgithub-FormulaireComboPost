/**
 * Envoie les données utilisateur au serveur de test.
 * @param {Object} payload - Les données du formulaire.
 * @returns {Promise<Object>} La réponse du serveur convertie en JSON.
 */
export async function envoyerFormulaire(payload) {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        throw new Error(`Erreur HTTP ${response.status}`);
    }

    return await response.json();
}
