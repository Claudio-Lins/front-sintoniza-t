import Title from "./Title";
import BtnSwitchTheme from "./BtnSwitchTheme";
import AvatarUser from './AvatarUser'
import { signOut, useSession } from 'next-auth/react'

interface TopBarProps {
  title: string;
  subtitle: string;
}

export default function TopBar(props: TopBarProps) {
  const { data: session } = useSession()

  return (
    <div className={`flex`}>
      <Title title={props.title} subtitle={props.subtitle} />
      <div className={`
      flex flex-grow justify-end  items-center space-x-4
      `}>
        {/* <BtnSwitchTheme theme={theme} switchTheme={switchTheme} /> */}
        <AvatarUser />
      </div>
    </div>
  );
}
