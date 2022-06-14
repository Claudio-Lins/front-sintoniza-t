import Title from "./Title"

interface ContentProps {
    children?: any
  }
  
  export default function Content(props: ContentProps) {
    return (
      <div className='flex flex-col mt-7 text-teal-100'>
        <Title title={""} subtitle={""} />
        {props.children}
      </div>
    )
  }
  