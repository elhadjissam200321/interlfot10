import { getGlobalSettings } from '@/lib/data-client'
import FooterV2Client from './footer-v2-client'

interface FooterV2Props {
  overlay?: boolean
  noPaddingTop?: boolean
}

export default async function FooterV2(props: FooterV2Props) {
  const globals = await getGlobalSettings()
  return <FooterV2Client globals={globals} {...props} />
}
