'use client'

import { ProjectsFilters } from '@pt/app/(public)/projets/ProjectsFilters'
import { ProjectsCategories } from '@pt/app/(public)/projets/ProjectsCategories'
import { ProjectListItem } from '@pt/legacyProject/projectsList'
import { ProjectsList } from '@pt/app/(public)/projets/ProjectsList'
import {
  useCategoriesFilters,
  useDistrictFilters,
} from '@pt/legacyProject/projectFiltersStore'
import { filterProjects } from '@pt/legacyProject/filterProjectList'
import { District } from '@pt/projethoteque/legacyProjects'
import { Category } from '@pt/anctProjects'
import { useOnDiff } from '@pt/hooks/useOnDiff'

export const ProjectsListContainer = ({
  projects,
  initialDistrictsFilter,
  initialCategoriesFilter,
}: {
  initialDistrictsFilter: District[]
  initialCategoriesFilter: Category[]
  projects: ProjectListItem[]
}) => {
  const filtersString = [
    ...initialDistrictsFilter,
    ...initialCategoriesFilter,
  ].join(',')

  const initDistricts = useDistrictFilters(({ initialize }) => initialize)
  const initCategories = useCategoriesFilters(({ initialize }) => initialize)

  useOnDiff(filtersString, () => {
    initDistricts(initialDistrictsFilter)
    initCategories(initialCategoriesFilter)
  })

  const districts = useDistrictFilters(({ selected }) => selected)
  const categories = useCategoriesFilters(({ selected }) => selected)

  const filteredProjects = filterProjects({ projects, districts, categories })

  return (
    <div className="fr-grid-row fr-p-0">
      <div className="fr-col-12 fr-col-md-4 fr-p-0 fr-background-alt--grey">
        <aside
          className="fr-sidemenu fr-sidemenu--sticky fr-p-0"
          style={{
            boxShadow: 'inset -1px 0 0 0 var(--border-default-grey)',
          }}
          aria-label="Menu latéral"
        >
          <ProjectsFilters />
        </aside>
      </div>
      <div className="fr-col-12 fr-col-md-8">
        <ProjectsCategories />
        <div className="fr-px-2w fr-px-md-4w fr-pb-8v">
          <ProjectsList projects={filteredProjects} />
        </div>
      </div>
    </div>
  )
}
