import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Sheet() {
  return (
    <ScrollView>
      <SafeAreaView edges={['left', 'right']}>
        <View style={styles.content}>
          <Text style={styles.text}>SafeAreaView edges left/right, in a scroll view in a form sheet</Text>
          <Text style={styles.text}>
            Rotate landscape left → landscape right → portrait. The red frame should reach both sides in portrait
            on the first frame.
          </Text>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { height: 600, borderWidth: 4, borderColor: 'red', padding: 16, gap: 12 },
  text: { color: '#fff', fontSize: 16 },
});
