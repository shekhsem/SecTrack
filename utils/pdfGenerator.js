import PDFDocument from 'pdfkit';

export function generateAssetPDF(assets, stream) {
    const doc = new PDFDocument();
  
    doc.pipe(stream);
  
    doc.fontSize(16).text('Asset Report', { align: 'center' });
    doc.moveDown();
  
    assets.forEach((asset, index) => {
      doc.fontSize(12).text(
        `${index + 1}. ${asset.name} - ${asset.ip} - ${asset.statusId?.name ?? 'N/A'}`
      );
    });
  
    doc.end();
  }