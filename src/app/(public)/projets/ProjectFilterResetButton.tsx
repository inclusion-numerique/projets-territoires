import styles from './ProjectFilterResetButton.module.scss'

export const ProjectFilterResetButton = ({
  label,
  hidden,
  onClick,
}: {
  label: string
  hidden: boolean
  onClick: () => void
}) => (
  <p
    className={`fr-link fr-link--sm fr-mt-8v ${styles.projectFilterResetButton}`}
    onClick={onClick}
    style={{
      cursor: 'pointer',
      opacity: hidden ? 0 : undefined,
      pointerEvents: hidden ? 'none' : undefined,
    }}
  >
    {label}
  </p>
)
