/* =====================================================================
   Nammude Kada — single-page app.  Backend: Supabase (database, login, photos).
   1) Run supabase.sql in your Supabase project.
   2) Put your project URL and ANON (public) key below.  NEVER use the service_role key here.
   ===================================================================== */
'use strict';

const CONFIG = {
SUPABASE_URL: 'https://mxwcnkopzlktfgyyhych.supabase.co',
  SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im14d2Nua29wemxrdGZneXloeWNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY1MzU3ODgsImV4cCI6MjEwMjExMTc4OH0.jEm_GRhCNcmeVRphRy5XdzCopGhP79CzxrR-9hOQROw',
};
/* ---------- constants ---------- */
const IST = 'Asia/Kolkata';
const DAYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const DAY_NAMES = { mon: 'Monday', tue: 'Tuesday', wed: 'Wednesday', thu: 'Thursday', fri: 'Friday', sat: 'Saturday', sun: 'Sunday' };
const STATUSES = ['new', 'confirmed', 'preparing', 'ready', 'out_for_delivery', 'delivered', 'cancelled'];
const STATES = {"Andhra Pradesh":["Alluri Sitharama Raju","Anakapalli","Ananthapuramu","Annamayya","Bapatla","Chittoor","Dr. B.R. Ambedkar Konaseema","East Godavari","Eluru","Guntur","Kakinada","Krishna","Kurnool","Nandyal","NTR","Palnadu","Parvathipuram Manyam","Prakasam","Sri Potti Sriramulu Nellore","Sri Sathya Sai","Srikakulam","Tirupati","Visakhapatnam","Vizianagaram","West Godavari","YSR Kadapa"],"Arunachal Pradesh":["Anjaw","Changlang","Dibang Valley","East Kameng","East Siang","Kamle","Kra Daadi","Kurung Kumey","Lepa Rada","Lohit","Longding","Lower Dibang Valley","Lower Siang","Lower Subansiri","Namsai","Pakke-Kessang","Papum Pare","Shi Yomi","Siang","Tawang","Tirap","Upper Siang","Upper Subansiri","West Kameng","West Siang"],"Assam":["Bajali","Baksa","Barpeta","Biswanath","Bongaigaon","Cachar","Charaideo","Chirang","Darrang","Dhemaji","Dhubri","Dibrugarh","Dima Hasao","Goalpara","Golaghat","Hailakandi","Hojai","Jorhat","Kamrup","Kamrup Metropolitan","Karbi Anglong","Karimganj","Kokrajhar","Lakhimpur","Majuli","Morigaon","Nagaon","Nalbari","Sivasagar","Sonitpur","South Salmara-Mankachar","Tamulpur","Tinsukia","Udalguri","West Karbi Anglong"],"Bihar":["Araria","Arwal","Aurangabad","Banka","Begusarai","Bhagalpur","Bhojpur","Buxar","Darbhanga","East Champaran","Gaya","Gopalganj","Jamui","Jehanabad","Kaimur","Katihar","Khagaria","Kishanganj","Lakhisarai","Madhepura","Madhubani","Munger","Muzaffarpur","Nalanda","Nawada","Patna","Purnia","Rohtas","Saharsa","Samastipur","Saran","Sheikhpura","Sheohar","Sitamarhi","Siwan","Supaul","Vaishali","West Champaran"],"Chhattisgarh":["Balod","Baloda Bazar","Balrampur","Bastar","Bemetara","Bijapur","Bilaspur","Dantewada","Dhamtari","Durg","Gariaband","Gaurela-Pendra-Marwahi","Janjgir-Champa","Jashpur","Kabirdham","Kanker","Khairagarh-Chhuikhadan-Gandai","Kondagaon","Korba","Koriya","Mahasamund","Manendragarh-Chirmiri-Bharatpur","Mohla-Manpur-Ambagarh Chowki","Mungeli","Narayanpur","Raigarh","Raipur","Rajnandgaon","Sakti","Sarangarh-Bilaigarh","Sukma","Surajpur","Surguja"],"Goa":["North Goa","South Goa"],"Gujarat":["Ahmedabad","Amreli","Anand","Aravalli","Banaskantha","Bharuch","Bhavnagar","Botad","Chhota Udaipur","Dahod","Dang","Devbhoomi Dwarka","Gandhinagar","Gir Somnath","Jamnagar","Junagadh","Kutch","Kheda","Mahisagar","Mehsana","Morbi","Narmada","Navsari","Panchmahal","Patan","Porbandar","Rajkot","Sabarkantha","Surat","Surendranagar","Tapi","Vadodara","Valsad"],"Haryana":["Ambala","Bhiwani","Charkhi Dadri","Faridabad","Fatehabad","Gurugram","Hisar","Jhajjar","Jind","Kaithal","Karnal","Kurukshetra","Mahendragarh","Nuh","Palwal","Panchkula","Panipat","Rewari","Rohtak","Sirsa","Sonipat","Yamunanagar"],"Himachal Pradesh":["Bilaspur","Chamba","Hamirpur","Kangra","Kinnaur","Kullu","Lahaul and Spiti","Mandi","Shimla","Sirmaur","Solan","Una"],"Jharkhand":["Bokaro","Chatra","Deoghar","Dhanbad","Dumka","East Singhbhum","Garhwa","Giridih","Godda","Gumla","Hazaribagh","Jamtara","Khunti","Koderma","Latehar","Lohardaga","Pakur","Palamu","Ramgarh","Ranchi","Sahibganj","Seraikela Kharsawan","Simdega","West Singhbhum"],"Karnataka":["Bagalkot","Ballari","Belagavi","Bengaluru Rural","Bengaluru Urban","Bidar","Chamarajanagar","Chikkaballapur","Chikkamagaluru","Chitradurga","Dakshina Kannada","Davanagere","Dharwad","Gadag","Hassan","Haveri","Kalaburagi","Kodagu","Kolar","Koppal","Mandya","Mysuru","Raichur","Ramanagara","Shivamogga","Tumakuru","Udupi","Uttara Kannada","Vijayanagara","Vijayapura","Yadgir"],"Kerala":["Thiruvananthapuram","Kollam","Pathanamthitta","Alappuzha","Kottayam","Idukki","Ernakulam","Thrissur","Palakkad","Malappuram","Kozhikode","Wayanad","Kannur","Kasaragod"],"Madhya Pradesh":["Agar Malwa","Alirajpur","Anuppur","Ashoknagar","Balaghat","Barwani","Betul","Bhind","Bhopal","Burhanpur","Chhatarpur","Chhindwara","Damoh","Datia","Dewas","Dhar","Dindori","Guna","Gwalior","Harda","Indore","Jabalpur","Jhabua","Katni","Khandwa","Khargone","Mandla","Mandsaur","Morena","Narsinghpur","Neemuch","Niwari","Panna","Raisen","Rajgarh","Ratlam","Rewa","Sagar","Satna","Sehore","Seoni","Shahdol","Shajapur","Sheopur","Shivpuri","Sidhi","Singrauli","Tikamgarh","Ujjain","Umaria","Vidisha"],"Maharashtra":["Ahilyanagar","Akola","Amravati","Beed","Bhandara","Buldhana","Chandrapur","Chhatrapati Sambhajinagar","Dharashiv","Dhule","Gadchiroli","Gondia","Hingoli","Jalgaon","Jalna","Kolhapur","Latur","Mumbai City","Mumbai Suburban","Nagpur","Nanded","Nandurbar","Nashik","Palghar","Parbhani","Pune","Raigad","Ratnagiri","Sangli","Satara","Sindhudurg","Solapur","Thane","Wardha","Washim","Yavatmal"],"Manipur":["Bishnupur","Chandel","Churachandpur","Imphal East","Imphal West","Jiribam","Kakching","Kamjong","Kangpokpi","Noney","Pherzawl","Senapati","Tamenglong","Tengnoupal","Thoubal","Ukhrul"],"Meghalaya":["East Garo Hills","East Jaintia Hills","East Khasi Hills","Eastern West Khasi Hills","North Garo Hills","Ri Bhoi","South Garo Hills","South West Garo Hills","South West Khasi Hills","West Garo Hills","West Jaintia Hills","West Khasi Hills"],"Mizoram":["Aizawl","Champhai","Hnahthial","Khawzawl","Kolasib","Lawngtlai","Lunglei","Mamit","Saitual","Serchhip","Siaha"],"Nagaland":["Chümoukedima","Dimapur","Kiphire","Kohima","Longleng","Mokokchung","Mon","Niuland","Noklak","Peren","Phek","Shamator","Tseminyü","Tuensang","Wokha","Zunheboto"],"Odisha":["Angul","Balangir","Balasore","Bargarh","Bhadrak","Boudh","Cuttack","Deogarh","Dhenkanal","Gajapati","Ganjam","Jagatsinghpur","Jajpur","Jharsuguda","Kalahandi","Kandhamal","Kendrapara","Kendujhar","Khordha","Koraput","Malkangiri","Mayurbhanj","Nabarangpur","Nayagarh","Nuapada","Puri","Rayagada","Sambalpur","Subarnapur","Sundargarh"],"Punjab":["Amritsar","Barnala","Bathinda","Faridkot","Fatehgarh Sahib","Fazilka","Ferozepur","Gurdaspur","Hoshiarpur","Jalandhar","Kapurthala","Ludhiana","Malerkotla","Mansa","Moga","Mohali","Muktsar","Pathankot","Patiala","Rupnagar","Sangrur","Shahid Bhagat Singh Nagar","Tarn Taran"],"Rajasthan":["Ajmer","Alwar","Anupgarh","Balotra","Banswara","Baran","Barmer","Beawar","Bharatpur","Bhilwara","Bikaner","Bundi","Chittorgarh","Churu","Dausa","Deeg","Dholpur","Didwana-Kuchaman","Dudu","Dungarpur","Gangapur City","Hanumangarh","Jaipur","Jaipur Rural","Jaisalmer","Jalore","Jhalawar","Jhunjhunu","Jodhpur","Jodhpur Rural","Karauli","Kekri","Khairthal-Tijara","Kota","Kotputli-Behror","Nagaur","Neem Ka Thana","Pali","Phalodi","Pratapgarh","Rajsamand","Salumbar","Sanchore","Sawai Madhopur","Shahpura","Sikar","Sirohi","Sri Ganganagar","Tonk","Udaipur"],"Sikkim":["Gangtok","Gyalshing","Mangan","Namchi","Pakyong","Soreng"],"Tamil Nadu":["Ariyalur","Chengalpattu","Chennai","Coimbatore","Cuddalore","Dharmapuri","Dindigul","Erode","Kallakurichi","Kancheepuram","Kanniyakumari","Karur","Krishnagiri","Madurai","Mayiladuthurai","Nagapattinam","Namakkal","Nilgiris","Perambalur","Pudukkottai","Ramanathapuram","Ranipet","Salem","Sivaganga","Tenkasi","Thanjavur","Theni","Thoothukudi","Tiruchirappalli","Tirunelveli","Tirupathur","Tiruppur","Tiruvallur","Tiruvannamalai","Tiruvarur","Vellore","Viluppuram","Virudhunagar"],"Telangana":["Adilabad","Bhadradri Kothagudem","Hanumakonda","Hyderabad","Jagtial","Jangaon","Jayashankar Bhupalpally","Jogulamba Gadwal","Kamareddy","Karimnagar","Khammam","Komaram Bheem Asifabad","Mahabubabad","Mahabubnagar","Mancherial","Medak","Medchal-Malkajgiri","Mulugu","Nagarkurnool","Nalgonda","Narayanpet","Nirmal","Nizamabad","Peddapalli","Rajanna Sircilla","Ranga Reddy","Sangareddy","Siddipet","Suryapet","Vikarabad","Wanaparthy","Warangal","Yadadri Bhuvanagiri"],"Tripura":["Dhalai","Gomati","Khowai","North Tripura","Sepahijala","South Tripura","Unakoti","West Tripura"],"Uttar Pradesh":["Agra","Aligarh","Ambedkar Nagar","Amethi","Amroha","Auraiya","Ayodhya","Azamgarh","Baghpat","Bahraich","Ballia","Balrampur","Banda","Barabanki","Bareilly","Basti","Bhadohi","Bijnor","Budaun","Bulandshahr","Chandauli","Chitrakoot","Deoria","Etah","Etawah","Farrukhabad","Fatehpur","Firozabad","Gautam Buddha Nagar","Ghaziabad","Ghazipur","Gonda","Gorakhpur","Hamirpur","Hapur","Hardoi","Hathras","Jalaun","Jaunpur","Jhansi","Kannauj","Kanpur Dehat","Kanpur Nagar","Kasganj","Kaushambi","Kushinagar","Lakhimpur Kheri","Lalitpur","Lucknow","Maharajganj","Mahoba","Mainpuri","Mathura","Mau","Meerut","Mirzapur","Moradabad","Muzaffarnagar","Pilibhit","Pratapgarh","Prayagraj","Raebareli","Rampur","Saharanpur","Sambhal","Sant Kabir Nagar","Shahjahanpur","Shamli","Shravasti","Siddharthnagar","Sitapur","Sonbhadra","Sultanpur","Unnao","Varanasi"],"Uttarakhand":["Almora","Bageshwar","Chamoli","Champawat","Dehradun","Haridwar","Nainital","Pauri Garhwal","Pithoragarh","Rudraprayag","Tehri Garhwal","Udham Singh Nagar","Uttarkashi"],"West Bengal":["Alipurduar","Bankura","Birbhum","Cooch Behar","Dakshin Dinajpur","Darjeeling","Hooghly","Howrah","Jalpaiguri","Jhargram","Kalimpong","Kolkata","Malda","Murshidabad","Nadia","North 24 Parganas","Paschim Bardhaman","Paschim Medinipur","Purba Bardhaman","Purba Medinipur","Purulia","South 24 Parganas","Uttar Dinajpur"],"Andaman and Nicobar Islands":["Nicobar","North and Middle Andaman","South Andaman"],"Chandigarh":["Chandigarh"],"Dadra and Nagar Haveli and Daman and Diu":["Dadra and Nagar Haveli","Daman","Diu"],"Delhi":["Central Delhi","East Delhi","New Delhi","North Delhi","North East Delhi","North West Delhi","Shahdara","South Delhi","South East Delhi","South West Delhi","West Delhi"],"Jammu and Kashmir":["Anantnag","Bandipora","Baramulla","Budgam","Doda","Ganderbal","Jammu","Kathua","Kishtwar","Kulgam","Kupwara","Poonch","Pulwama","Rajouri","Ramban","Reasi","Samba","Shopian","Srinagar","Udhampur"],"Ladakh":["Kargil","Leh"],"Lakshadweep":["Lakshadweep"],"Puducherry":["Karaikal","Mahe","Puducherry","Yanam"]};
const DISTRICTS = STATES.Kerala;
const stateFields = (st, di) => html`<div><label for="f_state">State / UT</label><select id="f_state" name="state" data-statesel="f_district" required>${Object.keys(STATES).map(x => html`<option ${x === st ? raw('selected') : ''}>${x}</option>`)}</select></div><div><label for="f_district">District</label><select id="f_district" name="district" required><option value="">— choose —</option>${(STATES[st] || []).map(d => html`<option ${d === di ? raw('selected') : ''}>${d}</option>`)}</select></div>`;
const PER_PAGE = 24;
const ADMIN_ONLY = !!window.NK_ADMIN_ONLY; // set by admin.html
const I18N = {"home": {"en": "Home", "ml": "ഹോം", "hi": "होम", "ta": "முகப்பு", "te": "హోమ్", "kn": "ಮುಖಪುಟ", "bn": "হোম", "mr": "मुख्यपृष्ठ", "gu": "હોમ", "pa": "ਹੋਮ"}, "shops": {"en": "Shops", "ml": "കടകൾ", "hi": "दुकानें", "ta": "கடைகள்", "te": "దుకాణాలు", "kn": "ಅಂಗಡಿಗಳು", "bn": "দোকান", "mr": "दुकाने", "gu": "દુકાનો", "pa": "ਦੁਕਾਨਾਂ"}, "categories": {"en": "Categories", "ml": "വിഭാഗങ്ങൾ", "hi": "श्रेणियाँ", "ta": "வகைகள்", "te": "వర్గాలు", "kn": "ವರ್ಗಗಳು", "bn": "বিভাগ", "mr": "श्रेणी", "gu": "શ્રેણીઓ", "pa": "ਸ਼੍ਰੇਣੀਆਂ"}, "all": {"en": "All", "ml": "എല്ലാം", "hi": "सभी", "ta": "அனைத்தும்", "te": "అన్నీ", "kn": "ಎಲ್ಲಾ", "bn": "সব", "mr": "सर्व", "gu": "બધું", "pa": "ਸਭ"}, "search": {"en": "Search", "ml": "തിരയുക", "hi": "खोजें", "ta": "தேடு", "te": "వెతకండి", "kn": "ಹುಡುಕಿ", "bn": "খুঁজুন", "mr": "शोधा", "gu": "શોધો", "pa": "ਖੋਜੋ"}, "search_ph": {"en": "Search products, shops, places…", "ml": "സാധനങ്ങൾ, കടകൾ, സ്ഥലങ്ങൾ തിരയുക…", "hi": "सामान, दुकानें, जगह खोजें…", "ta": "பொருட்கள், கடைகள், இடங்களைத் தேடுங்கள்…", "te": "వస్తువులు, దుకాణాలు, ప్రదేశాలు వెతకండి…", "kn": "ಸರಕುಗಳು, ಅಂಗಡಿಗಳು, ಸ್ಥಳಗಳನ್ನು ಹುಡುಕಿ…", "bn": "পণ্য, দোকান, জায়গা খুঁজুন…", "mr": "वस्तू, दुकाने, ठिकाणे शोधा…", "gu": "વસ્તુઓ, દુકાનો, જગ્યાઓ શોધો…", "pa": "ਸਮਾਨ, ਦੁਕਾਨਾਂ, ਥਾਵਾਂ ਖੋਜੋ…"}, "cart": {"en": "Cart", "ml": "കാർട്ട്", "hi": "कार्ट", "ta": "கார்ட்", "te": "కార్ట్", "kn": "ಕಾರ್ಟ್", "bn": "কার্ট", "mr": "कार्ट", "gu": "કાર્ટ", "pa": "ਕਾਰਟ"}, "login": {"en": "Log in", "ml": "ലോഗിൻ", "hi": "लॉग इन", "ta": "உள்நுழை", "te": "లాగిన్", "kn": "ಲಾಗಿನ್", "bn": "লগ ইন", "mr": "लॉग इन", "gu": "લૉગ ઇન", "pa": "ਲੌਗ ਇਨ"}, "logout": {"en": "Log out", "ml": "ലോഗൗട്ട്", "hi": "लॉग आउट", "ta": "வெளியேறு", "te": "లాగౌట్", "kn": "ಲಾಗ್ ಔಟ್", "bn": "লগ আউট", "mr": "लॉग आउट", "gu": "લૉગ આઉટ", "pa": "ਲੌਗ ਆਊਟ"}, "register_shop": {"en": "Sell with us", "ml": "നിങ്ങളുടെ കട ചേർക്കുക", "hi": "हमारे साथ बेचें", "ta": "எங்களுடன் விற்கவும்", "te": "మాతో అమ్మండి", "kn": "ನಮ್ಮೊಂದಿಗೆ ಮಾರಾಟ ಮಾಡಿ", "bn": "আমাদের সঙ্গে বিক্রি করুন", "mr": "आमच्यासोबत विका", "gu": "અમારી સાથે વેચો", "pa": "ਸਾਡੇ ਨਾਲ ਵੇਚੋ"}, "my_shop": {"en": "My shop", "ml": "എന്റെ കട", "hi": "मेरी दुकान", "ta": "என் கடை", "te": "నా దుకాణం", "kn": "ನನ್ನ ಅಂಗಡಿ", "bn": "আমার দোকান", "mr": "माझे दुकान", "gu": "મારી દુકાન", "pa": "ਮੇਰੀ ਦੁਕਾਨ"}, "admin": {"en": "Admin", "ml": "അഡ്മിൻ"}, "tagline": {"en": "Buy from shops in your own town", "ml": "നിങ്ങളുടെ നാട്ടിലെ കടകളിൽ നിന്ന് വാങ്ങൂ", "hi": "अपने शहर की दुकानों से खरीदें", "ta": "உங்கள் ஊர் கடைகளில் வாங்குங்கள்", "te": "మీ ఊరి దుకాణాల నుండి కొనండి", "kn": "ನಿಮ್ಮ ಊರಿನ ಅಂಗಡಿಗಳಿಂದ ಖರೀದಿಸಿ", "bn": "নিজের শহরের দোকান থেকে কিনুন", "mr": "तुमच्या गावातील दुकानांतून खरेदी करा", "gu": "તમારા શહેરની દુકાનોમાંથી ખરીદો", "pa": "ਆਪਣੇ ਸ਼ਹਿਰ ਦੀਆਂ ਦੁਕਾਨਾਂ ਤੋਂ ਖਰੀਦੋ"}, "hero_title": {"en": "Your town's shops, now online", "ml": "നിങ്ങളുടെ നാട്ടിലെ കടകൾ ഇനി ഓൺലൈനിൽ", "hi": "आपके शहर की दुकानें, अब ऑनलाइन", "ta": "உங்கள் ஊர் கடைகள், இப்போது ஆன்லைனில்", "te": "మీ ఊరి దుకాణాలు, ఇప్పుడు ఆన్‌లైన్‌లో", "kn": "ನಿಮ್ಮ ಊರಿನ ಅಂಗಡಿಗಳು, ಈಗ ಆನ್‌ಲೈನ್‌ನಲ್ಲಿ", "bn": "আপনার শহরের দোকান, এখন অনলাইনে", "mr": "तुमच्या गावातील दुकाने, आता ऑनलाइन", "gu": "તમારા શહેરની દુકાનો, હવે ઓનલાઇન", "pa": "ਤੁਹਾਡੇ ਸ਼ਹਿਰ ਦੀਆਂ ਦੁਕਾਨਾਂ, ਹੁਣ ਆਨਲਾਈਨ"}, "hero_sub": {"en": "Find nearby shops, pick your items, and order on WhatsApp or the website. Delivery or pickup — your choice.", "ml": "അടുത്തുള്ള കടകൾ കണ്ടെത്തൂ, സാധനങ്ങൾ തിരഞ്ഞെടുക്കൂ, വാട്സ്ആപ്പിലോ വെബ്സൈറ്റിലോ ഓർഡർ ചെയ്യൂ. ഡെലിവറിയോ പിക്കപ്പോ — നിങ്ങളുടെ ഇഷ്ടം.", "hi": "पास की दुकानें खोजें, सामान चुनें और WhatsApp या वेबसाइट पर ऑर्डर करें। होम डिलीवरी या दुकान से पिकअप — आपकी पसंद।", "ta": "அருகிலுள்ள கடைகளைக் கண்டுபிடித்து, பொருட்களைத் தேர்ந்தெடுத்து WhatsApp அல்லது இணையதளத்தில் ஆர்டர் செய்யுங்கள். வீட்டு டெலிவரி அல்லது கடையில் எடுத்துக்கொள்ளுங்கள்.", "te": "దగ్గరలోని దుకాణాలను కనుగొని, వస్తువులు ఎంచుకుని WhatsApp లేదా వెబ్‌సైట్‌లో ఆర్డర్ చేయండి. హోమ్ డెలివరీ లేదా షాప్ పికప్ — మీ ఇష్టం.", "kn": "ಹತ್ತಿರದ ಅಂಗಡಿಗಳನ್ನು ಹುಡುಕಿ, ಸರಕುಗಳನ್ನು ಆರಿಸಿ, WhatsApp ಅಥವಾ ವೆಬ್‌ಸೈಟ್‌ನಲ್ಲಿ ಆರ್ಡರ್ ಮಾಡಿ. ಮನೆ ಡೆಲಿವರಿ ಅಥವಾ ಅಂಗಡಿ ಪಿಕಪ್ — ನಿಮ್ಮ ಆಯ್ಕೆ.", "bn": "কাছের দোকান খুঁজুন, পণ্য বেছে নিন এবং WhatsApp বা ওয়েবসাইটে অর্ডার করুন। হোম ডেলিভারি বা দোকান থেকে নেওয়া — আপনার পছন্দ।", "mr": "जवळची दुकाने शोधा, वस्तू निवडा आणि WhatsApp किंवा वेबसाइटवर ऑर्डर करा. घरपोच डिलिव्हरी किंवा दुकानातून पिकअप — तुमची निवड.", "gu": "નજીકની દુકાનો શોધો, વસ્તુઓ પસંદ કરો અને WhatsApp અથવા વેબસાઇટ પર ઓર્ડર કરો. હોમ ડિલિવરી અથવા દુકાનેથી પિકઅપ — તમારી પસંદ.", "pa": "ਨੇੜਲੀਆਂ ਦੁਕਾਨਾਂ ਲੱਭੋ, ਸਮਾਨ ਚੁਣੋ ਅਤੇ WhatsApp ਜਾਂ ਵੈੱਬਸਾਈਟ 'ਤੇ ਆਰਡਰ ਕਰੋ। ਘਰ ਡਿਲੀਵਰੀ ਜਾਂ ਦੁਕਾਨ ਤੋਂ ਪਿਕਅੱਪ — ਤੁਹਾਡੀ ਪਸੰਦ।"}, "your_place": {"en": "Your place", "ml": "നിങ്ങളുടെ സ്ഥലം", "hi": "आपकी जगह", "ta": "உங்கள் இடம்", "te": "మీ ప్రదేశం", "kn": "ನಿಮ್ಮ ಸ್ಥಳ", "bn": "আপনার জায়গা", "mr": "तुमचे ठिकाण", "gu": "તમારી જગ્યા", "pa": "ਤੁਹਾਡੀ ਥਾਂ"}, "town_ph": {"en": "Town / place", "ml": "ടൗൺ / സ്ഥലം", "hi": "शहर / जगह", "ta": "ஊர் / இடம்", "te": "ఊరు / ప్రదేశం", "kn": "ಊರು / ಸ್ಥಳ", "bn": "শহর / জায়গা", "mr": "गाव / ठिकाण", "gu": "શહેર / જગ્યા", "pa": "ਸ਼ਹਿਰ / ਥਾਂ"}, "pin_ph": {"en": "PIN code", "ml": "പിൻകോഡ്", "hi": "पिन कोड", "ta": "பின் கோடு", "te": "పిన్ కోడ్", "kn": "ಪಿನ್ ಕೋಡ್", "bn": "পিন কোড", "mr": "पिन कोड", "gu": "પિન કોડ", "pa": "ਪਿੰਨ ਕੋਡ"}, "set_place": {"en": "Show shops here", "ml": "ഇവിടത്തെ കടകൾ കാണിക്കുക", "hi": "यहाँ की दुकानें दिखाएँ", "ta": "இங்குள்ள கடைகளைக் காட்டு", "te": "ఇక్కడి దుకాణాలు చూపండి", "kn": "ಇಲ್ಲಿನ ಅಂಗಡಿಗಳನ್ನು ತೋರಿಸಿ", "bn": "এখানকার দোকান দেখান", "mr": "इथली दुकाने दाखवा", "gu": "અહીંની દુકાનો બતાવો", "pa": "ਇੱਥੋਂ ਦੀਆਂ ਦੁਕਾਨਾਂ ਦਿਖਾਓ"}, "clear": {"en": "Clear", "ml": "മാറ്റുക", "hi": "हटाएँ", "ta": "அழி", "te": "తొలగించు", "kn": "ತೆರವುಗೊಳಿಸಿ", "bn": "মুছুন", "mr": "काढा", "gu": "સાફ કરો", "pa": "ਹਟਾਓ"}, "showing_for": {"en": "Showing shops near", "ml": "ഇവിടത്തെ കടകൾ കാണിക്കുന്നു:", "hi": "इनके पास की दुकानें", "ta": "இதற்கு அருகிலுள்ள கடைகள்", "te": "దీని దగ్గరి దుకాణాలు", "kn": "ಇದರ ಹತ್ತಿರದ ಅಂಗಡಿಗಳು", "bn": "এর কাছের দোকান", "mr": "याच्या जवळची दुकाने", "gu": "આની નજીકની દુકાનો", "pa": "ਇਸ ਦੇ ਨੇੜਲੀਆਂ ਦੁਕਾਨਾਂ"}, "featured_shops": {"en": "Featured shops", "ml": "തിരഞ്ഞെടുത്ത കടകൾ", "hi": "खास दुकानें", "ta": "சிறப்புக் கடைகள்", "te": "ప్రత్యేక దుకాణాలు", "kn": "ವಿಶೇಷ ಅಂಗಡಿಗಳು", "bn": "বিশেষ দোকান", "mr": "खास दुकाने", "gu": "ખાસ દુકાનો", "pa": "ਖ਼ਾਸ ਦੁਕਾਨਾਂ"}, "new_shops": {"en": "New on the marketplace", "ml": "പുതിയതായി ചേർന്ന കടകൾ", "hi": "बाज़ार में नई", "ta": "சந்தையில் புதியவை", "te": "మార్కెట్‌లో కొత్తవి", "kn": "ಮಾರುಕಟ್ಟೆಯಲ್ಲಿ ಹೊಸದು", "bn": "নতুন দোকান", "mr": "नवीन दुकाने", "gu": "નવી દુકાનો", "pa": "ਨਵੀਆਂ ਦੁਕਾਨਾਂ"}, "popular_products": {"en": "Latest products", "ml": "പുതിയ സാധനങ്ങൾ", "hi": "नए उत्पाद", "ta": "புதிய பொருட்கள்", "te": "కొత్త ఉత్పత్తులు", "kn": "ಹೊಸ ಉತ್ಪನ್ನಗಳು", "bn": "নতুন পণ্য", "mr": "नवीन उत्पादने", "gu": "નવી વસ્તુઓ", "pa": "ਨਵੇਂ ਉਤਪਾਦ"}, "offers": {"en": "Offers", "ml": "ഓഫറുകൾ", "hi": "ऑफ़र", "ta": "சலுகைகள்", "te": "ఆఫర్లు", "kn": "ಆಫರ್‌ಗಳು", "bn": "অফার", "mr": "ऑफर्स", "gu": "ઓફર્સ", "pa": "ਆਫ਼ਰ"}, "no_shops_yet": {"en": "No shops here yet. Shop owners can register for free.", "ml": "ഇവിടെ ഇതുവരെ കടകളില്ല. കടയുടമകൾക്ക് സൗജന്യമായി ചേരാം.", "hi": "यहाँ अभी कोई दुकान नहीं है। दुकानदार मुफ़्त में रजिस्टर कर सकते हैं।", "ta": "இங்கு இன்னும் கடைகள் இல்லை. கடை உரிமையாளர்கள் இலவசமாக பதிவு செய்யலாம்.", "te": "ఇక్కడ ఇంకా దుకాణాలు లేవు. దుకాణదారులు ఉచితంగా నమోదు చేసుకోవచ్చు.", "kn": "ಇಲ್ಲಿ ಇನ್ನೂ ಅಂಗಡಿಗಳಿಲ್ಲ. ಅಂಗಡಿ ಮಾಲೀಕರು ಉಚಿತವಾಗಿ ನೋಂದಾಯಿಸಬಹುದು.", "bn": "এখানে এখনও কোনো দোকান নেই। দোকানদাররা বিনামূল্যে নিবন্ধন করতে পারেন।", "mr": "इथे अजून दुकाने नाहीत. दुकानदार मोफत नोंदणी करू शकतात.", "gu": "અહીં હજી કોઈ દુકાન નથી. દુકાનદારો મફત નોંધણી કરી શકે છે.", "pa": "ਇੱਥੇ ਅਜੇ ਕੋਈ ਦੁਕਾਨ ਨਹੀਂ ਹੈ। ਦੁਕਾਨਦਾਰ ਮੁਫ਼ਤ ਰਜਿਸਟਰ ਕਰ ਸਕਦੇ ਹਨ।"}, "no_products_yet": {"en": "No products yet.", "ml": "ഇതുവരെ സാധനങ്ങളില്ല.", "hi": "अभी कोई उत्पाद नहीं।", "ta": "இன்னும் பொருட்கள் இல்லை.", "te": "ఇంకా ఉత్పత్తులు లేవు.", "kn": "ಇನ್ನೂ ಉತ್ಪನ್ನಗಳಿಲ್ಲ.", "bn": "এখনও কোনো পণ্য নেই।", "mr": "अजून उत्पादने नाहीत.", "gu": "હજી કોઈ વસ્તુ નથી.", "pa": "ਅਜੇ ਕੋਈ ਉਤਪਾਦ ਨਹੀਂ।"}, "no_results": {"en": "Nothing found. Try another word or place.", "ml": "ഒന്നും കണ്ടെത്തിയില്ല. മറ്റൊരു വാക്കോ സ്ഥലമോ നോക്കൂ.", "hi": "कुछ नहीं मिला। दूसरा शब्द या जगह आज़माएँ।", "ta": "எதுவும் கிடைக்கவில்லை. வேறு சொல் அல்லது இடத்தை முயற்சிக்கவும்.", "te": "ఏమీ దొరకలేదు. మరో పదం లేదా ప్రదేశం ప్రయత్నించండి.", "kn": "ಏನೂ ಸಿಗಲಿಲ್ಲ. ಬೇರೆ ಪದ ಅಥವಾ ಸ್ಥಳ ಪ್ರಯತ್ನಿಸಿ.", "bn": "কিছু পাওয়া যায়নি। অন্য শব্দ বা জায়গা চেষ্টা করুন।", "mr": "काही सापडले नाही. दुसरा शब्द किंवा ठिकाण वापरून पहा.", "gu": "કંઈ મળ્યું નહીં. બીજો શબ્દ અથવા જગ્યા અજમાવો.", "pa": "ਕੁਝ ਨਹੀਂ ਮਿਲਿਆ। ਹੋਰ ਸ਼ਬਦ ਜਾਂ ਥਾਂ ਅਜ਼ਮਾਓ।"}, "view_shop": {"en": "View shop", "ml": "കട കാണുക", "hi": "दुकान देखें", "ta": "கடையைப் பார்", "te": "దుకాణం చూడండి", "kn": "ಅಂಗಡಿ ನೋಡಿ", "bn": "দোকান দেখুন", "mr": "दुकान पहा", "gu": "દુકાન જુઓ", "pa": "ਦੁਕਾਨ ਵੇਖੋ"}, "view_all": {"en": "View all", "ml": "എല്ലാം കാണുക", "hi": "सभी देखें", "ta": "அனைத்தையும் பார்", "te": "అన్నీ చూడండి", "kn": "ಎಲ್ಲಾ ನೋಡಿ", "bn": "সব দেখুন", "mr": "सर्व पहा", "gu": "બધું જુઓ", "pa": "ਸਭ ਵੇਖੋ"}, "open_now": {"en": "Open now", "ml": "ഇപ്പോൾ തുറന്നിരിക്കുന്നു", "hi": "अभी खुला है", "ta": "இப்போது திறந்துள்ளது", "te": "ఇప్పుడు తెరిచి ఉంది", "kn": "ಈಗ ತೆರೆದಿದೆ", "bn": "এখন খোলা", "mr": "आता उघडे", "gu": "હમણાં ખુલ્લું", "pa": "ਹੁਣ ਖੁੱਲ੍ਹਾ"}, "closed_now": {"en": "Closed now", "ml": "ഇപ്പോൾ അടച്ചിരിക്കുന്നു", "hi": "अभी बंद है", "ta": "இப்போது மூடப்பட்டுள்ளது", "te": "ఇప్పుడు మూసి ఉంది", "kn": "ಈಗ ಮುಚ್ಚಿದೆ", "bn": "এখন বন্ধ", "mr": "आता बंद", "gu": "હમણાં બંધ", "pa": "ਹੁਣ ਬੰਦ"}, "not_accepting": {"en": "Not taking orders right now", "ml": "ഇപ്പോൾ ഓർഡർ എടുക്കുന്നില്ല", "hi": "अभी ऑर्डर नहीं ले रहे", "ta": "இப்போது ஆர்டர்கள் ஏற்கப்படவில்லை", "te": "ఇప్పుడు ఆర్డర్లు తీసుకోవడం లేదు", "kn": "ಈಗ ಆರ್ಡರ್ ಸ್ವೀಕರಿಸುತ್ತಿಲ್ಲ", "bn": "এখন অর্ডার নেওয়া হচ্ছে না", "mr": "आता ऑर्डर घेत नाहीत", "gu": "હમણાં ઓર્ડર લેતા નથી", "pa": "ਹੁਣ ਆਰਡਰ ਨਹੀਂ ਲੈ ਰਹੇ"}, "delivery": {"en": "Home delivery", "ml": "ഹോം ഡെലിവറി", "hi": "होम डिलीवरी", "ta": "வீட்டு டெலிவரி", "te": "హోమ్ డెలివరీ", "kn": "ಮನೆ ಡೆಲಿವರಿ", "bn": "হোম ডেলিভারি", "mr": "घरपोच डिलिव्हरी", "gu": "હોમ ડિલિવરી", "pa": "ਘਰ ਡਿਲੀਵਰੀ"}, "pickup": {"en": "Store pickup", "ml": "കടയിൽ നിന്ന് എടുക്കാം", "hi": "दुकान से पिकअप", "ta": "கடையில் எடுத்துக்கொள்", "te": "షాప్ పికప్", "kn": "ಅಂಗಡಿ ಪಿಕಪ್", "bn": "দোকান থেকে নেওয়া", "mr": "दुकानातून पिकअप", "gu": "દુકાનેથી પિકઅપ", "pa": "ਦੁਕਾਨ ਤੋਂ ਪਿਕਅੱਪ"}, "delivery_fee": {"en": "Delivery fee", "ml": "ഡെലിവറി ചാർജ്", "hi": "डिलीवरी शुल्क", "ta": "டெலிவரி கட்டணம்", "te": "డెలివరీ ఛార్జ్", "kn": "ಡೆಲಿವರಿ ಶುಲ್ಕ", "bn": "ডেলিভারি চার্জ", "mr": "डिलिव्हरी शुल्क", "gu": "ડિલિવરી ચાર્જ", "pa": "ਡਿਲੀਵਰੀ ਚਾਰਜ"}, "free": {"en": "Free", "ml": "സൗജന്യം", "hi": "मुफ़्त", "ta": "இலவசம்", "te": "ఉచితం", "kn": "ಉಚಿತ", "bn": "বিনামূল্যে", "mr": "मोफत", "gu": "મફત", "pa": "ਮੁਫ਼ਤ"}, "min_order": {"en": "Minimum order", "ml": "കുറഞ്ഞ ഓർഡർ", "hi": "न्यूनतम ऑर्डर", "ta": "குறைந்தபட்ச ஆர்டர்", "te": "కనీస ఆర్డర్", "kn": "ಕನಿಷ್ಠ ಆರ್ಡರ್", "bn": "ন্যূনতম অর্ডার", "mr": "किमान ऑर्डर", "gu": "ન્યૂનતમ ઓર્ડર", "pa": "ਘੱਟੋ-ਘੱਟ ਆਰਡਰ"}, "est_delivery": {"en": "Delivery time", "ml": "ഡെലിവറി സമയം", "hi": "डिलीवरी समय", "ta": "டெலிவரி நேரம்", "te": "డెలివరీ సమయం", "kn": "ಡೆಲಿವರಿ ಸಮಯ", "bn": "ডেলিভারির সময়", "mr": "डिलिव्हरी वेळ", "gu": "ડિલિવરી સમય", "pa": "ਡਿਲੀਵਰੀ ਸਮਾਂ"}, "opening_hours": {"en": "Opening hours", "ml": "തുറക്കുന്ന സമയം", "hi": "खुलने का समय", "ta": "திறக்கும் நேரம்", "te": "తెరిచే సమయాలు", "kn": "ತೆರೆಯುವ ಸಮಯ", "bn": "খোলার সময়", "mr": "उघडण्याच्या वेळा", "gu": "ખુલવાનો સમય", "pa": "ਖੁੱਲ੍ਹਣ ਦਾ ਸਮਾਂ"}, "address": {"en": "Address", "ml": "വിലാസം", "hi": "पता", "ta": "முகவரி", "te": "చిరునామా", "kn": "ವಿಳಾಸ", "bn": "ঠিকানা", "mr": "पत्ता", "gu": "સરનામું", "pa": "ਪਤਾ"}, "map": {"en": "Open in Maps", "ml": "മാപ്പിൽ കാണുക", "hi": "मैप में खोलें", "ta": "வரைபடத்தில் திற", "te": "మ్యాప్‌లో తెరవండి", "kn": "ನಕ್ಷೆಯಲ್ಲಿ ತೆರೆಯಿರಿ", "bn": "ম্যাপে খুলুন", "mr": "नकाशात उघडा", "gu": "મેપમાં ખોલો", "pa": "ਮੈਪ ਵਿੱਚ ਖੋਲ੍ਹੋ"}, "whatsapp_shop": {"en": "WhatsApp the shop", "ml": "കടയിലേക്ക് വാട്സ്ആപ്പ്", "hi": "दुकान को WhatsApp करें", "ta": "கடைக்கு WhatsApp செய்", "te": "దుకాణానికి WhatsApp చేయండి", "kn": "ಅಂಗಡಿಗೆ WhatsApp ಮಾಡಿ", "bn": "দোকানে WhatsApp করুন", "mr": "दुकानाला WhatsApp करा", "gu": "દુકાનને WhatsApp કરો", "pa": "ਦੁਕਾਨ ਨੂੰ WhatsApp ਕਰੋ"}, "call_shop": {"en": "Call", "ml": "വിളിക്കുക", "hi": "कॉल करें", "ta": "அழை", "te": "కాల్ చేయండి", "kn": "ಕರೆ ಮಾಡಿ", "bn": "কল করুন", "mr": "कॉल करा", "gu": "કૉલ કરો", "pa": "ਕਾਲ ਕਰੋ"}, "add_to_cart": {"en": "Add to cart", "ml": "കാർട്ടിൽ ചേർക്കുക", "hi": "कार्ट में जोड़ें", "ta": "கார்ட்டில் சேர்", "te": "కార్ట్‌కు జోడించండి", "kn": "ಕಾರ್ಟ್‌ಗೆ ಸೇರಿಸಿ", "bn": "কার্টে যোগ করুন", "mr": "कार्टमध्ये टाका", "gu": "કાર્ટમાં ઉમેરો", "pa": "ਕਾਰਟ ਵਿੱਚ ਪਾਓ"}, "in_stock": {"en": "In stock", "ml": "സ്റ്റോക്കുണ്ട്", "hi": "स्टॉक में है", "ta": "கையிருப்பில் உள்ளது", "te": "స్టాక్‌లో ఉంది", "kn": "ಸ್ಟಾಕ್‌ನಲ್ಲಿದೆ", "bn": "স্টকে আছে", "mr": "स्टॉकमध्ये आहे", "gu": "સ્ટોકમાં છે", "pa": "ਸਟਾਕ ਵਿੱਚ ਹੈ"}, "out_of_stock": {"en": "Out of stock", "ml": "സ്റ്റോക്കില്ല", "hi": "स्टॉक में नहीं", "ta": "கையிருப்பில் இல்லை", "te": "స్టాక్‌లో లేదు", "kn": "ಸ್ಟಾಕ್‌ನಲ್ಲಿಲ್ಲ", "bn": "স্টকে নেই", "mr": "स्टॉकमध्ये नाही", "gu": "સ્ટોકમાં નથી", "pa": "ਸਟਾਕ ਵਿੱਚ ਨਹੀਂ"}, "sold_by": {"en": "Sold by", "ml": "വിൽക്കുന്നത്", "hi": "विक्रेता", "ta": "விற்பனையாளர்", "te": "అమ్మకందారు", "kn": "ಮಾರಾಟಗಾರ", "bn": "বিক্রেতা", "mr": "विक्रेता", "gu": "વેચનાર", "pa": "ਵੇਚਣ ਵਾਲਾ"}, "price": {"en": "Price", "ml": "വില", "hi": "कीमत", "ta": "விலை", "te": "ధర", "kn": "ಬೆಲೆ", "bn": "দাম", "mr": "किंमत", "gu": "કિંમત", "pa": "ਕੀਮਤ"}, "qty": {"en": "Qty", "ml": "എണ്ണം", "hi": "मात्रा", "ta": "அளவு", "te": "పరిమాణం", "kn": "ಪ್ರಮಾಣ", "bn": "পরিমাণ", "mr": "प्रमाण", "gu": "જથ્થો", "pa": "ਮਾਤਰਾ"}, "remove": {"en": "Remove", "ml": "ഒഴിവാക്കുക", "hi": "हटाएँ", "ta": "நீக்கு", "te": "తొలగించు", "kn": "ತೆಗೆದುಹಾಕಿ", "bn": "সরান", "mr": "काढा", "gu": "દૂર કરો", "pa": "ਹਟਾਓ"}, "update": {"en": "Update", "ml": "മാറ്റുക", "hi": "अपडेट करें", "ta": "புதுப்பி", "te": "అప్‌డేట్ చేయండి", "kn": "ಅಪ್‌ಡೇಟ್ ಮಾಡಿ", "bn": "আপডেট করুন", "mr": "अपडेट करा", "gu": "અપડેટ કરો", "pa": "ਅੱਪਡੇਟ ਕਰੋ"}, "subtotal": {"en": "Items total", "ml": "സാധനങ്ങളുടെ വില", "hi": "सामान का कुल", "ta": "பொருட்கள் மொத்தம்", "te": "వస్తువుల మొత్తం", "kn": "ಸರಕುಗಳ ಒಟ್ಟು", "bn": "পণ্যের মোট", "mr": "वस्तूंची एकूण", "gu": "વસ્તુઓનો કુલ", "pa": "ਸਮਾਨ ਦਾ ਕੁੱਲ"}, "total": {"en": "Total", "ml": "ആകെ", "hi": "कुल", "ta": "மொத்தம்", "te": "మొత్తం", "kn": "ಒಟ್ಟು", "bn": "মোট", "mr": "एकूण", "gu": "કુલ", "pa": "ਕੁੱਲ"}, "cart_empty": {"en": "Your cart is empty.", "ml": "നിങ്ങളുടെ കാർട്ട് ഒഴിഞ്ഞതാണ്.", "hi": "आपका कार्ट खाली है।", "ta": "உங்கள் கார்ட் காலியாக உள்ளது.", "te": "మీ కార్ట్ ఖాళీగా ఉంది.", "kn": "ನಿಮ್ಮ ಕಾರ್ಟ್ ಖಾಲಿಯಾಗಿದೆ.", "bn": "আপনার কার্ট খালি।", "mr": "तुमचा कार्ट रिकामा आहे.", "gu": "તમારું કાર્ટ ખાલી છે.", "pa": "ਤੁਹਾਡਾ ਕਾਰਟ ਖਾਲੀ ਹੈ।"}, "checkout": {"en": "Checkout", "ml": "ചെക്കൗട്ട്", "hi": "चेकआउट", "ta": "செக்அவுட்", "te": "చెకౌట్", "kn": "ಚೆಕ್‌ಔಟ್", "bn": "চেকআউট", "mr": "चेकआउट", "gu": "ચેકઆઉટ", "pa": "ਚੈੱਕਆਊਟ"}, "your_name": {"en": "Your name", "ml": "നിങ്ങളുടെ പേര്", "hi": "आपका नाम", "ta": "உங்கள் பெயர்", "te": "మీ పేరు", "kn": "ನಿಮ್ಮ ಹೆಸರು", "bn": "আপনার নাম", "mr": "तुमचे नाव", "gu": "તમારું નામ", "pa": "ਤੁਹਾਡਾ ਨਾਮ"}, "your_phone": {"en": "Mobile number", "ml": "മൊബൈൽ നമ്പർ", "hi": "मोबाइल नंबर", "ta": "மொபைல் எண்", "te": "మొబైల్ నంబర్", "kn": "ಮೊಬೈಲ್ ಸಂಖ್ಯೆ", "bn": "মোবাইল নম্বর", "mr": "मोबाइल नंबर", "gu": "મોબાઇલ નંબર", "pa": "ਮੋਬਾਈਲ ਨੰਬਰ"}, "delivery_address": {"en": "Delivery address", "ml": "ഡെലിവറി വിലാസം", "hi": "डिलीवरी का पता", "ta": "டெலிவரி முகவரி", "te": "డెలివరీ చిరునామా", "kn": "ಡೆಲಿವರಿ ವಿಳಾಸ", "bn": "ডেলিভারির ঠিকানা", "mr": "डिलिव्हरीचा पत्ता", "gu": "ડિલિવરી સરનામું", "pa": "ਡਿਲੀਵਰੀ ਪਤਾ"}, "order_notes": {"en": "Notes for the shop (optional)", "ml": "കടയ്ക്കുള്ള കുറിപ്പ് (വേണമെങ്കിൽ)", "hi": "दुकान के लिए नोट (वैकल्पिक)", "ta": "கடைக்கான குறிப்பு (விருப்பம்)", "te": "దుకాణం కోసం గమనిక (ఐచ్ఛికం)", "kn": "ಅಂಗಡಿಗೆ ಟಿಪ್ಪಣಿ (ಐಚ್ಛಿಕ)", "bn": "দোকানের জন্য নোট (ঐচ্ছিক)", "mr": "दुकानासाठी सूचना (ऐच्छिक)", "gu": "દુકાન માટે નોંધ (વૈકલ્પિક)", "pa": "ਦੁਕਾਨ ਲਈ ਨੋਟ (ਵਿਕਲਪਿਕ)"}, "how_receive": {"en": "How do you want to receive it?", "ml": "എങ്ങനെ വാങ്ങണം?", "hi": "आप इसे कैसे लेना चाहेंगे?", "ta": "எப்படிப் பெற விரும்புகிறீர்கள்?", "te": "మీరు ఎలా తీసుకోవాలనుకుంటున్నారు?", "kn": "ನೀವು ಹೇಗೆ ಪಡೆಯಲು ಬಯಸುತ್ತೀರಿ?", "bn": "আপনি কীভাবে নিতে চান?", "mr": "तुम्हाला ते कसे हवे आहे?", "gu": "તમે તે કેવી રીતે મેળવવા માગો છો?", "pa": "ਤੁਸੀਂ ਇਹ ਕਿਵੇਂ ਲੈਣਾ ਚਾਹੁੰਦੇ ਹੋ?"}, "payment": {"en": "Payment", "ml": "പേയ്മെന്റ്", "hi": "भुगतान", "ta": "பணம் செலுத்துதல்", "te": "చెల్లింపు", "kn": "ಪಾವತಿ", "bn": "পেমেন্ট", "mr": "पेमेंट", "gu": "ચુકવણી", "pa": "ਭੁਗਤਾਨ"}, "cod": {"en": "Cash on delivery / pay at the shop", "ml": "സാധനം കിട്ടുമ്പോൾ / കടയിൽ പണം നൽകാം", "hi": "डिलीवरी पर नकद / दुकान पर भुगतान", "ta": "டெலிவரியில் பணம் / கடையில் செலுத்துங்கள்", "te": "డెలివరీ సమయంలో నగదు / దుకాణంలో చెల్లింపు", "kn": "ಡೆಲಿವರಿ ವೇಳೆ ನಗದು / ಅಂಗಡಿಯಲ್ಲಿ ಪಾವತಿ", "bn": "ডেলিভারিতে নগদ / দোকানে পেমেন্ট", "mr": "डिलिव्हरीला रोख / दुकानात पेमेंट", "gu": "ડિલિવરી વખતે રોકડ / દુકાને ચુકવણી", "pa": "ਡਿਲੀਵਰੀ 'ਤੇ ਨਕਦ / ਦੁਕਾਨ 'ਤੇ ਭੁਗਤਾਨ"}, "no_online_payment": {"en": "You pay the shop directly (cash, or UPI if the shop accepts it). This website does not collect your money.", "ml": "കടയിൽ നേരിട്ട് പണം നൽകാം (പണമായോ, കട UPI സ്വീകരിക്കുന്നുണ്ടെങ്കിൽ UPI വഴിയോ). ഈ വെബ്സൈറ്റ് നിങ്ങളുടെ പണം സ്വീകരിക്കുന്നില്ല.", "hi": "आप दुकान को सीधे भुगतान करते हैं (नकद, या दुकान UPI लेती हो तो UPI)। यह वेबसाइट आपका पैसा नहीं लेती।", "ta": "நீங்கள் கடைக்கு நேரடியாகப் பணம் செலுத்துவீர்கள் (பணம், அல்லது கடை UPI ஏற்றால் UPI). இந்த இணையதளம் உங்கள் பணத்தை வாங்காது.", "te": "మీరు దుకాణానికి నేరుగా చెల్లిస్తారు (నగదు, లేదా దుకాణం UPI అంగీకరిస్తే UPI). ఈ వెబ్‌సైట్ మీ డబ్బు తీసుకోదు.", "kn": "ನೀವು ಅಂಗಡಿಗೆ ನೇರವಾಗಿ ಪಾವತಿಸುತ್ತೀರಿ (ನಗದು, ಅಥವಾ ಅಂಗಡಿ UPI ಸ್ವೀಕರಿಸಿದರೆ UPI). ಈ ವೆಬ್‌ಸೈಟ್ ನಿಮ್ಮ ಹಣವನ್ನು ಪಡೆಯುವುದಿಲ್ಲ.", "bn": "আপনি সরাসরি দোকানে পেমেন্ট করবেন (নগদ, বা দোকান UPI নিলে UPI)। এই ওয়েবসাইট আপনার টাকা নেয় না।", "mr": "तुम्ही दुकानदाराला थेट पैसे देता (रोख, किंवा दुकान UPI घेत असेल तर UPI). ही वेबसाइट तुमचे पैसे घेत नाही.", "gu": "તમે દુકાનને સીધું ચૂકવો છો (રોકડ, અથવા દુકાન UPI સ્વીકારે તો UPI). આ વેબસાઇટ તમારા પૈસા લેતી નથી.", "pa": "ਤੁਸੀਂ ਦੁਕਾਨ ਨੂੰ ਸਿੱਧਾ ਭੁਗਤਾਨ ਕਰਦੇ ਹੋ (ਨਕਦ, ਜਾਂ ਦੁਕਾਨ UPI ਲੈਂਦੀ ਹੋਵੇ ਤਾਂ UPI)। ਇਹ ਵੈੱਬਸਾਈਟ ਤੁਹਾਡਾ ਪੈਸਾ ਨਹੀਂ ਲੈਂਦੀ।"}, "place_order": {"en": "Place order on website", "ml": "വെബ്സൈറ്റിൽ ഓർഡർ ചെയ്യുക", "hi": "वेबसाइट पर ऑर्डर करें", "ta": "இணையதளத்தில் ஆர்டர் செய்", "te": "వెబ్‌సైట్‌లో ఆర్డర్ చేయండి", "kn": "ವೆಬ್‌ಸೈಟ್‌ನಲ್ಲಿ ಆರ್ಡರ್ ಮಾಡಿ", "bn": "ওয়েবসাইটে অর্ডার করুন", "mr": "वेबसाइटवर ऑर्डर करा", "gu": "વેબસાઇટ પર ઓર્ડર કરો", "pa": "ਵੈੱਬਸਾਈਟ 'ਤੇ ਆਰਡਰ ਕਰੋ"}, "order_whatsapp": {"en": "Order on WhatsApp", "ml": "വാട്സ്ആപ്പിൽ ഓർഡർ ചെയ്യുക", "hi": "WhatsApp पर ऑर्डर करें", "ta": "WhatsApp-இல் ஆர்டர் செய்", "te": "WhatsApp లో ఆర్డర్ చేయండి", "kn": "WhatsApp ನಲ್ಲಿ ಆರ್ಡರ್ ಮಾಡಿ", "bn": "WhatsApp-এ অর্ডার করুন", "mr": "WhatsApp वर ऑर्डर करा", "gu": "WhatsApp પર ઓર્ડર કરો", "pa": "WhatsApp 'ਤੇ ਆਰਡਰ ਕਰੋ"}, "order_placed": {"en": "Order placed!", "ml": "ഓർഡർ ചെയ്തു!", "hi": "ऑर्डर हो गया!", "ta": "ஆர்டர் செய்யப்பட்டது!", "te": "ఆర్డర్ అయింది!", "kn": "ಆರ್ಡರ್ ಆಯಿತು!", "bn": "অর্ডার হয়েছে!", "mr": "ऑर्डर झाली!", "gu": "ઓર્ડર થઈ ગયો!", "pa": "ਆਰਡਰ ਹੋ ਗਿਆ!"}, "order_code": {"en": "Order number", "ml": "ഓർഡർ നമ്പർ", "hi": "ऑर्डर नंबर", "ta": "ஆர்டர் எண்", "te": "ఆర్డర్ నంబర్", "kn": "ಆರ್ಡರ್ ಸಂಖ್ಯೆ", "bn": "অর্ডার নম্বর", "mr": "ऑर्डर क्रमांक", "gu": "ઓર્ડર નંબર", "pa": "ਆਰਡਰ ਨੰਬਰ"}, "track_order": {"en": "Track order", "ml": "ഓർഡർ നില അറിയുക", "hi": "ऑर्डर ट्रैक करें", "ta": "ஆர்டரைக் கண்காணி", "te": "ఆర్డర్ ట్రాక్ చేయండి", "kn": "ಆರ್ಡರ್ ಟ್ರ್ಯಾಕ್ ಮಾಡಿ", "bn": "অর্ডার ট্র্যাক করুন", "mr": "ऑर्डर ट्रॅक करा", "gu": "ઓર્ડર ટ્રૅક કરો", "pa": "ਆਰਡਰ ਟ੍ਰੈਕ ਕਰੋ"}, "status": {"en": "Status", "ml": "നില", "hi": "स्थिति", "ta": "நிலை", "te": "స్థితి", "kn": "ಸ್ಥಿತಿ", "bn": "অবস্থা", "mr": "स्थिती", "gu": "સ્થિતિ", "pa": "ਸਥਿਤੀ"}, "s_new": {"en": "New", "ml": "പുതിയത്", "hi": "नया", "ta": "புதியது", "te": "కొత్తది", "kn": "ಹೊಸದು", "bn": "নতুন", "mr": "नवीन", "gu": "નવું", "pa": "ਨਵਾਂ"}, "s_confirmed": {"en": "Confirmed", "ml": "സ്ഥിരീകരിച്ചു", "hi": "पुष्टि हो गई", "ta": "உறுதி செய்யப்பட்டது", "te": "నిర్ధారించబడింది", "kn": "ದೃಢೀಕರಿಸಲಾಗಿದೆ", "bn": "নিশ্চিত", "mr": "निश्चित झाले", "gu": "પુષ્ટિ થઈ", "pa": "ਪੁਸ਼ਟੀ ਹੋਈ"}, "s_preparing": {"en": "Preparing", "ml": "ഒരുക്കുന്നു", "hi": "तैयार हो रहा है", "ta": "தயாராகிறது", "te": "సిద్ధమవుతోంది", "kn": "ತಯಾರಾಗುತ್ತಿದೆ", "bn": "তৈরি হচ্ছে", "mr": "तयार होत आहे", "gu": "તૈયાર થઈ રહ્યું છે", "pa": "ਤਿਆਰ ਹੋ ਰਿਹਾ ਹੈ"}, "s_ready": {"en": "Ready", "ml": "തയ്യാർ", "hi": "तैयार", "ta": "தயார்", "te": "సిద్ధం", "kn": "ಸಿದ್ಧ", "bn": "প্রস্তুত", "mr": "तयार", "gu": "તૈયાર", "pa": "ਤਿਆਰ"}, "s_out_for_delivery": {"en": "Out for delivery", "ml": "ഡെലിവറിക്ക് പുറപ്പെട്ടു", "hi": "डिलीवरी के लिए निकला", "ta": "டெலிவரிக்கு வெளியே", "te": "డెలివరీకి బయలుదేరింది", "kn": "ಡೆಲಿವರಿಗೆ ಹೊರಟಿದೆ", "bn": "ডেলিভারির জন্য বেরিয়েছে", "mr": "डिलिव्हरीसाठी निघाले", "gu": "ડિલિવરી માટે નીકળ્યું", "pa": "ਡਿਲੀਵਰੀ ਲਈ ਨਿਕਲਿਆ"}, "s_delivered": {"en": "Delivered", "ml": "എത്തിച്ചു", "hi": "डिलीवर हो गया", "ta": "டெலிவரி ஆனது", "te": "డెలివరీ అయింది", "kn": "ಡೆಲಿವರಿ ಆಗಿದೆ", "bn": "ডেলিভারি হয়েছে", "mr": "डिलिव्हर झाले", "gu": "ડિલિવર થયું", "pa": "ਡਿਲੀਵਰ ਹੋ ਗਿਆ"}, "s_cancelled": {"en": "Cancelled", "ml": "റദ്ദാക്കി", "hi": "रद्द किया गया", "ta": "ரத்து செய்யப்பட்டது", "te": "రద్దు చేయబడింది", "kn": "ರದ್ದುಗೊಂಡಿದೆ", "bn": "বাতিল", "mr": "रद्द केले", "gu": "રદ થયું", "pa": "ਰੱਦ ਕੀਤਾ"}, "language": {"en": "Language", "ml": "ഭാഷ", "hi": "भाषा", "ta": "மொழி", "te": "భాష", "kn": "ಭಾಷೆ", "bn": "ভাষা", "mr": "भाषा", "gu": "ભાષા", "pa": "ਭਾਸ਼ਾ"}, "privacy": {"en": "Privacy Policy", "ml": "സ്വകാര്യതാ നയം", "hi": "गोपनीयता नीति", "ta": "தனியுரிமைக் கொள்கை", "te": "గోప్యతా విధానం", "kn": "ಗೋಪ್ಯತಾ ನೀತಿ", "bn": "গোপনীয়তা নীতি", "mr": "गोपनीयता धोरण", "gu": "ગોપનીયતા નીતિ", "pa": "ਗੋਪਨੀਯਤਾ ਨੀਤੀ"}, "terms": {"en": "Terms & Conditions", "ml": "നിബന്ധനകൾ", "hi": "नियम और शर्तें", "ta": "விதிமுறைகள் & நிபந்தனைகள்", "te": "నిబంధనలు & షరతులు", "kn": "ನಿಯಮಗಳು ಮತ್ತು ಷರತ್ತುಗಳು", "bn": "শর্তাবলী", "mr": "अटी आणि शर्ती", "gu": "નિયમો અને શરતો", "pa": "ਨਿਯਮ ਅਤੇ ਸ਼ਰਤਾਂ"}, "refund": {"en": "Cancellation & Refund", "ml": "റദ്ദാക്കലും റീഫണ്ടും", "hi": "रद्दीकरण और रिफ़ंड", "ta": "ரத்து & பணத்திரும்பப் பெறுதல்", "te": "రద్దు & రీఫండ్", "kn": "ರದ್ದತಿ ಮತ್ತು ಮರುಪಾವತಿ", "bn": "বাতিল ও রিফান্ড", "mr": "रद्द आणि परतावा", "gu": "રદ અને રિફંડ", "pa": "ਰੱਦ ਅਤੇ ਰਿਫੰਡ"}, "contact": {"en": "Contact & Support", "ml": "ബന്ധപ്പെടുക", "hi": "संपर्क और सहायता", "ta": "தொடர்பு & உதவி", "te": "సంప్రదింపు & సహాయం", "kn": "ಸಂಪರ್ಕ ಮತ್ತು ಸಹಾಯ", "bn": "যোগাযোগ ও সহায়তা", "mr": "संपर्क आणि मदत", "gu": "સંપર્ક અને સહાય", "pa": "ਸੰਪਰਕ ਅਤੇ ਸਹਾਇਤਾ"}, "pricing": {"en": "Plans & charges", "ml": "പ്ലാനുകളും ചാർജുകളും", "hi": "प्लान और शुल्क", "ta": "திட்டங்கள் & கட்டணங்கள்", "te": "ప్లాన్లు & ఛార్జీలు", "kn": "ಯೋಜನೆಗಳು ಮತ್ತು ಶುಲ್ಕಗಳು", "bn": "প্ল্যান ও চার্জ", "mr": "प्लॅन आणि शुल्क", "gu": "પ્લાન અને ચાર્જ", "pa": "ਪਲਾਨ ਅਤੇ ਖਰਚੇ"}, "phone": {"en": "Phone", "ml": "ഫോൺ", "hi": "फ़ोन", "ta": "தொலைபேசி", "te": "ఫోన్", "kn": "ಫೋನ್", "bn": "ফোন", "mr": "फोन", "gu": "ફોન", "pa": "ਫ਼ੋਨ"}, "password": {"en": "Password", "ml": "പാസ്‌വേഡ്", "hi": "पासवर्ड", "ta": "கடவுச்சொல்", "te": "పాస్‌వర్డ్", "kn": "ಪಾಸ್‌ವರ್ಡ್", "bn": "পাসওয়ার্ড", "mr": "पासवर्ड", "gu": "પાસવર્ડ", "pa": "ਪਾਸਵਰਡ"}, "name": {"en": "Name", "ml": "പേര്"}, "save": {"en": "Save", "ml": "സേവ് ചെയ്യുക"}, "cancel": {"en": "Cancel", "ml": "വേണ്ട"}, "edit": {"en": "Edit", "ml": "തിരുത്തുക"}, "delete": {"en": "Delete", "ml": "ഒഴിവാക്കുക"}, "add_product": {"en": "Add product", "ml": "സാധനം ചേർക്കുക"}, "products": {"en": "Products", "ml": "സാധനങ്ങൾ", "hi": "उत्पाद", "ta": "பொருட்கள்", "te": "ఉత్పత్తులు", "kn": "ಉತ್ಪನ್ನಗಳು", "bn": "পণ্য", "mr": "उत्पादने", "gu": "વસ્તુઓ", "pa": "ਉਤਪਾਦ"}, "orders": {"en": "Orders", "ml": "ഓർഡറുകൾ"}, "reports": {"en": "Reports", "ml": "റിപ്പോർട്ടുകൾ"}, "settings": {"en": "Shop settings", "ml": "കടയുടെ ക്രമീകരണം"}, "subscription": {"en": "Plan", "ml": "പ്ലാൻ"}, "support": {"en": "Support", "ml": "സഹായം"}, "send": {"en": "Send", "ml": "അയയ്ക്കുക"}, "demo_banner": {"en": "DEMO MODE — all shops, products and orders you see are sample test data.", "ml": "ഡെമോ മോഡ് — ഇവിടെ കാണുന്ന കടകളും സാധനങ്ങളും ഓർഡറുകളും പരീക്ഷണത്തിനുള്ള സാമ്പിൾ ഡാറ്റയാണ്."}, "install_app": {"en": "Install app", "ml": "ആപ്പ് ഇൻസ്റ്റാൾ ചെയ്യുക"}, "pending_notice": {"en": "Your shop is waiting for approval. It will go live after the admin approves it.", "ml": "നിങ്ങളുടെ കട അംഗീകാരത്തിനായി കാത്തിരിക്കുന്നു. അഡ്മിൻ അംഗീകരിച്ചാൽ കട പ്രവർത്തനക്ഷമമാകും."}, "footer_note": {"en": "Local shops, local people.", "ml": "നാട്ടിലെ കടകൾ, നാട്ടിലെ ആളുകൾ.", "hi": "स्थानीय दुकानें, स्थानीय लोग।", "ta": "உள்ளூர் கடைகள், உள்ளூர் மக்கள்.", "te": "స్థానిక దుకాణాలు, స్థానిక ప్రజలు.", "kn": "ಸ್ಥಳೀಯ ಅಂಗಡಿಗಳು, ಸ್ಥಳೀಯ ಜನರು.", "bn": "স্থানীয় দোকান, স্থানীয় মানুষ।", "mr": "स्थानिक दुकाने, स्थानिक लोक.", "gu": "સ્થાનિક દુકાનો, સ્થાનિક લોકો.", "pa": "ਸਥਾਨਕ ਦੁਕਾਨਾਂ, ਸਥਾਨਕ ਲੋਕ।"}, "share": {"en": "Share", "ml": "പങ്കിടുക", "hi": "शेयर करें", "ta": "பகிர்", "te": "షేర్ చేయి", "kn": "ಹಂಚಿಕೊಳ್ಳಿ", "bn": "শেয়ার করুন", "mr": "शेअर करा", "gu": "શેર કરો", "pa": "ਸਾਂਝਾ ਕਰੋ"}, "link_copied": {"en": "Link copied", "ml": "ലിങ്ക് പകർത്തി", "hi": "लिंक कॉपी हुआ", "ta": "இணைப்பு நகலெடுக்கப்பட்டது", "te": "లింక్ కాపీ అయింది", "kn": "ಲಿಂಕ್ ಕಾಪಿ ಆಯಿತು", "bn": "লিঙ্ক কপি হয়েছে", "mr": "लिंक कॉपी केला", "gu": "લિંક કૉપિ થઈ", "pa": "ਲਿੰਕ ਕਾਪੀ ਹੋਇਆ"}, "copy_link": {"en": "Copy link", "ml": "ലിങ്ക് പകർത്തുക", "hi": "लिंक कॉपी करें", "ta": "இணைப்பை நகலெடு", "te": "లింక్ కాపీ చేయి", "kn": "ಲಿಂಕ್ ಕಾಪಿ ಮಾಡಿ", "bn": "লিঙ্ক কপি করুন", "mr": "लिंक कॉपी करा", "gu": "લિંક કૉપિ કરો", "pa": "ਲਿੰਕ ਕਾਪੀ ਕਰੋ"}};

