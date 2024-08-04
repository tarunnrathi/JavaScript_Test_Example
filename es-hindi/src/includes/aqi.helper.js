import { arrayOnly } from "./article.util";

const sorter = (data, dir, field) => {
  if (!Array.isArray(data)) {
    return [];
  }

  return data.sort((a, b) => {
    if (field == "name") {
      if (dir) {
        return a.locationName.localeCompare(b.locationName);
      } else {
        return b.locationName.localeCompare(a.locationName);
      }
    }

    if (["aqi", "pm25", "pm10", "t", "h"].includes(field)) {
      if (field == "t" || field == "h") {
        a = field == "t" ? a.weatherData : a.humidity;
        b = field == "t" ? b.weatherData : b.humidity;
      } else {
        a = arrayOnly(a.airComponents).find(
          (i) => i.sensorName == field
        )?.sensorData;
        b = arrayOnly(b.airComponents).find(
          (i) => i.sensorName == field
        )?.sensorData;
      }

      if (!a) {
        a = 0;
      }

      if (!b) {
        b = 0;
      }

      if (dir) {
        return b - a;
      } else {
        return a - b;
      }
    }
  });
};

const getStatus = (air) => {
  if (!air) {
    return null;
  }

  const map = {
    0: "good",
    1: "moderate",
    2: "poor",
    3: "poor",
    4: "unhealthy",
    5: "unhealthy",
    6: "severe",
    7: "severe",
  };

  return map[Math.floor(air / 400 / 0.125)] || "hazardous";
};

