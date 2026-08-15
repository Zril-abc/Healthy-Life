import { useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getActivities, addActivity, deleteActivity } from '../api/activities';
import EmptyState from '../components/EmptyState';
import { colors } from '../theme/colors';

const activityTypes = [
  { value: 'air-minum', label: 'Air Minum', icon: '💧', placeholder: 'contoh: 8 gelas' },
  { value: 'olahraga', label: 'Olahraga', icon: '🏃', placeholder: 'contoh: 30 menit' },
  { value: 'tidur', label: 'Tidur', icon: '😴', placeholder: 'contoh: 7 jam' },
  { value: 'mood', label: 'Mood', icon: '🙂', placeholder: 'contoh: Senang' },
  { value: 'berat-badan', label: 'Berat Badan', icon: '⚖️', placeholder: 'contoh: 65 kg' },
];

const meta = (type) => activityTypes.find((t) => t.value === type) || {};

export default function ActivitiesScreen() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState('air-minum');
  const [value, setValue] = useState('');
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);

  const load = useCallback(() => getActivities().then(setActivities), []);

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      load().finally(() => setLoading(false));
    }, [load])
  );

  const handleSubmit = async () => {
    if (!value.trim()) return;
    setSaving(true);
    try {
      await addActivity({ type, value, notes });
      setValue('');
      setNotes('');
      load();
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    await deleteActivity(id);
    load();
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <FlatList
        data={activities}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={{ fontSize: 20 }}>{meta(item.type).icon}</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.rowTitle}>{meta(item.type).label}: {item.value}</Text>
              <Text style={styles.rowSub}>
                {new Date(item.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                {item.notes ? ` · ${item.notes}` : ''}
              </Text>
            </View>
            <TouchableOpacity onPress={() => handleDelete(item._id)}>
              <Text style={styles.delete}>Hapus</Text>
            </TouchableOpacity>
          </View>
        )}
        ListHeaderComponent={
          <View>
            <Text style={styles.title}>Catatan Aktivitas</Text>
            <Text style={styles.subtitle}>Catat aktivitas kesehatan harianmu secara rutin.</Text>

            <View style={styles.form}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
                {activityTypes.map((t) => (
                  <TouchableOpacity
                    key={t.value}
                    onPress={() => setType(t.value)}
                    style={[styles.chip, type === t.value && styles.chipActive]}
                  >
                    <Text style={[styles.chipText, type === t.value && styles.chipTextActive]}>
                      {t.icon} {t.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              <TextInput style={styles.input} placeholder={meta(type).placeholder} value={value} onChangeText={setValue} />
              <TextInput style={styles.input} placeholder="Catatan (opsional)" value={notes} onChangeText={setNotes} />
              <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={saving}>
                <Text style={styles.buttonText}>{saving ? 'Menyimpan...' : 'Catat'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        }
        ListEmptyComponent={
          !loading ? <EmptyState title="Belum ada catatan" description="Mulai catat aktivitas kesehatan harianmu di form atas." /> : null
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
  form: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line, borderRadius: 16, padding: 14, marginBottom: 18, gap: 10 },
  chip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 999, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.page },
  chipActive: { backgroundColor: colors.brand, borderColor: colors.brand },
  chipText: { fontSize: 13, fontWeight: '600', color: colors.inkSoft },
  chipTextActive: { color: '#fff' },
  input: { borderWidth: 1, borderColor: colors.line, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 10, fontSize: 14, backgroundColor: colors.page },
  button: { backgroundColor: colors.brand, borderRadius: 12, paddingVertical: 12, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '700', fontSize: 14 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line, borderRadius: 14, padding: 12, marginBottom: 8 },
  rowTitle: { fontSize: 14, fontWeight: '600', color: colors.ink },
  rowSub: { fontSize: 12, color: colors.inkSoft, marginTop: 2 },
  delete: { fontSize: 12, color: colors.inkSoft },
});
