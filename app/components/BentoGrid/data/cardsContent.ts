export interface CardContent {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  categories?: {
    title: string;
    description: string;
  }[];
  features?: string[];
  expandedContent?: {
    sections: {
      title: string;
      content: string | React.ReactNode;
    }[];
  };
}

export const cardsData: Record<string, CardContent> = {
  main: {
    id: 'main',
    title: 'EXPLORE 500+',
    subtitle: 'MASTERCLASSES',
    description: 'AND GAIN NEW SKILLS',
    expandedContent: {
      sections: [
        {
          title: 'À propos',
          content: 'Découvrez notre collection complète de masterclasses dispensées par les plus grands experts dans leur domaine.'
        },
        {
          title: 'Nos Catégories Principales',
          content: 'categories' // Flag pour afficher les catégories
        },
        {
          title: 'Pourquoi Choisir Nos Masterclasses ?',
          content: 'features' // Flag pour afficher les fonctionnalités
        }
      ]
    },
    categories: [
      {
        title: 'Business & Entrepreneuriat',
        description: 'Développez vos compétences en leadership'
      },
      {
        title: 'Arts Créatifs',
        description: 'Explorez votre potentiel artistique'
      },
      {
        title: 'Sciences & Technologie',
        description: 'Maîtrisez les technologies d&apos;avenir'
      },
      {
        title: 'Développement Personnel',
        description: 'Atteignez vos objectifs personnels'
      }
    ],
    features: [
      'Instructeurs reconnus mondialement dans leur domaine',
      'Contenu premium avec accès à vie',
      'Communauté active d&apos;apprenants passionnés',
      'Certificats de completion reconnus',
      'Support technique 24/7'
    ]
  },
  
  filming: {
    id: 'filming',
    title: 'FILMING',
    subtitle: 'COURSES',
    description: 'Apprenez les techniques de réalisation avec des professionnels du cinéma et de la télévision.',
    categories: [
      {
        title: 'Direction d&apos;acteurs',
        description: 'Maîtrisez l&apos;art de diriger vos comédiens'
      },
      {
        title: 'Cadrage et composition',
        description: 'Créez des images percutantes'
      },
      {
        title: 'Post-production',
        description: 'Finalisez vos projets comme un pro'
      }
    ]
  },

  music: {
    id: 'music',
    title: 'MUSIC',
    subtitle: 'COURSES',
    description: 'Maîtrisez votre instrument et développez votre créativité musicale.',
    categories: [
      {
        title: 'Composition',
        description: 'Créez vos propres mélodies'
      },
      {
        title: 'Production',
        description: 'Produisez des tracks professionnels'
      },
      {
        title: 'Performance',
        description: 'Performez sur scène avec confiance'
      }
    ]
  },

  art: {
    id: 'art',
    title: 'ART',
    subtitle: 'COURSES',
    description: 'Explorez différentes techniques artistiques et développez votre style unique.',
    categories: [
      {
        title: 'Peinture & Dessin',
        description: 'Maîtrisez les techniques traditionnelles'
      },
      {
        title: 'Art numérique',
        description: 'Créez dans l&apos;univers digital'
      },
      {
        title: 'Sculpture',
        description: 'Donnez vie à vos créations en 3D'
      }
    ]
  },

  writing: {
    id: 'writing',
    title: 'WRITING',
    subtitle: 'COURSES',
    description: 'Affinez votre plume et apprenez les secrets de l&apos;écriture créative.',
    categories: [
      {
        title: 'Écriture créative',
        description: 'Développez votre imagination'
      },
      {
        title: 'Scénarisation',
        description: 'Écrivez pour l&apos;écran'
      },
      {
        title: 'Journalisme',
        description: 'Informez avec impact'
      }
    ]
  }
}; 