const trans = (c) => {
  const map = {
    Abohar: "अबोहर",
    Amritsar: "अमृतसर",
    Haripur: "हरिपुर",
    Jalandhar: "जालंधर",
    "Khem Karan": "खेम करन",
    Ludhiana: "लुधियाना",
    Malaut: "मलोट",
    Mauli: "मौली",
    Pathankot: "पठानकोट",
    Patiala: "पटियाला",
    Abu: "अबू",
    Ajmer: "अजमेर",
    Alwar: "अलवर",
    Bharatpur: "भरतपुर",
    Bhilwara: "भीलवाड़ा",
    Bikaner: "बीकानेर",
    Chittaurgarh: "चितौड़गढ़",
    Jaipur: "जयपुर",
    Jaisalmer: "जैसलमेर",
    Jalor: "जालोर",
    Jodhpur: "जोधपुर",
    Kota: "कोटा",
    Pali: "पाली",
    Pushkar: "पुष्कर",
    Sikar: "सीकर",
    Tonk: "टोंक",
    Udaipur: "उदयपुर",
    Addanki: "अद्दंकी",
    Adoni: "अदोनी",
    Amalapuram: "अमलापुरम",
    Amudalavalasa: "अमुद्वालासा",
    Anakapalle: "अनकापल्ली",
    Anantapur: "अनंतपुर",
    Badvel: "बडवेल",
    Bapatla: "बापतला",
    Bezwada: "बेजवाडा",
    Bhimavaram: "भीमावरम",
    Bhimunipatnam: "भीमुनिपट्टनम",
    Bobbili: "बोब्बिली",
    Chicacole: "चिकाकोले",
    Chilakaluripet: "चिलाकलूरीपेट",
    Chilakalurupet: "चिलाकलूरीपेट",
    Chimakurti: "चिमकूर्ति",
    Chipurupalle: "चिपुरुपल्लि",
    Chirala: "चिराला",
    Chittoor: "चित्तूर",
    Cuddapah: "कड़पा",
    Dharmavaram: "धर्मावरम",
    Draksharama: "द्राक्षारामा",
    Ellore: "एलोर",
    Emmiganur: "एमिगनुर",
    Giddalur: "गिद्दलुर",
    Gudivada: "गुडिवाड",
    Guntakal: "गुंतकल",
    Guntur: "गुंटूर",
    Hindupur: "हिन्दुपुर",
    Jammalamadugu: "जम्मलामादुगु",
    Kadiri: "कादिरी",
    Kakinada: "काकीनाडा",
    Kandukur: "कंडुकुर",
    Kavali: "कवाली",
    Koilkuntla: "कोइकंटला",
    Kovvur: "कोव्वुर",
    Kurnool: "कुरनूल",
    Macherla: "माचेरला",
    Machilipatnam: "मछलीपट्टनम",
    Madanapalle: "मदनपल्ली",
    Mandapeta: "मंडपेटा",
    Mangalagiri: "मंगलगिरी",
    Markapur: "मरकापुर",
    Nagari: "नगरी",
    Nandyal: "नांदयाल",
    Narasannapeta: "नरासनापेटा",
    Narasapur: "नरसापुर",
    Narasaraopet: "नरसारोपेट",
    Nellore: "नेल्लोर",
    Nidadavole: "निदादावोले",
    Ongole: "ओंगोल",
    Palakollu: "पलाकोल्लू",
    Palmaner: "पाल्मनर",
    Pamidi: "पमिदी",
    Parigi: "पारिगी",
    Pedana: "पेडाना",
    "Pedda Nandipadu": "पेड्डा नंदिपादु",
    Pithapuram: "पीथापुरम",
    Ponduru: "पोंडुरु",
    Ponnuru: "पोन्नुरु",
    Proddatur: "प्रोद्दातुर",
    Pulivendla: "पुलिवेन्दुला",
    Punganuru: "पुंगगुरु",
    Puttur: "पुत्तूर",
    Rajahmundry: "राजमंड्री",
    Rayachoti: "रायचोटी",
    Repalle: "रेपल्ले",
    Samalkot: "समलकोट",
    Sattenapalle: "सत्तेनपल्ले",
    Tadepalle: "ताडेपल्ली",
    Tadepallegudem: "ताड़ेपल्लीगुड़म",
    Tadpatri: "ताड़पत्री",
    Tanuku: "टनुकु",
    Tenali: "टेनली",
    Tirupati: "तिरुपति",
    Tuni: "तुनि",
    Venkatagiri: "वेंकटगिरी",
    Vinukonda: "विनुकोंडा",
    Vishakhapatnam: "विशाखापत्तनम",
    Vizianagaram: "विजयनगरम",
    Adilabad: "आदिलाबाद",
    Armur: "आर्मर",
    Belampalli: "बेलमपल्ली",
    Bhainsa: "भंसा",
    Bodhan: "बोधन",
    Bodupal: "बोडुपाल",
    Devarkonda: "देवाराकोंदा",
    Dubbak: "दुबबक",
    Gadwal: "गडवाल",
    Hyderabad: "हैदराबाद",
    Jaggayyapeta: "जग्गय्यपेटा",
    Jagtial: "जगित्याल",
    Jangaon: "जनगांव",
    Kamareddipet: "कामारेडिपेट",
    Karimnagar: "करीमनगर",
    Khammam: "खम्मम",
    Koratla: "कोराटला",
    Kothapet: "कोठापेट",
    Kottagudem: "कोठागुडम",
    Mahbubnagar: "महबुबनगर",
    Mancheral: "मैनचेरल",
    Mandamari: "मंडामारी",
    Mangur: "मंगुर",
    Metpalli: "मेटपल्ली",
    Nalgonda: "नलगोंडा",
    "Niala Kondapalle": "नियाला कोंडापले",
    Nizamabad: "निजामाबाद",
    Palwancha: "पालवांचा",
    Ramgundam: "रामगुंडम",
    Secunderabad: "सिकंदराबाद",
    Sirsilla: "सिरसिला",
    Suriapet: "सूर्यापेट",
    Vikarabad: "विकाराबाद",
    Wanparti: "वानपर्ती",
    Warangal: "वारंगल",
    Yellandu: "येलैंडु",
    Agartala: "अगरतला",
    Agra: "आगरा",
    Aligarh: "अलीगढ़",
    Allahabad: "प्रयागराज",
    Bahraich: "बहराइच",
    Barehra: "बरेहर",
    Bareilly: "बरेली",
    Budaun: "शाहजहांपुर",
    Bulandshahr: "बुलंदशहर",
    Etawah: "इटावा",
    Faizabad: "फैजाबाद",
    Fyzabad: 'फैजाबाद',
    Fatehpur: "फतेहपुर",
    "Fatehpur Sikri": "फतेहपुर सीकरी",
    Firozabad: "फिरोजाबाद",
    Faizabad: "फैजाबाद",
    Ghaziabad: "गाज़ियाबाद",
    Gorakhpur: "गोरखपुर",
    Hapur: "हापुड़",
    Hathras: "हाथरस",
    Jaunpur: "जौनपुर",
    Jhansi: "झांसी",
    Kairana: "कैराना",
    Kanpur: "कानपुर",
    Lucknow: "लखनऊ",
    Mathura: "मथुरा",
    Meerut: "मेरठ",
    Mirzapur: "मिर्जापुर",
    Moradabad: "मुरादाबाद",
    Muzaffarnagar: "मुजफ्फरनगर",
    Noida: "नोएडा",
    Pilibhit: "पीलीभीत",
    Rampur: "रामपुर",
    Saharanpur: "सहारनपुर",
    Sambhal: "संभल",
    Shahjanpur: "शाहजहांपुर",
    Sitalpur: "सिटलपुर",
    Varanasi: "वाराणसी",
    Vrindavan: "वृंदावन",
    Ahmadnagar: "अहमदनगर",
    Akola: "अकोला",
    Amravati: "अमरावती",
    Aurangabad: "औरंगाबाद",
    Bhayandar: "भायंदर",
    Bhiwandi: "भिवंडी",
    Bhusaval: "भुसावल",
    Chanda: "चंदा",
    Chinchvad: "चिंचवड",
    Dhulia: "धुलिया",
    Ichalkaranji: "इचलकरंजी",
    Jalgaon: "जलगांव",
    Junnar: "जुन्नर",
    Kalyan: "कल्याण",
    Khed: "खेड़",
    Kolhapur: "कोल्हापुर",
    Latur: "लातूर",
    Malegaon: "मालेगांव",
    Mumbai: "मुंबई",
    Nagpur: "नागपुर",
    Nanded: "नांदेड़",
    Nasik: "नासिक",
    Osmanabad: "उस्मानबाद",
    Panchgani: "पंचगनी",
    Parbhani: "परभनी",
    Pune: "पुणे",
    Sangli: "सांगली",
    Solapur: "सोलापुर",
    Thane: "ठाणे",
    Ulhasnagar: "उल्हासनगर",
    Uran: "उरान",
    Yavatmal: "यवतमाल",
    Ahmedabad: "अहमदाबाद",
    Ankleshwar: "अंकलेश्वर",
    Bhavnagar: "भावनगर",
    Bhuj: "भुज",
    Chikhli: "चिकली",
    Daman: "दमन",
    Dholka: "ढोल्का",
    Dwarka: "द्वारका",
    Ghandinagar: "गांधीनगर",
    Godhra: "गोधरा",
    Jamnagar: "जामनगर",
    Jasdan: "जसदन",
    Khambhat: "खंभत",
    "Khed Brahma": "खेडब्रह्मा",
    Mahesana: "मेहसाणा",
    Meghraj: "मेघराज",
    Mundra: "मुंद्रा",
    Naliya: "नालिया",
    Nandod: "नांदोड़",
    Navsari: "नवसारी",
    Porbandar: "पोरबंदर",
    Rajkot: "राजकोट",
    Sihor: "सीहोर",
    Surat: "सूरत",
    Vadodara: "वडोदरा",
    Valsad: "वलसाड",
    Vapi: "वापी",
    Aizawl: "आइजोल",
    "Alipur Duar": "अलीपुर डुआर",
    Asansol: "आसनसोल",
    Baharampur: "बरहाम्पुर",
    Baidyabati: "बैद्यबाटी",
    Bali: "बाली",
    Balurghat: "बेलूरघाट",
    Bangaon: "बैंगोन",
    Bankura: "बांकुड़ा",
    Bansbaria: "बंसबारिया",
    Barasat: "बरासत",
    Barddhaman: "बर्द्धमान",
    Basirhat: "बशीरहाट",
    Bhadreswar: "भद्रेश्वर",
    Bhatpara: "भतपारा",
    Champdani: "चांपदानी",
    Chandannagar: "चंदननगर",
    "Dam Dam": "दमदम",
    Darjeeling: "दार्जिलिंग",
    Durgapur: "दुर्गापुर",
    Habra: "हबड़ा",
    Haldia: "हल्दिया",
    Halisahar: "हलिसहर",
    Howrah: "हावड़ा",
    Hugli: "हुगली",
    "Ingraj Bazar": "इंगराज बाज़ार",
    Jalpaiguri: "जलपाईगुड़ी",
    Jamuria: "जामुरिया",
    "Jaynagar Majilpur": "जयनगर माजिलपुर",
    Kalyani: "कल्याणी",
    Kamarhati: "कामरहती",
    Kanchrapara: "कांचरापाड़ा",
    Kharagpur: "खड़गपुर",
    Khardah: "खड़दहा",
    Kolkata: "कोलकाता",
    Krishnanagar: "कृष्णनगर",
    Kulti: "कुल्टी",
    Madhyamgram: "मध्यमग्राम",
    Mahadipur: "महादिपुर",
    Medinipur: "मेदिनीपुर",
    Naihati: "नैहाटी",
    Navadwip: "नवाडविप",
    Panihati: "पनीहती",
    Raiganj: "रायगंज",
    Rajmahal: "राजमहल",
    Rishra: "ऋषरा",
    Shantipur: "शांतिपुर",
    Shiliguri: "शिलिगुड़ी",
    Shrirampur: "श्रीरामपुर",
    Titagarh: "टीटागढ़",
    Uluberiya: "उलुबरिया",
    Alleppey: "अल्लेप्पी",
    Angamali: "अंगमाली",
    Calicut: "कालीकट",
    Kochi: "कोच्चि",
    Palghat: "पालघाट",
    Pathanamthitta: "पथानामथिट्टा",
    Quilon: "क्विलोन",
    Thiruvananthapuram: "तिरुवनंतपुरम",
    Trichur: "त्रिचुर",
    Amarkantak: "अमर्कंतक",
    Bhilai: "भिलाई",
    Bilaspur: "बिलासपुर",
    Durg: "दुर्ग",
    Raipur: "रायपुर",
    Ambala: "अंबाला",
    Bhiwani: "भिवानी",
    Faridabad: "फरीदाबाद",
    Gurgaon: "गुरुग्राम",
    Gurugram: "गुरुग्राम",
    Hisar: "हिसार",
    Karnal: "करनाल",
    Panipat: "पानीपत",
    Rohtak: "रोहतक",
    Sirsa: "सिरसा",
    Sonipat: "सोनीपत",
    Bandipura: "बांदीपुरा",
    Baramula: "बारामूला",
    Handwara: "हंदवाड़ा",
    Jammu: "जम्मू",
    Kulgam: "कुलगम",
    Rajaori: "राजौरी",
    Sopur: "सोपुर",
    Srinagar: "श्रीनगर",
    Udhampur: "उधमपुर",
    Bangalore: "बैंगलोर",
    Belgaum: "बेलगाम",
    Bellary: "बेल्लारी",
    Belur: "बेलुर",
    Bidar: "बीडर",
    Bijapur: "बीजापुर",
    Channarayapatna: "चन्नारायपत्ना",
    Davangere: "दावणगेरे",
    Gulbarga: "गुलबर्गा",
    Hassan: "हसन",
    Hospet: "होसपेट",
    Hubli: "हुबली",
    Kolar: "कोलार",
    Koratagere: "कोराटागेरे",
    Mandya: "मंड्या",
    Mangalore: "मंगलौर",
    Mysore: "मैसूर",
    Raichur: "रायचुर",
    Shimoga: "शिमोगा",
    Shrirangapattana: "श्रीरंगपट्टाना",
    Tumkur: "तुमकुर",
    Udipi: "उडुपी",
    Begusarai: "बेगूसराय",
    Bhagalpur: "भागलपुर",
    Deo: "डियो",
    Gaya: "गया",
    Muzaffarpur: "मुजफ्फरपुर",
    Patna: "पटना",
    Purnea: "पूर्णिया",
    Rajgir: "राजगीर",
    Saharsa: "सहरसा",
    Betma: "बेटमा",
    Bhopal: "भोपाल",
    Burhanpur: "बुरहानपुर",
    Gwalior: "ग्वालियर",
    Indore: "इंदौर",
    Jabalpur: "जबलपुर",
    Khajuraho: "खजुराहो",
    Maihar: "मैहर",
    Mandsaur: "मन्दसौर",
    Orchha: "ओरछा",
    Ratlam: "रतलाम",
    Sagar: "सागर",
    Ujjain: "उज्जैन",
    Umaria: "उमरिया",
    Vidisha: "विदिशा",
    Bhubaneshwar: "भुवनेश्वर",
    Brahmapur: "ब्रह्मपुर",
    Cuttack: "कटक",
    Jatani: "जतनी",
    Konarka: "कोणार्क",
    Puri: "पुरी",
    Raurkela: "राउरकेला",
    Sambalpur: "संबलपुर",
    Chakradharpur: "चक्रधरपुर",
    Dhanbad: "धनबाद",
    Jamshedpur: "जमशेदपुर",
    Ranchi: "रांची",
    Chandigarh: "चंडीगढ़",
    Chennai: "चेन्नई",
    Coimbatore: "कोयंबटूर",
    Conjeeveram: "कांजीवरम",
    Cuddalore: "कुड्डालोर",
    Dindigul: "डिंडिगुल",
    Erode: "ईरोड",
    Karur: "करूर",
    Kilkunda: "किल कुंदा",
    Kodaikanal: "कोडैकनाल",
    Madurai: "मदुरै",
    Nagercoil: "नागरकोविल",
    Negapatam: "नागपट्टनम",
    Ootacamund: "ऊटाकामंड",
    Rajapalaiyam: "राजपलायम",
    Rameswaram: "रामेश्वरम",
    Salem: "सलेम",
    "Seven Pagodas": "सात पगोडा",
    Tanjore: "तंजौर",
    Tinnevelly: "टिननेवली",
    Tiruppur: "तिरुपूर",
    Tiruvannamalai: "तिरुवन्नामलाई",
    Trichinopoly: "तिरुचिरापल्ली",
    Tuticorin: "तूतीकोरिन",
    Valparai: "वालपराई",
    Vellore: "वेल्लोर",
    Curchorem: "कर्चोरेम",
    Loutolim: "लौतोलिम",
    Panaji: "पणजी",
    "Dehra Dun": "देहरादून",
    Lansdowne: "लैंसडाउन",
    NainiTal: "नैनीताल",
    Nainital: "नैनीताल",
    "Naini Tal": "नैनीताल",
    Dharmsala: "धर्मशाला",
    Kulu: "कुल्लू",
    Manali: "मनाली",
    Shimla: "शिमला",
    Solan: "सोलन",
    Dibrugarh: "डिब्रूगढ़",
    Dispur: "दिसपुर",
    Gauripur: "गौरीपुर",
    Guwahati: "गुवाहाटी",
    Jorhat: "जोरहाट",
    Silchar: "सिलचर",
    Tezpur: "तेजपुर",
    Diu: "दीव",
    Gangtok: "गंगटोक",
    Imphal: "इंफाल",
    Itanagar: "ईटानगर",
    Kohima: "कोहिमा",
    "New Delhi": "नई दिल्ली",
    Puducherry: "पुडुचेरी",
    Shillong: "शिलांग",
    Silvassa: "सिलवासा",
  };

  return map[c] || c;
};


