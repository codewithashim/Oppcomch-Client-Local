import { useState, useEffect } from 'react';
import axios from 'axios';
import { endpoints } from 'utils/urls/additionalDataUrl';

export const callApi = async (endpointName, method = 'get', payload = null) => {
  const endpoint = endpoints[endpointName];
  if (!endpoint) {
    throw new Error(`Endpoint '${endpointName}' not found`);
  }

  try {
    let response;
    const config = {
      method,
      url: method === 'get' ? endpoint.get : endpoint.create,
      data: payload,
    };

    if (method === 'get') {
      response = await axios.get(config.url);
    } else if (method === 'post') {
      response = await axios.post(config.url, payload);
    } else if (method === 'patch') {
      response = await axios.patch(
        endpoint.updateById(payload.id),
        payload.data,
      );
    } else if (method === 'delete') {
      response = await axios.delete(endpoint.deleteById(payload.id));
    } else {
      throw new Error(`Unsupported method '${method}'`);
    }

    return response?.data?.data;
  } catch (error) {
    throw new Error(
      `Error fetching data from '${endpointName}': ${error.message}`,
    );
  }
};
 
const useAdditionalData = () => {
  const [chiefComplaints, setChiefComplaints] = useState([]);
  const [pastIllnessData, setPastIllnessData] = useState([]);
  const [personalHistoryData, setPersonalHistoryData] = useState([]);
  const [clinicalExaminationName, setClinicalExaminationName] = useState([]);
  const [clinicalExaminationFindings, setClinicalExaminationFindings] =
    useState([]);
  const [cardiovascularSystemName, setCardiovascularSystemName] = useState([]);
  const [cardiovascularSystemFindings, setCardiovascularSystemFindings] =
    useState([]);
  const [respiratorySystemName, setRespiratorySystemName] = useState([]);
  const [respiratorySystemFindings, setRespiratorySystemFindings] = useState(
    [],
  );
  const [abdomenName, setAbdomenName] = useState([]);
  const [abdomenFindings, setAbdomenFindings] = useState([]);
  const [neurologicalExaminationName, setNeurologicalExaminationName] =
    useState([]);
  const [neurologicalExaminationFindings, setNeurologicalExaminationFindings] =
    useState([]);
  const [locomotorSystemName, setLocomotorSystemName] = useState([]);
  const [locomotorSystemFindings, setLocomotorSystemFindings] = useState([]);
  const [thyroidGlandName, setThyroidGlandName] = useState([]);
  const [thyroidGlandFindings, setThyroidGlandFindings] = useState([]);
  const [otherExaminationName, setOtherExaminationName] = useState([]);
  const [otherExaminationFindings, setOtherExaminationFindings] = useState([]);
  const [nameOfInvestigations, setNameOfInvestigations] = useState([]);
  const [findingsOfInvestigations, setFindingsOfInvestigations] = useState([]);
  const [comorbiditiesDiagnosisData, setComorbiditiesDiagnosisData] = useState(
    [],
  );
  const [managementOutcomeData, setManagementOutcomeData] = useState([]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const chiefComplaintsData = await callApi('chiefComplaints', 'get');
        setChiefComplaints(chiefComplaintsData);

        const pastIllnessData = await callApi('pastIllnessData', 'get');
        setPastIllnessData(pastIllnessData);

        const personalHistoryData = await callApi('personalHistoryData', 'get');
        setPersonalHistoryData(personalHistoryData);

        const clinicalExaminationNameData = await callApi(
          'clinicalExaminationName',
          'get',
        );
        setClinicalExaminationName(clinicalExaminationNameData);

        const clinicalExaminationFindingsData = await callApi(
          'clinicalExaminationFindings',
          'get',
        );
        setClinicalExaminationFindings(clinicalExaminationFindingsData);

        const cardiovascularSystemNameData = await callApi(
          'cardiovascularSystemName',
          'get',
        );
        setCardiovascularSystemName(cardiovascularSystemNameData);

        const cardiovascularSystemFindingsData = await callApi(
          'cardiovascularSystemFindings',
          'get',
        );
        setCardiovascularSystemFindings(cardiovascularSystemFindingsData);

        const respiratorySystemNameData = await callApi(
          'respiratorySystemName',
          'get',
        );
        setRespiratorySystemName(respiratorySystemNameData);

        const respiratorySystemFindingsData = await callApi(
          'respiratorySystemFindings',
          'get',
        );
        setRespiratorySystemFindings(respiratorySystemFindingsData);

        const abdomenNameData = await callApi('abdomenName', 'get');
        setAbdomenName(abdomenNameData);

        const abdomenFindingsData = await callApi('abdomenFindings', 'get');
        setAbdomenFindings(abdomenFindingsData);

        const neurologicalExaminationNameData = await callApi(
          'neurologicalExaminationName',
          'get',
        );
        setNeurologicalExaminationName(neurologicalExaminationNameData);

        const neurologicalExaminationFindingsData = await callApi(
          'neurologicalExaminationFindings',
          'get',
        );
        setNeurologicalExaminationFindings(neurologicalExaminationFindingsData);

        const locomotorSystemNameData = await callApi(
          'locomotorSystemName',
          'get',
        );
        setLocomotorSystemName(locomotorSystemNameData);

        const locomotorSystemFindingsData = await callApi(
          'locomotorSystemFindings',
          'get',
        );
        setLocomotorSystemFindings(locomotorSystemFindingsData);

        const thyroidGlandNameData = await callApi('thyroidGlandName', 'get');
        setThyroidGlandName(thyroidGlandNameData);

        const thyroidGlandFindingsData = await callApi(
          'thyroidGlandFindings',
          'get',
        );
        setThyroidGlandFindings(thyroidGlandFindingsData);

        const otherExaminationNameData = await callApi(
          'otherExaminationName',
          'get',
        );
        setOtherExaminationName(otherExaminationNameData);

        const otherExaminationFindingsData = await callApi(
          'otherExaminationFindings',
          'get',
        );
        setOtherExaminationFindings(otherExaminationFindingsData);

        const nameOfInvestigationsData = await callApi(
          'nameOfInvestigations',
          'get',
        );
        setNameOfInvestigations(nameOfInvestigationsData);

        const findingsOfInvestigationsData = await callApi(
          'findingsOfInvestigations',
          'get',
        );
        setFindingsOfInvestigations(findingsOfInvestigationsData);

        const comorbiditiesDiagnosisDataData = await callApi(
          'comorbiditiesDiagnosisData',
          'get',
        );
        setComorbiditiesDiagnosisData(comorbiditiesDiagnosisDataData);

        const managementOutcomeDataData = await callApi(
          'managementOutcomeData',
          'get',
        );
        setManagementOutcomeData(managementOutcomeDataData);
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    };

    fetchInitialData();
  }, []);

  return {
    chiefComplaints,
    setChiefComplaints,

    pastIllnessData,
    setPastIllnessData,
    
    personalHistoryData,
    setPersonalHistoryData,
    
    clinicalExaminationName,
    setClinicalExaminationName,
    
    clinicalExaminationFindings,
    setClinicalExaminationFindings,
    
    cardiovascularSystemName,
    setCardiovascularSystemName,
    
    cardiovascularSystemFindings,
    setCardiovascularSystemFindings,
    
    respiratorySystemName,
    setRespiratorySystemName,
    
    respiratorySystemFindings,
    setRespiratorySystemFindings,
    
    abdomenName,
    setAbdomenName,
    
    abdomenFindings,
    setAbdomenFindings,
    
    neurologicalExaminationName,
    setNeurologicalExaminationName,
    
    neurologicalExaminationFindings,
    setNeurologicalExaminationFindings,
    
    locomotorSystemName,
    setLocomotorSystemName,
    
    locomotorSystemFindings,
    setLocomotorSystemFindings,
    
    thyroidGlandName,
    setThyroidGlandName,
    
    thyroidGlandFindings,
    setThyroidGlandFindings,
    
    otherExaminationName,
    setOtherExaminationName,
    
    otherExaminationFindings,
    setOtherExaminationFindings,
    
    nameOfInvestigations,
    setNameOfInvestigations,
    
    findingsOfInvestigations,
    setFindingsOfInvestigations,
    
    comorbiditiesDiagnosisData,
    setComorbiditiesDiagnosisData,
    
    managementOutcomeData,
    setManagementOutcomeData,
  };
};

export default useAdditionalData;
