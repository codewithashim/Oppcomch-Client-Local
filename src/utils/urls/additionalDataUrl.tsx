import { BASE_URL } from "utils/network/network";

export const endpoints = {
    chiefComplaints: {
      create: `${BASE_URL}/additional-data/chiefComplaints/create`,
      get: `${BASE_URL}/additional-data/chiefComplaints/`,
      getById: (id) => `${BASE_URL}/additional-data/chiefComplaints/${id}`,
      updateById: (id) => `${BASE_URL}/additional-data/chiefComplaints/${id}`,
      deleteById: (id) => `${BASE_URL}/additional-data/chiefComplaints/${id}`,
    },
    pastIllnessData: {
      create: `${BASE_URL}/additional-data/pastIllnessData/create`,
      get: `${BASE_URL}/additional-data/pastIllnessData/`,
      getById: (id) => `${BASE_URL}/additional-data/pastIllnessData/${id}`,
      updateById: (id) => `${BASE_URL}/additional-data/pastIllnessData/${id}`,
      deleteById: (id) => `${BASE_URL}/additional-data/pastIllnessData/${id}`,
    },
    personalHistoryData: {
      create: `${BASE_URL}/additional-data/personalHistoryData/create`,
      get: `${BASE_URL}/additional-data/personalHistoryData/`,
      getById: (id) => `${BASE_URL}/additional-data/personalHistoryData/${id}`,
      updateById: (id) =>
        `${BASE_URL}/additional-data/personalHistoryData/${id}`,
      deleteById: (id) =>
        `${BASE_URL}/additional-data/personalHistoryData/${id}`,
    },
    clinicalExaminationName: {
      create: `${BASE_URL}/additional-data/clinicalExaminationName/create`,
      get: `${BASE_URL}/additional-data/clinicalExaminationName/`,
      getById: (id) =>
        `${BASE_URL}/additional-data/clinicalExaminationName/${id}`,
      updateById: (id) =>
        `${BASE_URL}/additional-data/clinicalExaminationName/${id}`,
      deleteById: (id) =>
        `${BASE_URL}/additional-data/clinicalExaminationName/${id}`,
    },
    clinicalExaminationFindings: {
      create: `${BASE_URL}/additional-data/clinicalExaminationFindings/create`,
      get: `${BASE_URL}/additional-data/clinicalExaminationFindings/`,
      getById: (id) =>
        `${BASE_URL}/additional-data/clinicalExaminationFindings/${id}`,
      updateById: (id) =>
        `${BASE_URL}/additional-data/clinicalExaminationFindings/${id}`,
      deleteById: (id) =>
        `${BASE_URL}/additional-data/clinicalExaminationFindings/${id}`,
    },
    cardiovascularSystemName: {
      create: `${BASE_URL}/additional-data/cardiovascularSystemName/create`,
      get: `${BASE_URL}/additional-data/cardiovascularSystemName/`,
      getById: (id) =>
        `${BASE_URL}/additional-data/cardiovascularSystemName/${id}`,
      updateById: (id) =>
        `${BASE_URL}/additional-data/cardiovascularSystemName/${id}`,
      deleteById: (id) =>
        `${BASE_URL}/additional-data/cardiovascularSystemName/${id}`,
    },
    cardiovascularSystemFindings: {
      create: `${BASE_URL}/additional-data/cardiovascularSystemFindings/create`,
      get: `${BASE_URL}/additional-data/cardiovascularSystemFindings/`,
      getById: (id) =>
        `${BASE_URL}/additional-data/cardiovascularSystemFindings/${id}`,
      updateById: (id) =>
        `${BASE_URL}/additional-data/cardiovascularSystemFindings/${id}`,
      deleteById: (id) =>
        `${BASE_URL}/additional-data/cardiovascularSystemFindings/${id}`,
    },
    respiratorySystemName: {
      create: `${BASE_URL}/additional-data/respiratorySystemName/create`,
      get: `${BASE_URL}/additional-data/respiratorySystemName/`,
      getById: (id) =>
        `${BASE_URL}/additional-data/respiratorySystemName/${id}`,
      updateById: (id) =>
        `${BASE_URL}/additional-data/respiratorySystemName/${id}`,
      deleteById: (id) =>
        `${BASE_URL}/additional-data/respiratorySystemName/${id}`,
    },
    respiratorySystemFindings: {
      create: `${BASE_URL}/additional-data/respiratorySystemFindings/create`,
      get: `${BASE_URL}/additional-data/respiratorySystemFindings/`,
      getById: (id) =>
        `${BASE_URL}/additional-data/respiratorySystemFindings/${id}`,
      updateById: (id) =>
        `${BASE_URL}/additional-data/respiratorySystemFindings/${id}`,
      deleteById: (id) =>
        `${BASE_URL}/additional-data/respiratorySystemFindings/${id}`,
    },
    abdomenName: {
      create: `${BASE_URL}/additional-data/abdomenName/create`,
      get: `${BASE_URL}/additional-data/abdomenName/`,
      getById: (id) => `${BASE_URL}/additional-data/abdomenName/${id}`,
      updateById: (id) => `${BASE_URL}/additional-data/abdomenName/${id}`,
      deleteById: (id) => `${BASE_URL}/additional-data/abdomenName/${id}`,
    },
    abdomenFindings: {
      create: `${BASE_URL}/additional-data/abdomenFindings/create`,
      get: `${BASE_URL}/additional-data/abdomenFindings/`,
      getById: (id) => `${BASE_URL}/additional-data/abdomenFindings/${id}`,
      updateById: (id) => `${BASE_URL}/additional-data/abdomenFindings/${id}`,
      deleteById: (id) => `${BASE_URL}/additional-data/abdomenFindings/${id}`,
    },
    neurologicalExaminationName: {
      create: `${BASE_URL}/additional-data/neurologicalExaminationName/create`,
      get: `${BASE_URL}/additional-data/neurologicalExaminationName/`,
      getById: (id) =>
        `${BASE_URL}/additional-data/neurologicalExaminationName/${id}`,
      updateById: (id) =>
        `${BASE_URL}/additional-data/neurologicalExaminationName/${id}`,
      deleteById: (id) =>
        `${BASE_URL}/additional-data/neurologicalExaminationName/${id}`,
    },
    neurologicalExaminationFindings: {
      create: `${BASE_URL}/additional-data/neurologicalExaminationFindings/create`,
      get: `${BASE_URL}/additional-data/neurologicalExaminationFindings/`,
      getById: (id) =>
        `${BASE_URL}/additional-data/neurologicalExaminationFindings/${id}`,
      updateById: (id) =>
        `${BASE_URL}/additional-data/neurologicalExaminationFindings/${id}`,
      deleteById: (id) =>
        `${BASE_URL}/additional-data/neurologicalExaminationFindings/${id}`,
    },
    locomotorSystemName: {
      create: `${BASE_URL}/additional-data/locomotorSystemName/create`,
      get: `${BASE_URL}/additional-data/locomotorSystemName/`,
      getById: (id) => `${BASE_URL}/additional-data/locomotorSystemName/${id}`,
      updateById: (id) =>
        `${BASE_URL}/additional-data/locomotorSystemName/${id}`,
      deleteById: (id) =>
        `${BASE_URL}/additional-data/locomotorSystemName/${id}`,
    },
    locomotorSystemFindings: {
      create: `${BASE_URL}/additional-data/locomotorSystemFindings/create`,
      get: `${BASE_URL}/additional-data/locomotorSystemFindings/`,
      getById: (id) =>
        `${BASE_URL}/additional-data/locomotorSystemFindings/${id}`,
      updateById: (id) =>
        `${BASE_URL}/additional-data/locomotorSystemFindings/${id}`,
      deleteById: (id) =>
        `${BASE_URL}/additional-data/locomotorSystemFindings/${id}`,
    },
    thyroidGlandName: {
      create: `${BASE_URL}/additional-data/thyroidGlandName/create`,
      get: `${BASE_URL}/additional-data/thyroidGlandName/`,
      getById: (id) => `${BASE_URL}/additional-data/thyroidGlandName/${id}`,
      updateById: (id) => `${BASE_URL}/additional-data/thyroidGlandName/${id}`,
      deleteById: (id) => `${BASE_URL}/additional-data/thyroidGlandName/${id}`,
    },
    thyroidGlandFindings: {
      create: `${BASE_URL}/additional-data/thyroidGlandFindings/create`,
      get: `${BASE_URL}/additional-data/thyroidGlandFindings/`,
      getById: (id) => `${BASE_URL}/additional-data/thyroidGlandFindings/${id}`,
      updateById: (id) =>
        `${BASE_URL}/additional-data/thyroidGlandFindings/${id}`,
      deleteById: (id) =>
        `${BASE_URL}/additional-data/thyroidGlandFindings/${id}`,
    },
    otherExaminationName: {
      create: `${BASE_URL}/additional-data/otherExaminationName/create`,
      get: `${BASE_URL}/additional-data/otherExaminationName/`,
      getById: (id) => `${BASE_URL}/additional-data/otherExaminationName/${id}`,
      updateById: (id) =>
        `${BASE_URL}/additional-data/otherExaminationName/${id}`,
      deleteById: (id) =>
        `${BASE_URL}/additional-data/otherExaminationName/${id}`,
    },
    otherExaminationFindings: {
      create: `${BASE_URL}/additional-data/otherExaminationFindings/create`,
      get: `${BASE_URL}/additional-data/otherExaminationFindings/`,
      getById: (id) =>
        `${BASE_URL}/additional-data/otherExaminationFindings/${id}`,
      updateById: (id) =>
        `${BASE_URL}/additional-data/otherExaminationFindings/${id}`,
      deleteById: (id) =>
        `${BASE_URL}/additional-data/otherExaminationFindings/${id}`,
    },
    nameOfInvestigations: {
      create: `${BASE_URL}/additional-data/nameOfInvestigations/create`,
      get: `${BASE_URL}/additional-data/nameOfInvestigations/`,
      getById: (id) => `${BASE_URL}/additional-data/nameOfInvestigations/${id}`,
      updateById: (id) =>
        `${BASE_URL}/additional-data/nameOfInvestigations/${id}`,
      deleteById: (id) =>
        `${BASE_URL}/additional-data/nameOfInvestigations/${id}`,
    },
    findingsOfInvestigations: {
      create: `${BASE_URL}/additional-data/findingsInvestigations/create`,
      get: `${BASE_URL}/additional-data/findingsInvestigations/`,
      getById: (id) =>
        `${BASE_URL}/additional-data/findingsInvestigations/${id}`,
      updateById: (id) =>
        `${BASE_URL}/additional-data/findingsInvestigations/${id}`,
      deleteById: (id) =>
        `${BASE_URL}/additional-data/findingsInvestigations/${id}`,
    },
    comorbiditiesDiagnosisData: {
      create: `${BASE_URL}/additional-data/comorbiditiesDiagnosisData/create`,
      get: `${BASE_URL}/additional-data/comorbiditiesDiagnosisData/`,
      getById: (id) =>
        `${BASE_URL}/additional-data/comorbiditiesDiagnosisData/${id}`,
      updateById: (id) =>
        `${BASE_URL}/additional-data/comorbiditiesDiagnosisData/${id}`,
      deleteById: (id) =>
        `${BASE_URL}/additional-data/comorbiditiesDiagnosisData/${id}`,
    },
    managementOutcomeData: {
      create: `${BASE_URL}/additional-data/managementOutcomeData/create`,
      get: `${BASE_URL}/additional-data/managementOutcomeData/`,
      getById: (id) =>
        `${BASE_URL}/additional-data/managementOutcomeData/${id}`,
      updateById: (id) =>
        `${BASE_URL}/additional-data/managementOutcomeData/${id}`,
      deleteById: (id) =>
        `${BASE_URL}/additional-data/managementOutcomeData/${id}`,
    },
  };
  