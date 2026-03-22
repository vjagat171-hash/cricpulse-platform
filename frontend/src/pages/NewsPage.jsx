import SectionHeader from "../components/SectionHeader";
import NewsCard from "../components/NewsCard";

export default function NewsPage({ news }) {
  return (
    <div>
      <SectionHeader
        eyebrow="Editorial"
        title="News and insights"
        description="Live batting theme ke according compact newsroom layout."
      />
      <div className="grid gap-4 md:grid-cols-3">
        {news.map((item) => (
          <NewsCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
