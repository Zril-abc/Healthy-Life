import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

export default function EmptyState({ title, description, action }) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.desc}>{description}</Text>
      {action}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', paddingVertical: 60, paddingHorizontal: 24, gap: 6 },
  title: { fontWeight: '700', fontSize: 17, color: colors.ink },
  desc: { fontSize: 14, color: colors.inkSoft, textAlign: 'center', maxWidth: 280 },
});
