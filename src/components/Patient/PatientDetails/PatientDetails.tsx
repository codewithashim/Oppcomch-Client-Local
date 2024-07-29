import Image from 'next/image';
import React, { useRef } from 'react';
import { Button, Typography, Row, Col, Divider } from 'antd';
import { PrinterOutlined } from '@ant-design/icons';
import ReactToPrint from 'react-to-print';
import { MainLoog } from 'asects';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const { Title, Text } = Typography;
const PatientDetails = ({ patientData }: any) => {
  console.log(patientData, 'patientData');

  const componentRef = useRef(null);
  const printRef = useRef();

  const generatePDF = async () => {
    const content = printRef.current;

    const canvas = await html2canvas(content);
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    // Add the captured image
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

    // Set initial y position for additional content
    let y = pdfHeight + 10;
    const margin = 10;

    // Helper function to add text with custom styling
    const addText = (text, x, fontSize = 10, fontStyle = 'normal', color = '#000000') => {
      pdf.setFont('helvetica', fontStyle);
      pdf.setFontSize(fontSize);
      pdf.setTextColor(color);
      pdf.text(text, x, y);
      y += fontSize / 2 + 2; // Increase y for next line
    };

    // Helper function to add a new page if needed
    const checkPageSpace = (currentY, requiredSpace) => {
      if (currentY + requiredSpace > pdf.internal.pageSize.getHeight() - margin) {
        pdf.addPage();
        return margin;
      }
      return currentY;
    };

    // Helper function to add a line
    const addLine = (currentY) => {
      pdf.line(10, currentY, pdfWidth - 10, currentY);
      return currentY + 5;
    };

    // Start adding the content with check for page space
    y = addLine(y);

    // Add Patient Information title
    y = checkPageSpace(y, 20);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(14);
    pdf.text('Patient Information', pdfWidth / 2, y, { align: 'center' });
    y += 10;

    // Define column widths and positions
    const colWidth = pdfWidth / 2 - 15;
    const col1X = 10;
    const col2X = pdfWidth / 2 + 5;

    // Reset y for columns
    const startY = y;
    let y1 = startY;
    let y2 = startY;

    // Helper function to add a field
    const addField = (label, value, column) => {
      const x = column === 1 ? col1X : col2X;
      let yPos = column === 1 ? y1 : y2;

      yPos = checkPageSpace(yPos, 8);

      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(10);
      pdf.text(label, x, yPos);

      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      pdf.text(value || 'N/A', x + 30, yPos);

      if (column === 1) {
        y1 = yPos + 8;
      } else {
        y2 = yPos + 8;
      }
    };

    // Add fields to columns
    addField('Name:', patientData?.patientInformation?.name, 1);
    addField('Registration No:', patientData?.patientInformation?.registrationNo, 1);
    addField('Phone Number:', patientData?.patientInformation?.phoneNumber, 1);
    addField('Occupation:', patientData?.patientInformation?.occupation, 1);
    addField('Marital Status:', patientData?.patientInformation?.maritalStatus, 1);
    addField('Age:', patientData?.patientInformation?.age, 1);
    addField('Sex:', patientData?.patientInformation?.sex, 1);

    addField('Division:', patientData?.patientInformation?.division, 2);
    addField('District:', patientData?.patientInformation?.district, 2);
    addField('Admission Unit:', patientData?.patientInformation?.admissionUnit, 2);
    addField('Address Details:', patientData?.patientInformation?.addressDetails, 2);
    addField('Admission Date:', new Date(patientData?.patientInformation?.admissionDate).toLocaleDateString(), 2);
    addField('Release Date:', new Date(patientData?.patientInformation?.releaseDate).toLocaleDateString(), 2);
    addField('Hospital Stay:', `${patientData?.patientInformation?.hospitalStay} days`, 2);
addField('BMI:', `${patientData?.bmi?.value} (${patientData?.bmi?.category})`, defaultValue);

    // Set y to the bottom of the longest column
    y = Math.max(y1, y2) + 10;
    y = addLine(y);

    // Add Chief Complaints title
    y = checkPageSpace(y, 20);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(14);
    pdf.text('Chief Complaints', pdfWidth / 2, y, { align: 'center' });
    y += 10;

    // Add Chief Complaints
    patientData?.chiefComplaints?.forEach((complaint) => {
      y = checkPageSpace(y, 8);
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(12);
      pdf.text(`${complaint.complaints} - Duration: ${complaint.duration} days`, 10, y);
      y += 8;
    });

    y = addLine(y);

    // Add About Illness title
    y = checkPageSpace(y, 20);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(14);
    pdf.text('About Illness', pdfWidth / 2, y, { align: 'center' });
    y += 10;

    // Add About Illness fields
    y = checkPageSpace(y, 10);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(12);
    pdf.text('History of Present Illness:', 10, y);
    y += 5;
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(12);
    pdf.text(patientData?.aboutIllness?.historyOfPresentIllness || 'N/A', 80, y);
    y += 10;

    y = checkPageSpace(y, 10);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(12);
    pdf.text('Others:', 10, y);
    y += 5;
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(12);
    pdf.text(patientData?.aboutIllness?.others || 'N/A', 80, y);
    y += 10;

    y = addLine(y);

    // Add Past Illness History title
    y = checkPageSpace(y, 20);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(14);
    pdf.text('Past Illness History', pdfWidth / 2, y, { align: 'center' });
    y += 10;

    // Add Past Illness History fields
    patientData?.aboutIllness?.historyOfPastIllness?.forEach((history) => {
      y = checkPageSpace(y, 8);
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(12);
      pdf.text(`${history.historyOfPastIllness} - Duration: ${history.duration} months`, 10, y);
      y += 8;
    });

    y = addLine(y);

    // Add Personal History title
    y = checkPageSpace(y, 20);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(14);
    pdf.text('Personal History', pdfWidth / 2, y, { align: 'center' });
    y += 10;

    // Add Personal History fields
    patientData?.aboutIllness?.personalHistory?.forEach((history) => {
      y = checkPageSpace(y, 8);
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(12);
      pdf.text(`${history.personalHistory} - Duration: ${history.duration} years`, 10, y);
      y += 8;
    });

    y = addLine(y);

    // Add Treatment History title
    y = checkPageSpace(y, 20);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(14);
    pdf.text('Treatment History', pdfWidth / 2, y, { align: 'center' });
    y += 10;

    // Add Treatment History fields
    patientData?.aboutIllness?.treatmentHistory?.forEach((history) => {
      y = checkPageSpace(y, 8);
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(12);
      pdf.text(`Drug Name: ${history.drugsName} - Duration: ${history.duration} months`, 10, y);
      y += 8;
    });

    pdf.addPage();
    y = margin;
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(14);
    pdf.text('General Examination', pdfWidth / 2, y, { align: 'center' });
    y += 10;


    // Add Vital Signs
    y = checkPageSpace(y, 10);
    pdf.setFontSize(12);
    pdf.text('Vital Signs', 10, y);
    y += 5;

    (patientData?.generalExamination?.vitalSigns || []).forEach(vital => {
      y = checkPageSpace(y, 20);
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      pdf.text(`Temperature: ${vital.tempFahrenheit}°F`, 10, y);
      pdf.text(`Pulse: ${vital.pulsePerMinute} bpm`, pdfWidth / 2 + 10, y);
      y += 5;
      pdf.text(`Respiration: ${vital.respirationRate} breaths/min`, 10, y);
      pdf.text(`Blood Pressure: ${vital.bloodPressure} mmHg`, pdfWidth / 2 + 10, y);
      y += 10;
    });


    y = checkPageSpace(y, 10);
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Clinical Examination', 10, y);
    y += 5;

    (patientData?.generalExamination?.clinicalExamination || []).forEach(exam => {
      y = checkPageSpace(y, 15);
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      pdf.text(`Name: ${exam.name}`, 10, y);
      pdf.text(`Findings: ${exam.findings}`, pdfWidth / 2 + 10, y);
      y += 5;
      pdf.text(`Comments: ${exam.comments}`, 10, y);
      y += 10;
    });


    y = addLine(y);

    // Add Systemic Examination title
    y = checkPageSpace(y, 20);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(14);
    pdf.text('Systemic Examination', pdfWidth / 2, y, { align: 'center' });
    y += 10;


    // Helper function to add a systemic examination section
    const addSystemicExamSection = (title, data, x, y) => {
      y = checkPageSpace(y, 10);
      pdf.setFontSize(12);
      pdf.text(title, x, y);
      y += 5;

      data.forEach(exam => {
        y = checkPageSpace(y, 15);
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(10);
        pdf.text(`Name: ${exam.name}`, x, y);
        y += 5;
        pdf.text(`Findings: ${exam.findings}`, x, y);
        y += 5;
        pdf.text(`Comments: ${exam.comments}`, x, y);
        y += 10;
      });

      return y;
    };

    // Calculate the positions for the columns
    const col10X = 10;
    const col20X = pdfWidth / 3 + 10;
    const col3X = (pdfWidth / 3) * 2 + 10;
    const col4X = 10; // Start from the left margin
    const col5X = pdfWidth / 2 + 10; // Center aligned

    // Add the first three sections in one row
    const startA = y;
    let y10 = addSystemicExamSection('Cardiovascular System', patientData?.systemicExamination?.cardiovascularSystem || [], col10X, startA);
    let y20 = addSystemicExamSection('Respiratory System', patientData?.systemicExamination?.respiratorySystem || [], col20X, startA);
    let y3 = addSystemicExamSection('Abdomen', patientData?.systemicExamination?.abdomen || [], col3X, startA);
    y = Math.max(y10, y20, y3);
    y += 10; // Add space after the first row

    // Add the next two sections in another row
    let y4 = addSystemicExamSection('Neurological Examination', patientData?.systemicExamination?.neurologicalExamination || [], col4X, y);
    let y5 = addSystemicExamSection('Locomotor System', patientData?.systemicExamination?.locomotorSystem || [], col5X, y);
    y = Math.max(y4, y5);

    y = addLine(y);


   // Add Investigations title
y = checkPageSpace(y, 20);
pdf.setFont('helvetica', 'bold');
pdf.setFontSize(14);
pdf.text('Investigations', pdfWidth / 2, y, { align: 'center' });
y += 10;

// Helper function to add an investigation section
const addInvestigationSection = (title, data, x, y, fields) => {
  y = checkPageSpace(y, 10);
  pdf.setFontSize(12);
  pdf.text(title, x, y);
  y += 5;

  data.forEach(item => {
    y = checkPageSpace(y, 15);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);
    fields.forEach(field => {
      pdf.text(`${field.label}: ${item[field.key]}`, x, y);
      y += 5;
    });
    y += 10;
  });

  return y;
};

// Calculate the positions for the columns
const col100X = 10;
const col200X = pdfWidth / 3 + 10;
const col300X = (pdfWidth / 3) * 2 + 10;

// Add the first row of sections
const startB = y;
let y100 = addInvestigationSection('Echo Cardiogram', patientData?.investigations?.procedureStudy?.echocardiogram || [], col100X, startB, [
  { label: 'RWMA', key: 'rwma' },
  { label: 'LVH', key: 'lvh' },
  { label: 'Vegetation', key: 'vegetation' },
  { label: 'LVIDD', key: 'lvidd' },
  { label: 'EF', key: 'ef' },
  { label: 'Pericardial Effusion', key: 'pericardialEffusion' },
  { label: 'Valvular Disease', key: 'valvularDisease' }
]);
let y200 = addInvestigationSection('Plural Fluid Study', patientData?.investigations?.procedureStudy?.pluralFluidStudy || [], col200X, startB, [
  { label: 'Polymorph', key: 'polymorph' },
  { label: 'Lymphocytes', key: 'lymphocytes' },
  { label: 'Malignant Cell', key: 'malignantCell' },
  { label: 'Protein', key: 'protein' },
  { label: 'Glucose', key: 'glucose' },
  { label: 'ADA', key: 'ada' }
]);
let y300 = addInvestigationSection('CSF Study', patientData?.investigations?.procedureStudy?.csfStudy || [], col300X, startB, [
  { label: 'Polymorph', key: 'polymorph' },
  { label: 'Lymphocytes', key: 'lymphocytes' },
  { label: 'Malignant Cell', key: 'malignantCell' },
  { label: 'Protein', key: 'protein' },
  { label: 'Glucose', key: 'glucose' },
  { label: 'ADA', key: 'ada' },
  { label: 'Oligoclonal Band', key: 'oligoclonalBand' }
]);
y = Math.max(y100, y200, y300);
y += 10; // Add space after the first row

// Add the second row of sections
let y400 = addInvestigationSection('Ascitic Fluid Study', patientData?.investigations?.procedureStudy?.asciticFluidStudy || [], col100X, y, [
  { label: 'Polymorph', key: 'polymorph' },
  { label: 'Lymphocytes', key: 'lymphocytes' },
  { label: 'Malignant Cell', key: 'malignantCell' },
  { label: 'Protein', key: 'protein' },
  { label: 'Glucose', key: 'glucose' },
  { label: 'ADA', key: 'ada' },
  { label: 'SAAG', key: 'saag' }
]);
let y500 = addInvestigationSection('Synovial Fluid Study', patientData?.investigations?.procedureStudy?.synovialFluidStudy || [], col200X, y, [
  { label: 'Polymorph', key: 'polymorph' },
  { label: 'Lymphocytes', key: 'lymphocytes' },
  { label: 'Malignant Cell', key: 'malignantCell' },
  { label: 'Protein', key: 'protein' },
  { label: 'Glucose', key: 'glucose' },
  { label: 'ADA', key: 'ada' }
]);
let y600 = addInvestigationSection('CBC', patientData?.investigations?.CBC || [], col300X, y, [
  { label: 'HB', key: 'hb' },
  { label: 'Platelet Count', key: 'plateletCount' },
  { label: 'HCT', key: 'hct' },
  { label: 'TC', key: 'tc' },
  { label: 'P', key: 'p' },
  { label: 'L', key: 'l' },
  { label: 'Reticulocyte Count', key: 'reticulocyteCount' },
  { label: 'M', key: 'm' },
  { label: 'B', key: 'b' },
  { label: 'MCV', key: 'mcv' },
  { label: 'Total Circulating Eosinophil Count', key: 'totalCirEosinophilCount' },
  { label: 'ESR', key: 'esr' },
  { label: 'IgE', key: 'igE' }
]);
y = Math.max(y400, y500, y600);
y += 10; // Add space after the second row


pdf.addPage();
y = margin;

const addFinalPageSectionHorizontal = (sections) => {
  const sectionWidth = (pdf.internal.pageSize.width - 20) / sections.length; // Divide the page width by the number of sections

  sections.forEach((section, index) => {
    const x = 10 + (index * sectionWidth); // Calculate the x position for each section
    let yPos = y; // Reset y position for each section

    // Add title
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(12);
    pdf.text(section.title, x, yPos);
    yPos += 10;

    // Add data
    section.data.forEach(item => {
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      section.fields.forEach(field => {
        const text = `${field.label}: ${item[field.key]}`;
        const textWidth = pdf.getStringUnitWidth(text) * 10 / pdf.internal.scaleFactor;
        if (textWidth > sectionWidth - 10) {
          const splitText = pdf.splitTextToSize(text, sectionWidth - 10);
          pdf.text(splitText, x, yPos);
          yPos += splitText.length * 5;
        } else {
          pdf.text(text, x, yPos);
          yPos += 5;
        }
      });
      yPos += 5;
    });
  });

  y += 10; // Add some space after all sections
};

// Define sections
const sections = [
  {
    title: 'Urine RME',
    data: patientData?.investigations?.urineRME || [],
    fields: [
      { label: 'Albumin', key: 'albumin' },
      { label: 'Pus Cell', key: 'pusCell' },
      { label: 'Sugar', key: 'sugar' },
      { label: 'Cast', key: 'cast' },
      { label: 'Ketone Body', key: 'ketoneBody' },
      { label: 'Bence Jones Protein', key: 'benceJonesProtein' }
    ]
  },
  {
    title: 'Serum Electrolyte',
    data: patientData?.investigations?.serumElectrolyte || [],
    fields: [
      { label: 'Na', key: 'na' },
      { label: 'K', key: 'k' },
      { label: 'Cl', key: 'cl' }
    ]
  },
  {
    title: 'Other Investigations',
    data: patientData?.investigations?.investigations || [],
    fields: [
      { label: 'Name', key: 'nameOfInvestigations' },
      { label: 'Value', key: 'value' },
      { label: 'Comments', key: 'comments' }
    ]
  }
];

// Add sections horizontally
addFinalPageSectionHorizontal(sections);

y += 40; 


    y = addLine(y);



    // Add Management section title
    y = checkPageSpace(y, 20);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(14);
    pdf.text('Management', pdfWidth / 2, y, { align: 'center' });
    y += 10;

    // Iterate over management data
    patientData?.management?.management?.forEach((management) => {
      // Ensure enough space on the page
      y = checkPageSpace(y, 30); // Adjust as per your spacing needs

      // Display each management item
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(12);
      pdf.text(`Drug Name: ${management.nameOfDrugs}`, 10, y);
      y += 10; // Adjust spacing
      pdf.text(`Duration: ${management.duration}`, 10, y);
      y += 20; // Adjust spacing
    });


    // Add Outcome section
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(12);
    pdf.text(`Outcome: ${patientData?.management?.outcome}`, 10, y);
    y += 30; // Adjust spacing

    // Add divider or separator
    y += 10; // Adjust spacing
    pdf.line(10, y, pdfWidth - 10, y); // Add a horizontal line
    y += 10; // Adjust spacing

    // Add Diagnosis section title
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(14);
    pdf.text('Diagnosis', pdfWidth / 2, y, { align: 'center' });
    y += 20; // Adjust spacing

    // Iterate over diagnosis data
    patientData?.diagnosis?.forEach((diagnosis) => {
      // Ensure enough space on the page
      y = checkPageSpace(y, 50); // Adjust as per your spacing needs

      // Display each diagnosis item
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(12);
      pdf.text(`Main Diagnosis: ${diagnosis.mainDiagnosis}`, 10, y);
      y += 20; // Adjust spacing
      pdf.text(`Comorbidities: ${diagnosis.comorbidities}`, 10, y);
      y += 30; // Adjust spacing
    });

    y = addLine(y);




    // Add footer
    y = checkPageSpace(y, 20);
    const pdfData = pdf.output('dataurlstring');
    const previewWindow = window.open();
    previewWindow.document.write(`<iframe width='100%' height='100%' src='${pdfData}'></iframe>`);
  };


  return (
    <section style={{ padding: '20px' }}>
      <Row
        justify="space-between"
        align="middle"
        style={{ marginBottom: '20px' }}
      >
        <Col>
          <Row align="middle">
            <Col>
              <Title level={2} style={{ margin: '0 0 0 10px' }}>
                Details of {patientData?.patientInformation?.name}
              </Title>
            </Col>
          </Row>
        </Col>
        <Col>
          <Button type="primary" icon={<PrinterOutlined />} onClick={generatePDF}>
            Generate PDF
          </Button>
        </Col>
      </Row>
      <section
        ref={componentRef}
        style={{
          padding: '20px',
          border: '1px solid #f0f0f0',
          borderRadius: '5px',
          background: '#fff',
        }}
      >
        <div ref={printRef} className="my-4">
          <div className="flex flex-col gap-6 items-center justify-center md:flex-row ">
            <Image src={MainLoog} width={150} height={150} alt="" />
            <div>
              <Title
                level={1}
                style={{ color: '#394867' }}
                className="mt-2 text-center"
              >
                Comilla Medical College Hospital
              </Title>
              <h4 className="text-[1.6rem] font-[400]">
                Department of Medicine
              </h4>
              <h4 className="text-[1.5rem] font-[400]">
                Online Patient Portal
              </h4>
            </div>
          </div>
        </div>

        <Divider />

        <div className="px-4">
          <Title level={4} className="text-center">
            Patient Information
          </Title>
          <Row gutter={16}>
            <Col span={12}>
              <div
                style={{
                  padding: '10px',
                  border: '1px solid #d9d9d9',
                  borderRadius: '5px',
                  marginBottom: '10px',
                }}
              >
                <Text strong style={{ fontSize: '1.2rem' }}>
                  Name:{' '}
                </Text>
                <Text style={{ fontSize: '1.2rem' }}>
                  {patientData?.patientInformation?.name}
                </Text>
              </div>
              <div
                style={{
                  padding: '10px',
                  border: '1px solid #d9d9d9',
                  borderRadius: '5px',
                  marginBottom: '10px',
                }}
              >
                <Text strong style={{ fontSize: '1.2rem' }}>
                  Registration No:{' '}
                </Text>
                <Text style={{ fontSize: '1.2rem' }}>
                  {patientData?.patientInformation?.registrationNo}
                </Text>
              </div>

              <div
                style={{
                  padding: '10px',
                  border: '1px solid #d9d9d9',
                  borderRadius: '5px',
                  marginBottom: '10px',
                }}
              >
                <Text strong style={{ fontSize: '1.2rem' }}>
                  Phone Number:{' '}
                </Text>
                <Text style={{ fontSize: '1.2rem' }}>
                  {patientData?.patientInformation?.phoneNumber}
                </Text>
              </div>

              <div
                style={{
                  padding: '10px',
                  border: '1px solid #d9d9d9',
                  borderRadius: '5px',
                  marginBottom: '10px',
                }}
              >
                <Text strong style={{ fontSize: '1.2rem' }}>
                  Occupation:{' '}
                </Text>
                <Text style={{ fontSize: '1.2rem' }}>
                  {patientData?.patientInformation?.occupation}
                </Text>
              </div>

              <div
                style={{
                  padding: '10px',
                  border: '1px solid #d9d9d9',
                  borderRadius: '5px',
                  marginBottom: '10px',
                }}
              >
                <Text strong style={{ fontSize: '1.2rem' }}>
                  Marital Status:{' '}
                </Text>
                <Text style={{ fontSize: '1.2rem' }}>
                  {patientData?.patientInformation?.maritalStatus}
                </Text>
              </div>
              <div
                style={{
                  padding: '10px',
                  border: '1px solid #d9d9d9',
                  borderRadius: '5px',
                  marginBottom: '10px',
                }}
              >
                <Text strong style={{ fontSize: '1.2rem' }}>
                  Age:{' '}
                </Text>
                <Text style={{ fontSize: '1.2rem' }}>
                  {patientData?.patientInformation?.age}
                </Text>
              </div>
              <div
                style={{
                  padding: '10px',
                  border: '1px solid #d9d9d9',
                  borderRadius: '5px',
                  marginBottom: '10px',
                }}
              >
                <Text strong style={{ fontSize: '1.2rem' }}>
                  Sex:{' '}
                </Text>
                <Text style={{ fontSize: '1.2rem' }}>
                  {patientData?.patientInformation?.sex}
                </Text>
              </div>
            </Col>
            <Col span={12}>
              <div
                style={{
                  padding: '10px',
                  border: '1px solid #d9d9d9',
                  borderRadius: '5px',
                  marginBottom: '10px',
                }}
              >
                <Text strong style={{ fontSize: '1.2rem' }}>
                  Division:{' '}
                </Text>
                <Text style={{ fontSize: '1.2rem' }}>
                  {patientData?.patientInformation?.division}
                </Text>
              </div>
              <div
                style={{
                  padding: '10px',
                  border: '1px solid #d9d9d9',
                  borderRadius: '5px',
                  marginBottom: '10px',
                }}
              >
                <Text strong style={{ fontSize: '1.2rem' }}>
                  District:{' '}
                </Text>
                <Text style={{ fontSize: '1.2rem' }}>
                  {patientData?.patientInformation?.district}
                </Text>
              </div>

              <div
                style={{
                  padding: '10px',
                  border: '1px solid #d9d9d9',
                  borderRadius: '5px',
                  marginBottom: '10px',
                }}
              >
                <Text strong style={{ fontSize: '1.2rem' }}>
                  Admission Unit:{' '}
                </Text>
                <Text style={{ fontSize: '1.2rem' }}>
                  {patientData?.patientInformation?.admissionUnit}
                </Text>
              </div>
              <div
                style={{
                  padding: '10px',
                  border: '1px solid #d9d9d9',
                  borderRadius: '5px',
                  marginBottom: '10px',
                }}
              >
                <Text strong style={{ fontSize: '1.2rem' }}>
                  Address Details:{' '}
                </Text>
                <Text style={{ fontSize: '1.2rem' }}>
                  {patientData?.patientInformation?.addressDetails}
                </Text>
              </div>
              
              <div
                style={{
                  padding: '10px',
                  border: '1px solid #d9d9d9',
                  borderRadius: '5px',
                  marginBottom: '10px',
                }}
              >
                <Text strong style={{ fontSize: '1.2rem' }}>
                  Admission Date:{' '}
                </Text>
                <Text style={{ fontSize: '1.2rem' }}>
                  {new Date(
                    patientData?.patientInformation?.admissionDate,
                  ).toLocaleDateString()}
                </Text>
              </div>
              <div
                style={{
                  padding: '10px',
                  border: '1px solid #d9d9d9',
                  borderRadius: '5px',
                  marginBottom: '10px',
                }}
              >
                <Text strong style={{ fontSize: '1.2rem' }}>
                  Release Date:{' '}
                </Text>
                <Text style={{ fontSize: '1.2rem' }}>
                  {new Date(
                    patientData?.patientInformation?.releaseDate,
                  ).toLocaleDateString()}
                </Text>
              </div>
              <div
                style={{
                  padding: '10px',
                  border: '1px solid #d9d9d9',
                  borderRadius: '5px',
                  marginBottom: '10px',
                }}
              >
                <Text strong style={{ fontSize: '1.2rem' }}>
                  Hospital Stay:{' '}
                </Text>
                <Text style={{ fontSize: '1.2rem' }}>
                  {patientData?.patientInformation?.hospitalStay} days
                </Text>
              </div>
              <div
                style={{
                  padding: '10px',
                  border: '1px solid #d9d9d9',
                  borderRadius: '5px',
                  marginBottom: '10px',
                }}
              >
                <Text strong style={{ fontSize: '1.2rem' }}>
                 BMI :{' '}
                </Text>
                <Text style={{ fontSize: '1.2rem' }}>
                {patientData?.bmi?.value} ( {patientData?.bmi?.category} )
                </Text>
              </div>
            </Col>
          </Row>

          <Divider />

          <Title level={4} className="text-center">
            Chief Complaints
          </Title>
          <Row gutter={16}>
            {patientData?.chiefComplaints?.map((complaint: any) => (
              <Col span={12} key={complaint._id}>
                <div
                  style={{
                    padding: '10px',
                    border: '1px solid #d9d9d9',
                    borderRadius: '5px',
                    marginBottom: '10px',
                  }}
                >
                  <Text strong style={{ fontSize: '1.2rem' }}>
                    {complaint.complaints} -{' '}
                  </Text>
                  <Text style={{ fontSize: '1.2rem' }}>
                    Duration: {complaint.duration} days
                  </Text>
                </div>
              </Col>
            ))}
          </Row>

          <Divider />

          <Title level={4} className="text-center">
            About Illness
          </Title>

          <Row gutter={16}>
            <Col span={12}>
              <div
                style={{
                  padding: '10px',
                  border: '1px solid #d9d9d9',
                  borderRadius: '5px',
                  marginBottom: '10px',
                }}
              >
                <Text strong style={{ fontSize: '1.2rem' }}>
                  History of Present Illness:{' '}
                </Text>
                <Text style={{ fontSize: '1.2rem' }}>
                  {patientData?.aboutIllness?.historyOfPresentIllness}
                </Text>
              </div>
            </Col>
            <Col span={12}>
              <div
                style={{
                  padding: '10px',
                  border: '1px solid #d9d9d9',
                  borderRadius: '5px',
                  marginBottom: '10px',
                }}
              >
                <Text strong style={{ fontSize: '1.2rem' }}>
                  Others:{' '}
                </Text>
                <Text style={{ fontSize: '1.2rem' }}>
                  {patientData?.aboutIllness?.others}
                </Text>
              </div>
            </Col>
          </Row>

          <Title level={4} className="my-4">
            Past Illness History
          </Title>
          <Row gutter={16}>
            {patientData?.aboutIllness?.historyOfPastIllness?.map(
              (history: any) => (
                <Col span={12} key={history._id}>
                  <div
                    style={{
                      padding: '10px',
                      border: '1px solid #d9d9d9',
                      borderRadius: '5px',
                      marginBottom: '10px',
                    }}
                  >
                    <Text strong style={{ fontSize: '1.2rem' }}>
                      {history.historyOfPastIllness} -{' '}
                    </Text>
                    <Text style={{ fontSize: '1.2rem' }}>
                      Duration: {history.duration} months
                    </Text>
                  </div>
                </Col>
              ),
            )}
          </Row>

          <Title level={4} className="my-4">
            Personal History
          </Title>
          <Row gutter={16}>
            {patientData?.aboutIllness?.personalHistory?.map((history: any) => (
              <Col span={12} key={history._id}>
                <div
                  style={{
                    padding: '10px',
                    border: '1px solid #d9d9d9',
                    borderRadius: '5px',
                    marginBottom: '10px',
                  }}
                >
                  <Text strong style={{ fontSize: '1.2rem' }}>
                    {history.personalHistory} -{' '}
                  </Text>
                  <Text style={{ fontSize: '1.2rem' }}>
                    Duration: {history.duration} years
                  </Text>
                </div>
              </Col>
            ))}
          </Row>

          <Title level={4} className="my-4">
            Treatment History
          </Title>
          <Row gutter={16}>
            {patientData?.aboutIllness?.treatmentHistory?.map(
              (history: any) => (
                <Col span={12} key={history._id}>
                  <div
                    style={{
                      padding: '10px',
                      border: '1px solid #d9d9d9',
                      borderRadius: '5px',
                      marginBottom: '10px',
                    }}
                  >
                    <Text strong style={{ fontSize: '1.2rem' }}>
                      Drug Name:{' '}
                    </Text>
                    <Text style={{ fontSize: '1.2rem' }}>
                      {history.drugsName} -{' '}
                    </Text>
                    <Text style={{ fontSize: '1.2rem' }}>
                      Duration: {history.duration} months
                    </Text>
                  </div>
                </Col>
              ),
            )}
          </Row>

          <Divider />

          <Title level={4} className="text-center">
            General Examination
          </Title>
          <Row gutter={16}>
            <Col span={12}>
              <Title level={4}>Vital Signs</Title>
              {patientData?.generalExamination?.vitalSigns?.map(
                (vital: any) => (
                  <div
                    key={vital._id}
                    style={{
                      padding: '10px',
                      border: '1px solid #d9d9d9',
                      borderRadius: '5px',
                      marginBottom: '10px',
                    }}
                  >
                    <Text strong style={{ fontSize: '1.2rem' }}>
                      Temperature:{' '}
                    </Text>
                    <Text style={{ fontSize: '1.2rem' }}>
                      {vital.tempFahrenheit}°F
                    </Text>
                    <br />
                    <Text strong style={{ fontSize: '1.2rem' }}>
                      Pulse:{' '}
                    </Text>
                    <Text style={{ fontSize: '1.2rem' }}>
                      {vital.pulsePerMinute} bpm
                    </Text>
                    <br />
                    <Text strong style={{ fontSize: '1.2rem' }}>
                      Respiration:{' '}
                    </Text>
                    <Text style={{ fontSize: '1.2rem' }}>
                      {vital.respirationRate} breaths/min
                    </Text>
                    <br />
                    <Text strong style={{ fontSize: '1.2rem' }}>
                      Blood Pressure:{' '}
                    </Text>
                    <Text style={{ fontSize: '1.2rem' }}>
                      {vital.bloodPressure} mmHg
                    </Text>
                    <br />
                  </div>
                ),
              )}
            </Col>
            <Col span={12}>
              <Title level={5}>Clinical Examination</Title>
              {patientData?.generalExamination?.clinicalExamination?.map(
                (exam: any) => (
                  <div
                    key={exam._id}
                    style={{
                      padding: '10px',
                      border: '1px solid #d9d9d9',
                      borderRadius: '5px',
                      marginBottom: '10px',
                    }}
                  >
                    <Text strong style={{ fontSize: '1.2rem' }}>
                      Name:{' '}
                    </Text>
                    <Text style={{ fontSize: '1.2rem' }}>{exam.name}</Text>
                    <br />
                    <Text strong style={{ fontSize: '1.2rem' }}>
                      Findings:{' '}
                    </Text>
                    <Text style={{ fontSize: '1.2rem' }}>{exam.findings}</Text>
                    <br />
                    <Text strong style={{ fontSize: '1.2rem' }}>
                      Comments:{' '}
                    </Text>
                    <Text style={{ fontSize: '1.2rem' }}>{exam.comments}</Text>
                    <br />
                  </div>
                ),
              )}
            </Col>
          </Row>

          <Divider />

          <Title level={4} className="text-center">
            Systemic Examination
          </Title>
          <Row gutter={16}>
            <Col span={12}>
              <div
                style={{
                  padding: '10px',
                  border: '1px solid #d9d9d9',
                  borderRadius: '5px',
                  marginBottom: '10px',
                }}
              >
                <Title level={5}>Cardiovascular System</Title>
                <Divider />
                {patientData?.systemicExamination?.cardiovascularSystem?.map(
                  (exam: any) => (
                    <div key={exam._id}>
                      <Text strong style={{ fontSize: '1.2rem' }}>
                        Name:{' '}
                      </Text>
                      <Text style={{ fontSize: '1.2rem' }}>{exam.name}</Text>
                      <br />
                      <Text strong style={{ fontSize: '1.2rem' }}>
                        Findings:{' '}
                      </Text>
                      <Text style={{ fontSize: '1.2rem' }}>
                        {exam.findings}
                      </Text>
                      <br />
                      <Text strong style={{ fontSize: '1.2rem' }}>
                        Comments:{' '}
                      </Text>
                      <Text style={{ fontSize: '1.2rem' }}>
                        {exam.comments}
                      </Text>
                      <br />
                    </div>
                  ),
                )}
              </div>
            </Col>
            <Col span={12}>
              <div
                style={{
                  padding: '10px',
                  border: '1px solid #d9d9d9',
                  borderRadius: '5px',
                  marginBottom: '10px',
                }}
              >
                <Title level={5}>Respiratory System</Title>
                <Divider />
                {patientData?.systemicExamination?.respiratorySystem?.map(
                  (exam: any) => (
                    <div key={exam._id}>
                      <Text strong style={{ fontSize: '1.2rem' }}>
                        Name:{' '}
                      </Text>
                      <Text style={{ fontSize: '1.2rem' }}>{exam.name}</Text>
                      <br />
                      <Text strong style={{ fontSize: '1.2rem' }}>
                        Findings:{' '}
                      </Text>
                      <Text style={{ fontSize: '1.2rem' }}>
                        {exam.findings}
                      </Text>
                      <br />
                      <Text strong style={{ fontSize: '1.2rem' }}>
                        Comments:{' '}
                      </Text>
                      <Text style={{ fontSize: '1.2rem' }}>
                        {exam.comments}
                      </Text>
                      <br />
                    </div>
                  ),
                )}
              </div>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <div
                style={{
                  padding: '10px',
                  border: '1px solid #d9d9d9',
                  borderRadius: '5px',
                  marginBottom: '10px',
                }}
              >
                <Title level={5}>Abdomen</Title>
                <Divider />
                {patientData?.systemicExamination?.abdomen?.map((exam: any) => (
                  <div key={exam._id}>
                    <Text strong style={{ fontSize: '1.2rem' }}>
                      Name:{' '}
                    </Text>
                    <Text style={{ fontSize: '1.2rem' }}>{exam.name}</Text>
                    <br />
                    <Text strong style={{ fontSize: '1.2rem' }}>
                      Findings:{' '}
                    </Text>
                    <Text style={{ fontSize: '1.2rem' }}>{exam.findings}</Text>
                    <br />
                    <Text strong style={{ fontSize: '1.2rem' }}>
                      Comments:{' '}
                    </Text>
                    <Text style={{ fontSize: '1.2rem' }}>{exam.comments}</Text>
                    <br />
                  </div>
                ))}
              </div>
            </Col>
            <Col span={12}>
              <div
                style={{
                  padding: '10px',
                  border: '1px solid #d9d9d9',
                  borderRadius: '5px',
                  marginBottom: '10px',
                }}
              >
                <Title level={5}>Neurological Examination</Title>
                <Divider />
                {patientData?.systemicExamination?.neurologicalExamination?.map(
                  (exam: any) => (
                    <div key={exam._id}>
                      <Text strong style={{ fontSize: '1.2rem' }}>
                        Name:{' '}
                      </Text>
                      <Text style={{ fontSize: '1.2rem' }}>{exam.name}</Text>
                      <br />
                      <Text strong style={{ fontSize: '1.2rem' }}>
                        Findings:{' '}
                      </Text>
                      <Text style={{ fontSize: '1.2rem' }}>
                        {exam.findings}
                      </Text>
                      <br />
                      <Text strong style={{ fontSize: '1.2rem' }}>
                        Comments:{' '}
                      </Text>
                      <Text style={{ fontSize: '1.2rem' }}>
                        {exam.comments}
                      </Text>
                      <br />
                    </div>
                  ),
                )}
              </div>
            </Col>
          </Row>
          <Row gutter={16} justify="start">
            <Col span={12}>
              <div
                style={{
                  padding: '10px',
                  border: '1px solid #d9d9d9',
                  borderRadius: '5px',
                  marginBottom: '10px',
                }}
              >
                <Title level={5}>Locomotor System</Title>
                <Divider />
                {patientData?.systemicExamination?.locomotorSystem?.map(
                  (exam: any) => (
                    <div key={exam._id}>
                      <Text strong style={{ fontSize: '1.2rem' }}>
                        Name:{' '}
                      </Text>
                      <Text style={{ fontSize: '1.2rem' }}>{exam.name}</Text>
                      <br />
                      <Text strong style={{ fontSize: '1.2rem' }}>
                        Findings:{' '}
                      </Text>
                      <Text style={{ fontSize: '1.2rem' }}>
                        {exam.findings}
                      </Text>
                      <br />
                      <Text strong style={{ fontSize: '1.2rem' }}>
                        Comments:{' '}
                      </Text>
                      <Text style={{ fontSize: '1.2rem' }}>
                        {exam.comments}
                      </Text>
                      <br />
                    </div>
                  ),
                )}
              </div>
            </Col>
          </Row>

          <Divider />

          <Title level={4} className="text-center">
            Investigations
          </Title>
          <Title level={5}>Procedure Study</Title>
          <Row gutter={16}>
            <Col span={12}>
              <div
                style={{
                  padding: '10px',
                  border: '1px solid #d9d9d9',
                  borderRadius: '5px',
                  marginBottom: '10px',
                }}
              >
                <Title level={5}>Echo Cardiogram</Title>
                <Divider />
                {patientData?.investigations?.procedureStudy?.echocardiogram?.map(
                  (echo: any) => (
                    <div key={echo._id}>
                      <Text>RWMA: {echo.rwma}</Text>
                      <br />
                      <Text>LVH: {echo.lvh}</Text>
                      <br />
                      <Text>Vegetation: {echo.vegetation}</Text>
                      <br />
                      <Text>LVIDD: {echo.lvidd}</Text>
                      <br />
                      <Text>EF: {echo.ef}</Text>
                      <br />
                      <Text>
                        Pericardial Effusion: {echo.pericardialEffusion}
                      </Text>
                      <br />
                      <Text>Valvular Disease: {echo.valvularDisease}</Text>
                      <br />
                    </div>
                  ),
                )}
              </div>
            </Col>
            <Col span={12}>
              <div
                style={{
                  padding: '10px',
                  border: '1px solid #d9d9d9',
                  borderRadius: '5px',
                  marginBottom: '10px',
                }}
              >
                <Title level={5}>Plural Fluid Study</Title>
                <Divider />
                {patientData?.investigations?.procedureStudy?.pluralFluidStudy?.map(
                  (fluid: any) => (
                    <div key={fluid._id}>
                      <Text>Polymorph: {fluid.polymorph}</Text>
                      <br />
                      <Text>Lymphocytes: {fluid.lymphocytes}</Text>
                      <br />
                      <Text>Malignant Cell: {fluid.malignantCell}</Text>
                      <br />
                      <Text>Protein: {fluid.protein}</Text>
                      <br />
                      <Text>Glucose: {fluid.glucose}</Text>
                      <br />
                      <Text>ADA: {fluid.ada}</Text>
                      <br />
                    </div>
                  ),
                )}
              </div>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <div
                style={{
                  padding: '10px',
                  border: '1px solid #d9d9d9',
                  borderRadius: '5px',
                  marginBottom: '10px',
                }}
              >
                <Title level={5}>CSF Study</Title>
                <Divider />
                {patientData?.investigations?.procedureStudy?.csfStudy?.map(
                  (csf: any) => (
                    <div key={csf._id}>
                      <Text>Polymorph: {csf.polymorph}</Text>
                      <br />
                      <Text>Lymphocytes: {csf.lymphocytes}</Text>
                      <br />
                      <Text>Malignant Cell: {csf.malignantCell}</Text>
                      <br />
                      <Text>Protein: {csf.protein}</Text>
                      <br />
                      <Text>Glucose: {csf.glucose}</Text>
                      <br />
                      <Text>ADA: {csf.ada}</Text>
                      <br />
                      <Text>Oligoclonal Band: {csf.oligoclonalBand}</Text>
                      <br />
                    </div>
                  ),
                )}
              </div>
            </Col>
            <Col span={12}>
              <div
                style={{
                  padding: '10px',
                  border: '1px solid #d9d9d9',
                  borderRadius: '5px',
                  marginBottom: '10px',
                }}
              >
                <Title level={5}>Ascitic Fluid Study</Title>
                <Divider />
                {patientData?.investigations?.procedureStudy?.asciticFluidStudy?.map(
                  (fluid: any) => (
                    <div key={fluid._id}>
                      <Text>Polymorph: {fluid.polymorph}</Text>
                      <br />
                      <Text>Lymphocytes: {fluid.lymphocytes}</Text>
                      <br />
                      <Text>Malignant Cell: {fluid.malignantCell}</Text>
                      <br />
                      <Text>Protein: {fluid.protein}</Text>
                      <br />
                      <Text>Glucose: {fluid.glucose}</Text>
                      <br />
                      <Text>ADA: {fluid.ada}</Text>
                      <br />
                      <Text>SAAG: {fluid.saag}</Text>
                      <br />
                    </div>
                  ),
                )}
              </div>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <div
                style={{
                  padding: '10px',
                  border: '1px solid #d9d9d9',
                  borderRadius: '5px',
                  marginBottom: '10px',
                }}
              >
                <Title level={5}>Synovial Fluid Study</Title>
                <Divider />
                {patientData?.investigations?.procedureStudy?.synovialFluidStudy?.map(
                  (fluid: any) => (
                    <div key={fluid._id}>
                      <Text>Polymorph: {fluid.polymorph}</Text>
                      <br />
                      <Text>Lymphocytes: {fluid.lymphocytes}</Text>
                      <br />
                      <Text>Malignant Cell: {fluid.malignantCell}</Text>
                      <br />
                      <Text>Protein: {fluid.protein}</Text>
                      <br />
                      <Text>Glucose: {fluid.glucose}</Text>
                      <br />
                      <Text>ADA: {fluid.ada}</Text>
                      <br />
                    </div>
                  ),
                )}
              </div>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Title level={5}>CBC</Title>
              {patientData?.investigations?.CBC?.map((cbc: any) => (
                <div key={cbc._id} style={{ marginBottom: '16px' }}>
                  <div
                    style={{
                      padding: '10px',
                      border: '1px solid #d9d9d9',
                      borderRadius: '5px',
                      marginBottom: '10px',
                    }}
                  >
                    <Text>HB: {cbc.hb}</Text>
                    <br />
                    <Text>Platelet Count: {cbc.plateletCount}</Text>
                    <br />
                    <Text>HCT: {cbc.hct}</Text>
                    <br />
                    <Text>TC: {cbc.tc}</Text>
                    <br />
                    <Text>P: {cbc.p}</Text>
                    <br />
                    <Text>L: {cbc.l}</Text>
                    <br />
                    <Text>Reticulocyte Count: {cbc.reticulocyteCount}</Text>
                    <br />
                    <Text>M: {cbc.m}</Text>
                    <br />
                    <Text>B: {cbc.b}</Text>
                    <br />
                    <Text>MCV: {cbc.mcv}</Text>
                    <br />
                    <Text>
                      Total Circulating Eosinophil Count:{' '}
                      {cbc.totalCirEosinophilCount}
                    </Text>
                    <br />
                    <Text>ESR: {cbc.esr}</Text>
                    <br />
                    <Text>IgE: {cbc.igE}</Text>
                    <br />
                  </div>
                </div>
              ))}
            </Col>
            <Col span={12}>
              <Title level={5}>Urine RME</Title>
              {patientData?.investigations?.urineRME?.map((urine: any) => (
                <div key={urine._id} style={{ marginBottom: '16px' }}>
                  <div
                    style={{
                      padding: '10px',
                      border: '1px solid #d9d9d9',
                      borderRadius: '5px',
                      marginBottom: '10px',
                    }}
                  >
                    <Text>Albumin: {urine.albumin}</Text>
                    <br />
                    <Text>Pus Cell: {urine.pusCell}</Text>
                    <br />
                    <Text>Sugar: {urine.sugar}</Text>
                    <br />
                    <Text>Cast: {urine.cast}</Text>
                    <br />
                    <Text>Ketone Body: {urine.ketoneBody}</Text>
                    <br />
                    <Text>Bence Jones Protein: {urine.benceJonesProtein}</Text>
                    <br />
                  </div>
                </div>
              ))}
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Title level={5}>Serum Electrolyte</Title>
              {patientData?.investigations?.serumElectrolyte?.map(
                (electrolyte: any) => (
                  <div key={electrolyte._id} style={{ marginBottom: '16px' }}>
                    <div
                      style={{
                        padding: '10px',
                        border: '1px solid #d9d9d9',
                        borderRadius: '5px',
                        marginBottom: '10px',
                      }}
                    >
                      <Text>Na: {electrolyte.na}</Text>
                      <br />
                      <Text>K: {electrolyte.k}</Text>
                      <br />
                      <Text>Cl: {electrolyte.cl}</Text>
                      <br />
                    </div>
                  </div>
                ),
              )}
            </Col>
            <Col span={12}>
              <Title level={5}>Other Investigations</Title>
              {patientData?.investigations?.investigations?.map(
                (investigation: any) => (
                  <div key={investigation._id} style={{ marginBottom: '16px' }}>
                    <div
                      style={{
                        padding: '10px',
                        border: '1px solid #d9d9d9',
                        borderRadius: '5px',
                        marginBottom: '10px',
                      }}
                    >
                      <Text>Name: {investigation.nameOfInvestigations}</Text>
                      <br />
                      <Text>Value: {investigation.value}</Text>
                      <br />
                      <Text>Comments: {investigation.comments}</Text>
                      <br />
                    </div>
                  </div>
                ),
              )}
            </Col>
          </Row>

          <Divider />

          <Title level={4} className="text-center">
            Management
          </Title>
          <Row gutter={16}>
            {patientData?.management?.management?.map((management: any) => (
              <Col span={12} key={management._id}>
                <div
                  style={{
                    padding: '10px',
                    border: '1px solid #d9d9d9',
                    borderRadius: '5px',
                    marginBottom: '10px',
                  }}
                >
                  <Text>Drug Name: {management.nameOfDrugs}</Text>
                  <br />
                  <Text>Duration: {management.duration}</Text>
                  <br />
                </div>
              </Col>
            ))}
          </Row>
          <div
            style={{
              padding: '10px',
              border: '1px solid #d9d9d9',
              borderRadius: '5px',
              marginBottom: '10px',
            }}
          >
            <Text strong style={{ fontSize: '1.2rem' }}>
              Outcome:{' '}
            </Text>
            <Text style={{ fontSize: '1.2rem' }}>
              {patientData?.management?.outcome}
            </Text>
          </div>

          <br />

          <Divider />

          <Title level={4} className="text-center">
            Diagnosis
          </Title>
          <Row gutter={16}>
            {patientData?.diagnosis?.map((diagnosis: any) => (
              <Col span={12} key={diagnosis._id}>
                <div
                  style={{
                    padding: '10px',
                    border: '1px solid #d9d9d9',
                    borderRadius: '5px',
                    marginBottom: '10px',
                  }}
                >
                  <Text strong style={{ fontSize: '1.2rem' }}>
                    Main Diagnosis:{' '}
                  </Text>
                  <Text style={{ fontSize: '1.2rem' }}>
                    {diagnosis.mainDiagnosis}
                  </Text>

                  <br />
                  <Text strong style={{ fontSize: '1.2rem' }}>
                    Comorbidities:{' '}
                  </Text>
                  <Text style={{ fontSize: '1.2rem' }}>
                    {diagnosis.comorbidities}
                  </Text>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </section>
    </section>
  );
};

export default PatientDetails;
