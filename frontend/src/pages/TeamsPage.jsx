import SectionHeader from "../components/SectionHeader";
import TeamCard from "../components/TeamCard";

export default function TeamsPage({ teams }) {
  return (
    <div>
      <SectionHeader
        eyebrow="Squads"
        title="Team overview cards"
        description="Captain, home ground, form, and short code ke saath franchise cards."
      />
      <div className="grid gap-4 md:grid-cols-2">
        {teams.map((team) => (
          <TeamCard key={team.id} team={team} />
        ))}
      </div>
    </div>
  );
}
