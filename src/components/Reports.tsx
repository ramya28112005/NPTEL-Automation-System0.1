import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, AlignmentType, HeadingLevel } from 'docx';

import { Semester, CourseStats, Department } from '../types';
import { dataService } from '../services/dataService';

interface ReportsProps {
  semester: Semester | null;
}

// Animated Table Row Component
const AnimatedTableRow: React.FC<{ data: CourseStats; index: number }> = ({ data, index }) => {
  return (
    <motion.tr
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ backgroundColor: 'rgba(99, 102, 241, 0.1)', scale: 1.01 }}
      className="border-b border-slate-100/50 hover:shadow-lg transition-all"
    >
      <td className="px-6 py-4 text-xs font-black text-cyan-600">{index + 1}</td>
      <td className="px-6 py-4 font-bold text-slate-800">{data.course_name}</td>
      <motion.td
        className="px-6 py-4 font-black text-indigo-600"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 0.5, delay: index * 0.05 }}
      >
        {data.enrolled}
      </motion.td>
      <motion.td
        className="px-6 py-4 font-black text-emerald-600"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 0.5, delay: index * 0.05 + 0.1 }}
      >
        {data.successful}
      </motion.td>
      <motion.td
        className="px-6 py-4 font-black text-amber-600"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 0.5, delay: index * 0.05 + 0.2 }}
      >
        {data.elite}
      </motion.td>
      <motion.td
        className="px-6 py-4 font-black text-slate-600"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 0.5, delay: index * 0.05 + 0.3 }}
      >
        {data.elite_silver}
      </motion.td>
      <motion.td
        className="px-6 py-4 font-black text-yellow-600"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 0.5, delay: index * 0.05 + 0.4 }}
      >
        {data.elite_gold}
      </motion.td>
    </motion.tr>
  );
};

