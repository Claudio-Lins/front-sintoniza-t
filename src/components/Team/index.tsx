import { TeamCardV2 } from './TeamCardV2'


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
    <div className="mt-10 flex w-full flex-wrap items-center justify-center gap-8">
      {team.map((team: TeamProps) => (
        <div key={team.id}>
          <TeamCardV2
            name={team.name ?? ""}
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
