import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  Collapse,
  Spin,
  notification,
} from 'antd';
import moment from 'moment';
import { Typography } from 'antd';
const { Title } = Typography;

const { Panel } = Collapse;
const { Option } = Select;

import FieldArrayComponent from '../DaynamiceFrom/DaynamiceFrom';
import axios from 'axios';
import { CreatePatientUrl } from 'utils/urls/patient';
import useAdditionalData from 'hooks/useAdditionalData';

const AddPatient = () => {
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit, reset , watch} = useForm();
  const {
    chiefComplaints,
    pastIllnessData,
    personalHistoryData,
    clinicalExaminationName,
    clinicalExaminationFindings,
    cardiovascularSystemName,
    cardiovascularSystemFindings,
    respiratorySystemName,
    respiratorySystemFindings,
    abdomenName,
    abdomenFindings,
    neurologicalExaminationName,
    neurologicalExaminationFindings,
    locomotorSystemName,
    locomotorSystemFindings,
    thyroidGlandName,
    thyroidGlandFindings,
    otherExaminationName,
    otherExaminationFindings,
    nameOfInvestigations,
    findingsOfInvestigations,
    comorbiditiesDiagnosisData,
    managementOutcomeData,
  } = useAdditionalData()

  const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
      message: message,
      description: description,
    });
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      data.bmi = {
        height: height,
        weight: weight,
        value: bmi,
        category: bmiCategory,
      };
      const response = await axios.post(CreatePatientUrl, data);
      if (response.data.success) {
        openNotificationWithIcon(
          'success',
          'Submission Successful',
          'The patient information has been successfully submitted.',
        );
        reset();
      } else {
        openNotificationWithIcon(
          'error',
          'Submission Failed',
          'There was an error submitting the patient information. Please try again.',
        );
      }
    } catch (error) {
      openNotificationWithIcon(
        'error',
        'Submission Failed',
        'There was an error submitting the patient information. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [thanas, setThanas] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');

  useEffect(() => {
    axios.get('https://bdapis.com/api/v1.2/divisions')
      .then(response => {
        setDivisions(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching divisions:', error);
      });
  }, []);

  useEffect(() => {
    if (selectedDivision) {
      axios.get(`https://bdapis.com/api/v1.2/division/${selectedDivision}`)
        .then(response => {
          setDistricts(response.data.data);
        })
        .catch(error => {
          console.error('Error fetching districts:', error);
        });
    }
  }, [selectedDivision]);

  useEffect(() => {
    if (selectedDistrict) {
      axios.get(`https://bdapis.com/api/v1.2/district/${selectedDistrict}`)
        .then(response => {
          setThanas(response.data.data.upazillas || []);
        })
        .catch(error => {
          console.error('Error fetching thanas:', error);
        });
    }
  }, [selectedDistrict]);

  const height = watch('bmi.height');
  const weight = watch('bmi.weight');

  const calculateBMI = (height, weight) => {
    if (!height || !weight) return null;
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    return bmi.toFixed(1);
  };

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return 'Underweight';
    if (bmi >= 18.5 && bmi <= 24.9) return 'Normal Weight';
    if (bmi >= 25 && bmi <= 29.9) return 'Overweight';
    if (bmi >= 30 && bmi <= 34.9) return 'Obesity grade 1 (low risk)';
    if (bmi >= 35 && bmi <= 39.9) return 'Grade 2 obesity (moderate risk)';
    if (bmi >= 40 && bmi <= 49.9) return 'Grade 3 obesity (high risk, morbid obesity)';
    if (bmi >= 50) return 'Grade 4 obesity (extreme obesity)';
    return '';
  };

  const bmi = calculateBMI(height, weight);
  const bmiCategory = getBMICategory(bmi);

  return (
    <Form
      layout="vertical"
      className="mx-auto"
      onFinish={handleSubmit(onSubmit)}
    >
      <Collapse defaultActiveKey={['1', '2', '8', '9']}>

      <Panel header="Patient Information" key="1">
          <div className="flex w-full flex-col gap-6 lg:flex-row">
            <Form.Item label="Name" className="w-full">
              <Controller
                name="patientInformation.name"
                control={control}
                rules={{ required: "Name is required" }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Input
                      {...field}
                      className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none"
                    />
                    {error && <p className="text-red-500">{error.message}</p>}
                  </>
                )}
              />
            </Form.Item>
            <Form.Item label="Registration No" className="w-full">
              <Controller
                name="patientInformation.registrationNo"
                control={control}
                rules={{ required: "Registration No is required" }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Input
                      {...field}
                      className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none"
                    />
                    {error && <p className="text-red-500">{error.message}</p>}
                  </>
                )}
              />
            </Form.Item>
            <Form.Item label="Phone Number" className="w-full">
              <Controller
                name="patientInformation.phoneNumber"
                control={control}
                rules={{ required: "Phone Number is required" }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Input
                      {...field}
                      className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none"
                    />
                  </>
                )}
              />
            </Form.Item>
          </div>

          <div className="flex w-full flex-col gap-6 lg:flex-row">
            <Form.Item label="Marital Status" className="w-full">
              <Controller
                name="patientInformation.maritalStatus"
                control={control}
                rules={{ required: "Marital Status is required" }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Select
                      {...field}
                      placeholder="Select Marital Status"
                      className="mt-2 flex h-12 w-full items-center justify-center rounded-xl bg-white/0 text-sm outline-none"
                    >
                      <Option className="" value="Single">
                        Single
                      </Option>
                      <Option className="" value="Married">
                        Married
                      </Option>
                    </Select>
                  </>
                )}
              />
            </Form.Item>
            <Form.Item label="Occupation" className="w-full">
              <Controller
                name="patientInformation.occupation"
                control={control}
                rules={{ required: "Occupation is required" }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Input
                      {...field}
                      className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none"
                    />
                  </>
                )}
              />
            </Form.Item>
            <Form.Item label="Age" className="w-full">
              <Controller
                name="patientInformation.age"
                control={control}
                rules={{ required: "Age is required" }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Input
                      {...field}
                      className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none"
                    />
                  </>
                )}
              />
            </Form.Item>
          </div>

          <div className="flex w-full flex-col gap-6 lg:flex-row">
            <Form.Item label="Gender" className="w-full">
              <Controller
                name="patientInformation.sex"
                control={control}
                rules={{ required: "Gender is required" }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Select
                      placeholder="Select Gender"
                      {...field}
                      className="mt-2 flex h-12 w-full items-center justify-center rounded-xl bg-white/0 text-sm outline-none"
                    >
                      <Option value="Male">Male</Option>
                      <Option value="Female">Female</Option>
                      <Option value="Other">Other</Option>
                    </Select>
                  </>
                )}
              />
            </Form.Item>

            <Form.Item label="Division" className="w-full">
              <Controller
                name="patientInformation.division"
                control={control}
                rules={{ required: "Division is required" }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Select
                      {...field}
                      className="mt-2 flex h-12 w-full items-center justify-center rounded-xl bg-white/0 text-sm outline-none"
                      onChange={(value) => {
                        setSelectedDivision(value);
                        field.onChange(value);
                      }}
                    >
                      {divisions.map((division) => (
                        <Option key={division.division} value={division.division}>
                          {division.division}
                        </Option>
                      ))}
                    </Select>
                  </>
                )}
              />
            </Form.Item>
            <Form.Item label="District" className="w-full">
              <Controller
                name="patientInformation.district"
                control={control}
                rules={{ required: "District is required" }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Select
                      {...field}
                      className="mt-2 flex h-12 w-full items-center justify-center rounded-xl bg-white/0 text-sm outline-none"
                      onChange={(value) => {
                        setSelectedDistrict(value);
                        field.onChange(value);
                      }}
                      disabled={!selectedDivision}
                    >
                      {districts.map((district) => (
                        <Option key={district.district} value={district.district}>
                          {district.district}
                        </Option>
                      ))}
                    </Select>
                    
                  </>
                )}
              />
            </Form.Item>
          </div>

          <div className="flex w-full flex-col gap-6 lg:flex-row">
            <Form.Item label="Thana/Upazila" className="w-full">
              <Controller
                name="patientInformation.thana"
                control={control}
                rules={{ required: "Thana/Upazila is required" }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Select
                      {...field}
                      className="mt-2 flex h-12 w-full items-center justify-center rounded-xl bg-white/0 text-sm outline-none"
                      disabled={!selectedDistrict}
                    >
                      {thanas.map((thana) => (
                        <Option key={thana} value={thana}>
                          {thana}
                        </Option>
                      ))}
                    </Select>
                    
                  </>
                )}
              />
            </Form.Item>
            <Form.Item label="Address Details" className="w-full">
              <Controller
                name="patientInformation.addressDetails"
                control={control}
                rules={{ required: "Address Details are required" }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Input
                      {...field}
                      className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none"
                    />
                  </>
                )}
              />
            </Form.Item>
            <Form.Item label="Admission Unit" className="w-full">
              <Controller
                name="patientInformation.admissionUnit"
                control={control}
                rules={{ required: "Admission Unit is required" }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Input
                      {...field}
                      className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none"
                    />
                  </>
                )}
              />
            </Form.Item>
          </div>
      

          <div className="flex w-full flex-col gap-6 lg:flex-row">
            <Form.Item label="Admission Date" className="w-full">
              <Controller
                name="patientInformation.admissionDate"
                control={control}
                rules={{ required: "Admission Date is required" }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <DatePicker
                      className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none"
                      {...field}
                      format="YYYY-MM-DD"
                      onChange={(date) =>
                        field.onChange(date ? date.toISOString() : null)
                      }
                      value={field.value ? moment(field.value) : null}
                    />
                  </>
                )}
              />
            </Form.Item>

            <Form.Item label="Release Date" className="w-full">
              <Controller
                name="patientInformation.releaseDate"
                control={control}
                rules={{ required: "Release Date is required" }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <DatePicker
                      className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none"
                      {...field}
                      format="YYYY-MM-DD"
                      onChange={(date) =>
                        field.onChange(date ? date.toISOString() : null)
                      }
                      value={field.value ? moment(field.value) : null}
                    />
                  </>
                )}
              />
            </Form.Item>

            <Form.Item label="Hospital Stay" className="w-full">
              <Controller
                name="patientInformation.hospitalStay"
                control={control}
                rules={{ required: "Hospital Stay is required" }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Input
                      {...field}
                      className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none"
                    />
                  </>
                )}
              />
            </Form.Item>
          </div>
        </Panel>

        <Panel header="BMI" key="2">
        <div className="flex w-full flex-col gap-6 lg:flex-row">
          <Form.Item label="Height (cm)" className="w-full">
              <Controller
                name="bmi.height"
                control={control}
                rules={{ required: "Height is required" }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Input
                      type="number"
                      {...field}
                      className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none"
                    />
                    {error && <p className="text-red-500">{error.message}</p>}
                  </>
                )}
              />
            </Form.Item>

            <Form.Item label="Weight (kg)" className="w-full">
              <Controller
                name="bmi.weight"
                control={control}
                rules={{ required: "Weight is required" }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Input
                      type="number"
                      {...field}
                      className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none"
                    />
                    {error && <p className="text-red-500">{error.message}</p>}
                  </>
                )}
              />
            </Form.Item>
            <Form.Item label="BMI" className="w-full">
              <Input
                value={bmi || ''}
                disabled
                className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none"
              />
              <Typography.Text>
                {bmiCategory ? `Category: ${bmiCategory}` : ''}
              </Typography.Text>
            </Form.Item>
          </div>
        </Panel>

        <Panel header="Chief Complaints" key="3">
          <FieldArrayComponent
            control={control}
            name="chiefComplaints"
            addButton={'Chief Complaints'}
            fields={[{ complaints: '', duration: '' }]}
            labels={{
              complaints: 'Complaints',
              duration: 'Duration',
            }}
            filedType={{
              complaints: {
                type: 'select',
                options: chiefComplaints?.map((item) => ({
                  value: item?.value,
                  label: item?.value,
                })),
              },
              duration: { type: 'input' },
            }}
          />
        </Panel>

        <Panel header="About Illness" key="3">
          <Title level={3} style={{ color: '#3572EF' }} className="my-2  text-center">
            History Of Past Illness
          </Title>
          <hr className="mb-2" />
          <FieldArrayComponent
            control={control}
            name="aboutIllness.historyOfPastIllness"
            addButton={'History Of Past Illness'}
            fields={[{ historyOfPastIllness: '', duration: '' }]}
            labels={{
              historyOfPastIllness: 'History Of Past Illness',
              duration: 'Duration',
            }}
            filedType={{
              historyOfPastIllness: {
                type: 'select',
                options: pastIllnessData?.map((item) => ({
                  value: item?.value,
                  label: item?.value,
                })),
              },
              duration: { type: 'input' },
            }}
          />

          <Title level={3} style={{ color: '#3572EF' }} className="my-2  text-center">
            Personal History
          </Title>
          <hr className="mb-2" />
          <FieldArrayComponent
            control={control}
            name="aboutIllness.personalHistory"
            addButton={'Personal History'}
            fields={[{ personalHistory: '', duration: '' }]}
            labels={{
              personalHistory: 'Personal History',
              duration: 'Duration',
            }}
            filedType={{
              personalHistory: {
                type: 'select',
                options: personalHistoryData?.map((item) => ({
                  value: item?.value,
                  label: item?.value,
                })),
              },
              duration: { type: 'input' },
            }}
          />

          <Title level={3} style={{ color: '#3572EF' }} className="my-2  text-center">
            Treatment History
          </Title>
          <hr className="mb-2" />

          <FieldArrayComponent
            control={control}
            name="aboutIllness.treatmentHistory"
            addButton={'Drugs Name'}
            fields={[{ drugsName: '', duration: '' }]}
            filedType={{
              drugsName: { type: 'input' },
              duration: { type: 'input' },
            }}
            labels={{ drugsName: 'Drugs Name', duration: 'Duration' }}
          />

          <div className="flex w-full flex-col gap-6 lg:flex-row">
            <Form.Item label="History Of Present Illness" className="w-full">
              <Controller
                name="aboutIllness.historyOfPresentIllness"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none"
                  />
                )}
              />
            </Form.Item>
            <Form.Item label="Others" className="w-full">
              <Controller
                name="aboutIllness.others"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none"
                  />
                )}
              />
            </Form.Item>
          </div>
        </Panel>

        <Panel header="General Examination" key="4">
          <Title level={3} style={{ color: '#3ABEF9' }} className="my-2 text-center">
            Vital Signs
          </Title>
          <hr className="mb-2" />
          <FieldArrayComponent
            control={control}
            name="generalExamination.vitalSigns"
            addButton={'Vital Signs'}
            fields={[
              {
                tempFahrenheit: '',
                pulsePerMin: '',
                respiratoryRatePerMin: '',
                bloodPressure: '',
                spo2: '',
              },
            ]}
            labels={{
              tempFahrenheit: 'Temperature (F)',
              pulsePerMin: 'Pulse (Per Min)',
              respiratoryRatePerMin: 'Respiratory Rate (Per Min)',
              bloodPressure: 'Blood Pressure',
              spo2: 'SpO2',
            }}
            filedType={{
              tempFahrenheit: { type: 'input' },
              pulsePerMin: { type: 'input' },
              respiratoryRatePerMin: { type: 'input' },
              bloodPressure: { type: 'input' },
            }}
          />
          <Title level={3} style={{ color: '#3ABEF9' }} className="my-2 text-center">
            Clinical Examination
          </Title>
          <hr className="mb-2" />
          <FieldArrayComponent
            control={control}
            name="generalExamination.clinicalExamination"
            addButton={'Clinical Examination'}
            fields={[
              {
                name: '',
                findings: '',
                comments: '',
              },
            ]}
            labels={{
              name: 'Name',
              findings: 'Findings',
              comments: 'Comments',
            }}
            filedType={{
              name: {
                type: 'select',
                options: clinicalExaminationName?.map((item) => ({
                  value: item?.value,
                  label: item?.value,
                })),
              },
              findings: {
                type: 'select',
                options: clinicalExaminationFindings?.map((item) => ({
                  value: item?.value,
                  label: item?.value,
                })),
              },
              comments: { type: 'input' },
            }}
          />
        </Panel>

        <Panel header="Systemic Examination" key="5">
          <Title level={3} style={{ color: '#4D869C' }} className="my-2 text-center">
            Cardiovascular system:{' '}
          </Title>
          <hr className="mb-2" />
          <FieldArrayComponent
            control={control}
            addButton={'Cardiovascular System'}
            name="systemicExamination.cardiovascularSystem"
            fields={[
              {
                name: '',
                findings: '',
                comments: '',
              },
            ]}
            labels={{
              name: 'Name',
              findings: 'Findings',
              comments: 'Comments',
            }}
            filedType={{
              name: {
                type: 'select',
                options: cardiovascularSystemName?.map((item) => ({
                  value: item?.value,
                  label: item?.value,
                })),
              },
              findings: {
                type: 'select',
                options: cardiovascularSystemFindings?.map((item) => ({
                  value: item?.value,
                  label: item?.value,
                })),
              },
              comments: { type: 'input' },
            }}
          />

          <Title level={3} style={{ color: '#4D869C' }} className="my-2 text-center">
            Respiratory system:{' '}
          </Title>
          <hr className="mb-2" />
          <FieldArrayComponent
            control={control}
            name="systemicExamination.respiratorySystem"
            addButton={'Respiratory System'}
            fields={[
              {
                name: '',
                findings: '',
                comments: '',
              },
            ]}
            labels={{
              name: 'Name',
              findings: 'Findings',
              comments: 'Comments',
            }}
            filedType={{
              name: {
                type: 'select',
                options: respiratorySystemName?.map((item) => ({
                  value: item?.value,
                  label: item?.value,
                })),
              },
              findings: {
                type: 'select',
                options: respiratorySystemFindings?.map((item) => ({
                  value: item?.value,
                  label: item?.value,
                })),
              },
              comments: { type: 'input' },
            }}
          />

          <Title level={3} style={{ color: '#4D869C' }} className="my-2 text-center">
            Abdomen:{' '}
          </Title>
          <hr className="mb-2" />
          <FieldArrayComponent
            control={control}
            name="systemicExamination.abdomen"
            addButton={'Abdomen'}
            fields={[
              {
                name: '',
                findings: '',
                comments: '',
              },
            ]}
            labels={{
              name: 'Name',
              findings: 'Findings',
              comments: 'Comments',
            }}
            filedType={{
              name: {
                type: 'select',
                options: abdomenName?.map((item) => ({
                  value: item?.value,
                  label: item?.value,
                })),
              },
              findings: {
                type: 'select',
                options: abdomenFindings?.map((item) => ({
                  value: item?.value,
                  label: item?.value,
                })),
              },
              comments: { type: 'input' },
            }}
          />

          <Title level={3} style={{ color: '#4D869C' }} className="my-2 text-center">
            Neurological Examination:{' '}
          </Title>
          <hr className="mb-2" />
          <FieldArrayComponent
            control={control}
            name="systemicExamination.neurologicalExamination"
            addButton={'Neurological Examination'}
            fields={[
              {
                name: '',
                findings: '',
                comments: '',
              },
            ]}
            labels={{
              name: 'Name',
              findings: 'Findings',
              comments: 'Comments',
            }}
            filedType={{
              name: {
                type: 'select',
                options: neurologicalExaminationName?.map((item) => ({
                  value: item?.value,
                  label: item?.value,
                })),
              },
              findings: {
                type: 'select',
                options: neurologicalExaminationFindings?.map((item) => ({
                  value: item?.value,
                  label: item?.value,
                })),
              },
              comments: { type: 'input' },
            }}
          />

          <Title level={3} style={{ color: '#4D869C' }} className="my-2 text-center">
            Locomotor system:{' '}
          </Title>
          <hr className="mb-2" />
          <FieldArrayComponent
            control={control}
            name="systemicExamination.locomotorSystem"
            addButton={'Locomotor System'}
            fields={[
              {
                name: '',
                findings: '',
                comments: '',
              },
            ]}
            labels={{
              name: 'Name',
              findings: 'Findings',
              comments: 'Comments',
            }}
            filedType={{
              name: {
                type: 'select',
                options: locomotorSystemName?.map((item) => ({
                  value: item?.value,
                  label: item?.value,
                })),
              },
              findings: {
                type: 'select',
                options: locomotorSystemFindings?.map((item) => ({
                  value: item?.value,
                  label: item?.value,
                })),
              },
              comments: { type: 'input' },
            }}
          />

          <Title level={3} style={{ color: '#4D869C' }} className="my-2 text-center">
            Thyroid gland:{' '}
          </Title>
          <hr className="mb-2" />
          <FieldArrayComponent
            control={control}
            name="systemicExamination.thyroidGland"
            addButton={'Thyroid Gland'}
            fields={[
              {
                name: '',
                findings: '',
                comments: '',
              },
            ]}
            labels={{
              name: 'Name',
              findings: 'Findings',
              comments: 'Comments',
            }}
            filedType={{
              name: {
                type: 'select',
                options: thyroidGlandName?.map((item) => ({
                  value: item?.value,
                  label: item?.value,
                })),
              },
              findings: {
                type: 'select',
                options: thyroidGlandFindings?.map((item) => ({
                  value: item?.value,
                  label: item?.value,
                })),
              },
              comments: { type: 'input' },
            }}
          />

          <Title level={3} style={{ color: '#4D869C' }} className="my-2 text-center">
            Other examination:{' '}
          </Title>
          <hr className="mb-2" />
          <FieldArrayComponent
            control={control}
            name="systemicExamination.otherExamination"
            addButton={'Other Examination'}
            fields={[
              {
                name: '',
                findings: '',
                comments: '',
              },
            ]}
            labels={{
              name: 'Name',
              findings: 'Findings',
              comments: 'Comments',
            }}
            filedType={{
              name: {
                type: 'select',
                options: otherExaminationName?.map((item) => ({
                  value: item?.value,
                  label: item?.value,
                })),
              },
              findings: {
                type: 'select',
                options: otherExaminationFindings?.map((item) => ({
                  value: item?.value,
                  label: item?.value,
                })),
              },
              comments: { type: 'input' },
            }}
          />
        </Panel>

        <Panel header="Investigations" key="6">
          <Title level={3} style={{ color: '#9681EB' }} className="my-2 text-center">
            CBC
          </Title>
          <hr className="mb-2" />
          <FieldArrayComponent
            control={control}
            name="investigations.CBC"
            addButton={'CBC'}
            fields={[
              {
                hb: '',
                plateletCount: '',
                hct: '',
                tc: '',
                p: '',
                l: '',
                reticulocyteCount: '',
                m: '',
                b: '',
                mcv: '',
                totalCirEosinophilCount: '',
                esr: '',
                igE: '',
              },
            ]}
            labels={{
              hb: 'Hb gm/dl',
              plateletCount: 'Platelet Count /cmm',
              hct: 'Hct %',
              tc: 'TC /cmm',
              p: 'P %',
              l: 'L %',
              reticulocyteCount: 'Reticulocyte count %',
              m: 'M %',
              b: 'B %',
              mcv: 'MCV fl',
              totalCirEosinophilCount: 'Total cir. Eosinophil count /cmm',
              esr: 'ESR mm/1st hour',
              igE: 'IgE (total)',
            }}
            filedType={{
              hb: { type: 'input' },
              plateletCount: { type: 'input' },
              hct: { type: 'input' },
              tc: { type: 'input' },
              p: { type: 'input' },
              l: { type: 'input' },
              reticulocyteCount: { type: 'input' },
              m: { type: 'input' },
              b: { type: 'input' },
              mcv: { type: 'input' },
              totalCirEosinophilCount: { type: 'input' },
              esr: { type: 'input' },
              igE: { type: 'input' },
            }}
          />

          <Title level={3} style={{ color: '#9681EB' }} className="my-2 text-center">
            Urine RME
          </Title>
          <hr className="mb-2" />
          <FieldArrayComponent
            control={control}
            name="investigations.urineRME"
            addButton={'Urine RME'}
            fields={[
              {
                albumin: '',
                pusCell: '',
                sugar: '',
                cast: '',
                ketoneBody: '',
                benceJonesProtein: '',
              },
            ]}
            labels={{
              albumin: 'Albumin',
              pusCell: 'Pus Cell',
              sugar: 'Sugar',
              cast: 'Cast',
              ketoneBody: 'Ketone Body',
              benceJonesProtein: 'Bence Jones Protein',
            }}
            filedType={{
              albumin: { type: 'input' },
              pusCell: { type: 'input' },
              sugar: { type: 'input' },
              cast: { type: 'input' },
              ketoneBody: { type: 'input' },
              benceJonesProtein: { type: 'input' },
            }}
          />

          <Title level={3} style={{ color: '#9681EB' }} className="my-2 text-center">
            Serum Electrolyte
          </Title>
          <hr className="mb-2" />
          <FieldArrayComponent
            control={control}
            name="investigations.serumElectrolyte"
            addButton={'Serum Electrolyte'}
            fields={[
              {
                na: '',
                k: '',
                cl: '',
              },
            ]}
            labels={{
              na: 'Na+',
              k: 'K+',
              cl: 'Cl-',
            }}
            filedType={{
              na: { type: 'input' },
              k: { type: 'input' },
              cl: { type: 'input' },
            }}
          />

          <Title level={3} style={{ color: '#9681EB' }} className="my-2 text-center">
            Investigations
          </Title>
          <hr className="mb-2" />

          <FieldArrayComponent
            control={control}
            name="investigations.investigations"
            addButton={'Investigations'}
            fields={[
              {
                nameOfInvestigations: '',
                value: '',
                comments: '',
              },
            ]}
            labels={{
              nameOfInvestigations: 'Name  of investigations ',
              value: 'Value',
              comments: 'Comments',
            }}
            filedType={{
              nameOfInvestigations: {
                type: 'select',
                options: nameOfInvestigations?.map((item) => ({
                  value: item?.value,
                  label: item?.value,
                })),
              },
              value: {
                type: 'input',
              },
              comments: {
                type: 'select',
                options: findingsOfInvestigations?.map((item) => ({
                  value: item?.value,
                  label: item?.value,
                })),
              },
            }}
          />
        </Panel>

        <Panel header="Procedure Study" key="7">
          <Title level={3} style={{ color: '#394867' }} className="my-2 text-center">
            Echocardiogram:{' '}
          </Title>
          <hr className="mb-2" />
          <FieldArrayComponent
            control={control}
            addButton={'Procedure Study'}
            name="investigations.procedureStudy.echocardiogram"
            fields={[
              {
                rwma: '',
                lvh: '',
                vegetation: '',
                lvidd: '',
                ef: '',
                pericardialEffusion: '',
                valvularDisease: '',
                pasp: '',
              },
            ]}
            labels={{
              rwma: 'RWMA',
              lvh: 'LVH',
              vegetation: 'Vegetation',
              lvidd: 'LVIDd',
              ef: 'EF %',
              pericardialEffusion: 'Pericardial effusion ',
              valvularDisease: 'Valvular disease',
              pasp: 'PASP %',
            }}
            filedType={{
              rwma: { type: 'input' },
              lvh: { type: 'input' },
              vegetation: { type: 'input' },
              lvidd: { type: 'input' },
              ef: { type: 'input' },
              pericardialEffusion: { type: 'input' },
              valvularDisease: { type: 'input' },
              pasp: { type: 'input' },
            }}
          />

          <Title style={{ color: '#394867' }} level={3} className="my-2 text-center">
            Plural Fluid study:{' '}
          </Title>
          <hr className="mb-2" />

          <FieldArrayComponent
            control={control}
            name="investigations.procedureStudy.pluralFluidStudy"
            addButton={'Plural Fluid Study'}
            fields={[
              {
                polymorph: '',
                lymphocytes: '',
                malignantCell: '',
                protein: '',
                glucose: '',
                ada: '',
              },
            ]}
            labels={{
              polymorph: 'Polymorph',
              lymphocytes: 'Lymphocytes',
              malignantCell: 'Malignant Cell',
              protein: 'Protein',
              glucose: 'Glucose',
              ada: 'ADA',
            }}
            filedType={{
              polymorph: { type: 'input' },
              lymphocytes: { type: 'input' },
              malignantCell: { type: 'input' },
              protein: { type: 'input' },
              glucose: { type: 'input' },
              ada: { type: 'input' },
            }}
          />

          <Title level={3} style={{ color: '#394867' }} className="my-2 text-center">
            CSF Study:{' '}
          </Title>
          <hr className="mb-2" />
          <FieldArrayComponent
            control={control}
            name="investigations.procedureStudy.csfStudy"
            addButton={'CSF Study'}
            fields={[
              {
                polymorph: '',
                lymphocytes: '',
                malignantCell: '',
                protein: '',
                glucose: '',
                ada: '',
                oligoclonalBand: '',
              },
            ]}
            labels={{
              polymorph: 'Polymorph',
              lymphocytes: 'Lymphocytes',
              malignantCell: 'Malignant Cell',
              protein: 'Protein',
              glucose: 'Glucose',
              ada: 'ADA',
              oligoclonalBand: 'Oligoclonal Band',
            }}
            filedType={{
              polymorph: { type: 'input' },
              lymphocytes: { type: 'input' },
              malignantCell: { type: 'input' },
              protein: { type: 'input' },
              glucose: { type: 'input' },
              ada: { type: 'input' },
              oligoclonalBand: { type: 'input' },
            }}
          />

          <Title level={3} style={{ color: '#394867' }} className="my-2 text-center">
            Ascitic Fluid Study:{' '}
          </Title>
          <hr className="mb-2" />
          <FieldArrayComponent
            control={control}
            name="investigations.procedureStudy.asciticFluidStudy"
            addButton={'Ascitic Fluid Study'}
            fields={[
              {
                polymorph: '',
                lymphocytes: '',
                malignantCell: '',
                protein: '',
                glucose: '',
                ada: '',
                saag: '',
              },
            ]}
            labels={{
              polymorph: 'Polymorph',
              lymphocytes: 'Lymphocytes',
              malignantCell: 'Malignant Cell',
              protein: 'Protein',
              glucose: 'Glucose',
              ada: 'ADA',
              saag: 'SAAG',
            }}
            filedType={{
              polymorph: { type: 'input' },
              lymphocytes: { type: 'input' },
              malignantCell: { type: 'input' },
              protein: { type: 'input' },
              glucose: { type: 'input' },
              ada: { type: 'input' },
              saag: { type: 'input' },
            }}
          />

          <Title level={3} style={{ color: '#394867' }} className="my-2 text-center">
            Synovial Fluid Study:{' '}
          </Title>
          <hr className="mb-2" />
          <FieldArrayComponent
            control={control}
            name="investigations.procedureStudy.synovialFluidStudy"
            addButton={'Synovial Fluid Study'}
            fields={[
              {
                polymorph: '',
                lymphocytes: '',
                malignantCell: '',
                protein: '',
                glucose: '',
                ada: '',
              },
            ]}
            labels={{
              polymorph: 'Polymorph',
              lymphocytes: 'Lymphocytes',
              malignantCell: 'Malignant Cell',
              protein: 'Protein',
              glucose: 'Glucose',
              ada: 'ADA',
            }}
            filedType={{
              polymorph: { type: 'input' },
              lymphocytes: { type: 'input' },
              malignantCell: { type: 'input' },
              protein: { type: 'input' },
              glucose: { type: 'input' },
              ada: { type: 'input' },
            }}
          />
        </Panel>

        <Panel header="Diagnosis" key="8">
          <FieldArrayComponent
            control={control}
            name="diagnosis"
            addButton={'Diagnosis'}
            fields={[{ mainDiagnosis: '', comorbidities: '' }]}
            labels={{
              mainDiagnosis: 'Main Diagnosis',
              comorbidities: 'Comorbidities',
            }}
            filedType={{
              mainDiagnosis: { type: 'input' },
              comorbidities: {
                type: 'select',
                options: comorbiditiesDiagnosisData?.map((item) => ({
                  value: item?.value,
                  label: item?.value,
                })),
              },
            }}
          />
        </Panel>

        <Panel header="Management" key="9">
          <FieldArrayComponent
            control={control}
            name="management.management"
            addButton={'Management'}
            fields={[{ nameOfDrugs: '', duration: '' }]}
            labels={{
              nameOfDrugs: 'Name of drugs',
              duration: 'Duration',
            }}
            filedType={{
              nameOfDrugs: { type: 'input' },
              duration: { type: 'input' },
            }}
          />

          <Form.Item label="Outcome" className="w-full">
            <Controller
              name="management.outcome"
              control={control}
              render={({ field }) => (
                <Select
                  placeholder="Select Outcome"
                  {...field}
                  className="mt-2 flex h-12 w-full items-center justify-center rounded-xl bg-white/0 text-sm outline-none"
                >
                  {managementOutcomeData?.map((item, index) => {
                    return (
                      <Option key={index} value={item?.value}>
                        {item?.value}
                      </Option>
                    );
                  })}
                </Select>
              )}
            />
          </Form.Item>
        </Panel>
      </Collapse>

      <Form.Item className="my-6">
        <button
          className="px-6 py-2 rounded bg-green-500 text-2xl"
          disabled={loading}
        >
          {loading ? <Spin /> : 'Submit'}
        </button>
      </Form.Item>
    </Form>
  );
};

export default AddPatient;
