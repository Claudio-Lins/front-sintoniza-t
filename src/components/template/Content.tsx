interface ContentProps {
    children?: any
  }
  
  export default function Content(props: ContentProps) {
    return (
      <div className={`
        flex flex-col mt-7
        dark:text-teal-100
      `}>
        {props.children}
      </div>
    )
  }
  