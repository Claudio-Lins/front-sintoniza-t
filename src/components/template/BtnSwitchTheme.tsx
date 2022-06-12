import { IconMoon, IconSun } from "../icons"



interface BtnSwitchThemeProps {
    theme: string;
    switchTheme: () => void;
}

export default function BtnSwitchTheme(props: BtnSwitchThemeProps) {
  return props.theme === "dark" ? (
    <div onClick={props.switchTheme} className={`
        hidden sm:flex items-center cursor-pointer
        bg-gradient-to-r from-yellow-300 to-yellow-600
        w-14 lg:w-24 h-8 rounded-full p-1
    `}>
        <div className={`
            flex items-center justify-center
            bg-white text-yellow-600
            w-6 h-6 rounded-full p-1
        `}>
            {IconSun}
        </div>
        <div className={`
            hidden lg:flex items-center ml-5
            text-white text-xs
        `}>
            <span>Light</span>
        </div>
    </div>
  ) : (
    <div onClick={props.switchTheme} className={`
        hidden sm:flex items-center justify-end cursor-pointer
        bg-gradient-to-r from-slate-400 to-slate-900
        w-14 lg:w-24 h-8 rounded-full p-1
    `}>
        <div className={`
            hidden lg:flex items-center mr-5
            text-slate-200 text-xs
        `}>
            <span>Dark</span>
        </div>
        <div className={`
            flex items-center justify-center
            bg-black text-yellow-300
            w-6 h-6 rounded-full p-1
        `}>
            {IconMoon}
        </div>
    </div>
  )
}
