import { useEffect, useState, useCallback } from 'react';
import { View, Text, TextInput, FlatList, ScrollView, TouchableOpacity, StyleSheet, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getAllContent } from '../api/content';
import ContentCard from '../components/ContentCard';
import EmptyState from '../components/EmptyState';
import { useAuth } from '../context/AuthContext';
import { colors } from '../theme/colors';

const categories = [
  { value: '', label: 'Semua' },
  { value: 'gizi', label: 'Gizi Seimbang' },
  { value: 'olahraga', label: 'Olahraga' },
  { value: 'kesehatan-mental', label: 'Kesehatan Mental' },
  { value: 'pencegahan-penyakit', label: 'Pencegahan Penyakit' },
];

export default function HomeScreen() {
  const { user } = useAuth();
  const [content, setContent] = useState([]);
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(() => {
    return getAllContent({ category: category || undefined, search: search || undefined }).then(setContent);
  }, [category, search]);

  useEffect(() => {
    setLoading(true);
    load().finally(() => setLoading(false));
  }, [load]);

  const onRefresh = () => {
    setRefreshing(true);
    load().finally(() => setRefreshing(false));
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <FlatList
        data={content}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <ContentCard content={item} />}
        contentContainerStyle={styles.list}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.brand} />}
        ListHeaderComponent={
          <View>
            <Text style={styles.greeting}>Halo, {user?.name?.split(' ')[0]} 👋</Text>
            <Text style={styles.title}>Yuk, mulai hidup lebih sehat hari ini</Text>

            <TextInput
              style={styles.search}
              placeholder="Cari artikel, video, infografis..."
              value={search}
              onChangeText={setSearch}
            />

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipRow} contentContainerStyle={{ gap: 8 }}>
              {categories.map((c) => (
                <TouchableOpacity
                  key={c.value}
                  onPress={() => setCategory(c.value)}
                  style={[styles.chip, category === c.value && styles.chipActive]}
                >
                  <Text style={[styles.chipText, category === c.value && styles.chipTextActive]}>{c.label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        }
        ListEmptyComponent={
          !loading ? <EmptyState title="Belum ada konten" description="Coba kategori lain atau kata kunci yang berbeda." /> : null
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.page },
  list: { padding: 16, paddingBottom: 24 },
  greeting: { fontSize: 13, fontWeight: '700', color: colors.brand, marginBottom: 2 },
  title: { fontSize: 22, fontWeight: '800', color: colors.ink, marginBottom: 16 },
  search: { borderWidth: 1, borderColor: colors.line, backgroundColor: colors.surface, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 11, fontSize: 14, marginBottom: 14 },
  chipRow: { marginBottom: 18 },
  chip: { paddingHorizontal: 16, paddingVertical: 9, borderRadius: 999, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.surface },
  chipActive: { backgroundColor: colors.brand, borderColor: colors.brand },
  chipText: { fontSize: 13, fontWeight: '600', color: colors.inkSoft },
  chipTextActive: { color: '#fff' },
});
