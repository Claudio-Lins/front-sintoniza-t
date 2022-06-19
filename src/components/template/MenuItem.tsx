import Link from 'next/link'

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
  function renderLink() {
    return (
      <a
        className={`
        flex flex-col items-center justify-center 
        sm:w-24 h-20 text-teal-900 dark:text-teal-100
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
        hover:bg-gray-100 dark:hover:bg-[#1B5B48] cursor-pointer
      `}
    >
      {props.url ? <Link href={props.url}>{renderLink()}</Link> : renderLink()}
    </li>
  )
}
