/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import type { FieldResultDTO, MajorCardUI, CampusCardUI } from "@/utils/interface";

const styles = StyleSheet.create({
  page: {
    padding: 28,
    fontSize: 11,
    // ✅ PAKAI FONT DEFAULT (Helvetica) biar aman
    fontFamily: "Helvetica",
    color: "#111827",
  },

  header: {
    marginBottom: 14,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    borderBottomStyle: "solid",
  },
  title: { fontSize: 18, fontWeight: 700 },
  subtitle: { marginTop: 4, fontSize: 10, color: "#6B7280" },

  section: { marginTop: 14 },
  sectionTitle: { fontSize: 12, fontWeight: 700, marginBottom: 8 },

  card: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderStyle: "solid",
    borderRadius: 10,
    padding: 10,
  },

  table: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderStyle: "solid",
    borderRadius: 10,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    borderBottomStyle: "solid",
  },
  headerRow: {
    backgroundColor: "#F9FAFB",
  },
  cell: {
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  th: { fontSize: 10, fontWeight: 700, color: "#111827" },
  td: { fontSize: 10, color: "#111827" },
  muted: { color: "#6B7280" },

  pill: {
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 999,
    fontSize: 9,
    fontWeight: 700,
    alignSelf: "flex-start",
  },
  pillGreen: { backgroundColor: "#ECFDF5", color: "#047857" },
  pillGray: { backgroundColor: "#F3F4F6", color: "#374151" },
});

const fmtDate = (iso?: string | null) => {
  if (!iso) return "-";
  const d = new Date(iso);
  return d.toLocaleString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const pickText = (v: any, fallback = "-") =>
  v === null || v === undefined || v === "" ? fallback : String(v);

type Props = {
  title: string;
  description: string[];
  meta?: {
    riwayat_id?: string;
    quizName?: string;
    status?: string;
    tanggal_mulai?: string | null;
    tanggal_selesai?: string | null;
  };

  fieldResults: FieldResultDTO[];
  majors: MajorCardUI[];
  campuses: CampusCardUI[];
};

const Table = ({
  headers,
  rows,
  widths,
}: {
  headers: string[];
  rows: Array<string[]>;
  widths: number[]; // total ~ 100
}) => {
  const safeRows = Array.isArray(rows) ? rows : [];

  return (
    <View style={styles.table}>
      {/* header */}
      <View style={[styles.row, styles.headerRow]}>
        {headers.map((h, i) => (
          <View key={i} style={[styles.cell, { width: `${widths[i]}%` }]}>
            <Text style={styles.th}>{h}</Text>
          </View>
        ))}
      </View>

      {/* body */}
      {safeRows.length === 0 ? (
        <View style={[styles.row, { borderBottomWidth: 0 }]}>
          <View style={[styles.cell, { width: "100%" }]}>
            <Text style={[styles.td, styles.muted]}>Tidak ada data.</Text>
          </View>
        </View>
      ) : (
        safeRows.map((r, idx) => {
          const isLast = idx === safeRows.length - 1;

          // ✅ TANPA NULL style
          const rowStyle = isLast ? [styles.row, { borderBottomWidth: 0 }] : [styles.row];

          return (
            <View key={idx} style={rowStyle}>
              {r.map((c, i) => (
                <View key={i} style={[styles.cell, { width: `${widths[i]}%` }]}>
                  <Text style={styles.td}>{pickText(c)}</Text>
                </View>
              ))}
            </View>
          );
        })
      )}
    </View>
  );
};

const ResultPDF: React.FC<Props> = ({
  title,
  description,
  meta,
  fieldResults,
  majors,
  campuses,
}) => {
  const bidangRows = (Array.isArray(fieldResults) ? fieldResults : [])
    .slice()
    .sort((a, b) => Number(b.persentase) - Number(a.persentase))
    .map((r, idx) => [
      String(idx + 1),
      r.bidang?.nama_bidang ?? r.nama_bidang ?? "Bidang",
      String(r.skor_total ?? 0),
      `${Number(r.persentase ?? 0)}%`,
      r.is_winner ? "YA" : "-",
    ]);

  const jurusanRows = (Array.isArray(majors) ? majors : [])
    .filter((m) => m.isRecommended)
    .map((m, idx) => [String(idx + 1), m.nama]);

  const kampusRows = (Array.isArray(campuses) ? campuses : []).map((c, idx) => [
    String(idx + 1),
    c.name,
    c.tag,
  ]);

  const statusText = pickText(meta?.status, "STATUS");
  const isCompleted = String(meta?.status ?? "").includes("COMPLETED");

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Hasil Tes</Text>
          <Text style={styles.subtitle}>Ringkasan hasil & rekomendasi (PDF)</Text>
        </View>

        {/* Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ringkasan</Text>
          <View style={styles.card}>
            <Text style={{ fontSize: 14, fontWeight: 700 }}>{title}</Text>

            <View style={{ marginTop: 8 }}>
              {(Array.isArray(description) ? description : []).map((p, i) => (
                <Text
                  key={i}
                  style={{ marginTop: i === 0 ? 0 : 4, color: "#374151" }}
                >
                  {p}
                </Text>
              ))}
            </View>

            <View style={{ marginTop: 10, flexDirection: "row", gap: 8 }}>
              <Text style={[styles.pill, isCompleted ? styles.pillGreen : styles.pillGray]}>
                {statusText}
              </Text>
              <Text style={[styles.pill, styles.pillGray]}>
                Riwayat: {pickText(meta?.riwayat_id)}
              </Text>
            </View>
          </View>
        </View>

        {/* Info Tes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Info Tes</Text>
          <Table
            headers={["Item", "Nilai"]}
            widths={[35, 65]}
            rows={[
              ["Nama Quiz", pickText(meta?.quizName)],
              ["Tanggal Mulai", fmtDate(meta?.tanggal_mulai)],
              ["Tanggal Selesai", fmtDate(meta?.tanggal_selesai)],
              ["Status", statusText],
            ]}
          />
        </View>

        {/* Hasil Bidang */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hasil Bidang</Text>
          <Table
            headers={["No", "Bidang", "Skor", "Persentase", "Winner"]}
            widths={[8, 44, 16, 18, 14]}
            rows={bidangRows}
          />
        </View>

        {/* Rekomendasi Jurusan */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Rekomendasi Jurusan</Text>
          <Table headers={["No", "Jurusan"]} widths={[10, 90]} rows={jurusanRows} />
        </View>

        {/* Rekomendasi Kampus */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Rekomendasi Kampus</Text>
          <Table
            headers={["No", "Kampus", "Tag"]}
            widths={[10, 70, 20]}
            rows={kampusRows}
          />
        </View>

        {/* Footer */}
        <View style={{ marginTop: 18 }}>
          <Text style={{ fontSize: 9, color: "#9CA3AF" }}>
            Generated by TanyaKampus • {new Date().toLocaleDateString("id-ID")}
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default ResultPDF;
