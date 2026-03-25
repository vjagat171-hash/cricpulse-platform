import useApi from "./useApi";

export default function useSchedule() {
  const { data, loading, error, refetch } = useApi("/api/schedule", { initialData: [] });
  return { schedule: Array.isArray(data) ? data : [], loading, error, refetch };
}
