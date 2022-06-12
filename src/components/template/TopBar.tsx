import Title from "./Title";
import useAppData from "../../data/hook/useAppData";
import BtnSwitchTheme from "./BtnSwitchTheme";
import AvatarUser from './AvatarUser'

interface TopBarProps {
  title: string;
  subtitle: string;
}

export default function TopBar(props: TopBarProps) {
  const { theme, switchTheme } = useAppData();

  return (
    <div className={`flex`}>
      <Title title={props.title} subtitle={props.subtitle} />
      <div className={`
      flex flex-grow justify-end  items-center space-x-4
      `}>
        <BtnSwitchTheme theme={theme} switchTheme={switchTheme} />
        <AvatarUser />
      </div>
    </div>
  );
}
