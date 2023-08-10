/* eslint-disable */
import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  PDFDownloadLink,
} from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    display: "flex",
    height: "100vh",
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,

    flexGrow: 1,
  },
});

// Create Document Component
const DOC = () => (
  <Document title="Sample PDF">
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Section #1</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>
);

const PDF = () => (
  <>
    <PDFDownloadLink document={<DOC />} fileName="sample.pdf">
      {({ blob, url, loading, error }) =>
        loading ? "Loading document..." : "Download now!"
      }
    </PDFDownloadLink>
    <PDFViewer showToolbar height={300}>
      <DOC />
    </PDFViewer>
  </>
);

export default PDF;
