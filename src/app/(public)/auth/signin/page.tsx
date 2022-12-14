import { getUrl } from '@pt/utils/baseUrl'
import { EmailSigninForm } from '@pt/app/(public)/auth/EmailSigninForm'
import { getSessionUser } from '@pt/auth/getSessionUser'
import { redirect } from 'next/navigation'
import { PublicConfig } from '@pt/config'
import { dashboardRootPath } from '@pt/dashboard/dashboard'

const signinErrorMessage = (error?: string): string | undefined => {
  if (!error) {
    return error
  }

  if (error === 'OAuthAccountNotLinked') {
    return 'Vous venez de vous connecter par un nouvelle méthode. Par sécurité, veuillez utiliser la méthode de connexion que vous avez utilisé initiallement.'
  }
  return 'Erreur de connexion, veuillez réessayer.'
}

const SigninPage = async ({
  searchParams: { error } = {},
}: {
  searchParams?: { error?: string }
}) => {
  const user = await getSessionUser()
  if (user) {
    redirect(getUrl(dashboardRootPath))
    return
  }

  return (
    <main role="main" id="content">
      <div className="fr-container fr-container--fluid fr-mb-md-14v">
        <div className="fr-grid-row fr-grid-row-gutters fr-grid-row--center">
          <div className="fr-col-12 fr-col-md-8 fr-col-xl-6">
            <div className="fr-container fr-background-alt--grey fr-px-md-0 fr-pt-10v fr-pt-md-14v fr-pb-6v fr-pb-md-10v">
              <div className="fr-grid-row fr-grid-row-gutters fr-grid-row--center">
                <div className="fr-col-12 fr-col-md-9 fr-col-lg-8">
                  {error ? (
                    <div className="fr-alert fr-alert--error fr-alert--sm fr-mb-6v">
                      <p>{signinErrorMessage(error)}</p>
                    </div>
                  ) : null}
                  <div>
                    <EmailSigninForm />
                  </div>
                  <hr />
                  <h5>Espace réservé aux agents de l&apos;ANCT</h5>
                  <p>
                    Veuillez vous assurer que vous utilisez votre adresse ANCT
                    pour la connexion a ce service. <br />
                    <br />
                    En cas de problèmes ou questions merci de contacter{' '}
                    <a href={`mailto:${PublicConfig.contactEmail}`}>
                      {PublicConfig.contactEmail}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default SigninPage
