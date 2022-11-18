const anctProjectCategoryLink = (id: number): string =>
  `https://agence-cohesion-territoires.gouv.fr/la-projetotheque-15?field_thematics_term_m[${id}]=${id}&title=&op=Filtrer`

export const allProjectsLink =
  'https://agence-cohesion-territoires.gouv.fr/la-projetotheque-15'

export const categories: {
  title: string
  url: string
  legacyTitle?: string
}[] = [
  {
    title: 'Accès au numérique',
    url: anctProjectCategoryLink(8),
  },
  {
    title: 'Services au public',
    url: anctProjectCategoryLink(30),
  },
  {
    title: 'Transport et mobilités',
    url: anctProjectCategoryLink(18),
  },
  {
    title: 'Soutien aux associations',
    url: anctProjectCategoryLink(173),
  },
  {
    title: 'Logement et cadre de vie',
    url: anctProjectCategoryLink(22),
  },
  {
    title: 'Développement économique',
    url: anctProjectCategoryLink(41),
  },
  {
    title: 'Infrastructures locales',
    url: anctProjectCategoryLink(25),
  },
  {
    title: 'Solidarité',
    url: anctProjectCategoryLink(50),
  },
  {
    title: 'Education et jeunesse',
    url: anctProjectCategoryLink(48),
  },
  {
    title: 'Attractivité',
    url: anctProjectCategoryLink(184),
  },
]
