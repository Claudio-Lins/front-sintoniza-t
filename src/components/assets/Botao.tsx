interface BotaoProps {
  children?: any
  onClick?: any
  className?: string
  type?: string
}

export default function Botao(props: BotaoProps) {
  return (
    <button
      onClick={props.onClick}
      className={`
            bg-gradient-to-r from-teal-400 to-teal-700
            text-white font-semibold py-2 px-4 rounded-md shadow-md shadow-teal-500/30
             hover:shadow-teal-700
            ${props.className}
        `}
    >
      {props.children}
    </button>
  )
}
