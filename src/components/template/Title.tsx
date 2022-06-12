interface TitleProps {
  title: string
  subtitle: string
}

export default function Title(props: TitleProps) {
  return (
    <div className='w-[300px] md:w-auto'>
      <h1 className={`
      font-black text-lg md:text-3xl text-teal-900
      dark:text-teal-100
      `}>
        {props.title}
      </h1>
      <h2 className={`
      font-light text-xs md:text-sm text-teal-600
      dark:text-teal-200
      `}>
        {props.subtitle}
      </h2>
    </div>
  )
}
