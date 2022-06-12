import Content from "./template/Content";
import MenuLateral from "./template/MenuLateral";
import TopBar from "./template/TopBar";


interface LayoutProps {
  title: string;
  subtitle: string;
  children?: any;
}

export default function Layout(props: LayoutProps) {

  return (
      <div className={`flex min-h-screen w-screen`}>
        <MenuLateral />
        <div
          className={`
      flex flex-col w-full p-4 md:p-7 
      bg-gray-100 dark:bg-[#1B5B48]
      `}
        >
          <TopBar title={props.title} subtitle={props.subtitle} />
          <Content>{props.children}</Content>
        </div>
      </div>
  );
}
