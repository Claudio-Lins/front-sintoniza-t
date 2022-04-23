import { TeamCard } from './TeamCard'

interface TeamProps {
  team: any
  id?: number
  name?: string
  cargo?: string
  nationality?: string
  fileUrl?: string
  ReactCountryFlag?: any
  src?: any
}

export function Team({ team }: TeamProps) {
  return (
    <div className="flex w-full flex-wrap justify-center gap-8 mt-10">
      {team.map((team: TeamProps) => (
        <div key={team.id}>
          <TeamCard
            name={team.name}
            cargo={team.cargo}
            nationality={team.nationality}
            src={`${process.env.API_URL_SINTONIZA_T}/public/team/${team.fileUrl}`}
            delay={1}
          />
        </div>
      ))}
    </div>
  )
}
