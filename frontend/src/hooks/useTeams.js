import useApi from "./useApi";

export default function useTeams() {
  const { data, loading, error, refetch } = useApi("/api/teams", { initialData: [] });
  return { teams: Array.isArray(data) ? data : [], loading, error, refetch };
}
