import React from 'react';
import ChiefComplaint from '../ChiefComplaint/ChiefComplaint';
import PastIllnessData from '../PastIllnessData/PastIllnessData';
import PersonalHistoryData from '../PersonalHistoryData/PersonalHistoryData';
import ClinicalExaminationName from '../ClinicalExaminationName/ClinicalExaminationName';
import ClinicalExaminationFindings from '../ClinicalExaminationFindings/ClinicalExaminationFindings';
import CardiovascularSystemName from '../CardiovascularSystemName/CardiovascularSystemName';
import CardiovascularSystemFindings from '../CardiovascularSystemFindings/CardiovascularSystemFindings';
import RespiratorySystemFindings from '../RespiratorySystemFindings/RespiratorySystemFindings';
import RespiratorySystemName from '../RespiratorySystemName/RespiratorySystemName';
import AbdomenName from '../AbdomenName/AbdomenName';
import AbdomenFindings from '../AbdomenFindings/AbdomenFindings';
import NeurologicalExaminationName from '../NeurologicalExaminationName/NeurologicalExaminationName';
import NeurologicalExaminationFindings from '../NeurologicalExaminationFindings/NeurologicalExaminationFindings';
import LocomotorSystemFindings from '../LocomotorSystemFindings/LocomotorSystemFindings';
import LocomotorSystemName from '../LocomotorSystemName/LocomotorSystemName';
import ThyroidGlandName from '../ThyroidGlandName/ThyroidGlandName';
import ThyroidGlandFindings from '../ThyroidGlandFindings/ThyroidGlandFindings';
import OtherExaminationName from '../OtherExaminationName/OtherExaminationName';
import OtherExaminationFindings from '../OtherExaminationFindings/OtherExaminationFindings';
import NameOfInvestigations from '../NameOfInvestigations/NameOfInvestigations';
import FindingsOfInvestigations from '../FindingsOfInvestigations/FindingsOfInvestigations';
import ComorbiditiesDiagnosisData from '../ComorbiditiesDiagnosisData/ComorbiditiesDiagnosisData';
import ManagementOutcomeData from '../ManagementOutcomeData/ManagementOutcomeData'
const AdditionalData = () => {

  return (
    <section className='flex w-[80%] mx-auto flex-col gap-6'>
      <ChiefComplaint/>
      <PastIllnessData/>
      <PersonalHistoryData/>
      <ClinicalExaminationName/>
      <ClinicalExaminationFindings/>
      <CardiovascularSystemName/>
      <CardiovascularSystemFindings/>
      <RespiratorySystemName/>
      <RespiratorySystemFindings/>
      <AbdomenName/>
      <AbdomenFindings/>
      <NeurologicalExaminationName/>
      <NeurologicalExaminationFindings/>
      <LocomotorSystemName/>
      <LocomotorSystemFindings/>
      <ThyroidGlandName/>
      <ThyroidGlandFindings/>
      <OtherExaminationName/>
      <OtherExaminationFindings/>
      <NameOfInvestigations/>
      <FindingsOfInvestigations/>
      <ComorbiditiesDiagnosisData/>
      <ManagementOutcomeData/>
    </section>
  );
};

export default AdditionalData;