const gDesc = (c, d) => {
  let A = null;
  if (Array.isArray(d?.airComponents)) A = d?.airComponents;
  else {
    A = d?.airComponents ? Object.keys(d?.airComponents).map((key) => d?.airComponents[key]):[];
  }
  const aqi = A?.find((e) => e?.sensorName === "aqi");
  const pm25 = A?.find((e) => e?.sensorName === "pm25");
  const pm10 = A?.find((e) => e?.sensorName === "pm10");
  const wd = d?.weatherData||"";
  const hm = d?.humidity||"";
  if (aqi?.sensorData <= 50) {
    return `आज ${trans(c)} में एयर क्वालिटी इंडेक्स ${
      aqi?.sensorData
    } दर्ज किया गया है. इसके मुताबिक वायु गुणवत्ता 'अच्छी' श्रेणी में है यानी हवा प्रदूषित नहीं है. ${trans(
      c
    )} में पीएम2.5 आज ${pm25?.sensorData} दर्ज किया गया है और पीएम10 ${
      pm10?.sensorData
    } है. आज यहां का पारा ${wd} डिग्री  सेल्सियस को पार कर चुका है. लू और हीट वेव से बचने के लिए शरीर में पानी की कमी न होने दें. आज ${trans(
      c
    )} की हवा में ${hm}% नमी दर्ज की गई है.`;
  }
  if (aqi?.sensorData > 50 && aqi?.sensorData <= 100) {
    return `आज ${trans(c)} में एयर क्वालिटी इंडेक्स ${
      aqi?.sensorData
    } दर्ज किया गया है. इसके मुताबिक वायु गुणवत्ता 'संतोषजनक' श्रेणी में है. हांलाकि, अस्थमा और फेफड़ों व हृदय रोगियों के स्वास्थ्य पर इसका बुरा असर पड़ सकता है. ${trans(
      c
    )} में पीएम2.5 आज ${pm25?.sensorData} दर्ज किया गया है और पीएम10 ${
      pm10?.sensorData
    } है तो वहीं हवा में ${hm}% नमी दर्ज की गई है.`;
  }
  if (aqi?.sensorData > 100 && aqi?.sensorData <= 200) {
    return `${trans(
      c
    )} में प्रदूषण का स्तर बढ़ा हुआ है.  यहां आज एयर क्वालिटी इंडेक्स ${
      aqi?.sensorData
    } दर्ज किया गया. इसके मुताबिक वायु गुणवत्ता 'मॉडरेट' श्रेणी में है यानी हवा थोड़ी प्रदूषित है.  इसका बुरा असर अस्थमा और हृदय रोगियों के स्वास्थ्य पर अधिक पड़ सकता है. वहीं बात पीएम2.5 और पीएम10 की, की जाए तो इनका लेवल भी बढ़ गया है. ${trans(
      c
    )} में पीएम2.5 आज ${pm25?.sensorData} दर्ज किया गया है और पीएम10 ${
      pm10?.sensorData
    } है. आज यहां का पारा ${wd} डिग्री  सेल्सियस को पार कर चुका है. लू और हीट वेव से बचने के लिए शरीर में पानी की कमी न होने दें. आज ${trans(
      c
    )} की हवा में ${hm}% नमी दर्ज की गई है.`;
  }
  if (aqi?.sensorData > 200 && aqi?.sensorData <= 300) {
    return `आज ${trans(c)} में एयर क्वालिटी इंडेक्स ${
      aqi?.sensorData
    } दर्ज किया गया. वायु गुणवत्ता 'खराब' श्रेणी में है. इसके कारण लोगों को सांस लेने में तकलीफ हो सकती है.  वहीं बात पीएम2.5 और पीएम10 की, की जाए तो इनका लेवल भी बढ़ गया है. ${trans(
      c
    )} में पीएम2.5 आज ${pm25?.sensorData} दर्ज किया गया है और पीएम10 ${
      pm10?.sensorData
    } है. आज यहां का पारा ${
      wd
    } डिग्री  सेल्सियस को पार कर चुका है. लू और हीट वेव से बचने के लिए शरीर में पानी की कमी न होने दें. आज ${trans(
      c
    )} की हवा में ${hm}% नमी दर्ज की गई है.`;
  }
  if (aqi?.sensorData > 300 && aqi?.sensorData <= 400) {
    return `आज ${trans(c)} में एयर क्वालिटी इंडेक्स ${
      aqi?.sensorData
    } दर्ज किया गया. इसके मुताबिक वायु गुणवत्ता 'बहुत खराब' श्रेणी में है.  जहाँ स्वस्थ लोगों को भी आज बहुत सतर्क रहने की जरुरत है तो वहीं ह्रदय और लंग्स के रोगियों के लिए यह समस्या कड़ी कर सकता है.  वहीं बात पीएम2.5 और पीएम10 की, की जाए तो इनका लेवल भी बढ़ गया है. ${trans(
      c
    )} में पीएम2.5 आज ${pm25?.sensorData} दर्ज किया गया है और पीएम10 ${
      pm10?.sensorData
    } है. आज यहां का पारा ${wd} डिग्री  सेल्सियस को पार कर चुका है. लू और हीट वेव से बचने के लिए शरीर में पानी की कमी न होने दें. आज ${trans(
      c
    )} की हवा में ${hm}% नमी दर्ज की गई है.`;
  }
  if (aqi?.sensorData > 400 && aqi?.sensorData <= 500) {
    return `आज ${trans(c)} में एयर क्वालिटी इंडेक्स ${
      aqi?.sensorData
    } दर्ज किया गया. इसके मुताबिक वायु गुणवत्ता 'खतरनाक' श्रेणी में है. इसके कारण स्वस्थ लोगों की सेहत भी खराब हो सकती है. वहीं बात पीएम2.5 और पीएम10 की, की जाए तो इनका लेवल भी बढ़ गया है. ${trans(
      c
    )} में पीएम2.5 आज ${pm25?.sensorData} दर्ज किया गया है और पीएम10 ${
      pm10?.sensorData
    } है. आज यहां का पारा ${wd} डिग्री  सेल्सियस को पार कर चुका है. लू और हीट वेव से बचने के लिए शरीर में पानी की कमी न होने दें. आज ${trans(
      c
    )} की हवा में ${hm}% नमी दर्ज की गई है.`;
  }
  return `वायु गुणवत्ता सूचकांक यानी एयर क्वालिटी इंडेक्स एक नंबर होता है जिससे हवा की गुणवत्ता का पता लगाया जाता है. इससे आने वाले समय में होने वाले प्रदूषण के लेवल का भी अंदाजा लगाया जाता है. भारत में एक्यूआई को मिनिस्ट्री ऑफ एनवायरमेंट, फॉरेस्ट और क्लाइमेट चेंज ने लॉन्च किया था. हमारे देश की बात की जाए तो इसे 6 कैटेगरी में बांटा गया है, जिसके हिसाब से लोगों को सावधानियां बरतने के लिए कहा जाता है.`;
};
export { sorter, getStatus, trans, gDesc };