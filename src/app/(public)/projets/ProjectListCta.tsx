import Link from 'next/link'
import { CSSProperties } from 'react'
import styles from '@pt/app/(public)/projets/styles.module.scss'

export const ProjectListCta = ({ style }: { style?: CSSProperties }) => {
  return (
    <li key="cta" style={style}>
      <div className={`${styles.legacyProjectCard}`} style={{ minHeight: 0 }}>
        <div
          className={`fr-p-8v`}
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <h6>Vous êtes maire ou président d&apos;intercommunalité ?</h6>
          <Link className={`fr-btn fr-mt-2v fr-py-4v fr-px-4w`} href="/projet">
            Partagez vos solutions&nbsp;!
          </Link>
        </div>
      </div>
    </li>
  )
}
