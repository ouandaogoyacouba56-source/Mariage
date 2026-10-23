/* ==========================================================================
   ✏️  VOS TEXTES  —  c'est le seul fichier à modifier pour changer les mots
   --------------------------------------------------------------------------
   • Gardez toujours les guillemets "..." et les virgules en fin de ligne.
   • Les photos se changent en remplaçant les fichiers du dossier "photos"
     (gardez les mêmes noms de fichiers, ou modifiez les chemins ci-dessous).
   • La date affichée partout est calculée automatiquement à partir de
     "dateMariage" : il suffit de la changer une seule fois.
   ========================================================================== */

window.INVITATION = {

  /* ---------- LES MARIÉS ---------- */
  prenom1: "[Prénom 1]",
  prenom2: "[Prénom 2]",

  /* ---------- LA DATE ----------
     Format : AAAA-MM-JJTHH:MM:SS  (heure de la cérémonie, ex. 15h00)
     Elle sert à écrire la date en toutes lettres ET au compte à rebours. */
  dateMariage: "2027-06-12T15:00:00",

  /* ---------- VOTRE HASHTAG ---------- */
  hashtag: "#[Prénom1]et[Prénom2]",

  /* ---------- L'ENVELOPPE ---------- */
  intro: {
    surtitre: "Une invitation vous attend",
    carte: "Vous êtes invités au mariage de",
    bouton: "Ouvrir notre invitation"
  },

  /* ---------- 1. ACCUEIL ---------- */
  accueil: {
    surtitre: "Nous nous marions",
    phrase: "Nous avons la joie de vous convier à célébrer le plus beau jour de notre vie, entourés de celles et ceux que nous aimons.",
    defiler: "Défiler"
  },

  compteur: {
    jours: "Jours",
    heures: "Heures",
    minutes: "Minutes",
    secondes: "Secondes",
    jourJ: "Le grand jour est arrivé !"
  },

  /* ---------- 2. NOTRE HISTOIRE ---------- */
  histoire: {
    surtitre: "Un peu de nous",
    titre: "Notre histoire",
    etapes: [
      {
        date: "[Mois année]",
        titre: "Notre rencontre",
        texte: "Ce jour-là, nos chemins se sont croisés. Un regard, un sourire, et le sentiment que quelque chose de beau commençait. [Racontez ici votre rencontre.]"
      },
      {
        date: "[Mois année]",
        titre: "Le premier rendez-vous",
        texte: "Un peu timides, beaucoup émus, nous avons parlé des heures sans voir le temps passer. [Racontez ici votre premier rendez-vous.]"
      },
      {
        date: "[Mois année]",
        titre: "La demande en mariage",
        texte: "Et puis un jour, une question, une émotion, un « oui » évident. [Racontez ici votre demande en mariage.]"
      }
    ]
  },

  /* ---------- 3. GALERIE (4 à 6 photos) ---------- */
  galerie: {
    surtitre: "En images",
    titre: "Nos souvenirs",
    photos: [
      { src: "photos/photo-1606216836537-eea72a939072.avif", alt: "Notre photo, 1" },
      { src: "photos/photo-1607861884586-c7cfaed16290.avif", alt: "Notre photo, 2" },
      { src: "photos/photo-1607357910286-1ff94ac13c24.avif", alt: "Notre photo, 3" },
      { src: "photos/photo-1529636798458-92182e662485.avif", alt: "Notre photo, 4" },
      { src: "photos/premium_photo-1673897888993-a1db844c2ca1.avif", alt: "Notre photo, 5" }
    ]
  },

  /* ---------- 4. LE PROGRAMME ---------- */
  programme: {
    surtitre: "Le grand jour",
    titre: "Le programme",
    moments: [
      { heure: "15h00", titre: "Accueil",        texte: "Nous vous accueillons avec un rafraîchissement." },
      { heure: "16h00", titre: "Cérémonie",      texte: "L'échange des vœux et des alliances." },
      { heure: "17h30", titre: "Photos",         texte: "Photos de groupe et moments partagés." },
      { heure: "19h00", titre: "Repas",          texte: "Le dîner, les discours et la musique." },
      { heure: "22h00", titre: "Remerciements",  texte: "Un dernier mot pour vous dire merci… avant de danser !" }
    ]
  },

  /* ---------- 5. LE LIEU ---------- */
  lieu: {
    surtitre: "Où nous retrouver",
    titre: "Le lieu",
    nom: "[Nom de la salle]",
    adresse: "[Adresse]",
    ville: "[Ville]",
    note: "",            /* ex. : "Un parking est à votre disposition sur place." (laisser vide pour ne rien afficher) */
    rechercheCarte: "",  /* facultatif : si la carte ne trouve pas bien le lieu, écrivez ici ce qu'il faut chercher dans Google Maps */
    bouton: "Ouvrir l’itinéraire"
  },

  /* ---------- 6. TENUE ---------- */
  tenue: {
    surtitre: "Dress code",
    titre: "Tenue",
    texte: "Tenue de cérémonie élégante. Nous vous invitons à choisir des tons chauds et naturels, dans l'esprit de notre palette. Merci de laisser le blanc à la mariée.",
    couleurs: [
      { nom: "Terracotta", couleur: "#B8553A" },
      { nom: "Sable",      couleur: "#D9B99B" },
      { nom: "Brun",       couleur: "#5A3A2A" }
    ]
  },

  /* ---------- 7. CONFIRMER MA PRÉSENCE ---------- */
  presence: {
    surtitre: "Votre réponse",
    titre: "Confirmer ma présence",
    texte: "Votre présence nous ferait immensément plaisir. Merci de nous dire si vous serez des nôtres.",
    limiteLabel: "Réponse souhaitée avant le",
    dateLimite: "2027-05-01",   /* format AAAA-MM-JJ */
    bouton: "Confirmer ma présence",
    lienFormulaire: "https://forms.gle/VOTRE-LIEN-ICI"   /* lien de votre formulaire (Google Forms, WhatsApp…) */
  },

  /* ---------- 8. PIED DE PAGE ---------- */
  pied: {
    merci: "Merci de faire partie de notre histoire"
  }
};
