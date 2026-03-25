import useApi from "./useApi";

export default function usePointsTable() {
  const { data, loading, error, refetch } = useApi("/api/points-table", { initialData: [] });
  return { table: Array.isArray(data) ? data : [], loading, error, refetch };
}
