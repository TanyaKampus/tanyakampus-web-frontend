import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { RadarChart, type RadarSeries } from "@mui/x-charts/RadarChart";
import type { FieldResultDTO } from "@/utils/interface";

type Props = {
  fieldResults: FieldResultDTO[];
  max?: number;
};

const RadarBidangChart: React.FC<Props> = ({ fieldResults, max }) => {
  const [hideMark, setHideMark] = React.useState(false);
  const [fillArea, setFillArea] = React.useState(true);

  const safe = React.useMemo(
    () => (Array.isArray(fieldResults) ? fieldResults : []),
    [fieldResults],
  );

  // Ambil label dari bidang
  const metrics = React.useMemo(() => {
    return safe.map((r) => r.bidang?.nama_bidang ?? "Bidang");
  }, [safe]);

  // Nilai: pakai persentase (0-100 biasanya)
  const values = React.useMemo(() => {
    return safe.map((r) => Number(r.persentase ?? 0));
  }, [safe]);

  // Tentukan max radar
  const computedMax = React.useMemo(() => {
    if (typeof max === "number") return max;

    // kalau persentase, aman pakai 100, tapi kalau ada 100.00 / 120, ambil sedikit di atas nilai tertinggi
    const top = Math.max(0, ...values);
    if (top <= 100) return 100;
    return Math.ceil(top / 10) * 10; // bulatkan ke puluhan
  }, [max, values]);

  const series = React.useMemo(() => {
    const base: RadarSeries = {
      label: "Skor (%)",
      data: values,
      hideMark,
      fillArea,
    };
    return [base];
  }, [values, hideMark, fillArea]);

  // kalau metrics kosong, jangan render chart
  if (metrics.length === 0) {
    return (
      <div className="h-[300px] flex items-center justify-center text-gray-400">
        Data bidang belum tersedia.
      </div>
    );
  }

  return (
    <Box sx={{ width: "100%" }}>
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
            />
          }
          label="With Mark"
          labelPlacement="end"
        />
        <FormControlLabel
          checked={fillArea}
          control={
            <Checkbox onChange={(event) => setFillArea(event.target.checked)} />
          }
          label="Fill Area"
          labelPlacement="end"
        />
      </Stack>

      <Box sx={{ width: "100%" }}>
        <RadarChart
          height={300}
          radar={{
            max: computedMax,
            metrics,
          }}
          series={series}
        />
      </Box>
    </Box>
  );
};

export default RadarBidangChart;
