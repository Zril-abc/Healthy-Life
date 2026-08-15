import { useEffect, useState, useCallback } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { getContentById } from '../api/content';
import { getFavorites, addFavorite, removeFavorite } from '../api/favorites';
import CategoryBadge from '../components/CategoryBadge';
import { colors } from '../theme/colors';

const typeLabel = { artikel: 'Artikel', video: 'Video', infografis: 'Infografis' };

export default function ContentDetailScreen({ route }) {
  const { id } = route.params;
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favoriteId, setFavoriteId] = useState(null);
  const [busy, setBusy] = useState(false);

  const loadFavoriteStatus = useCallback(async () => {
    try {
      const favorites = await getFavorites();
      const match = favorites.find((f) => f.content?._id === id);
      setFavoriteId(match ? match._id : null);
    } catch {
      setFavoriteId(null);
    }
  }, [id]);

  useEffect(() => {
    setLoading(true);
    getContentById(id).then(setContent).finally(() => setLoading(false));
    loadFavoriteStatus();
  }, [id, loadFavoriteStatus]);

  const toggleFavorite = async () => {
    setBusy(true);
    try {
      if (favoriteId) {
        await removeFavorite(id);
      } else {
        await addFavorite(id);
      }
      await loadFavoriteStatus();
    } finally {
      setBusy(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={colors.brand} size="large" />
      </View>
    );
  }

  if (!content) {
    return (
      <View style={styles.center}>
        <Text style={{ color: colors.inkSoft }}>Konten tidak ditemukan.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.page }} contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
      {content.imageUrl ? <Image source={{ uri: content.imageUrl }} style={styles.image} /> : null}

      <View style={styles.metaRow}>
        <CategoryBadge category={content.category} />
        <Text style={styles.typeLabel}>{typeLabel[content.type]}</Text>
      </View>

      <Text style={styles.title}>{content.title}</Text>
      <Text style={styles.body}>{content.body}</Text>

      <TouchableOpacity
        style={[styles.favButton, favoriteId && styles.favButtonActive]}
        onPress={toggleFavorite}
        disabled={busy}
      >
        <Text style={[styles.favButtonText, favoriteId && styles.favButtonTextActive]}>
          {favoriteId ? '★ Tersimpan di Favorit' : '☆ Simpan ke Favorit'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.page },
  image: { width: '100%', aspectRatio: 16 / 9, borderRadius: 16, marginBottom: 16, backgroundColor: colors.line },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  typeLabel: { fontSize: 11, fontWeight: '700', color: colors.inkSoft, textTransform: 'uppercase', letterSpacing: 0.5 },
  title: { fontSize: 22, fontWeight: '800', color: colors.ink, marginBottom: 14, lineHeight: 28 },
  body: { fontSize: 15, color: colors.inkSoft, lineHeight: 23, marginBottom: 24 },
  favButton: { alignSelf: 'flex-start', backgroundColor: colors.brandLight, paddingHorizontal: 20, paddingVertical: 12, borderRadius: 999 },
  favButtonActive: { backgroundColor: colors.brand },
  favButtonText: { color: colors.brandDark, fontWeight: '700', fontSize: 14 },
  favButtonTextActive: { color: '#fff' },
});