// Animated Upload Card
const UploadCard: React.FC<{ item: any; uploadingType: string | null; handleFileUpload: (e: any, type: any) => void }> = ({ item, uploadingType, handleFileUpload }) => {
  const colors = {
    indigo: { bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-indigo-200', light: 'bg-indigo-500/10' },
    amber: { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-200', light: 'bg-amber-500/10' },
    emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200', light: 'bg-emerald-500/10' },
  };
  const color = colors[item.color as keyof typeof colors];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative group"
    >
      <motion.div
        className={`absolute -inset-1 bg-gradient-to-r ${item.color === 'indigo' ? 'from-indigo-400 to-purple-500' : item.color === 'amber' ? 'from-amber-400 to-orange-500' : 'from-emerald-400 to-cyan-500'} rounded-2xl blur opacity-30 group-hover:opacity-75 transition duration-300`}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 15 + Math.random() * 15, repeat: Infinity, linear: true }}
      />

      <motion.div
        className={`relative bg-white/95 backdrop-blur-lg p-6 rounded-2xl border ${color.border} shadow-xl`}
        whileHover={{ scale: 1.05, y: -5 }}
        transition={{ duration: 0.3 }}
      >
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${color.light} text-2xl`}>
          {item.icon}
        </div>
        <motion.h4
          className={`font-black text-slate-800 mb-1 ${color.text}`}
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          {item.title}
        </motion.h4>
        <p className="text-xs text-slate-600 mb-4">{item.desc}</p>

        <motion.label
          className={`block w-full text-center py-3 rounded-lg text-xs font-black cursor-pointer transition-all relative overflow-hidden group/btn ${
            uploadingType === item.id 
              ? 'opacity-50 cursor-not-allowed' 
              : color.text
          }`}
          whileHover={{ scale: uploadingType ? 1 : 1.05 }}
        >
          {/* Button background gradient */}
          <motion.div
            className={`absolute inset-0 ${color.bg}`}
            animate={uploadingType === item.id ? { opacity: [0.5, 1, 0.5] } : { opacity: 1 }}
            transition={{ duration: 1.5, repeat: uploadingType === item.id ? Infinity : 0 }}
          />

          <span className="relative flex items-center justify-center gap-2">
            {uploadingType === item.id ? (
              <>
                <motion.div
                  className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, linear: true }}
                />
                Processing...
              </>
            ) : (
              <>📤 {item.btnLabel}</>
            )}
          </span>

          <input 
            type="file" 
            className="hidden" 
            accept=".xlsx, .xls"
            onChange={(e) => handleFileUpload(e, item.id as any)}
            disabled={uploadingType !== null}
          />
        </motion.label>
      </motion.div>
    </motion.div>
  );
};

const Reports = ({ semester }: ReportsProps) => {
  const [data, setData] = useState<{ courses: CourseStats[] }>({ courses: [] });
  const [depts, setDepts] = useState<Department[]>([]);
  const [stats, setStats] = useState<any>(null); // hold dashboard counts
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [uploadingType, setUploadingType] = useState<string | null>(null);

  const fetchData = async () => {
    if (!semester) return;
    setLoading(true);
    try {
      const [reportJson, deptsJson, statsJson] = await Promise.all([
        dataService.getReportData(),
        dataService.getDepartments(),
        dataService.getDashboardStats()
      ]);
      setData(reportJson);
      setDepts(deptsJson);
      setStats(statsJson);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [semester]);

  const downloadWordReport = async () => {
    if (!semester) return;

    const totalEnrolled = data.courses.reduce((sum, c) => sum + c.enrolled, 0);
    const totalSuccessful = data.courses.reduce((sum, c) => sum + c.successful, 0);
    const totalEliteGold = data.courses.reduce((sum, c) => sum + c.elite_gold, 0);
    const totalEliteSilver = data.courses.reduce((sum, c) => sum + c.elite_silver, 0);
    const totalElite = data.courses.reduce((sum, c) => sum + c.elite, 0);

    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          new Paragraph({
            text: "Chevalier T. Thomas Elizabeth College for Women",
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            text: "NPTEL REPORT",
            heading: HeadingLevel.HEADING_2,
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            text: `(${semester.period} ${semester.year})`,
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 },
          }),

          new Paragraph({
            children: [
              new TextRun(`In the ${semester.period} ${semester.year} semester, `),
              new TextRun({ text: `${totalEnrolled}`, bold: true }),
              new TextRun(` students from Chevalier T. Thomas Elizabeth College for Women continued to showcase their dedication to academic excellence by enrolling in a variety of NPTEL courses. As one of India's most prestigious online learning platforms, NPTEL offers a rich selection of subjects across engineering, science, humanities, and management. This semester, students engaged in courses spanning topics such as programming, mathematics, communication skills, and other specialized domains, thereby enhancing their knowledge and strengthening their academic foundation.`),
            ],
            spacing: { after: 200 },
          }),

          new Paragraph({
            text: "A key highlight of the NPTEL learning model is its weekly assessments, which play a crucial role in helping learners track their progress. These evaluations serve as important checkpoints, ensuring that students remain consistent and committed throughout the course duration.",
            spacing: { after: 200 },
          }),

          new Paragraph({
            children: [
              new TextRun(`Among the `),
              new TextRun({ text: `${totalEnrolled}`, bold: true }),
              new TextRun(` enrolled students, `),
              new TextRun({ text: `${totalSuccessful}`, bold: true }),
              new TextRun(` students have successfully earned their NPTEL certifications in this cycle. Their achievements are as follows:`),
            ],
            spacing: { after: 200 },
          }),

          ...(totalEliteGold > 0 ? [
            new Paragraph({
              children: [
                new TextRun({ text: "Elite + Gold Certification: ", bold: true }),
                new TextRun(`${totalEliteGold} student${totalEliteGold !== 1 ? 's' : ''}`),
              ],
              bullet: { level: 0 },
            })
          ] : []),
          ...(totalEliteSilver > 0 ? [
            new Paragraph({
              children: [
                new TextRun({ text: "Elite + Silver Certification: ", bold: true }),
                new TextRun(`${totalEliteSilver} student${totalEliteSilver !== 1 ? 's' : ''}`),
              ],
              bullet: { level: 0 },
            })
          ] : []),
          ...(totalElite > 0 ? [
            new Paragraph({
              children: [
                new TextRun({ text: "Elite Certification: ", bold: true }),
                new TextRun(`${totalElite} student${totalElite !== 1 ? 's' : ''}`),
              ],
              bullet: { level: 0 },
            })
          ] : []),
          
          new Paragraph({ text: "", spacing: { before: 200 } }),

          new Paragraph({
            text: "These accomplishments reflect the students' hard work, perseverance, and strong understanding of the course material. Their success highlights not only their individual excellence but also the increasing academic enthusiasm and commitment present within the institution.",
            spacing: { after: 200 },
          }),

          new Paragraph({
            text: "The active engagement with NPTEL courses during this semester demonstrates the college's continuous effort to promote self-learning, upskilling, and academic growth. It also reinforces the students' passion for expanding their knowledge and embracing opportunities for continuous learning across diverse disciplines.",
            spacing: { after: 400 },
          }),
        ],
      }],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, `NPTEL_Final_Report_${semester.year}_${semester.period.replace(/ /g, '_')}.docx`);
  };

  const generateExcelData = () => {
    const excelRows = data.courses.map((c, i) => ({
      'S.No': i + 1,
      'Course Name': c.course_name,
      'Enrolled': c.enrolled,
      'Successfully Completed': c.successful,
      'Elite': c.elite,
      'Elite+Silver': c.elite_silver,
      'Elite+Gold': c.elite_gold
    }));

    excelRows.push({
      'S.No': 'TOTAL',
      'Course Name': '',
      'Enrolled': data.courses.reduce((sum, c) => sum + c.enrolled, 0),
      'Successfully Completed': data.courses.reduce((sum, c) => sum + c.successful, 0),
      'Elite': data.courses.reduce((sum, c) => sum + c.elite, 0),
      'Elite+Silver': data.courses.reduce((sum, c) => sum + c.elite_silver, 0),
      'Elite+Gold': data.courses.reduce((sum, c) => sum + c.elite_gold, 0)
    } as any);

    const worksheet = XLSX.utils.json_to_sheet(excelRows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Course-wise Performance Summary");
    
    return workbook;
  };

  const downloadExcelReport = () => {
    if (!semester) return;
    const workbook = generateExcelData();
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, `NPTEL_Consolidated_Report_${semester.year}_${semester.period.replace(/ /g, '_')}.xlsx`);
  };

  const sendExcelReportToHods = async () => {
    if (!semester) return;
    
    const configuredHods = depts.filter(d => d.hod_email);
    if (configuredHods.length === 0) {
      alert("⚠️ No HODs configured. Please set up HOD emails first.");
      return;
    }

    setSending(true);
    try {
      const workbook = generateExcelData();
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'base64' });
      
      const fileName = `NPTEL_Consolidated_Report_${semester.year}_${semester.period.replace(/ /g, '_')}.xlsx`;
      const subject = `NPTEL Report: ${semester.period} ${semester.year}`;
      const text = `Dear HOD,\n\nPlease find the NPTEL report attached.\n\nRegards,\nNPTEL Coordinator`;

      const attachments = [{
        filename: fileName,
        content: excelBuffer,
        encoding: 'base64'
      }];

      const targetEmails = configuredHods.map(d => d.hod_email) as string[];
      
      const results = [];
      for (const email of targetEmails) {
        try {
          await dataService.sendEmail({ to: email, subject, text, attachments });
          results.push({ email, success: true });
        } catch (err: any) {
          results.push({ email, success: false, error: err.message });
        }
      }

      const successCount = results.filter(r => r.success).length;
      alert(`✅ Report sent to ${successCount}/${targetEmails.length} HODs!`);
    } catch (error) {
      alert("❌ Error sending report");
    } finally {
      setSending(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'enrollments' | 'registrations' | 'results') => {
    if (!semester || !e.target.files?.[0]) return;
    const file = e.target.files[0];
    setUploadingType(type);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const base64 = btoa(
        new Uint8Array(arrayBuffer)
          .reduce((data, byte) => data + String.fromCharCode(byte), '')
      );

      const wb = XLSX.read(arrayBuffer, { type: 'array' });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const rawData = XLSX.utils.sheet_to_json(ws) as any[];

      let payload: any[] = [];
      let endpoint = '';

      if (type === 'enrollments') {
        endpoint = '/api/upload/enrollments';
        payload = rawData.map((row: any) => {
          const name = row['Course Name'] || row['course_name'];
          return {
            email: row['Email'] || row['email'],
            name: row['Name'] || row['name'],
            course_id: name,
            course_name: name
          };
        }).filter(p => p.email && p.course_id);
      } else if (type === 'registrations') {
        endpoint = '/api/upload/registrations';
        payload = rawData.map((row: any) => {
          const name = row['Course Name'] || row['course_name'];
          return {
            email: row['Email'] || row['email'],
            course_id: name,
            course_name: name
          };
        }).filter(p => p.email && p.course_id);
      } else if (type === 'results') {
        endpoint = '/api/upload/results';
        payload = rawData.map((row: any) => {
          const name = row['Course Name'] || row['course_name'];
          return {
            email: row['Email'] || row['email'],
            course_id: name,
            course_name: name,
            score: parseInt(row['Score'] || '0'),
            status: row['Status'] || ''
          };
        }).filter(p => p.email && p.course_id);
      }

      if (endpoint && payload.length > 0) {
        const res: any = await dataService.uploadData(endpoint, {
          semester_id: semester.id,
          [type]: payload,
          base64,
          fileName: file.name
        });
        const countMsg = res && typeof res.rows === 'number' ? ` (${res.rows} rows)` : '';
        alert(`✅ ${type} data updated${countMsg}!`);
        fetchData();
      } else {
        alert("⚠️ No valid data found");
      }
    } catch (err: any) {
      alert(`❌ Error: ${err.message}`);
    } finally {
      setUploadingType(null);
      if (e.target) e.target.value = '';
    }
  };

  if (!semester) return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center p-20 bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl border-2 border-dashed border-slate-300"
    >
      <motion.div className="text-6xl mb-4" animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
        ⚠️
      </motion.div>
      <h3 className="text-2xl font-black bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">
        No Active Semester
      </h3>
      <p className="text-slate-600 mt-2">Please configure and select a semester first.</p>
    </motion.div>
  );

  return (
    <motion.div
      className="space-y-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      {stats && (
        <div className="mb-4 text-xs text-slate-600">
          <p>Enrolled rows: {stats.enrolledRows ?? stats.enrolled} &middot; unique students: {stats.enrolled}</p>
          <p>Certified rows: {stats.certifiedRows ?? stats.certified} &middot; unique students: {stats.certified}</p>
        </div>
      )}
      <motion.div
        className="flex justify-between items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div>
          <motion.h3
            className="text-4xl font-black bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            📊 Final Reports
          </motion.h3>
          <motion.p
            className="text-slate-600 mt-2 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Comprehensive data analysis and reporting
          </motion.p>
        </div>

        <motion.div
          className="flex gap-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.button 
            onClick={fetchData}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transition-all"
          >
            🔄 Refresh
          </motion.button>
          <motion.div
            className="px-6 py-3 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-xl font-bold text-sm shadow-lg"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            📅 {semester.year}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Report Table */}
      <motion.div
        className="relative group"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <motion.div
          className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-300"
        />

        <div className="relative bg-white/95 backdrop-blur-lg rounded-3xl border border-slate-200/50 shadow-2xl overflow-hidden">
          {/* Header Actions */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 p-8 border-b border-slate-100">
            <motion.h4
              className="text-xl font-black text-slate-800"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              📈 Course Performance Summary
            </motion.h4>

            <motion.div
              className="flex gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <motion.button
                onClick={downloadWordReport}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-gradient-to-r from-blue-400 to-purple-500 text-white rounded-lg font-bold text-xs shadow-lg hover:shadow-xl transition-all"
              >
                📄 Word
              </motion.button>
              <motion.button
                onClick={downloadExcelReport}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-gradient-to-r from-emerald-400 to-cyan-500 text-white rounded-lg font-bold text-xs shadow-lg hover:shadow-xl transition-all"
              >
                📑 Excel
              </motion.button>
              <motion.button
                onClick={sendExcelReportToHods}
                disabled={sending || data.courses.length === 0}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-gradient-to-r from-pink-400 to-red-500 text-white rounded-lg font-bold text-xs shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
              >
                {sending ? '⏳ Sending...' : '📧 HODs'}
              </motion.button>
            </motion.div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-slate-100 to-slate-50 text-slate-700 text-xs font-black uppercase tracking-wider border-b-2 border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left">#</th>
                  <th className="px-6 py-4 text-left">Course</th>
                  <th className="px-6 py-4 text-center">Enrolled</th>
                  <th className="px-6 py-4 text-center">Completed</th>
                  <th className="px-6 py-4 text-center">Elite</th>
                  <th className="px-6 py-4 text-center">Elite+Silver</th>
                  <th className="px-6 py-4 text-center">Elite+Gold</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-20 text-center">
                      <motion.div
                        className="w-8 h-8 border-3 border-purple-500 border-t-transparent rounded-full mx-auto"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, linear: true }}
                      />
                    </td>
                  </tr>
                ) : data.courses.length > 0 ? (
                  <>
                    <AnimatePresence>
                      {data.courses.map((c, i) => (
                        <AnimatedTableRow key={i} data={c} index={i} />
                      ))}
                    </AnimatePresence>

                    {/* Total Row */}
                    <motion.tr
                      className="bg-gradient-to-r from-cyan-50 to-purple-50 font-black border-t-2 border-slate-300"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: data.courses.length * 0.05 + 0.1 }}
                    >
                      <td className="px-6 py-4 text-xs text-slate-500 uppercase" colSpan={2}>📊 Total</td>
                      <td className="px-6 py-4 text-center text-indigo-700">{data.courses.reduce((sum, c) => sum + c.enrolled, 0)}</td>
                      <td className="px-6 py-4 text-center text-emerald-700">{data.courses.reduce((sum, c) => sum + c.successful, 0)}</td>
                      <td className="px-6 py-4 text-center text-amber-700">{data.courses.reduce((sum, c) => sum + c.elite, 0)}</td>
                      <td className="px-6 py-4 text-center text-slate-700">{data.courses.reduce((sum, c) => sum + c.elite_silver, 0)}</td>
                      <td className="px-6 py-4 text-center text-yellow-700">{data.courses.reduce((sum, c) => sum + c.elite_gold, 0)}</td>
                    </motion.tr>
                  </>
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-20 text-center">
                      <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-6xl mb-4"
                      >
                        📭
                      </motion.div>
                      <p className="text-slate-400 font-semibold">Upload data to see reports</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Reports;
