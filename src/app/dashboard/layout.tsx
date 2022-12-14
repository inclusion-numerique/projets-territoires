import { PropsWithChildren } from 'react'
import { getSessionUser } from '@pt/auth/getSessionUser'
import { redirect } from 'next/navigation'
import PrivateHeader from '@pt/app/dashboard/PrivateHeader'
import PublicFooter from '@pt/app/(public)/PublicFooter'

const PrivateLayout = async ({ children, ...props }: PropsWithChildren) => {
  const user = await getSessionUser()

  if (!user) {
    return redirect('/auth/signin')
  }

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}
    >
      <PrivateHeader user={user} />
      <div className="fr-container" style={{ flex: 1 }}>
        <div>{children}</div>
      </div>
      <PublicFooter />
    </div>
  )
}

export default PrivateLayout
