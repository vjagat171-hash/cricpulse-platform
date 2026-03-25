import useApi from "./useApi";

export default function useNews() {
  const { data, loading, error, refetch } = useApi("/api/news", { initialData: [] });
  return { news: Array.isArray(data) ? data : [], loading, error, refetch };
}
