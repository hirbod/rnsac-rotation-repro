import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function Home() {
  return (
    <View style={styles.screen}>
      <Link href="/sheet" style={styles.button}>
        Open sheet
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  button: { padding: 16, backgroundColor: '#333', borderRadius: 12, color: '#fff', fontSize: 16 },
});
