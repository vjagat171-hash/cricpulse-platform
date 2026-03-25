import useApi from "./useApi";

export default function usePlayers() {
  const { data, loading, error, refetch } = useApi("/api/players", { initialData: [] });
  return { players: Array.isArray(data) ? data : [], loading, error, refetch };
}
