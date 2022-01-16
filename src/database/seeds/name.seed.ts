import { getRepository } from "typeorm";
import { Language } from "../../app/entities/Language";

const repo = getRepository("languages");
const portugueseLanguage: any = repo.findOne({ name: "portuguese" });
const PORTUGUESE_ID = portugueseLanguage.id;
const englishLanguage: any = repo.findOne({ name: "english" });
const ENGLISH_ID = englishLanguage.id;

export const NameSeedPortuguese = [
  {
    name: "GESTÃO",
    language_id: PORTUGUESE_ID,
  },
  {
    name: "REGULAMENTAÇÃO DE PROTEÇÃO E SEGURANÇA RADIOLÓGICAS",
    language_id: PORTUGUESE_ID,
  },
  {
    name: "PROTEÇÃO RADIOLÓGICA DOS PACIENTES",
    language_id: PORTUGUESE_ID,
  },
  {
    name: "AVALIAÇÃO DO PROGRAMA DE GARANTIA DA QUALIDADE",
    language_id: PORTUGUESE_ID,
  },
  {
    name: "CONTROLE DE QUALIDADE DOS EQUIPAMENTOS DE IMAGEM",
    language_id: PORTUGUESE_ID,
  },
  {
    name: "SISTEMA DE IMAGEM E ESTAÇÕES DE TRABALHO",
    language_id: PORTUGUESE_ID,
  },
  {
    name: "SERVIÇOS DE DIAGNÓSTICO CLÍNICO",
    language_id: PORTUGUESE_ID,
  },
  {
    name: "AVALIAÇÃO DE PROCEDIMENTO DE CINTILOGRAFIA",
    language_id: PORTUGUESE_ID,
  },
  {
    name: "TERAPIA COM RADIONUCLÍDEOS",
    language_id: PORTUGUESE_ID,
  },
  {
    name: "AVALIAÇÃO DAS TERAPIAS",
    language_id: PORTUGUESE_ID,
  },
  {
    name: "RADIOFARMÁCIA - NÍVEL 1",
    language_id: PORTUGUESE_ID,
  },
  {
    name: "RADIOFARMÁCIA - NÍVEL 2",
    language_id: PORTUGUESE_ID,
  },
  {
    name: "RADIOFARMÁCIA - NÍVEL 3",
    language_id: PORTUGUESE_ID,
  },
  {
    name: "HORMÔNIOS E MARCADORES TUMORAIS",
    language_id: PORTUGUESE_ID,
  },
];

export const NameSeedEnglish = [
  {
    name: "MANAGEMENT",
    language_id: ENGLISH_ID,
  },
  {
    name: "RADIATION REGULATIONS AND SAFETY",
    language_id: ENGLISH_ID,
  },
  {
    name: "PATIENT RADIATION PROTECTION",
    language_id: ENGLISH_ID,
  },
  {
    name: "EVALUATION OF QUALITY SYSTEM",
    language_id: ENGLISH_ID,
  },
  {
    name: "QUALITY CONTROL OF EQUIPMENT",
    language_id: ENGLISH_ID,
  },
  {
    name: "COMPUTER SYSTEMS AND DATA HANDLING",
    language_id: ENGLISH_ID,
  },
  {
    name: "DIAGNOSTIC CLINICAL SERVICES",
    language_id: ENGLISH_ID,
  },
  {
    name: "ASSESSMENT OF IMAGING DIAGNOSTIC PROCEDURE",
    language_id: ENGLISH_ID,
  },
  {
    name: "RADIONUCLIDE THERAPY",
    language_id: ENGLISH_ID,
  },
  {
    name: "ASSESSMENT OF THERAPY",
    language_id: ENGLISH_ID,
  },
  {
    name: "RADIOPHARMACY OPERATIONAL LEVEL 1",
    language_id: ENGLISH_ID,
  },
  {
    name: "RADIOPHARMACY OPERATIONAL LEVEL 2",
    language_id: ENGLISH_ID,
  },
  {
    name: "RADIOPHARMACY OPERATIONAL LEVEL 3",
    language_id: ENGLISH_ID,
  },
  {
    name: "HORMONES AND TUMOUR MARKERS",
    language_id: ENGLISH_ID,
  },
];
