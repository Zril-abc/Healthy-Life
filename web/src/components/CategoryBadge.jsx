const categoryMeta = {
  gizi: { label: 'Gizi Seimbang', color: '#D97A3D', bg: '#FBEBDD' },
  olahraga: { label: 'Olahraga', color: '#3B7DD8', bg: '#E1EBFA' },
  'kesehatan-mental': { label: 'Kesehatan Mental', color: '#8A6FD6', bg: '#EEE9FB' },
  'pencegahan-penyakit': { label: 'Pencegahan Penyakit', color: '#2F9E8F', bg: '#DFF3F0' },
};

export const getCategoryMeta = (category) =>
  categoryMeta[category] || { label: category, color: '#5C6E63', bg: '#E3ECE6' };

const CategoryBadge = ({ category }) => {
  const meta = getCategoryMeta(category);
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
      style={{ color: meta.color, backgroundColor: meta.bg }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: meta.color }} />
      {meta.label}
    </span>
  );
};

export default CategoryBadge;
