"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Download, Printer, ShieldCheck, Sparkles, PhoneCall, Building2, Users, FileText, CheckCircle2 } from "lucide-react";

export default function UserManualHindi() {
  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500/30">
      {/* Top Header - No print */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 sticky top-0 z-50 shadow-lg print:hidden">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <Link
              href="/"
              className="flex items-center space-x-1.5 text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 px-3 py-2 rounded-lg transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>वापस डैशबोर्ड पर जाएं</span>
            </Link>
            <div className="h-4 w-px bg-slate-800 hidden sm:block"></div>
            <div>
              <h1 className="font-bold text-base text-white flex items-center space-x-2">
                <span>हबस्फेयर एंटरप्राइज V4 — सम्पूर्ण यूजर मैन्युअल</span>
                <span className="bg-indigo-500/20 text-indigo-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-indigo-500/30">
                  आधिकारिक हिन्दी संस्करण
                </span>
              </h1>
              <p className="text-xs text-slate-400">HubSphere Enterprise V4 Official Operations & Admin Guide</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <a
              href="/HubSphere_Enterprise_V4_User_Manual_Hindi.pdf"
              download="HubSphere_Enterprise_V4_User_Manual_Hindi.pdf"
              className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-md transition"
            >
              <Download className="w-4 h-4" />
              <span>डाउनलोड PDF फाइल</span>
            </a>

            <button
              onClick={handlePrint}
              className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-md transition"
            >
              <Printer className="w-4 h-4" />
              <span>प्रिंट / सेव PDF (Ctrl+P)</span>
            </button>
          </div>
        </div>
      </header>

      {/* Printable Document Container */}
      <main className="max-w-4xl mx-auto px-6 py-10 print:p-0 print:max-w-full">
        {/* Document Title Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 rounded-2xl p-8 mb-8 shadow-xl print:border-none print:shadow-none print:p-0 print:mb-6">
          <div className="flex items-center space-x-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4" />
            <span>ऑटोमैटिक मल्टी-टेनेंट एंटरप्राइज बिजनेस ऑपरेटिंग सिस्टम</span>
          </div>
          <h2 className="text-3xl font-black text-white leading-tight mb-3">
            हबस्फेयर एंटरप्राइज V4: यूजर एवं एडमिन संचालन मार्गदर्शिका
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed mb-4">
            इस मैन्युअल में सुपर एडमिन सेटअप, फिजिकल एंड्रॉयड सिम टेलीकॉलिंग, 5 ऑटोनॉमस एआई वर्कफोर्स, 
            सीआरएम लीड पाइपलाइन, एचआरएमएस पेरोल (पीएफ/ईएसआई) और 18% जीएसटी इनवॉइसिंग की सम्पूर्ण जानकारी दी गई है।
          </p>
          <div className="flex flex-wrap gap-3 text-xs text-slate-400">
            <span className="bg-slate-800/80 px-3 py-1 rounded-md border border-slate-700">संस्करण: 4.0.0 (Enterprise)</span>
            <span className="bg-slate-800/80 px-3 py-1 rounded-md border border-slate-700">क्लाउड डेटाबेस: सुपाबेस (Supabase PostgreSQL)</span>
            <span className="bg-slate-800/80 px-3 py-1 rounded-md border border-slate-700">सुरक्षा: PBKDF2 एन्क्रिप्शन एवं RLS</span>
          </div>
        </div>

        {/* Table of Contents */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 mb-8 print:border-slate-300 print:bg-white print:text-black">
          <h3 className="font-bold text-sm text-indigo-300 uppercase tracking-wider mb-4 flex items-center space-x-2">
            <FileText className="w-4 h-4" />
            <span>विषय सूची (Table of Contents)</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs text-slate-300 print:text-black">
            <div>1. हबस्फेयर V4 का परिचय एवं आर्किटेक्चर</div>
            <div>2. नया सुपर एडमिन एवं टेनेंट एडमिन कैसे बनें</div>
            <div>3. सुपाबेस (Supabase) डेटा सुरक्षा एवं बैकअप</div>
            <div>4. फिजिकल एंड्रॉयड सिम टेलीकॉलिंग सेटअप</div>
            <div>5. 5 स्वायत्त एआई कर्मचारी (AI Workforce) गाइड</div>
            <div>6. सीआरएम एवं सेल्स पाइपलाइन प्रबंधन</div>
            <div>7. एचआरएमएस एवं ऑटोमेटेड सैलरी स्लिप (पेरोल)</div>
            <div>8. 18% जीएसटी टैक्स इनवॉइस एवं यूपीआई क्यूआर</div>
            <div>9. 13 एंटरप्राइज रोल्स एवं 396 परमिशन्स</div>
            <div>10. समस्या निवारण एवं क्लाइंट सेल्स वॉकथ्रू</div>
          </div>
        </div>

        {/* Chapter 1 */}
        <section className="mb-10 print:mb-8">
          <div className="flex items-center space-x-3 mb-3 border-b border-slate-800 pb-2">
            <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">1</span>
            <h3 className="text-xl font-bold text-white print:text-black">हबस्फेयर V4 का परिचय एवं आर्किटेक्चर</h3>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed mb-4 print:text-black">
            हबस्फेयर एंटरप्राइज V4 एक संपूर्ण बिजनेस ऑपरेटिंग सिस्टम है जो किसी भी आधुनिक उद्यम की समस्त व्यावसायिक 
            प्रक्रियाओं को एक ही सुरक्षित क्लाउड प्लेटफॉर्म पर एकीकृत करता है। इसमें महँगे थर्ड-पार्टी टेलीफोनी एपीआई (जैसे Twilio या Exotel) 
            की आवश्यकता के बिना सीधे आपके मौजूदा एंड्रॉयड फोन के फिजिकल सिम कार्ड (Jio/Airtel/Vi) से व्यावसायिक कॉलिंग की सुविधा दी गई है।
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl print:bg-slate-100 print:text-black">
              <strong className="text-indigo-400 block mb-1">शून्य फेक डेटा</strong>
              सिस्टम में कोई भी डमी या हार्डकोडेड रिकॉर्ड नहीं है। प्रत्येक डेटा रियल-टाइम डेटाबेस से आता है।
            </div>
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl print:bg-slate-100 print:text-black">
              <strong className="text-emerald-400 block mb-1">मल्टी-टेनेंट अलगाव</strong>
              प्रत्येक कंपनी का डेटा दूसरे से पूर्णतः अलग और सुपाबेस पोस्टग्रेएसक्यूएल में सुरक्षित रहता है।
            </div>
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl print:bg-slate-100 print:text-black">
              <strong className="text-purple-400 block mb-1">5 स्वायत्त एआई कर्मचारी</strong>
              NOVA, VOX, SALESPRO, PEOPLEMIND और INSIGHT आपके कार्यों को 24x7 ऑटोमेट करते हैं।
            </div>
          </div>
        </section>

        {/* Chapter 2 - Crucial User Question */}
        <section className="mb-10 print:mb-8 bg-indigo-950/20 border border-indigo-900/50 rounded-2xl p-6 print:bg-transparent print:border-none print:p-0">
          <div className="flex items-center space-x-3 mb-3 border-b border-indigo-800/40 pb-2">
            <span className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center">2</span>
            <h3 className="text-xl font-bold text-amber-300 print:text-black">
              नया सुपर एडमिन (Super Admin) कैसे बनें? (Zero Predefined Credentials)
            </h3>
          </div>
          
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 mb-4 text-xs text-amber-200">
            <strong>महत्वपूर्ण सुरक्षा नियम:</strong> इस सिस्टम में पहले से बना हुआ कोई भी डिफॉल्ट पासवर्ड (जैसे admin/admin या password123) नहीं रखा गया है। 
            आप अपनी इच्छानुसार अपना नया सुरक्षित सुपर एडमिन खाता स्वयं बनाते हैं।
          </div>

          <h4 className="text-sm font-bold text-white mb-2 print:text-black">सुपर एडमिन बनने के 4 सरल चरण:</h4>
          <ol className="space-y-3 text-xs text-slate-300 print:text-black mb-6">
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong>चरण 1 (सेटअप बटन पर क्लिक करें):</strong> डैशबोर्ड के ऊपरी दाएँ कोने में प्रोफाइल आइकन पर क्लिक करें या 
                <strong> "+ New Admin / Provision Tenant"</strong> बटन दबाएं।
              </div>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong>चरण 2 (सुपर एडमिन रोल चुनें):</strong> रोल विकल्प में <strong>"SUPER_ADMIN (प्लेटफ़ॉर्म स्वामी)"</strong> का चयन करें।
              </div>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong>चरण 3 (अपनी जानकारी भरें):</strong> अपना पूरा नाम (उदा. मनीष मुखर्जी), आधिकारिक ईमेल आईडी, और कम से कम 6 अक्षरों का 
                अपना नया मजबूत पासवर्ड दर्ज करें।
              </div>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong>चरण 4 (सबमिट करें):</strong> <strong>"Register Admin"</strong> बटन दबाते ही आपका खाता 
                सुपाबेस पोस्टग्रेएसक्यूएल डेटाबेस में PBKDF2 एन्क्रिप्शन के साथ सुरक्षित रूप से सेव हो जाता है और आपको सभी 396 अनुमतियां तुरंत मिल जाती हैं।
              </div>
            </li>
          </ol>
        </section>

        {/* Chapter 3 */}
        <section className="mb-10 print:mb-8">
          <div className="flex items-center space-x-3 mb-3 border-b border-slate-800 pb-2">
            <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">3</span>
            <h3 className="text-xl font-bold text-white print:text-black">सुपाबेस (Supabase) डेटा सुरक्षा एवं बैकअप</h3>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed mb-3 print:text-black">
            HubSphere V4 आपका प्रत्येक बिजनेस रिकॉर्ड (Leads, Deals, Employees, Invoices, SIM Call Logs) 
            सुपाबेस के एंटरप्राइज-ग्रेड पोस्टग्रेएसक्यूएल क्लाउड में सुरक्षित रखता है:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-300 print:text-black mb-4">
            <li><strong>टेनेंट अलगाव (Tenant Isolation):</strong> प्रत्येक क्वेरी में अनिवार्य रूप से <code className="bg-slate-800 px-1 py-0.5 rounded text-indigo-300">tenant_id</code> फ़िल्टर लागू होता है।</li>
            <li><strong>पासवर्ड एन्क्रिप्शन:</strong> सभी एडमिन पासवर्ड 100,000 इटरेशन वाले PBKDF2 और रैंडम 32-बाइट सॉल्ट के साथ हैश किए जाते हैं।</li>
            <li><strong>ऑटोमैटिक क्लाउड बैकअप:</strong> डेटाबेस में किसी भी समय फेलियर होने पर ऑटो-रिकवरी की सुविधा उपलब्ध है।</li>
          </ul>
        </section>

        {/* Chapter 4 */}
        <section className="mb-10 print:mb-8">
          <div className="flex items-center space-x-3 mb-3 border-b border-slate-800 pb-2">
            <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">4</span>
            <h3 className="text-xl font-bold text-white print:text-black">फिजिकल एंड्रॉयड सिम टेलीकॉलिंग सिस्टम</h3>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed mb-3 print:text-black">
            यह सिस्टम आपके सामान्य एंड्रॉयड स्मार्टफोन को एक एंटरप्राइज कॉल सेंटर में बदल देता है:
          </p>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-xs text-slate-300 print:bg-slate-100 print:text-black space-y-2">
            <p><strong>1. फोन पेयरिंग:</strong> डैशबोर्ड पर <strong>"+ Pair Android Handset"</strong> पर क्लिक करके फोन का नाम और सिम 1/2 का ऑपरेटर (Jio/Airtel) चुनें।</p>
            <p><strong>2. टेलीकॉम सर्विस:</strong> एंड्रॉयड कंपेनियन ऐप <code className="text-indigo-400">TelecomConnectionService</code> का उपयोग करके बिना किसी थर्ड-पार्टी चार्ज के कॉलिंग करता है।</p>
            <p><strong>3. ऑटो-सिंक:</strong> कॉल समाप्त होते ही कॉल की अवधि, सिम स्लॉट, और बातचीत का परिणाम (Disposition) तुरंत वेब सीआरएम में लीड रिकॉर्ड के साथ जुड़ जाता है।</p>
          </div>
        </section>

        {/* Chapter 5 */}
        <section className="mb-10 print:mb-8">
          <div className="flex items-center space-x-3 mb-3 border-b border-slate-800 pb-2">
            <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">5</span>
            <h3 className="text-xl font-bold text-white print:text-black">5 स्वायत्त एआई कर्मचारी (AI Workforce)</h3>
          </div>
          <div className="space-y-3 text-xs">
            <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-lg">
              <strong className="text-indigo-400 text-sm">NOVA (मास्टर बिजनेस ऑर्केस्ट्रेटर):</strong> पूरे वर्कफ़्लो को नियंत्रित करता है और विभागों के बीच कार्यों का समन्वय करता है।
            </div>
            <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-lg">
              <strong className="text-emerald-400 text-sm">VOX (टेलीकॉलिंग वॉयस एनालाइजर):</strong> सिम कॉल्स के नोट्स, बातचीत के मूड (Sentiment) और फॉलो-अप्स का विश्लेषण करता है।
            </div>
            <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-lg">
              <strong className="text-blue-400 text-sm">SALESPRO (सेल्स एवं डील क्लोजर):</strong> लीड्स को 100 में से स्कोर देता है और स्वचालित पीडीएफ कोटेशन तैयार करता है।
            </div>
            <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-lg">
              <strong className="text-pink-400 text-sm">PEOPLEMIND (एचआर एवं पेरोल मैनेजर):</strong> कर्मचारियों की उपस्थिति, छुट्टी की मंजूरी और सैलरी स्लिप के प्रश्नों का उत्तर देता है।
            </div>
            <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-lg">
              <strong className="text-amber-400 text-sm">INSIGHT (बिजनेस इंटेलिजेंस एवं प्रॉफिट एनालिटिक्स):</strong> कंपनी के मुनाफे, खर्चों और रेवेन्यू पाइपलाइन का पूर्वानुमान बताता है।
            </div>
          </div>
        </section>

        {/* Chapter 6 & 7 */}
        <section className="mb-10 print:mb-8">
          <div className="flex items-center space-x-3 mb-3 border-b border-slate-800 pb-2">
            <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">6 & 7</span>
            <h3 className="text-xl font-bold text-white print:text-black">सीआरएम एवं ऑटोमेटेड पेरोल (Salary Slips)</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300 print:text-black">
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
              <h4 className="font-bold text-sm text-indigo-400 mb-2">सीआरएम लीड्स एवं डील्स</h4>
              <p className="mb-2"><strong>"+ Capture Lead"</strong> बटन दबाकर ग्राहक का नाम, मोबाइल नंबर और अनुमानित मूल्य भरें।</p>
              <p>सिस्टम मूल्य के आधार पर 100 में से लीड स्कोर निर्धारित करता है (जैसे ₹10 लाख से अधिक पर 95/100 स्कोर)।</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
              <h4 className="font-bold text-sm text-emerald-400 mb-2">एचआर पेरोल एवं सैलरी स्लिप</h4>
              <p className="mb-2">कर्मचारी को नामांकित करने के बाद <strong>"Generate Slip"</strong> पर क्लिक करें।</p>
              <p>सिस्टम स्वचालित रूप से पीएफ (12%), ईएसआई (0.75%), और टीडीएस काटकर आधिकारिक सैलरी स्लिप तैयार करता है जिसे सीधे डाउनलोड या प्रिंट किया जा सकता है।</p>
            </div>
          </div>
        </section>

        {/* Chapter 8 & 9 */}
        <section className="mb-10 print:mb-8">
          <div className="flex items-center space-x-3 mb-3 border-b border-slate-800 pb-2">
            <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">8 & 9</span>
            <h3 className="text-xl font-bold text-white print:text-black">18% जीएसटी इनवॉइसिंग एवं रोल-बेस्ड परमिशन्स</h3>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-xs text-slate-300 print:bg-slate-100 print:text-black mb-4">
            <h4 className="font-bold text-sm text-white print:text-black mb-1">जीएसटी टैक्स इनवॉइस एवं डायनामिक यूपीआई क्यूआर</h4>
            <p>
              बिलिंग अनुभाग में <strong>"+ Issue Tax Invoice"</strong> दबाएं। सिस्टम मूल राशि पर स्वतः 18% जीएसटी जोड़ता है 
              (जैसे ₹50,000 + ₹9,000 = ₹59,000) और तुरंत एनपीसीआई (NPCI) अनुरूप डायनामिक यूपीआई क्यूआर कोड बनाता है जिसे ग्राहक अपने फोनपे/गूगलपे से सीधे स्कैन करके भुगतान कर सकता है।
            </p>
          </div>
        </section>

        {/* Footer in print */}
        <div className="border-t border-slate-800 pt-6 text-center text-xs text-slate-500 print:border-slate-300 print:text-slate-600">
          <p>© 2026 HubSphere Enterprise V4. सर्वाधिकार सुरक्षित। क्लाउड डेटाबेस: सुपाबेस पोस्टग्रेएसक्यूएल।</p>
        </div>
      </main>
    </div>
  );
}
