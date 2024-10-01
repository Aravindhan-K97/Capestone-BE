import PDFDocument from 'pdfkit';
import fs from 'fs';

//Function to generate and download role promotion report pdf 
//using a third party package - pdfkit
export const generateRolePromotionPDF = (roleHistories, res) => {
    const doc = new PDFDocument();
    const fileName = 'Role_Promotion_Report.pdf';
    const stream = fs.createWriteStream(fileName);
    
    doc.pipe(stream);
    
    doc.fontSize(20).text('Role Promotion Report', { align: 'center' });
    doc.moveDown();
    
    roleHistories.forEach(history => {
        doc.fontSize(12)
           .text(`Employee: ${history.employee?.userName || 'N/A'}`)
           .text(`Old Role: ${history.oldRole?.role || 'N/A'}`)
           .text(`New Role: ${history.newRole?.role || 'N/A'}`)
           .text(`Date of Promotion: ${new Date(history.dateOfChange).toLocaleDateString()}`)
           .moveDown();
    });

    doc.end();

    stream.on('finish', () => {
        res.download(fileName, () => {
            fs.unlinkSync(fileName); // Delete file after download
        });
    });
};

//Function to generate and download work period report pdf 
//using a third party package - pdfkit
export const generateEmployeeWorkPeriodPDF = (reports, res) => {
    const doc = new PDFDocument();
    const fileName = 'Employee_Work_Period_Report.pdf';
    const stream = fs.createWriteStream(fileName);
    
    doc.pipe(stream);
    
    doc.fontSize(20).text('Employee Work Period Report', { align: 'center' });
    doc.moveDown();
    
    reports.forEach(report => {
        doc.fontSize(12)
           .text(`Employee: ${report.userName}`)
           .text(`Department: ${report.department}`)
           .text(`Role: ${report.role}`)
           .text(`Date of Joining: ${new Date(report.dateOfJoining).toLocaleDateString()}`)
           .text(`Work Period: ${report.workPeriod} months`)
           .moveDown();
    });

    doc.end();

    stream.on('finish', () => {
        res.download(fileName, () => {
            fs.unlinkSync(fileName); // Delete file after download
        });
    });
};
