import AvatarUser from './AvatarUser';
import Title from "./Title";

interface TopBarProps {
  title?: string;
  subtitle?: string;
}

export default function TopBar(props: TopBarProps) {

  return (
    <>
    <div className={`flex`}>
      <Title title={props.title} subtitle={props.subtitle} />
      <div className={`
      flex justify-end  items-center space-x-4
      `}>
        <AvatarUser />
      </div>
    </div>
    </>
  );
}
