import { HTMLInputTypeAttribute } from 'react'
import { Control, Controller, FieldValues } from 'react-hook-form'
import { FieldPath } from 'react-hook-form/dist/types/path'
import TextareaAutosize from 'react-textarea-autosize'
import { CommunitySearchBar } from '@pt/form/CommunitySearchBar'
import { CategorieJuridique, categoriesJuridiques } from '@pt/siren/siren'
import { ProjectData } from '@pt/project/project'

// View design options here https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/champ-de-saisie
export function CommunitySearchFormField<T extends FieldValues>({
  label,
  path,
  control,
  placeholder,
  hint,
  disabled,
}: {
  control: Control<T>
  path: FieldPath<T>
  disabled?: boolean
  label?: string
  hint?: string
  type?: Exclude<HTMLInputTypeAttribute, 'checkbox'> | 'textarea'
  placeholder?: string
}) {
  const id = `input-form-field__${path}`

  return (
    <Controller
      control={control}
      name={path}
      render={({
        field: { onChange, onBlur, value, name, ref },
        fieldState: { invalid, isTouched, isDirty, error },
        formState,
      }) => {
        console.log('THE VALUE', value)
        const community = value as ProjectData['community']

        return (
          <div
            className={`fr-input-group ${
              error ? 'fr-input-group--error' : ''
            } ${disabled ? 'fr-input-group--disabled' : ''} ${
              isTouched && !invalid ? 'fr-input-group--valid' : ''
            }`}
          >
            <label className="fr-label fr-pb-2v" htmlFor={id}>
              {label}
              {hint ? <span className="fr-hint-text">{hint}</span> : null}
            </label>
            {value ? (
              <div className="fr-btns-group fr-btns-group--icon-left">
                <button
                  type="button"
                  className="fr-btn fr-btn--lg fr-btn--secondary fr-icon-checkbox-circle-line"
                  onClick={() => {
                    onChange(null)
                  }}
                >
                  <span style={{ flex: 1 }}>
                    <strong>{community.denominationUniteLegale}</strong>
                  </span>
                  <span className="fr-badge fr-badge--sm fr-badge--blue-cumulus fr-ml-2v">
                    {
                      categoriesJuridiques[
                        community.categorieJuridiqueUniteLegale as CategorieJuridique
                      ]
                    }
                  </span>
                </button>
              </div>
            ) : (
              <CommunitySearchBar
                disabled={disabled}
                id={id}
                placeholder={placeholder}
                onSelect={(community) => onChange(community)}
              />
            )}

            {error ? (
              <p id={`${id}__error`} className="fr-error-text">
                {error.message}
              </p>
            ) : null}
          </div>
        )
      }}
    />
  )
}