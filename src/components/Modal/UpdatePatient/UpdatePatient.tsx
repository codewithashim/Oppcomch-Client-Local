/* eslint-disable react/jsx-key */
import {
  Button,
  Input,
  Space,
  Table,
  Form,
  Select,
  Modal,
  message,
  Collapse,
  Row,
  Col,
} from 'antd';
import usePatient from 'hooks/usePatient';
import React, { useEffect, useState } from 'react';

const { Panel } = Collapse;

const { TextArea } = Input;

const UpdatePatient = ({ isModalVisible, handleCancel, editingPatient }) => {
  const { handelUpdatePatinet } = usePatient();
  const [formData, setFormData] = useState({
    patientInformation: {
      name: '',
      maritalStatus: '',
      registrationNo: '',
      occupation: '',
      age: '',
      sex: '',
      division: '',
      district: '',
      phoneNumber: '',
      admissionUnit: '',
      addressDetails: '',
      admissionDate: '',
      releaseDate: '',
      hospitalStay: '',
    },
    aboutIllness: {
      historyOfPastIllness: [],
      personalHistory: [],
      treatmentHistory: [],
      historyOfPresentIllness: '',
      others: '',
    },
    generalExamination: {
      vitalSigns: [],
      clinicalExamination: [],
    },
    systemicExamination: {
      cardiovascularSystem: [],
      respiratorySystem: [],
      abdomen: [],
      neurologicalExamination: [],
      locomotorSystem: [],
      thyroidGland: [],
      otherExamination: [],
    },
    investigations: {
      procedureStudy: {
        echocardiogram: [],
        pluralFluidStudy: [],
        csfStudy: [],
        asciticFluidStudy: [],
        synovialFluidStudy: [],
      },
      CBC: [],
      urineRME: [],
      serumElectrolyte: [],
      otherInvestigations: [],
    },
    management: {
      management: [],
      outcome: '',
    },
    chiefComplaints: [
      {
        complaints: '',
        duration: '',
      },
    ],
    diagnosis: [],
  });
  useEffect(() => {
    if (editingPatient) {
      setFormData(prevData => ({
        ...prevData,
        ...editingPatient,
        patientInformation: {
          ...prevData.patientInformation,
          ...editingPatient.patientInformation,
        },
        aboutIllness: {
          ...prevData.aboutIllness,
          ...editingPatient.aboutIllness,
        },
        generalExamination: {
          ...prevData.generalExamination,
          ...editingPatient.generalExamination,
        },
        systemicExamination: {
          ...prevData.systemicExamination,
          ...editingPatient.systemicExamination,
        },
        investigations: {
          ...prevData.investigations,
          ...editingPatient.investigations,
        },
        management: {
          ...prevData.management,
          ...editingPatient.management,
        },
        chiefComplaints: Array.isArray(editingPatient.chiefComplaints)
          ? editingPatient.chiefComplaints
          : [{ complaints: '', duration: '' }],
        diagnosis: Array.isArray(editingPatient.diagnosis)
          ? editingPatient.diagnosis
          : [],
      }));
    }
  }, [editingPatient]);

  const addChiefComplaint = () => {
    setFormData(prevData => ({
      ...prevData,
      chiefComplaints: [
        ...(Array.isArray(prevData.chiefComplaints) ? prevData.chiefComplaints : []),
        { complaints: '', duration: '' }
      ]
    }));
  };

  const addHistoryOfPastIllness = () => {
    setFormData(prevData => ({
      ...prevData,
      aboutIllness: {
        ...prevData.aboutIllness,
        historyOfPastIllness: [
          ...(prevData.aboutIllness.historyOfPastIllness || []),
          { historyOfPastIllness: '', duration: '' }
        ]
      }
    }));
  };

  const addPersonalHistory = () => {
    setFormData(prevData => ({
      ...prevData,
      aboutIllness: {
        ...prevData.aboutIllness,
        personalHistory: [
          ...(prevData.aboutIllness.personalHistory || []),
          { personalHistory: '', duration: '' }
        ]
      }
    }));
  };

  const addTreatmentHistory = () => {
    setFormData(prevData => ({
      ...prevData,
      aboutIllness: {
        ...prevData.aboutIllness,
        treatmentHistory: [
          ...(prevData.aboutIllness.treatmentHistory || []),
          { drugsName: '', duration: '' }
        ]
      }
    }));
  };


  const addVitalSign = () => {
    setFormData(prevData => ({
      ...prevData,
      generalExamination: {
        ...prevData.generalExamination,
        vitalSigns: [
          ...(prevData.generalExamination.vitalSigns || []),
          { tempFahrenheit: '', pulsePerMin: '', respiratoryRatePerMin: '', bloodPressure: '', spo2: '' }
        ]
      }
    }));
  };

  const addClinicalExamination = () => {
    setFormData(prevData => ({
      ...prevData,
      generalExamination: {
        ...prevData.generalExamination,
        clinicalExamination: [
          ...(prevData.generalExamination.clinicalExamination || []),
          { name: '', findings: '', comments: '' }
        ]
      }
    }));
  };


  const addSystemicExamination = (system) => {
    setFormData(prevData => ({
      ...prevData,
      systemicExamination: {
        ...prevData.systemicExamination,
        [system]: [
          ...(prevData.systemicExamination[system] || []),
          { name: '', findings: '', comments: '' }
        ]
      }
    }));
  };

  const addDiagnosis = () => {
    setFormData(prevData => ({
      ...prevData,
      diagnosis: [
        ...(prevData.diagnosis || []),
        { mainDiagnosis: '', comorbidities: '' }
      ]
    }));
  };




  function convertIsoToNormalDate(isoDateStr) {
    const date = new Date(isoDateStr);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    const normalDateStr = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return normalDateStr;
  }

  const handleInputChange = (
    e,
    field,
    category,
    subCategory = null,
    index = null,
    isFormData = false // Added to signify if it's part of formData
  ) => {
    setFormData(prevData => {
      const updatedFormData = { ...prevData };

      if (category === 'chiefComplaints') {
        updatedFormData.chiefComplaints = updatedFormData.chiefComplaints.map((item, i) =>
          i === index ? { ...item, [field]: e.target.value } : item
        );
      } else if ((category === 'aboutIllness' || category === 'generalExamination') && subCategory) {
        updatedFormData[category][subCategory] = updatedFormData[category][subCategory].map((item, i) =>
          i === index ? { ...item, [field]: e.target.value } : item
        );
      } else if (subCategory !== null) {
        if (index !== null) {
          // Adjust for diagnosis structure
          updatedFormData[category][subCategory][index] = {
            ...updatedFormData[category][subCategory][index],
            [field]: e.target.value,
          };
        } else {
          updatedFormData[category][subCategory] = {
            ...updatedFormData[category][subCategory],
            [field]: e.target.value,
          };
        }
      } else if (category === 'diagnosis') { // Adjust for diagnosis category
        if (index !== null) {
          updatedFormData[category][index] = {
            ...updatedFormData[category][index],
            [field]: e.target.value,
          };
        } else {
          updatedFormData[category] = {
            ...updatedFormData[category],
            [field]: e.target.value,
          };
        }
      } else {
        updatedFormData[category] = {
          ...updatedFormData[category],
          [field]: e.target.value,
        };
      }

      return updatedFormData;
    });
  };

  const handleFormSubmit = async () => {
    try {
      const res = await handelUpdatePatinet(editingPatient?._id, formData);
      console.log(res, 'res');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      title="Edit Patient"
      visible={isModalVisible}
      onCancel={handleCancel}
      width={1400}
      footer={[
        <Button key="submit" type="primary" onClick={handleFormSubmit}>
          Update
        </Button>,
      ]}
    >
      {editingPatient && (
        <Form>
          {/* patientInformation */}
          <Collapse defaultActiveKey={['1']}>
            {editingPatient?.patientInformation && (
              <Panel header="Patient Information" key="1">
                {editingPatient?.patientInformation ? (
                  <Form layout="vertical" className="m-4 ">
                    <Row gutter={[16, 16]} className="m-4">
                      <Col span={12}>
                        <Form.Item label="Name">
                          <Input
                            value={formData.patientInformation.name}
                            defaultValue={
                              editingPatient?.patientInformation?.name
                            }
                            onChange={(e) =>
                              handleInputChange(e, 'name', 'patientInformation')
                            }
                          />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="Marital Status">
                          <Input
                            defaultValue={
                              editingPatient?.patientInformation?.maritalStatus
                            }
                            value={formData.patientInformation.maritalStatus}
                            onChange={(e) =>
                              handleInputChange(
                                e,
                                'maritalStatus',
                                'patientInformation',
                              )
                            }
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={[16, 16]} className="m-4 py-4">
                      <Col span={12}>
                        <Form.Item label="Registration No">
                          <Input
                            value={formData.patientInformation.registrationNo}
                            defaultValue={
                              editingPatient?.patientInformation?.registrationNo
                            }
                            onChange={(e) =>
                              handleInputChange(
                                e,
                                'registrationNo',
                                'patientInformation',
                              )
                            }
                          />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="Occupation">
                          <Input
                            value={formData.patientInformation.occupation}
                            defaultValue={
                              editingPatient?.patientInformation?.occupation
                            }
                            onChange={(e) =>
                              handleInputChange(
                                e,
                                'occupation',
                                'patientInformation',
                              )
                            }
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={[16, 16]} className="m-4">
                      <Col span={12}>
                        <Form.Item label="Age">
                          <Input
                            value={formData.patientInformation.age}
                            defaultValue={
                              editingPatient?.patientInformation?.age
                            }
                            onChange={(e) =>
                              handleInputChange(e, 'age', 'patientInformation')
                            }
                          />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="Sex">
                          <Input
                            value={formData.patientInformation.sex}
                            defaultValue={
                              editingPatient?.patientInformation?.sex
                            }
                            onChange={(e) =>
                              handleInputChange(e, 'sex', 'patientInformation')
                            }
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={[16, 16]} className="m-4 py-4">
                      <Col span={12}>
                        <Form.Item label="Division">
                          <Input
                            value={formData.patientInformation.division}
                            defaultValue={
                              editingPatient?.patientInformation?.division
                            }
                            onChange={(e) =>
                              handleInputChange(
                                e,
                                'division',
                                'patientInformation',
                              )
                            }
                          />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="District">
                          <Input
                            value={formData.patientInformation.district}
                            defaultValue={
                              editingPatient?.patientInformation?.district
                            }
                            onChange={(e) =>
                              handleInputChange(
                                e,
                                'district',
                                'patientInformation',
                              )
                            }
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={[16, 16]} className="m-4">
                      <Col span={12}>
                        <Form.Item label="Phone Number">
                          <Input
                            value={formData.patientInformation.phoneNumber}
                            defaultValue={
                              editingPatient?.patientInformation?.phoneNumber
                            }
                            onChange={(e) =>
                              handleInputChange(
                                e,
                                'phoneNumber',
                                'patientInformation',
                              )
                            }
                          />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="Admission Unit">
                          <Input
                            value={formData.patientInformation.admissionUnit}
                            defaultValue={
                              editingPatient?.patientInformation?.admissionUnit
                            }
                            onChange={(e) =>
                              handleInputChange(
                                e,
                                'admissionUnit',
                                'patientInformation',
                              )
                            }
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={[16, 16]} className="m-4 py-4">
                      <Col span={12}>
                        <Form.Item label="Address Details">
                          <Input
                            value={formData.patientInformation.addressDetails}
                            defaultValue={
                              editingPatient?.patientInformation?.addressDetails
                            }
                            onChange={(e) =>
                              handleInputChange(
                                e,
                                'addressDetails',
                                'patientInformation',
                              )
                            }
                          />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="Admission Date">
                          <Input
                            value={formData.patientInformation.admissionDate}
                            defaultValue={convertIsoToNormalDate(
                              editingPatient?.patientInformation?.admissionDate,
                            )}
                            onChange={(e) =>
                              handleInputChange(
                                e,
                                'admissionDate',
                                'patientInformation',
                              )
                            }
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={[16, 16]} className="m-4">
                      <Col span={12}>
                        <Form.Item label="Release Date">
                          <Input
                            value={formData.patientInformation.releaseDate}
                            defaultValue={convertIsoToNormalDate(
                              editingPatient?.patientInformation?.releaseDate,
                            )}
                            onChange={(e) =>
                              handleInputChange(
                                e,
                                'releaseDate',
                                'patientInformation',
                              )
                            }
                          />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="Hospital Stay">
                          <Input
                            value={formData.patientInformation.hospitalStay}
                            defaultValue={
                              editingPatient?.patientInformation?.hospitalStay
                            }
                            onChange={(e) =>
                              handleInputChange(
                                e,
                                'hospitalStay',
                                'patientInformation',
                              )
                            }
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form>
                ) : (
                  <p>No patient information available</p>
                )}
              </Panel>
            )}

            <Panel header="Chief Complaints" key="2">
              <Form.Item label="Chief Complaints" className="flex flex-col gap-3">
                {formData.chiefComplaints.map((item, index) => (
                  <div key={index} className="flex flex-col gap-4">
                    <div className="flex flex-row gap-4">
                      <div className="m-2 flex-1">
                        <label htmlFor={`complaints-${index}`} className="mb-1 block">
                          Complaints
                        </label>
                        <Input
                          id={`complaints-${index}`}
                          placeholder="Complaints"
                          value={item.complaints || ''}
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              'complaints',
                              'chiefComplaints',
                              null,
                              index,
                            )
                          }
                        />
                      </div>
                      <div className="m-2 flex-1">
                        <label htmlFor={`duration-${index}`} className="mb-1 block">
                          Duration
                        </label>
                        <Input
                          id={`duration-${index}`}
                          placeholder="Duration"
                          value={item.duration || ''}
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              'duration',
                              'chiefComplaints',
                              null,
                              index,
                            )
                          }
                        />
                      </div>
                    </div>
                    <div className='w-full h-[1px] bg-gray-900 rounded-full'></div>
                  </div>

                ))}
              </Form.Item>
              <Button onClick={addChiefComplaint}>Add Chief Complaint</Button>
            </Panel>
            {formData.aboutIllness && (
              <Panel header="About Illness" key="3">
                {formData.aboutIllness ? (
                  <>
                    {/* History of Present Illness and Others remain unchanged */}

                    <Form.Item label="History of Past Illness" className="flex flex-col gap-3">
                      {formData.aboutIllness.historyOfPastIllness?.map((item, index) => (
                        <div  key={index} className='flex flex-col'>
                          <div className="flex flex-row gap-4">
                            <div className="m-2 flex-1">
                              <label htmlFor={`historyOfPastIllness-${index}`} className="mb-1 block">
                                History of Past Illness
                              </label>
                              <Input
                                id={`historyOfPastIllness-${index}`}
                                value={item.historyOfPastIllness}
                                onChange={(e) =>
                                  handleInputChange(
                                    e,
                                    'historyOfPastIllness',
                                    'aboutIllness',
                                    'historyOfPastIllness',
                                    index,
                                  )
                                }
                              />
                            </div>
                            <div className="m-2 flex-1">
                              <label htmlFor={`duration-${index}`} className="mb-1 block">
                                Duration
                              </label>
                              <Input
                                id={`duration-${index}`}
                                value={item.duration}
                                onChange={(e) =>
                                  handleInputChange(
                                    e,
                                    'duration',
                                    'aboutIllness',
                                    'historyOfPastIllness',
                                    index,
                                  )
                                }
                              />
                            </div>

                          </div>
                          <div className='w-full h-[1px] bg-gray-900 rounded-full mt-1'></div>
                        </div>
                      ))}


                      <Button onClick={addHistoryOfPastIllness} className='mt-2'>Add History of Past Illness</Button>
                    </Form.Item>

                    <Form.Item label="Personal History" className="flex flex-col gap-3">
                      {formData.aboutIllness.personalHistory?.map((item, index) => (
                        <div className='flex flex-col'>
                          <div key={index} className="flex flex-row gap-4">
                            <div className="m-2 flex-1">
                              <label htmlFor={`personalHistory-${index}`} className="mb-1 block">
                                Personal History
                              </label>
                              <Input
                                id={`personalHistory-${index}`}
                                value={item.personalHistory}
                                onChange={(e) =>
                                  handleInputChange(
                                    e,
                                    'personalHistory',
                                    'aboutIllness',
                                    'personalHistory',
                                    index,
                                  )
                                }
                              />
                            </div>
                            <div className="m-2 flex-1">
                              <label htmlFor={`duration-${index}`} className="mb-1 block">
                                Duration
                              </label>
                              <Input
                                id={`duration-${index}`}
                                value={item.duration}
                                onChange={(e) =>
                                  handleInputChange(
                                    e,
                                    'duration',
                                    'aboutIllness',
                                    'personalHistory',
                                    index,
                                  )
                                }
                              />
                            </div>
                          </div>
                          <div className='w-full h-[1px] bg-gray-900 rounded-full mt-1'></div>
                        </div>
                      ))}
                      <Button onClick={addPersonalHistory} className='mt-2'>Add Personal History</Button>
                    </Form.Item>

                    <Form.Item label="Treatment History" className="flex flex-col gap-3">
                      {formData.aboutIllness.treatmentHistory?.map((item, index) => (
                        <div className='flex flex-col'>
                          <div key={index} className="flex flex-row gap-4">
                            <div className="m-2 flex-1">
                              <label htmlFor={`drugsName-${index}`} className="mb-1 block">
                                Drugs Name
                              </label>
                              <Input
                                id={`drugsName-${index}`}
                                value={item.drugsName}
                                onChange={(e) =>
                                  handleInputChange(
                                    e,
                                    'drugsName',
                                    'aboutIllness',
                                    'treatmentHistory',
                                    index,
                                  )
                                }
                              />
                            </div>
                            <div className="m-2 flex-1">
                              <label htmlFor={`duration-${index}`} className="mb-1 block">
                                Duration
                              </label>
                              <Input
                                id={`duration-${index}`}
                                value={item.duration}
                                onChange={(e) =>
                                  handleInputChange(
                                    e,
                                    'duration',
                                    'aboutIllness',
                                    'treatmentHistory',
                                    index,
                                  )
                                }
                              />
                            </div>
                          </div>
                          <div className='w-full h-[1px] bg-gray-900 rounded-full mt-1'></div>
                        </div>
                      ))}
                      <Button onClick={addTreatmentHistory} className='mt-2'>Add Treatment History</Button>
                    </Form.Item>
                  </>
                ) : (
                  <p>No information about illness available</p>
                )}
              </Panel>
            )}

            {formData.generalExamination && (
              <Panel header="General Examination" key="4">
                {formData.generalExamination ? (
                  <>
                    <Form.Item label="Vital Signs" className="flex flex-col gap-3">
                      {formData.generalExamination.vitalSigns?.map((item, index) => (
                        <div className='flex flex-col'>
                          <div key={index} className="flex flex-row gap-2">
                            <div className="m-2 flex-1">
                              <label htmlFor={`tempFahrenheit-${index}`} className="mb-1 block">
                                Temperature (°F)
                              </label>
                              <Input
                                id={`tempFahrenheit-${index}`}
                                value={item.tempFahrenheit}
                                onChange={(e) =>
                                  handleInputChange(
                                    e,
                                    'tempFahrenheit',
                                    'generalExamination',
                                    'vitalSigns',
                                    index,
                                  )
                                }
                              />
                            </div>
                            <div className="m-2 flex-1">
                              <label htmlFor={`pulsePerMin-${index}`} className="mb-1 block">
                                Pulse (per min)
                              </label>
                              <Input
                                id={`pulsePerMin-${index}`}
                                value={item.pulsePerMin}
                                onChange={(e) =>
                                  handleInputChange(
                                    e,
                                    'pulsePerMin',
                                    'generalExamination',
                                    'vitalSigns',
                                    index,
                                  )
                                }
                              />
                            </div>
                            <div className="m-2 flex-1">
                              <label htmlFor={`respiratoryRatePerMin-${index}`} className="mb-1 block min-w-64">
                                Respiratory Rate (per min)
                              </label>
                              <Input
                                id={`respiratoryRatePerMin-${index}`}
                                value={item.respiratoryRatePerMin}
                                onChange={(e) =>
                                  handleInputChange(
                                    e,
                                    'respiratoryRatePerMin',
                                    'generalExamination',
                                    'vitalSigns',
                                    index,
                                  )
                                }
                              />
                            </div>
                            <div className="m-2 flex-1">
                              <label htmlFor={`bloodPressure-${index}`} className="mb-1 block">
                                Blood Pressure
                              </label>
                              <Input
                                id={`bloodPressure-${index}`}
                                value={item.bloodPressure}
                                onChange={(e) =>
                                  handleInputChange(
                                    e,
                                    'bloodPressure',
                                    'generalExamination',
                                    'vitalSigns',
                                    index,
                                  )
                                }
                              />
                            </div>
                            <div className="m-2 flex-1">
                              <label htmlFor={`spo2-${index}`} className="mb-1 block">
                                SpO2
                              </label>
                              <Input
                                id={`spo2-${index}`}
                                value={item.spo2}
                                onChange={(e) =>
                                  handleInputChange(
                                    e,
                                    'spo2',
                                    'generalExamination',
                                    'vitalSigns',
                                    index,
                                  )
                                }
                              />
                            </div>
                          </div>
                          <div className='w-full h-[1px] bg-gray-900 rounded-full mt-1'></div>
                        </div>
                      ))}
                      <Button onClick={addVitalSign} className='mt-2'>Add Vital Sign</Button>
                    </Form.Item>

                    <Form.Item label="Clinical Examination" className="flex flex-col gap-3">
                      {formData.generalExamination.clinicalExamination?.map((item, index) => (
                        <div className='flex flex-col'>
                          <div key={index} className="flex flex-row gap-4">
                            <div className="m-2 flex-1">
                              <label htmlFor={`name-${index}`} className="mb-1 block">
                                Name
                              </label>
                              <Input
                                id={`name-${index}`}
                                value={item.name}
                                onChange={(e) =>
                                  handleInputChange(
                                    e,
                                    'name',
                                    'generalExamination',
                                    'clinicalExamination',
                                    index,
                                  )
                                }
                              />
                            </div>
                            <div className="m-2 flex-1">
                              <label htmlFor={`findings-${index}`} className="mb-1 block">
                                Findings
                              </label>
                              <Input
                                id={`findings-${index}`}
                                value={item.findings}
                                onChange={(e) =>
                                  handleInputChange(
                                    e,
                                    'findings',
                                    'generalExamination',
                                    'clinicalExamination',
                                    index,
                                  )
                                }
                              />
                            </div>
                            <div className="m-2 flex-1">
                              <label htmlFor={`comments-${index}`} className="mb-1 block">
                                Comments
                              </label>
                              <Input
                                id={`comments-${index}`}
                                value={item.comments}
                                onChange={(e) =>
                                  handleInputChange(
                                    e,
                                    'comments',
                                    'generalExamination',
                                    'clinicalExamination',
                                    index,
                                  )
                                }
                              />
                            </div>
                          </div>
                          <div className='w-full h-[1px] bg-gray-900 rounded-full mt-1'></div>
                        </div>
                      ))}
                      <Button onClick={addClinicalExamination} className='mt-2'>Add Clinical Examination</Button>
                    </Form.Item>
                  </>
                ) : (
                  <p>No general examination information available</p>
                )}
              </Panel>
            )}

            {formData.systemicExamination && (
              <Panel header="Systemic Examination" key="5">
                {formData.systemicExamination ? (
                  <>
                    {/* Cardiovascular System */}
                    <Form.Item label="Cardiovascular System" className="flex flex-col gap-3">
                      {formData.systemicExamination.cardiovascularSystem?.map((item, index) => (
                        <div className='flex flex-col'>
                          <div key={index} className="flex flex-row gap-4">
                            <div className="m-2 flex-1">
                              <label htmlFor={`cvs-name-${index}`} className="mb-1 block">
                                Name
                              </label>
                              <Input
                                id={`cvs-name-${index}`}
                                value={item.name}
                                onChange={(e) =>
                                  handleInputChange(
                                    e,
                                    'name',
                                    'systemicExamination',
                                    'cardiovascularSystem',
                                    index,
                                  )
                                }
                              />
                            </div>
                            <div className="m-2 flex-1">
                              <label htmlFor={`cvs-findings-${index}`} className="mb-1 block">
                                Findings
                              </label>
                              <Input
                                id={`cvs-findings-${index}`}
                                value={item.findings}
                                onChange={(e) =>
                                  handleInputChange(
                                    e,
                                    'findings',
                                    'systemicExamination',
                                    'cardiovascularSystem',
                                    index,
                                  )
                                }
                              />
                            </div>
                            <div className="m-2 flex-1">
                              <label htmlFor={`cvs-comments-${index}`} className="mb-1 block">
                                Comments
                              </label>
                              <Input
                                id={`cvs-comments-${index}`}
                                value={item.comments}
                                onChange={(e) =>
                                  handleInputChange(
                                    e,
                                    'comments',
                                    'systemicExamination',
                                    'cardiovascularSystem',
                                    index,
                                  )
                                }
                              />
                            </div>
                          </div>
                          <div className='w-full h-[1px] bg-gray-900 rounded-full mt-1'></div>
                        </div>
                      ))}
                      <Button onClick={() => addSystemicExamination('cardiovascularSystem')} className='mt-2'>
                        Add Cardiovascular System Examination
                      </Button>
                    </Form.Item>

                    {/* Respiratory System */}
                    <Form.Item label="Respiratory System" className="flex flex-col gap-3">
                      {formData.systemicExamination.respiratorySystem?.map((item, index) => (
                        <div className='flex flex-col'>
                          <div key={index} className="flex flex-row gap-4">
                            <div className="m-2 flex-1">
                              <label htmlFor={`rs-name-${index}`} className="mb-1 block">
                                Name
                              </label>
                              <Input
                                id={`rs-name-${index}`}
                                value={item.name}
                                onChange={(e) =>
                                  handleInputChange(
                                    e,
                                    'name',
                                    'systemicExamination',
                                    'respiratorySystem',
                                    index,
                                  )
                                }
                              />
                            </div>
                            <div className="m-2 flex-1">
                              <label htmlFor={`rs-findings-${index}`} className="mb-1 block">
                                Findings
                              </label>
                              <Input
                                id={`rs-findings-${index}`}
                                value={item.findings}
                                onChange={(e) =>
                                  handleInputChange(
                                    e,
                                    'findings',
                                    'systemicExamination',
                                    'respiratorySystem',
                                    index,
                                  )
                                }
                              />
                            </div>
                            <div className="m-2 flex-1">
                              <label htmlFor={`rs-comments-${index}`} className="mb-1 block">
                                Comments
                              </label>
                              <Input
                                id={`rs-comments-${index}`}
                                value={item.comments}
                                onChange={(e) =>
                                  handleInputChange(
                                    e,
                                    'comments',
                                    'systemicExamination',
                                    'respiratorySystem',
                                    index,
                                  )
                                }
                              />
                            </div>
                          </div>
                          <div className='w-full h-[1px] bg-gray-900 rounded-full mt-1'></div>
                        </div>
                      ))}
                      <Button onClick={() => addSystemicExamination('respiratorySystem')} className='mt-2'>
                        Add Respiratory System Examination
                      </Button>
                    </Form.Item>

                    {/* Abdomen */}
                    <Form.Item label="Abdomen" className="flex flex-col gap-3">
                      {formData.systemicExamination.abdomen?.map((item, index) => (
                        <div className='flex flex-col'>
                          <div key={index} className="flex flex-row gap-4">
                            <div className="m-2 flex-1">
                              <label htmlFor={`abdomen-name-${index}`} className="mb-1 block">
                                Name
                              </label>
                              <Input
                                id={`abdomen-name-${index}`}
                                value={item.name}
                                onChange={(e) =>
                                  handleInputChange(
                                    e,
                                    'name',
                                    'systemicExamination',
                                    'abdomen',
                                    index,
                                  )
                                }
                              />
                            </div>
                            <div className="m-2 flex-1">
                              <label htmlFor={`abdomen-findings-${index}`} className="mb-1 block">
                                Findings
                              </label>
                              <Input
                                id={`abdomen-findings-${index}`}
                                value={item.findings}
                                onChange={(e) =>
                                  handleInputChange(
                                    e,
                                    'findings',
                                    'systemicExamination',
                                    'abdomen',
                                    index,
                                  )
                                }
                              />
                            </div>
                            <div className="m-2 flex-1">
                              <label htmlFor={`abdomen-comments-${index}`} className="mb-1 block">
                                Comments
                              </label>
                              <Input
                                id={`abdomen-comments-${index}`}
                                value={item.comments}
                                onChange={(e) =>
                                  handleInputChange(
                                    e,
                                    'comments',
                                    'systemicExamination',
                                    'abdomen',
                                    index,
                                  )
                                }
                              />
                            </div>
                          </div>
                          <div className='w-full h-[1px] bg-gray-900 rounded-full mt-1'></div>
                        </div>
                      ))}
                      <Button onClick={() => addSystemicExamination('abdomen')} className='mt-2'>
                        Add Abdomen Examination
                      </Button>
                    </Form.Item>

                    {/* Neurological Examination */}
                    {formData.systemicExamination.neurologicalExamination && (
                      <Form.Item label="Neurological Examination" className="flex flex-col gap-3">
                        {formData.systemicExamination.neurologicalExamination.map((item, index) => (
                          <div className='flex flex-col'>
                            <div key={index} className="flex flex-row gap-4">
                              <div className="m-2 flex-1">
                                <label htmlFor={`neurological-name-${index}`} className="mb-1 block">
                                  Name
                                </label>
                                <Input
                                  id={`neurological-name-${index}`}
                                  value={item.name}
                                  onChange={(e) =>
                                    handleInputChange(
                                      e,
                                      'name',
                                      'systemicExamination',
                                      'neurologicalExamination',
                                      index,
                                    )
                                  }
                                />
                              </div>
                              <div className="m-2 flex-1">
                                <label htmlFor={`neurological-findings-${index}`} className="mb-1 block">
                                  Findings
                                </label>
                                <Input
                                  id={`neurological-findings-${index}`}
                                  value={item.findings}
                                  onChange={(e) =>
                                    handleInputChange(
                                      e,
                                      'findings',
                                      'systemicExamination',
                                      'neurologicalExamination',
                                      index,
                                    )
                                  }
                                />
                              </div>
                              <div className="m-2 flex-1">
                                <label htmlFor={`neurological-comments-${index}`} className="mb-1 block">
                                  Comments
                                </label>
                                <Input
                                  id={`neurological-comments-${index}`}
                                  value={item.comments}
                                  onChange={(e) =>
                                    handleInputChange(
                                      e,
                                      'comments',
                                      'systemicExamination',
                                      'neurologicalExamination',
                                      index,
                                    )
                                  }
                                />
                              </div>
                            </div>
                            <div className='w-full h-[1px] bg-gray-900 rounded-full mt-1'></div>
                          </div>
                        ))}
                        <Button onClick={() => addSystemicExamination('neurologicalExamination')} className='mt-2'>
                          Add Neurological Examination
                        </Button>
                      </Form.Item>
                    )}

                    {/* Locomotor System */}
                    {formData.systemicExamination.locomotorSystem && (
                      <Form.Item label="Locomotor System" className="flex flex-col gap-3">
                        {formData.systemicExamination.locomotorSystem.map((item, index) => (
                          <div className='flex flex-col'>
                            <div key={index} className="flex flex-row gap-4">
                              <div className="m-2 flex-1">
                                <label htmlFor={`locomotor-name-${index}`} className="mb-1 block">
                                  Name
                                </label>
                                <Input
                                  id={`locomotor-name-${index}`}
                                  value={item.name}
                                  onChange={(e) =>
                                    handleInputChange(
                                      e,
                                      'name',
                                      'systemicExamination',
                                      'locomotorSystem',
                                      index,
                                    )
                                  }
                                />
                              </div>
                              <div className="m-2 flex-1">
                                <label htmlFor={`locomotor-findings-${index}`} className="mb-1 block">
                                  Findings
                                </label>
                                <Input
                                  id={`locomotor-findings-${index}`}
                                  value={item.findings}
                                  onChange={(e) =>
                                    handleInputChange(
                                      e,
                                      'findings',
                                      'systemicExamination',
                                      'locomotorSystem',
                                      index,
                                    )
                                  }
                                />
                              </div>
                              <div className="m-2 flex-1">
                                <label htmlFor={`locomotor-comments-${index}`} className="mb-1 block">
                                  Comments
                                </label>
                                <Input
                                  id={`locomotor-comments-${index}`}
                                  value={item.comments}
                                  onChange={(e) =>
                                    handleInputChange(
                                      e,
                                      'comments',
                                      'systemicExamination',
                                      'locomotorSystem',
                                      index,
                                    )
                                  }
                                />
                              </div>
                            </div>
                            <div className='w-full h-[1px] bg-gray-900 rounded-full mt-1'></div>
                          </div>
                        ))}
                        <Button onClick={() => addSystemicExamination('locomotorSystem')} className='mt-2'>
                          Add Locomotor System
                        </Button>
                      </Form.Item>
                    )}

                    {/* Thyroid Gland */}
                    {formData.systemicExamination.thyroidGland && (
                      <Form.Item label="Thyroid Gland" className="flex flex-col gap-3">
                        {formData.systemicExamination.thyroidGland.map((item, index) => (
                          <div className='flex flex-col'>
                            <div key={index} className="flex flex-row gap-4">
                              <div className="m-2 flex-1">
                                <label htmlFor={`thyroid-name-${index}`} className="mb-1 block">
                                  Name
                                </label>
                                <Input
                                  id={`thyroid-name-${index}`}
                                  value={item.name}
                                  onChange={(e) =>
                                    handleInputChange(
                                      e,
                                      'name',
                                      'systemicExamination',
                                      'thyroidGland',
                                      index,
                                    )
                                  }
                                />
                              </div>
                              <div className="m-2 flex-1">
                                <label htmlFor={`thyroid-findings-${index}`} className="mb-1 block">
                                  Findings
                                </label>
                                <Input
                                  id={`thyroid-findings-${index}`}
                                  value={item.findings}
                                  onChange={(e) =>
                                    handleInputChange(
                                      e,
                                      'findings',
                                      'systemicExamination',
                                      'thyroidGland',
                                      index,
                                    )
                                  }
                                />
                              </div>
                              <div className="m-2 flex-1">
                                <label htmlFor={`thyroid-comments-${index}`} className="mb-1 block">
                                  Comments
                                </label>
                                <Input
                                  id={`thyroid-comments-${index}`}
                                  value={item.comments}
                                  onChange={(e) =>
                                    handleInputChange(
                                      e,
                                      'comments',
                                      'systemicExamination',
                                      'thyroidGland',
                                      index,
                                    )
                                  }
                                />
                              </div>
                            </div>
                            <div className='w-full h-[1px] bg-gray-900 rounded-full mt-1'></div>
                          </div>
                        ))}
                        <Button onClick={() => addSystemicExamination('thyroidGland')} className='mt-2'>
                          Add Thyroid Gland
                        </Button>
                      </Form.Item>
                    )}

                    {/* Other Examination */}
                    {formData.systemicExamination.otherExamination && (
                      <Form.Item label="Other Examination" className="flex flex-col gap-3">
                        {formData.systemicExamination.otherExamination.map((item, index) => (
                          <div className='flex flex-col'>
                            <div key={index} className="flex flex-row gap-4">
                              <div className="m-2 flex-1">
                                <label htmlFor={`other-name-${index}`} className="mb-1 block">
                                  Name
                                </label>
                                <Input
                                  id={`other-name-${index}`}
                                  value={item.name}
                                  onChange={(e) =>
                                    handleInputChange(
                                      e,
                                      'name',
                                      'systemicExamination',
                                      'otherExamination',
                                      index,
                                    )
                                  }
                                />
                              </div>
                              <div className="m-2 flex-1">
                                <label htmlFor={`other-findings-${index}`} className="mb-1 block">
                                  Findings
                                </label>
                                <Input
                                  id={`other-findings-${index}`}
                                  value={item.findings}
                                  onChange={(e) =>
                                    handleInputChange(
                                      e,
                                      'findings',
                                      'systemicExamination',
                                      'otherExamination',
                                      index,
                                    )
                                  }
                                />
                              </div>
                              <div className="m-2 flex-1">
                                <label htmlFor={`other-comments-${index}`} className="mb-1 block">
                                  Comments
                                </label>
                                <Input
                                  id={`other-comments-${index}`}
                                  value={item.comments}
                                  onChange={(e) =>
                                    handleInputChange(
                                      e,
                                      'comments',
                                      'systemicExamination',
                                      'otherExamination',
                                      index,
                                    )
                                  }
                                />
                              </div>
                            </div>
                            <div className='w-full h-[1px] bg-gray-900 rounded-full mt-1'></div>
                          </div>
                        ))}
                        <Button onClick={() => addSystemicExamination('otherExamination')} className='mt-2'>
                          Add Other Examination
                        </Button>
                      </Form.Item>

                    )}
                  </>
                ) : (
                  <p>No systemic examination information available</p>
                )}
              </Panel>
            )}


            {editingPatient?.investigations && (
              <Panel header="Investigations" key="6">
                {editingPatient?.investigations ? (
                  <>
                    {editingPatient.investigations.procedureStudy
                      .echocardiogram && (
                        <Form.Item
                          label="Echocardiogram"
                          className="flex flex-col gap-3"
                        >
                          {editingPatient.investigations.procedureStudy.echocardiogram.map(
                            (item, index) => (
                              <div key={index} className="grid grid-cols-3">
                                <div className="m-2 flex-1">
                                  <label
                                    htmlFor={`rwma-${index}`}
                                    className="mb-1 block"
                                  >
                                    RWMA
                                  </label>
                                  <Input
                                    id={`rwma-${index}`}
                                    defaultValue={item.rwma}
                                    onChange={(e) =>
                                      handleInputChange(
                                        e,
                                        'rwma',
                                        'investigations.procedureStudy.echocardiogram',
                                        null,
                                        index,
                                      )
                                    }
                                    className="m-2 flex-1"
                                  />
                                </div>
                                <div className="m-2 flex-1">
                                  <label
                                    htmlFor={`lvh-${index}`}
                                    className="mb-1 block"
                                  >
                                    LVH
                                  </label>
                                  <Input
                                    id={`lvh-${index}`}
                                    defaultValue={item.lvh}
                                    onChange={(e) =>
                                      handleInputChange(
                                        e,
                                        'lvh',
                                        'investigations.procedureStudy.echocardiogram',
                                        null,
                                        index,
                                      )
                                    }
                                    className="m-2 flex-1"
                                  />
                                </div>
                                <div className="m-2 flex-1">
                                  <label
                                    htmlFor={`vegetation-${index}`}
                                    className="mb-1 block"
                                  >
                                    Vegetation
                                  </label>
                                  <Input
                                    id={`vegetation-${index}`}
                                    defaultValue={item.vegetation}
                                    onChange={(e) =>
                                      handleInputChange(
                                        e,
                                        'vegetation',
                                        'investigations.procedureStudy.echocardiogram',
                                        null,
                                        index,
                                      )
                                    }
                                    className="m-2 flex-1"
                                  />
                                </div>
                                <div className="m-2 flex-1">
                                  <label
                                    htmlFor={`lvidd-${index}`}
                                    className="mb-1 block"
                                  >
                                    LVIDD
                                  </label>
                                  <Input
                                    id={`lvidd-${index}`}
                                    defaultValue={item.lvidd}
                                    onChange={(e) =>
                                      handleInputChange(
                                        e,
                                        'lvidd',
                                        'investigations.procedureStudy.echocardiogram',
                                        null,
                                        index,
                                      )
                                    }
                                    className="m-2 flex-1"
                                  />
                                </div>
                                <div className="m-2 flex-1">
                                  <label
                                    htmlFor={`ef-${index}`}
                                    className="mb-1 block"
                                  >
                                    EF
                                  </label>
                                  <Input
                                    id={`ef-${index}`}
                                    defaultValue={item.ef}
                                    onChange={(e) =>
                                      handleInputChange(
                                        e,
                                        'ef',
                                        'investigations.procedureStudy.echocardiogram',
                                        null,
                                        index,
                                      )
                                    }
                                    className="m-2 flex-1"
                                  />
                                </div>
                                <div className="m-2 flex-1">
                                  <label
                                    htmlFor={`pericardialEffusion-${index}`}
                                    className="mb-1 block min-w-48"
                                  >
                                    Pericardial Effusion
                                  </label>
                                  <Input
                                    id={`pericardialEffusion-${index}`}
                                    defaultValue={item.pericardialEffusion}
                                    onChange={(e) =>
                                      handleInputChange(
                                        e,
                                        'pericardialEffusion',
                                        'investigations.procedureStudy.echocardiogram',
                                        null,
                                        index,
                                      )
                                    }
                                    className="m-2 flex-1"
                                  />
                                </div>
                                <div className="m-2 flex-1">
                                  <label
                                    htmlFor={`valvularDisease-${index}`}
                                    className="mb-1 block min-w-48"
                                  >
                                    Valvular Disease
                                  </label>
                                  <Input
                                    id={`valvularDisease-${index}`}
                                    defaultValue={item.valvularDisease}
                                    onChange={(e) =>
                                      handleInputChange(
                                        e,
                                        'valvularDisease',
                                        'investigations.procedureStudy.echocardiogram',
                                        null,
                                        index,
                                      )
                                    }
                                    className="m-2 flex-1"
                                  />
                                </div>
                              </div>
                            ),
                          )}
                              <div className='w-full h-[1px] bg-gray-900 rounded-full mt-1'></div>
                        </Form.Item>
                      )}

                    {editingPatient.investigations.procedureStudy
                      .pluralFluidStudy && (
                        <Form.Item
                          label="Plural Fluid Study"
                          className="flex flex-col gap-3"
                        >
                          {editingPatient.investigations.procedureStudy.pluralFluidStudy.map(
                            (item, index) => (
                              <div key={index} className="grid grid-cols-3">
                                <div className="m-2 flex-1">
                                  <label
                                    htmlFor={`polymorph-${index}`}
                                    className="mb-1 block"
                                  >
                                    Polymorph
                                  </label>
                                  <Input
                                    id={`polymorph-${index}`}
                                    defaultValue={item.polymorph}
                                    onChange={(e) =>
                                      handleInputChange(
                                        e,
                                        'polymorph',
                                        'investigations.procedureStudy.pluralFluidStudy',
                                        null,
                                        index,
                                      )
                                    }
                                    className="m-2 flex-1"
                                  />
                                </div>
                                <div className="m-2 flex-1">
                                  <label
                                    htmlFor={`lymphocytes-${index}`}
                                    className="mb-1 block"
                                  >
                                    Lymphocytes
                                  </label>
                                  <Input
                                    id={`lymphocytes-${index}`}
                                    defaultValue={item.lymphocytes}
                                    onChange={(e) =>
                                      handleInputChange(
                                        e,
                                        'lymphocytes',
                                        'investigations.procedureStudy.pluralFluidStudy',
                                        null,
                                        index,
                                      )
                                    }
                                    className="m-2 flex-1"
                                  />
                                </div>
                                <div className="m-2 flex-1">
                                  <label
                                    htmlFor={`malignantCell-${index}`}
                                    className="mb-1 block"
                                  >
                                    Malignant Cell
                                  </label>
                                  <Input
                                    id={`malignantCell-${index}`}
                                    defaultValue={item.malignantCell}
                                    onChange={(e) =>
                                      handleInputChange(
                                        e,
                                        'malignantCell',
                                        'investigations.procedureStudy.pluralFluidStudy',
                                        null,
                                        index,
                                      )
                                    }
                                    className="m-2 flex-1"
                                  />
                                </div>
                                <div className="m-2 flex-1">
                                  <label
                                    htmlFor={`protein-${index}`}
                                    className="mb-1 block"
                                  >
                                    Protein
                                  </label>
                                  <Input
                                    id={`protein-${index}`}
                                    defaultValue={item.protein}
                                    onChange={(e) =>
                                      handleInputChange(
                                        e,
                                        'protein',
                                        'investigations.procedureStudy.pluralFluidStudy',
                                        null,
                                        index,
                                      )
                                    }
                                    className="m-2 flex-1"
                                  />
                                </div>
                                <div className="m-2 flex-1">
                                  <label
                                    htmlFor={`glucose-${index}`}
                                    className="mb-1 block"
                                  >
                                    Glucose
                                  </label>
                                  <Input
                                    id={`glucose-${index}`}
                                    defaultValue={item.glucose}
                                    onChange={(e) =>
                                      handleInputChange(
                                        e,
                                        'glucose',
                                        'investigations.procedureStudy.pluralFluidStudy',
                                        null,
                                        index,
                                      )
                                    }
                                    className="m-2 flex-1"
                                  />
                                </div>
                                <div className="m-2 flex-1">
                                  <label
                                    htmlFor={`ada-${index}`}
                                    className="mb-1 block"
                                  >
                                    ADA
                                  </label>
                                  <Input
                                    id={`ada-${index}`}
                                    defaultValue={item.ada}
                                    onChange={(e) =>
                                      handleInputChange(
                                        e,
                                        'ada',
                                        'investigations.procedureStudy.pluralFluidStudy',
                                        null,
                                        index,
                                      )
                                    }
                                    className="m-2 flex-1"
                                  />
                                </div>
                              </div>
                            ),
                          )}
                              <div className='w-full h-[1px] bg-gray-900 rounded-full mt-1'></div>
                        </Form.Item>
                      )}

                    {editingPatient.investigations.procedureStudy.csfStudy && (
                      <Form.Item
                        label="CSF Study"
                        className="flex flex-col gap-3"
                      >
                        {editingPatient.investigations.procedureStudy.csfStudy.map(
                          (item, index) => (
                            <div key={index} className="grid grid-cols-3">
                              <div className="m-2 flex-1">
                                <label
                                  htmlFor={`polymorph-${index}`}
                                  className="mb-1 block"
                                >
                                  Polymorph
                                </label>
                                <Input
                                  id={`polymorph-${index}`}
                                  defaultValue={item.polymorph}
                                  onChange={(e) =>
                                    handleInputChange(
                                      e,
                                      'polymorph',
                                      'investigations.procedureStudy.csfStudy',
                                      null,
                                      index,
                                    )
                                  }
                                  className="m-2 flex-1"
                                />
                              </div>
                              <div className="m-2 flex-1">
                                <label
                                  htmlFor={`lymphocytes-${index}`}
                                  className="mb-1 block"
                                >
                                  Lymphocytes
                                </label>
                                <Input
                                  id={`lymphocytes-${index}`}
                                  defaultValue={item.lymphocytes}
                                  onChange={(e) =>
                                    handleInputChange(
                                      e,
                                      'lymphocytes',
                                      'investigations.procedureStudy.csfStudy',
                                      null,
                                      index,
                                    )
                                  }
                                  className="m-2 flex-1"
                                />
                              </div>
                              <div className="m-2 flex-1">
                                <label
                                  htmlFor={`malignantCell-${index}`}
                                  className="mb-1 block"
                                >
                                  Malignant Cell
                                </label>
                                <Input
                                  id={`malignantCell-${index}`}
                                  defaultValue={item.malignantCell}
                                  onChange={(e) =>
                                    handleInputChange(
                                      e,
                                      'malignantCell',
                                      'investigations.procedureStudy.csfStudy',
                                      null,
                                      index,
                                    )
                                  }
                                  className="m-2 flex-1"
                                />
                              </div>
                              <div className="m-2 flex-1">
                                <label
                                  htmlFor={`protein-${index}`}
                                  className="mb-1 block"
                                >
                                  Protein
                                </label>
                                <Input
                                  id={`protein-${index}`}
                                  defaultValue={item.protein}
                                  onChange={(e) =>
                                    handleInputChange(
                                      e,
                                      'protein',
                                      'investigations.procedureStudy.csfStudy',
                                      null,
                                      index,
                                    )
                                  }
                                  className="m-2 flex-1"
                                />
                              </div>
                              <div className="m-2 flex-1">
                                <label
                                  htmlFor={`glucose-${index}`}
                                  className="mb-1 block"
                                >
                                  Glucose
                                </label>
                                <Input
                                  id={`glucose-${index}`}
                                  defaultValue={item.glucose}
                                  onChange={(e) =>
                                    handleInputChange(
                                      e,
                                      'glucose',
                                      'investigations.procedureStudy.csfStudy',
                                      null,
                                      index,
                                    )
                                  }
                                  className="m-2 flex-1"
                                />
                              </div>
                              <div className="m-2 flex-1">
                                <label
                                  htmlFor={`ada-${index}`}
                                  className="mb-1 block"
                                >
                                  ADA
                                </label>
                                <Input
                                  id={`ada-${index}`}
                                  defaultValue={item.ada}
                                  onChange={(e) =>
                                    handleInputChange(
                                      e,
                                      'ada',
                                      'investigations.procedureStudy.csfStudy',
                                      null,
                                      index,
                                    )
                                  }
                                  className="m-2 flex-1"
                                />
                              </div>
                              <div className="m-2 flex-1">
                                <label
                                  htmlFor={`oligoclonalBand-${index}`}
                                  className="mb-1 block min-w-48"
                                >
                                  Oligoclonal Band
                                </label>
                                <Input
                                  id={`oligoclonalBand-${index}`}
                                  defaultValue={item.oligoclonalBand}
                                  onChange={(e) =>
                                    handleInputChange(
                                      e,
                                      'oligoclonalBand',
                                      'investigations.procedureStudy.csfStudy',
                                      null,
                                      index,
                                    )
                                  }
                                  className="m-2 flex-1"
                                />
                              </div>
                            </div>
                          ),
                        )}
                            <div className='w-full h-[1px] bg-gray-900 rounded-full mt-1'></div>
                      </Form.Item>
                    )}

                    {editingPatient.investigations.procedureStudy
                      .asciticFluidStudy && (
                        <Form.Item
                          label="Ascitic Fluid Study"
                          className="flex flex-col gap-3"
                        >
                          {editingPatient.investigations.procedureStudy.asciticFluidStudy.map(
                            (item, index) => (
                              <div key={index} className="grid grid-cols-3">
                                <div className="m-2 flex-1">
                                  <label
                                    htmlFor={`polymorph-${index}`}
                                    className="mb-1 block"
                                  >
                                    Polymorph
                                  </label>
                                  <Input
                                    id={`polymorph-${index}`}
                                    defaultValue={item.polymorph}
                                    onChange={(e) =>
                                      handleInputChange(
                                        e,
                                        'polymorph',
                                        'investigations.procedureStudy.asciticFluidStudy',
                                        null,
                                        index,
                                      )
                                    }
                                    className="m-2 flex-1"
                                  />
                                </div>
                                <div className="m-2 flex-1">
                                  <label
                                    htmlFor={`lymphocytes-${index}`}
                                    className="mb-1 block"
                                  >
                                    Lymphocytes
                                  </label>
                                  <Input
                                    id={`lymphocytes-${index}`}
                                    defaultValue={item.lymphocytes}
                                    onChange={(e) =>
                                      handleInputChange(
                                        e,
                                        'lymphocytes',
                                        'investigations.procedureStudy.asciticFluidStudy',
                                        null,
                                        index,
                                      )
                                    }
                                    className="m-2 flex-1"
                                  />
                                </div>
                                <div className="m-2 flex-1">
                                  <label
                                    htmlFor={`malignantCell-${index}`}
                                    className="mb-1 block"
                                  >
                                    Malignant Cell
                                  </label>
                                  <Input
                                    id={`malignantCell-${index}`}
                                    defaultValue={item.malignantCell}
                                    onChange={(e) =>
                                      handleInputChange(
                                        e,
                                        'malignantCell',
                                        'investigations.procedureStudy.asciticFluidStudy',
                                        null,
                                        index,
                                      )
                                    }
                                    className="m-2 flex-1"
                                  />
                                </div>
                                <div className="m-2 flex-1">
                                  <label
                                    htmlFor={`protein-${index}`}
                                    className="mb-1 block"
                                  >
                                    Protein
                                  </label>
                                  <Input
                                    id={`protein-${index}`}
                                    defaultValue={item.protein}
                                    onChange={(e) =>
                                      handleInputChange(
                                        e,
                                        'protein',
                                        'investigations.procedureStudy.asciticFluidStudy',
                                        null,
                                        index,
                                      )
                                    }
                                    className="m-2 flex-1"
                                  />
                                </div>
                                <div className="m-2 flex-1">
                                  <label
                                    htmlFor={`glucose-${index}`}
                                    className="mb-1 block"
                                  >
                                    Glucose
                                  </label>
                                  <Input
                                    id={`glucose-${index}`}
                                    defaultValue={item.glucose}
                                    onChange={(e) =>
                                      handleInputChange(
                                        e,
                                        'glucose',
                                        'investigations.procedureStudy.asciticFluidStudy',
                                        null,
                                        index,
                                      )
                                    }
                                    className="m-2 flex-1"
                                  />
                                </div>
                                <div className="m-2 flex-1">
                                  <label
                                    htmlFor={`ada-${index}`}
                                    className="mb-1 block"
                                  >
                                    ADA
                                  </label>
                                  <Input
                                    id={`ada-${index}`}
                                    defaultValue={item.ada}
                                    onChange={(e) =>
                                      handleInputChange(
                                        e,
                                        'ada',
                                        'investigations.procedureStudy.asciticFluidStudy',
                                        null,
                                        index,
                                      )
                                    }
                                    className="m-2 flex-1"
                                  />
                                </div>
                                <div className="m-2 flex-1">
                                  <label
                                    htmlFor={`saag-${index}`}
                                    className="mb-1 block"
                                  >
                                    SAAG
                                  </label>
                                  <Input
                                    id={`saag-${index}`}
                                    defaultValue={item.saag}
                                    onChange={(e) =>
                                      handleInputChange(
                                        e,
                                        'saag',
                                        'investigations.procedureStudy.asciticFluidStudy',
                                        null,
                                        index,
                                      )
                                    }
                                    className="m-2 flex-1"
                                  />
                                </div>
                              </div>
                            ),
                          )}
                              <div className='w-full h-[1px] bg-gray-900 rounded-full mt-1'></div>
                        </Form.Item>
                      )}

                    {editingPatient.investigations.procedureStudy
                      .synovialFluidStudy && (
                        <Form.Item
                          label="Synovial Fluid Study"
                          className="flex flex-col gap-3"
                        >
                          {editingPatient.investigations.procedureStudy.synovialFluidStudy.map(
                            (item, index) => (
                              <div key={index} className="grid grid-cols-3">
                                <div className="m-2 flex-1">
                                  <label
                                    htmlFor={`polymorph-${index}`}
                                    className="mb-1 block"
                                  >
                                    Polymorph
                                  </label>
                                  <Input
                                    id={`polymorph-${index}`}
                                    defaultValue={item.polymorph}
                                    onChange={(e) =>
                                      handleInputChange(
                                        e,
                                        'polymorph',
                                        'investigations.procedureStudy.synovialFluidStudy',
                                        null,
                                        index,
                                      )
                                    }
                                    className="m-2 flex-1"
                                  />
                                </div>
                                <div className="m-2 flex-1">
                                  <label
                                    htmlFor={`lymphocytes-${index}`}
                                    className="mb-1 block"
                                  >
                                    Lymphocytes
                                  </label>
                                  <Input
                                    id={`lymphocytes-${index}`}
                                    defaultValue={item.lymphocytes}
                                    onChange={(e) =>
                                      handleInputChange(
                                        e,
                                        'lymphocytes',
                                        'investigations.procedureStudy.synovialFluidStudy',
                                        null,
                                        index,
                                      )
                                    }
                                    className="m-2 flex-1"
                                  />
                                </div>
                                <div className="m-2 flex-1">
                                  <label
                                    htmlFor={`malignantCell-${index}`}
                                    className="mb-1 block"
                                  >
                                    Malignant Cell
                                  </label>
                                  <Input
                                    id={`malignantCell-${index}`}
                                    defaultValue={item.malignantCell}
                                    onChange={(e) =>
                                      handleInputChange(
                                        e,
                                        'malignantCell',
                                        'investigations.procedureStudy.synovialFluidStudy',
                                        null,
                                        index,
                                      )
                                    }
                                    className="m-2 flex-1"
                                  />
                                </div>
                                <div className="m-2 flex-1">
                                  <label
                                    htmlFor={`protein-${index}`}
                                    className="mb-1 block"
                                  >
                                    Protein
                                  </label>
                                  <Input
                                    id={`protein-${index}`}
                                    defaultValue={item.protein}
                                    onChange={(e) =>
                                      handleInputChange(
                                        e,
                                        'protein',
                                        'investigations.procedureStudy.synovialFluidStudy',
                                        null,
                                        index,
                                      )
                                    }
                                    className="m-2 flex-1"
                                  />
                                </div>
                                <div className="m-2 flex-1">
                                  <label
                                    htmlFor={`glucose-${index}`}
                                    className="mb-1 block"
                                  >
                                    Glucose
                                  </label>
                                  <Input
                                    id={`glucose-${index}`}
                                    defaultValue={item.glucose}
                                    onChange={(e) =>
                                      handleInputChange(
                                        e,
                                        'glucose',
                                        'investigations.procedureStudy.synovialFluidStudy',
                                        null,
                                        index,
                                      )
                                    }
                                    className="m-2 flex-1"
                                  />
                                </div>
                                <div className="m-2 flex-1">
                                  <label
                                    htmlFor={`ada-${index}`}
                                    className="mb-1 block"
                                  >
                                    ADA
                                  </label>
                                  <Input
                                    id={`ada-${index}`}
                                    defaultValue={item.ada}
                                    onChange={(e) =>
                                      handleInputChange(
                                        e,
                                        'ada',
                                        'investigations.procedureStudy.synovialFluidStudy',
                                        null,
                                        index,
                                      )
                                    }
                                    className="m-2 flex-1"
                                  />
                                </div>
                              </div>
                            ),
                          )}
                              <div className='w-full h-[1px] bg-gray-900 rounded-full mt-1'></div>
                        </Form.Item>
                      )}

                    {editingPatient.investigations.CBC && (
                      <Form.Item label="CBC" className="flex flex-col gap-3">
                        {editingPatient.investigations.CBC.map(
                          (item, index) => (
                            <div key={index} className="grid grid-cols-3">
                              <label
                                htmlFor={`hb_${index}`}
                                className="m-2 flex-1"
                              >
                                Hemoglobin (hb):
                                <Input
                                  id={`hb_${index}`}
                                  defaultValue={item.hb}
                                  onChange={(e) =>
                                    handleInputChange(
                                      e,
                                      'hb',
                                      'investigations.CBC',
                                      null,
                                      index,
                                    )
                                  }
                                />
                              </label>
                              <label
                                htmlFor={`plateletCount_${index}`}
                                className="m-2 flex-1"
                              >
                                Platelet Count:
                                <Input
                                  id={`plateletCount_${index}`}
                                  defaultValue={item.plateletCount}
                                  onChange={(e) =>
                                    handleInputChange(
                                      e,
                                      'plateletCount',
                                      'investigations.CBC',
                                      null,
                                      index,
                                    )
                                  }
                                />
                              </label>
                              <label
                                htmlFor={`hct_${index}`}
                                className="m-2 flex-1"
                              >
                                Hematocrit (hct):
                                <Input
                                  id={`hct_${index}`}
                                  defaultValue={item.hct}
                                  onChange={(e) =>
                                    handleInputChange(
                                      e,
                                      'hct',
                                      'investigations.CBC',
                                      null,
                                      index,
                                    )
                                  }
                                />
                              </label>
                              <label
                                htmlFor={`tc_${index}`}
                                className="m-2 flex-1"
                              >
                                Total Count (tc):
                                <Input
                                  id={`tc_${index}`}
                                  defaultValue={item.tc}
                                  onChange={(e) =>
                                    handleInputChange(
                                      e,
                                      'tc',
                                      'investigations.CBC',
                                      null,
                                      index,
                                    )
                                  }
                                />
                              </label>
                              <label
                                htmlFor={`p_${index}`}
                                className="m-2 flex-1"
                              >
                                Polymorphs (p):
                                <Input
                                  id={`p_${index}`}
                                  defaultValue={item.p}
                                  onChange={(e) =>
                                    handleInputChange(
                                      e,
                                      'p',
                                      'investigations.CBC',
                                      null,
                                      index,
                                    )
                                  }
                                />
                              </label>
                              <label
                                htmlFor={`l_${index}`}
                                className="m-2 flex-1"
                              >
                                Lymphocytes (l):
                                <Input
                                  id={`l_${index}`}
                                  defaultValue={item.l}
                                  onChange={(e) =>
                                    handleInputChange(
                                      e,
                                      'l',
                                      'investigations.CBC',
                                      null,
                                      index,
                                    )
                                  }
                                />
                              </label>
                              <label
                                htmlFor={`reticulocyteCount_${index}`}
                                className="m-2 flex-1"
                              >
                                Reticulocyte Count:
                                <Input
                                  id={`reticulocyteCount_${index}`}
                                  defaultValue={item.reticulocyteCount}
                                  onChange={(e) =>
                                    handleInputChange(
                                      e,
                                      'reticulocyteCount',
                                      'investigations.CBC',
                                      null,
                                      index,
                                    )
                                  }
                                />
                              </label>
                              <label
                                htmlFor={`m_${index}`}
                                className="m-2 flex-1"
                              >
                                Monocytes (m):
                                <Input
                                  id={`m_${index}`}
                                  defaultValue={item.m}
                                  onChange={(e) =>
                                    handleInputChange(
                                      e,
                                      'm',
                                      'investigations.CBC',
                                      null,
                                      index,
                                    )
                                  }
                                />
                              </label>
                              <label
                                htmlFor={`b_${index}`}
                                className="m-2 flex-1"
                              >
                                Basophils (b):
                                <Input
                                  id={`b_${index}`}
                                  defaultValue={item.b}
                                  onChange={(e) =>
                                    handleInputChange(
                                      e,
                                      'b',
                                      'investigations.CBC',
                                      null,
                                      index,
                                    )
                                  }
                                />
                              </label>
                              <label
                                htmlFor={`mcv_${index}`}
                                className="m-2 flex-1"
                              >
                                Mean Corpuscular Volume (mcv):
                                <Input
                                  id={`mcv_${index}`}
                                  defaultValue={item.mcv}
                                  onChange={(e) =>
                                    handleInputChange(
                                      e,
                                      'mcv',
                                      'investigations.CBC',
                                      null,
                                      index,
                                    )
                                  }
                                />
                              </label>
                              <label
                                htmlFor={`totalCirEosinophilCount_${index}`}
                                className="m-2 flex-1"
                              >
                                Total Circulating Eosinophil Count:
                                <Input
                                  id={`totalCirEosinophilCount_${index}`}
                                  defaultValue={item.totalCirEosinophilCount}
                                  onChange={(e) =>
                                    handleInputChange(
                                      e,
                                      'totalCirEosinophilCount',
                                      'investigations.CBC',
                                      null,
                                      index,
                                    )
                                  }
                                />
                              </label>
                              <label
                                htmlFor={`esr_${index}`}
                                className="m-2 flex-1"
                              >
                                Erythrocyte Sedimentation Rate (esr):
                                <Input
                                  id={`esr_${index}`}
                                  defaultValue={item.esr}
                                  onChange={(e) =>
                                    handleInputChange(
                                      e,
                                      'esr',
                                      'investigations.CBC',
                                      null,
                                      index,
                                    )
                                  }
                                />
                              </label>
                              <label
                                htmlFor={`igE_${index}`}
                                className="m-2 flex-1"
                              >
                                Immunoglobulin E (igE):
                                <Input
                                  id={`igE_${index}`}
                                  defaultValue={item.igE}
                                  onChange={(e) =>
                                    handleInputChange(
                                      e,
                                      'igE',
                                      'investigations.CBC',
                                      null,
                                      index,
                                    )
                                  }
                                />
                              </label>
                            </div>
                          ),
                        )}
                         <div className='w-full h-[1px] bg-gray-900 rounded-full mt-1'></div>
                      </Form.Item>
                    )}

                    {editingPatient.investigations.urineRME && (
                      <Form.Item
                        label="Urine RME"
                        className="flex flex-col gap-3"
                      >
                        {editingPatient.investigations.urineRME.map(
                          (item, index) => (
                            <div key={index} className="grid grid-cols-3">
                              <label
                                htmlFor={`albumin_${index}`}
                                className="m-2 flex-1"
                              >
                                Albumin:
                                <Input
                                  id={`albumin_${index}`}
                                  defaultValue={item.albumin}
                                  onChange={(e) =>
                                    handleInputChange(
                                      e,
                                      'albumin',
                                      'investigations.urineRME',
                                      null,
                                      index,
                                    )
                                  }
                                />
                              </label>
                              <label
                                htmlFor={`pusCell_${index}`}
                                className="m-2 flex-1"
                              >
                                Pus Cell:
                                <Input
                                  id={`pusCell_${index}`}
                                  defaultValue={item.pusCell}
                                  onChange={(e) =>
                                    handleInputChange(
                                      e,
                                      'pusCell',
                                      'investigations.urineRME',
                                      null,
                                      index,
                                    )
                                  }
                                />
                              </label>
                              <label
                                htmlFor={`sugar_${index}`}
                                className="m-2 flex-1"
                              >
                                Sugar:
                                <Input
                                  id={`sugar_${index}`}
                                  defaultValue={item.sugar}
                                  onChange={(e) =>
                                    handleInputChange(
                                      e,
                                      'sugar',
                                      'investigations.urineRME',
                                      null,
                                      index,
                                    )
                                  }
                                />
                              </label>
                              <label
                                htmlFor={`cast_${index}`}
                                className="m-2 flex-1"
                              >
                                Cast:
                                <Input
                                  id={`cast_${index}`}
                                  defaultValue={item.cast}
                                  onChange={(e) =>
                                    handleInputChange(
                                      e,
                                      'cast',
                                      'investigations.urineRME',
                                      null,
                                      index,
                                    )
                                  }
                                />
                              </label>
                              <label
                                htmlFor={`ketoneBody_${index}`}
                                className="m-2 flex-1"
                              >
                                Ketone Body:
                                <Input
                                  id={`ketoneBody_${index}`}
                                  defaultValue={item.ketoneBody}
                                  onChange={(e) =>
                                    handleInputChange(
                                      e,
                                      'ketoneBody',
                                      'investigations.urineRME',
                                      null,
                                      index,
                                    )
                                  }
                                />
                              </label>
                              <label
                                htmlFor={`benceJonesProtein_${index}`}
                                className="m-2 flex-1"
                              >
                                Bence Jones Protein:
                                <Input
                                  id={`benceJonesProtein_${index}`}
                                  defaultValue={item.benceJonesProtein}
                                  onChange={(e) =>
                                    handleInputChange(
                                      e,
                                      'benceJonesProtein',
                                      'investigations.urineRME',
                                      null,
                                      index,
                                    )
                                  }
                                />
                              </label>
                            </div>
                          ),
                        )}
                            <div className='w-full h-[1px] bg-gray-900 rounded-full mt-1'></div>
                      </Form.Item>
                    )}

                    {editingPatient.investigations.serumElectrolyte && (
                      <Form.Item
                        label="Serum Electrolyte"
                        className="flex flex-col gap-3"
                      >
                        {editingPatient.investigations.serumElectrolyte.map(
                          (item, index) => (
                            <div key={index} className="flex flex-row gap-4">
                              <label
                                htmlFor={`na_${index}`}
                                className="m-2 flex-1"
                              >
                                Sodium (Na):
                                <Input
                                  id={`na_${index}`}
                                  defaultValue={item.na}
                                  onChange={(e) =>
                                    handleInputChange(
                                      e,
                                      'na',
                                      'investigations.serumElectrolyte',
                                      null,
                                      index,
                                    )
                                  }
                                />
                              </label>
                              <label
                                htmlFor={`k_${index}`}
                                className="m-2 flex-1"
                              >
                                Potassium (K):
                                <Input
                                  id={`k_${index}`}
                                  defaultValue={item.k}
                                  onChange={(e) =>
                                    handleInputChange(
                                      e,
                                      'k',
                                      'investigations.serumElectrolyte',
                                      null,
                                      index,
                                    )
                                  }
                                />
                              </label>
                              <label
                                htmlFor={`cl_${index}`}
                                className="m-2 flex-1"
                              >
                                Chloride (Cl):
                                <Input
                                  id={`cl_${index}`}
                                  defaultValue={item.cl}
                                  onChange={(e) =>
                                    handleInputChange(
                                      e,
                                      'cl',
                                      'investigations.serumElectrolyte',
                                      null,
                                      index,
                                    )
                                  }
                                />
                              </label>
                            </div>
                          ),
                        )}
                      </Form.Item>
                    )}
                    {editingPatient.investigations.investigation && (
                      <Form.Item label="Other Investigations">
                        {editingPatient.investigations.investigation.map(
                          (item, index) => (
                            <div key={index} className="flex flex-row gap-4">
                              <label
                                htmlFor={`nameOfInvestigations_${index}`}
                                className="m-2 flex-1"
                              >
                                Name of Investigation:
                                <Input
                                  id={`nameOfInvestigations_${index}`}
                                  defaultValue={item.nameOfInvestigations}
                                  onChange={(e) =>
                                    handleInputChange(
                                      e,
                                      'nameOfInvestigations',
                                      'investigations.investigation',
                                      null,
                                      index,
                                    )
                                  }
                                />
                              </label>
                              <label
                                htmlFor={`value_${index}`}
                                className="m-2 flex-1"
                              >
                                Value:
                                <Input
                                  id={`value_${index}`}
                                  defaultValue={item.value}
                                  onChange={(e) =>
                                    handleInputChange(
                                      e,
                                      'value',
                                      'investigations.investigation',
                                      null,
                                      index,
                                    )
                                  }
                                />
                              </label>
                              <label
                                htmlFor={`comments_${index}`}
                                className="m-2 flex-1"
                              >
                                Comments:
                                <Input
                                  id={`comments_${index}`}
                                  defaultValue={item.comments}
                                  onChange={(e) =>
                                    handleInputChange(
                                      e,
                                      'comments',
                                      'investigations.investigation',
                                      null,
                                      index,
                                    )
                                  }
                                />
                              </label>
                            </div>
                          ),
                        )}
                      </Form.Item>
                    )}
                  </>
                ) : (
                  <p>No investigation information available</p>
                )}
              </Panel>
            )}

            {editingPatient?.management && (
              <Panel header="Management" key="7">
                {editingPatient?.management ? (
                  <>
                    <Form.Item
                      label="Management"
                      className="flex flex-col gap-3"
                    >
                      {editingPatient?.management?.management?.map(
                        (item, index) => (
                          <div key={index} className="flex flex-row gap-4">
                            <div className="m-2 flex-1">
                              <label
                                htmlFor={`drug-name-${index}`}
                                className="mb-1 block"
                              >
                                Name of Drug
                              </label>
                              <Input
                                id={`drug-name-${index}`}
                                defaultValue={item.nameOfDrugs}
                                className="m-2 flex-1"
                                onChange={(e) =>
                                  handleInputChange(
                                    e,
                                    'nameOfDrugs',
                                    'management.management',
                                    null,
                                    index,
                                  )
                                }
                              />
                            </div>
                            <div className="m-2 flex-1">
                              <label
                                htmlFor={`duration-${index}`}
                                className="mb-1 block"
                              >
                                Duration
                              </label>
                              <Input
                                id={`duration-${index}`}
                                defaultValue={item.duration}
                                className="m-2 flex-1"
                                onChange={(e) =>
                                  handleInputChange(
                                    e,
                                    'duration',
                                    'management.management',
                                    null,
                                    index,
                                  )
                                }
                              />
                            </div>
                          </div>
                        ),
                      )}
                    </Form.Item>

                    <Form.Item label="Outcome">
                      <Input
                        defaultValue={editingPatient.management.outcome}
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            'outcome',
                            'management',
                            null,
                            null,
                          )
                        }
                      />
                    </Form.Item>
                  </>
                ) : (
                  <p>No management information available</p>
                )}
              </Panel>
            )}

            {formData.diagnosis && (
              <Panel header="Diagnosis" key="8">
                {formData.diagnosis.length > 0 ? (
                  <>
                    <Form.Item label="Diagnosis" className="flex flex-col gap-3">
                      {formData.diagnosis.map((item, index) => (
                       <div className='flex flex-col'>
                         <div key={index} className="flex flex-row gap-4">
                          <div className="m-2 flex-1">
                            <label htmlFor={`main-diagnosis-${index}`} className="mb-1 block">
                              Main Diagnosis
                            </label>
                            <Input
                              id={`main-diagnosis-${index}`}
                              value={item.mainDiagnosis}
                              onChange={(e) =>
                                handleInputChange(
                                  e,
                                  'mainDiagnosis',
                                  'diagnosis',
                                  null,
                                  index,
                                )
                              }
                              className="m-2 flex-1"
                            />
                          </div>
                          <div className="m-2 flex-1">
                            <label htmlFor={`comorbidities-${index}`} className="mb-1 block">
                              Comorbidities
                            </label>
                            <Input
                              id={`comorbidities-${index}`}
                              value={item.comorbidities}
                              onChange={(e) =>
                                handleInputChange(
                                  e,
                                  'comorbidities',
                                  'diagnosis',
                                  null,
                                  index,
                                )
                              }
                              className="m-2 flex-1"
                            />
                          </div>
                        </div>
                        <div className='w-full h-[1px] bg-gray-900 rounded-full mt-1'></div>
                       </div>
                      ))}
                      <Button onClick={() => addDiagnosis()} className='mt-2'>
                        Add Diagnosis
                      </Button>
                    </Form.Item>
                  </>
                ) : (
                  <p>No diagnosis information available</p>
                )}
              </Panel>
            )}
          </Collapse>
        </Form>
      )}
    </Modal>
  );
};

export default UpdatePatient;
