import { TeamCard } from './TeamCard'

interface TeamProps {
  team: any
  id?: number
  name?: string
  cargo?: string
  nationality?: string
  fileUrl?: string
}


export function Team({ team }: TeamProps) {
  return (
    <div className="flex w-full flex-wrap justify-center gap-8">
      {team.map((team: TeamProps) => (
        <div key={team.id}
        >
          <TeamCard
            name={team.name}
            cargo={team.cargo}
            nationality={team.nationality}
            src={`https://api.sintoniza-t.pt/dev/public/team/${team.fileUrl}`} 
            />
        </div>
      ))}
    </div>
  )
}
