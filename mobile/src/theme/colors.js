export const colors = {
  page: '#F6FAF7',
  surface: '#FFFFFF',
  line: '#E3ECE6',
  ink: '#16241C',
  inkSoft: '#5C6E63',

  brand: '#2F7A5C',
  brandDark: '#235C45',
  brandLight: '#E4F2EA',

  gizi: '#D97A3D',
  giziLight: '#FBEBDD',
  olahraga: '#3B7DD8',
  olahragaLight: '#E1EBFA',
  mental: '#8A6FD6',
  mentalLight: '#EEE9FB',
  pencegahan: '#2F9E8F',
  pencegahanLight: '#DFF3F0',
};

export const categoryMeta = {
  gizi: { label: 'Gizi Seimbang', color: colors.gizi, bg: colors.giziLight },
  olahraga: { label: 'Olahraga', color: colors.olahraga, bg: colors.olahragaLight },
  'kesehatan-mental': { label: 'Kesehatan Mental', color: colors.mental, bg: colors.mentalLight },
  'pencegahan-penyakit': { label: 'Pencegahan Penyakit', color: colors.pencegahan, bg: colors.pencegahanLight },
};

export const getCategoryMeta = (category) =>
  categoryMeta[category] || { label: category, color: colors.inkSoft, bg: colors.line };
