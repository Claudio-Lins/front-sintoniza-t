import { useWindowSize } from '../../../hooks/useWindowSize'
import AvatarUser from './AvatarUser'
import Title from './Title'
interface LayoutProps {
  title: string
  subtitle: string
}

export function HeaderContent(props: LayoutProps) {
  const { windowWidth } = useWindowSize()

  return (
    <div className="mb-2 flex h-[96px] w-full items-center justify-between px-2">
      <Title title={props.title} subtitle={props.subtitle} />
      {windowWidth > 768 ? <AvatarUser /> : null}
    </div>
  )
}
