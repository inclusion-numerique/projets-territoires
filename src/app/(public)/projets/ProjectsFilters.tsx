'use client'

import { useRouter } from 'next/navigation'
import { District, districts } from '@pt/projethoteque/legacyProjects'
import { categories, Category } from '@pt/anctProjects'
import { ProjectMap } from '@pt/app/(public)/projets/ProjectsMap'
import {
  useCategoriesFilters,
  useDistrictFilters,
} from '@pt/app/(public)/projets/projectFiltersStore'
import shallow from 'zustand/shallow'
import { isEqual } from 'lodash-es'
import { useEffect } from 'react'

const createFilterSearchParams = (
  parameter: string,
  values: Set<string>,
): string[] => {
  return [...values.values()].map(
    (value) => `${parameter}=${encodeURIComponent(value)}`,
  )
}

const createFilteredProjectsUrl = (
  activeCategoriesFilters: Set<string>,
  activeDistrictsFilters: Set<District>,
): string => {
  const searchParams = [
    ...createFilterSearchParams('thematiques', activeCategoriesFilters),
    ...createFilterSearchParams('regions', activeDistrictsFilters),
  ]

  if (searchParams.length === 0) {
    return '/projets'
  }

  return `/projets?${searchParams.join('&')}`
}

const isRouterStateDifferentFromFiltersState = (
  routerState: string[],
  filtersState: Set<string>,
): boolean => {
  const filters = [...filtersState].sort()
  const searchParams = routerState.sort()

  console.log('EQUAL ? ', {
    filters,
    searchParams,
    equel: isEqual(filters, searchParams),
  })

  return !isEqual(filters, searchParams)
}

const displayRegionsCheckboxes = false
const displayCategoriesCheckboxes = false

export const ProjectsFilters = ({
  routingDistrictsFilters,
  routingCategoriesFilters,
}: {
  routingCategoriesFilters: Category[]
  routingDistrictsFilters: District[]
}) => {
  const router = useRouter()

  console.log('PROJECTS FILTERS PROPS', {
    routingDistrictsFilters,
    routingCategoriesFilters,
  })

  const districtFilters = useDistrictFilters(
    ({ selected, reset, initialized, initialize, toggle }) => ({
      selected,
      reset,
      initialized,
      initialize,
      toggle,
    }),
    shallow,
  )
  const destroyDistrictFilters = useDistrictFilters(({ destroy }) => destroy)
  const destroyCategoriesFilters = useCategoriesFilters(
    ({ destroy }) => destroy,
  )

  const categoriesFilters = useCategoriesFilters(
    ({ selected, reset, initialized, initialize, toggle }) => ({
      selected,
      reset,
      initialized,
      initialize,
      toggle,
    }),
    shallow,
  )

  if (!districtFilters.initialized) {
    districtFilters.initialize(routingDistrictsFilters, router)
  }
  if (!categoriesFilters.initialized) {
    categoriesFilters.initialize(routingCategoriesFilters, router)
  }

  useEffect(() => {
    return () => {
      destroyDistrictFilters()
      destroyCategoriesFilters()
    }
  }, [destroyDistrictFilters, destroyCategoriesFilters])

  return (
    <div className="">
      <div className="fr-form-group fr-py-8v">
        <fieldset className="fr-fieldset">
          <legend
            className="fr-fieldset__legend fr-text--regular fr-text--bold fr-text--lg fr-mx-6v"
            id="checkboxes-legend"
          >
            Régions
          </legend>
          <ProjectMap />
          <button
            type="button"
            className="fr-mx-6v fr-btn fr-btn--tertiary-no-outline fr-text--regular fr-btn--sm"
            onClick={districtFilters.reset}
          >
            Voir toutes les régions
          </button>
          {displayRegionsCheckboxes && (
            <div className="fr-fieldset__content fr-mt-3v fr-px-4v">
              {districts.map((district) => (
                <div
                  key={district}
                  className="fr-checkbox-group fr-checkbox-group--sm"
                >
                  <input
                    onChange={() => districtFilters.toggle(district)}
                    type="checkbox"
                    id={`district_${district}`}
                    name={district}
                    checked={districtFilters.selected.has(district)}
                  />
                  <label
                    className="fr-label fr-pt-3v fr-pb-0 fr-text--sm"
                    htmlFor={`district_${district}`}
                  >
                    {district}
                  </label>
                </div>
              ))}
            </div>
          )}
        </fieldset>
        {displayCategoriesCheckboxes && (
          <fieldset className="fr-fieldset">
            <legend
              className="fr-fieldset__legend fr-text--regular fr-text--bold fr-text--lg"
              id="checkboxes-legend"
            >
              Thématiques
            </legend>
            <button
              type="button"
              className="fr-btn fr-btn--tertiary-no-outline  fr-text--regular fr-btn--sm"
              onClick={categoriesFilters.reset}
            >
              Réinitialiser les filtres
            </button>
            <div className="fr-fieldset__content fr-mt-3v">
              {categories.map((category) => (
                <div
                  key={category}
                  className="fr-checkbox-group fr-checkbox-group--sm"
                >
                  <input
                    onChange={() => categoriesFilters.toggle(category)}
                    type="checkbox"
                    id={`category_${category}`}
                    name={category}
                    checked={categoriesFilters.selected.has(category)}
                  />
                  <label
                    className="fr-label fr-pt-3v fr-pb-0 fr-text--sm"
                    htmlFor={`category_${category}`}
                  >
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </fieldset>
        )}
      </div>
    </div>
  )
}
