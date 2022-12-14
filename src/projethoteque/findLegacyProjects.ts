import { prismaClient } from '@pt/prisma'
import { District } from '@pt/projethoteque/legacyProjects'
import { Category } from '@pt/anctProjects'

export const findLegacyProjects = async ({
  activeCategoriesFilters,
  activeDistrictsFilters,
  limit,
  cursor,
}: {
  activeCategoriesFilters: Category[]
  activeDistrictsFilters: District[]
  limit: number
  cursor?: string
}) => {
  const where = {
    ...(activeCategoriesFilters.length === 0
      ? null
      : {
          categories: {
            hasSome: activeCategoriesFilters,
          },
        }),
    ...(activeDistrictsFilters.length === 0
      ? null
      : {
          district: {
            in: activeDistrictsFilters,
          },
        }),
  }

  const [projects, count] = await Promise.all([
    prismaClient.legacyProject.findMany({
      where,
      take: limit + 1, // get an extra item at the end which we'll use as next cursor
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: { id: 'asc' },
    }),
    prismaClient.legacyProject.count({
      where,
    }),
  ])

  if (limit && projects.length > limit) {
    const nextItem = projects.pop()

    return {
      projects,
      nextCursor: nextItem?.id,
      count,
    }
  }

  return {
    projects,
    count,
    nextCursor: undefined,
  }
}
