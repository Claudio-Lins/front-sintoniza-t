import Link from 'next/link'
import { useRouter } from 'next/router'

interface MenuItemProps {
  text: string
  icon: any
  url?: string
  target?: string
  rel?: string
  className?: string
  onClick?: (event: any) => void
}

export default function MenuItem(props: MenuItemProps) {
  const router = useRouter()
  function renderLink() {
    return (
      <a
        className={`
        flex flex-col items-center justify-center 
        sm:w-24 h-20 
        ${router.pathname === props.url ? 'text-teal-900' : 'text-teal-100'}
        ${props.className}
    `}
      >
        {props.icon}
        <span className={`text-[10px] sm:text-xs font-light`}>{props.text}</span>
      </a>
    )
  }

  return (
    <li
      onClick={props.onClick}
      className={`
        hover:bg-teal-400 cursor-pointer
        ${router.pathname === props.url ? 'bg-teal-400' : ''}
      `}
    >
      {props.url ? <Link href={props.url}>{renderLink()}</Link> : renderLink()}
    </li>
  )
}