/* ---------- tiny helpers ---------- */
const $ = (s, r = document) => r.querySelector(s);
const ls = {
  get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* private mode */ } },
};
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
class Raw { constructor(s) { this.s = s; } }
const raw = s => new Raw(s);
const val = v => (v instanceof Raw ? v.s : Array.isArray(v) ? v.map(val).join('') : (v === false || v == null) ? '' : esc(v));
const html = (strs, ...vals) => raw(strs.reduce((o, s, i) => o + s + (i < vals.length ? val(vals[i]) : ''), ''));
const enc = encodeURIComponent;
const inr = n => '₹' + Math.round(Number(n) || 0).toLocaleString('en-IN');
const dt = s => s ? new Date(s).toLocaleString('en-IN', { timeZone: IST, day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '';
const dOnly = s => s ? new Date(s).toLocaleDateString('en-IN', { timeZone: IST, day: '2-digit', month: 'short', year: 'numeric' }) : '';
const todayIST = () => new Date().toLocaleDateString('en-CA', { timeZone: IST });
const dayKey = s => new Date(s).toLocaleDateString('en-CA', { timeZone: IST });
const clean = (v, n = 200) => String(v ?? '').replace(/\s+/g, ' ').trim().slice(0, n);
const cleanML = (v, n = 1000) => String(v ?? '').replace(/\r/g, '').trim().slice(0, n);
const toInt = (v, lo, hi) => { const s = String(v ?? '').trim(); if (!/^-?\d+$/.test(s)) return null; const n = parseInt(s, 10); return (lo !== undefined && n < lo) || (hi !== undefined && n > hi) ? null : n; };
const normPhone = raw0 => { let d = String(raw0 || '').replace(/\D/g, ''); if (d.length === 12 && d.startsWith('91')) d = d.slice(2); else if (d.length === 11 && d.startsWith('0')) d = d.slice(1); return /^[6-9]\d{9}$/.test(d) ? d : null; };
const waLink = (num, text) => `https://wa.me/91${num}` + (text ? '?text=' + enc(text) : '');
const shopUrl = sh => location.origin + location.pathname + '#/s/' + enc(sh.slug);
function sharePanel(sh, compact) {
  const u = shopUrl(sh), txt = `${sh.name} — ${sh.town}`; 
  return html`<div class="sharebar${compact ? ' compact' : ''}">
    ${compact ? '' : html`<div class="sharelink" id="sharelink">${u}</div>`}
    <div class="row gap-s">
      <button class="btn small gold" type="button" data-act="copylink" data-url="${u}">🔗 ${t('copy_link')}</button>
      <a class="btn small wa" rel="noopener" target="_blank" href="https://wa.me/?text=${enc(txt + ' ' + u)}">💬 WhatsApp</a>
      <a class="btn small ghost" rel="noopener" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=${enc(u)}">📘 Facebook</a>
      <button class="btn small ghost" type="button" data-act="sharenative" data-url="${u}" data-title="${txt}">📤 ${t('share')}</button></div></div>`;
}
const isHttps = u => /^https:\/\/[^\s<>"']{4,300}$/.test(u || '');
const filterTerm = v => String(v || '').replace(/[,()%*\\"_]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 60);

/* ---------- state ---------- */
const LANGS = [['en', 'English'], ['ml', 'മലയാളം'], ['hi', 'हिन्दी'], ['ta', 'தமிழ்'], ['te', 'తెలుగు'], ['kn', 'ಕನ್ನಡ'], ['bn', 'বাংলা'], ['mr', 'मराठी'], ['gu', 'ગુજરાતી'], ['pa', 'ਪੰਜਾਬੀ']];
function pickLang() {
  const ok = c => LANGS.some(l => l[0] === c); const saved = ls.get('nk_lang', null); if (ok(saved)) return saved;
  try { const c = (navigator.language || 'en').slice(0, 2).toLowerCase(); if (ok(c)) return c; } catch (e) { /* ignore */ }
  return 'en';
}
const langSelect = () => html`<select class="langsel" data-langsel="1" aria-label="Language" title="Language">${LANGS.map(l => html`<option value="${l[0]}" ${S.lang === l[0] ? raw('selected') : ''}>${l[1]}</option>`)}</select>`;
const S = {
  lang: pickLang(),
  place: ls.get('nk_place', ''),
  cats: [], plans: [], settings: {},
  user: null, profile: null, shop: null,
  timer: null, route: '',
  app: false, installEvt: null,
};
const isStandalone = () => { try { return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true; } catch (e) { return false; } };
S.app = !window.NK_ADMIN_ONLY && (ls.get('nk_app', null) === null ? isStandalone() : !!ls.get('nk_app', false));
const t = k => (I18N[k] && (I18N[k][S.lang] || I18N[k].en)) || k;
const setting = k => S.settings[k] || '';
const SITE_NAMES = { en: 'Nammude Kada', ml: 'നമ്മുടെ കട', hi: 'हमारी दुकान', ta: 'நம் கடை', te: 'మన దుకాణం', kn: 'ನಮ್ಮ ಅಂಗಡಿ', bn: 'আমাদের দোকান', mr: 'आपले दुकान', gu: 'આપણી દુકાન', pa: 'ਸਾਡੀ ਦੁਕਾਨ' };
// If the admin has not chosen a custom name (still the default), show the name in the visitor's language.
const siteName = () => { const s = setting('site_name'); return (!s || s === SITE_NAMES.en || s === SITE_NAMES.ml) ? (SITE_NAMES[S.lang] || SITE_NAMES.en) : s; };
const cname = c => !c ? '' : (S.lang === 'ml' && c.name_ml ? c.name_ml : c.name_en);
const pname = p => (S.lang === 'ml' && p.name_ml ? p.name_ml : p.name);
const catById = id => S.cats.find(c => c.id === id);
const effPrice = p => (p.discount_price && p.discount_price < p.price ? p.discount_price : p.price);
const imgUrl = u => (u && String(u).startsWith(CONFIG.SUPABASE_URL + '/storage/') ? u : '');
const pimgs = p => [p.image, p.image2, p.image3].map(imgUrl).filter(Boolean);
const adLabel = () => (S.lang === 'ml' ? 'പരസ്യം' : 'Ad');
const addDays = (d, n) => { const x = new Date(d + 'T00:00:00Z'); x.setUTCDate(x.getUTCDate() + n); return x.toISOString().slice(0, 10); };
const priceOf = k => { const n = parseInt(setting(k), 10); return n > 0 ? n : 0; };
const isFeatured = s => !!(s.featured_until && s.featured_until >= todayIST());

let sb = null;
CONFIG.SUPABASE_URL = String(CONFIG.SUPABASE_URL).trim().replace(/\/+$/, '').replace(/\/(rest|auth)\/v1.*$/, ''); CONFIG.SUPABASE_ANON_KEY = String(CONFIG.SUPABASE_ANON_KEY).trim();
const urlOk = () => /^https:\/\/[a-z0-9-]+\.supabase\.(co|in)$/i.test(CONFIG.SUPABASE_URL) && !/YOUR/i.test(CONFIG.SUPABASE_URL);
const keyOk = () => !/YOUR/i.test(CONFIG.SUPABASE_ANON_KEY) && CONFIG.SUPABASE_ANON_KEY.length > 40;
const configured = () => urlOk() && keyOk();

/* Supabase returns {data, error}. Turn errors into exceptions with a readable message. */
function must(res) {
  if (res && res.error) {
    const m = res.error.message || 'Something went wrong';
    const friendly = /row-level security|permission denied|JWT/i.test(m) ? 'You are not allowed to do that. Please log in again.'
      : /violates check constraint|invalid input syntax/i.test(m) ? 'Some information is not valid. Please check the form.'
      : /duplicate key/i.test(m) ? 'That already exists.' : m;
    const e = new Error(friendly); e.raw = res.error; throw e;
  }
  return res.data;
}

/* ---------- opening hours ---------- */
function defaultHours() { const h = {}; DAYS.forEach(d => { h[d] = { open: '09:00', close: '21:00', closed: false }; }); return h; }
function shopHours(shop) {
  const h = defaultHours(); const src = (shop && shop.hours) || {};
  DAYS.forEach(d => { if (src[d] && typeof src[d] === 'object') Object.assign(h[d], src[d]); });
  return h;
}
function istNow() {
  const parts = new Intl.DateTimeFormat('en-GB', { timeZone: IST, weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date());
  const g = ty => parts.find(p => p.type === ty).value;
  return { day: g('weekday').toLowerCase().slice(0, 3), time: `${g('hour')}:${g('minute')}` };
}
function isOpenNow(shop) {
  const { day, time } = istNow(); const h = shopHours(shop)[day];
  if (!h || h.closed) return false;
  return h.open <= h.close ? (time >= h.open && time < h.close) : (time >= h.open || time < h.close);
}
function effPlan(shop) {
  const free = S.plans.find(p => p.price === 0) || S.plans[0] || { name: 'Starter', price: 0, max_products: 25 };
  if (shop && shop.plan_id && shop.plan_until && shop.plan_until >= todayIST()) { const pl = S.plans.find(p => p.id === shop.plan_id); if (pl) return pl; }
  return free;
}

/* ---------- UI plumbing ---------- */
const appEl = () => $('#app');
function toast(msg, type = 'ok') {
  const box = $('#toast'); const d = document.createElement('div');
  d.className = 'toast ' + (type === 'error' ? 'error' : ''); d.textContent = ownScope() ? ownTr(String(msg)) : msg; box.appendChild(d);
  setTimeout(() => d.remove(), type === 'error' ? 6500 : 3500);
}
function setMeta(title, desc, noindex) {
  document.title = title || siteName();
  let m = $('meta[name=description]'); if (!m) { m = document.createElement('meta'); m.name = 'description'; document.head.appendChild(m); }
  m.content = desc || t('tagline');
  let r = $('meta[name=robots]');
  if (noindex) { if (!r) { r = document.createElement('meta'); r.name = 'robots'; document.head.appendChild(r); } r.content = 'noindex,nofollow'; } else if (r) r.remove();
}
/* =====================================================================
   OWNER / REGISTER PAGES — extra-language layer
   The owner screens are written in English. When a customer language is chosen
   that has a table below, text on the owner/register/login pages is replaced
   (exact phrase match) and unknown phrases simply stay in English.
   Machine-drafted: have a native speaker review before relying on it.
   ===================================================================== */
const OWN = {
  ta: {
    'Log in': 'உள்நுழை', 'Email': 'மின்னஞ்சல்', 'Password': 'கடவுச்சொல்', 'Save': 'சேமி', 'Cancel': 'ரத்து செய்', 'Edit': 'திருத்து', 'Delete': 'நீக்கு', 'Open': 'திற', 'Update': 'புதுப்பி', 'Send': 'அனுப்பு', 'Name': 'பெயர்', 'Phone': 'தொலைபேசி', 'Price': 'விலை', 'Total': 'மொத்தம்', 'Status': 'நிலை', 'All': 'அனைத்தும்', 'Orders': 'ஆர்டர்கள்', 'Products': 'பொருட்கள்', 'Reports': 'அறிக்கைகள்', 'Support': 'உதவி', 'Categories': 'வகைகள்',
    'For shop owners and the site administrator. Customers do not need an account — just add items to the cart and order.': 'கடை உரிமையாளர்களுக்கும் தள நிர்வாகிக்கும் மட்டும். வாடிக்கையாளர்களுக்குக் கணக்கு தேவையில்லை — பொருட்களை கார்ட்டில் சேர்த்து ஆர்டர் செய்தால் போதும்.',
    'My shop?': 'என் கடை?', 'Sell with us': 'எங்களுடன் விற்கவும்', 'Forgot password?': 'கடவுச்சொல்லை மறந்துவிட்டீர்களா?', 'Send reset link': 'மீட்டமைப்பு இணைப்பை அனுப்பு',
    'Free to start. Your shop goes live after the admin checks your details. See': 'தொடங்குவது இலவசம். நிர்வாகி உங்கள் விவரங்களைச் சரிபார்த்த பின் உங்கள் கடை தளத்தில் தெரியும். மேலும் அறிய:', 'plans and charges': 'திட்டங்களும் கட்டணங்களும்',
    'Shop details': 'கடை விவரங்கள்', 'Shop name': 'கடையின் பெயர்', 'Shop category': 'கடை வகை', 'About the shop (optional)': 'கடையைப் பற்றி (விருப்பம்)', 'Full shop address': 'கடையின் முழு முகவரி', 'Locality / area': 'பகுதி / இடம்', 'Town / place': 'நகரம் / ஊர்', 'State / UT': 'மாநிலம் / யூனியன் பிரதேசம்', 'District': 'மாவட்டம்', '— choose —': '— தேர்ந்தெடுக்கவும் —', 'PIN code': 'அஞ்சல் குறியீடு (PIN)', 'Google Maps link of your shop (optional)': 'கடையின் Google Maps இணைப்பு (விருப்பம்)', 'WhatsApp number of the shop': 'கடையின் வாட்ஸ்அப் எண்', 'Customers will see this number and send orders here. It will be shown publicly.': 'வாடிக்கையாளர்கள் இந்த எண்ணைப் பார்த்து இங்கே ஆர்டர்களை அனுப்புவார்கள். இது எல்லோருக்கும் தெரியும்.',
    'Owner login': 'உரிமையாளர் உள்நுழைவு', 'Owner name': 'உரிமையாளர் பெயர்', 'Your mobile number': 'உங்கள் மொபைல் எண்', 'Email (used to log in)': 'மின்னஞ்சல் (உள்நுழைய பயன்படும்)', 'Password (8+ characters)': 'கடவுச்சொல் (8+ எழுத்துகள்)', 'Repeat password': 'கடவுச்சொல்லை மீண்டும் உள்ளிடவும்', 'I agree to the': 'நான் ஒப்புக்கொள்கிறேன்:', 'Terms': 'விதிமுறைகள்', 'and': 'மற்றும்', 'Privacy Policy': 'தனியுரிமைக் கொள்கை',
    'Set a new password': 'புதிய கடவுச்சொல்லை அமைக்கவும்', 'New password (8+ characters)': 'புதிய கடவுச்சொல் (8+ எழுத்துகள்)', 'Repeat new password': 'புதிய கடவுச்சொல்லை மீண்டும் உள்ளிடவும்',
    '📊 Overview': '📊 மேலோட்டம்', '📦 Products': '📦 பொருட்கள்', '🧾 Orders': '🧾 ஆர்டர்கள்', '📈 Reports': '📈 அறிக்கைகள்', '⚙️ Shop settings': '⚙️ கடை அமைப்புகள்', '⭐ Plan': '⭐ திட்டம்', '📣 Promote & Ads': '📣 விளம்பரமும் பிரபலப்படுத்தலும்', '🧮 Commission': '🧮 கமிஷன்', '💬 Support': '💬 உதவி', '🔒 Password': '🔒 கடவுச்சொல்', '🏪 View shop': '🏪 கடையைப் பார்',
    'New Orders': 'புதிய ஆர்டர்கள்', 'Orders today': 'இன்றைய ஆர்டர்கள்', 'Orders this month': 'இந்த மாத ஆர்டர்கள்', 'Plan': 'திட்டம்', 'new order(s) waiting.': 'புதிய ஆர்டர்(கள்) காத்திருக்கின்றன.', 'Open them →': 'திறந்து பார் →', 'View all →': 'அனைத்தையும் பார் →', 'Your shop link': 'உங்கள் கடை இணைப்பு', 'Share this link on WhatsApp, Instagram or print it on a board:': 'இந்த இணைப்பை வாட்ஸ்அப், இன்ஸ்டாகிராமில் பகிரவும் அல்லது பலகையில் அச்சிடவும்:',
    '＋ Add product': '＋ பொருளைச் சேர்', 'Add product': 'பொருளைச் சேர்', 'Stock': 'இருப்பு', '✅ In stock': '✅ கையிருப்பில் உள்ளது', 'In stock': 'கையிருப்பில் உள்ளது', 'Out of stock': 'கையிருப்பில் இல்லை', 'Hidden': 'மறைக்கப்பட்டது', 'Blocked by admin': 'நிர்வாகியால் தடுக்கப்பட்டது',
    'Product name (English)': 'பொருளின் பெயர் (ஆங்கிலம்)', 'Product name (മലയാളം, optional)': 'பொருளின் பெயர் (மலையாளம், விருப்பம்)', 'Price (₹)': 'விலை (₹)', 'Discount price (₹, optional)': 'தள்ளுபடி விலை (₹, விருப்பம்)', 'Unit (e.g. 1 kg, per piece)': 'அலகு (எ.கா. 1 கிலோ, ஒரு துண்டு)', 'Description (optional)': 'விளக்கம் (விருப்பம்)', 'Stock quantity (optional)': 'இருப்பு எண்ணிக்கை (விருப்பம்)', 'Leave empty if you do not want to count stock. A number reduces with every order.': 'இருப்பைக் கணக்கிட வேண்டாம் என்றால் காலியாக விடவும். ஒவ்வொரு ஆர்டருக்கும் எண்ணிக்கை குறையும்.', 'Show to customers': 'வாடிக்கையாளர்களுக்குக் காட்டு',
    'Photos (up to 3 — JPG, PNG or WebP). The first one is the main photo.': 'படங்கள் (3 வரை — JPG, PNG அல்லது WebP). முதல் படம் முதன்மைப் படம்.', 'Photo 1': 'படம் 1', 'Photo 2': 'படம் 2', 'Photo 3': 'படம் 3', 'Remove': 'நீக்கு',
    'Confirmed': 'உறுதி செய்யப்பட்டது', 'Preparing': 'தயாராகிறது', 'Ready': 'தயார்', 'Out for delivery': 'டெலிவரிக்கு வெளியே', 'Delivered': 'டெலிவரி ஆனது', 'Cancelled': 'ரத்து செய்யப்பட்டது', 'New': 'புதியது',
    'How do you want to receive it?': 'எப்படிப் பெற விரும்புகிறீர்கள்?', 'Home delivery': 'வீட்டுக்கு டெலிவரி', 'Store pickup': 'கடையில் எடுத்துக்கொள்ளுதல்', 'Payment:': 'பணம் செலுத்தல்:', 'Not marked paid': 'பணம் பெற்றதாகக் குறிக்கப்படவில்லை', '✅ Mark payment received': '✅ பணம் பெற்றதாகக் குறி', 'Items total': 'பொருட்களின் மொத்தம்', 'Delivery fee': 'டெலிவரி கட்டணம்', 'Total — Cash on delivery / pay at the shop': 'மொத்தம் — டெலிவரியில் பணம் / கடையில் செலுத்தல்',
    'Update status': 'நிலையைப் புதுப்பி', 'Customers see the new status on their order page. Tap the button below to tell them on WhatsApp too.': 'வாடிக்கையாளர்கள் தங்கள் ஆர்டர் பக்கத்தில் புதிய நிலையைப் பார்ப்பார்கள். வாட்ஸ்அப்பிலும் தெரிவிக்க கீழே உள்ள பொத்தானை அழுத்தவும்.', '💬 Message customer on WhatsApp': '💬 வாடிக்கையாளருக்கு வாட்ஸ்அப்பில் செய்தி அனுப்பு', '← Orders': '← ஆர்டர்கள்',
    'Reports': 'அறிக்கைகள்', 'Orders received': 'பெற்ற ஆர்டர்கள்', 'Sales (delivered)': 'விற்பனை (டெலிவரி ஆனவை)', 'By day': 'நாள் வாரியாக', 'Date': 'தேதி', 'Sales': 'விற்பனை', 'Best-selling products': 'அதிகம் விற்ற பொருட்கள்', 'Sold': 'விற்றவை', 'Value': 'மதிப்பு',
    'Shop settings': 'கடை அமைப்புகள்', 'Orders & delivery': 'ஆர்டர்கள் & டெலிவரி', 'Accepting orders now (untick when you are closed or busy)': 'இப்போது ஆர்டர்கள் ஏற்கப்படுகின்றன (கடை மூடியிருந்தால் அல்லது பிஸியாக இருந்தால் தேர்வை நீக்கவும்)', '🛵 Home delivery': '🛵 வீட்டுக்கு டெலிவரி', '🏬 Store pickup': '🏬 கடையில் எடுத்துக்கொள்ளுதல்', 'Delivery fee (₹, 0 = free)': 'டெலிவரி கட்டணம் (₹, 0 = இலவசம்)', 'Minimum order (₹, 0 = none)': 'குறைந்தபட்ச ஆர்டர் (₹, 0 = இல்லை)', 'Delivery time (e.g. Within 1 hour)': 'டெலிவரி நேரம் (எ.கா. 1 மணி நேரத்துக்குள்)', 'Delivery area (e.g. within 5 km)': 'டெலிவரி பகுதி (எ.கா. 5 கி.மீ.க்குள்)',
    'Your UPI ID to receive customer payments (optional, e.g. name@bank)': 'வாடிக்கையாளர் பணம் பெறும் உங்கள் UPI ID (விருப்பம், எ.கா. name@bank)', 'If you add it, customers see “Pay by UPI” on their order page and the money goes straight to you. It is also visible to anyone who views your shop data, so use a UPI ID you are happy to share. You must confirm each payment yourself in your UPI app/bank.': 'இதைச் சேர்த்தால், வாடிக்கையாளர்கள் ஆர்டர் பக்கத்தில் “UPI மூலம் செலுத்து” என்பதைப் பார்ப்பார்கள்; பணம் நேரடியாக உங்களுக்கே வரும். உங்கள் கடைத் தரவைப் பார்க்கும் எவருக்கும் இது தெரியும், எனவே பகிர விரும்பும் UPI ID-ஐ மட்டும் பயன்படுத்தவும். ஒவ்வொரு பணத்தையும் உங்கள் UPI செயலி/வங்கியில் நீங்களே உறுதிசெய்ய வேண்டும்.',
    'Opening hours': 'திறக்கும் நேரம்', 'Day': 'நாள்', 'Close': 'மூடும் நேரம்', 'Closed': 'மூடப்பட்டது', 'Monday': 'திங்கள்', 'Tuesday': 'செவ்வாய்', 'Wednesday': 'புதன்', 'Thursday': 'வியாழன்', 'Friday': 'வெள்ளி', 'Saturday': 'சனி', 'Sunday': 'ஞாயிறு', 'Category': 'வகை', 'About the shop': 'கடையைப் பற்றி', 'Address': 'முகவரி', 'Locality': 'பகுதி', 'Town': 'நகரம்', 'WhatsApp number': 'வாட்ஸ்அப் எண்', 'Google Maps link': 'Google Maps இணைப்பு', 'Shop logo / photo': 'கடையின் லோகோ / படம்',
    'Promote & Ads': 'விளம்பரமும் பிரபலப்படுத்தலும்', 'Nothing is charged by the website. You pay the marketplace by UPI or Razorpay, and the team switches it on after they see your money.': 'இணையதளம் தானாகப் பணம் எடுக்காது. நீங்கள் UPI அல்லது Razorpay மூலம் எங்களுக்குச் செலுத்துவீர்கள்; பணம் வந்ததைப் பார்த்த பின் குழு அதை இயக்கும்.',
    '⭐ Promote my shop': '⭐ என் கடையைப் பிரபலப்படுத்து', 'Promoted shops are shown': 'பிரபலப்படுத்தப்பட்ட கடைகள் காட்டப்படும்', 'first': 'முதலில்', 'in town and category lists and in “Featured shops” on the home page.': 'ஊர் மற்றும் வகைப் பட்டியல்களிலும், முகப்புப் பக்கத்தின் “சிறப்புக் கடைகள்” பகுதியிலும்.', 'How many days? (1–90)': 'எத்தனை நாட்கள்? (1–90)', 'Continue to payment': 'பணம் செலுத்தலுக்குத் தொடர்', 'waiting': 'காத்திருக்கிறது',
    '💳 Pay ₹100 with Razorpay': '💳 Razorpay மூலம் ₹100 செலுத்து', 'Pay ₹100 by UPI': 'UPI மூலம் ₹100 செலுத்து', 'UPI ID:': 'UPI ID:', 'Open UPI app (phone)': 'UPI செயலியைத் திற (போன்)', 'After paying, enter the UPI reference / UTR number': 'பணம் செலுத்திய பின் UPI குறிப்பு / UTR எண்ணை உள்ளிடவும்', 'I have paid': 'நான் செலுத்திவிட்டேன்',
    '📣 Banner advertisement': '📣 பேனர் விளம்பரம்', 'Your banner appears between the products on the': 'உங்கள் பேனர் பொருட்களுக்கு இடையே தோன்றும்:', 'home page': 'முகப்புப் பக்கம்', 'and category pages, marked “Ad”. The team checks every banner before it goes live.': 'மற்றும் வகைப் பக்கங்களில், “விளம்பரம்” எனக் குறிக்கப்பட்டு. ஒவ்வொரு பேனரையும் வெளியிடும் முன் குழு சரிபார்க்கும்.', 'Headline (3–80 letters)': 'தலைப்பு (3–80 எழுத்துகள்)', 'Short text (optional)': 'சிறு விளக்கம் (விருப்பம்)', 'Open this when tapped': 'தட்டினால் இதைத் திற', 'My shop page': 'என் கடைப் பக்கம்', 'Banner picture (optional, landscape looks best)': 'பேனர் படம் (விருப்பம், அகலப் படம் சிறந்தது)', 'Your ads': 'உங்கள் விளம்பரங்கள்', 'pending': 'நிலுவையில்', 'approved': 'அங்கீகரிக்கப்பட்டது', '✅ Payment reported:': '✅ பணம் செலுத்தியதாகத் தெரிவிக்கப்பட்டது:', '. Waiting for the team to confirm.': '. குழு உறுதிசெய்யக் காத்திருக்கிறது.', 'Delete this ad': 'இந்த விளம்பரத்தை நீக்கு', 'UPI': 'UPI',
    'Commission': 'கமிஷன்', 'The marketplace charges': 'இணையதளம் வசூலிப்பது:', 'of the item value on each': 'ஒவ்வொரு', 'delivered': 'டெலிவரி ஆன', 'order. Customers pay': 'ஆர்டரின் பொருள் மதிப்பில். வாடிக்கையாளர்கள் பணம் செலுத்துவது', 'you': 'உங்களுக்கே', 'directly, so you pay the commission to the marketplace. Nothing is taken automatically.': 'நேரடியாக; எனவே கமிஷனை நீங்கள் எங்களுக்குச் செலுத்த வேண்டும். எதுவும் தானாக எடுக்கப்படாது.', 'Commission earned': 'சேர்ந்த கமிஷன்', 'Paid (confirmed)': 'செலுத்தியது (உறுதி)', 'Due now': 'இப்போது செலுத்த வேண்டியது', 'waiting for the team': 'குழுவுக்காகக் காத்திருக்கிறது', 'Delivered orders': 'டெலிவரி ஆன ஆர்டர்கள்', 'Order': 'ஆர்டர்', 'Order total': 'ஆர்டர் மொத்தம்',
    'Current plan:': 'தற்போதைய திட்டம்:', 'Free': 'இலவசம்', 'free': 'இலவசம்', '✅ Current': '✅ தற்போது', '/ month': '/ மாதம்', 'Request without paying now': 'இப்போது செலுத்தாமல் கோரிக்கை அனுப்பு', 'How charges work': 'கட்டணங்கள் எப்படி செயல்படும்', 'Pay the marketplace by': 'இணையதளத்துக்கு செலுத்தும் வழி:', 'or': 'அல்லது', 'Razorpay': 'Razorpay', '(when enabled below). The plan is': '(இயக்கப்பட்டிருந்தால்). திட்டம்', 'not': 'தானாக', 'activated automatically: the team checks that the money has arrived and then activates it. Customer orders are still paid directly to the shop.': 'இயக்கப்படாது: பணம் வந்ததைக் குழு சரிபார்த்த பின் இயக்கும். வாடிக்கையாளர் ஆர்டர்களுக்கான பணம் தொடர்ந்து நேரடியாக கடைக்கே செல்லும்.', 'If a paid plan ends, your shop returns to the free Starter plan. Products stay, but you cannot add more than the free limit.': 'கட்டணத் திட்டம் முடிந்தால் உங்கள் கடை இலவச Starter திட்டத்துக்குத் திரும்பும். பொருட்கள் அப்படியே இருக்கும், ஆனால் இலவச வரம்புக்கு மேல் சேர்க்க முடியாது.', 'Order commission:': 'ஆர்டர் கமிஷன்:', 'of delivered order item value, settled with the team outside the website.': 'டெலிவரி ஆன ஆர்டரின் பொருள் மதிப்பில்; இணையதளத்துக்கு வெளியே குழுவுடன் தீர்க்கப்படும்.', 'Full details of charges': 'கட்டணங்களின் முழு விவரம்',
    '(8+ characters)': '(8+ எழுத்துகள்)', 'புதியது Orders': 'புதிய ஆர்டர்கள்', '(₹, 0 = free)': '(₹, 0 = இலவசம்)', '(₹, 0 = none)': '(₹, 0 = இல்லை)', '(e.g. Within 1 hour)': '(எ.கா. 1 மணி நேரத்துக்குள்)', '(e.g. within 5 km)': '(எ.கா. 5 கி.மீ.க்குள்)',
    'Last 30 days. All numbers come from the orders in your account. “Sales” counts only orders marked': 'கடந்த 30 நாட்கள். எல்லா எண்களும் உங்கள் கணக்கில் உள்ள ஆர்டர்களிலிருந்து வருகின்றன. “விற்பனை” என்பது இவ்வாறு குறிக்கப்பட்ட ஆர்டர்களை மட்டுமே கணக்கிடும்:',
    'Subject': 'தலைப்பு', 'Message': 'செய்தி', 'Change password': 'கடவுச்சொல்லை மாற்று', 'No orders yet. Share your shop link with customers.': 'இன்னும் ஆர்டர்கள் இல்லை. உங்கள் கடை இணைப்பை வாடிக்கையாளர்களுடன் பகிருங்கள்.', 'No orders here yet.': 'இங்கே இன்னும் ஆர்டர்கள் இல்லை.', 'Add your first product so customers can order.': 'வாடிக்கையாளர்கள் ஆர்டர் செய்ய உங்கள் முதல் பொருளைச் சேர்க்கவும்.', 'No shop on this account': 'இந்தக் கணக்கில் கடை இல்லை', 'Dashboard': 'டாஷ்போர்டு',
    'Your shop link': 'உங்கள் கடை இணைப்பு', 'This is your own shop website. Share it on WhatsApp, Facebook and Instagram (paste it in your bio or story), or print it on a board:': 'இதுதான் உங்கள் சொந்தக் கடை இணையதளம். வாட்ஸ்அப், பேஸ்புக், இன்ஸ்டாகிராமில் (பயோ அல்லது ஸ்டோரியில் ஒட்டவும்) பகிரவும் அல்லது பலகையில் அச்சிடவும்:',
    'Your shop category / section (optional, e.g. Doors, Windows, Offers)': 'உங்கள் கடையின் வகை / பிரிவு (விருப்பம், எ.கா. கதவுகள், ஜன்னல்கள், சலுகைகள்)', 'Customers see these as category buttons on your shop page. Use the same name for products that belong together.': 'வாடிக்கையாளர்கள் இவற்றை உங்கள் கடைப் பக்கத்தில் வகைப் பொத்தான்களாகப் பார்ப்பார்கள். ஒன்றுடன் ஒன்று சேரும் பொருட்களுக்கு ஒரே பெயரைப் பயன்படுத்தவும்.',
    'Upgrade your plan →': 'திட்டத்தை உயர்த்து →', 'Upgrade →': 'உயர்த்து →', 'Open': 'திற',
    /* toasts and errors */
    'Product deleted.': 'பொருள் நீக்கப்பட்டது.', 'Product updated.': 'பொருள் புதுப்பிக்கப்பட்டது.', 'Product added.': 'பொருள் சேர்க்கப்பட்டது.', 'Order status updated.': 'ஆர்டர் நிலை புதுப்பிக்கப்பட்டது.', 'Shop settings saved.': 'கடை அமைப்புகள் சேமிக்கப்பட்டன.', 'Message sent to the marketplace team.': 'செய்தி குழுவுக்கு அனுப்பப்பட்டது.', 'Password changed.': 'கடவுச்சொல் மாற்றப்பட்டது.', 'Marked as paid.': 'பணம் பெற்றதாகக் குறிக்கப்பட்டது.', 'Marked as not paid.': 'பணம் பெறவில்லை எனக் குறிக்கப்பட்டது.', 'Wrong email or password.': 'மின்னஞ்சல் அல்லது கடவுச்சொல் தவறு.', 'If that email is registered, a reset link has been sent.': 'அந்த மின்னஞ்சல் பதிவு செய்யப்பட்டிருந்தால், மீட்டமைப்பு இணைப்பு அனுப்பப்பட்டுள்ளது.', 'This email is already registered. Please log in.': 'இந்த மின்னஞ்சல் ஏற்கனவே பதிவு செய்யப்பட்டுள்ளது. உள்நுழையவும்.', 'Your shop is registered. It will go live after admin approval. Meanwhile, add your products.': 'உங்கள் கடை பதிவு செய்யப்பட்டது. நிர்வாகி ஒப்புதலுக்குப் பின் தளத்தில் தெரியும். அதுவரை உங்கள் பொருட்களைச் சேர்க்கலாம்.',
    'Now pay using one of the options below.': 'இப்போது கீழே உள்ள வழிகளில் ஒன்றில் செலுத்தவும்.', 'Request created. Now pay using one of the options below.': 'கோரிக்கை உருவாக்கப்பட்டது. இப்போது கீழே உள்ள வழிகளில் ஒன்றில் செலுத்தவும்.', 'Ad saved. Now pay using one of the options below. It goes live after the team checks it.': 'விளம்பரம் சேமிக்கப்பட்டது. கீழே உள்ள வழிகளில் செலுத்தவும். குழு சரிபார்த்த பின் வெளியாகும்.', 'Thank you. The team will match your UPI payment and activate it.': 'நன்றி. குழு உங்கள் UPI பணத்தைச் சரிபார்த்து இயக்கும்.', 'Request sent. The team will contact you on WhatsApp with payment details. Your plan changes only after they confirm your payment.': 'கோரிக்கை அனுப்பப்பட்டது. குழு வாட்ஸ்அப்பில் பணம் செலுத்தும் விவரங்களுடன் தொடர்பு கொள்ளும். பணத்தை உறுதிசெய்த பின்பே திட்டம் மாறும்.', 'You already have an open upgrade request. We will contact you.': 'உங்களிடம் ஏற்கனவே ஒரு திட்ட உயர்வுக் கோரிக்கை உள்ளது. நாங்கள் தொடர்பு கொள்வோம்.',
    'Please enter your name.': 'உங்கள் பெயரை உள்ளிடவும்.', 'Please enter a valid 10-digit mobile number.': 'சரியான 10 இலக்க மொபைல் எண்ணை உள்ளிடவும்.', 'Please enter the product name.': 'பொருளின் பெயரை உள்ளிடவும்.', 'Please enter a valid price in rupees.': 'ரூபாயில் சரியான விலையை உள்ளிடவும்.', 'Discount price must be less than the normal price.': 'தள்ளுபடி விலை சாதாரண விலையை விடக் குறைவாக இருக்க வேண்டும்.', 'Stock quantity must be a whole number (or leave empty).': 'இருப்பு எண்ணிக்கை முழு எண்ணாக இருக்க வேண்டும் (அல்லது காலியாக விடவும்).', 'New password must be at least 8 characters and match in both boxes.': 'புதிய கடவுச்சொல் குறைந்தது 8 எழுத்துகளாக இருக்க வேண்டும்; இரண்டு பெட்டிகளிலும் ஒன்றாக இருக்க வேண்டும்.', 'Please write a subject and a message (at least 10 characters).': 'தலைப்பையும் செய்தியையும் (குறைந்தது 10 எழுத்துகள்) எழுதவும்.', 'Please write a headline (at least 3 letters).': 'தலைப்பை எழுதவும் (குறைந்தது 3 எழுத்துகள்).', 'Enter the UPI reference / UTR number from your payment app.': 'உங்கள் பணம் செலுத்தும் செயலியில் உள்ள UPI குறிப்பு / UTR எண்ணை உள்ளிடவும்.', 'Enter the UPI reference / UTR number (at least 6 characters).': 'UPI குறிப்பு / UTR எண்ணை உள்ளிடவும் (குறைந்தது 6 எழுத்துகள்).', 'Promotion is not available right now.': 'பிரபலப்படுத்தல் இப்போது கிடைக்கவில்லை.', 'Advertising is not available right now.': 'விளம்பரம் இப்போது கிடைக்கவில்லை.', 'Nothing is due.': 'செலுத்த வேண்டியது எதுவும் இல்லை.',
    'Only JPG, PNG or WebP images are allowed.': 'JPG, PNG அல்லது WebP படங்கள் மட்டுமே அனுமதிக்கப்படும்.', 'Image is too large (max 15 MB).': 'படம் மிகப் பெரியது (அதிகபட்சம் 15 MB).', 'That file is not a valid image.': 'அந்தக் கோப்பு சரியான படம் அல்ல.', 'Could not process the image.': 'படத்தைச் செயலாக்க முடியவில்லை.', 'Image is still too large after resizing. Try a smaller photo.': 'அளவு குறைத்த பின்னும் படம் பெரிதாக உள்ளது. சிறிய படத்தை முயற்சிக்கவும்.', 'Something went wrong': 'ஏதோ தவறு நடந்துவிட்டது',
    'Delete this ad request?': 'இந்த விளம்பரக் கோரிக்கையை நீக்கவா?', 'Delete this ad permanently?': 'இந்த விளம்பரத்தை நிரந்தரமாக நீக்கவா?', 'Remove everything from the cart?': 'கார்ட்டில் உள்ள அனைத்தையும் நீக்கவா?'
  }
};
const OWN_RX = {
  ta: [
    [/^(\d+) days promotion — (.+)$/, (m) => `${m[1]} நாட்கள் பிரபலப்படுத்தல் — ${m[2]}`],
    [/^(\d+) days · (.+?)(?: · runs (.+) to (.+))?$/, (m) => `${m[1]} நாட்கள் · ${m[2]}` + (m[3] ? ` · ${m[3]} முதல் ${m[4]} வரை` : '')],
    [/^(\d+) \/ (\d+|∞) products \((.+)\)$/, (m) => `${m[1]} / ${m[2]} பொருட்கள் (${m[3]})`],
    [/^\((₹[\d.,]+) per day\)$/, (m) => `(ஒரு நாளுக்கு ${m[1]})`],
    [/^Pay (₹[\d.,]+) by UPI$/, (m) => `UPI மூலம் ${m[1]} செலுத்து`],
    [/^💳 Pay (₹[\d.,]+) with Razorpay$/, (m) => `💳 Razorpay மூலம் ${m[1]} செலுத்து`],
    [/^On a computer, scan the QR with any UPI app\. Pay exactly (₹[\d.,]+)\.$/, (m) => `கணினியில் இருந்தால் எந்த UPI செயலியிலும் QR-ஐ ஸ்கேன் செய்யவும். சரியாக ${m[1]} செலுத்தவும்.`],
    [/^Payment of (₹[\d.,]+)$/, (m) => `${m[1]} பணம் செலுத்தல்`],
    [/^Marketplace commission if delivered: ([\d.]+)% of items \((₹[\d.,]+)\)\.$/, (m) => `டெலிவரி ஆனால் இணையதளக் கமிஷன்: பொருள் மதிப்பில் ${m[1]}% (${m[2]}).`],
    [/^· (UTR.+)\. Waiting for the team to confirm\.$/, (m) => `· ${m[1]}. குழு உறுதிசெய்யக் காத்திருக்கிறது.`],
    [/^· products (\d+)\/(\d+|∞) · orders this month (\d+)\/(\d+|∞)$/, (m) => `· பொருட்கள் ${m[1]}/${m[2]} · இந்த மாத ஆர்டர்கள் ${m[3]}/${m[4]}`],
    [/^(.+) · Website order$/, (m) => `${m[1]} · இணையதள ஆர்டர்`],
    [/^(.+) · WhatsApp order$/, (m) => `${m[1]} · வாட்ஸ்அப் ஆர்டர்`],
    [/^Delete (.+)\? This cannot be undone\.$/, (m) => `${m[1]} நீக்கவா? இதைத் திரும்பப் பெற முடியாது.`],
    [/^Send a request to the marketplace team to start (.+)\? You are not charged by the website\.$/, (m) => `${m[1]} திட்டத்தைத் தொடங்க இணையதளக் குழுவுக்குக் கோரிக்கை அனுப்பவா? இணையதளம் உங்களிடம் பணம் எடுக்காது.`],
    [/^Payment failed: (.+)$/, (m) => `பணம் செலுத்தல் தோல்வி: ${m[1]}`],
    [/^Payment received by Razorpay \((.+)\)\. The team will confirm it and activate it\.$/, (m) => `Razorpay மூலம் பணம் பெறப்பட்டது (${m[1]}). குழு உறுதிசெய்து இயக்கும்.`],
    [/^Photo upload failed: (.+)$/, (m) => `படம் பதிவேற்றம் தோல்வி: ${m[1]}`],
    [/^Your shop was not approved(.*)\. Fix your details in Shop settings or contact support\.$/, (m) => `உங்கள் கடை ஏற்கப்படவில்லை${m[1]}. கடை அமைப்புகளில் விவரங்களைத் திருத்தவும் அல்லது உதவியைத் தொடர்பு கொள்ளவும்.`],
    [/^Your shop is suspended and hidden from customers(.*)\. Please contact support\.$/, (m) => `உங்கள் கடை இடைநிறுத்தப்பட்டு வாடிக்கையாளர்களுக்குத் தெரியாது${m[1]}. உதவியைத் தொடர்பு கொள்ளவும்.`],
    [/^🚫 You have used all (\d+) (products|orders this month) on the (.+) plan\.$/, (m) => `🚫 ${m[3]} திட்டத்தில் உங்கள் ${m[2] === 'products' ? 'பொருட்கள்' : 'இந்த மாத ஆர்டர்கள்'} ${m[1]} முழுவதும் பயன்படுத்திவிட்டீர்கள்.`],
    [/^⚠️ (\d+) of (\d+) (products|orders this month) used on the (.+) plan\.$/, (m) => `⚠️ ${m[4]} திட்டத்தில் ${m[2]}-இல் ${m[1]} ${m[3] === 'products' ? 'பொருட்கள்' : 'இந்த மாத ஆர்டர்கள்'} பயன்படுத்தப்பட்டன.`],
    [/^Customers cannot place new orders in your shop until next month or until you upgrade\.$/, () => 'அடுத்த மாதம் வரை அல்லது நீங்கள் திட்டத்தை உயர்த்தும் வரை வாடிக்கையாளர்கள் புதிய ஆர்டர் செய்ய முடியாது.']
  ]
};
const OWN_SUB = { ta: [['(8+ characters)', '(8+ எழுத்துகள்)'], ['(₹, 0 = free)', '(₹, 0 = இலவசம்)'], ['(₹, 0 = none)', '(₹, 0 = இல்லை)'], ['(e.g. Within 1 hour)', '(எ.கா. 1 மணி நேரத்துக்குள்)'], ['(e.g. within 5 km)', '(எ.கா. 5 கி.மீ.க்குள்)'], ['products (', 'பொருட்கள் (']] };
function ownTr(s) {
  const lang = S.lang, T = OWN[lang]; if (!T || typeof s !== 'string') return s;
  const k = s.replace(/\s+/g, ' ').trim(); if (!k) return s;
  let r = Object.prototype.hasOwnProperty.call(T, k) ? T[k] : null;
  if (r === null) for (const [rx, fn] of (OWN_RX[lang] || [])) { const m = k.match(rx); if (m) { r = fn(m); break; } }
  if (r === null) { let o = s; for (const [f, g] of (OWN_SUB[lang] || [])) if (o.includes(f)) o = o.split(f).join(g); return o; }
  const lead = s.match(/^\s*/)[0], trail = s.match(/\s*$/)[0]; return lead + r + trail;
}
function ownScope() { return /^#\/(dashboard|register|login|reset)/.test(location.hash) && !ADMIN_ONLY; }
function ownApply(root) {
  if (!OWN[S.lang] || !ownScope() || !root) return;
  const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); let n; const list = [];
  while ((n = w.nextNode())) list.push(n);
  list.forEach(x => { const v = ownTr(x.nodeValue); if (v !== x.nodeValue) x.nodeValue = v; });
  root.querySelectorAll('[placeholder],[aria-label],[title]').forEach(e => ['placeholder', 'aria-label', 'title'].forEach(a => { const v = e.getAttribute(a); if (v) { const r = ownTr(v); if (r !== v) e.setAttribute(a, r); } }));
}
const confirmT = m => confirm(ownScope() ? ownTr(m) : m);

function view(content, meta = {}) {
  appEl().innerHTML = content instanceof Raw ? content.s : String(content);
  ownApply(appEl());
  setMeta(meta.title, meta.desc, meta.noindex);
  document.documentElement.lang = S.lang;
}
const spinner = () => '<div class="spinner" role="status" aria-label="Loading"></div>';
const emptyBox = (msg, extra = '') => html`<div class="empty">${msg}${raw(extra)}</div>`;

function cartGet() { const c = ls.get('nk_cart', null); return c && c.items ? c : { shopId: null, items: {} }; }
function cartSet(c) { ls.set('nk_cart', c); renderChrome(); }
const cartCount = () => Object.values(cartGet().items).reduce((a, b) => a + b, 0);

function renderChrome() {
  const u = S.user, admin = S.profile && S.profile.role === 'admin';
  if (ADMIN_ONLY) {
    $('#top').innerHTML = html`<a class="brand" href="#/admin">🔑 ${siteName()} — Admin</a><nav class="nav" aria-label="Main">${u ? html`<button class="linkbtn" data-act="logout" type="button">${t('logout')}</button>` : ''}</nav>`.s;
    $('#placebar').innerHTML = ''; $('#stickycart').innerHTML = ''; $('#foot').innerHTML = '';
    return;
  }
  const n = cartCount();
  document.body.classList.toggle('appmode', S.app);
  const installBtn = isStandalone() ? '' : html`<button class="linkbtn modebtn" data-act="install" type="button">⬇ ${S.lang === 'ml' ? 'ഇൻസ്റ്റാൾ' : 'Install'}</button>`;
  const toggleBtn = html`${installBtn}<button class="linkbtn modebtn" data-act="appmode" type="button">${S.app ? '🌐 ' + (S.lang === 'ml' ? 'വെബ്സൈറ്റ്' : 'Website') : '📱 ' + (S.lang === 'ml' ? 'ആപ്പ് മോഡ്' : 'App mode')}</button>`;
  const langBox = langSelect();
  const hashNow = location.hash || '#/'; const pth = hashNow.slice(1).split('?')[0];
  const tab = /^\/(shops|category|s\/)/.test(pth) ? 'shops' : /^\/search/.test(pth) ? 'search' : /^\/(cart|checkout)/.test(pth) ? 'cart' : /^\/(login|register|dashboard|reset)/.test(pth) ? 'acct' : (pth === '/' ? 'home' : '');
  let tb = document.getElementById('tabbar'); if (!tb) { tb = document.createElement('nav'); tb.id = 'tabbar'; tb.className = 'tabbar'; tb.setAttribute('aria-label', 'App menu'); document.body.appendChild(tb); }
  const tabItem = (id, href, ico, label, extra) => html`<a class="${tab === id ? 'on' : ''}" href="${href}"><span class="i" aria-hidden="true">${ico}</span>${label}${extra || ''}</a>`;
  tb.innerHTML = S.app ? html`${tabItem('home', '#/', '🏠', t('home'))}${tabItem('shops', '#/shops', '🏪', t('shops'))}${tabItem('search', '#/search', '🔍', t('search'))}${tabItem('cart', '#/cart', '🛒', t('cart'), n ? html`<span class="badge">${n}</span>` : '')}${tabItem('acct', u ? (admin ? '#/' : '#/dashboard') : '#/login', '👤', S.lang === 'ml' ? 'അക്കൗണ്ട്' : 'Account')}`.s : '';
  if (S.app) {
    $('#top').innerHTML = html`<a class="brand" href="#/">🛍️ ${siteName()}</a><nav class="nav" aria-label="Main">${toggleBtn}${u ? html`<button class="linkbtn" data-act="logout" type="button">${t('logout')}</button>` : ''}${langBox}</nav>`.s;
    $('#placebar').innerHTML = S.place && !/^#\/(dashboard|admin)/.test(hashNow) ? html`<div class="placebar"><div class="wrap row between"><span>📍 ${t('showing_for')} <b>${S.place}</b></span><button class="btn ghost small" data-act="clearplace" type="button">${t('clear')}</button></div></div>`.s : '';
    $('#foot').innerHTML = ''; $('#stickycart').innerHTML = '';
    return;
  }
  $('#top').innerHTML = html`
    <a class="brand" href="#/">🛍️ ${siteName()}</a>
    <nav class="nav" aria-label="Main">
      <a href="#/shops">${t('shops')}</a>
      ${u ? (admin ? '' : html`<a href="#/dashboard">${t('my_shop')}</a>`)
          : html`<a href="#/register">${t('register_shop')}</a><a href="#/login">${t('login')}</a>`}
      ${u ? html`<button class="linkbtn" data-act="logout" type="button">${t('logout')}</button>` : ''}
      ${toggleBtn}
      <a class="cartlink" href="#/cart">🛒 ${t('cart')}${n ? html`<span class="badge">${n}</span>` : ''}</a>
      ${langSelect()}
    </nav>`.s;
  const hash = location.hash || '#/';
  $('#placebar').innerHTML = (S.place && !/^#\/(dashboard|admin)/.test(hash)) ? html`
    <div class="placebar"><div class="wrap row between"><span>📍 ${t('showing_for')} <b>${S.place}</b></span>
    <button class="btn ghost small" data-act="clearplace" type="button">${t('clear')}</button></div></div>`.s : '';
  $('#foot').innerHTML = html`
    <div><h3>${siteName()}</h3><p>${t('footer_note')}</p></div>
    <div><h3>${t('shops')}</h3><p><a href="#/shops">${t('shops')}</a><br><a href="#/register">${t('register_shop')}</a><br><a href="#/pricing">${t('pricing')}</a><br><a href="#/track">${t('track_order')}</a></p></div>
    <div><h3>${t('support')}</h3><p><a href="#/contact">${t('contact')}</a><br><a href="#/privacy">${t('privacy')}</a><br><a href="#/terms">${t('terms')}</a><br><a href="#/refund-policy">${t('refund')}</a></p></div>`.s;
  $('#stickycart').innerHTML = (n && !/^#\/(cart|checkout|dashboard|admin)/.test(hash)) ? html`<div class="sticky-cart"><a class="btn gold" href="#/cart">🛒 ${t('cart')} (${n})</a></div>`.s : '';
}

/* ---------- reusable components ---------- */
function productCard(p) {
  const sh = p.shops || {}, cat = p.categories || catById(p.category_id) || {};
  const disc = p.discount_price && p.discount_price < p.price; const img = imgUrl(p.image);
  return html`<article class="card">
    <a class="thumb" href="#/p/${p.id}" aria-label="${pname(p)}">
      ${img ? html`<img src="${img}" alt="${pname(p)}" loading="lazy" width="400" height="400">` : html`<span aria-hidden="true">${cat.icon || '🛍️'}</span>`}
      ${disc ? html`<span class="off">${100 - Math.floor(p.discount_price * 100 / p.price)}% OFF</span>` : ''}
      ${!p.in_stock ? html`<span class="soldout">${t('out_of_stock')}</span>` : ''}
    </a>
    <div class="body">
      <a class="title" href="#/p/${p.id}">${pname(p)}</a>
      ${p.unit ? html`<span class="muted small">${p.unit}</span>` : ''}
      <div class="price">${inr(effPrice(p))}${disc ? html`<s>${inr(p.price)}</s>` : ''}</div>
      ${sh.name ? html`<a class="small muted" href="#/s/${enc(sh.slug)}">🏪 ${sh.name}${sh.town ? ', ' + sh.town : ''}</a>` : ''}
      ${p.in_stock ? html`<button class="btn small block" style="margin-top:auto" type="button" data-act="add" data-id="${p.id}" data-shop="${p.shop_id}" data-stock="${p.stock_qty ?? ''}">＋ ${t('add_to_cart')}</button>` : ''}
    </div></article>`;
}
function shopCard(s) {
  const cat = s.categories || catById(s.category_id) || {}; const logo = imgUrl(s.logo);
  return html`<article class="card shopcard">
    <a class="logo" href="#/s/${enc(s.slug)}">${logo ? html`<img src="${logo}" alt="" loading="lazy" width="72" height="72">` : html`<span aria-hidden="true">${cat.icon || '🏪'}</span>`}</a>
    <div class="grow">
      <a class="title" href="#/s/${enc(s.slug)}"><b>${s.name}</b></a>
      <div class="muted small">📍 ${s.locality ? s.locality + ', ' : ''}${s.town} · ${s.pincode}</div>
      <div>
        ${isFeatured(s) ? html`<span class="tag gold">★ Featured</span>` : ''}
        ${cat.name_en ? html`<span class="tag">${cname(cat)}</span>` : ''}
        ${!s.accepting_orders ? html`<span class="tag grey">${t('not_accepting')}</span>` : isOpenNow(s) ? html`<span class="tag">${t('open_now')}</span>` : html`<span class="tag grey">${t('closed_now')}</span>`}
        ${s.delivery_available ? html`<span class="tag">🛵 ${t('delivery')}</span>` : ''}
        ${s.pickup_available ? html`<span class="tag">🏬 ${t('pickup')}</span>` : ''}
      </div></div></article>`;
}
async function loadAds() {
  try { const today = todayIST(); const r = await sb.from('ads').select('*, shops(name,slug,town)').eq('status', 'approved').lte('starts_on', today).gte('ends_on', today).order('id', { ascending: false }).limit(20); return r.error ? [] : (r.data || []).filter(a => a.shops); } catch (e) { return []; }
}
function adBanner(a) {
  const img = imgUrl(a.image); const href = a.product_id ? `#/p/${a.product_id}` : `#/s/${enc(a.shops.slug)}`;
  return html`<a class="adbanner" href="${href}" aria-label="${adLabel()}: ${a.title}"><span class="adtag">${adLabel()}</span>${img ? html`<img src="${img}" alt="" loading="lazy" width="320" height="160">` : ''}
    <span class="adtext"><b>${a.title}</b>${a.body ? html`<span>${a.body}</span>` : ''}<small>🏪 ${a.shops.name}${a.shops.town ? ', ' + a.shops.town : ''}</small></span></a>`;
}
function gridWithAds(products, ads, every = 6) {
  const out = []; let k = 0;
  products.forEach((p, i) => { out.push(productCard(p)); if (ads.length && (i + 1) % every === 0 && i + 1 < products.length) out.push(adBanner(ads[k++ % ads.length])); });
  if (ads.length && products.length && products.length < every) out.push(adBanner(ads[0]));
  return html`<div class="cards">${out}</div>`;
}
const statusBadge = s => html`<span class="status st-${s}">${t('s_' + s)}</span>`;
function pager(page, pages, base) {
  if (pages <= 1) return '';
  const sep = base.includes('?') ? '&' : '?';
  return html`<div class="pager">${page > 1 ? html`<a class="btn ghost small" href="${base}${sep}page=${page - 1}">←</a>` : ''}<span class="muted" style="align-self:center">${page} / ${pages}</span>${page < pages ? html`<a class="btn ghost small" href="${base}${sep}page=${page + 1}">→</a>` : ''}</div>`;
}
const pageNum = q => Math.max(1, Math.min(1000, parseInt(q.get('page') || '1', 10) || 1));
const range = (page, per = PER_PAGE) => [(page - 1) * per, page * per - 1];
const field = (label, name, value = '', attrs = '') => html`<label for="f_${name}">${label}</label><input id="f_${name}" name="${name}" value="${value}" ${raw(attrs)}>`;
const checkbox = (label, name, on) => html`<label class="check"><input type="checkbox" name="${name}" value="1" ${on ? raw('checked') : ''}> <span>${label}</span></label>`;
const needsSetup = () => html`<div class="setup-card"><h1>One-time setup needed</h1>
  <p><b>Problem found:</b> ${!window.supabase ? 'the Supabase library could not be loaded (check your internet / ad-blocker, and that index.html still has the supabase-js <script> line).' : !urlOk() ? 'SUPABASE_URL in app.js is still the placeholder or looks wrong. It must look like https://abcdxyz.supabase.co' : 'SUPABASE_ANON_KEY in app.js is still the placeholder or too short.'}</p>
  <p>Open <code>app.js</code> and put your Supabase <b>Project URL</b> and <b>anon public key</b> at the top (<code>CONFIG</code>), save it on GitHub, wait a minute and refresh. Then run <code>supabase.sql</code> in the Supabase SQL Editor. See README.md.</p></div>`;

/* ---------- queries ---------- */
const SHOP_SEL = '*, categories(name_en,name_ml,icon,slug)';
const PROD_SEL = '*, shops!inner(name,slug,town,locality,pincode,status,accepting_orders,whatsapp), categories(name_en,name_ml,icon,slug)';
function placeOr(pl) {
  const p = filterTerm(pl); if (!p) return null;
  return `town.ilike."${p}",locality.ilike."${p}",district.ilike."${p}"` + (/^\d{6}$/.test(p) ? `,pincode.eq.${p}` : '');
}
function shopsQ(opts = {}) {
  let q = sb.from('shops').select(SHOP_SEL, opts.count ? { count: 'exact' } : undefined).eq('status', 'approved');
  const po = opts.everywhere ? null : placeOr(S.place); if (po) q = q.or(po);
  if (opts.catId) q = q.eq('category_id', opts.catId);
  return q;
}
async function placeShopIds() {
  const po = placeOr(S.place); if (!po) return null;
  const rows = must(await sb.from('shops').select('id').eq('status', 'approved').or(po).limit(1000));
  return rows.map(r => r.id);
}
function productsQ(ids, count) {
  let q = sb.from('products').select(PROD_SEL, count ? { count: 'exact' } : undefined).eq('active', true).eq('blocked', false).eq('shops.status', 'approved');
  if (ids) q = q.in('shop_id', ids.length ? ids : [0]);
  return q;
}
const sortFeatured = list => list.slice().sort((a, b) => Number(isFeatured(b)) - Number(isFeatured(a)));

/* =====================================================================
   PUBLIC PAGES
   ===================================================================== */
const routes = [];
const route = (pattern, fn) => routes.push([new RegExp('^' + pattern + '$'), fn]);

route('/', async () => {
  const ids = await placeShopIds();
  const [ads, shops, fresh, prods] = await Promise.all([
    loadAds(),
    shopsQ().order('featured_until', { ascending: false, nullsFirst: false }).limit(12),
    shopsQ().order('approved_at', { ascending: false }).limit(6),
    productsQ(ids).order('id', { ascending: false }).limit(60),
  ]);
  const shopList = sortFeatured(must(shops)); const featured = shopList.filter(isFeatured).length ? shopList.filter(isFeatured).slice(0, 8) : shopList.slice(0, 4);
  const products = must(prods);
  const offers = products.filter(p => p.discount_price && p.discount_price < p.price).sort((a, b) => (b.price - b.discount_price) / b.price - (a.price - a.discount_price) / a.price).slice(0, 8);
  view(html`
  <section class="hero"><div class="wrap">
    <h1>${t('hero_title')}</h1><p>${t('hero_sub')}</p>
    <form class="searchbar" data-form="search" role="search">
      <input type="search" name="q" placeholder="${t('search_ph')}" aria-label="${t('search')}" maxlength="80">
      <button class="btn gold" type="submit">🔍 ${t('search')}</button>
    </form>
    <form class="placebox" data-form="place">
      <input type="text" name="place" value="${S.place}" list="place-list" placeholder="📍 ${t('town_ph')} / ${t('pin_ph')}" aria-label="${t('your_place')}" maxlength="60">
      <datalist id="place-list">${Object.keys(STATES).map(d => html`<option value="${d}">`)}</datalist>
      <button class="btn ghost" type="submit">${t('set_place')}</button>
    </form>
  </div></section>
  <section class="block"><div class="wrap"><h2>${t('categories')}</h2>
    <div class="cats">${S.cats.map(c => html`<a class="cat" href="#/category/${enc(c.slug)}"><span class="ico" aria-hidden="true">${c.icon}</span>${cname(c)}</a>`)}</div></div></section>
  <section class="block"><div class="wrap">
    <div class="section-head"><h2>${t('featured_shops')}</h2><a href="#/shops">${t('view_all')} →</a></div>
    ${featured.length ? html`<div class="shopcards">${featured.map(shopCard)}</div>` : emptyBox(t('no_shops_yet'), `<br><br><a class="btn" href="#/register">${esc(t('register_shop'))}</a>`)}
  </div></section>
  ${offers.length ? html`<section class="block"><div class="wrap"><h2>🏷️ ${t('offers')}</h2><div class="cards">${offers.map(productCard)}</div></div></section>` : ''}
  ${products.length ? html`<section class="block"><div class="wrap"><h2>${t('popular_products')}</h2>${gridWithAds(products.slice(0, 30), ads)}</div></section>` : ''}
  ${must(fresh).length ? html`<section class="block"><div class="wrap"><h2>🆕 ${t('new_shops')}</h2><div class="shopcards">${must(fresh).map(shopCard)}</div></div></section>` : ''}
  <section class="block"><div class="wrap"><div class="panel center"><h2>${t('register_shop')}</h2>
    <p>Free starter plan. Your own shop page, WhatsApp orders, and local delivery or pickup — no technical knowledge needed.</p>
    <a class="btn gold" href="#/register">${t('register_shop')}</a> <a class="btn ghost" href="#/pricing">${t('pricing')}</a></div></div></section>`,
    { title: `${siteName()} — shop from local stores in Kerala`, desc: 'Find nearby shops in your Kerala town, browse their products and order on WhatsApp or the website.' });
});

route('/shops', async (_m, q) => {
  const everywhere = q.get('all') === '1'; const slug = q.get('category') || ''; const cat = S.cats.find(c => c.slug === slug); const page = pageNum(q);
  const [a, b] = range(page);
  const res = await shopsQ({ count: true, everywhere, catId: cat && cat.id }).order('featured_until', { ascending: false, nullsFirst: false }).order('name').range(a, b);
  const shops = sortFeatured(must(res)); const pages = Math.ceil((res.count || 0) / PER_PAGE);
  const base = '#/shops?' + (cat ? 'category=' + enc(cat.slug) : '') + (everywhere ? '&all=1' : '');
  view(html`
  <div class="subnav"><div class="wrap"><a class="${!cat ? 'on' : ''}" href="#/shops${everywhere ? '?all=1' : ''}">${t('all')}</a>
    ${S.cats.map(c => html`<a class="${cat && cat.id === c.id ? 'on' : ''}" href="#/shops?category=${enc(c.slug)}${everywhere ? '&all=1' : ''}">${c.icon} ${cname(c)}</a>`)}</div></div>
  <div class="wrap" style="padding:20px 16px"><div class="row between"><h1>${t('shops')}${cat ? ' — ' + cname(cat) : ''}</h1>
    ${S.place && !everywhere ? html`<a class="small" href="#/shops?all=1${cat ? '&category=' + enc(cat.slug) : ''}">Show shops from everywhere</a>` : ''}</div>
    ${shops.length ? html`<div class="shopcards">${shops.map(shopCard)}</div>${pager(page, pages, base)}` : emptyBox(t('no_shops_yet'), `<br><br><a class="btn" href="#/register">${esc(t('register_shop'))}</a>`)}</div>`,
    { title: `Shops${cat ? ' — ' + cat.name_en : ''} | ${siteName()}`, desc: 'Local shops in Kerala on ' + siteName() });
});

route('/category/([^/]+)', async ([slug], q) => {
  const cat = S.cats.find(c => c.slug === slug); if (!cat) return notFound();
  const page = pageNum(q); const [a, b] = range(page); const ids = await placeShopIds();
  const [ads, sres, pres] = await Promise.all([
    loadAds(),
    shopsQ({ catId: cat.id }).order('featured_until', { ascending: false, nullsFirst: false }).order('name').limit(12),
    productsQ(ids, true).eq('category_id', cat.id).order('id', { ascending: false }).range(a, b),
  ]);
  const products = must(pres);
  view(html`<div class="wrap" style="padding:20px 16px"><h1>${cat.icon} ${cname(cat)}</h1>
    ${must(sres).length ? html`<h2>${t('shops')}</h2><div class="shopcards mb">${sortFeatured(must(sres)).map(shopCard)}</div>` : ''}
    <h2>${t('products')}</h2>
    ${products.length ? html`${gridWithAds(products, ads)}${pager(page, Math.ceil((pres.count || 0) / PER_PAGE), '#/category/' + enc(cat.slug))}` : emptyBox(t('no_products_yet'))}</div>`,
    { title: `${cat.name_en} in your town | ${siteName()}`, desc: `Buy ${cat.name_en.toLowerCase()} from local shops in Kerala.` });
});

route('/search', async (_m, q) => {
  const term = filterTerm(q.get('q') || ''); let everywhere = q.get('all') === '1'; let shops = [], products = [];
  if (term) {
    const like = `"%${term}%"`;
    const run = async every => {
      const ids = every ? null : await placeShopIds();
      const sq = sb.from('shops').select(SHOP_SEL).eq('status', 'approved')
        .or(['name', 'description', 'town', 'locality', 'district', 'pincode'].map(f => `${f}.ilike.${like}`).join(',')).limit(30);
      const sqPlace = !every && placeOr(S.place) ? sq.or(placeOr(S.place)) : sq;
      const pq = productsQ(ids).or(['name', 'name_ml', 'description'].map(f => `${f}.ilike.${like}`).join(',')).order('id', { ascending: false }).limit(48);
      const [s, p] = await Promise.all([sqPlace, pq]); return [must(s), must(p)];
    };
    [shops, products] = await run(everywhere);
    if (!shops.length && !products.length && !everywhere && S.place) { everywhere = true; [shops, products] = await run(true); }
  }
  view(html`<div class="wrap" style="padding:20px 16px">
    <form class="searchbar" style="box-shadow:var(--shadow);border:1px solid var(--line)" data-form="search" role="search">
      <input type="search" name="q" value="${term}" placeholder="${t('search_ph')}" aria-label="${t('search')}" maxlength="80"><button class="btn" type="submit">🔍 ${t('search')}</button></form>
    ${term ? html`
      ${S.place && !everywhere ? html`<p class="small muted" style="margin-top:12px">📍 ${S.place} · <a href="#/search?q=${enc(term)}&all=1">Search everywhere</a></p>` : ''}
      ${shops.length ? html`<h2 style="margin-top:18px">${t('shops')}</h2><div class="shopcards">${shops.map(shopCard)}</div>` : ''}
      ${products.length ? html`<h2 style="margin-top:18px">${t('products')}</h2><div class="cards">${products.map(productCard)}</div>` : ''}
      ${!shops.length && !products.length ? html`<div style="margin-top:18px">${emptyBox(t('no_results'))}</div>` : ''}` : ''}</div>`,
    { title: `Search | ${siteName()}`, desc: 'Search products and shops near you.', noindex: true });
});

route('/s/([^/]+)', async ([slug], q) => {
  const shop = must(await sb.from('shops').select(SHOP_SEL).eq('slug', slug).maybeSingle()); if (!shop) return notFound();
  const catSlug = q.get('category') || ''; const secName = q.get('section') || '';
  const prods = must(await sb.from('products').select('*, categories(name_en,name_ml,icon,slug)').eq('shop_id', shop.id).eq('active', true).eq('blocked', false).order('in_stock', { ascending: false }).order('id', { ascending: false }));
  const cats = []; prods.forEach(p => { if (p.categories && !cats.find(c => c.slug === p.categories.slug)) cats.push(p.categories); });
  const secs = [...new Set(prods.map(p => p.section).filter(Boolean))].sort((x, y) => x.localeCompare(y));
  const shown = secName ? prods.filter(p => p.section === secName) : catSlug ? prods.filter(p => p.categories && p.categories.slug === catSlug) : prods;
  const grouped = secs.length && !secName && !catSlug;
  const sectionsHtml = () => html`${secs.map(sn => html`<h3 class="sechead" id="sec-${enc(sn)}">${sn}</h3><div class="cards">${prods.filter(p => p.section === sn).map(p => productCard(Object.assign({}, p, { shops: shop })))}</div>`)}${prods.some(p => !p.section) ? html`<h3 class="sechead">${t('products')}</h3><div class="cards">${prods.filter(p => !p.section).map(p => productCard(Object.assign({}, p, { shops: shop })))}</div>` : ''}`;
  const cat = shop.categories || {}; const hrs = shopHours(shop); const today = istNow().day; const logo = imgUrl(shop.logo);
  const msg = `Hello ${shop.name}, I found your shop on ${siteName()}.`;
  view(html`
  ${shop.status !== 'approved' ? html`<div class="wrap"><div class="notice">This page is only visible to you because the shop is <b>${shop.status}</b>${shop.status_note ? ': ' + shop.status_note : ''}. Customers cannot see it yet.</div></div>` : ''}
  <section class="shophead"><div class="wrap">
    <div class="row" style="align-items:flex-start;flex-wrap:nowrap">
      <div class="shopcard" style="padding:0;border:0;box-shadow:none;width:90px;height:90px;border-radius:18px;background:linear-gradient(135deg,var(--green-l),var(--gold-l));align-items:center;justify-content:center;font-size:2.6rem;flex:none;overflow:hidden;display:flex">
        ${logo ? html`<img src="${logo}" alt="" width="90" height="90" style="width:100%;height:100%;object-fit:cover">` : (cat.icon || '🏪')}</div>
      <div class="grow"><h1 style="margin-bottom:4px">${shop.name}</h1>
        <div class="muted">📍 ${shop.locality ? shop.locality + ', ' : ''}${shop.town}${shop.district ? ', ' + shop.district : ''}${shop.state ? ', ' + shop.state : ''} · ${shop.pincode}</div>
        <div style="margin-top:8px">${isFeatured(shop) ? html`<span class="tag gold">★ Featured</span>` : ''}${cat.name_en ? html`<span class="tag">${cname(cat)}</span>` : ''}
          ${!shop.accepting_orders ? html`<span class="tag grey">${t('not_accepting')}</span>` : isOpenNow(shop) ? html`<span class="tag">${t('open_now')}</span>` : html`<span class="tag grey">${t('closed_now')}</span>`}</div></div>
    </div>
    ${shop.description ? html`<p style="margin-top:14px">${shop.description}</p>` : ''}
    <div class="row" style="margin-top:12px">
      <a class="btn wa" rel="noopener" target="_blank" href="${waLink(shop.whatsapp, msg)}">💬 ${t('whatsapp_shop')}</a>
      <a class="btn ghost" href="tel:+91${shop.whatsapp}">📞 ${t('call_shop')}</a>
      ${isHttps(shop.map_link) ? html`<a class="btn ghost" rel="noopener" target="_blank" href="${shop.map_link}">🗺️ ${t('map')}</a>` : ''}</div>
    ${shop.status === 'approved' ? sharePanel(shop, true) : ''}
    <div class="facts">
      <div class="fact"><b>${t('delivery')}:</b> ${shop.delivery_available ? html`✅ ${t('delivery_fee')}: ${shop.delivery_fee ? inr(shop.delivery_fee) : t('free')}${shop.est_delivery ? ' · ' + shop.est_delivery : ''}${shop.delivery_area ? html`<br><span class="small muted">${shop.delivery_area}</span>` : ''}` : '—'}</div>
      <div class="fact"><b>${t('pickup')}:</b> ${shop.pickup_available ? '✅' : '—'}${shop.min_order ? ' · ' + t('min_order') + ': ' + inr(shop.min_order) : ''}</div>
      <div class="fact"><b>${t('address')}:</b> ${shop.address}</div>
      <div class="fact"><b>${t('opening_hours')}</b><table class="hours-table">${DAYS.map(d => html`<tr class="${d === today ? 'today' : ''}"><td>${DAY_NAMES[d]}</td><td class="right">${hrs[d].closed ? 'Closed' : hrs[d].open + ' – ' + hrs[d].close}</td></tr>`)}</table></div>
    </div></div></section>
  <section class="block"><div class="wrap">
    ${secs.length ? html`<div class="row gap-s mb catchips"><a class="tag ${secName ? '' : 'gold'}" href="#/s/${enc(shop.slug)}">${t('all')}</a>${secs.map(sn => html`<a class="tag ${secName === sn ? 'gold' : ''}" href="#/s/${enc(shop.slug)}?section=${enc(sn)}">${sn}</a>`)}</div>`
      : cats.length > 1 ? html`<div class="row gap-s mb catchips"><a class="tag ${catSlug ? '' : 'gold'}" href="#/s/${enc(shop.slug)}">${t('all')}</a>${cats.map(c => html`<a class="tag ${catSlug === c.slug ? 'gold' : ''}" href="#/s/${enc(shop.slug)}?category=${enc(c.slug)}">${c.icon} ${cname(c)}</a>`)}</div>` : ''}
    ${grouped ? sectionsHtml() : html`<h2>${secName || t('products')}</h2>
    ${shown.length ? html`<div class="cards">${shown.map(p => productCard(Object.assign({}, p, { shops: shop })))}</div>` : emptyBox(t('no_products_yet'))}`}</div></section>`,
    { title: `${shop.name} — ${shop.town} | ${siteName()}`, desc: (shop.description || `${shop.name} — ${cat.name_en || 'local shop'} in ${shop.town}, Kerala. Order on WhatsApp or the website.`).slice(0, 155), noindex: shop.status !== 'approved' });
});

route('/p/(\\d+)', async ([id]) => {
  const p = must(await sb.from('products').select('*, shops(*), categories(name_en,name_ml,icon,slug)').eq('id', id).maybeSingle());
  if (!p || !p.shops || p.blocked || !p.active || p.shops.status !== 'approved') return notFound();
  const shop = p.shops; const more = must(await sb.from('products').select(PROD_SEL).eq('shop_id', shop.id).eq('active', true).eq('blocked', false).neq('id', p.id).order('id', { ascending: false }).limit(6));
  const disc = p.discount_price && p.discount_price < p.price; const img = pimgs(p)[0]; const cat = p.categories || {};
  const msg = `Hello, I am interested in ${p.name} (${inr(effPrice(p))}) from ${shop.name} on ${siteName()}.`;
  view(html`<div class="wrap">
    <p class="small muted" style="margin-top:14px"><a href="#/">${t('home')}</a> › <a href="#/s/${enc(shop.slug)}">${shop.name}</a> › ${pname(p)}</p>
    <div class="pdp">
      <div><div class="bigimg">${img ? html`<img id="mainimg" src="${img}" alt="${pname(p)}" width="700" height="700" data-act="zoom" style="cursor:zoom-in">` : html`<span aria-hidden="true">${cat.icon || '🛍️'}</span>`}</div>
        ${pimgs(p).length > 1 ? html`<div class="thumbs">${pimgs(p).map((u, i) => html`<button class="thumbbtn" type="button" data-act="gal" data-src="${u}" aria-label="Photo ${i + 1}"><img src="${u}" alt="" width="64" height="64" loading="lazy"></button>`)}</div>` : ''}</div>
      <div><h1>${pname(p)}</h1>${p.name_ml && S.lang === 'en' ? html`<p class="muted">${p.name_ml}</p>` : (p.name_ml ? html`<p class="muted">${p.name}</p>` : '')}
        <div class="price" style="font-size:1.8rem">${inr(effPrice(p))}${disc ? html`<s>${inr(p.price)}</s> <span class="tag red">${100 - Math.floor(p.discount_price * 100 / p.price)}% OFF</span>` : ''}</div>
        ${p.unit ? html`<p class="muted">${p.unit}</p>` : ''}
        <p>${p.in_stock ? html`<span class="tag">✅ ${t('in_stock')}</span>` : html`<span class="tag red">${t('out_of_stock')}</span>`}</p>
        ${p.description ? html`<p style="white-space:pre-line">${p.description}</p>` : ''}
        ${p.in_stock && shop.accepting_orders ? html`<form class="row" data-form="addqty" data-id="${p.id}" data-shop="${p.shop_id}" data-stock="${p.stock_qty ?? ''}">
          <div class="qty"><label for="qty" style="margin:0">${t('qty')}</label><input id="qty" type="number" name="qty" value="1" min="1" max="${p.stock_qty ?? 99}"></div>
          <button class="btn gold" type="submit">🛒 ${t('add_to_cart')}</button></form>` : (!shop.accepting_orders ? html`<div class="notice">${t('not_accepting')}</div>` : '')}
        <div class="panel" style="margin-top:18px"><b>${t('sold_by')}: <a href="#/s/${enc(shop.slug)}">${shop.name}</a></b><br><span class="muted">📍 ${shop.town}${shop.locality ? ', ' + shop.locality : ''}</span>
          <div class="row" style="margin-top:10px"><a class="btn wa small" rel="noopener" target="_blank" href="${waLink(shop.whatsapp, msg)}">💬 ${t('whatsapp_shop')}</a><a class="btn ghost small" href="#/s/${enc(shop.slug)}">${t('view_shop')}</a></div></div>
      </div></div>
    ${more.length ? html`<h2>${t('products')} — ${shop.name}</h2><div class="cards">${more.map(productCard)}</div>` : ''}</div>`,
    { title: `${p.name} — ${inr(effPrice(p))} | ${shop.name}, ${shop.town}`, desc: (p.description || `Buy ${p.name} from ${shop.name} in ${shop.town}.`).slice(0, 155) });
});

/* ---------- cart & checkout ---------- */
async function cartLines() {
  const cart = cartGet(); const ids = Object.keys(cart.items);
  if (!ids.length) return { shop: null, lines: [], subtotal: 0 };
  const shop = must(await sb.from('shops').select('*').eq('id', cart.shopId).eq('status', 'approved').maybeSingle());
  if (!shop) { cartSet({ shopId: null, items: {} }); return { shop: null, lines: [], subtotal: 0 }; }
  const rows = must(await sb.from('products').select('*').eq('shop_id', shop.id).eq('active', true).eq('blocked', false).in('id', ids.map(Number)));
  const lines = []; let subtotal = 0; let changed = false; const items = {};
  ids.forEach(id => {
    const p = rows.find(r => String(r.id) === id); if (!p) { changed = true; return; }
    const limit = p.stock_qty ?? 99; const ok = p.in_stock && limit > 0;
    const qty = Math.max(1, Math.min(cart.items[id], Math.max(limit, 1), 99)); items[id] = qty;
    const total = effPrice(p) * qty; lines.push({ p, qty, total, ok }); if (ok) subtotal += total;
  });
  if (changed) cartSet({ shopId: shop.id, items });
  return { shop, lines, subtotal };
}

route('/cart', async () => {
  const { shop, lines, subtotal } = await cartLines();
  view(html`<div class="wrap" style="padding:20px 16px"><h1>🛒 ${t('cart')}</h1>
  ${!lines.length ? html`<div class="empty">${t('cart_empty')}<br><br><a class="btn" href="#/shops">${t('shops')}</a></div>` : html`
    <p class="muted">${t('sold_by')} <a href="#/s/${enc(shop.slug)}"><b>${shop.name}</b></a></p>
    <form data-form="cartupdate"><div class="tablewrap"><table class="t">
      <tr><th></th><th>${t('products')}</th><th>${t('qty')}</th><th class="right">${t('total')}</th><th></th></tr>
      ${lines.map(l => html`<tr><td>${imgUrl(l.p.image) ? html`<img class="thumb-s" src="${imgUrl(l.p.image)}" alt="" width="44" height="44">` : html`<span class="thumb-s">🛍️</span>`}</td>
        <td><a href="#/p/${l.p.id}"><b>${pname(l.p)}</b></a><br><span class="muted small">${inr(effPrice(l.p))}${l.p.unit ? ' · ' + l.p.unit : ''}</span>${!l.ok ? html`<br><span class="tag red">${t('out_of_stock')}</span>` : ''}</td>
        <td><input type="number" name="qty_${l.p.id}" value="${l.qty}" min="0" max="${l.p.stock_qty ?? 99}" style="width:80px"></td>
        <td class="right"><b>${inr(l.total)}</b></td>
        <td><button class="btn danger small" type="button" data-act="cartremove" data-id="${l.p.id}">✕</button></td></tr>`)}
    </table></div>
    <div class="row between" style="margin-top:14px"><button class="btn ghost" type="submit">${t('update')}</button><div class="price" style="font-size:1.4rem">${t('subtotal')}: ${inr(subtotal)}</div></div></form>
    <div class="panel" style="margin-top:18px">
      ${shop.min_order ? html`<p>${t('min_order')}: <b>${inr(shop.min_order)}</b>${subtotal < shop.min_order ? html` <span class="tag red">+${inr(shop.min_order - subtotal)}</span>` : ''}</p>` : ''}
      ${shop.delivery_available ? html`<p>${t('delivery_fee')}: <b>${shop.delivery_fee ? inr(shop.delivery_fee) : t('free')}</b>${shop.est_delivery ? ' · ' + t('est_delivery') + ': ' + shop.est_delivery : ''}</p>` : ''}
      <p class="muted small">${t('no_online_payment')}</p><a class="btn gold block" href="#/checkout">${t('checkout')} →</a></div>
    <button class="btn danger small" style="margin-top:12px" type="button" data-act="cartclear">${t('remove')} ${t('all')}</button>`}</div>`,
    { title: `Cart | ${siteName()}`, noindex: true });
});

route('/checkout', async () => {
  const { shop, lines, subtotal } = await cartLines();
  if (!shop || !lines.length) { toast(t('cart_empty'), 'error'); location.hash = '#/cart'; return; }
  const problems = [];
  if (!shop.accepting_orders) problems.push('This shop is not taking orders right now.');
  if (lines.some(l => !l.ok)) problems.push('Some items in your cart are out of stock. Please remove them.');
  if (subtotal < shop.min_order) problems.push(`Minimum order for this shop is ${inr(shop.min_order)}.`);
  if (!shop.delivery_available && !shop.pickup_available) problems.push('This shop has not enabled delivery or pickup yet. Please contact the shop on WhatsApp.');
  const saved = ls.get('nk_customer', {}); const mode = shop.delivery_available ? 'delivery' : 'pickup';
  view(html`<div class="wrap" style="padding:20px 16px"><h1>${t('checkout')}</h1>
  ${problems.map(p => html`<div class="flash error">${p}</div>`)}
  <div class="panel"><h2>${shop.name}</h2>
    ${lines.map(l => html`<div class="row between"><span>${pname(l.p)} × ${l.qty}</span><b>${inr(l.total)}</b></div>`)}
    <hr style="border:0;border-top:1px solid var(--line)">
    <div class="row between"><span>${t('subtotal')}</span><b>${inr(subtotal)}</b></div>
    ${shop.delivery_available ? html`<div class="row between" id="feeline"><span>${t('delivery_fee')}</span><b>${shop.delivery_fee ? inr(shop.delivery_fee) : t('free')}</b></div>` : ''}
    <div class="row between price" style="font-size:1.3rem"><span>${t('total')}</span><span id="totalamt" data-sub="${subtotal}" data-fee="${shop.delivery_fee}">${inr(subtotal + (mode === 'delivery' ? shop.delivery_fee : 0))}</span></div>
    ${shop.est_delivery ? html`<p class="muted small">${t('est_delivery')}: ${shop.est_delivery}</p>` : ''}</div>
  <form class="panel" data-form="checkout" novalidate>
    <h2>${t('how_receive')}</h2>
    ${shop.delivery_available ? html`<label class="check"><input type="radio" name="fulfilment" value="delivery" ${mode === 'delivery' ? raw('checked') : ''}> 🛵 ${t('delivery')}</label>` : ''}
    ${shop.pickup_available ? html`<label class="check"><input type="radio" name="fulfilment" value="pickup" ${mode === 'pickup' ? raw('checked') : ''}> 🏬 ${t('pickup')} — ${shop.address}</label>` : ''}
    ${field(t('your_name'), 'name', saved.name || '', 'type="text" required maxlength="80" autocomplete="name"')}
    ${field(t('your_phone'), 'phone', saved.phone || '', 'type="tel" required inputmode="numeric" maxlength="15" autocomplete="tel" placeholder="98XXXXXXXX"')}
    <div id="addressbox"><label for="f_address">${t('delivery_address')}</label><textarea id="f_address" name="address" maxlength="400">${saved.address || ''}</textarea></div>
    <label for="f_notes">${t('order_notes')}</label><textarea id="f_notes" name="notes" maxlength="500" style="min-height:70px"></textarea>
    <p class="notice"><b>${t('payment')}:</b> ${t('cod')}. ${shop.upi_id ? 'This shop also accepts UPI — after you place the order you will see its UPI details. ' : ''}${t('no_online_payment')}</p>
    ${!problems.length ? html`<div class="row" style="margin-top:14px">
      <button class="btn gold grow" type="submit" name="channel" value="web">✅ ${t('place_order')}</button>
      <button class="btn wa grow" type="submit" name="channel" value="whatsapp">💬 ${t('order_whatsapp')}</button></div>
      <p class="hint">“${t('order_whatsapp')}”: your order is saved on ${siteName()} first, then you tap one button to send the order details to the shop on WhatsApp.</p>` : ''}</form></div>`,
    { title: `Checkout | ${siteName()}`, noindex: true });
  syncCheckout();
});
function syncCheckout() {
  const sel = $('input[name=fulfilment]:checked'); const box = $('#addressbox'); const tot = $('#totalamt'); if (!sel || !box) return;
  box.style.display = sel.value === 'delivery' ? '' : 'none';
  const fee = $('#feeline'); if (fee) fee.style.display = sel.value === 'delivery' ? '' : 'none';
  if (tot) tot.textContent = inr(Number(tot.dataset.sub) + (sel.value === 'delivery' ? Number(tot.dataset.fee) : 0));
}
document.addEventListener('change', e => { if (e.target.name === 'fulfilment') syncCheckout(); });

function upiPanel(o, shop) {
  if (!shop.upi_id || o.status === 'cancelled') return '';
  if (o.paid) return html`<div class="notice">✅ The shop has confirmed your payment. Thank you!</div>`;
  const link = `upi://pay?pa=${enc(shop.upi_id)}&pn=${enc(shop.name)}&am=${o.total}&cu=INR&tn=${enc('Order ' + o.code)}`;
  return html`<div class="panel" style="margin-top:12px"><h3>💳 Want to pay by UPI? (optional)</h3>
    <p class="small">You can pay <b>${inr(o.total)}</b> directly to the shop's UPI ID <b>${shop.upi_id}</b>. This money goes straight to the shop, not to ${siteName()}. You can still pay cash instead.</p>
    <p><a class="btn small" href="${link}">Open UPI app (phone)</a></p><div class="qr" data-qr="${link}" style="margin:6px 0"></div>
    ${o.pay_ref ? html`<p class="small">✅ You reported UPI reference <b>${o.pay_ref}</b>. The shop will confirm when the money arrives.</p>` : html`<form data-form="orderupi" data-code="${o.code}"><label class="small">After paying, enter the UPI reference / UTR number so the shop can match it</label>
    <input name="ref" required minlength="6" maxlength="40" autocomplete="off"><button class="btn small" style="margin-top:8px" type="submit">I have paid</button></form>`}</div>`;
}
route('/order/([A-Za-z0-9]+)', async ([code], q) => {
  const data = must(await sb.rpc('track_order', { p_code: code })); if (!data) return notFound();
  const { order: o, items, shop } = data; const placed = q.get('placed');
  const lines = [`New order ${o.code} — ${siteName()}`, `Shop: ${shop.name}`, ''];
  items.forEach(i => lines.push(`• ${i.name} × ${i.qty} = ₹${i.unit_price * i.qty}`));
  lines.push('', `Items: ₹${o.subtotal}`); if (o.fulfilment === 'delivery') lines.push(`Delivery fee: ₹${o.delivery_fee}`);
  lines.push(`Total: ₹${o.total} (pay shop directly)`, o.fulfilment === 'delivery' ? 'Delivery' : 'Store pickup', '', `Name: ${o.customer_name}`, `Phone: ${o.customer_phone}`);
  if (o.address) lines.push(`Address: ${o.address}`); if (o.notes) lines.push(`Notes: ${o.notes}`);
  view(html`<div class="wrap" style="padding:20px 16px;max-width:800px">
    ${placed ? html`<div class="flash ok">✅ ${t('order_placed')} ${o.channel === 'whatsapp' ? '— tap the green button below to send it to the shop on WhatsApp.' : `The shop can see your order now and will contact you on ${o.customer_phone}.`}</div>` : ''}
    <div class="panel"><div class="row between"><h1 style="margin:0">${t('order_code')}: ${o.code}</h1>${statusBadge(o.status)}</div>
      <p class="muted">${dt(o.created_at)} · <a href="#/s/${enc(shop.slug)}">${shop.name}</a></p>
      <p class="small muted">Save this number. This page refreshes every minute. Keep the link or order number to check your order status anytime.</p>
      <div class="row mb"><a class="btn wa" rel="noopener" target="_blank" href="${waLink(shop.whatsapp, lines.join('\n'))}">💬 Send this order to the shop on WhatsApp</a><a class="btn ghost" href="tel:+91${shop.whatsapp}">📞 ${t('call_shop')}</a></div>
      <div class="tablewrap"><table class="t">${items.map(i => html`<tr><td>${i.name} × ${i.qty}</td><td class="right">${inr(i.unit_price * i.qty)}</td></tr>`)}
        <tr><td>${t('subtotal')}</td><td class="right">${inr(o.subtotal)}</td></tr>
        ${o.fulfilment === 'delivery' ? html`<tr><td>${t('delivery_fee')}</td><td class="right">${inr(o.delivery_fee)}</td></tr>` : ''}
        <tr><td><b>${t('total')}</b></td><td class="right"><b>${inr(o.total)}</b></td></tr></table></div>
      <p style="margin-top:12px"><b>${t('payment')}:</b> ${t('cod')}<br><b>${t('how_receive')}</b> ${o.fulfilment === 'delivery' ? t('delivery') : t('pickup') + ' — ' + shop.address}<br>
        ${o.address ? html`<b>${t('delivery_address')}:</b> ${o.address}<br>` : ''}${o.notes ? html`<b>${t('order_notes')}:</b> ${o.notes}` : ''}</p></div>
    <div class="panel"><h2>${t('status')}</h2><p>${statusBadge(o.status)} <span class="muted small">· ${dt(o.updated_at)}</span></p>
      ${o.status === 'new' ? html`<button class="btn danger small" type="button" data-act="ordercancel" data-code="${o.code}">${t('cancel')} order</button>` : ''}
      ${upiPanel(o, shop)}
      <p class="small muted" style="margin-top:12px">Problem with this order? <a href="#/contact?order=${enc(o.code)}">Contact support</a> · <a href="#/refund-policy">${t('refund')}</a></p></div></div>`,
    { title: `Order ${o.code} | ${siteName()}`, noindex: true });
  renderQRs();
  S.timer = setInterval(() => { if (location.hash.startsWith('#/order/')) router(true); }, 60000);
});

route('/track', async () => {
  view(html`<div class="form-card"><h1>${t('track_order')}</h1><form data-form="track">
    <label for="f_code">${t('order_code')}</label><input id="f_code" name="code" placeholder="NKXXXXXXXX" maxlength="20" required autocapitalize="characters">
    <button class="btn block" style="margin-top:14px" type="submit">${t('track_order')}</button></form></div>`, { title: `Track order | ${siteName()}`, noindex: true });
});

route('/contact', async (_m, q) => {
  const email = setting('contact_email'), phone = setting('contact_phone'), wa = setting('contact_whatsapp'), addr = setting('contact_address'), op = setting('operator_name');
  view(html`<div class="wrap" style="padding:20px 16px;max-width:800px"><h1>${t('contact')}</h1>
  <div class="panel"><h2>${siteName()}</h2>${op ? html`<p><b>Operated by:</b> ${op}</p>` : ''}
    ${email ? html`<p>✉️ <a href="mailto:${email}">${email}</a></p>` : ''}${phone ? html`<p>📞 <a href="tel:${phone}">${phone}</a></p>` : ''}
    ${wa ? html`<p>💬 <a class="btn wa small" target="_blank" rel="noopener" href="${waLink(wa, 'Hello ' + siteName())}">WhatsApp</a></p>` : ''}
    ${addr ? html`<p style="white-space:pre-line">📍 ${addr}</p>` : ''}
    ${!(email || phone || wa || addr) ? html`<p class="muted">Contact details have not been added by the site administrator yet. Please use the form below.</p>` : ''}</div>
  <div class="panel"><h2>Send us a message</h2><p class="muted">Problem with an order, a shop, or the website? Write to us and our team will contact you on your mobile number.</p>
    <form data-form="ticket"><div class="grid2"><div>${field(t('your_name'), 'name', '', 'type="text" required maxlength="80"')}</div><div>${field(t('your_phone'), 'phone', '', 'type="tel" required inputmode="numeric" maxlength="15"')}</div></div>
      ${field(t('order_code') + ' (optional)', 'order_code', (q.get('order') || '').toUpperCase(), 'type="text" maxlength="20"')}
      ${field('Subject', 'subject', '', 'type="text" required maxlength="120"')}
      <label for="f_message">Message</label><textarea id="f_message" name="message" required maxlength="2000"></textarea>
      <button class="btn" style="margin-top:14px" type="submit">${t('send')}</button></form></div></div>`,
    { title: `Contact & Support | ${siteName()}`, desc: 'Contact the marketplace team for help with an order or shop.' });
});

route('/pricing', async () => {
  const pct = parseFloat(setting('commission_pct')) || 0;
  view(html`<div class="wrap" style="padding:20px 16px;max-width:900px"><h1>${t('pricing')}</h1>
  <p>${siteName()} is free to start. Here is exactly what shop owners pay — nothing is charged automatically.</p>
  <div class="shopcards">${S.plans.filter(p => p.active).map(p => html`<div class="card" style="padding:16px"><h3>${p.name}</h3>
    <div class="price" style="font-size:1.8rem">${p.price === 0 ? t('free') : html`${inr(p.price)}<span class="muted small"> / month</span>`}</div>
    <p class="small">${p.description}</p><p class="small muted">${p.max_products ? 'Up to ' + p.max_products + ' products' : 'Unlimited products'} · ${p.max_orders_month ? 'up to ' + p.max_orders_month + ' orders per month' : 'unlimited orders'}</p></div>`)}</div>
  <div class="panel" style="margin-top:20px"><h2>All charges explained</h2><ul>
    <li><b>Starter plan:</b> free, no card or payment details needed.</li>
    <li><b>Paid plans:</b> optional. A paid plan starts only after the marketplace team confirms they have received your payment, and it is valid for the period they set.</li>
    <li><b>Promote your shop (shown first in lists):</b> ${priceOf('promote_price_day') ? html`<b>${inr(priceOf('promote_price_day'))} per day</b> — you choose how many days.` : ''} ${setting('featured_price_note')}</li><li><b>Banner advertisements (home and category pages, marked “Ad”):</b> ${priceOf('ad_price_day') ? html`<b>${inr(priceOf('ad_price_day'))} per day</b> — you choose how many days.` : ''} ${setting('ad_note')}</li>
    <li><b>Order commission:</b> ${pct > 0 ? html`${pct}% of the item value of each <i>delivered</i> order. Commission is recorded in your account. You pay it from the Commission page (UPI or Razorpay) or directly to the team; it is marked paid only after the team confirms the money.` : 'Currently 0%. If a commission is introduced, it will be shown here and shop owners will be informed before it applies.'}</li>
    <li><b>Payments:</b> Customer orders are paid directly to the shop (cash on delivery or at the shop); the website does not take customers' money. Shops can pay plan fees to the marketplace by UPI or Razorpay when enabled; the team confirms each payment before activating a plan, and records it in your account.</li></ul>
    <a class="btn gold" href="#/register">${t('register_shop')}</a></div></div>`,
    { title: `Plans & charges for shops | ${siteName()}`, desc: 'Free starter plan for small shops, with optional paid plans. All charges explained.' });
});

/* ---------- policy pages ---------- */
const opLine = () => html`${siteName()}${setting('operator_name') ? ', operated by ' + setting('operator_name') : ''}`;
route('/privacy', async () => view(html`<div class="wrap"><article class="policy"><h1>${t('privacy')}</h1>
<p class="muted">${opLine()}. Contact: ${setting('contact_email') ? setting('contact_email') : html`see our <a href="#/contact">contact page</a>`}.</p>
<h2>1. What we collect</h2>
<p><b>Customers</b> (no account needed): the name, mobile number, delivery address and notes you enter when you place an order, and the items you ordered.</p>
<p><b>Shop owners:</b> name, email, mobile number, a password (stored only as a one-way hash by our login provider), shop name, address, PIN code, WhatsApp number, map link, logo, products and photos, and order records.</p>
<p><b>Technical:</b> your browser stores your language, place, cart and login session on your device. Our hosting and database providers keep basic technical logs (IP address, time) for security.</p>
<h2>2. How we use it</h2><ul><li>To pass your order to the shop you ordered from, and to show you its status.</li><li>To let shop owners manage products and orders, and administrators approve shops and handle complaints.</li><li>To keep the service secure and prevent abuse.</li></ul>
<p>We do not sell your personal information. We do not run advertising trackers.</p>
<h2>3. Who can see it</h2><ul><li><b>The shop you order from</b> sees your name, phone, address and order details so it can serve you. If you choose WhatsApp ordering, the details you send also pass through WhatsApp, which has its own privacy policy.</li>
<li><b>Marketplace administrators</b> can see orders and support messages in order to resolve problems.</li>
<li><b>Public:</b> a shop's name, address, PIN code, WhatsApp number, hours and products are shown publicly on its storefront. Shop owners agree to this when registering.</li>
<li>Your order number works like a private link: anyone who has it can view that order's page, so please do not share it.</li></ul>
<p>Data is stored with Supabase (database, login and image storage). Pages load fonts from Google Fonts and a script library from jsDelivr, so your browser contacts those services when you open the site.</p>
<h2>4. How long we keep it</h2><p>Order records are kept as long as needed to resolve disputes and for accounting. Shop owners may ask us to close their account and remove their listing at any time.</p>
<h2>5. Your choices</h2><p>You can ask us to correct or delete your information, or ask what we hold about you, using the <a href="#/contact">contact page</a>. Some order records may need to be kept for legal or accounting reasons.</p>
<h2>6. Children</h2><p>This service is intended for adults. Children should order only with a parent's or guardian's help.</p>
<h2>7. Changes</h2><p>We may update this policy; the latest version is always on this page.</p></article></div>`, { title: `Privacy Policy | ${siteName()}`, desc: 'How we handle your information.' }));

route('/terms', async () => view(html`<div class="wrap"><article class="policy"><h1>${t('terms')}</h1><p class="muted">${opLine()}.</p>
<h2>1. What ${siteName()} is</h2><p>${siteName()} is an online marketplace that lists independent local shops. <b>The shops, not ${siteName()}, sell the products.</b> When you order, you buy from the shop. We provide the platform that connects you and the shop.</p>
<h2>2. For customers</h2><ul><li>Give a correct name, mobile number and address so the shop can reach you.</li><li>Prices, stock and delivery details are set by each shop and may change. A shop may decline or cancel an order, for example if an item is unavailable.</li>
<li><b>Payment:</b> ${siteName()} does not process online payments. You pay the shop directly, by cash on delivery, at the shop when you pick up, or by UPI to the shop's own UPI ID if the shop accepts it. The shop, not the website, receives that money.</li>
<li>Delivery fees, minimum order values and delivery times are shown on the shop page and at checkout when the shop has set them. Delivery times are estimates.</li><li>Do not place false orders or misuse the website.</li></ul>
<h2>3. For shop owners</h2><ul><li>You must be the owner of the shop, or authorised to act for it, and give true information. New shops go live only after administrator approval.</li>
<li>You are responsible for your products, prices, stock, photos and descriptions, for delivery, and for following Indian laws that apply to your goods (including food safety, labelling, GST and consumer protection laws where applicable).</li>
<li>Do not list illegal, counterfeit, unsafe or prohibited items, or photos you do not have the right to use.</li><li>Honour confirmed orders at the listed price, or tell the customer promptly if you cannot.</li>
<li>Your shop name, address, PIN code, WhatsApp number, hours and products are shown publicly.</li><li>The administrator may reject, suspend or remove a shop or product that breaks these terms or receives serious complaints.</li></ul>
<h2>4. Plans, fees and commission</h2><p>The Starter plan is free. Optional paid plans, featured listings, advertisements and order commission are described on the <a href="#/pricing">plans and charges page</a>. Fees apply only as described there and only after you have agreed; a paid plan starts after the marketplace confirms it received your payment.</p>
<h2>5. Limits of our responsibility</h2><p>We work to keep the website available and accurate, but we do not guarantee uninterrupted service. As we are not the seller, we are not responsible for the quality, safety or delivery of goods supplied by shops, but we will help resolve complaints (see <a href="#/contact">support</a>). To the extent allowed by law, our liability is limited to the amount of fees you paid us in the previous 3 months.</p>
<h2>6. Accounts and security</h2><p>Keep your password private. You are responsible for activity on your account.</p>
<h2>7. Governing law</h2><p>These terms are governed by the laws of India. Disputes will be subject to the courts at the place where the operator is based.</p></article></div>`, { title: `Terms & Conditions | ${siteName()}`, desc: 'Terms for customers and shop owners.' }));

route('/refund-policy', async () => view(html`<div class="wrap"><article class="policy"><h1>${t('refund')}</h1>
<h2>How payment works</h2><p>${siteName()} does not collect payment for your order. You pay the shop directly (cash on delivery or at the shop). So most orders have <b>nothing to refund</b>: if you cancel before paying, you owe nothing.</p>
<h2>Cancelling an order</h2><ul><li><b>Before the shop confirms:</b> you can cancel from your order page (open it with your order number). The status will change to Cancelled.</li>
<li><b>After the shop has confirmed or started preparing:</b> please call or WhatsApp the shop. Many shops can still cancel, but items that are already cut, cooked, stitched or specially prepared may not be cancellable.</li>
<li>A shop may cancel an order if an item is unavailable or the delivery address is outside its area. You will see the status change to Cancelled.</li></ul>
<h2>Wrong, damaged or missing items</h2><ul><li>Check your items at delivery or pickup. Tell the shop immediately if something is wrong, damaged or missing.</li>
<li>Return, replacement and refund rules for goods are decided by each shop, because the shop is the seller. Perishable items (fresh vegetables, fruits, fish, meat, bakery) can normally only be replaced or refunded if reported at the time of delivery or pickup.</li>
<li>If you paid a shop in advance by an arrangement made directly with it, any refund is made by the shop to you directly.</li></ul>
<h2>If you cannot sort it out with the shop</h2><p>Send us a message on the <a href="#/contact">support page</a> with your order number within 7 days of the order. We will contact the shop and try to resolve it. We can suspend shops with repeated complaints.</p>
<h2>Shop owners: subscription fees</h2><p>Paid plan fees are for the period paid. If you stop using a paid plan, tell us; fees for a period already started are not refunded unless the service was unavailable through our fault, in which case contact support and we will review it case by case. Your shop returns to the free Starter plan when a paid period ends.</p></article></div>`,
  { title: `Cancellation & Refund Policy | ${siteName()}`, desc: 'How order cancellations and refunds work.' }));

/* ---------- login / register ---------- */
route('/login', async () => {
  if (S.user) { location.hash = redirectFor(); return; }
  view(html`<div class="form-card" style="max-width:460px"><h1>${ADMIN_ONLY ? 'Admin login' : t('login')}</h1><form data-form="login">
    ${field('Email', 'email', '', 'type="email" required autocomplete="username"')}
    <label for="f_password">${t('password')}</label><input id="f_password" name="password" type="password" required autocomplete="current-password">
    <button class="btn block" style="margin-top:18px" type="submit">${t('login')}</button></form>
    <p class="small muted" style="margin-top:16px">For shop owners and the site administrator. Customers do not need an account — just add items to the cart and order.</p>
    <p>${t('my_shop')}? <a href="#/register">${t('register_shop')}</a></p>
    <details><summary class="small">Forgot password?</summary><form data-form="forgot" style="margin-top:8px">${field('Email', 'email', '', 'type="email" required')}<button class="btn ghost small" style="margin-top:10px" type="submit">Send reset link</button></form></details></div>`,
    { title: `Log in | ${siteName()}`, noindex: true });
});

route('/reset', async () => {
  view(html`<div class="form-card" style="max-width:460px"><h1>Set a new password</h1><form data-form="resetpw">
    <label for="f_new">New password (8+ characters)</label><input id="f_new" name="new" type="password" required minlength="8" autocomplete="new-password">
    <label for="f_new2">Repeat new password</label><input id="f_new2" name="new2" type="password" required minlength="8" autocomplete="new-password">
    <button class="btn gold block" style="margin-top:18px" type="submit">${t('save')}</button></form></div>`, { title: 'New password', noindex: true });
});

route('/register', async () => {
  if (S.user) { location.hash = '#/dashboard'; return; }
  view(html`<div class="form-card"><h1>${t('register_shop')}</h1>
  <p class="muted">Free to start. Your shop goes live after the admin checks your details. See <a href="#/pricing">plans and charges</a>.</p>
  <form data-form="register" novalidate><h2>Shop details</h2>
    ${field('Shop name', 'name', '', 'type="text" required maxlength="80"')}
    <label for="f_category_id">Shop category</label><select id="f_category_id" name="category_id" required><option value="">—</option>${S.cats.map(c => html`<option value="${c.id}">${c.icon} ${cname(c)}</option>`)}</select>
    <label for="f_description">About the shop (optional)</label><textarea id="f_description" name="description" maxlength="600" style="min-height:80px"></textarea>
    <label for="f_address">Full shop address</label><textarea id="f_address" name="address" required maxlength="300" style="min-height:80px"></textarea>
    <div class="grid2"><div>${field('Locality / area', 'locality', '', 'type="text" maxlength="60"')}</div><div>${field('Town / place', 'town', '', 'type="text" required maxlength="60"')}</div>
      ${stateFields('Kerala', '')}
      <div>${field('PIN code', 'pincode', '', 'type="text" required inputmode="numeric" maxlength="6"')}</div></div>
    ${field('Google Maps link of your shop (optional)', 'map_link', '', 'type="text" maxlength="300" placeholder="https://maps.app.goo.gl/…"')}
    ${field('WhatsApp number of the shop', 'whatsapp', '', 'type="tel" required inputmode="numeric" maxlength="15" placeholder="98XXXXXXXX"')}
    <p class="hint">Customers will see this number and send orders here. It will be shown publicly.</p>
    <h2 style="margin-top:24px">Owner login</h2>
    ${field('Owner name', 'owner_name', '', 'type="text" required maxlength="80"')}
    ${field('Your mobile number', 'phone', '', 'type="tel" required inputmode="numeric" maxlength="15"')}
    ${field('Email (used to log in)', 'email', '', 'type="email" required autocomplete="username"')}
    <div class="grid2"><div><label for="f_password">${t('password')} (8+ characters)</label><input id="f_password" name="password" type="password" required minlength="8" autocomplete="new-password"></div>
      <div><label for="f_password2">Repeat password</label><input id="f_password2" name="password2" type="password" required minlength="8" autocomplete="new-password"></div></div>
    ${checkbox(html`I agree to the <a href="#/terms" target="_blank">Terms</a> and <a href="#/privacy" target="_blank">Privacy Policy</a>.`, 'agree', false)}
    <button class="btn gold block" type="submit">${t('register_shop')}</button></form></div>`,
    { title: `Register your shop | ${siteName()}`, desc: 'Register your small shop for free and sell to customers in your own town.' });
});

/* =====================================================================
   OWNER DASHBOARD
   ===================================================================== */
function ownerGuard() {
  if (!S.user) { location.hash = '#/login'; return false; }
  if (S.profile && S.profile.role === 'admin') { location.hash = '#/'; return false; }
  if (!S.shop) { view(html`<div class="form-card"><h1>No shop on this account</h1><p>This login has no shop attached. If you registered and the shop is missing, please contact support.</p><a class="btn" href="#/contact">${t('contact')}</a></div>`, { noindex: true }); return false; }
  return true;
}
function dashLayout(active, inner, title) {
  const sh = S.shop; const link = (path, label) => html`<a class="${active === path ? 'on' : ''}" href="#/dashboard${path}">${label}</a>`;
  view(html`<div class="wrap"><div class="dash">
    <nav class="side" aria-label="Dashboard">${link('', '📊 Overview')}${link('/products', '📦 ' + t('products'))}${link('/orders', '🧾 ' + t('orders'))}${link('/reports', '📈 ' + t('reports'))}${link('/settings', '⚙️ ' + t('settings'))}${link('/plan', '⭐ ' + t('subscription'))}${link('/promote', '📣 Promote & Ads')}${link('/commission', '🧮 Commission')}${link('/support', '💬 ' + t('support'))}${link('/password', '🔒 Password')}<a href="#/s/${enc(sh.slug)}">🏪 ${t('view_shop')}</a></nav>
    <div>${sh.status === 'pending' ? html`<div class="notice">⏳ ${t('pending_notice')}</div>` : ''}
      ${sh.status === 'rejected' ? html`<div class="flash error">Your shop was not approved${sh.status_note ? ': ' + sh.status_note : ''}. Fix your details in Shop settings or contact support.</div>` : ''}
      ${sh.status === 'suspended' ? html`<div class="flash error">Your shop is suspended and hidden from customers${sh.status_note ? ': ' + sh.status_note : ''}. Please contact support.</div>` : ''}
      ${inner}</div></div></div>`, { title: `${title || 'Dashboard'} | ${siteName()}`, noindex: true });
}

function usageNotice(plan, prodCount, ordCount) {
  const out = [];
  const chk = (n, max, what) => { if (!max) return; if (n >= max) out.push(html`<div class="flash error">🚫 You have used all <b>${max}</b> ${what} on the <b>${plan.name}</b> plan. <a href="#/dashboard/plan">Upgrade your plan →</a></div>`); else if (n >= max * 0.8) out.push(html`<div class="notice">⚠️ ${n} of ${max} ${what} used on the <b>${plan.name}</b> plan. <a href="#/dashboard/plan">Upgrade →</a></div>`); };
  chk(prodCount, plan.max_products, 'products'); chk(ordCount, plan.max_orders_month, 'orders this month');
  if (plan.max_orders_month && ordCount >= plan.max_orders_month) out.push(html`<div class="flash error">Customers <b>cannot place new orders</b> in your shop until next month or until you upgrade.</div>`);
  return out;
}
const monthOrders = list => list.filter(o => o.status !== 'cancelled' && dayKey(o.created_at).slice(0, 7) === todayIST().slice(0, 7)).length;
route('/dashboard', async () => {
  if (!ownerGuard()) return; const sh = S.shop;
  const [orders, pc] = await Promise.all([
    sb.from('orders').select('id,code,customer_name,total,status,created_at').eq('shop_id', sh.id).order('id', { ascending: false }).limit(500),
    sb.from('products').select('id', { count: 'exact', head: true }).eq('shop_id', sh.id)]);
  const list = must(orders); const counts = {}; list.forEach(o => { counts[o.status] = (counts[o.status] || 0) + 1; });
  const today = list.filter(o => dayKey(o.created_at) === todayIST()).length; const plan = effPlan(sh);
  dashLayout('', html`<h1>${sh.name}</h1>
  ${usageNotice(plan, pc.count || 0, monthOrders(list))}
  <div class="panel"><h2>Your shop link</h2><p>This is your own shop website. Share it on WhatsApp, Facebook and Instagram (paste it in your bio or story), or print it on a board:</p>${sharePanel(sh)}</div>
  <div class="stats"><div class="stat"><b>${counts.new || 0}</b><span>${t('s_new')} ${t('orders')}</span></div><div class="stat"><b>${today}</b><span>${t('orders')} today</span></div>
    <div class="stat"><b>${pc.count || 0}</b><span>${t('products')}</span></div><div class="stat"><b>${monthOrders(list)}${plan.max_orders_month ? ' / ' + plan.max_orders_month : ''}</b><span>Orders this month</span></div><div class="stat"><b>${plan.name}</b><span>${t('subscription')}</span></div></div>
  ${counts.new ? html`<div class="notice"><b>${counts.new}</b> new order(s) waiting. <a href="#/dashboard/orders?status=new">Open them →</a></div>` : ''}
  ${!pc.count ? html`<div class="notice">Add your first product so customers can order. <a class="btn small" href="#/dashboard/product/new">${t('add_product')}</a></div>` : ''}
  <div class="panel"><div class="row between"><h2>${t('orders')}</h2><a href="#/dashboard/orders">${t('view_all')} →</a></div>
    ${list.length ? html`<div class="tablewrap"><table class="t"><tr><th>#</th><th>${t('name')}</th><th>${t('total')}</th><th>${t('status')}</th></tr>${list.slice(0, 5).map(o => html`<tr><td><a href="#/dashboard/order/${o.id}">${o.code}</a></td><td>${o.customer_name}</td><td>${inr(o.total)}</td><td>${statusBadge(o.status)}</td></tr>`)}</table></div>` : emptyBox('No orders yet. Share your shop link with customers.')}</div>
`);
});

route('/dashboard/products', async () => {
  if (!ownerGuard()) return; const sh = S.shop; const plan = effPlan(sh);
  const rows = must(await sb.from('products').select('*').eq('shop_id', sh.id).order('id', { ascending: false }));
  dashLayout('/products', html`<div class="row between mb"><h1 style="margin:0">${t('products')}</h1><a class="btn gold" href="#/dashboard/product/new">＋ ${t('add_product')}</a></div>
  <p class="muted small">${rows.length} / ${plan.max_products || '∞'} products (${plan.name})</p>${usageNotice(plan, rows.length, 0)}
  ${rows.length ? html`<div class="tablewrap"><table class="t"><tr><th></th><th>${t('name')}</th><th>${t('price')}</th><th>Stock</th><th></th></tr>
    ${rows.map(p => html`<tr><td>${imgUrl(p.image) ? html`<img class="thumb-s" src="${imgUrl(p.image)}" alt="" width="44" height="44">` : html`<span class="thumb-s">🛍️</span>`}</td>
      <td><b>${p.name}</b>${p.name_ml ? html`<br><span class="muted small">${p.name_ml}</span>` : ''}${!p.active ? html`<br><span class="tag grey">Hidden</span>` : ''}${p.blocked ? html`<br><span class="tag red">Blocked by admin</span>` : ''}</td>
      <td>${inr(effPrice(p))}${p.discount_price ? html`<br><s class="muted small">${inr(p.price)}</s>` : ''}</td>
      <td><button class="btn small ${p.in_stock ? 'ghost' : 'danger'}" type="button" data-act="togglestock" data-id="${p.id}" data-val="${p.in_stock ? 1 : 0}">${p.in_stock ? '✅ ' + t('in_stock') : t('out_of_stock')}</button>${p.stock_qty !== null ? html`<span class="small muted"> (${p.stock_qty})</span>` : ''}</td>
      <td class="right" style="white-space:nowrap"><a class="btn ghost small" href="#/dashboard/product/${p.id}">${t('edit')}</a> <button class="btn danger small" type="button" data-act="delproduct" data-id="${p.id}" data-name="${p.name}">${t('delete')}</button></td></tr>`)}</table></div>`
    : html`<div class="empty">${t('no_products_yet')}<br><br><a class="btn gold" href="#/dashboard/product/new">＋ ${t('add_product')}</a></div>`}`, 'Products');
});

route('/dashboard/product/(new|\\d+)', async ([id]) => {
  if (!ownerGuard()) return; const sh = S.shop;
  const p = id === 'new' ? null : must(await sb.from('products').select('*').eq('id', id).eq('shop_id', sh.id).maybeSingle());
  if (id !== 'new' && !p) return notFound(); const v = p || {};
  let secs = []; try { const all = await sb.from('products').select('*').eq('shop_id', sh.id); secs = [...new Set((all.data || []).map(x => x.section).filter(Boolean))].sort(); } catch (e) { secs = []; }
  dashLayout('/products', html`<h1>${p ? t('edit') : t('add_product')}</h1>
  <form class="panel" data-form="product" data-id="${p ? p.id : ''}" data-hassec="${p && 'section' in p ? 1 : 0}" novalidate>
    <div class="grid2"><div>${field('Product name (English)', 'name', v.name || '', 'type="text" required maxlength="120"')}</div><div>${field('Product name (മലയാളം, optional)', 'name_ml', v.name_ml || '', 'type="text" maxlength="120"')}</div>
      <div>${field(t('price') + ' (₹)', 'price', v.price ?? '', 'type="number" min="1" required inputmode="numeric"')}</div><div>${field('Discount price (₹, optional)', 'discount_price', v.discount_price ?? '', 'type="number" min="1" inputmode="numeric"')}</div>
      <div>${field('Unit (e.g. 1 kg, per piece)', 'unit', v.unit || '', 'type="text" maxlength="30"')}</div>
      <div><label for="f_category_id">${t('categories')}</label><select id="f_category_id" name="category_id"><option value="">—</option>${S.cats.map(c => html`<option value="${c.id}" ${v.category_id === c.id ? raw('selected') : ''}>${c.icon} ${cname(c)}</option>`)}</select></div></div>
    <label for="f_section">Your shop category / section (optional, e.g. Doors, Windows, Offers)</label><input id="f_section" name="section" value="${v.section || ''}" maxlength="40" list="seclist" autocomplete="off"><datalist id="seclist">${secs.map(x => html`<option value="${x}">`)}</datalist>
    <p class="hint">Customers see these as category buttons on your shop page. Use the same name for products that belong together.</p>
    <label for="f_description">Description (optional)</label><textarea id="f_description" name="description" maxlength="1000">${v.description || ''}</textarea>
    <div class="grid2"><div>${field('Stock quantity (optional)', 'stock_qty', v.stock_qty ?? '', 'type="number" min="0" inputmode="numeric"')}<p class="hint">Leave empty if you do not want to count stock. A number reduces with every order.</p></div>
      <div>${checkbox(t('in_stock'), 'in_stock', !p || v.in_stock)}${checkbox('Show to customers', 'active', !p || v.active)}</div></div>
    <label>Photos (up to 3 — JPG, PNG or WebP). The first one is the main photo.</label>
    <div class="photoslots">${['image', 'image2', 'image3'].map((k, i) => html`<div class="photoslot"><b class="small">Photo ${i + 1}</b>
      ${imgUrl(v[k]) ? html`<img src="${imgUrl(v[k])}" alt="" width="110" height="110">${checkbox('Remove', 'rm_' + k, false)}` : ''}
      <img id="preview_${k}" alt="" width="110" height="110" style="display:none">
      <input type="file" name="${k}" accept="image/jpeg,image/png,image/webp" data-preview="preview_${k}" aria-label="Photo ${i + 1}"></div>`)}</div>
    <div class="row" style="margin-top:18px"><button class="btn gold" type="submit">${t('save')}</button><a class="btn ghost" href="#/dashboard/products">${t('cancel')}</a></div></form>`, 'Product');
});

route('/dashboard/orders', async (_m, q) => {
  if (!ownerGuard()) return; const sh = S.shop; const status = q.get('status') || ''; const page = pageNum(q); const [a, b] = range(page, 20);
  let query = sb.from('orders').select('*', { count: 'exact' }).eq('shop_id', sh.id);
  if (STATUSES.includes(status)) query = query.eq('status', status); else if (status === 'open') query = query.in('status', ['new', 'confirmed', 'preparing', 'ready', 'out_for_delivery']);
  const res = await query.order('id', { ascending: false }).range(a, b); const rows = must(res);
  dashLayout('/orders', html`<h1>${t('orders')}</h1>
  <div class="row gap-s mb"><a class="tag ${!status ? 'gold' : ''}" href="#/dashboard/orders">${t('all')}</a><a class="tag ${status === 'open' ? 'gold' : ''}" href="#/dashboard/orders?status=open">Open</a>${STATUSES.map(s => html`<a class="tag ${status === s ? 'gold' : ''}" href="#/dashboard/orders?status=${s}">${t('s_' + s)}</a>`)}</div>
  ${rows.length ? html`<div class="tablewrap"><table class="t"><tr><th>#</th><th>${t('name')}</th><th>${t('phone')}</th><th>${t('total')}</th><th></th><th>${t('status')}</th><th></th></tr>
    ${rows.map(o => html`<tr><td><b>${o.code}</b><br><span class="muted small">${dt(o.created_at)}</span></td><td>${o.customer_name}</td><td>${o.customer_phone}</td><td>${inr(o.total)}</td><td>${o.fulfilment === 'delivery' ? '🛵' : '🏬'}${o.channel === 'whatsapp' ? ' 💬' : ''}${o.paid ? ' ✅' : o.pay_ref ? ' 💳?' : ''}</td><td>${statusBadge(o.status)}</td><td><a class="btn small" href="#/dashboard/order/${o.id}">Open</a></td></tr>`)}</table></div>
    ${pager(page, Math.ceil((res.count || 0) / 20), '#/dashboard/orders?status=' + status)}` : emptyBox('No orders here yet.')}`, 'Orders');
});

route('/dashboard/order/(\\d+)', async ([id]) => {
  if (!ownerGuard()) return; const sh = S.shop;
  const o = must(await sb.from('orders').select('*, order_items(*)').eq('id', id).eq('shop_id', sh.id).maybeSingle()); if (!o) return notFound();
  const items = (o.order_items || []).sort((x, y) => x.id - y.id);
  const msg = `Hello ${o.customer_name}, your order ${o.code} at ${sh.name} is now: ${t('s_' + o.status)}. Track it: ${location.origin + location.pathname}#/order/${o.code}`;
  dashLayout('/orders', html`<div class="row between"><h1>${o.code}</h1>${statusBadge(o.status)}</div>
  <div class="panel"><p><b>${o.customer_name}</b> · <a href="tel:+91${o.customer_phone}">📞 ${o.customer_phone}</a><br><span class="muted small">${dt(o.created_at)} · ${o.channel === 'whatsapp' ? 'WhatsApp' : 'Website'} order</span></p>
    <p><b>${t('how_receive')}</b> ${o.fulfilment === 'delivery' ? t('delivery') : t('pickup')}</p>
    <p><b>Payment:</b> ${o.paid ? html`<span class="tag">✅ Paid</span>` : html`<span class="tag gold">Not marked paid</span>`}
      ${o.pay_ref ? html`<br>Customer says they paid by UPI, reference <b>${o.pay_ref}</b>. <u>Check your UPI app / bank before marking it paid.</u>` : ''}<br>
      <button class="btn small ${o.paid ? 'ghost' : ''}" style="margin-top:6px" type="button" data-act="markpaid" data-id="${o.id}" data-val="${o.paid ? 0 : 1}">${o.paid ? 'Mark as not paid' : '✅ Mark payment received'}</button></p>
    ${o.address ? html`<p><b>${t('delivery_address')}:</b><br><span style="white-space:pre-line">${o.address}</span></p>` : ''}${o.notes ? html`<p><b>${t('order_notes')}:</b><br>${o.notes}</p>` : ''}
    <div class="tablewrap"><table class="t">${items.map(i => html`<tr><td>${i.name} × ${i.qty}</td><td class="right">${inr(i.unit_price * i.qty)}</td></tr>`)}
      <tr><td>${t('subtotal')}</td><td class="right">${inr(o.subtotal)}</td></tr>${o.fulfilment === 'delivery' ? html`<tr><td>${t('delivery_fee')}</td><td class="right">${inr(o.delivery_fee)}</td></tr>` : ''}
      <tr><td><b>${t('total')} — ${t('cod')}</b></td><td class="right"><b>${inr(o.total)}</b></td></tr></table></div>
    ${Number(o.commission_pct) ? html`<p class="small muted" style="margin-top:10px">Marketplace commission if delivered: ${o.commission_pct}% of items (${inr(o.commission_amount)}).</p>` : ''}</div>
  ${!['delivered', 'cancelled'].includes(o.status) ? html`<div class="panel"><h2>Update status</h2><form class="row" data-form="orderstatus" data-id="${o.id}">
    <select name="status" style="max-width:260px">${STATUSES.filter(s => s !== 'new' && s !== o.status && (s !== 'out_for_delivery' || o.fulfilment === 'delivery')).map(s => html`<option value="${s}">${t('s_' + s)}</option>`)}</select>
    <button class="btn gold" type="submit">${t('update')}</button></form><p class="hint">Customers see the new status on their order page. Tap the button below to tell them on WhatsApp too.</p></div>` : ''}
  <div class="row mb"><a class="btn wa" rel="noopener" target="_blank" href="${waLink(o.customer_phone, msg)}">💬 Message customer on WhatsApp</a><a class="btn ghost" href="#/dashboard/orders">← ${t('orders')}</a></div>`, 'Order');
});

route('/dashboard/reports', async () => {
  if (!ownerGuard()) return; const sh = S.shop; const since = new Date(Date.now() - 30 * 864e5).toISOString();
  const orders = must(await sb.from('orders').select('id,status,total,created_at,order_items(name,qty,unit_price)').eq('shop_id', sh.id).gte('created_at', since).order('created_at', { ascending: false }).limit(1000));
  const delivered = orders.filter(o => o.status === 'delivered'); const daily = {}; const top = {};
  orders.forEach(o => { const k = dayKey(o.created_at); daily[k] = daily[k] || { orders: 0, sales: 0 }; daily[k].orders++; if (o.status === 'delivered') daily[k].sales += o.total;
    if (o.status !== 'cancelled') (o.order_items || []).forEach(i => { top[i.name] = top[i.name] || { qty: 0, value: 0 }; top[i.name].qty += i.qty; top[i.name].value += i.qty * i.unit_price; }); });
  const days = Object.keys(daily).sort().reverse(); const maxSales = Math.max(1, ...days.map(d => daily[d].sales)); const topList = Object.entries(top).sort((a, b) => b[1].qty - a[1].qty).slice(0, 10);
  dashLayout('/reports', html`<h1>${t('reports')}</h1><p class="muted">Last 30 days. All numbers come from the orders in your account. “Sales” counts only orders marked <b>Delivered</b>.</p>
  <div class="stats"><div class="stat"><b>${orders.length}</b><span>${t('orders')} received</span></div><div class="stat"><b>${delivered.length}</b><span>${t('s_delivered')}</span></div>
    <div class="stat"><b>${orders.filter(o => o.status === 'cancelled').length}</b><span>${t('s_cancelled')}</span></div><div class="stat"><b>${inr(delivered.reduce((a, o) => a + o.total, 0))}</b><span>Sales (delivered)</span></div></div>
  <div class="panel"><h2>By day</h2>${days.length ? html`<div class="tablewrap"><table class="t"><tr><th>Date</th><th>${t('orders')}</th><th>Sales</th><th style="width:40%"></th></tr>${days.map(d => html`<tr><td>${d}</td><td>${daily[d].orders}</td><td>${inr(daily[d].sales)}</td><td><div class="bar" style="width:${Math.floor(daily[d].sales * 100 / maxSales)}%"></div></td></tr>`)}</table></div>` : emptyBox('No orders in the last 30 days.')}</div>
  <div class="panel"><h2>Best-selling products</h2>${topList.length ? html`<div class="tablewrap"><table class="t"><tr><th>${t('products')}</th><th>Sold</th><th>Value</th></tr>${topList.map(([n, r]) => html`<tr><td>${n}</td><td>${r.qty}</td><td>${inr(r.value)}</td></tr>`)}</table></div>` : emptyBox('Nothing sold yet.')}</div>`, 'Reports');
});

route('/dashboard/settings', async () => {
  if (!ownerGuard()) return; const sh = S.shop; const hrs = shopHours(sh); const logo = imgUrl(sh.logo);
  dashLayout('/settings', html`<h1>${t('settings')}</h1><form class="panel" data-form="shopsettings" novalidate>
  <h2>Orders & delivery</h2>
  ${checkbox('Accepting orders now (untick when you are closed or busy)', 'accepting_orders', sh.accepting_orders)}${checkbox('🛵 ' + t('delivery'), 'delivery_available', sh.delivery_available)}${checkbox('🏬 ' + t('pickup'), 'pickup_available', sh.pickup_available)}
  <div class="grid2"><div>${field(t('delivery_fee') + ' (₹, 0 = free)', 'delivery_fee', sh.delivery_fee, 'type="number" min="0" inputmode="numeric"')}</div><div>${field(t('min_order') + ' (₹, 0 = none)', 'min_order', sh.min_order, 'type="number" min="0" inputmode="numeric"')}</div>
    <div>${field(t('est_delivery') + ' (e.g. Within 1 hour)', 'est_delivery', sh.est_delivery, 'type="text" maxlength="60"')}</div><div>${field('Delivery area (e.g. within 5 km)', 'delivery_area', sh.delivery_area, 'type="text" maxlength="200"')}</div></div>
  ${field('Your UPI ID to receive customer payments (optional, e.g. name@bank)', 'upi_id', sh.upi_id, 'type="text" maxlength="60" autocomplete="off"')}
  <p class="hint">If you add it, customers see “Pay by UPI” on their order page and the money goes straight to you. It is also visible to anyone who views your shop data, so use a UPI ID you are happy to share. You must confirm each payment yourself in your UPI app/bank.</p>
  <h2 style="margin-top:24px">${t('opening_hours')}</h2><div class="tablewrap"><table class="t"><tr><th>Day</th><th>Open</th><th>Close</th><th>Closed</th></tr>
    ${DAYS.map(d => html`<tr><td>${DAY_NAMES[d]}</td><td><input type="time" name="${d}_open" value="${hrs[d].open}" style="min-width:110px"></td><td><input type="time" name="${d}_close" value="${hrs[d].close}" style="min-width:110px"></td><td><input type="checkbox" name="${d}_closed" value="1" ${hrs[d].closed ? raw('checked') : ''} style="width:24px;height:24px"></td></tr>`)}</table></div>
  <h2 style="margin-top:24px">Shop details</h2>
  ${field('Shop name', 'name', sh.name, 'type="text" required maxlength="80"')}
  <label for="f_category_id">Category</label><select id="f_category_id" name="category_id">${S.cats.map(c => html`<option value="${c.id}" ${sh.category_id === c.id ? raw('selected') : ''}>${c.icon} ${cname(c)}</option>`)}</select>
  <label for="f_description">About the shop</label><textarea id="f_description" name="description" maxlength="600" style="min-height:80px">${sh.description}</textarea>
  ${field('Owner name', 'owner_name', sh.owner_name, 'type="text" required maxlength="80"')}
  <label for="f_address">Address</label><textarea id="f_address" name="address" maxlength="300" style="min-height:80px">${sh.address}</textarea>
  <div class="grid2"><div>${field('Locality', 'locality', sh.locality, 'type="text" maxlength="60"')}</div><div>${field('Town', 'town', sh.town, 'type="text" required maxlength="60"')}</div>
    ${stateFields(sh.state || 'Kerala', sh.district)}
    <div>${field('PIN code', 'pincode', sh.pincode, 'type="text" required maxlength="6" inputmode="numeric"')}</div><div>${field('WhatsApp number', 'whatsapp', sh.whatsapp, 'type="tel" required maxlength="15" inputmode="numeric"')}</div><div>${field('Google Maps link', 'map_link', sh.map_link, 'type="text" maxlength="300"')}</div></div>
  <label for="f_logo">Shop logo / photo</label>${logo ? html`<img src="${logo}" alt="" width="90" height="90" style="border-radius:14px;margin-bottom:8px;object-fit:cover">` : ''}
  <img id="logopreview" alt="" width="90" height="90" style="display:none;border-radius:14px;margin-bottom:8px;object-fit:cover"><input id="f_logo" type="file" name="logo" accept="image/jpeg,image/png,image/webp" data-preview="logopreview">
  <div style="margin-top:18px"><button class="btn gold" type="submit">${t('save')}</button></div></form>`, 'Shop settings');
});

route('/dashboard/plan', async () => {
  if (!ownerGuard()) return; const sh = S.shop; const cur = effPlan(sh);
  const [uo, up] = await Promise.all([sb.from('orders').select('status,created_at').eq('shop_id', sh.id).gte('created_at', new Date(Date.now() - 40 * 864e5).toISOString()).limit(2000), sb.from('products').select('id', { count: 'exact', head: true }).eq('shop_id', sh.id)]);
  const usage = usageNotice(cur, up.count || 0, monthOrders(must(uo)));
  const usedO = monthOrders(must(uo)); const pct = parseFloat(setting('commission_pct')) || 0;
  const [reqs, pays] = await Promise.all([sb.from('plan_requests').select('*, plans(name)').eq('shop_id', sh.id).eq('status', 'open'), sb.from('payments').select('*').eq('shop_id', sh.id).order('id', { ascending: false })]);
  const open = must(reqs)[0]; const payments = must(pays);
  dashLayout('/plan', html`<h1>${t('subscription')}</h1>${usage}<div class="panel"><p>Current plan: <b>${cur.name}</b> · products ${up.count || 0}/${cur.max_products || '∞'} · orders this month ${usedO}/${cur.max_orders_month || '∞'}</p><p>${sh.plan_until && cur.price > 0 ? html` · valid until <b>${sh.plan_until}</b>` : ''}</p>${isFeatured(sh) ? html`<p><span class="tag gold">★ Featured</span> until ${sh.featured_until}</p>` : ''}</div>
  <div class="shopcards mb">${S.plans.filter(p => p.active).map(p => html`<div class="card" style="padding:16px"><h3>${p.name}</h3><div class="price" style="font-size:1.6rem">${p.price === 0 ? t('free') : html`${inr(p.price)}<span class="muted small"> / month</span>`}</div><p class="small">${p.description}</p>
    ${p.id === cur.id ? html`<span class="tag">✅ Current</span>` : (p.price > 0 ? payBox(p, sh) : '')}</div>`)}</div>
  ${open ? html`<div class="notice">Your request for <b>${open.plans ? open.plans.name : ''}</b> is open. The team will contact you on WhatsApp.</div>` : ''}
  <div class="panel"><h2>How charges work</h2><ul><li>Pay the marketplace by <b>UPI</b> or <b>Razorpay</b> (when enabled below). The plan is <b>not</b> activated automatically: the team checks that the money has arrived and then activates it. Customer orders are still paid directly to the shop.</li>
    <li>If a paid plan ends, your shop returns to the free Starter plan. Products stay, but you cannot add more than the free limit.</li>
    <li>Order commission: ${pct > 0 ? html`<b>${pct}%</b> of delivered order item value, settled with the team outside the website.` : html`currently <b>0%</b>.`}</li></ul><p><a href="#/pricing">Full details of charges</a></p></div>
  ${payments.length ? html`<div class="panel"><h2>Payments recorded for your shop</h2><div class="tablewrap"><table class="t"><tr><th>Date</th><th>Type</th><th>Amount</th><th>Reference</th></tr>${payments.map(r => html`<tr><td>${dOnly(r.created_at)}</td><td>${r.kind}</td><td>${inr(r.amount)}</td><td>${r.reference}</td></tr>`)}</table></div></div>` : ''}`, 'Plan');
  renderQRs();
});

function payOptions(o) { // o = {amount, note, type: plan|promo|ad, id}
  const upi = setting('upi_id'), rz = setting('razorpay_key_id'); if (!upi && !rz) return '';
  const link = upi ? `upi://pay?pa=${enc(upi)}&pn=${enc(setting('upi_name') || siteName())}&am=${o.amount}&cu=INR&tn=${enc(String(o.note).slice(0, 50))}` : '';
  const d = `data-type="${o.type}" data-id="${o.id}" data-amount="${o.amount}"`;
  return html`<div class="stack-s">
    ${rz ? html`<button class="btn gold small block" type="button" data-act="razorpay" ${raw(d)}>💳 Pay ${inr(o.amount)} with Razorpay</button>` : ''}
    ${upi ? html`<div style="margin-top:8px"><b class="small">Pay ${inr(o.amount)} by UPI</b>
      <p class="small">UPI ID: <b>${upi}</b>${setting('upi_name') ? ' (' + setting('upi_name') + ')' : ''}<br><a class="btn small" href="${link}">Open UPI app (phone)</a></p>
      <div class="qr" data-qr="${link}" style="margin:6px 0"></div><p class="hint">On a computer, scan the QR with any UPI app. Pay exactly ${inr(o.amount)}.</p>
      <form data-form="upiclaim" ${raw(d)}><label class="small">After paying, enter the UPI reference / UTR number</label>
      <input name="ref" required minlength="6" maxlength="40" autocomplete="off"><button class="btn small" style="margin-top:8px" type="submit">I have paid</button></form></div>` : ''}</div>`;
}
function payBox(p, sh) {
  const opts = payOptions({ amount: p.price, note: `${siteName()} ${p.name} plan - ${sh.name}`, type: 'plan', id: p.id });
  if (!opts.s) return html`<div class="notice small">Online payment is not switched on yet (the marketplace admin must add a UPI ID or Razorpay key in Admin → Settings).</div><button class="btn small block" type="button" data-act="planrequest" data-id="${p.id}" data-name="${p.name}">Request this plan</button>`;
  return html`${opts}<button class="btn ghost small block" style="margin-top:8px" type="button" data-act="planrequest" data-id="${p.id}" data-name="${p.name}">Request without paying now</button>`;
}
function renderQRs() {
  const boxes = document.querySelectorAll('.qr[data-qr]'); if (!boxes.length) return;
  const go = () => boxes.forEach(b => { if (!b.firstChild) { try { new window.QRCode(b, { text: b.dataset.qr, width: 150, height: 150 }); } catch (e) { /* QR optional */ } } });
  if (window.QRCode) return go(); const sc = document.createElement('script'); sc.src = 'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js'; sc.onload = go; document.head.appendChild(sc);
}
function loadRazorpay() {
  return new Promise((ok, no) => { if (window.Razorpay) return ok(); const sc = document.createElement('script'); sc.src = 'https://checkout.razorpay.com/v1/checkout.js'; sc.onload = ok; sc.onerror = () => no(new Error('Could not load Razorpay. Check your internet connection.')); document.head.appendChild(sc); });
}
async function claimPlan(planId, method, ref, amount) {
  const ex = must(await sb.from('plan_requests').select('id').eq('shop_id', S.shop.id).eq('status', 'open'));
  if (ex.length) { const r = must(await sb.from('plan_requests').update({ plan_id: planId, pay_method: method, pay_ref: ref, amount }).eq('id', ex[0].id).select('id')); if (!r.length) throw new Error('Could not save the payment reference. Please contact support with it.'); }
  else must(await sb.from('plan_requests').insert({ shop_id: S.shop.id, plan_id: planId, pay_method: method, pay_ref: ref, amount }));
}
async function claimPay(type, id, method, ref, amount) {
  if (type === 'plan') return claimPlan(Number(id), method, ref, amount);
  const table = type === 'ad' ? 'ads' : type === 'comm' ? 'commission_claims' : 'promo_requests';
  const r = must(await sb.from(table).update({ pay_method: method, pay_ref: ref }).eq('id', id).eq('shop_id', S.shop.id).select('id'));
  if (!r.length) throw new Error('Could not save the payment reference. Please contact support with it.');
}

const claimView = r => r.pay_ref ? html`<p class="small">✅ Payment reported: <b>${r.pay_method.toUpperCase()}</b> · ${r.pay_ref}. Waiting for the team to confirm.</p>` : '';
route('/dashboard/promote', async () => {
  if (!ownerGuard()) return; const sh = S.shop; const pp = priceOf('promote_price_day'), ap = priceOf('ad_price_day'); const today = todayIST();
  let promos = [], ads = [], prods = [], tablesOk = true;
  try {
    [promos, ads, prods] = await Promise.all([sb.from('promo_requests').select('*').eq('shop_id', sh.id).order('id', { ascending: false }).limit(10), sb.from('ads').select('*').eq('shop_id', sh.id).order('id', { ascending: false }).limit(30), sb.from('products').select('id,name').eq('shop_id', sh.id).eq('active', true).order('name')]).then(r => r.map(must));
  } catch (e) { tablesOk = false; }
  const daysBox = (price, id) => html`<label for="${id}">How many days? (1–90)</label><input id="${id}" name="days" type="number" min="1" max="90" value="7" required inputmode="numeric" data-ppd="${price}" data-out="${id}_t" style="max-width:140px"> <b id="${id}_t">${inr(price * 7)}</b> <span class="muted small">(${inr(price)} per day)</span>`;
  const dayTxt = n => `${n} day${n > 1 ? 's' : ''}`;
  dashLayout('/promote', html`<h1>Promote & Ads</h1>
  <p class="muted">Nothing is charged by the website. You pay the marketplace by UPI or Razorpay, and the team switches it on after they see your money.</p>
  ${!tablesOk ? html`<div class="flash error">Promotions are not set up yet. The administrator must run the latest <code>supabase.sql</code>.</div>` : html`
  <div class="panel"><h2>⭐ Promote my shop</h2><p>Promoted shops are shown <b>first</b> in town and category lists and in “Featured shops” on the home page.</p>
    ${isFeatured(sh) ? html`<p><span class="tag gold">★ Promoted</span> until <b>${sh.featured_until}</b></p>` : ''}
    ${pp ? html`<form data-form="promocreate">${daysBox(pp, 'prd')}<br><button class="btn gold" type="submit">Continue to payment</button></form>`
        : html`<p class="notice">Promotion rates have not been published yet. <a href="#/contact">Ask the team</a>.</p>`}
    ${promos.filter(r => r.status === 'open').map(r => html`<div class="panel" style="margin-top:12px"><b>${dayTxt(r.days || r.weeks * 7)} promotion — ${inr(r.amount)}</b> <span class="tag gold">waiting</span>
      ${r.pay_ref ? claimView(r) : html`${payOptions({ amount: r.amount, note: `${siteName()} promote - ${sh.name}`, type: 'promo', id: r.id }) || html`<p class="small muted">Online payment is not switched on yet. Please contact the team.</p>`}`}</div>`)}
    ${promos.filter(r => r.status !== 'open').length ? html`<p class="small muted">Earlier: ${promos.filter(r => r.status !== 'open').map(r => `${r.days || r.weeks * 7}d ${r.status} (${dOnly(r.created_at)})`).join(' · ')}</p>` : ''}</div>
  <div class="panel"><h2>📣 Banner advertisement</h2><p>Your banner appears between the products on the <b>home page</b> and category pages, marked “${adLabel()}”. The team checks every banner before it goes live.</p>
    ${ap ? html`<form data-form="adcreate" novalidate>${field('Headline (3–80 letters)', 'title', '', 'type="text" required maxlength="80"')}${field('Short text (optional)', 'body', '', 'type="text" maxlength="160"')}
      <label for="f_product_id">Open this when tapped</label><select id="f_product_id" name="product_id"><option value="">My shop page</option>${prods.map(p => html`<option value="${p.id}">${p.name}</option>`)}</select>
      <label for="f_adimage">Banner picture (optional, landscape looks best)</label><img id="preview_ad" alt="" width="200" height="100" style="display:none;border-radius:12px;margin-bottom:8px;object-fit:cover"><input id="f_adimage" type="file" name="image" accept="image/jpeg,image/png,image/webp" data-preview="preview_ad">
      ${daysBox(ap, 'add')}
      <button class="btn gold" style="margin-top:14px" type="submit">Continue to payment</button></form>` : html`<p class="notice">Advertising rates have not been published yet. <a href="#/contact">Ask the team</a>.</p>`}</div>
  ${ads.length ? html`<h2>Your ads</h2>${ads.map(a => html`<div class="panel"><div class="row between"><b>${a.title}</b><span class="tag ${a.status === 'approved' ? '' : a.status === 'rejected' ? 'red' : 'gold'}">${a.status}</span></div>
    <p class="small muted">${dayTxt(a.days || a.weeks * 7)} · ${inr(a.amount)}${a.status === 'approved' ? ` · runs ${a.starts_on} to ${a.ends_on}${a.ends_on < today ? ' (ended)' : ''}` : ''}</p>
    ${imgUrl(a.image) ? html`<img src="${imgUrl(a.image)}" alt="" width="200" height="100" style="border-radius:12px;object-fit:cover">` : ''}${a.admin_note ? html`<p class="notice"><b>Team note:</b> ${a.admin_note}</p>` : ''}
    ${a.status === 'pending' ? (a.pay_ref ? claimView(a) : payOptions({ amount: a.amount, note: `${siteName()} ad - ${sh.name}`, type: 'ad', id: a.id }) || html`<p class="small muted">Online payment is not switched on yet. Please contact the team.</p>`) : ''}
    ${a.status === 'pending' ? html`<button class="btn danger small" style="margin-top:8px" type="button" data-act="delad" data-id="${a.id}">Delete this ad</button>` : ''}</div>`)}` : ''}`}`, 'Promote');
  renderQRs();
});

route('/dashboard/commission', async () => {
  if (!ownerGuard()) return; const sh = S.shop; const pct = parseFloat(setting('commission_pct')) || 0;
  let orders = [], pays = [], claims = [], ok = true;
  try { [orders, pays, claims] = await Promise.all([sb.from('orders').select('code,total,commission_pct,commission_amount,created_at').eq('shop_id', sh.id).eq('status', 'delivered').order('id', { ascending: false }).limit(2000), sb.from('payments').select('amount,created_at,reference').eq('shop_id', sh.id).eq('kind', 'commission').order('id', { ascending: false }), sb.from('commission_claims').select('*').eq('shop_id', sh.id).order('id', { ascending: false }).limit(10)]).then(r => r.map(must)); } catch (e) { ok = false; }
  const earned = orders.reduce((a, o) => a + Number(o.commission_amount), 0), paid = pays.reduce((a, p) => a + p.amount, 0); const due = Math.max(0, Math.round(earned - paid)); const open = claims.find(c => c.status === 'open');
  dashLayout('/commission', html`<h1>Commission</h1>
  <p class="muted">The marketplace charges ${pct > 0 ? html`<b>${pct}%</b> of the item value` : 'no commission right now'} on each <b>delivered</b> order. Customers pay <i>you</i> directly, so you pay the commission to the marketplace. Nothing is taken automatically.</p>
  ${!ok ? html`<div class="flash error">Commission payments are not set up yet. The administrator must run the latest <code>supabase.sql</code>.</div>` : html`
  <div class="stats"><div class="stat"><b>${inr(earned)}</b><span>Commission earned</span></div><div class="stat"><b>${inr(paid)}</b><span>Paid (confirmed)</span></div><div class="stat"><b>${inr(due)}</b><span>Due now</span></div></div>
  ${open ? html`<div class="panel"><b>Payment of ${inr(open.amount)}</b> <span class="tag gold">waiting for the team</span>
    ${open.pay_ref ? claimView(open) : html`${payOptions({ amount: open.amount, note: `${siteName()} commission - ${sh.name}`, type: 'comm', id: open.id }) || html`<p class="small muted">Online payment is not switched on yet. Please contact the team to pay.</p>`}`}</div>`
    : due >= 1 ? html`<form class="panel" data-form="commcreate"><p>You owe <b>${inr(due)}</b>.</p><button class="btn gold" type="submit">Pay ${inr(due)} now</button><p class="hint">Next you will see UPI / Razorpay options. Your commission is marked paid only after the team sees the money.</p></form>` : html`<div class="notice">Nothing due right now. 🎉</div>`}
  ${orders.length ? html`<div class="panel"><h2>Delivered orders</h2><div class="tablewrap"><table class="t"><tr><th>Order</th><th>Order total</th><th>%</th><th>Commission</th></tr>${orders.slice(0, 50).map(o => html`<tr><td>${o.code}<br><span class="muted small">${dOnly(o.created_at)}</span></td><td>${inr(o.total)}</td><td>${o.commission_pct}%</td><td>${inr(o.commission_amount)}</td></tr>`)}</table></div></div>` : ''}
  ${pays.length ? html`<div class="panel"><h2>Commission payments confirmed</h2><div class="tablewrap"><table class="t"><tr><th>Date</th><th>Amount</th><th>Reference</th></tr>${pays.map(p => html`<tr><td>${dOnly(p.created_at)}</td><td>${inr(p.amount)}</td><td>${p.reference}</td></tr>`)}</table></div></div>` : ''}`}`, 'Commission');
  renderQRs();
});

route('/dashboard/support', async () => {
  if (!ownerGuard()) return; const tickets = must(await sb.from('tickets').select('*').eq('shop_id', S.shop.id).order('id', { ascending: false }));
  dashLayout('/support', html`<h1>${t('support')}</h1><form class="panel" data-form="ownerticket">${field('Subject', 'subject', '', 'type="text" required maxlength="120"')}
    <label for="f_message">Message</label><textarea id="f_message" name="message" required maxlength="2000"></textarea><button class="btn gold" style="margin-top:14px" type="submit">${t('send')}</button></form>
  ${tickets.length ? html`<h2>Your messages</h2>${tickets.map(tk => html`<div class="panel"><b>${tk.subject}</b> <span class="tag ${tk.status === 'resolved' ? 'grey' : 'gold'}">${tk.status}</span><br><span class="muted small">${dt(tk.created_at)}</span><p style="white-space:pre-line">${tk.message}</p>${tk.admin_note ? html`<p class="notice"><b>Team reply:</b> ${tk.admin_note}</p>` : ''}</div>`)}` : ''}`, 'Support');
});

route('/dashboard/password', async () => {
  if (!S.user) { location.hash = '#/login'; return; }
  const inner = html`<h1>Change password</h1><form class="panel" data-form="resetpw" style="max-width:460px"><label for="f_new">New password (8+ characters)</label><input id="f_new" name="new" type="password" required minlength="8" autocomplete="new-password">
    <label for="f_new2">Repeat new password</label><input id="f_new2" name="new2" type="password" required minlength="8" autocomplete="new-password"><button class="btn gold block" style="margin-top:18px" type="submit">${t('save')}</button></form>`;
  if (S.shop) dashLayout('/password', inner, 'Password'); else view(html`<div class="wrap" style="padding:20px 16px">${inner}</div>`, { noindex: true });
});

/* =====================================================================
   ADMIN
   ===================================================================== */
function adminGuard() {
  if (!S.user) { location.hash = '#/login'; return false; }
  if (!S.profile || S.profile.role !== 'admin') { view(html`<div class="form-card center"><h1>403</h1><p>You do not have permission to open this page.</p><a class="btn" href="#/">${t('home')}</a></div>`, { noindex: true }); return false; }
  return true;
}
function adminLayout(active, inner, title) {
  const l = (p, label) => html`<a class="${active === p ? 'on' : ''}" href="#/admin${p}">${label}</a>`;
  view(html`<div class="wrap"><div class="dash"><nav class="side" aria-label="Admin">${l('', '📊 Overview')}${l('/shops', '🏪 Shops')}${l('/products', '📦 Products')}${l('/orders', '🧾 Orders')}${l('/customers', '👥 Customers')}${l('/owners', '🔑 Shop owners')}${l('/categories', '🗂️ Categories')}${l('/plans', '⭐ Plans')}${l('/promotions', '📣 Ads & promotions')}${l('/payments', '💰 Payments')}${l('/commissions', '📑 Commissions')}${l('/tickets', '💬 Complaints')}${l('/settings', '⚙️ Settings')}<a href="#/dashboard/password">🔒 Password</a></nav><div>${inner}</div></div></div>`,
    { title: `${title || 'Admin'} | ${siteName()}`, noindex: true });
}
const one = x => (Array.isArray(x) ? x[0] : x) || {};
const shopTag = s => html`<span class="tag ${s === 'pending' ? 'gold' : (s === 'rejected' || s === 'suspended') ? 'red' : ''}">${s}</span>`;

route('/admin', async () => {
  if (!adminGuard()) return;
  const [st, pending, pendAds, openPromos] = await Promise.all([sb.rpc('admin_stats'), sb.from('shops').select('*, profiles(phone,full_name)').eq('status', 'pending').order('id'),
    sb.from('ads').select('id', { count: 'exact', head: true }).eq('status', 'pending').then(r => r.count || 0, () => 0), sb.from('promo_requests').select('id', { count: 'exact', head: true }).eq('status', 'open').then(r => r.count || 0, () => 0)]);
  const s = must(st); const pend = must(pending); const card = (n, l) => html`<div class="stat"><b>${n}</b><span>${l}</span></div>`;
  adminLayout('', html`<h1>Overview</h1><p class="muted small">All figures are real totals from the database. “Revenue” is the sum of payments you recorded as received (subscriptions, featured listings, ads, commission). The website itself does not collect money.</p>
  <div class="stats">${card(s.shops_total, 'Registered shops')}${card(s.shops_live, 'Live shops')}${card(s.shops_pending, 'Waiting approval')}${card(s.shops_suspended, 'Suspended')}${card(s.orders, 'Total orders')}${card(s.orders_30, 'Orders, last 30 days')}${card(s.customers, 'Customers (unique phones)')}${card(s.products, 'Products listed')}
    ${card(inr(s.gmv), 'Delivered order value')}${card(inr(s.revenue), 'Platform revenue recorded')}${card(inr(s.revenue_30), 'Revenue, last 30 days')}${card(inr(s.commission_earned), 'Commission earned (delivered)')}${card(s.tickets_open, 'Open complaints')}${card(s.plan_requests, 'Plan requests')}</div>
  ${pendAds + openPromos ? html`<div class="notice"><b>${pendAds}</b> ad(s) and <b>${openPromos}</b> promotion request(s) waiting. <a href="#/admin/promotions">Open →</a></div>` : ''}
  <div class="panel"><h2>Shops waiting for approval</h2>${pend.length ? html`<div class="tablewrap"><table class="t"><tr><th>Shop</th><th>Place</th><th>Owner phone</th><th>Registered</th><th></th></tr>${pend.map(x => html`<tr><td><b>${x.name}</b></td><td>${x.town} ${x.pincode}</td><td>${one(x.profiles).phone || ''}</td><td>${dOnly(x.created_at)}</td><td><a class="btn small" href="#/admin/shop/${x.id}">Review</a></td></tr>`)}</table></div>` : emptyBox('No shops waiting.')}</div>`, 'Overview');
});

route('/admin/shops', async (_m, q) => {
  if (!adminGuard()) return; const status = q.get('status') || ''; const term = filterTerm(q.get('q') || ''); const page = pageNum(q); const [a, b] = range(page, 30);
  let query = sb.from('shops').select('*, categories(name_en), profiles(phone,full_name)', { count: 'exact' });
  if (['pending', 'approved', 'rejected', 'suspended'].includes(status)) query = query.eq('status', status);
  if (term) query = query.or(`name.ilike."%${term}%",town.ilike."%${term}%",pincode.ilike."%${term}%"`);
  const res = await query.order('id', { ascending: false }).range(a, b); const rows = must(res);
  adminLayout('/shops', html`<h1>Shops (${res.count || 0})</h1><form class="row mb" data-form="adminfilter" data-base="#/admin/shops"><input type="search" name="q" value="${term}" placeholder="Name, town, PIN" style="max-width:260px">
    <select name="status" style="max-width:180px"><option value="">All statuses</option>${['pending', 'approved', 'rejected', 'suspended'].map(s => html`<option ${status === s ? raw('selected') : ''}>${s}</option>`)}</select><button class="btn" type="submit">Filter</button></form>
  <div class="tablewrap"><table class="t"><tr><th>Shop</th><th>Place</th><th>Owner</th><th>Status</th><th></th></tr>${rows.map(s => html`<tr><td><b>${s.name}</b><br><span class="muted small">${one(s.categories).name_en || ''}</span></td><td>${s.town}<br><span class="muted small">${s.pincode}</span></td><td>${s.owner_name}<br><span class="muted small">${one(s.profiles).phone || ''}</span></td><td>${shopTag(s.status)}</td><td><a class="btn small" href="#/admin/shop/${s.id}">Manage</a></td></tr>`)}</table></div>
  ${pager(page, Math.ceil((res.count || 0) / 30), `#/admin/shops?status=${enc(status)}&q=${enc(term)}`)}`, 'Shops');
});

route('/admin/shop/(\\d+)', async ([id]) => {
  if (!adminGuard()) return;
  const [sr, pr, rr, or_, pc] = await Promise.all([
    sb.from('shops').select('*, profiles(phone,full_name)').eq('id', id).maybeSingle(), sb.from('payments').select('*').eq('shop_id', id).order('id', { ascending: false }),
    sb.from('plan_requests').select('*, plans(name)').eq('shop_id', id).order('id', { ascending: false }),
    sb.from('orders').select('total,status').eq('shop_id', id).limit(5000), sb.from('products').select('id', { count: 'exact', head: true }).eq('shop_id', id)]);
  const s = must(sr); if (!s) return notFound(); const orders = must(or_); const plan = effPlan(s); const openReq = must(rr).filter(r => r.status === 'open');
  adminLayout('/shops', html`<div class="row between"><h1>${s.name}</h1>${shopTag(s.status)}</div>
  <div class="panel"><p><b>Owner:</b> ${s.owner_name} · ${one(s.profiles).phone || ''}<br><b>Address:</b> ${s.address}, ${s.locality} ${s.town} ${s.district} ${s.pincode}<br><b>WhatsApp:</b> <a target="_blank" rel="noopener" href="${waLink(s.whatsapp)}">${s.whatsapp}</a>${isHttps(s.map_link) ? html` · <a target="_blank" rel="noopener" href="${s.map_link}">Map</a>` : ''}<br>
    <b>Registered:</b> ${dt(s.created_at)} · ${pc.count || 0} products · ${orders.length} orders · ${inr(orders.filter(o => o.status === 'delivered').reduce((a, o) => a + o.total, 0))} delivered sales</p>
    ${s.description ? html`<p>${s.description}</p>` : ''}<a class="btn ghost small" href="#/s/${enc(s.slug)}">View storefront</a></div>
  <div class="panel"><h2>Approval</h2><form data-form="adminshop" data-id="${s.id}"><label for="f_note">Note to the shop owner (shown if rejected or suspended)</label><input id="f_note" name="note" value="${s.status_note}" maxlength="300">
    <div class="row" style="margin-top:12px">${['pending', 'rejected'].includes(s.status) ? html`<button class="btn" type="submit" name="action" value="approved">✅ Approve</button>` : ''}${['pending', 'approved'].includes(s.status) ? html`<button class="btn danger" type="submit" name="action" value="rejected">Reject</button>` : ''}
      ${s.status === 'approved' ? html`<button class="btn danger" type="submit" name="action" value="suspended">Suspend</button>` : ''}${s.status === 'suspended' ? html`<button class="btn" type="submit" name="action" value="approved">Reinstate</button>` : ''}</div></form></div>
  <div class="panel"><h2>Plan</h2><p>Current: <b>${plan.name}</b>${s.plan_until ? ` (set to expire ${s.plan_until})` : ''}</p>${openReq.map(r => html`<div class="notice">Open request for <b>${r.plans ? r.plans.name : ''}</b> (${dOnly(r.created_at)}).${r.pay_method ? html` Shop says it paid <b>${inr(r.amount)}</b> by <b>${r.pay_method.toUpperCase()}</b>, reference <b>${r.pay_ref}</b>. <u>Check this in your bank / Razorpay dashboard first.</u> Do not trust it until you see the money.` : ''} Record the payment below, then set the plan here.</div>`)}
    <form class="row" data-form="adminplan" data-id="${s.id}"><select name="plan_id" style="max-width:240px">${S.plans.map(p => html`<option value="${p.id}" ${s.plan_id === p.id ? raw('selected') : ''}>${p.name} (${inr(p.price)})</option>`)}</select><input type="date" name="plan_until" value="${s.plan_until || ''}" style="max-width:190px" aria-label="Valid until"><button class="btn" type="submit">Save plan</button></form>
    <p class="hint">A paid plan applies only until the “valid until” date, then the shop falls back to the free plan automatically.</p></div>
  <div class="panel"><h2>Featured listing</h2><p>${s.featured_until ? html`Featured until <b>${s.featured_until}</b>` : 'Not featured'}</p><form class="row" data-form="adminfeatured" data-id="${s.id}"><input type="date" name="featured_until" value="${s.featured_until || ''}" style="max-width:190px"><button class="btn" type="submit">Save</button></form>
    <p class="hint">Leave the date empty to remove the featured badge. Record any fee received in Payments below.</p></div>
  <div class="panel"><h2>Record a payment received</h2><p class="hint">Use this when a shop has paid you outside the website (UPI, bank, cash). Nothing is charged by the app.</p>
    <form data-form="adminpayment" data-id="${s.id}"><div class="grid2"><div>${field('Amount (₹)', 'amount', '', 'type="number" min="1" required')}</div><div><label for="f_kind">Type</label><select id="f_kind" name="kind"><option value="subscription">Subscription</option><option value="featured">Featured listing</option><option value="advert">Advertisement</option><option value="commission">Commission</option><option value="other">Other</option></select></div>
      <div>${field('Reference (UPI ref / receipt no.)', 'reference', '', 'type="text" maxlength="80"')}</div><div>${field('Note', 'note', '', 'type="text" maxlength="200"')}</div></div><button class="btn" style="margin-top:12px" type="submit">Record payment</button></form>
    ${must(pr).length ? html`<div class="tablewrap" style="margin-top:14px"><table class="t"><tr><th>Date</th><th>Type</th><th>Amount</th><th>Ref</th><th>Note</th></tr>${must(pr).map(r => html`<tr><td>${dOnly(r.created_at)}</td><td>${r.kind}</td><td>${inr(r.amount)}</td><td>${r.reference}</td><td>${r.note}</td></tr>`)}</table></div>` : ''}</div>`, s.name);
});

route('/admin/products', async (_m, q) => {
  if (!adminGuard()) return; const term = filterTerm(q.get('q') || ''); const page = pageNum(q); const [a, b] = range(page, 40);
  let query = sb.from('products').select('*, shops(name)', { count: 'exact' }); if (term) query = query.ilike('name', `%${term}%`);
  const res = await query.order('id', { ascending: false }).range(a, b); const rows = must(res);
  adminLayout('/products', html`<h1>Products (${res.count || 0})</h1><form class="row mb" data-form="adminfilter" data-base="#/admin/products"><input type="search" name="q" value="${term}" placeholder="Product name" style="max-width:260px"><button class="btn" type="submit">Search</button></form>
  <div class="tablewrap"><table class="t"><tr><th>Product</th><th>Shop</th><th>Price</th><th>State</th><th></th></tr>${rows.map(p => html`<tr><td><b>${p.name}</b></td><td>${one(p.shops).name || ''}</td><td>${inr(effPrice(p))}</td>
    <td>${p.blocked ? html`<span class="tag red">Blocked</span>` : !p.active ? html`<span class="tag grey">Hidden</span>` : html`<span class="tag">Live</span>`}</td>
    <td><button class="btn small ${p.blocked ? 'ghost' : 'danger'}" type="button" data-act="blockproduct" data-id="${p.id}" data-val="${p.blocked ? 1 : 0}">${p.blocked ? 'Unblock' : 'Block'}</button></td></tr>`)}</table></div>
  ${pager(page, Math.ceil((res.count || 0) / 40), '#/admin/products?q=' + enc(term))}`, 'Products');
});

route('/admin/orders', async (_m, q) => {
  if (!adminGuard()) return; const status = q.get('status') || ''; const page = pageNum(q); const [a, b] = range(page, 40);
  let query = sb.from('orders').select('*, shops(name)', { count: 'exact' }); if (STATUSES.includes(status)) query = query.eq('status', status);
  const res = await query.order('id', { ascending: false }).range(a, b); const rows = must(res);
  adminLayout('/orders', html`<h1>Orders (${res.count || 0})</h1><div class="row gap-s mb"><a class="tag ${!status ? 'gold' : ''}" href="#/admin/orders">All</a>${STATUSES.map(s => html`<a class="tag ${status === s ? 'gold' : ''}" href="#/admin/orders?status=${s}">${t('s_' + s)}</a>`)}</div>
  <div class="tablewrap"><table class="t"><tr><th>#</th><th>Shop</th><th>Customer</th><th>Total</th><th>Status</th></tr>${rows.map(o => html`<tr><td><b>${o.code}</b><br><span class="muted small">${dt(o.created_at)}</span></td><td>${one(o.shops).name || ''}</td><td>${o.customer_name}<br><span class="muted small">${o.customer_phone}</span></td><td>${inr(o.total)}</td><td>${statusBadge(o.status)}</td></tr>`)}</table></div>
  ${pager(page, Math.ceil((res.count || 0) / 40), '#/admin/orders?status=' + status)}`, 'Orders');
});

route('/admin/customers', async () => {
  if (!adminGuard()) return; const rows = must(await sb.from('orders').select('customer_name,customer_phone,total,status,created_at').order('created_at', { ascending: false }).limit(3000));
  const map = {}; rows.forEach(o => { const c = map[o.customer_phone] = map[o.customer_phone] || { phone: o.customer_phone, name: o.customer_name, orders: 0, spent: 0, last: o.created_at }; c.orders++; if (o.status === 'delivered') c.spent += o.total; });
  const list = Object.values(map);
  adminLayout('/customers', html`<h1>Customers</h1><p class="muted small">Customers order without an account, so this list is built from order records (grouped by phone number; the latest 3000 orders).</p>
  ${list.length ? html`<div class="tablewrap"><table class="t"><tr><th>Name</th><th>Phone</th><th>Orders</th><th>Delivered value</th><th>Last order</th></tr>${list.map(c => html`<tr><td>${c.name}</td><td>${c.phone}</td><td>${c.orders}</td><td>${inr(c.spent)}</td><td>${dOnly(c.last)}</td></tr>`)}</table></div>` : emptyBox('No customers yet.')}`, 'Customers');
});

route('/admin/owners', async () => {
  if (!adminGuard()) return; const rows = must(await sb.from('profiles').select('*, shops(id,name,status)').eq('role', 'owner').order('created_at', { ascending: false }));
  adminLayout('/owners', html`<h1>Shop owners</h1>${rows.length ? html`<div class="tablewrap"><table class="t"><tr><th>Name</th><th>Phone</th><th>Shop</th><th>Registered</th></tr>${rows.map(o => { const s = one(o.shops); return html`<tr><td>${o.full_name}</td><td>${o.phone}</td><td>${s.id ? html`<a href="#/admin/shop/${s.id}">${s.name}</a> ${shopTag(s.status)}` : ''}</td><td>${dOnly(o.created_at)}</td></tr>`; })}</table></div>` : emptyBox('No shop owners yet.')}
  <p class="hint" style="margin-top:12px">Owners reset their own password with “Forgot password” on the login page. To block an owner, suspend their shop.</p>`, 'Shop owners');
});

route('/admin/categories', async () => {
  if (!adminGuard()) return;
  adminLayout('/categories', html`<h1>Categories</h1><div class="panel"><h2>Add a category</h2><form class="row" data-form="catadd"><input name="name_en" placeholder="English name" required maxlength="40" style="max-width:200px"><input name="name_ml" placeholder="മലയാളം name" maxlength="40" style="max-width:200px"><input name="icon" placeholder="🛍️" maxlength="4" style="max-width:80px"><input name="sort" type="number" placeholder="Order" style="max-width:100px"><button class="btn" type="submit">Add</button></form></div>
  <div class="tablewrap"><table class="t"><tr><th>Icon</th><th>English</th><th>മലയാളം</th><th>Order</th><th>Active</th><th></th></tr>${S.cats.concat(S.inactiveCats || []).sort((a, b) => a.sort - b.sort).map(c => html`<tr><td><form id="catf${c.id}" data-form="catsave" data-id="${c.id}"></form><input form="catf${c.id}" name="icon" value="${c.icon}" maxlength="4" style="width:70px"></td><td><input form="catf${c.id}" name="name_en" value="${c.name_en}" maxlength="40" style="min-width:140px"></td><td><input form="catf${c.id}" name="name_ml" value="${c.name_ml}" maxlength="40" style="min-width:140px"></td>
    <td><input form="catf${c.id}" name="sort" type="number" value="${c.sort}" style="width:80px"></td><td><input form="catf${c.id}" type="checkbox" name="active" value="1" ${c.active ? raw('checked') : ''} style="width:24px;height:24px"></td><td><button class="btn small" type="submit" form="catf${c.id}">Save</button></td></tr>`)}</table></div>`, 'Categories');
});

route('/admin/plans', async () => {
  if (!adminGuard()) return; const reqs = must(await sb.from('plan_requests').select('*, shops(name), plans(name,price)').eq('status', 'open').order('id'));
  adminLayout('/plans', html`<h1>Subscription plans</h1>
  ${reqs.length ? html`<div class="panel"><h2>Upgrade requests</h2><div class="tablewrap"><table class="t"><tr><th>Shop</th><th>Plan</th><th>Payment claimed</th><th>Requested</th><th></th></tr>${reqs.map(r => html`<tr><td><a href="#/admin/shop/${r.shop_id}">${one(r.shops).name}</a></td><td>${one(r.plans).name} (${inr(one(r.plans).price)})</td><td>${r.pay_method ? html`<b>${r.pay_method.toUpperCase()}</b> ${inr(r.amount)}<br><span class="small">${r.pay_ref}</span>` : html`<span class="muted">not paid yet</span>`}</td><td>${dOnly(r.created_at)}</td><td><button class="btn ghost small" type="button" data-act="dismissreq" data-id="${r.id}">Dismiss</button></td></tr>`)}</table></div>
    <p class="hint">Check the claimed payment in your bank or Razorpay dashboard, record it on the shop page, then set the plan and its end date.</p></div>` : ''}
  <div class="panel"><h2>Add a plan</h2><form class="row" data-form="planadd"><input name="name" placeholder="Name" required maxlength="40" style="max-width:180px"><input name="price" type="number" placeholder="₹ / month" min="0" required style="max-width:130px"><input name="max_products" type="number" placeholder="Max products (0=unlimited)" min="0" style="max-width:220px"><input name="max_orders_month" type="number" placeholder="Max orders / month (0=unlimited)" min="0" style="max-width:250px"><input name="description" placeholder="Description shown to shops" maxlength="300" style="max-width:300px"><button class="btn" type="submit">Add</button></form></div>
  ${S.plans.map(p => html`<form class="panel" data-form="plansave" data-id="${p.id}"><div class="grid2"><div>${field('Name', 'name', p.name, 'maxlength="40"')}</div><div>${field('Price (₹ per month)', 'price', p.price, 'type="number" min="0"')}</div><div>${field('Max products (0 = unlimited)', 'max_products', p.max_products, 'type="number" min="0"')}</div><div>${field('Max orders per month (0 = unlimited)', 'max_orders_month', p.max_orders_month, 'type="number" min="0"')}</div><div>${field('Order', 'sort', p.sort, 'type="number"')}</div></div>
    ${field('Description', 'description', p.description, 'maxlength="300"')}${checkbox('Offered to shops', 'active', p.active)}<button class="btn small" type="submit">Save</button></form>`)}`, 'Plans');
});

route('/admin/promotions', async () => {
  if (!adminGuard()) return; const today = todayIST();
  const [ads, promos] = await Promise.all([sb.from('ads').select('*, shops(name,slug,town)').order('id', { ascending: false }).limit(100), sb.from('promo_requests').select('*, shops(name,featured_until)').order('id', { ascending: false }).limit(60)]);
  const A = must(ads), P = must(promos); const claim = r => r.pay_ref ? html`<b>${r.pay_method.toUpperCase()}</b> ${inr(r.amount)} · ref <b>${r.pay_ref}</b>` : html`<span class="muted">no payment reported</span>`;
  const warn = html`<p class="hint"><u>Check the payment in your bank / Razorpay dashboard first.</u> A reference typed by a shop is only a claim.</p>`;
  adminLayout('/promotions', html`<h1>Ads & promotions</h1>
  <h2>Promotion requests (featured shops)</h2>
  ${P.filter(r => r.status === 'open').length ? P.filter(r => r.status === 'open').map(r => { const base = r.shops.featured_until && r.shops.featured_until > today ? r.shops.featured_until : today; return html`<form class="panel" data-form="promoact" data-id="${r.id}" data-shop="${r.shop_id}" data-days="${r.days || r.weeks * 7}" data-base="${base}" data-amount="${r.amount}" data-ref="${r.pay_ref}">
    <b><a href="#/admin/shop/${r.shop_id}">${r.shops.name}</a></b> — ${r.days || r.weeks * 7} day(s), ${inr(r.amount)} · ${dOnly(r.created_at)}<br>${claim(r)}${warn}
    <p class="small">If activated, the shop is promoted until <b>${addDays(base, r.days || r.weeks * 7)}</b>.</p>${r.pay_ref ? checkbox('Also record ' + inr(r.amount) + ' in Payments', 'rec', true) : ''}
    <div class="row"><button class="btn small" type="submit" name="action" value="activate">✅ Activate</button><button class="btn danger small" type="submit" name="action" value="dismiss">Dismiss</button></div></form>`; }) : emptyBox('No open promotion requests.')}
  <h2 style="margin-top:24px">Banner ads</h2>
  ${A.length ? A.map(a => html`<form class="panel" data-form="adreview" data-id="${a.id}" data-shop="${a.shop_id}" data-amount="${a.amount}" data-ref="${a.pay_ref}" data-status="${a.status}">
    <div class="row between"><b>${a.title}</b><span class="tag ${a.status === 'approved' ? '' : a.status === 'pending' ? 'gold' : 'red'}">${a.status}</span></div>
    <p class="small muted"><a href="#/admin/shop/${a.shop_id}">${one(a.shops).name}</a> · ${a.days || a.weeks * 7} day(s) · ${inr(a.amount)} · ${dOnly(a.created_at)}<br>${a.body}</p>
    ${imgUrl(a.image) ? html`<img src="${imgUrl(a.image)}" alt="" width="240" height="120" style="border-radius:12px;object-fit:cover">` : ''}<p>${claim(a)}</p>${a.status === 'pending' ? warn : ''}
    <div class="grid2"><div><label>Starts</label><input type="date" name="starts_on" value="${a.starts_on || today}"></div><div><label>Ends</label><input type="date" name="ends_on" value="${a.ends_on || addDays(today, a.days || a.weeks * 7)}"></div></div>
    <label>Note to the shop (shown if rejected)</label><input name="admin_note" value="${a.admin_note}" maxlength="300">
    ${a.status === 'pending' && a.pay_ref ? checkbox('When approving, also record ' + inr(a.amount) + ' in Payments', 'rec', true) : ''}
    <div class="row" style="margin-top:10px">${a.status !== 'approved' ? html`<button class="btn small" type="submit" name="action" value="approved">✅ Approve</button>` : html`<button class="btn small" type="submit" name="action" value="approved">Save dates</button>`}
      ${a.status === 'approved' ? html`<button class="btn ghost small" type="submit" name="action" value="paused">Pause</button>` : ''}${a.status !== 'rejected' ? html`<button class="btn danger small" type="submit" name="action" value="rejected">Reject</button>` : ''}
      <button class="btn danger small" type="button" data-act="adremove" data-id="${a.id}">Delete</button></div></form>`) : emptyBox('No ads yet.')}`, 'Ads');
});

route('/admin/payments', async () => {
  if (!adminGuard()) return; const rows = must(await sb.from('payments').select('*, shops(name)').order('id', { ascending: false }).limit(500)); const totals = {};
  rows.forEach(r => { totals[r.kind] = totals[r.kind] || { amount: 0, n: 0 }; totals[r.kind].amount += r.amount; totals[r.kind].n++; });
  adminLayout('/payments', html`<h1>Payments received</h1><p class="muted small">A manual record of money you received outside the website. Add entries from each shop's page. These records are the platform revenue shown on the Overview.</p>
  ${Object.keys(totals).length ? html`<div class="stats">${Object.entries(totals).map(([k, v]) => html`<div class="stat"><b>${inr(v.amount)}</b><span>${k} (${v.n})</span></div>`)}</div>` : ''}
  ${rows.length ? html`<div class="tablewrap"><table class="t"><tr><th>Date</th><th>Shop</th><th>Type</th><th>Amount</th><th>Reference</th><th>Note</th></tr>${rows.map(r => html`<tr><td>${dOnly(r.created_at)}</td><td><a href="#/admin/shop/${r.shop_id}">${one(r.shops).name}</a></td><td>${r.kind}</td><td>${inr(r.amount)}</td><td>${r.reference}</td><td>${r.note}</td></tr>`)}</table></div>` : emptyBox('No payments recorded yet.')}`, 'Payments');
});

route('/admin/commissions', async () => {
  if (!adminGuard()) return;
  const [ords, pays] = await Promise.all([sb.from('orders').select('shop_id,commission_amount,shops(name)').eq('status', 'delivered').limit(10000), sb.from('payments').select('shop_id,amount').eq('kind', 'commission')]);
  const m = {}; must(ords).forEach(o => { const r = m[o.shop_id] = m[o.shop_id] || { id: o.shop_id, name: one(o.shops).name, earned: 0, paid: 0, delivered: 0 }; r.earned += Number(o.commission_amount); r.delivered++; });
  must(pays).forEach(p => { const r = m[p.shop_id] = m[p.shop_id] || { id: p.shop_id, name: '#' + p.shop_id, earned: 0, paid: 0, delivered: 0 }; r.paid += p.amount; });
  const rows = Object.values(m).filter(r => r.earned > 0 || r.paid > 0).sort((a, b) => b.earned - a.earned);
  let claims = []; try { claims = must(await sb.from('commission_claims').select('*, shops(name)').eq('status', 'open').order('id')); } catch (e) { claims = []; }
  adminLayout('/commissions', html`<h1>Commissions</h1>
  ${claims.length ? html`<div class="panel"><h2>Payments reported by shops</h2><p class="hint"><u>Check the money in your bank / Razorpay dashboard first.</u> A reference typed by a shop is only a claim.</p>
    ${claims.map(c => html`<form class="row between" data-form="commact" data-id="${c.id}" data-shop="${c.shop_id}" data-amount="${c.amount}" data-ref="${c.pay_ref}" style="border-top:1px solid var(--line);padding:10px 0"><span><a href="#/admin/shop/${c.shop_id}">${one(c.shops).name}</a> — <b>${inr(c.amount)}</b> · ${c.pay_ref ? html`${c.pay_method.toUpperCase()} ref <b>${c.pay_ref}</b>` : html`<span class="muted">no payment reported yet</span>`}</span>
      <span class="row"><button class="btn small" type="submit" name="action" value="confirm">✅ Money received</button><button class="btn danger small" type="submit" name="action" value="dismiss">Dismiss</button></span></form>`)}</div>` : ''}<p class="muted small">Current commission rate: <b>${setting('commission_pct') || 0}%</b> of item value on delivered orders (change it in Settings; each order keeps the rate that applied when it was placed). “Due” = earned minus commission payments you recorded on the shop's page.</p>
  ${rows.length ? html`<div class="tablewrap"><table class="t"><tr><th>Shop</th><th>Delivered orders</th><th>Earned</th><th>Paid</th><th>Due</th></tr>${rows.map(r => html`<tr><td><a href="#/admin/shop/${r.id}">${r.name}</a></td><td>${r.delivered}</td><td>${inr(r.earned)}</td><td>${inr(r.paid)}</td><td><b>${inr(r.earned - r.paid)}</b></td></tr>`)}</table></div>` : emptyBox('No commission has been earned yet.')}`, 'Commissions');
});

route('/admin/tickets', async (_m, q) => {
  if (!adminGuard()) return; const status = q.get('status') || '';
  let query = sb.from('tickets').select('*, shops(name)'); if (['open', 'in_progress', 'resolved'].includes(status)) query = query.eq('status', status);
  const rows = must(await query.order('id', { ascending: false }).limit(300));
  adminLayout('/tickets', html`<h1>Complaints & support</h1><div class="row gap-s mb"><a class="tag ${!status ? 'gold' : ''}" href="#/admin/tickets">All</a>${['open', 'in_progress', 'resolved'].map(s => html`<a class="tag ${status === s ? 'gold' : ''}" href="#/admin/tickets?status=${s}">${s}</a>`)}</div>
  ${rows.length ? rows.map(tk => html`<form class="panel" data-form="ticketsave" data-id="${tk.id}"><b>${tk.subject}</b> <span class="tag ${tk.status === 'resolved' ? 'grey' : 'gold'}">${tk.status}</span><br>
    <span class="muted small">${tk.name} · <a href="tel:+91${tk.phone}">${tk.phone}</a> · ${dt(tk.created_at)}${tk.shop_id ? html` · Shop: <a href="#/admin/shop/${tk.shop_id}">${one(tk.shops).name}</a>` : ''}${tk.order_code ? ' · Order ' + tk.order_code : ''}</span>
    <p style="white-space:pre-line">${tk.message}</p><label>Reply / note (shop owners see this on their Support page)</label><input name="admin_note" value="${tk.admin_note}" maxlength="500">
    <div class="row" style="margin-top:10px"><select name="status" style="max-width:180px">${['open', 'in_progress', 'resolved'].map(s => html`<option ${tk.status === s ? raw('selected') : ''}>${s}</option>`)}</select><button class="btn small" type="submit">Save</button></div></form>`) : emptyBox('No messages.')}`, 'Support');
});

route('/admin/settings', async () => {
  if (!adminGuard()) return;
  adminLayout('/settings', html`<h1>Settings</h1><form class="panel" data-form="adminsettings">
  ${field('Marketplace name', 'site_name', setting('site_name'), 'maxlength="40" required')}<h2 style="margin-top:22px">Commission</h2>
  ${field('Order commission (% of item value on delivered orders, 0 = none)', 'commission_pct', setting('commission_pct'), 'type="number" min="0" max="30" step="0.1"')}<p class="hint">Applies only to new orders. Shown to shop owners on the Plans & charges page. Commission is recorded, not collected by the website.</p>
  <h2 style="margin-top:22px">Receive payments from shops</h2>
  <div class="grid2"><div>${field('Your UPI ID (e.g. name@bank)', 'upi_id', setting('upi_id'), 'maxlength="60" autocomplete="off"')}</div><div>${field('Name shown in the UPI app', 'upi_name', setting('upi_name'), 'maxlength="40"')}</div>
    <div>${field('Promote shop: price per day (₹)', 'promote_price_day', setting('promote_price_day'), 'type="number" min="0" inputmode="numeric"')}</div><div>${field('Banner ad: price per day (₹)', 'ad_price_day', setting('ad_price_day'), 'type="number" min="0" inputmode="numeric"')}</div>
    <div>${field('Razorpay Key ID (starts with rzp_)', 'razorpay_key_id', setting('razorpay_key_id'), 'maxlength="60" autocomplete="off" placeholder="rzp_live_..."')}</div></div>
  <p class="hint">Shops then see “Pay by UPI” and “Pay with Razorpay” on their Subscription page. Paste only the Razorpay <b>Key ID</b>, never the Key Secret. Plans are activated by you after you see the money in your bank / Razorpay dashboard; the website does not verify payments automatically. Leave a box empty to hide that option.</p>
  <h2 style="margin-top:22px">Business & contact details (shown on policy and contact pages)</h2>${field('Operator / business name', 'operator_name', setting('operator_name'), 'maxlength="120"')}
  <div class="grid2"><div>${field('Support email', 'contact_email', setting('contact_email'), 'type="email" maxlength="120"')}</div><div>${field('Support phone', 'contact_phone', setting('contact_phone'), 'type="tel" maxlength="20"')}</div><div>${field('Support WhatsApp (10 digits)', 'contact_whatsapp', setting('contact_whatsapp'), 'type="tel" maxlength="15"')}</div></div>
  <label for="f_contact_address">Business address</label><textarea id="f_contact_address" name="contact_address" maxlength="300" style="min-height:80px">${setting('contact_address')}</textarea>
  <h2 style="margin-top:22px">Text shown on the pricing page</h2><label for="f_featured_price_note">Featured listings</label><textarea id="f_featured_price_note" name="featured_price_note" maxlength="400" style="min-height:70px">${setting('featured_price_note')}</textarea>
  <label for="f_ad_note">Local advertisements</label><textarea id="f_ad_note" name="ad_note" maxlength="400" style="min-height:70px">${setting('ad_note')}</textarea>
  <button class="btn gold" style="margin-top:16px" type="submit">${t('save')}</button></form>`, 'Settings');
});

function notFound() { view(html`<div class="form-card center"><h1>404</h1><p>We could not find that page.</p><a class="btn" href="#/">${t('home')}</a></div>`, { title: 'Not found', noindex: true }); }

/* =====================================================================
   ACTIONS (buttons) and FORMS
   ===================================================================== */
async function addToCart(pid, shopId, stock, qty, el) {
  const cart = cartGet();
  if (cart.shopId && String(cart.shopId) !== String(shopId) && Object.keys(cart.items).length) {
    if (!confirmT('Your cart has items from another shop. Each order goes to one shop. Start a new cart?')) return;
    cart.items = {};
  }
  cart.shopId = Number(shopId); const limit = stock === '' || stock == null ? 99 : Number(stock);
  cart.items[pid] = Math.min((cart.items[pid] || 0) + qty, limit, 99); cartSet(cart); toast(t('add_to_cart') + ' ✓');
}
const actions = {
  appmode() {
    S.app = !S.app; ls.set('nk_app', S.app);
    if (Math.min(screen.width, screen.height) < 700) { location.reload(); return; } // phones: reload so the page width switches (website = compact desktop-style, app = phone layout)
    renderChrome(); window.scrollTo(0, 0);
    if (S.app) { toast(S.lang === 'ml' ? 'ആപ്പ് മോഡ്. താഴെ മെനു ഉപയോഗിക്കാം.' : 'App mode on. Use the menu at the bottom.'); if (S.installEvt) toast(S.lang === 'ml' ? 'ഫോണിൽ ഇൻസ്റ്റാൾ ചെയ്യാൻ "ഇൻസ്റ്റാൾ" ടാപ്പ് ചെയ്യുക.' : 'Tap "Install" to add it to your phone.'); }
  },
  async install() {
    if (S.installEvt) { S.installEvt.prompt(); try { await S.installEvt.userChoice; } catch (e) { /* ignore */ } S.installEvt = null; renderChrome(); return; }
    toast(S.lang === 'ml' ? 'ബ്രൗസർ മെനുവിൽ നിന്ന് "Add to Home screen" (iPhone: Share → Add to Home Screen) തിരഞ്ഞെടുക്കുക.' : 'In your browser menu choose "Add to Home screen" (iPhone: Share → Add to Home Screen).', 'ok');
  },
  lang(el) { S.lang = LANGS.some(l => l[0] === el.dataset.lang) ? el.dataset.lang : 'en'; ls.set('nk_lang', S.lang); renderChrome(); router(true); },
  clearplace() { S.place = ''; ls.set('nk_place', ''); renderChrome(); router(true); },
  async logout() { await sb.auth.signOut(); S.user = S.profile = S.shop = null; renderChrome(); location.hash = '#/'; },
  add(el) { return addToCart(el.dataset.id, el.dataset.shop, el.dataset.stock, 1, el); },
  cartremove(el) { const c = cartGet(); delete c.items[el.dataset.id]; if (!Object.keys(c.items).length) c.shopId = null; cartSet(c); router(true); },
  cartclear() { if (confirmT('Remove everything from the cart?')) { cartSet({ shopId: null, items: {} }); router(true); } },
  async ordercancel(el) { if (!confirmT('Cancel this order?')) return; const ok = must(await sb.rpc('cancel_order', { p_code: el.dataset.code })); toast(ok ? 'Your order has been cancelled.' : 'This order is already being prepared. Please contact the shop to cancel.', ok ? 'ok' : 'error'); router(true); },
  async togglestock(el) { must(await sb.from('products').update({ in_stock: el.dataset.val !== '1' }).eq('id', el.dataset.id).eq('shop_id', S.shop.id)); router(true); },
  async delproduct(el) {
    if (!confirmT(`Delete ${el.dataset.name}? This cannot be undone.`)) return;
    const p = must(await sb.from('products').select('image,image2,image3').eq('id', el.dataset.id).eq('shop_id', S.shop.id).maybeSingle());
    must(await sb.from('products').delete().eq('id', el.dataset.id).eq('shop_id', S.shop.id)); if (p) [p.image, p.image2, p.image3].forEach(removeImage); toast('Product deleted.'); router(true);
  },
  async planrequest(el) {
    if (!confirmT(`Send a request to the marketplace team to start ${el.dataset.name}? You are not charged by the website.`)) return;
    const ex = must(await sb.from('plan_requests').select('id').eq('shop_id', S.shop.id).eq('status', 'open'));
    if (ex.length) return toast('You already have an open upgrade request. We will contact you.', 'error');
    must(await sb.from('plan_requests').insert({ shop_id: S.shop.id, plan_id: Number(el.dataset.id) }));
    toast('Request sent. The team will contact you on WhatsApp with payment details. Your plan changes only after they confirm your payment.'); router(true);
  },
  async razorpay(el) {
    const key = setting('razorpay_key_id'); const type = el.dataset.type || 'plan'; let amount = Number(el.dataset.amount) || 0, desc = 'Payment';
    if (type === 'plan') { const p = S.plans.find(x => String(x.id) === el.dataset.id); if (!p) return; amount = p.price; desc = p.name + ' plan - 1 month'; } else desc = type === 'ad' ? 'Banner advertisement' : type === 'comm' ? 'Order commission' : 'Shop promotion';
    if (!key || amount < 1) return; await loadRazorpay();
    const rzp = new window.Razorpay({ key, amount: amount * 100, currency: 'INR', name: siteName(), description: desc, prefill: { name: S.shop.owner_name, email: S.user.email, contact: S.profile.phone || S.shop.whatsapp },
      notes: { shop_id: String(S.shop.id), type, ref_id: String(el.dataset.id) }, theme: { color: '#0f6b3e' },
      handler: r => { claimPay(type, el.dataset.id, 'razorpay', r.razorpay_payment_id, amount).then(() => { toast('Payment received by Razorpay (' + r.razorpay_payment_id + '). The team will confirm it and activate it.'); router(true); }).catch(e => toast('Paid, but saving failed: ' + e.message + ' Payment ID: ' + r.razorpay_payment_id, 'error')); } });
    rzp.on('payment.failed', r => toast('Payment failed: ' + ((r.error && r.error.description) || 'please try again'), 'error')); rzp.open();
  },
  async markpaid(el) { must(await sb.from('orders').update({ paid: el.dataset.val === '1' }).eq('id', el.dataset.id).eq('shop_id', S.shop.id)); toast(el.dataset.val === '1' ? 'Marked as paid.' : 'Marked as not paid.'); router(true); },
  async delad(el) {
    if (!confirmT('Delete this ad request?')) return;
    const a = must(await sb.from('ads').select('image').eq('id', el.dataset.id).eq('shop_id', S.shop.id).maybeSingle());
    must(await sb.from('ads').delete().eq('id', el.dataset.id).eq('shop_id', S.shop.id)); if (a) removeImage(a.image); router(true);
  },
  gal(el) { const m = document.getElementById('mainimg'); if (m) m.src = el.dataset.src; },
  async copylink(el) {
    const u = el.dataset.url; let ok = false;
    try { await navigator.clipboard.writeText(u); ok = true; } catch (e) { /* fall back below */ }
    if (!ok) { const ta = document.createElement('textarea'); ta.value = u; ta.style.position = 'fixed'; ta.style.opacity = '0'; document.body.appendChild(ta); ta.select(); try { ok = document.execCommand('copy'); } catch (e) { ok = false; } ta.remove(); }
    toast(ok ? t('link_copied') : u);
  },
  async sharenative(el) {
    const u = el.dataset.url;
    if (navigator.share) { try { await navigator.share({ title: el.dataset.title, url: u }); } catch (e) { /* cancelled */ } return; }
    actions.copylink(el);
  },
  zoom() {
    const m = document.getElementById('mainimg'); if (!m) return;
    const list = [...new Set([...document.querySelectorAll('.thumbbtn')].map(b => b.dataset.src))]; if (!list.length) list.push(m.src);
    let i = Math.max(0, list.indexOf(m.getAttribute('src')));
    const box = document.createElement('div'); box.className = 'lightbox'; box.setAttribute('role', 'dialog'); box.setAttribute('aria-modal', 'true');
    box.innerHTML = '<button type="button" class="lb-x" aria-label="Close">✕</button>' + (list.length > 1 ? '<button type="button" class="lb-n lb-prev" aria-label="Previous">‹</button><button type="button" class="lb-n lb-next" aria-label="Next">›</button>' : '') + '<img alt=""><div class="lb-c"></div>';
    const im = box.querySelector('img'), c = box.querySelector('.lb-c');
    const show = () => { im.src = list[i]; c.textContent = list.length > 1 ? (i + 1) + ' / ' + list.length : ''; };
    const close = () => { box.remove(); document.removeEventListener('keydown', key); document.body.style.overflow = ''; };
    const step = d => { i = (i + d + list.length) % list.length; show(); };
    const key = e => { if (e.key === 'Escape') close(); else if (e.key === 'ArrowLeft') step(-1); else if (e.key === 'ArrowRight') step(1); };
    box.addEventListener('click', e => {
      if (e.target.closest('.lb-prev')) step(-1); else if (e.target.closest('.lb-next')) step(1); else if (e.target !== im) close();
    });
    let x0 = null; box.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
    box.addEventListener('touchend', e => { if (x0 === null || list.length < 2) return; const d = e.changedTouches[0].clientX - x0; if (Math.abs(d) > 50) step(d < 0 ? 1 : -1); x0 = null; });
    document.addEventListener('keydown', key); document.body.style.overflow = 'hidden'; document.body.appendChild(box); show();
  },
  async adremove(el) {
    if (!confirmT('Delete this ad permanently?')) return; const a = must(await sb.from('ads').select('image').eq('id', el.dataset.id).maybeSingle());
    must(await sb.from('ads').delete().eq('id', el.dataset.id)); if (a) removeImage(a.image); router(true);
  },
  async blockproduct(el) { must(await sb.from('products').update({ blocked: el.dataset.val !== '1' }).eq('id', el.dataset.id)); router(true); },
  async dismissreq(el) { must(await sb.from('plan_requests').update({ status: 'dismissed' }).eq('id', el.dataset.id)); router(true); },
};
document.addEventListener('click', e => {
  const el = e.target.closest('[data-act]'); if (!el || !actions[el.dataset.act]) return; e.preventDefault();
  Promise.resolve().then(() => actions[el.dataset.act](el, e)).catch(err => toast(err.message, 'error'));
});
document.addEventListener('input', e => { const i = e.target; if (i.dataset && i.dataset.ppd) { const o = document.getElementById(i.dataset.out); const d = Math.max(0, Math.min(90, parseInt(i.value, 10) || 0)); if (o) o.textContent = inr(d * Number(i.dataset.ppd)); } });
document.addEventListener('change', e => { const st = e.target; if (st.dataset && st.dataset.statesel) { const d = document.getElementById(st.dataset.statesel); if (d) d.innerHTML = '<option value="">— choose —</option>' + (STATES[st.value] || []).map(x => `<option>${esc(x)}</option>`).join(''); } });
document.addEventListener('change', e => { if (e.target.dataset && e.target.dataset.langsel) actions.lang({ dataset: { lang: e.target.value } }); });
document.addEventListener('change', e => {
  const inp = e.target; if (inp.type === 'file' && inp.dataset.preview && inp.files[0]) { const img = document.getElementById(inp.dataset.preview); if (img) { img.src = URL.createObjectURL(inp.files[0]); img.style.display = 'block'; } }
});

/* ---------- image upload (resized in the browser, then stored in Supabase Storage) ---------- */
async function uploadImage(file, maxSide) {
  if (!file || !file.size) return null;
  if (!/^image\/(jpeg|png|webp)$/.test(file.type)) throw new Error('Only JPG, PNG or WebP images are allowed.');
  if (file.size > 15 * 1024 * 1024) throw new Error('Image is too large (max 15 MB).');
  let bmp; try { bmp = await createImageBitmap(file); } catch (e) { throw new Error('That file is not a valid image.'); }
  const scale = Math.min(1, maxSide / Math.max(bmp.width, bmp.height)); const c = document.createElement('canvas');
  c.width = Math.max(1, Math.round(bmp.width * scale)); c.height = Math.max(1, Math.round(bmp.height * scale)); c.getContext('2d').drawImage(bmp, 0, 0, c.width, c.height);
  let blob = await new Promise(r => c.toBlob(r, 'image/webp', 0.82)); if (!blob || blob.type !== 'image/webp') blob = await new Promise(r => c.toBlob(r, 'image/jpeg', 0.85));
  if (!blob) throw new Error('Could not process the image.'); if (blob.size > 1.9 * 1024 * 1024) throw new Error('Image is still too large after resizing. Try a smaller photo.');
  const ext = blob.type === 'image/webp' ? 'webp' : 'jpg'; const path = `${S.user.id}/${crypto.randomUUID()}.${ext}`;
  const up = await sb.storage.from('images').upload(path, blob, { contentType: blob.type, cacheControl: '31536000' }); if (up.error) throw new Error('Photo upload failed: ' + up.error.message);
  return sb.storage.from('images').getPublicUrl(path).data.publicUrl;
}
async function removeImage(url) {
  const m = String(url || '').match(/\/storage\/v1\/object\/public\/images\/(.+)$/);
  if (m) { try { await sb.storage.from('images').remove([decodeURIComponent(m[1])]); } catch (e) { /* ignore */ } }
}

const redirectFor = () => (ADMIN_ONLY ? '#/admin' : (S.profile && S.profile.role === 'admin') ? '#/' : '#/dashboard');
const forms = {
  search(f, fd) { const term = clean(fd.get('q'), 80); location.hash = '#/search?q=' + enc(term); },
  place(f, fd) { S.place = clean(fd.get('place'), 60); ls.set('nk_place', S.place); renderChrome(); router(true); },
  adminfilter(f, fd) { location.hash = `${f.dataset.base}?${[...fd.entries()].map(([k, v]) => k + '=' + enc(v)).join('&')}`; },
  track(f, fd) { location.hash = '#/order/' + enc(clean(fd.get('code'), 20).toUpperCase()); },
  addqty(f, fd) { return addToCart(f.dataset.id, f.dataset.shop, f.dataset.stock, toInt(fd.get('qty'), 1, 99) || 1); },
  cartupdate(f, fd) {
    const c = cartGet(); Object.keys(c.items).forEach(id => { const n = toInt(fd.get('qty_' + id), 0, 99); if (n === null) return; if (n === 0) delete c.items[id]; else c.items[id] = n; });
    if (!Object.keys(c.items).length) c.shopId = null; cartSet(c); router(true);
  },
  async checkout(f, fd, ev) {
    const channel = (ev && ev.submitter && ev.submitter.value) === 'whatsapp' ? 'whatsapp' : 'web'; const cart = cartGet();
    const name = clean(fd.get('name'), 80), phone = normPhone(fd.get('phone')), mode = fd.get('fulfilment'), address = cleanML(fd.get('address'), 400);
    if (name.length < 2) throw new Error('Please enter your name.'); if (!phone) throw new Error('Please enter a valid 10-digit mobile number.');
    if (mode !== 'delivery' && mode !== 'pickup') throw new Error('Please choose delivery or pickup.'); if (mode === 'delivery' && address.length < 8) throw new Error('Please enter your full delivery address.');
    const items = Object.entries(cart.items).map(([id, qty]) => ({ product_id: Number(id), qty }));
    const res = must(await sb.rpc('place_order', { p_shop: cart.shopId, p_items: items, p_name: name, p_phone: phone, p_address: address, p_notes: cleanML(fd.get('notes'), 500), p_fulfilment: mode, p_channel: channel }));
    ls.set('nk_customer', { name, phone, address }); cartSet({ shopId: null, items: {} }); location.hash = `#/order/${res.code}?placed=1`;
  },
  async commcreate(f, fd) {
    const [o, p] = await Promise.all([sb.from('orders').select('commission_amount').eq('shop_id', S.shop.id).eq('status', 'delivered').limit(5000), sb.from('payments').select('amount').eq('shop_id', S.shop.id).eq('kind', 'commission')]);
    const due = Math.round(must(o).reduce((a, x) => a + Number(x.commission_amount), 0) - must(p).reduce((a, x) => a + x.amount, 0)); if (due < 1) throw new Error('Nothing is due.');
    const ex = must(await sb.from('commission_claims').select('id').eq('shop_id', S.shop.id).eq('status', 'open')); if (!ex.length) must(await sb.from('commission_claims').insert({ shop_id: S.shop.id, amount: due }));
    toast('Now pay using one of the options below.'); router(true);
  },
  async orderupi(f, fd) {
    const ref = clean(fd.get('ref'), 40); if (ref.length < 6) throw new Error('Enter the UPI reference / UTR number (at least 6 characters).');
    const ok = must(await sb.rpc('claim_order_payment', { p_code: f.dataset.code, p_ref: ref })); toast(ok ? 'Thank you. The shop will check and confirm your payment.' : 'This order cannot take a payment reference.', ok ? 'ok' : 'error'); router(true);
  },
  async promocreate(f, fd) {
    const w = toInt(fd.get('days'), 1, 90), pp = priceOf('promote_price_day'); if (!w || !pp) throw new Error('Promotion is not available right now.');
    must(await sb.from('promo_requests').insert({ shop_id: S.shop.id, days: w, amount: pp * w })); toast('Request created. Now pay using one of the options below.'); router(true);
  },
  async adcreate(f, fd) {
    const w = toInt(fd.get('days'), 1, 90), ap = priceOf('ad_price_day'), title = clean(fd.get('title'), 80); if (!w || !ap) throw new Error('Advertising is not available right now.');
    if (title.length < 3) throw new Error('Please write a headline (at least 3 letters).');
    const file = fd.get('image'); const img = file && file.size ? await uploadImage(file, 1200) : null;
    try { must(await sb.from('ads').insert({ shop_id: S.shop.id, title, body: clean(fd.get('body'), 160), image: img, product_id: toInt(fd.get('product_id'), 1), days: w, amount: ap * w })); }
    catch (e) { if (img) removeImage(img); throw e; }
    toast('Ad saved. Now pay using one of the options below. It goes live after the team checks it.'); router(true);
  },
  async upiclaim(f, fd) {
    const ref = clean(fd.get('ref'), 40); const type = f.dataset.type || 'plan'; if (ref.length < 6) throw new Error('Enter the UPI reference / UTR number from your payment app.');
    let amount = Number(f.dataset.amount) || 0; if (type === 'plan') { const p = S.plans.find(x => String(x.id) === f.dataset.id); if (!p) return; amount = p.price; }
    await claimPay(type, f.dataset.id, 'upi', ref, amount); toast('Thank you. The team will match your UPI payment and activate it.'); router(true);
  },
  async ticket(f, fd) {
    const name = clean(fd.get('name'), 80), phone = normPhone(fd.get('phone')), subject = clean(fd.get('subject'), 120), message = cleanML(fd.get('message'), 2000);
    if (name.length < 2 || !phone || subject.length < 3 || message.length < 10) throw new Error('Please fill in your name, a valid mobile number, a subject and a message (at least 10 characters).');
    must(await sb.from('tickets').insert({ name, phone, subject, message, order_code: clean(fd.get('order_code'), 20).toUpperCase() })); f.reset(); toast('Thank you. Your message has been received and our team will contact you.');
  },
  async login(f, fd) {
    const r = await sb.auth.signInWithPassword({ email: clean(fd.get('email'), 120), password: String(fd.get('password') || '') });
    if (r.error) throw new Error('Wrong email or password.'); S.user = r.data.user; await loadProfile(); renderChrome(); location.hash = redirectFor();
  },
  async forgot(f, fd) {
    const r = await sb.auth.resetPasswordForEmail(clean(fd.get('email'), 120), { redirectTo: location.origin + location.pathname }); if (r.error) throw new Error(r.error.message);
    toast('If that email is registered, a reset link has been sent.');
  },
  async resetpw(f, fd) {
    const p1 = String(fd.get('new') || ''); if (p1.length < 8 || p1 !== fd.get('new2')) throw new Error('New password must be at least 8 characters and match in both boxes.');
    const r = await sb.auth.updateUser({ password: p1 }); if (r.error) throw new Error(r.error.message); toast('Password changed.'); await loadSession(); renderChrome(); location.hash = redirectFor();
  },
  async register(f, fd) {
    const v = { shop_name: clean(fd.get('name'), 80), category_id: toInt(fd.get('category_id'), 1), description: cleanML(fd.get('description'), 600), address: cleanML(fd.get('address'), 300), locality: clean(fd.get('locality'), 60), town: clean(fd.get('town'), 60), district: clean(fd.get('district'), 40), state: clean(fd.get('state'), 50),
      pincode: clean(fd.get('pincode'), 6), map_link: clean(fd.get('map_link'), 300), whatsapp: normPhone(fd.get('whatsapp')), owner_name: clean(fd.get('owner_name'), 80), phone: normPhone(fd.get('phone')) };
    const email = clean(fd.get('email'), 120), pw = String(fd.get('password') || ''); const errs = [];
    if (v.shop_name.length < 2) errs.push('Please enter the shop name.'); if (!v.category_id) errs.push('Please choose a shop category.'); if (v.address.length < 6) errs.push('Please enter the shop address.');
    if (!STATES[v.state]) errs.push('Please choose your state.'); else if (!STATES[v.state].includes(v.district)) errs.push('Please choose your district.'); if (v.town.length < 2) errs.push('Please enter the town or place.'); if (!/^\d{6}$/.test(v.pincode)) errs.push('PIN code must be 6 digits.'); if (!v.whatsapp) errs.push('Please enter a valid 10-digit WhatsApp number.');
    if (v.map_link && !isHttps(v.map_link)) errs.push('Map link must start with https:// (or leave it empty).'); if (v.owner_name.length < 2) errs.push("Please enter the owner's name.");
    if (!v.phone) errs.push('Please enter a valid 10-digit mobile number.'); if (!/^\S+@\S+\.\S+$/.test(email)) errs.push('Please enter a valid email.'); if (pw.length < 8) errs.push('Password must be at least 8 characters.');
    if (pw !== fd.get('password2')) errs.push('The two passwords do not match.'); if (!fd.get('agree')) errs.push('Please accept the Terms and Privacy Policy.');
    if (errs.length) throw new Error(errs[0]);
    const r = await sb.auth.signUp({ email, password: pw, options: { data: v } }); if (r.error) throw new Error(r.error.message);
    if (r.data.user && r.data.user.identities && r.data.user.identities.length === 0) throw new Error('This email is already registered. Please log in.');
    if (!r.data.session) { view(html`<div class="form-card center"><h1>Check your email</h1><p>We sent a confirmation link to <b>${email}</b>. Open it, then log in. Your shop will go live after admin approval.</p><a class="btn" href="#/login">${t('login')}</a></div>`, { noindex: true }); return; }
    S.user = r.data.user; await loadProfile(); renderChrome(); toast('Your shop is registered. It will go live after admin approval. Meanwhile, add your products.'); location.hash = '#/dashboard';
  },
  async product(f, fd) {
    const sh = S.shop; const price = toInt(fd.get('price'), 1, 1000000); const dRaw = String(fd.get('discount_price') || '').trim(); const disc = dRaw ? toInt(dRaw, 1, 1000000) : null; const qRaw = String(fd.get('stock_qty') || '').trim(); const qty = qRaw ? toInt(qRaw, 0, 100000) : null;
    const name = clean(fd.get('name'), 120); if (name.length < 2) throw new Error('Please enter the product name.'); if (price === null) throw new Error('Please enter a valid price in rupees.');
    if (dRaw && (disc === null || disc >= price)) throw new Error('Discount price must be less than the normal price.'); if (qRaw && qty === null) throw new Error('Stock quantity must be a whole number (or leave empty).');
    const row = { name, name_ml: clean(fd.get('name_ml'), 120), description: cleanML(fd.get('description'), 1000), category_id: toInt(fd.get('category_id'), 1), price, discount_price: disc, unit: clean(fd.get('unit'), 30), stock_qty: qty, in_stock: !!fd.get('in_stock') && qty !== 0, active: !!fd.get('active') };
    const secRaw = clean(fd.get('section'), 40); if (secRaw || f.dataset.hassec === '1') row.section = secRaw || null;
    const id = f.dataset.id; const slots = ['image', 'image2', 'image3']; let old = { image: null, image2: null, image3: null };
    if (id) old = must(await sb.from('products').select('image,image2,image3').eq('id', id).eq('shop_id', sh.id).maybeSingle()) || old;
    const uploaded = [], finalList = [];
    try {
      for (const k of slots) {
        const file = fd.get(k); let url = old[k] || null;
        if (file && file.size) { url = await uploadImage(file, 1400); uploaded.push(url); } else if (fd.get('rm_' + k)) url = null;
        if (url) finalList.push(url);
      }
      row.image = finalList[0] || null; row.image2 = finalList[1] || null; row.image3 = finalList[2] || null;
      if (id) { must(await sb.from('products').update(row).eq('id', id).eq('shop_id', sh.id)); toast('Product updated.'); }
      else { must(await sb.from('products').insert(Object.assign({ shop_id: sh.id }, row))); toast('Product added.'); }
    } catch (e) { uploaded.forEach(removeImage); throw e; }
    Object.values(old).forEach(u => { if (u && !finalList.includes(u)) removeImage(u); });
    location.hash = '#/dashboard/products';
  },
  async orderstatus(f, fd) { must(await sb.from('orders').update({ status: fd.get('status') }).eq('id', f.dataset.id).eq('shop_id', S.shop.id)); toast('Order status updated.'); router(true); },
  async shopsettings(f, fd) {
    const sh = S.shop; const g = k => clean(fd.get(k), 300); const errs = []; const fee = toInt(fd.get('delivery_fee') || 0, 0, 5000), minOrder = toInt(fd.get('min_order') || 0, 0, 100000);
    if (fee === null || minOrder === null) errs.push('Delivery fee and minimum order must be whole rupee amounts.'); const whatsapp = normPhone(fd.get('whatsapp')); if (!whatsapp) errs.push('Please enter a valid 10-digit WhatsApp number.');
    if (!/^\d{6}$/.test(g('pincode'))) errs.push('PIN code must be 6 digits.'); if (g('name').length < 2 || g('town').length < 2 || cleanML(fd.get('address'), 300).length < 6) errs.push('Please fill in the shop name, address and town.');
    if (!STATES[g('state')] || !STATES[g('state')].includes(g('district'))) errs.push('Please choose your state and district.');
    if (g('map_link') && !isHttps(g('map_link'))) errs.push('Map link must start with https:// (or leave it empty).');
    const upi = clean(fd.get('upi_id'), 60); if (upi && !/^[\w.\-]{2,}@[A-Za-z]{2,}$/.test(upi)) errs.push('UPI ID looks wrong. It should look like name@bank.');
    const hours = {}; DAYS.forEach(d => { const o = fd.get(d + '_open') || '09:00', c = fd.get(d + '_close') || '21:00'; if (!/^\d\d:\d\d$/.test(o) || !/^\d\d:\d\d$/.test(c)) errs.push('Opening hours must be times like 09:00.'); hours[d] = { open: o, close: c, closed: !!fd.get(d + '_closed') }; });
    if (errs.length) throw new Error(errs[0]);
    const logoFile = fd.get('logo'); const logo = logoFile && logoFile.size ? await uploadImage(logoFile, 600) : null;
    const row = { name: g('name'), description: cleanML(fd.get('description'), 600), owner_name: g('owner_name'), address: cleanML(fd.get('address'), 300), locality: g('locality'), town: g('town'), district: g('district'), state: g('state'), pincode: g('pincode'), map_link: g('map_link'), whatsapp, category_id: toInt(fd.get('category_id'), 1),
      accepting_orders: !!fd.get('accepting_orders'), delivery_available: !!fd.get('delivery_available'), pickup_available: !!fd.get('pickup_available'), delivery_fee: fee, min_order: minOrder, est_delivery: g('est_delivery'), delivery_area: g('delivery_area'), hours, upi_id: upi };
    if (logo) row.logo = logo;
    try { must(await sb.from('shops').update(row).eq('id', sh.id)); } catch (e) { if (logo) removeImage(logo); throw e; }
    if (logo) removeImage(sh.logo); await loadProfile(); toast('Shop settings saved.'); router(true);
  },
  async ownerticket(f, fd) {
    const subject = clean(fd.get('subject'), 120), message = cleanML(fd.get('message'), 2000); if (subject.length < 3 || message.length < 10) throw new Error('Please write a subject and a message (at least 10 characters).');
    must(await sb.from('tickets').insert({ name: S.shop.owner_name || 'Shop owner', phone: normPhone(S.profile.phone) || S.shop.whatsapp, subject, message, order_code: '' })); toast('Message sent to the marketplace team.'); router(true);
  },
  async adminshop(f, fd, ev) {
    const status = ev && ev.submitter ? ev.submitter.value : ''; if (!['approved', 'rejected', 'suspended'].includes(status)) return;
    must(await sb.from('shops').update({ status, status_note: clean(fd.get('note'), 300) }).eq('id', f.dataset.id)); toast('Shop is now ' + status + '.'); router(true);
  },
  async adminplan(f, fd) {
    const until = clean(fd.get('plan_until'), 10); if (until && !/^\d{4}-\d\d-\d\d$/.test(until)) throw new Error('Use the date format YYYY-MM-DD.');
    must(await sb.from('shops').update({ plan_id: toInt(fd.get('plan_id'), 1), plan_until: until || null }).eq('id', f.dataset.id)); must(await sb.from('plan_requests').update({ status: 'done' }).eq('shop_id', f.dataset.id).eq('status', 'open')); toast('Plan updated.'); router(true);
  },
  async adminfeatured(f, fd) { const until = clean(fd.get('featured_until'), 10); if (until && !/^\d{4}-\d\d-\d\d$/.test(until)) throw new Error('Use the date format YYYY-MM-DD.'); must(await sb.from('shops').update({ featured_until: until || null }).eq('id', f.dataset.id)); toast('Featured listing updated.'); router(true); },
  async adminpayment(f, fd) {
    const amount = toInt(fd.get('amount'), 1, 10000000); if (!amount) throw new Error('Enter a valid amount and type.');
    must(await sb.from('payments').insert({ shop_id: Number(f.dataset.id), kind: fd.get('kind'), amount, reference: clean(fd.get('reference'), 80), note: clean(fd.get('note'), 200) })); toast('Payment recorded.'); router(true);
  },
  async commact(f, fd, ev) {
    const action = ev && ev.submitter ? ev.submitter.value : ''; const d = f.dataset;
    if (action === 'dismiss') { must(await sb.from('commission_claims').update({ status: 'dismissed' }).eq('id', d.id)); toast('Dismissed.'); return router(true); }
    if (action !== 'confirm') return;
    must(await sb.from('payments').insert({ shop_id: Number(d.shop), kind: 'commission', amount: Number(d.amount), reference: d.ref, note: 'Commission paid by shop' })); must(await sb.from('commission_claims').update({ status: 'done' }).eq('id', d.id));
    toast('Commission payment recorded.'); router(true);
  },
  async promoact(f, fd, ev) {
    const action = ev && ev.submitter ? ev.submitter.value : ''; const d = f.dataset;
    if (action === 'dismiss') { must(await sb.from('promo_requests').update({ status: 'dismissed' }).eq('id', d.id)); toast('Dismissed.'); return router(true); }
    if (action !== 'activate') return; const until = addDays(d.base, Number(d.days));
    must(await sb.from('shops').update({ featured_until: until }).eq('id', d.shop)); must(await sb.from('promo_requests').update({ status: 'done' }).eq('id', d.id));
    if (fd.get('rec')) must(await sb.from('payments').insert({ shop_id: Number(d.shop), kind: 'featured', amount: Number(d.amount), reference: d.ref, note: 'Promotion ' + d.days + ' day(s)' }));
    toast('Shop promoted until ' + until + '.'); router(true);
  },
  async adreview(f, fd, ev) {
    const action = ev && ev.submitter ? ev.submitter.value : ''; const d = f.dataset; if (!['approved', 'rejected', 'paused'].includes(action)) return;
    const s = clean(fd.get('starts_on'), 10), e = clean(fd.get('ends_on'), 10); if (action === 'approved' && (!/^\d{4}-\d\d-\d\d$/.test(s) || !/^\d{4}-\d\d-\d\d$/.test(e) || e < s)) throw new Error('Choose valid start and end dates (end after start).');
    must(await sb.from('ads').update({ status: action, starts_on: s || null, ends_on: e || null, admin_note: clean(fd.get('admin_note'), 300) }).eq('id', d.id));
    if (action === 'approved' && d.status === 'pending' && fd.get('rec')) must(await sb.from('payments').insert({ shop_id: Number(d.shop), kind: 'advert', amount: Number(d.amount), reference: d.ref, note: 'Banner ad' }));
    toast('Ad ' + action + '.'); router(true);
  },
  async catadd(f, fd) {
    const en = clean(fd.get('name_en'), 40); if (en.length < 2) throw new Error('Enter an English name.'); const slug = en.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'cat-' + Date.now();
    must(await sb.from('categories').insert({ slug, name_en: en, name_ml: clean(fd.get('name_ml'), 40) || en, icon: clean(fd.get('icon'), 4) || '🛍️', sort: toInt(fd.get('sort'), 0, 999) ?? 100 })); await loadBase(); toast('Category added.'); router(true);
  },
  async catsave(f, fd) { must(await sb.from('categories').update({ name_en: clean(fd.get('name_en'), 40), name_ml: clean(fd.get('name_ml'), 40), icon: clean(fd.get('icon'), 4) || '🛍️', sort: toInt(fd.get('sort'), 0, 999) ?? 100, active: !!fd.get('active') }).eq('id', f.dataset.id)); await loadBase(); toast('Category saved.'); router(true); },
  async planadd(f, fd) {
    const price = toInt(fd.get('price'), 0, 100000), mx = toInt(fd.get('max_products') || 0, 0, 100000), mo = toInt(fd.get('max_orders_month') || 0, 0, 1000000), name = clean(fd.get('name'), 40); if (name.length < 2 || price === null || mx === null || mo === null) throw new Error('Enter a name, a price in rupees and the limits (0 = unlimited).');
    must(await sb.from('plans').insert({ name, price, max_products: mx, max_orders_month: mo, description: clean(fd.get('description'), 300) })); await loadBase(); toast('Plan added.'); router(true);
  },
  async plansave(f, fd) {
    const price = toInt(fd.get('price'), 0, 100000), mx = toInt(fd.get('max_products') || 0, 0, 100000), mo = toInt(fd.get('max_orders_month') || 0, 0, 1000000), name = clean(fd.get('name'), 40); if (name.length < 2 || price === null || mx === null || mo === null) throw new Error('Enter a name, a price in rupees and the limits (0 = unlimited).');
    must(await sb.from('plans').update({ name, price, max_products: mx, max_orders_month: mo, description: clean(fd.get('description'), 300), sort: toInt(fd.get('sort'), 0, 999) ?? 100, active: !!fd.get('active') }).eq('id', f.dataset.id)); await loadBase(); toast('Plan saved.'); router(true);
  },
  async ticketsave(f, fd) { must(await sb.from('tickets').update({ status: fd.get('status'), admin_note: cleanML(fd.get('admin_note'), 500) }).eq('id', f.dataset.id)); toast('Ticket updated.'); },
  async adminsettings(f, fd) {
    const pct = parseFloat(fd.get('commission_pct') || '0'); if (!(pct >= 0 && pct <= 30)) throw new Error('Commission must be a number between 0 and 30.');
    const upi = clean(fd.get('upi_id'), 60), rzk = clean(fd.get('razorpay_key_id'), 60);
    if (upi && !/^[\w.\-]{2,}@[A-Za-z]{2,}$/.test(upi)) throw new Error('UPI ID looks wrong. It should look like name@bank.'); if (rzk && !/^rzp_(test|live)_[A-Za-z0-9]+$/.test(rzk)) throw new Error('Razorpay Key ID should start with rzp_live_ or rzp_test_. Never paste the Key Secret.');
    const wa = String(fd.get('contact_whatsapp') || '').trim(); const rows = [['site_name', clean(fd.get('site_name'), 40) || 'Nammude Kada'], ['commission_pct', String(pct)], ['contact_email', clean(fd.get('contact_email'), 120)], ['contact_phone', clean(fd.get('contact_phone'), 20)], ['contact_whatsapp', wa ? (normPhone(wa) || '') : ''],
      ['promote_price_day', String(toInt(fd.get('promote_price_day') || 0, 0, 100000) || '')], ['ad_price_day', String(toInt(fd.get('ad_price_day') || 0, 0, 100000) || '')], ['upi_id', upi], ['upi_name', clean(fd.get('upi_name'), 40)], ['razorpay_key_id', rzk], ['contact_address', cleanML(fd.get('contact_address'), 300)], ['operator_name', clean(fd.get('operator_name'), 120)], ['featured_price_note', cleanML(fd.get('featured_price_note'), 400)], ['ad_note', cleanML(fd.get('ad_note'), 400)]];
    must(await sb.from('settings').upsert(rows.map(([key, value]) => ({ key, value })), { onConflict: 'key' })); await loadBase(); renderChrome(); toast('Settings saved.');
  },
};
document.addEventListener('submit', e => {
  const f = e.target.closest('form[data-form]'); if (!f) return; e.preventDefault(); const h = forms[f.dataset.form]; if (!h) return;
  const btns = f.querySelectorAll('button[type=submit]'); btns.forEach(b => { b.disabled = true; });
  Promise.resolve().then(() => h(f, new FormData(f), e)).catch(err => { console.error(err); toast(err.message || 'Something went wrong', 'error'); }).finally(() => btns.forEach(b => { b.disabled = false; }));
});

/* =====================================================================
   START-UP, ROUTER, LOGIN SESSION
   ===================================================================== */
async function loadBase() {
  const [c, p, s] = await Promise.all([sb.from('categories').select('*').order('sort').order('id'), sb.from('plans').select('*').order('sort').order('id'), sb.from('settings').select('*')]);
  const cats = must(c); S.cats = cats.filter(x => x.active); S.inactiveCats = cats.filter(x => !x.active); S.plans = must(p); S.settings = {}; must(s).forEach(r => { S.settings[r.key] = r.value; });
}
async function loadProfile() {
  S.profile = null; S.shop = null; if (!S.user) return;
  const p = await sb.from('profiles').select('*').eq('id', S.user.id).maybeSingle(); S.profile = p.data || null;
  if (S.profile && S.profile.role === 'owner') { const s = await sb.from('shops').select('*').eq('owner_id', S.user.id).maybeSingle(); S.shop = s.data || null; }
}
async function loadSession() { const r = await sb.auth.getSession(); S.user = r.data && r.data.session ? r.data.session.user : null; await loadProfile(); }

async function router(keep) {
  if (!sb) return; clearInterval(S.timer); const hash = location.hash.slice(1) || '/'; const qi = hash.indexOf('?'); const path = qi < 0 ? hash : hash.slice(0, qi); const q = new URLSearchParams(qi < 0 ? '' : hash.slice(qi + 1));
  if (ADMIN_ONLY && !/^\/(admin|login|reset|dashboard\/password)/.test(path)) { location.hash = S.user ? '#/admin' : '#/login'; return; }
  if (!ADMIN_ONLY && /^\/admin/.test(path)) return notFound();
  if (!keep) { appEl().innerHTML = spinner(); window.scrollTo(0, 0); } renderChrome(); const y = window.scrollY; S.route = hash;
  for (const [re, fn] of routes) {
    const m = path.match(re); if (!m) continue;
    try { await fn(m.slice(1).map(decodeURIComponent), q); } catch (err) { console.error(err); if (S.route === hash) view(html`<div class="form-card center"><h1>⚠️</h1><p>${err.message || 'Something went wrong.'}</p><a class="btn" href="#/">${t('home')}</a></div>`, { title: 'Error', noindex: true }); }
    if (keep) window.scrollTo(0, y); renderChrome(); return;
  }
  notFound();
}
window.addEventListener('hashchange', () => router(false));

/* Installable app (PWA): manifest and icons are generated here so the site stays 3 files. */
function setupManifest() {
  try {
    if (document.querySelector('link[rel=manifest]')) { if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {}); return; } // real manifest file present (best for install)
    const icon = size => { const c = document.createElement('canvas'); c.width = c.height = size; const g = c.getContext('2d'); g.fillStyle = '#0f6b3e'; g.fillRect(0, 0, size, size); g.strokeStyle = '#e8a317'; g.lineWidth = size / 28; g.strokeRect(size * 0.1, size * 0.1, size * 0.8, size * 0.8);
      g.fillStyle = '#fffaf0'; g.font = `bold ${size * 0.4}px sans-serif`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('NK', size / 2, size / 2 + size * 0.02); return c.toDataURL('image/png'); };
    const i192 = icon(192), i512 = icon(512); const base = location.origin + location.pathname;
    const man = { name: siteName(), short_name: siteName().slice(0, 12), start_url: base, scope: base, display: 'standalone', background_color: '#fffaf0', theme_color: '#0f6b3e', icons: [{ src: i192, sizes: '192x192', type: 'image/png' }, { src: i512, sizes: '512x512', type: 'image/png' }] };
    const link = document.createElement('link'); link.rel = 'manifest'; link.href = URL.createObjectURL(new Blob([JSON.stringify(man)], { type: 'application/manifest+json' })); document.head.appendChild(link);
    const ic = document.createElement('link'); ic.rel = 'icon'; ic.href = i192; document.head.appendChild(ic);
  } catch (e) { /* optional */ }
}

window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); S.installEvt = e; if (sb) renderChrome(); });
window.addEventListener('appinstalled', () => { S.installEvt = null; });
async function boot() {
  if (!configured() || !window.supabase) { appEl().innerHTML = needsSetup().s; $('#top').innerHTML = `<a class="brand" href="#/">🛍️ ${esc(CONFIG && 'Nammude Kada')}</a>`; return; }
  sb = window.supabase.createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_ANON_KEY, { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } });
  try { await loadBase(); await loadSession(); } catch (e) { console.error(e); appEl().innerHTML = html`<div class="setup-card"><h1>Cannot reach the database</h1><p>${e.message}</p><p>Check the keys in <code>app.js</code> and that <code>supabase.sql</code> was run.</p></div>`.s; return; }
  sb.auth.onAuthStateChange((ev, session) => { setTimeout(async () => {
    S.user = session ? session.user : null; await loadProfile(); renderChrome();
    if (ev === 'PASSWORD_RECOVERY') location.hash = '#/reset'; }, 0); });
  if (!ADMIN_ONLY) setupManifest(); renderChrome(); await router(false);
}
boot();
