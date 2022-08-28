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
  onClick?: (event: Event) => void
}

export function Team({ team, onClick }: TeamProps) {
  return (
    <div className="mt-10 flex w-full flex-wrap items-center justify-center gap-8">
      {team && team.map((team: any) => (
        <div key={team.id}>
          <TeamCardV2
            name={team.name ?? ""}
            cargo={team.cargo}
            nationality={team.nationality}
            src={`${process.env.API_URL_SINTONIZA_T}/public/team/${team.fileUrl}`}
          />
        </div>
      ))}
    </div>
  )
}
