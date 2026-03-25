import { useParams } from "react-router-dom";
import useApi from "../hooks/useApi";
import LiveScoreCard from "../components/LiveScoreCard";
import BattingPanel from "../components/BattingPanel";
import CommentaryPanel from "../components/CommentaryPanel";
import ErrorBanner from "../components/ErrorBanner";

export default function MatchDetailsPage() {
  const { id } = useParams();
  const { data: match, loading, error } = useApi(`/api/match/${id}`, {
    initialData: null,
    enabled: Boolean(id),
  });
  const { data: commentary = [] } = useApi(`/api/commentary/${id}`, {
    initialData: [],
    enabled: Boolean(id),
  });

  if (loading) {
    return <div className="h-44 animate-pulse rounded-[24px] bg-slate-900/80" />;
  }

  return (
    <div className="space-y-6">
      <ErrorBanner message={error} />
      <LiveScoreCard match={match} />
      <BattingPanel match={match} />
      <CommentaryPanel items={commentary} />
    </div>
  );
}
