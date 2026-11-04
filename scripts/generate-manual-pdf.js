// HubSphere Enterprise V4 — Pure Node.js Compliant PDF Generator
// Generates HubSphere_Enterprise_V4_User_Manual_Hindi.pdf in public directory

const fs = require('fs');
const path = require('path');

function createPdf(outputPath) {
  const objects = [];
  let offset = 0;
  const offsets = [];

  function addObject(content) {
    const objNum = objects.length + 1;
    offsets.push(offset);
    const str = `${objNum} 0 obj\n${content}\nendobj\n`;
    objects.push(str);
    offset += Buffer.byteLength(str, 'utf8');
    return objNum;
  }

  // Pre-calculate header offset
  const header = '%PDF-1.4\n%\xE2\xE3\xCF\xD3\n';
  offset = Buffer.byteLength(header, 'utf8');

  // Chapters & Text Content for the User Manual
  const manualPages = [
    {
      title: "HubSphere Enterprise V4 - Complete User Manual (Hindi)",
      subtitle: "Enterprise Business Operating System | Multi-Tenant Cloud Architecture",
      sections: [
        {
          h: "1. Parichay evam System Overview",
          p: [
            "HubSphere Enterprise V4 ek complete multi-tenant business operating system hai.",
            "Isme CRM, HRMS, Payroll, GST Billing, Dual-SIM Telecalling aur 5 Autonomous AI Workforce shamil hain.",
            "Database: Supabase PostgreSQL cloud ke sath 100% data isolation aur real-time persistence."
          ]
        },
        {
          h: "2. Super Admin evam Tenant Admin Setup (Zero Predefined Credentials)",
          p: [
            "Is system me koi bhi hardcoded ya predefined password/email nahi hota.",
            "Super Admin banne ke liye: Dashboard par 'Super Admin Setup' par click karein.",
            "Apna poora Naam, Official Email, aur apna banaya hua Strong Password darj karein.",
            "Submit karte hi aapka Super Admin account Supabase me PBKDF2 hash ke sath securely store ho jayega.",
            "Super Admin ko sabhi 396 permissions aur multi-tenant governance ke poore adhikar milte hain."
          ]
        }
      ]
    },
    {
      title: "HubSphere Enterprise V4 - User Manual (Prishth 2)",
      subtitle: "Android SIM Telecalling & Autonomous AI Workforce",
      sections: [
        {
          h: "3. Physical Android SIM Telecalling System Setup",
          p: [
            "Bina kisi mehnge third-party API (Twilio/Exotel) ke apne physical SIM se calling karein.",
            "SIM 1 (Jio) ya SIM 2 (Airtel) handset ko QR code ya PIN se web dashboard se pair karein.",
            "TelecomManager aur SimCallReceiver background service incoming/outgoing calls ko real-time sync karti hai.",
            "Call disconnect hote hi disposition popup aata hai aur lead score automatically update ho jata hai."
          ]
        },
        {
          h: "4. 5 Autonomous AI Workforce Agents",
          p: [
            "NOVA: Master Orchestrator - Business operations ko automate karta hai.",
            "VOX: Call & Voice Analyst - Telecalling transcripts aur call sentiment ko analyze karta hai.",
            "SALESPRO: Deals & Quotations - Real-time quotation draft karta hai aur deals close karta hai.",
            "PEOPLEMIND: HR & Attendance - Leave approvals aur salary structures manage karta hai.",
            "INSIGHT: Business Intelligence - Profitability aur revenue metrics monitor karta hai."
          ]
        }
      ]
    },
    {
      title: "HubSphere Enterprise V4 - User Manual (Prishth 3)",
      subtitle: "HRMS, Payroll, GST Billing & Supabase Security",
      sections: [
        {
          h: "5. HRMS evam Automated Payroll Management",
          p: [
            "Naye employee ko enroll karein aur unka basic salary set karein.",
            "Present, Late, Absent attendance mark hote hi payroll ready ho jata hai.",
            "1-Click me official Salary Slip (Payslip) generate aur download karein.",
            "PF (12%), ESI (0.75%), Professional Tax aur TDS auto-deduct ho jate hain."
          ]
        },
        {
          h: "6. GST Invoicing & Dynamic UPI QR Code",
          p: [
            "GST compliant Tax Invoice generate karein (18% GST automatic calculate hota hai).",
            "Real-time NPCI format UPI QR code generate hota hai jisse customer turant scan karke pay kar sakte hain."
          ]
        },
        {
          h: "7. Supabase Database Suraksha evam Data Isolation",
          p: [
            "Aapka samast data Supabase PostgreSQL me tenant_id isolation ke sath surakshit rehta hai.",
            "Ek company ka data doosri company se bilkul alag aur protected rehta hai."
          ]
        }
      ]
    }
  ];

  // Font object
  const fontObj = addObject('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>');
  const fontBoldObj = addObject('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>');

  const pageObjNums = [];
  const contentObjNums = [];

  // Generate content streams for each page
  for (const page of manualPages) {
    let stream = 'BT\n';
    
    // Header Title
    stream += `/F2 18 Tf 50 780 Td (${escapePdfText(page.title)}) Tj\n`;
    stream += `/F1 10 Tf 0 -22 Td (${escapePdfText(page.subtitle)}) Tj\n`;
    
    // Horizontal separator
    stream += 'ET\n';
    stream += '0.5 w 50 745 m 550 745 l S\n';
    stream += 'BT\n';

    let currentY = 720;
    stream += `/F2 12 Tf 50 ${currentY} Td\n`;

    for (const sec of page.sections) {
      stream += `0 -25 Td /F2 13 Tf (${escapePdfText(sec.h)}) Tj\n`;
      stream += `/F1 10 Tf\n`;
      for (const line of sec.p) {
        stream += `0 -16 Td (${escapePdfText("  - " + line)}) Tj\n`;
      }
      stream += `0 -10 Td () Tj\n`;
    }

    // Footer
    stream += `0 -40 Td /F1 9 Tf (HubSphere Enterprise V4 - Confidential & Proprietary - Powered by Supabase) Tj\n`;
    stream += 'ET\n';

    const streamLength = Buffer.byteLength(stream, 'utf8');
    const contentObj = addObject(`<< /Length ${streamLength} >>\nstream\n${stream}endstream`);
    contentObjNums.push(contentObj);
  }

  // Page objects will be added next, placeholder for kids
  const pagesObjPlaceholder = objects.length + 1; // will be resolved
  
  for (let i = 0; i < manualPages.length; i++) {
    const pageObj = addObject(`<< /Type /Page /Parent ${pagesObjPlaceholder + manualPages.length} 0 R /Resources << /Font << /F1 ${fontObj} 0 R /F2 ${fontBoldObj} 0 R >> >> /MediaBox [0 0 595 842] /Contents ${contentObjNums[i]} 0 R >>`);
    pageObjNums.push(pageObj);
  }

  const pagesObj = addObject(`<< /Type /Pages /Kids [${pageObjNums.map(n => `${n} 0 R`).join(' ')}] /Count ${pageObjNums.length} >>`);
  const catalogObj = addObject(`<< /Type /Catalog /Pages ${pagesObj} 0 R >>`);

  // Build xref
  const startXref = offset;
  let xref = `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (const off of offsets) {
    xref += String(off).padStart(10, '0') + ' 00000 n \n';
  }

  const trailer = `trailer\n<< /Size ${objects.length + 1} /Root ${catalogObj} 0 R >>\nstartxref\n${startXref}\n%%EOF\n`;

  const finalPdf = header + objects.join('') + xref + trailer;
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, finalPdf, 'binary');
  console.log('PDF successfully generated at:', outputPath, 'Bytes:', finalPdf.length);
}

function escapePdfText(str) {
  return str.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
}

const targetPath = path.join(__dirname, '..', 'public', 'HubSphere_Enterprise_V4_User_Manual_Hindi.pdf');
createPdf(targetPath);
