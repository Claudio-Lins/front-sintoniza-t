import Title from "./Title";
interface LayoutProps {
  title: string;
  subtitle: string;
}

export function HeaderContent(props: LayoutProps) {
  return (
        <div className='flex flex-col w-full p-4 md:p-7 bg-gray-100'>
           <Title title={props.title} subtitle={props.subtitle} />
        </div>
  );
}
