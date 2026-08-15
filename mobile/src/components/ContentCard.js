import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CategoryBadge from './CategoryBadge';
import { colors } from '../theme/colors';

const typeIcon = { artikel: '📄', video: '▶', infografis: '🖼' };

export default function ContentCard({ content }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.85}
      onPress={() => navigation.navigate('ContentDetail', { id: content._id })}
    >
      <View style={styles.imageWrap}>
        {content.imageUrl ? (
          <Image source={{ uri: content.imageUrl }} style={styles.image} />
        ) : (
          <View style={[styles.image, { backgroundColor: colors.line }]} />
        )}
        <View style={styles.typeIcon}>
          <Text>{typeIcon[content.type] || '📄'}</Text>
        </View>
      </View>
      <View style={styles.body}>
        <CategoryBadge category={content.category} />
        <Text style={styles.title} numberOfLines={2}>{content.title}</Text>
        <Text style={styles.summary} numberOfLines={2}>{content.summary}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.line,
    overflow: 'hidden',
    marginBottom: 14,
  },
  imageWrap: { position: 'relative', aspectRatio: 16 / 10 },
  image: { width: '100%', height: '100%' },
  typeIcon: {
    position: 'absolute', top: 8, right: 8,
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center', justifyContent: 'center',
  },
  body: { padding: 14, gap: 6 },
  title: { fontWeight: '700', fontSize: 15, color: colors.ink, lineHeight: 20 },
  summary: { fontSize: 13, color: colors.inkSoft, lineHeight: 18 },
});
