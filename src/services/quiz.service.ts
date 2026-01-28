/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  AbandonQuizResponse,
  FieldResultDTO,
  GetActiveQuizResponse,
  GetMyQuizHistoryResponseDTO,
  GetQuestionsResponse,
  GetResultBackendResponse,
  StartQuizResponse,
} from "@/utils/interface";
import api from "./api";

export const startQuizService = async (
  quiz_id: string,
): Promise<StartQuizResponse> => {
  // kalau backend kamu start-nya v2, ganti ke /api/v2/v2/quiz/...
  const res = await api.post(`/api/v2/quiz/${quiz_id}/start`);
  return res.data;
};

export const getActiveQuizService = async (): Promise<GetActiveQuizResponse> => {
  const res = await api.get("/api/v2/quiz/active");
  return res.data;
};

export const getQuestionsByTypeService = async (
  quiz_id: string,
  tipe: "BIDANG" | "TIE_BREAKER",
): Promise<GetQuestionsResponse> => {
  const res = await api.get(`/api/v2/quiz/${quiz_id}/questions/type`, {
    params: { tipe },
  });
  return res.data;
};

export type SubmitAnswerPayload = {
  pertanyaan_id: string;
  jawaban_id: string;
};

export type SubmitAnswerResponse = {
  success: boolean;
  message: string;
  data?: any;
};

export const submitAnswerService = async (
  riwayat_id: string,
  payload: SubmitAnswerPayload,
): Promise<SubmitAnswerResponse> => {
  const res = await api.post(`/api/v2/quiz/history/${riwayat_id}/answer`, payload);
  return res.data;
};

// ✅ NEW: calculate v2
export type CalculateQuizResponse = {
  success: boolean;
  message: string;
  data?: any;
};

export const calculateQuizService = async (
  riwayat_id: string,
): Promise<CalculateQuizResponse> => {
  const res = await api.post(`/api/v2/quiz/history/${riwayat_id}/calculate`);
  return res.data;
};

// ✅ NEW: complete v2
export type CompleteQuizV2Response = {
  success: boolean;
  message: string;
  data?: any;
};

export const completeQuizV2Service = async (
  riwayat_id: string,
): Promise<CompleteQuizV2Response> => {
  const res = await api.put(`/api/v2/quiz/history/${riwayat_id}/complete`);
  return res.data;
};

// ✅ FIX: results v2 (yang ada field_results, recommended_majors, recommended_campuses)
export const getResultService = async (
  riwayat_id: string,
): Promise<GetResultBackendResponse> => {
  const res = await api.get(`/api/v2/quiz/history/${riwayat_id}/results`);
  return res.data;
};

/** helper: cek tie berdasarkan winners */
export const isTieFromFieldResults = (fieldResults: FieldResultDTO[]) => {
  const winners = (fieldResults || []).filter((r) => r.is_winner);
  return {
    winners,
    isTie: winners.length > 1,
  };
};

export const getMyQuizHistoryService = async (): Promise<GetMyQuizHistoryResponseDTO> => {
  const res = await api.get("/api/v2/quiz/history/me");
  return res.data;
};

export const abandonQuizService = async (
  riwayat_id: string,
): Promise<AbandonQuizResponse> => {
  const res = await api.put(`/api/v2/quiz/history/${riwayat_id}/abandon`);
  return res.data;
};