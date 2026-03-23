import { getGlobalSettings } from '@/lib/data-client'
import NavbarClient from './navbar-client'

export default async function Navbar() {
  const globals = await getGlobalSettings()
  return <NavbarClient uiStrings={globals.ui_strings} />
}
