import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      "Welcome to React": "Welcome to React and react-i18next"
    }
  },
  fr: {
    translation: {
      music:{
        title: "Titre",
        channel: "Chaîne",
        date: "Date",
      },
      home: {
         createAccount: "Créer un compte",
         learnMore: "En savoir plus",
         heroTitle: "Ecouter vos vidéos youtube préférées",
         heroSubtitle: "Ajouter vos vidéos youtube préférées et écouter les quand vous voulez",
      },
      addMusic: {
        addMusic: "Ajouter une musique",
        search: "Rechercher",
        manual: "Manuel",
        title: "Ajouter une nouvelle musique",
        subtitle: "Remplissez les champs ci-dessous pour ajouter une nouvelle musique",
        youtubeVideo: "Vidéo Youtube",
        searchVideo: "Rechercher une vidéo",
        videosWillAppearHere: "Les vidéos apparaitront ici",
        searchDescription: "Rechercher une vidéo à ajouter à votre librairie",
        youtubeLink: "Lien Youtube",
        youtubeLinkDescription: "Collez le lien de la vidéo youtube ici",
        musicTitle: "Titre de la musique",
        musicTitleDescription: "Le titre de la musique que vous souhaitez ajouter",
        musicCover: "Miniature de la musique",
        musicCoverDescription: "L'image de la musique que vous souhaitez ajouter",
        useDefaultTitle: "Utiliser le titre par défaut",
        useDefaultTitleDescription: "Cela utilisera le titre de la vidéo youtube comme titre de la musique.",
        useDefaultCover: "Utiliser la miniature par défaut",
        useDefaultCoverDescription: "Cela utilisera la miniature de la vidéo youtube comme pochette de la musique.",
        submit: "Ajouter",


      },
      sidebar:{
        home: "Accueil",
        musics: "Musiques",
        playlists: "Playlists",
        comingSoon: "Prochainement",
        learnMore: "En savoir plus",
        settings: "Paramètres",
        signin: "Se connecter",
        logout: "Déconnexion",
      },
      
    },
   
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "fr", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;
