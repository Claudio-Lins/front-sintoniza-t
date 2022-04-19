
interface TeamProps {
  team: any
  email?: string
  id?: number
  name?: string
  cargo?: string
  }
  


export function Team({ team }: TeamProps) {
  return (
    <div>
      {team.map((team: TeamProps) => (
        <div key={team.id}>
          <h2>{team.name}</h2>
          <p>{team.email}</p>
          <p>{team.cargo}</p>
        </div>
      ))}
    </div>
  )
}
