import {
  legacyProjectImageUrl,
  legacyProjectUrl,
} from '@pt/projethoteque/legacyProjects'
import styles from './styles.module.scss'
import { CSSProperties, ForwardedRef, forwardRef } from 'react'
import { ProjectListItem } from '@pt/legacyProject/projectsList'

export const LegacyProjectCard = forwardRef(
  (
    {
      style,
      project: {
        program,
        categories,
        district,
        id,
        title,
        city,
        imageAlt,
        imagePath,
        slug,
      },
    }: {
      style?: CSSProperties
      project: ProjectListItem
    },
    ref: ForwardedRef<HTMLLIElement>,
  ) => {
    const href = legacyProjectUrl(slug)

    const tags = [district, program, ...categories].filter(
      (tag): tag is string => !!tag,
    )

    return (
      <li style={style} ref={ref}>
        <a
          className={`fr-mb-4v ${styles.legacyProjectCard}`}
          href={href}
          title={`Voir le projet "${title}"`}
          target="_blank"
        >
          <picture className={styles.picture}>
            <img
              id={`${id}__image`}
              src={legacyProjectImageUrl(imagePath)}
              alt={imageAlt}
            />
          </picture>
          <div className={`${styles.content} fr-p-8v`}>
            <p
              className="fr-hint-text fr-mb-0"
              style={{ color: 'var(--text-mention-grey' }}
            >
              <span className="fr-mr-1w fr-icon--sm fr-icon-map-pin-2-line" />
              {city}
            </p>
            <h6 className={`fr-mt-4v fr-mb-0 fr-text--lg ${styles.title}`}>
              {title}
            </h6>
            <ul
              className="fr-tags-group fr-mt-4v fr-mb-0"
              style={{ flexGrow: 1 }}
            >
              {tags.map((tag) => (
                <li key={tag} style={{ lineHeight: '32px' }}>
                  <p className="fr-tag fr-tag--sm">{tag}</p>
                </li>
              ))}
            </ul>
            <p className="fr-link fr-link--icon-right fr-icon-external-link-line fr-mt-4v">
              Voir le projet
            </p>
          </div>
        </a>
      </li>
    )
  },
)
LegacyProjectCard.displayName = 'LegacyProjectCard'
