import { PDFDownloadLink } from "@react-pdf/renderer";
import { useEffect, useRef } from "react";
import ResultPDF from "@/pages/HasilAkhir/components/ResultPDF";

const HiddenPDFDownloader = ({ data, onDone }: any) => {
  const btnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      btnRef.current?.click();
      onDone?.();
    }, 300);

    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div style={{ display: "none" }}>
      <PDFDownloadLink
        document={
          <ResultPDF
            title={data.quiz?.nama_quiz ?? "Hasil Tes"}
            description={[]}
            meta={{
              riwayat_id: data.riwayat_id,
              quizName: data.quiz?.nama_quiz,
              status: data.status_quiz,
              tanggal_mulai: data.tanggal_mulai,
              tanggal_selesai: data.tanggal_selesai,
            }}
            fieldResults={data.hasilBidang ?? []}
            majors={data.hasilJurusan ?? []}
            campuses={data.hasilKampus ?? []}
          />
        }
        fileName={`hasil-tes-${data.riwayat_id}.pdf`}
      >
        {({ loading }) => (
          <button ref={btnRef} disabled={loading} />
        )}
      </PDFDownloadLink>
    </div>
  );
};

export default HiddenPDFDownloader;
