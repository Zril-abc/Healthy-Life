import { Link } from 'react-router-dom';
import CategoryBadge from './CategoryBadge';

const typeIcon = { artikel: '📄', video: '▶', infografis: '🖼' };

const ContentCard = ({ content }) => {
  return (
    <Link
      to={`/content/${content._id}`}
      className="group flex flex-col bg-surface border border-line rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all"
    >
      <div className="relative aspect-[3/2] overflow-hidden bg-line">
        {content.imageUrl && (
          <img
            src={content.imageUrl}
            alt={content.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        )}
        <span className="absolute top-2 right-2 w-7 h-7 rounded-full bg-surface/90 flex items-center justify-center text-sm">
          {typeIcon[content.type] || '📄'}
        </span>
      </div>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <CategoryBadge category={content.category} />
        <h3 className="font-display font-semibold text-ink leading-snug line-clamp-2">
          {content.title}
        </h3>
        <p className="text-sm text-ink-soft line-clamp-2 flex-1">{content.summary}</p>
      </div>
    </Link>
  );
};

export default ContentCard;
