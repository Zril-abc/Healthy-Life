import { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, RefreshControl, TouchableOpacity } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getFavorites } from '../api/favorites';
import ContentCard from '../components/ContentCard';
import EmptyState from '../components/EmptyState';
import { colors } from '../theme/colors';

export default function FavoritesScreen() {
  const navigation = useNavigation();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(() => {
    return getFavorites().then((data) => setFavorites(data.filter((f) => f.content)));
  }, []);

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      load().finally(() => setLoading(false));
    }, [load])
  );

  const onRefresh = () => {
    setRefreshing(true);
    load().finally(() => setRefreshing(false));
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <ContentCard content={item.content} />}
        contentContainerStyle={styles.list}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.brand} />}
        ListHeaderComponent={
          <View>
            <Text style={styles.title}>Konten Favorit</Text>
            <Text style={styles.subtitle}>Artikel, video, dan infografis yang sudah kamu simpan.</Text>
          </View>
        }
        ListEmptyComponent={
          !loading ? (
            <EmptyState
              title="Belum ada favorit"
              description="Simpan artikel, video, atau infografis yang menarik supaya mudah ditemukan lagi nanti."
              action={
                <TouchableOpacity style={styles.cta} onPress={() => navigation.navigate('Beranda')}>
                  <Text style={styles.ctaText}>Jelajahi Konten</Text>
                </TouchableOpacity>
              }
            />
          ) : null
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.page },
  list: { padding: 16, paddingBottom: 24 },
  title: { fontSize: 22, fontWeight: '800', color: colors.ink, marginBottom: 4 },
  subtitle: { fontSize: 14, color: colors.inkSoft, marginBottom: 16 },
  cta: { backgroundColor: colors.brand, paddingHorizontal: 20, paddingVertical: 12, borderRadius: 999, marginTop: 8 },
  ctaText: { color: '#fff', fontWeight: '700', fontSize: 14 },
});
