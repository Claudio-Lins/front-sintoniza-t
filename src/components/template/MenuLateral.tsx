import MenuItem from "./MenuItem";
import {
  IconHome,
  IconSchedule,
  IconSubscribe,
  IconTeam,
  IconVolunteer,
  IconLogout,
  IconDestaque,
  IconPress,
  IconGoogle,
  IconClock,
  IconProgram
} from "../icons";
import Logo from "./Logo";
import { signOut, useSession } from 'next-auth/react'

export default function MenuLateral() {
  const { data: session } = useSession()


  return (
    <aside className='flex flex-col min-h-screen w-16 sm:w-auto bg-write text-teal-900 bg-green-900'>
      <div
        className={`
        flex flex-col items-center 
        justify-center h-16 w-16 sm:h-24 sm:w-24 bg-gradient-to-r from-purple-800 to-teal-700`}
      >
        <Logo />
      </div>
      <ul
        className={`grow`}
      >
        <MenuItem url="/" text="Home" icon={IconHome} />
        {/* <MenuItem url="/destaque" text="Destaque" icon={IconDestaque} /> */}
        {/* <MenuItem url='https://boilerplate-api-mongo.herokuapp.com/admin' target="_blank" text="Destaque" icon={IconDestaque} /> */}
        <MenuItem url="/admin/imprensa" text="Imprensa" icon={IconPress} />
        {/* <MenuItem url="/team" text="Equipa" icon={IconTeam} /> */}
        {/* <MenuItem url="/programas" text="Programas" icon={IconProgram} /> */}
        {/* <MenuItem url="/schedule" text="Horários" icon={IconSchedule} /> */}
        {/* <MenuItem url="/horarios" text="Horários" icon={IconClock} /> */}
        {/* <MenuItem url="/volunteer" text="Voluntáriado" icon={IconVolunteer} /> */}
        <MenuItem url="/admin/newsletter" text="Newsletter" icon={IconSubscribe} />
      </ul>
      <ul
      >
        <MenuItem
          text="Sair"
          icon={IconLogout}
          onClick={signOut}
          className={`
            text-white hover:bg-red-800
            
          `}
        />
      </ul>
    </aside>
  );
}
