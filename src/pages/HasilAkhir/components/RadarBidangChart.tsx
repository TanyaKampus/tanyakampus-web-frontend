import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { RadarChart, type RadarSeries } from "@mui/x-charts/RadarChart";
import type { FieldResultDTO } from "@/utils/interface";

// icons
import {
  FaLaptopCode,
  FaPalette,
  FaBalanceScale,
  FaChartLine,
} from "react-icons/fa";

type Props = {
  fieldResults: FieldResultDTO[];
  max?: number;
};

const TEAL = "#069494";

const normalize = (s: string) => s.toLowerCase().replace(/\s+/g, " ").trim();

const getIconByBidang = (nama: string) => {
  const n = normalize(nama);

  if (
    n.includes("teknik") ||
    n.includes("ilmu komputer") ||
    n.includes("komputer")
  )
    return FaLaptopCode;

  if (
    n.includes("ilmu sosial") ||
    n.includes("politik") ||
    n.includes("sosial")
  )
    return FaBalanceScale;

  if (n.includes("bisnis") || n.includes("ekonomi")) return FaChartLine;

  if (n.includes("desain") || n.includes("seni")) return FaPalette;

  return FaLaptopCode; // fallback
};

const RadarBidangChart: React.FC<Props> = ({ fieldResults, max }) => {
  const [hideMark, setHideMark] = React.useState(false);
  const [fillArea, setFillArea] = React.useState(true);

  const safe = React.useMemo(
    () => (Array.isArray(fieldResults) ? fieldResults : []),
    [fieldResults],
  );

  const metrics = React.useMemo(() => {
    return safe.map((r) => r.bidang?.nama_bidang ?? r.nama_bidang ?? "Bidang");
  }, [safe]);

  const values = React.useMemo(() => {
    return safe.map((r) => Number(r.persentase ?? 0));
  }, [safe]);

  const computedMax = React.useMemo(() => {
    if (typeof max === "number") return max;
    const top = Math.max(0, ...values);
    if (top <= 100) return 100;
    return Math.ceil(top / 10) * 10;
  }, [max, values]);

  const series = React.useMemo(() => {
    const base: RadarSeries = {
      // label: "Skor (%)",
      data: values,
      hideMark,
      fillArea,
      color: TEAL,
    };
    return [base];
  }, [values, hideMark, fillArea]);

  if (metrics.length === 0) {
    return (
      <div className="h-[300px] flex items-center justify-center text-gray-400">
        Data bidang belum tersedia.
      </div>
    );
  }

  // ✅ posisi 4 arah untuk 4 bidang (sesuai radar)
  // urutan: 0=TOP, 1=RIGHT, 2=BOTTOM, 3=LEFT
  const positions = [
    { top: "-40px", left: "50%", transform: "translate(-50%, 0)" }, // TOP
    { top: "40%", right: "62px", transform: "translate(0, -50%)" }, // RIGHT
    { bottom: "-40px", left: "50%", transform: "translate(-50%, 0)" }, // BOTTOM
    { top: "40%", left: "62px", transform: "translate(0, -50%)" }, // LEFT
  ] as const;

  return (
    <Box sx={{ width: "100%" }}>
      {/* Toggle tengah */}
      <Stack
        direction="row"
        gap={2}
        flexWrap="wrap"
        alignItems="center"
        justifyContent="center"
        sx={{ width: "100%", mb: 1 }}
      >
        <FormControlLabel
          checked={!hideMark}
          control={
            <Checkbox
              onChange={(event) => setHideMark(!event.target.checked)}
              sx={{
                color: TEAL, // warna outline saat unchecked
                "&.Mui-checked": { color: TEAL }, // warna saat checked
              }}
            />
          }
          label="With Mark"
          labelPlacement="end"
        />

        <FormControlLabel
          checked={fillArea}
          control={
            <Checkbox
              onChange={(event) => setFillArea(event.target.checked)}
              sx={{
                color: TEAL,
                "&.Mui-checked": { color: TEAL },
              }}
            />
          }
          label="Fill Area"
          labelPlacement="end"
        />
      </Stack>

      {/* Chart wrapper: relative biar bisa overlay */}
      <Box sx={{ width: "100%", position: "relative", marginTop: "80px" }}>
        <RadarChart
          height={320}
          radar={{
            max: computedMax,
            metrics,
          }}
          series={series}
        />

        {/* ✅ Overlay icons di area radar (lingkaran merah) */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none", // ✅ biar gak ganggu klik chart/toggle
          }}
        >
          {metrics.slice(0, 4).map((name, idx) => {
            const Icon = getIconByBidang(name);
            const pos = positions[idx] ?? positions[0];

            return (
              <Box
                key={`${name}-${idx}`}
                sx={{
                  position: "absolute",
                  ...pos,
                  width: 34,
                  height: 34,
                  borderRadius: "9999px",
                  backgroundColor: TEAL,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 6px 14px rgba(0,0,0,0.10)",
                  border: "2px solid #ffffff",
                }}
              >
                <Icon size={16} color="#fff" />
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default RadarBidangChart;
