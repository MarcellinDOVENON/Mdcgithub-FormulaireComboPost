import React, { useState } from "react";
import ChampTexte from "./ChampTexte";

export const Formulaire: React.FC = () => {
  // 1. Les états pour les valeurs
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");

  // 2. Les états pour la validation et les messages
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [statutMessage, setStatutMessage] = useState<string>("");
  const [estMajeur, setEstMajeur] = useState<boolean | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const form = e.currentTarget;
    const newErrors: { [key: string]: string } = {};

    // Validation via l'API native du navigateur
    if (!form.checkValidity()) {
      const inputs = form.querySelectorAll("input");
      inputs.forEach((input) => {
        if (!input.checkValidity()) {
          newErrors[input.id] = input.validationMessage;
        }
      });
      setErrors(newErrors);
      setStatutMessage("");
      setEstMajeur(null);
      return;
    }

    // Si le formulaire est valide, on nettoie les erreurs
    setErrors({});

    // Logique métier : Vérification de la majorité
    const ageNumerique = parseInt(age, 10);
    if (ageNumerique >= 18) {
      setStatutMessage("✅ Accès autorisé : Vous êtes majeur ! Bienvenue.");
      setEstMajeur(true);
      
      // Réinitialisation des champs après validation réussie
      setNom("");
      setPrenom("");
      setEmail("");
      setAge("");
    } else {
      setStatutMessage("❌ Accès refusé : Vous êtes mineur !");
      setEstMajeur(false);
    }
  };

  return (
    <div className="w-full max-w-lg bg-white p-6 md:p-8 mx-auto rounded-lg shadow-md">
      <h2 className="text-xl md:text-2xl font-bold text-center text-gray-800 mb-6 tracking-wide uppercase">
        Vérification de l'accès
      </h2>

      {/* Rétablissement de la balise form avec le onSubmit */}
      <form onSubmit={handleSubmit} noValidate>
        <ChampTexte id="nom" label="Nom" value={nom} onChange={setNom} placeholder="Ex: DOVENON" error={errors.nom} />
        <ChampTexte id="prenom" label="Prénom" value={prenom} onChange={setPrenom} placeholder="Ex: Marcepe" error={errors.prenom} />
        <ChampTexte id="email" label="Email" type="email" value={email} onChange={setEmail} placeholder="marcepepe@exemple.com" error={errors.email} />
        <ChampTexte id="age" label="Âge" type="number" value={age} onChange={setAge} placeholder="Ex: 25" error={errors.age} />

        <button type="submit" className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2.5 px-5 rounded cursor-pointer text-base transition-colors duration-200">
          Vérifier l'accès
        </button>
      </form>

      {/* Affichage du message de statut final */}
      {statutMessage && (
        <div className={`mt-5 p-4 rounded font-bold text-center border ${
          estMajeur ? "bg-green-100 text-green-800 border-green-300" : "bg-red-100 text-red-800 border-red-300"
        }`}>
          {statutMessage}
        </div>
      )}
    </div>
  );
};

export default Formulaire;
