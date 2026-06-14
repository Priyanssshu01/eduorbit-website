// EduOrbit - College & Fee Structure Data
// JIS Group - West Bengal | Admission 2026 | Bihar Student Credit Card Scheme

const COLLEGES = [
  {
    id: 'jisce', name: 'JIS College of Engineering', abbr: 'JISCE', est: 2000, naac: 'A',
    location: 'Kalyani (60 KM from Kolkata)', img: '🏛️',
    insta: '@jiscollegeofengineering', instaUrl: 'https://www.instagram.com/jiscollegeofengineering/',
    website: 'https://www.jisce.ac.in', affiliation: 'MAKAUT (Maulana Abul Kalam Azad University of Technology)',
    bio: 'JIS College of Engineering is one of the premier NAAC-A accredited engineering colleges in West Bengal under the JIS Group. It offers a wide range of B.Tech, MBA, MCA, BCA, BBA and Diploma programs. With excellent infrastructure, experienced faculty, and strong industry placement network, JISCE is a top choice for students from Bihar, Jharkhand, UP, and across India.',
    highlights: ['NAAC "A" Accredited', 'NBA Accredited Programs', 'Bihar DRCC / Student Credit Card Approved', 'On-campus Hostels for Boys & Girls', 'Strong Placement Cell — 300+ Recruiters', 'International Collaboration Programs'],
    placement: { avg: '4.5 LPA', highest: '18 LPA', companies: ['TCS', 'Infosys', 'Wipro', 'Cognizant', 'HCL', 'Capgemini'] },
    top_branches: ['CSE', 'ECE', 'IT', 'Mechanical', 'Civil', 'MBA', 'MCA'],
    color: '#1B4D8E'
  },
  {
    id: 'nit', name: 'Narula Institute of Technology', abbr: 'NIT', est: 2001, naac: 'A',
    location: 'Agarpara, Kolkata', img: '🏫',
    insta: '@narula.institute', instaUrl: 'https://www.instagram.com/narula.institute/',
    website: 'https://www.nit.ac.in', affiliation: 'MAKAUT',
    bio: 'Narula Institute of Technology, under the JIS Group, is a NAAC-A accredited engineering college located in Agarpara, Kolkata. Known for its vibrant campus life, well-equipped labs, and strong alumni network, NIT offers B.Tech, Diploma, and PG courses. Bihar Student Credit Card Scheme approved.',
    highlights: ['NAAC "A" Accredited', 'Bihar DRCC Approved', 'Smart Classrooms & Advanced Labs', 'Active Training & Placement Cell', 'Sports & Cultural Activities', 'Separate Boys & Girls Hostel'],
    placement: { avg: '4.2 LPA', highest: '15 LPA', companies: ['TCS', 'Wipro', 'Infosys', 'Tech Mahindra', 'L&T'] },
    top_branches: ['CSE', 'ECE', 'Mechanical', 'Civil', 'Electrical', 'Diploma'],
    color: '#2563EB'
  },
  {
    id: 'gnit', name: 'Guru Nanak Institute of Technology', abbr: 'GNIT', est: 2003, naac: 'A+',
    location: 'Sodepur, Kolkata', img: '🎓',
    insta: '@gnit_kolkata', instaUrl: 'https://www.instagram.com/gnit_kolkata/',
    website: 'https://www.gnit.ac.in', affiliation: 'MAKAUT',
    bio: 'Guru Nanak Institute of Technology is a NAAC A+ rated institution — one of the highest ratings among private engineering colleges in West Bengal. It offers B.Tech in multiple streams, Diploma programs, and is known for outstanding academic culture, research facilities, and exceptional placement record.',
    highlights: ['NAAC "A+" Accredited — Highest Rating', 'Bihar DRCC Approved', 'ISO 9001:2015 Certified', 'Research & Innovation Centre', '95%+ Placement Rate', 'International Exchange Programs'],
    placement: { avg: '5.2 LPA', highest: '22 LPA', companies: ['Amazon', 'Microsoft', 'TCS', 'Infosys', 'Accenture', 'IBM'] },
    top_branches: ['CSE', 'ECE', 'Electrical', 'Mechanical', 'Food Technology'],
    color: '#059669'
  },
  {
    id: 'surtech', name: 'Dr Sudhir Chandra Sur Institute of Technology', abbr: 'Sur Tech', est: 2009, naac: 'A',
    location: 'Dumdum, Kolkata', img: '🏢',
    insta: '@surtech_official', instaUrl: 'https://www.instagram.com/surtech_official/',
    website: 'https://www.surtech.edu.in', affiliation: 'MAKAUT',
    bio: 'Sur Tech (Dr Sudhir Chandra Sur Institute of Technology) is a NAAC-A accredited engineering college in Dum Dum, Kolkata. It is known for its CSE specializations in AI/ML, Cyber Security, and Data Science. Bihar Student Credit Card Scheme approved with affordable fees and strong campus placement.',
    highlights: ['NAAC "A" Accredited', 'Bihar DRCC / Jharkhand Guruji Approved', 'Specializations in AI/ML, Cyber Security', 'City Campus — Near Dum Dum Metro', 'Active Industry Internship Programs', 'Girls & Boys Hostel Available'],
    placement: { avg: '4.8 LPA', highest: '16 LPA', companies: ['TCS', 'Wipro', 'Cognizant', 'HCL', 'Capgemini'] },
    top_branches: ['CSE', 'CSE (AI & ML)', 'CSE (Cyber Security)', 'ECE', 'Civil', 'BCA', 'BBA'],
    color: '#7C3AED'
  },
  {
    id: 'aec', name: 'Asansol Engineering College', abbr: 'AEC', est: 1998, naac: 'A',
    location: 'Asansol, West Bengal', img: '🏗️',
    insta: '@asansolengineeringcollege', instaUrl: 'https://www.instagram.com/asansolengineeringcollege/',
    website: 'https://www.aecwb.edu.in', affiliation: 'MAKAUT',
    bio: 'Asansol Engineering College is one of the oldest and most reputed engineering institutions in West Bengal with over 25 years of academic excellence. NAAC-A accredited and Bihar DRCC approved. Offers a comprehensive range of B.Tech, Diploma, and IT programs at highly competitive fees.',
    highlights: ['NAAC "A" Accredited', '25+ Years of Excellence', 'Bihar DRCC / Student Credit Card Approved', 'Affordable Fees in the Region', 'Well-Equipped Workshops & Labs', 'Strong Alumni Network'],
    placement: { avg: '4.0 LPA', highest: '14 LPA', companies: ['TCS', 'Wipro', 'HCL', 'L&T', 'SAIL'] },
    top_branches: ['CSE', 'ECE', 'Mechanical', 'Civil', 'Electrical', 'IT', 'Diploma'],
    color: '#D97706'
  },
  {
    id: 'bwu', name: 'Brainware University', abbr: 'BWU', est: 2016, naac: 'UGC',
    location: 'Barasat, Kolkata', img: '🎓',
    insta: '@brainwareuniversity', instaUrl: 'https://www.instagram.com/brainwareuniversity/',
    website: 'https://www.brainwareuniversity.ac.in', affiliation: 'UGC Approved University',
    bio: 'Brainware University is a UGC-approved private university in Barasat offering B.Tech, BCA, MBA and other programs. Known for technology-integrated learning, industry tie-ups, and modern infrastructure. The university also offers the prestigious Medhabritti scholarship for meritorious students.',
    highlights: ['UGC Recognized University', 'Medhabritti Scholarship Available', 'Smart Campus with Digital Infrastructure', 'Industry-Integrated Curriculum', 'Multiple Specializations in CSE', 'Active Entrepreneurship Cell'],
    placement: { avg: '4.0 LPA', highest: '12 LPA', companies: ['Wipro', 'Cognizant', 'TCS', 'Infosys', 'Tech Mahindra'] },
    top_branches: ['CSE', 'CSE (AI & ML)', 'BCA', 'MBA'],
    color: '#DB2777'
  },
  {
    id: 'adamas', name: 'Adamas University', abbr: 'ADAMAS', est: 2014, naac: 'A',
    location: 'Barasat, Kolkata', img: '🏫',
    insta: '@adamas_university', instaUrl: 'https://www.instagram.com/adamas_university/',
    website: 'https://www.adamasuniversity.ac.in', affiliation: 'UGC / WBSCT&VE&SD',
    bio: 'Adamas University is a multi-disciplinary private university offering 80+ programs across Engineering, Law, Pharmacy, Science, Management, and Arts. NAAC-A accredited with a sprawling green campus. One of the most diverse universities in Eastern India with strong research output and placement networks.',
    highlights: ['NAAC "A" Accredited', '80+ Academic Programs', 'UGC Recognized University', 'Separate Law, Pharmacy & Medical Schools', 'International Faculty & Collaborations', 'State-of-the-Art Research Labs'],
    placement: { avg: '5.0 LPA', highest: '24 LPA', companies: ['Amazon', 'Deloitte', 'IBM', 'TCS', 'Infosys', 'PwC'] },
    top_branches: ['B.Tech CSE', 'B.Pharm', 'MBA', 'BBA', 'LLB', 'B.Sc', 'MCA'],
    color: '#0891B2'
  },
  {
    id: 'ies', name: 'IES University', abbr: 'IES', est: 1999, naac: 'B',
    location: 'Bhopal, Madhya Pradesh', img: '🏥',
    insta: '@ies_university_bhopal', instaUrl: 'https://www.instagram.com/ies_university_bhopal/',
    website: 'https://www.iesuniversity.ac.in', affiliation: 'UGC Recognized — MP State University',
    bio: 'IES University, Bhopal is a state-recognized private university offering Engineering, Management, and Technology programs at competitive fees. Located in the heart of Madhya Pradesh, it serves students from across India with Bihar DRCC and state scholarship schemes.',
    highlights: ['UGC Recognized University', 'Bihar DRCC Approved', 'Located in Bhopal — Education Hub', 'Strong Management Programs', 'Cultural & Sports Activities', 'Affordable Fee Structure'],
    placement: { avg: '3.5 LPA', highest: '10 LPA', companies: ['TCS', 'Wipro', 'Infosys', 'HCL'] },
    top_branches: ['CSE', 'ECE', 'Mechanical', 'MBA', 'BCA'],
    color: '#1B4D8E'
  },
  {
    id: 'svu', name: 'Swami Vivekananda University', abbr: 'SVU', est: 2019, naac: 'WBCER',
    location: 'Barrackpore, West Bengal', img: '🏫',
    insta: '@svu_barrackpore', instaUrl: 'https://www.instagram.com/svu_barrackpore/',
    website: 'https://www.svu.ac.in', affiliation: 'WBCER Approved',
    bio: 'Swami Vivekananda University is a relatively new private university located in Barrackpore, West Bengal. It offers UG and PG programs across multiple disciplines with modern facilities. Known for its affordable fee structure and approachable administration, ideal for students seeking quality education in a calm environment.',
    highlights: ['WBCER Approved University', 'Modern Campus Infrastructure', 'Affordable Fee Structure', 'Close to Kolkata City', 'Focus on Holistic Development', 'Bihar DRCC Guidance Available'],
    placement: { avg: '3.2 LPA', highest: '8 LPA', companies: ['Wipro', 'HCL', 'Tech Mahindra', 'Infosys'] },
    top_branches: ['CSE', 'ECE', 'MBA', 'BCA'],
    color: '#D97706'
  },
  {
    id: 'nshm_dgp', name: 'NSHM Knowledge Campus', abbr: 'NSHM', est: 2006, naac: 'B++',
    location: 'Durgapur, West Bengal', img: '🏫',
    insta: '@nshm_durgapur', instaUrl: 'https://www.instagram.com/nshm_durgapur/',
    website: 'https://www.nshm.com', affiliation: 'MAKAUT / UGC',
    bio: 'NSHM Knowledge Campus Durgapur is a NAAC B++ accredited institution known for its excellence in Healthcare Management, Hospital Administration, MBA, and allied health programs. Strategically located in Durgapur — a growing industrial hub of West Bengal with excellent placement outcomes.',
    highlights: ['NAAC "B++" Accredited', 'Speciality in Healthcare Management', 'Medhabritti Scholarship Available', 'Strong Hospital/Healthcare Placement', 'Industry-Integrated Programs', 'Durgapur Industrial Hub Location'],
    placement: { avg: '4.5 LPA', highest: '14 LPA', companies: ['Apollo', 'Fortis', 'AMRI', 'Wipro', 'TCS'] },
    top_branches: ['MBA (Healthcare)', 'MHA', 'MBA', 'MCA'],
    color: '#059669'
  },
  {
    id: 'iem', name: 'Institute of Engineering & Management', abbr: 'IEM', est: 1989, naac: 'A+',
    location: 'Salt Lake, Sector-5, Kolkata', img: '🏛️',
    insta: '@iem_kolkata', instaUrl: 'https://www.instagram.com/iem_kolkata/',
    website: 'https://www.iemcal.com', affiliation: 'MAKAUT',
    bio: 'IEM Kolkata is one of the oldest and most prestigious private engineering colleges in West Bengal, established in 1989. NAAC A+ accredited with a legacy of over 35 years, it is located in the heart of IT hub Sector-5, Salt Lake. Strong corporate connect with TCS, Infosys, Wipro, and 500+ companies visiting annually.',
    highlights: ['NAAC "A+" — Oldest Premium College (Est. 1989)', '35+ Years of Excellence', 'Located in Sector-5 IT Hub', '500+ Placement Partners', 'International Partnerships', 'Research Centers & Innovation Labs'],
    placement: { avg: '6.0 LPA', highest: '28 LPA', companies: ['Amazon', 'Google', 'Microsoft', 'TCS', 'Infosys', 'Wipro', 'IBM'] },
    top_branches: ['CSE', 'ECE', 'IT', 'Mechanical', 'Civil', 'MBA'],
    color: '#7C3AED'
  },
  {
    id: 'hit', name: 'Heritage Institute of Technology', abbr: 'HIT', est: 2001, naac: 'A',
    location: 'Anandapur, Kolkata', img: '🎓',
    insta: '@heritage_institute_kolkata', instaUrl: 'https://www.instagram.com/heritage_institute_kolkata/',
    website: 'https://www.heritageit.edu', affiliation: 'MAKAUT',
    bio: 'Heritage Institute of Technology is a NAAC-A accredited engineering college located in the quiet and green locality of Anandapur, Kolkata. Known for its disciplined academic environment, research culture, and strong placement network. Offers B.Tech in multiple branches with excellent hostel facilities.',
    highlights: ['NAAC "A" Accredited', 'Green & Peaceful Campus', 'Strong Research Output', 'Bihar DRCC Guidance Available', 'Well-Maintained Hostels', 'Active Placement Cell'],
    placement: { avg: '5.0 LPA', highest: '18 LPA', companies: ['TCS', 'Wipro', 'Cognizant', 'Infosys', 'Accenture'] },
    top_branches: ['CSE', 'ECE', 'Mechanical', 'Civil', 'IT'],
    color: '#DC2626'
  },
  {
    id: 'tiu', name: 'Techno India University', abbr: 'TIU', est: 2012, naac: 'A',
    location: 'Salt Lake, Sector-5, Kolkata', img: '🌟',
    insta: '@technoindiauniversity', instaUrl: 'https://www.instagram.com/technoindiauniversity/',
    website: 'https://www.technoindiauniversity.ac.in', affiliation: 'UGC Recognized University',
    bio: 'Techno India University is a UGC-recognized private university located in the thriving IT hub of Salt Lake, Sector-5, Kolkata. It offers B.Tech, MBA, MCA, and allied programs with strong industry connections. The university is part of the Techno India Group and known for modern pedagogy and entrepreneurship support.',
    highlights: ['UGC Recognized University', 'Located in IT Hub — Sector-5', 'Techno India Group Institution', 'Entrepreneurship & Startup Cell', 'Modern Teaching Methodology', 'Strong Industry Connect'],
    placement: { avg: '4.8 LPA', highest: '20 LPA', companies: ['TCS', 'Wipro', 'Infosys', 'Cognizant', 'Amazon'] },
    top_branches: ['CSE', 'ECE', 'MBA', 'MCA', 'IT'],
    color: '#0891B2'
  },
  {
    id: 'haldia', name: 'Haldia Institute of Technology', abbr: 'HIT (Haldia)', est: 1996, naac: 'A',
    location: 'Haldia, West Bengal', img: '🏭',
    insta: '@haldia_institute', instaUrl: 'https://www.instagram.com/haldia_institute/',
    website: 'https://www.hithaldia.ac.in', affiliation: 'MAKAUT',
    bio: 'Haldia Institute of Technology is one of the largest and most recognized engineering colleges in West Bengal, established in 1996. NAAC-A accredited with vast campus, multiple B.Tech branches, and strong industrial placement network in the Haldia petrochemical belt.',
    highlights: ['NAAC "A" Accredited', '25+ Years of Excellence', 'Large Campus with Full Facilities', 'Industrial Belt Placement Advantage', 'Bihar DRCC Approved', 'Research & Development Focus'],
    placement: { avg: '4.5 LPA', highest: '15 LPA', companies: ['ONGC', 'IOCL', 'TCS', 'Wipro', 'HCL', 'HPCL'] },
    top_branches: ['CSE', 'Chemical Engineering', 'Mechanical', 'ECE', 'Civil', 'IT'],
    color: '#D97706'
  },
  {
    id: 'nsec', name: 'Netaji Subhash Engineering College', abbr: 'NSEC', est: 1997, naac: 'A',
    location: 'Garia, Kolkata', img: '🏢',
    insta: '@nsec_kolkata', instaUrl: 'https://www.instagram.com/nsec_kolkata/',
    website: 'https://www.nsec.ac.in', affiliation: 'MAKAUT',
    bio: 'Netaji Subhash Engineering College (NSEC), established in 1997, is a NAAC-A accredited engineering college located in Garia, South Kolkata. It is well-known for its strong academic discipline, experienced faculty pool, and consistent placement record. Bihar DRCC scheme is available.',
    highlights: ['NAAC "A" Accredited', 'South Kolkata — Well Connected Location', 'Experienced Faculty Pool', 'Bihar DRCC Approved', 'Strong Alumni Network', 'Active Technical Clubs'],
    placement: { avg: '4.3 LPA', highest: '15 LPA', companies: ['TCS', 'Infosys', 'Wipro', 'HCL', 'Tech Mahindra'] },
    top_branches: ['CSE', 'ECE', 'Mechanical', 'Civil', 'Electrical'],
    color: '#1B4D8E'
  },
  {
    id: 'msit', name: 'Meghnad Saha Institute of Technology', abbr: 'MSIT', est: 2001, naac: 'A',
    location: 'Anandapur, Kolkata', img: '🏗️',
    insta: '@msit_kolkata', instaUrl: 'https://www.instagram.com/msit_kolkata/',
    website: 'https://www.msit.ac.in', affiliation: 'MAKAUT',
    bio: 'Meghnad Saha Institute of Technology is a NAAC-A accredited engineering college in Anandapur, Kolkata. Named after the legendary physicist Meghnad Saha, it upholds a tradition of scientific inquiry and technical excellence. Offers B.Tech in multiple streams with a focused placement training program.',
    highlights: ['NAAC "A" Accredited', 'Named After Legendary Physicist Meghnad Saha', 'Strong Research Orientation', 'Bihar DRCC Guidance Available', 'Hostel Facilities', 'Dedicated Soft Skills & Placement Training'],
    placement: { avg: '4.2 LPA', highest: '14 LPA', companies: ['TCS', 'Wipro', 'Infosys', 'Capgemini', 'HCL'] },
    top_branches: ['CSE', 'ECE', 'Mechanical', 'Civil', 'IT'],
    color: '#059669'
  },
];

const COURSES = [
  // ===== B.Tech (1st Year) =====
  { name: 'Agricultural Engineering', type: 'B.Tech (1st Year)', category: 'btech', colleges: ['JISCE'], duration: 4, totalFee: 360000, hostelBoys: 550000, hostelGirls: 530000, yearWise: [90000,90000,90000,90000], hostelBoysYW: [140000,140000,135000,135000], hostelGirlsYW: [135000,135000,130000,130000], eligibility: 'Min 60% in 10+2 with PCM.' },
  { name: 'Bio Medical Engineering', type: 'B.Tech (1st Year)', category: 'btech', colleges: ['JISCE'], duration: 4, totalFee: 360000, hostelBoys: 550000, hostelGirls: 530000, yearWise: [90000,90000,90000,90000], hostelBoysYW: [140000,140000,135000,135000], hostelGirlsYW: [135000,135000,130000,130000], eligibility: 'Min 60% in 10+2 with PCM.' },
  { name: 'Civil Engineering', type: 'B.Tech (1st Year)', category: 'btech', colleges: ['JISCE','NIT','AEC','SURTECH'], duration: 4, totalFee: 360000, hostelBoys: 550000, hostelGirls: 530000, yearWise: [90000,90000,90000,90000], hostelBoysYW: [140000,140000,135000,135000], hostelGirlsYW: [135000,135000,130000,130000], eligibility: 'Min 60% in 10+2 with PCM.' },
  { name: 'Mechanical Engineering', type: 'B.Tech (1st Year)', category: 'btech', colleges: ['JISCE','NIT','AEC','SURTECH'], duration: 4, totalFee: 360000, hostelBoys: 550000, hostelGirls: 530000, yearWise: [90000,90000,90000,90000], hostelBoysYW: [140000,140000,135000,135000], hostelGirlsYW: [135000,135000,130000,130000], eligibility: 'Min 60% in 10+2 with PCM.' },
  { name: 'Electrical Engineering', type: 'B.Tech (1st Year)', category: 'btech', colleges: ['JISCE','GNIT','AEC','SURTECH'], duration: 4, totalFee: 360000, hostelBoys: 550000, hostelGirls: 530000, yearWise: [90000,90000,90000,90000], hostelBoysYW: [140000,140000,135000,135000], hostelGirlsYW: [135000,135000,130000,130000], eligibility: 'Min 60% in 10+2 with PCM.' },
  { name: 'Food Technology', type: 'B.Tech (1st Year)', category: 'btech', colleges: ['GNIT'], duration: 4, totalFee: 360000, hostelBoys: 550000, hostelGirls: 530000, yearWise: [90000,90000,90000,90000], hostelBoysYW: [140000,140000,135000,135000], hostelGirlsYW: [135000,135000,130000,130000], eligibility: 'Min 60% in 10+2 with PCM.' },
  { name: 'Automobile Engineering', type: 'B.Tech (1st Year)', category: 'btech', colleges: ['SURTECH'], duration: 4, totalFee: 360000, hostelBoys: 550000, hostelGirls: 530000, yearWise: [90000,90000,90000,90000], hostelBoysYW: [140000,140000,135000,135000], hostelGirlsYW: [135000,135000,130000,130000], eligibility: 'Min 60% in 10+2 with PCM.' },
  { name: 'Electronics & Communication Engineering', type: 'B.Tech (1st Year)', category: 'btech', colleges: ['JISCE','GNIT','AEC'], duration: 4, totalFee: 450000, hostelBoys: 650000, hostelGirls: 630000, yearWise: [115000,115000,110000,110000], hostelBoysYW: [165000,165000,160000,160000], hostelGirlsYW: [160000,160000,155000,155000], eligibility: 'Min 60% in 10+2 with PCM.' },
  { name: 'Electronics & Communication Engineering', type: 'B.Tech (1st Year)', category: 'btech', colleges: ['SURTECH'], duration: 4, totalFee: 410000, hostelBoys: 600000, hostelGirls: 580000, yearWise: [110000,100000,100000,100000], hostelBoysYW: [150000,150000,150000,150000], hostelGirlsYW: [145000,145000,145000,145000], eligibility: 'Min 60% in 10+2 with PCM.' },
  { name: 'Computer Science & Technology', type: 'B.Tech (1st Year)', category: 'btech', colleges: ['JISCE'], duration: 4, totalFee: 600000, hostelBoys: 800000, hostelGirls: 780000, yearWise: [150000,150000,150000,150000], hostelBoysYW: [200000,200000,200000,200000], hostelGirlsYW: [195000,195000,195000,195000], eligibility: 'Min 60% in 10+2 with PCM.' },
  { name: 'Information Technology', type: 'B.Tech (1st Year)', category: 'btech', colleges: ['JISCE','AEC'], duration: 4, totalFee: 600000, hostelBoys: 800000, hostelGirls: 780000, yearWise: [150000,150000,150000,150000], hostelBoysYW: [200000,200000,200000,200000], hostelGirlsYW: [195000,195000,195000,195000], eligibility: 'Min 60% in 10+2 with PCM.' },
  { name: 'CSE (IOT) / CS & Business Systems', type: 'B.Tech (1st Year)', category: 'btech', colleges: ['AEC'], duration: 4, totalFee: 600000, hostelBoys: 800000, hostelGirls: 780000, yearWise: [150000,150000,150000,150000], hostelBoysYW: [200000,200000,200000,200000], hostelGirlsYW: [195000,195000,195000,195000], eligibility: 'Min 60% in 10+2 with PCM.' },
  { name: 'CSE (Data Science) / CSE (Cyber Security)', type: 'B.Tech (1st Year)', category: 'btech', colleges: ['SURTECH'], duration: 4, totalFee: 560000, hostelBoys: 800000, hostelGirls: 780000, yearWise: [140000,140000,140000,140000], hostelBoysYW: [200000,200000,200000,200000], hostelGirlsYW: [195000,195000,195000,195000], eligibility: 'Min 60% in 10+2 with PCM.' },
  { name: 'CSE / CSE (AI & ML)', type: 'B.Tech (1st Year)', category: 'btech', colleges: ['SURTECH'], duration: 4, totalFee: 580000, hostelBoys: 850000, hostelGirls: 830000, yearWise: [145000,145000,145000,145000], hostelBoysYW: [215000,215000,210000,210000], hostelGirlsYW: [210000,210000,205000,205000], eligibility: 'Min 60% in 10+2 with PCM.' },

  // ===== Diploma (1st Year) =====
  { name: 'Electrical Engineering', type: 'Diploma (1st Year)', category: 'diploma', colleges: ['JISCE','NIT','GNIT'], duration: 3, totalFee: 180000, hostelBoys: 360000, hostelGirls: 345000, yearWise: [70000,55000,55000], hostelBoysYW: [130000,115000,115000], hostelGirlsYW: [125000,110000,110000] },
  { name: 'Electrical Engineering', type: 'Diploma (1st Year)', category: 'diploma', colleges: ['AEC'], duration: 3, totalFee: 160000, hostelBoys: 360000, hostelGirls: 345000, yearWise: [60000,50000,50000], hostelBoysYW: [130000,115000,115000], hostelGirlsYW: [125000,110000,110000] },
  { name: 'Mechanical Engineering', type: 'Diploma (1st Year)', category: 'diploma', colleges: ['JISCE','NIT'], duration: 3, totalFee: 180000, hostelBoys: 360000, hostelGirls: 345000, yearWise: [70000,55000,55000], hostelBoysYW: [130000,115000,115000], hostelGirlsYW: [125000,110000,110000] },
  { name: 'Mechanical Engineering', type: 'Diploma (1st Year)', category: 'diploma', colleges: ['AEC'], duration: 3, totalFee: 160000, hostelBoys: 360000, hostelGirls: 345000, yearWise: [60000,50000,50000], hostelBoysYW: [130000,115000,115000], hostelGirlsYW: [125000,110000,110000] },
  { name: 'Electronics & Telecommunication Engineering', type: 'Diploma (1st Year)', category: 'diploma', colleges: ['NIT','GNIT'], duration: 3, totalFee: 180000, hostelBoys: 360000, hostelGirls: 345000, yearWise: [70000,55000,55000], hostelBoysYW: [130000,115000,115000], hostelGirlsYW: [125000,110000,110000] },
  { name: 'Electronics & Telecommunication Engineering', type: 'Diploma (1st Year)', category: 'diploma', colleges: ['AEC','JISCE'], duration: 3, totalFee: 160000, hostelBoys: 360000, hostelGirls: 345000, yearWise: [60000,50000,50000], hostelBoysYW: [130000,115000,115000], hostelGirlsYW: [125000,110000,110000] },
  { name: 'Civil Engineering', type: 'Diploma (1st Year)', category: 'diploma', colleges: ['NIT'], duration: 3, totalFee: 180000, hostelBoys: 360000, hostelGirls: 345000, yearWise: [70000,55000,55000], hostelBoysYW: [130000,115000,115000], hostelGirlsYW: [125000,110000,110000] },
  { name: 'Civil Engineering', type: 'Diploma (1st Year)', category: 'diploma', colleges: ['AEC','SURTECH'], duration: 3, totalFee: 160000, hostelBoys: 360000, hostelGirls: 345000, yearWise: [60000,50000,50000], hostelBoysYW: [130000,115000,115000], hostelGirlsYW: [125000,110000,110000] },
  { name: 'Automobile Engineering', type: 'Diploma (1st Year)', category: 'diploma', colleges: ['SURTECH'], duration: 3, totalFee: 160000, hostelBoys: 360000, hostelGirls: 345000, yearWise: [60000,50000,50000], hostelBoysYW: [130000,115000,115000], hostelGirlsYW: [125000,110000,110000] },
  { name: 'Computer Science & Technology', type: 'Diploma (1st Year)', category: 'diploma', colleges: ['AEC'], duration: 3, totalFee: 160000, hostelBoys: 360000, hostelGirls: 345000, yearWise: [60000,50000,50000], hostelBoysYW: [130000,115000,115000], hostelGirlsYW: [125000,110000,110000] },

  // ===== MBA =====
  { name: 'MBA', type: 'MBA', category: 'mba', colleges: ['JISCE'], duration: 2, totalFee: 410000, hostelBoys: 500000, hostelGirls: 490000, yearWise: [210000,200000], hostelBoysYW: [260000,240000], hostelGirlsYW: [255000,235000] },
  { name: 'MBA (Healthcare & Hospital Management)', type: 'MBA', category: 'mba', colleges: ['nshm_dgp'], duration: 2, totalFee: 505600, hostelBoys: 160000, hostelGirls: 160000, yearWise: [280000,225600], hostelBoysYW: [80000,80000], hostelGirlsYW: [80000,80000] },
  { name: 'MBA (Master of Business Administration)', type: 'MBA', category: 'mba', colleges: ['nshm_dgp'], duration: 2, totalFee: 625200, hostelBoys: 160000, hostelGirls: 160000, yearWise: [337800,287400], hostelBoysYW: [80000,80000], hostelGirlsYW: [80000,80000] },
  { name: 'Master of Hospital Administration (MHA)', type: 'MHA', category: 'mba', colleges: ['nshm_dgp'], duration: 2, totalFee: 467500, hostelBoys: 160000, hostelGirls: 160000, yearWise: [260000,207500], hostelBoysYW: [80000,80000], hostelGirlsYW: [80000,80000] },

  // ===== MCA =====
  { name: 'MCA', type: 'MCA', category: 'mca', colleges: ['JISCE'], duration: 2, totalFee: 300000, hostelBoys: 400000, hostelGirls: 390000, yearWise: [160000,140000], hostelBoysYW: [210000,190000], hostelGirlsYW: [205000,185000] },
  { name: 'MCA', type: 'MCA', category: 'mca', colleges: ['nshm_dgp'], duration: 2, totalFee: 255600, hostelBoys: 160000, hostelGirls: 160000, yearWise: [153000,102600], hostelBoysYW: [80000,80000], hostelGirlsYW: [80000,80000] },

  // ===== BCA =====
  { name: 'BCA', type: 'BCA', category: 'bca', colleges: ['JISCE'], duration: 3, totalFee: 325000, hostelBoys: 525000, hostelGirls: 510000, yearWise: [110000,110000,105000], hostelBoysYW: [175000,175000,175000], hostelGirlsYW: [170000,170000,170000] },
  { name: 'BCA', type: 'BCA', category: 'bca', colleges: ['SURTECH'], duration: 3, totalFee: 325000, hostelBoys: 500000, hostelGirls: 485000, yearWise: [110000,110000,105000], hostelBoysYW: [170000,165000,165000], hostelGirlsYW: [165000,160000,160000] },

  // ===== BBA =====
  { name: 'BBA / BBA (Digital Marketing) / BBA (Hospital Management)', type: 'BBA', category: 'bba', colleges: ['JISCE'], duration: 3, totalFee: 280000, hostelBoys: 450000, hostelGirls: 435000, yearWise: [100000,90000,90000], hostelBoysYW: [150000,150000,150000], hostelGirlsYW: [145000,145000,145000] },
  { name: 'BBA', type: 'BBA', category: 'bba', colleges: ['SURTECH'], duration: 3, totalFee: 280000, hostelBoys: 430000, hostelGirls: 415000, yearWise: [110000,105000,65000], hostelBoysYW: [145000,145000,140000], hostelGirlsYW: [140000,140000,135000] },

  // ===== B.Tech (Lateral) =====
  { name: 'Agricultural Engineering / Bio Medical Engineering', type: 'B.Tech (Lateral)', category: 'btech-lateral', colleges: ['JISCE'], duration: 3, totalFee: 290000, hostelBoys: 420000, hostelGirls: 405000, yearWise: [100000,95000,95000], hostelBoysYW: [140000,140000,140000], hostelGirlsYW: [135000,135000,135000] },
  { name: 'Civil Engineering', type: 'B.Tech (Lateral)', category: 'btech-lateral', colleges: ['JISCE','NIT','AEC','SURTECH'], duration: 3, totalFee: 290000, hostelBoys: 420000, hostelGirls: 405000, yearWise: [100000,95000,95000], hostelBoysYW: [140000,140000,140000], hostelGirlsYW: [135000,135000,135000] },
  { name: 'Mechanical Engineering', type: 'B.Tech (Lateral)', category: 'btech-lateral', colleges: ['JISCE','AEC','SURTECH'], duration: 3, totalFee: 290000, hostelBoys: 420000, hostelGirls: 405000, yearWise: [100000,95000,95000], hostelBoysYW: [140000,140000,140000], hostelGirlsYW: [135000,135000,135000] },
  { name: 'Electrical Engineering', type: 'B.Tech (Lateral)', category: 'btech-lateral', colleges: ['JISCE','GNIT','AEC','SURTECH'], duration: 3, totalFee: 290000, hostelBoys: 420000, hostelGirls: 405000, yearWise: [100000,95000,95000], hostelBoysYW: [140000,140000,140000], hostelGirlsYW: [135000,135000,135000] },
  { name: 'Electronics & Communication Engineering', type: 'B.Tech (Lateral)', category: 'btech-lateral', colleges: ['JISCE','SURTECH'], duration: 3, totalFee: 290000, hostelBoys: 420000, hostelGirls: 405000, yearWise: [100000,95000,95000], hostelBoysYW: [140000,140000,140000], hostelGirlsYW: [135000,135000,135000] },
  { name: 'Automobile Engineering', type: 'B.Tech (Lateral)', category: 'btech-lateral', colleges: ['SURTECH'], duration: 3, totalFee: 290000, hostelBoys: 420000, hostelGirls: 405000, yearWise: [100000,95000,95000], hostelBoysYW: [140000,140000,140000], hostelGirlsYW: [135000,135000,135000] },

  // ===== Brainware University =====
  { name: 'Computer Applications (Honours)', type: 'BCA', category: 'bca', colleges: ['BWU'], duration: 4, totalFee: 482600, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [154400, 121400, 103400, 103400], hostelBoysYW: ['N/A','N/A','N/A','N/A'], hostelGirlsYW: ['N/A','N/A','N/A','N/A'], eligibility: 'Minimum 50% marks in 10+2.' },
  { name: 'Computer Science & Engineering', type: 'B.Tech', category: 'btech', colleges: ['BWU'], duration: 4, totalFee: 579600, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [194400, 150400, 133400, 101400], hostelBoysYW: ['N/A','N/A','N/A','N/A'], hostelGirlsYW: ['N/A','N/A','N/A','N/A'], eligibility: 'Minimum 60% marks in 10+2 with Physics & Mathematics.' },
  { name: 'Computer Science & Engineering (AI & ML)', type: 'B.Tech', category: 'btech', colleges: ['BWU'], duration: 4, totalFee: 579600, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [194400, 150400, 133400, 101400], hostelBoysYW: ['N/A','N/A','N/A','N/A'], hostelGirlsYW: ['N/A','N/A','N/A','N/A'], eligibility: 'Minimum 60% marks in 10+2 with Physics & Mathematics.' },

  // ===== Adamas University (Grouped for all 82 programs) =====
  
  // Engineering & Technology
  { name: 'B.Tech (Computer Science & Engineering)', type: 'B.Tech', category: 'engineering', colleges: ['ADAMAS'], duration: 4, totalFee: 931800, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [232950,232950,232950,232950], hostelBoysYW: ['N/A','N/A','N/A','N/A'], hostelGirlsYW: ['N/A','N/A','N/A','N/A'], eligibility: 'Min 60% aggregate in 10+2 or equivalent from any recognized board with PM + Chem/Bio/Tech Vocational.' },
  { name: 'B.Tech CSE (AI & ML)', type: 'B.Tech', category: 'engineering', colleges: ['ADAMAS'], duration: 4, totalFee: 923800, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [230950,230950,230950,230950], hostelBoysYW: ['N/A','N/A','N/A','N/A'], hostelGirlsYW: ['N/A','N/A','N/A','N/A'], eligibility: 'Min 60% aggregate in 10+2 with PM + Chem/Bio/Vocational.' },
  { name: 'B.Tech CSE (Cyber Security / Cloud Computing / Data Science / Robotics)', type: 'B.Tech', category: 'engineering', colleges: ['ADAMAS'], duration: 4, totalFee: 931800, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [232950,232950,232950,232950], hostelBoysYW: ['N/A','N/A','N/A','N/A'], hostelGirlsYW: ['N/A','N/A','N/A','N/A'], eligibility: 'Min 60% aggregate in 10+2 with PM + Chem/Bio/Vocational.' },
  { name: 'B.Tech (Biomedical / Biotechnology)', type: 'B.Tech', category: 'engineering', colleges: ['ADAMAS'], duration: 4, totalFee: 856396, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [214099,214099,214099,214099], hostelBoysYW: ['N/A','N/A','N/A','N/A'], hostelGirlsYW: ['N/A','N/A','N/A','N/A'], eligibility: 'Min 55% aggregate in 10+2 with PCB/PCM required.' },
  { name: 'B.Tech (Civil / Electrical / Mechanical / ECE)', type: 'B.Tech', category: 'engineering', colleges: ['ADAMAS'], duration: 4, totalFee: 612800, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [153200,153200,153200,153200], hostelBoysYW: ['N/A','N/A','N/A','N/A'], hostelGirlsYW: ['N/A','N/A','N/A','N/A'], eligibility: 'Min 55% aggregate in 10+2 with PM + Chem/Bio/Vocational.' },
  { name: 'M.Tech (Data Science / Structural / CSE)', type: 'M.Tech', category: 'engineering', colleges: ['ADAMAS'], duration: 2, totalFee: 371800, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [185900,185900], hostelBoysYW: ['N/A','N/A'], hostelGirlsYW: ['N/A','N/A'], eligibility: 'Min 50% aggregate in 10+2 and 60% in B.Tech / GATE / AUAT qualified.' },

  // Computer Applications
  { name: 'BCA', type: 'BCA', category: 'computer_applications', colleges: ['ADAMAS'], duration: 4, totalFee: 598680, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [149670,149670,149670,149670], hostelBoysYW: ['N/A','N/A','N/A','N/A'], hostelGirlsYW: ['N/A','N/A','N/A','N/A'], eligibility: 'Min 60% aggregate in 10+2 or equivalent from any recognized board.' },
  { name: 'MCA', type: 'MCA', category: 'computer_applications', colleges: ['ADAMAS'], duration: 2, totalFee: 344800, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [172400,172400], hostelBoysYW: ['N/A','N/A'], hostelGirlsYW: ['N/A','N/A'], eligibility: 'Min 50% aggregate in 10+2 and 50% aggregate in BCA / B.Sc with Mathematics.' },

  // Business & Management
  { name: 'BBA (Digital Marketing / Logistics / Business Analytics / General)', type: 'BBA', category: 'management', colleges: ['ADAMAS'], duration: 4, totalFee: 747198, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [186800,186800,186800,186800], hostelBoysYW: ['N/A','N/A','N/A','N/A'], hostelGirlsYW: ['N/A','N/A','N/A','N/A'], eligibility: 'Min 60% aggregate in 10+2 from any recognized board.' },
  { name: 'B.Com (Hons)', type: 'B.Com', category: 'management', colleges: ['ADAMAS'], duration: 4, totalFee: 432392, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [108098,108098,108098,108098], hostelBoysYW: ['N/A','N/A','N/A','N/A'], hostelGirlsYW: ['N/A','N/A','N/A','N/A'], eligibility: 'Min 55% aggregate in 10+2 from any recognized board.' },
  { name: 'MBA (Finance / HR / Marketing / Business Analytics)', type: 'MBA', category: 'management', colleges: ['ADAMAS'], duration: 2, totalFee: 832800, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [416400,416400], hostelBoysYW: ['N/A','N/A'], hostelGirlsYW: ['N/A','N/A'], eligibility: 'Min 50% aggregate in 10+2 and 60% in UG, CAT/MAT/XAT/AUAT qualified.' },

  // Law & Justice
  { name: 'BA LLB (Hons) / BBA LLB (Hons)', type: 'Law', category: 'law', colleges: ['ADAMAS'], duration: 5, totalFee: 1025800, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [205160,205160,205160,205160,205160], hostelBoysYW: ['N/A','N/A','N/A','N/A','N/A'], hostelGirlsYW: ['N/A','N/A','N/A','N/A','N/A'], eligibility: 'Min 60% aggregate in 10+2 & CLAT / AUAT qualified.' },
  { name: 'LLB', type: 'Law', category: 'law', colleges: ['ADAMAS'], duration: 3, totalFee: 450000, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [150000,150000,150000], hostelBoysYW: ['N/A','N/A','N/A'], hostelGirlsYW: ['N/A','N/A','N/A'], eligibility: 'Min 50% aggregate in 10+2 and Min 50% in Graduation.' },
  { name: 'LLM', type: 'Law', category: 'law', colleges: ['ADAMAS'], duration: 2, totalFee: 297552, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [148776,148776], hostelBoysYW: ['N/A','N/A'], hostelGirlsYW: ['N/A','N/A'], eligibility: 'Min 50% aggregate in LLB / BA-LLB.' },

  // Pharmacy & Health Sciences
  { name: 'B.Pharm', type: 'Pharmacy', category: 'pharmacy_health', colleges: ['ADAMAS'], duration: 4, totalFee: 956106, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [239026,239026,239026,239026], hostelBoysYW: ['N/A','N/A','N/A','N/A'], hostelGirlsYW: ['N/A','N/A','N/A','N/A'], eligibility: 'Min 50% aggregate in 10+2 with Physics, Chemistry, Maths/Bio (English as subject). Open Schooling not eligible.' },
  { name: 'D.Pharm', type: 'Pharmacy', category: 'pharmacy_health', colleges: ['ADAMAS'], duration: 2, totalFee: 357100, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [178550,178550], hostelBoysYW: ['N/A','N/A'], hostelGirlsYW: ['N/A','N/A'], eligibility: 'Pass in 10+2 with Physics, Chemistry and Biology/Mathematics.' },
  { name: 'M.Pharm (Pharmaceutics / Pharmacology)', type: 'Pharmacy', category: 'pharmacy_health', colleges: ['ADAMAS'], duration: 2, totalFee: 461788, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [230894,230894], hostelBoysYW: ['N/A','N/A'], hostelGirlsYW: ['N/A','N/A'], eligibility: 'B.Pharm degree with min 55% marks.' },
  { name: 'B.Sc Medical Laboratory Technology (BMLT)', type: 'Allied Health', category: 'pharmacy_health', colleges: ['ADAMAS'], duration: 4, totalFee: 492158, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [123039,123039,123039,123039], hostelBoysYW: ['N/A','N/A','N/A','N/A'], hostelGirlsYW: ['N/A','N/A','N/A','N/A'], eligibility: 'Min 50% aggregate in 10+2 with Chemistry, Physics & Biology.' },
  { name: 'Bachelor of Optometry', type: 'Allied Health', category: 'pharmacy_health', colleges: ['ADAMAS'], duration: 4, totalFee: 492778, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [123194,123194,123194,123194], hostelBoysYW: ['N/A','N/A','N/A','N/A'], hostelGirlsYW: ['N/A','N/A','N/A','N/A'], eligibility: 'Min 50% aggregate in 10+2 with Physics, Chemistry and Bio/Maths.' },

  // Sciences (B.Sc, M.Sc)
  { name: 'B.Sc (Hons) Chemistry / Physics / Maths / Geography', type: 'B.Sc', category: 'science', colleges: ['ADAMAS'], duration: 4, totalFee: 391800, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [97950,97950,97950,97950], hostelBoysYW: ['N/A','N/A','N/A','N/A'], hostelGirlsYW: ['N/A','N/A','N/A','N/A'], eligibility: 'Min 50% aggregate in 10+2 with respective subjects.' },
  { name: 'B.Sc (Hons) Forensic Science / Statistics', type: 'B.Sc', category: 'science', colleges: ['ADAMAS'], duration: 4, totalFee: 593100, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [148275,148275,148275,148275], hostelBoysYW: ['N/A','N/A','N/A','N/A'], hostelGirlsYW: ['N/A','N/A','N/A','N/A'], eligibility: 'Min 50% aggregate in 10+2 with PCM/PCB.' },
  { name: 'B.Sc (Hons) Biotechnology / Microbiology', type: 'B.Sc', category: 'science', colleges: ['ADAMAS'], duration: 4, totalFee: 681800, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [170450,170450,170450,170450], hostelBoysYW: ['N/A','N/A','N/A','N/A'], hostelGirlsYW: ['N/A','N/A','N/A','N/A'], eligibility: 'Min 55% aggregate in 10+2 with respective subjects.' },
  { name: 'M.Sc (Physics / Chemistry / Mathematics / Geography)', type: 'M.Sc', category: 'science', colleges: ['ADAMAS'], duration: 2, totalFee: 271800, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [135900,135900], hostelBoysYW: ['N/A','N/A'], hostelGirlsYW: ['N/A','N/A'], eligibility: 'Min 50% aggregate in UG with respective subject.' },
  { name: 'M.Sc (Biotechnology / Microbiology / Biochemistry)', type: 'M.Sc', category: 'science', colleges: ['ADAMAS'], duration: 2, totalFee: 431800, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [215900,215900], hostelBoysYW: ['N/A','N/A'], hostelGirlsYW: ['N/A','N/A'], eligibility: 'Min 50% aggregate in UG with respective subject.' },

  // Arts & Humanities
  { name: 'BA (English / Bengali / History / Pol Science / Sociology)', type: 'BA', category: 'arts_humanities', colleges: ['ADAMAS'], duration: 4, totalFee: 350100, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [87525,87525,87525,87525], hostelBoysYW: ['N/A','N/A','N/A','N/A'], hostelGirlsYW: ['N/A','N/A','N/A','N/A'], eligibility: 'Min 50% aggregate in 10+2 from any recognized board.' },
  { name: 'BA (Journalism & Mass Communication)', type: 'BA', category: 'arts_humanities', colleges: ['ADAMAS'], duration: 4, totalFee: 454140, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [113535,113535,113535,113535], hostelBoysYW: ['N/A','N/A','N/A','N/A'], hostelGirlsYW: ['N/A','N/A','N/A','N/A'], eligibility: 'Min 50% aggregate in 10+2.' },
  { name: 'MA (English / History / Pol Science / Sociology / Journalism)', type: 'MA', category: 'arts_humanities', colleges: ['ADAMAS'], duration: 2, totalFee: 213952, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [106976,106976], hostelBoysYW: ['N/A','N/A'], hostelGirlsYW: ['N/A','N/A'], eligibility: 'Min 50% aggregate in UG.' },

  // Agriculture
  { name: 'B.Sc (Hons) Agriculture', type: 'Agriculture', category: 'agriculture', colleges: ['ADAMAS'], duration: 4, totalFee: 493154, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [123288,123288,123288,123288], hostelBoysYW: ['N/A','N/A','N/A','N/A'], hostelGirlsYW: ['N/A','N/A','N/A','N/A'], eligibility: 'Min 50% aggregate in 10+2 with PCM/PCB/Vocational Agriculture.' },

  // Education
  { name: 'B.Ed', type: 'Education', category: 'education', colleges: ['ADAMAS'], duration: 2, totalFee: 231800, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [115900,115900], hostelBoysYW: ['N/A','N/A'], hostelGirlsYW: ['N/A','N/A'], eligibility: 'Graduate and/or Post Graduate with 50% marks (55% for B.Tech/Engineering).' },
  { name: 'BA (Hons) Education', type: 'Education', category: 'education', colleges: ['ADAMAS'], duration: 4, totalFee: 289100, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [72275,72275,72275,72275], hostelBoysYW: ['N/A','N/A','N/A','N/A'], hostelGirlsYW: ['N/A','N/A','N/A','N/A'], eligibility: 'Min 50% aggregate in 10+2.' },

  // ===== IES University / College of Technology, Bhopal =====
  
  // Pharmacy & Health Sciences (Nursing / Paramedical / Pharmacy)
  { name: 'B.Sc Nursing', type: 'Nursing', category: 'pharmacy_health', colleges: ['IES'], duration: 4, totalFee: 420000, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [105000, 105000, 105000, 105000], hostelBoysYW: ['N/A','N/A','N/A','N/A'], hostelGirlsYW: ['N/A','N/A','N/A','N/A'], eligibility: 'Pass in 10+2 with PCB (Minimum 45%).' },
  { name: 'P.B. Nursing', type: 'Nursing', category: 'pharmacy_health', colleges: ['IES'], duration: 2, totalFee: 140000, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [70000, 70000], hostelBoysYW: ['N/A','N/A'], hostelGirlsYW: ['N/A','N/A'], eligibility: 'GNM Pass.' },
  { name: 'GNM', type: 'Nursing', category: 'pharmacy_health', colleges: ['IES'], duration: 3, totalFee: 180000, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [60000, 60000, 60000], hostelBoysYW: ['N/A','N/A','N/A'], hostelGirlsYW: ['N/A','N/A','N/A'], eligibility: 'Pass in 10+2.' },
  { name: 'M.Sc Nursing (Psychiatrist / CHN)', type: 'Nursing', category: 'pharmacy_health', colleges: ['IES'], duration: 2, totalFee: 300000, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [150000, 150000], hostelBoysYW: ['N/A','N/A'], hostelGirlsYW: ['N/A','N/A'], eligibility: 'B.Sc Nursing Pass.' },
  { name: 'Bachelor of Physiotherapy (BPT)', type: 'Paramedical', category: 'pharmacy_health', colleges: ['IES'], duration: 4, totalFee: 240000, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [60000, 60000, 60000, 60000], hostelBoysYW: ['N/A','N/A','N/A','N/A'], hostelGirlsYW: ['N/A','N/A','N/A','N/A'], eligibility: 'Pass in 10+2 with PCB.' },
  { name: 'B.Sc Medical Laboratory Technology (BMLT)', type: 'Paramedical', category: 'pharmacy_health', colleges: ['IES'], duration: 3, totalFee: 180000, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [60000, 60000, 60000], hostelBoysYW: ['N/A','N/A','N/A'], hostelGirlsYW: ['N/A','N/A','N/A'], eligibility: 'Pass in 10+2 with PCB.' },
  { name: 'Diploma Medical Laboratory Technology (DMLT)', type: 'Paramedical', category: 'pharmacy_health', colleges: ['IES'], duration: 2, totalFee: 80000, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [40000, 40000], hostelBoysYW: ['N/A','N/A'], hostelGirlsYW: ['N/A','N/A'], eligibility: 'Pass in 10+2 with PCB.' },
  { name: 'OT Technician', type: 'Paramedical', category: 'pharmacy_health', colleges: ['IES'], duration: 2, totalFee: 60000, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [30000, 30000], hostelBoysYW: ['N/A','N/A'], hostelGirlsYW: ['N/A','N/A'], eligibility: 'Pass in 10+2.' },
  { name: 'B.Pharma', type: 'Pharmacy', category: 'pharmacy_health', colleges: ['IES'], duration: 4, totalFee: 440000, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [110000, 110000, 110000, 110000], hostelBoysYW: ['N/A','N/A','N/A','N/A'], hostelGirlsYW: ['N/A','N/A','N/A','N/A'], eligibility: 'Pass in 10+2 with PCM/PCB.' },
  { name: 'D.Pharma', type: 'Pharmacy', category: 'pharmacy_health', colleges: ['IES'], duration: 2, totalFee: 160000, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [80000, 80000], hostelBoysYW: ['N/A','N/A'], hostelGirlsYW: ['N/A','N/A'], eligibility: 'Pass in 10+2 with PCM/PCB.' },
  { name: 'M.Pharma', type: 'Pharmacy', category: 'pharmacy_health', colleges: ['IES'], duration: 2, totalFee: 200000, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [100000, 100000], hostelBoysYW: ['N/A','N/A'], hostelGirlsYW: ['N/A','N/A'], eligibility: 'B.Pharm Pass.' },

  // Engineering & Technology
  { name: 'B.Tech CSE', type: 'B.Tech', category: 'engineering', colleges: ['IES'], duration: 4, totalFee: 388000, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [97000, 97000, 97000, 97000], hostelBoysYW: ['N/A','N/A','N/A','N/A'], hostelGirlsYW: ['N/A','N/A','N/A','N/A'], eligibility: 'Pass in 10+2 with PCM.' },
  { name: 'B.Tech CSE (AIML / AIDS)', type: 'B.Tech', category: 'engineering', colleges: ['IES'], duration: 4, totalFee: 260000, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [65000, 65000, 65000, 65000], hostelBoysYW: ['N/A','N/A','N/A','N/A'], hostelGirlsYW: ['N/A','N/A','N/A','N/A'], eligibility: 'Pass in 10+2 with PCM.' },
  { name: 'B.Tech (Civil / Mech / EC / EX)', type: 'B.Tech', category: 'engineering', colleges: ['IES'], duration: 4, totalFee: 220000, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [55000, 55000, 55000, 55000], hostelBoysYW: ['N/A','N/A','N/A','N/A'], hostelGirlsYW: ['N/A','N/A','N/A','N/A'], eligibility: 'Pass in 10+2 with PCM.' },
  { name: 'B.Tech (Lateral Entry)', type: 'B.Tech', category: 'engineering', colleges: ['IES'], duration: 3, totalFee: 150000, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [50000, 50000, 50000], hostelBoysYW: ['N/A','N/A','N/A'], hostelGirlsYW: ['N/A','N/A','N/A'], eligibility: 'Diploma in Engineering Pass.' },
  { name: 'M.Tech', type: 'M.Tech', category: 'engineering', colleges: ['IES'], duration: 2, totalFee: 70000, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [35000, 35000], hostelBoysYW: ['N/A','N/A'], hostelGirlsYW: ['N/A','N/A'], eligibility: 'B.Tech/B.E Pass.' },

  // Management & Business
  { name: 'BBA', type: 'BBA', category: 'management', colleges: ['IES'], duration: 3, totalFee: 195000, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [65000, 65000, 65000], hostelBoysYW: ['N/A','N/A','N/A'], hostelGirlsYW: ['N/A','N/A','N/A'], eligibility: 'Pass in 10+2 in any stream.' },
  { name: 'MBA (General / Business Analytics)', type: 'MBA', category: 'management', colleges: ['IES'], duration: 2, totalFee: 180000, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [90000, 90000], hostelBoysYW: ['N/A','N/A'], hostelGirlsYW: ['N/A','N/A'], eligibility: 'Graduation Pass.' },
  { name: 'Bachelor of Hotel Management (BHM)', type: 'Management', category: 'management', colleges: ['IES'], duration: 3, totalFee: 105000, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [35000, 35000, 35000], hostelBoysYW: ['N/A','N/A','N/A'], hostelGirlsYW: ['N/A','N/A','N/A'], eligibility: 'Pass in 10+2.' },

  // Computer Applications
  { name: 'BCA', type: 'BCA', category: 'computer_applications', colleges: ['IES'], duration: 3, totalFee: 105000, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [35000, 35000, 35000], hostelBoysYW: ['N/A','N/A','N/A'], hostelGirlsYW: ['N/A','N/A','N/A'], eligibility: 'Pass in 10+2 with Maths/Computer.' },
  { name: 'MCA', type: 'MCA', category: 'computer_applications', colleges: ['IES'], duration: 2, totalFee: 80000, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [40000, 40000], hostelBoysYW: ['N/A','N/A'], hostelGirlsYW: ['N/A','N/A'], eligibility: 'Graduation with Maths at 10+2 or UG level.' },

  // Agriculture
  { name: 'B.Sc Agriculture', type: 'Agriculture', category: 'agriculture', colleges: ['IES'], duration: 4, totalFee: 180000, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [45000, 45000, 45000, 45000], hostelBoysYW: ['N/A','N/A','N/A','N/A'], hostelGirlsYW: ['N/A','N/A','N/A','N/A'], eligibility: 'Pass in 10+2 with Agriculture or PCM/PCB.' },
  { name: 'M.Sc Agriculture', type: 'Agriculture', category: 'agriculture', colleges: ['IES'], duration: 2, totalFee: 90000, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [45000, 45000], hostelBoysYW: ['N/A','N/A'], hostelGirlsYW: ['N/A','N/A'], eligibility: 'B.Sc Agriculture Pass.' },

  // Law & Justice
  { name: 'BA LLB / LLB', type: 'Law', category: 'law', colleges: ['IES'], duration: 3, totalFee: 135000, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [45000, 45000, 45000], hostelBoysYW: ['N/A','N/A','N/A'], hostelGirlsYW: ['N/A','N/A','N/A'], eligibility: 'Pass in 10+2 (for BA LLB) or Graduation (for LLB).' },
  { name: 'LLM', type: 'Law', category: 'law', colleges: ['IES'], duration: 2, totalFee: 60000, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [30000, 30000], hostelBoysYW: ['N/A','N/A'], hostelGirlsYW: ['N/A','N/A'], eligibility: 'LLB / BA-LLB Pass.' },

  // Education
  { name: 'B.Ed / D.El.Ed', type: 'Education', category: 'education', colleges: ['IES'], duration: 2, totalFee: 150000, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [75000, 75000], hostelBoysYW: ['N/A','N/A'], hostelGirlsYW: ['N/A','N/A'], eligibility: 'Graduation Pass.' },
  { name: 'B.Sc + B.Ed / BA + B.Ed', type: 'Education', category: 'education', colleges: ['IES'], duration: 4, totalFee: 180000, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [45000, 45000, 45000, 45000], hostelBoysYW: ['N/A','N/A','N/A','N/A'], hostelGirlsYW: ['N/A','N/A','N/A','N/A'], eligibility: 'Pass in 10+2.' },
  { name: 'M.Ed', type: 'Education', category: 'education', colleges: ['IES'], duration: 2, totalFee: 60000, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [30000, 30000], hostelBoysYW: ['N/A','N/A'], hostelGirlsYW: ['N/A','N/A'], eligibility: 'B.Ed Pass.' },

  // Diploma
  { name: 'Diploma in Engineering (CSE / CE / ME / EE)', type: 'Diploma', category: 'diploma', colleges: ['IES'], duration: 3, totalFee: 120000, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [40000, 40000, 40000], hostelBoysYW: ['N/A','N/A','N/A'], hostelGirlsYW: ['N/A','N/A','N/A'], eligibility: 'Pass in 10th Class.' },

  // ===== Swami Vivekananda University (SVU), Barrackpore =====
  
  // Allied Health Sciences
  { name: 'B.Sc(H) Clinical Nutrition & Dietetics', type: 'Allied Health', category: 'pharmacy_health', colleges: ['SVU'], duration: 4, totalFee: 377300, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [157300, 90000, 90000, 40000], hostelBoysYW: ['N/A','N/A','N/A','N/A'], hostelGirlsYW: ['N/A','N/A','N/A','N/A'], eligibility: 'Min 50% in 10+2 with Science.' },
  { name: 'Bachelor of Optometry / Physiotherapy (BPT)', type: 'Allied Health', category: 'pharmacy_health', colleges: ['SVU'], duration: 4, totalFee: 427300, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [157300, 90000, 90000, 90000], hostelBoysYW: ['N/A','N/A','N/A','N/A'], hostelGirlsYW: ['N/A','N/A','N/A','N/A'], eligibility: 'Min 50% in 10+2 with PCB.' },
  { name: 'B.Sc Medical Radiology / Lab Technology (BMLT) / Anesthesia', type: 'Allied Health', category: 'pharmacy_health', colleges: ['SVU'], duration: 3, totalFee: 397300, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [177300, 110000, 110000], hostelBoysYW: ['N/A','N/A','N/A'], hostelGirlsYW: ['N/A','N/A','N/A'], eligibility: 'Min 50% in 10+2 with PCB.' },
  { name: 'B.Sc(H) Psychology', type: 'Allied Health', category: 'pharmacy_health', colleges: ['SVU'], duration: 4, totalFee: 377300, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [137300, 80000, 80000, 80000], hostelBoysYW: ['N/A','N/A','N/A','N/A'], hostelGirlsYW: ['N/A','N/A','N/A','N/A'], eligibility: 'Min 50% in 10+2.' },
  
  // Computer Science
  { name: 'BCA / B.Sc Cyber Security / Networking', type: 'BCA', category: 'computer_applications', colleges: ['SVU'], duration: 4, totalFee: 382300, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [142300, 80000, 80000, 80000], hostelBoysYW: ['N/A','N/A','N/A','N/A'], hostelGirlsYW: ['N/A','N/A','N/A','N/A'], eligibility: 'Min 50% in 10+2.' },
  { name: 'B.Sc Animation & Multimedia', type: 'B.Sc', category: 'science', colleges: ['SVU'], duration: 4, totalFee: 422300, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [152300, 90000, 90000, 90000], hostelBoysYW: ['N/A','N/A','N/A','N/A'], hostelGirlsYW: ['N/A','N/A','N/A','N/A'], eligibility: 'Min 50% in 10+2.' },
  { name: 'MCA / M.Sc Animation', type: 'MCA', category: 'computer_applications', colleges: ['SVU'], duration: 2, totalFee: 207300, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [132300, 75000], hostelBoysYW: ['N/A','N/A'], hostelGirlsYW: ['N/A','N/A'], eligibility: 'Graduation with Maths.' },

  // Engineering
  { name: 'B.Tech CSE (AIML / Data Science / Cyber Security / Gaming)', type: 'B.Tech', category: 'engineering', colleges: ['SVU'], duration: 4, totalFee: 427300, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [157300, 90000, 90000, 90000], hostelBoysYW: ['N/A','N/A','N/A','N/A'], hostelGirlsYW: ['N/A','N/A','N/A','N/A'], eligibility: 'Min 60% in 10+2 with PCM.' },
  { name: 'B.Tech (EE / ECE / ME / Civil)', type: 'B.Tech', category: 'engineering', colleges: ['SVU'], duration: 4, totalFee: 387300, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [147300, 80000, 80000, 80000], hostelBoysYW: ['N/A','N/A','N/A','N/A'], hostelGirlsYW: ['N/A','N/A','N/A','N/A'], eligibility: 'Min 55% in 10+2 with PCM.' },
  { name: 'B.Tech Lateral (CSE / ECE / EE / ME / CE)', type: 'B.Tech', category: 'engineering', colleges: ['SVU'], duration: 3, totalFee: 205500, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [65500, 70000, 70000], hostelBoysYW: ['N/A','N/A','N/A'], hostelGirlsYW: ['N/A','N/A','N/A'], eligibility: 'Diploma in Engineering.' },
  { name: 'Diploma (EE / ME)', type: 'Diploma', category: 'diploma', colleges: ['SVU'], duration: 3, totalFee: 172300, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [82300, 45000, 45000], hostelBoysYW: ['N/A','N/A','N/A'], hostelGirlsYW: ['N/A','N/A','N/A'], eligibility: 'Pass in 10th.' },
  { name: 'Diploma Lateral (CS / EE / ME)', type: 'Diploma', category: 'diploma', colleges: ['SVU'], duration: 2, totalFee: 121300, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [76300, 45000], hostelBoysYW: ['N/A','N/A'], hostelGirlsYW: ['N/A','N/A'], eligibility: 'Pass in 12th Sc / ITI.' },

  // Agriculture & Life Sciences
  { name: 'B.Sc(H) Agriculture', type: 'Agriculture', category: 'agriculture', colleges: ['SVU'], duration: 4, totalFee: 342300, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [132300, 70000, 70000, 70000], hostelBoysYW: ['N/A','N/A','N/A','N/A'], hostelGirlsYW: ['N/A','N/A','N/A','N/A'], eligibility: 'Min 50% in 10+2 with PCM/PCB.' },
  { name: 'B.Sc(H) Biotechnology', type: 'B.Sc', category: 'science', colleges: ['SVU'], duration: 4, totalFee: 382300, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [142300, 80000, 80000, 80000], hostelBoysYW: ['N/A','N/A','N/A','N/A'], hostelGirlsYW: ['N/A','N/A','N/A','N/A'], eligibility: 'Min 50% in 10+2 with PCB.' },
  { name: 'M.Sc (Agri / Biotech / Microbio)', type: 'M.Sc', category: 'science', colleges: ['SVU'], duration: 2, totalFee: 182300, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [122300, 60000], hostelBoysYW: ['N/A','N/A'], hostelGirlsYW: ['N/A','N/A'], eligibility: 'Graduation in Science.' },

  // Management & Humanities
  { name: 'BBA / BBA (Digital Marketing)', type: 'BBA', category: 'management', colleges: ['SVU'], duration: 4, totalFee: 382300, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [142300, 80000, 80000, 80000], hostelBoysYW: ['N/A','N/A','N/A','N/A'], hostelGirlsYW: ['N/A','N/A','N/A','N/A'], eligibility: 'Min 50% in 10+2.' },
  { name: 'BBA (Hospital / Hotel Management)', type: 'BBA', category: 'management', colleges: ['SVU'], duration: 4, totalFee: 437300, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [167300, 90000, 90000, 90000], hostelBoysYW: ['N/A','N/A','N/A','N/A'], hostelGirlsYW: ['N/A','N/A','N/A','N/A'], eligibility: 'Min 50% in 10+2.' },
  { name: 'MBA', type: 'MBA', category: 'management', colleges: ['SVU'], duration: 2, totalFee: 527300, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [327300, 200000], hostelBoysYW: ['N/A','N/A'], hostelGirlsYW: ['N/A','N/A'], eligibility: 'Graduation Pass.' },
  { name: 'BA(H) Journalism & Mass Comm', type: 'BA', category: 'arts_humanities', colleges: ['SVU'], duration: 4, totalFee: 302300, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [122300, 60000, 60000, 60000], hostelBoysYW: ['N/A','N/A','N/A','N/A'], hostelGirlsYW: ['N/A','N/A','N/A','N/A'], eligibility: 'Min 50% in 10+2.' },

  // Legal Studies
  { name: 'BA LLB(H) / BBA LLB(H)', type: 'Law', category: 'law', colleges: ['SVU'], duration: 5, totalFee: 467300, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [131300, 84000, 84000, 84000, 84000], hostelBoysYW: ['N/A','N/A','N/A','N/A','N/A'], hostelGirlsYW: ['N/A','N/A','N/A','N/A','N/A'], eligibility: 'Min 60% in 10+2.' },
  { name: 'LL.B (Hons)', type: 'Law', category: 'law', colleges: ['SVU'], duration: 3, totalFee: 299300, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [131300, 84000, 84000], hostelBoysYW: ['N/A','N/A','N/A'], hostelGirlsYW: ['N/A','N/A','N/A'], eligibility: 'Graduation Pass.' },

  // ===== NSHM Durgapur Additional Courses =====
  { name: 'B.Tech AI & ML (1st Year)', type: 'B.Tech', category: 'engineering', colleges: ['nshm_dgp'], duration: 4, totalFee: 587500, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [200000, 127500, 127500, 132500], hostelBoysYW: [], hostelGirlsYW: [], eligibility: 'Min 60% in 10+2 with PCM' },
  { name: 'B.Tech AI & ML (Lateral)', type: 'B.Tech', category: 'engineering', colleges: ['nshm_dgp'], duration: 3, totalFee: 417950, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [157950, 127500, 132500], hostelBoysYW: [], hostelGirlsYW: [], eligibility: 'Diploma in Engineering' },
  { name: 'B.Tech CSE (1st Year)', type: 'B.Tech', category: 'engineering', colleges: ['nshm_dgp'], duration: 4, totalFee: 547500, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [160000, 127500, 127500, 132500], hostelBoysYW: [], hostelGirlsYW: [], eligibility: 'Min 60% in 10+2 with PCM' },
  { name: 'B.Tech CSE (Lateral)', type: 'B.Tech', category: 'engineering', colleges: ['nshm_dgp'], duration: 3, totalFee: 417950, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [157950, 127500, 132500], hostelBoysYW: [], hostelGirlsYW: [], eligibility: 'Diploma in Engineering' },
  { name: 'B.Tech DS (1st Year)', type: 'B.Tech', category: 'engineering', colleges: ['nshm_dgp'], duration: 4, totalFee: 547500, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [160000, 127500, 127500, 132500], hostelBoysYW: [], hostelGirlsYW: [], eligibility: 'Min 60% in 10+2 with PCM' },
  { name: 'B.Tech DS (Lateral)', type: 'B.Tech', category: 'engineering', colleges: ['nshm_dgp'], duration: 3, totalFee: 417950, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [157950, 127500, 132500], hostelBoysYW: [], hostelGirlsYW: [], eligibility: 'Diploma in Engineering' },
  { name: 'B.Tech ECE (1st Year)', type: 'B.Tech', category: 'engineering', colleges: ['nshm_dgp'], duration: 4, totalFee: 528000, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [149000, 122000, 125000, 132000], hostelBoysYW: [], hostelGirlsYW: [], eligibility: 'Min 60% in 10+2 with PCM' },
  { name: 'B.Tech ECE (Lateral)', type: 'B.Tech', category: 'engineering', colleges: ['nshm_dgp'], duration: 3, totalFee: 311150, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [120350, 91900, 98900], hostelBoysYW: [], hostelGirlsYW: [], eligibility: 'Diploma in Engineering' },
  { name: 'Bachelor of Pharmacy (1st Year)', type: 'B.Pharm', category: 'pharmacy_health', colleges: ['nshm_dgp'], duration: 4, totalFee: 575200, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [187700, 127500, 127500, 132500], hostelBoysYW: [], hostelGirlsYW: [], eligibility: 'Min 60% in 10+2 with PCM/PCB' },
  { name: 'Bachelor of Pharmacy (Lateral)', type: 'B.Pharm', category: 'pharmacy_health', colleges: ['nshm_dgp'], duration: 3, totalFee: 406200, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [146200, 127500, 132500], hostelBoysYW: [], hostelGirlsYW: [], eligibility: 'D.Pharm' },
  { name: 'BSc Nursing', type: 'Nursing', category: 'pharmacy_health', colleges: ['nshm_dgp'], duration: 4, totalFee: 450000, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [122900, 108900, 108900, 109300], hostelBoysYW: [], hostelGirlsYW: [], eligibility: 'Min 50% in 10+2 with PCB' },
  { name: 'Diploma in GNM', type: 'Nursing', category: 'diploma', colleges: ['nshm_dgp'], duration: 3, totalFee: 300000, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [101200, 108300, 90500], hostelBoysYW: [], hostelGirlsYW: [], eligibility: '10+2 pass' },
  { name: 'BSc Medical Lab Technology', type: 'Allied Health', category: 'pharmacy_health', colleges: ['nshm_dgp'], duration: 4, totalFee: 455500, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [174700, 118200, 118200, 44400], hostelBoysYW: [], hostelGirlsYW: [], eligibility: 'Min 50% in 10+2 PCB' },
  { name: 'BSc Radiology & Imaging Technology', type: 'Allied Health', category: 'pharmacy_health', colleges: ['nshm_dgp'], duration: 4, totalFee: 455500, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [174700, 118200, 118200, 44400], hostelBoysYW: [], hostelGirlsYW: [], eligibility: 'Min 50% in 10+2 PCB' },
  { name: 'BSc Critical Care Technology', type: 'Allied Health', category: 'pharmacy_health', colleges: ['nshm_dgp'], duration: 4, totalFee: 430900, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [167300, 110800, 110800, 42000], hostelBoysYW: [], hostelGirlsYW: [], eligibility: 'Min 50% in 10+2 PCB' },
  { name: 'BSc Psychology', type: 'B.Sc', category: 'science', colleges: ['nshm_dgp'], duration: 4, totalFee: 368100, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [148500, 92000, 92000, 35600], hostelBoysYW: [], hostelGirlsYW: [], eligibility: 'Min 50% in 10+2' },
  { name: 'BSc Dietetics & Nutrition', type: 'B.Sc', category: 'science', colleges: ['nshm_dgp'], duration: 4, totalFee: 368100, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [148500, 92000, 92000, 35600], hostelBoysYW: [], hostelGirlsYW: [], eligibility: 'Min 50% in 10+2' },
  { name: 'BSc Culinary Science', type: 'B.Sc', category: 'science', colleges: ['nshm_dgp'], duration: 4, totalFee: 473500, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [180100, 123600, 123600, 46200], hostelBoysYW: [], hostelGirlsYW: [], eligibility: 'Min 50% in 10+2' },
  { name: 'BSc Hospitality & Hotel Administration', type: 'B.Sc', category: 'science', colleges: ['nshm_dgp'], duration: 4, totalFee: 473500, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [180100, 123600, 123600, 46200], hostelBoysYW: [], hostelGirlsYW: [], eligibility: 'Min 50% in 10+2' },
  { name: 'Bachelor of Computer Applications (BCA)', type: 'BCA', category: 'computer_applications', colleges: ['nshm_dgp'], duration: 4, totalFee: 468100, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [178500, 122000, 122000, 45600], hostelBoysYW: [], hostelGirlsYW: [], eligibility: 'Min 50% in 10+2' },
  { name: 'BBA (Bachelor of Business Administration)', type: 'BBA', category: 'management', colleges: ['nshm_dgp'], duration: 4, totalFee: 497000, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [187100, 130600, 130600, 48700], hostelBoysYW: [], hostelGirlsYW: [], eligibility: 'Min 50% in 10+2' },
  { name: 'BBA Hospital Management', type: 'BBA', category: 'management', colleges: ['nshm_dgp'], duration: 4, totalFee: 497000, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [187100, 130600, 130600, 48700], hostelBoysYW: [], hostelGirlsYW: [], eligibility: 'Min 50% in 10+2' },
  { name: 'BBA Banking & Financial Services', type: 'BBA', category: 'management', colleges: ['nshm_dgp'], duration: 4, totalFee: 455500, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [174700, 118200, 118200, 44400], hostelBoysYW: [], hostelGirlsYW: [], eligibility: 'Min 50% in 10+2' },
  { name: 'BBA Sport Management', type: 'BBA', category: 'management', colleges: ['nshm_dgp'], duration: 4, totalFee: 368100, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [148500, 92000, 92000, 35600], hostelBoysYW: [], hostelGirlsYW: [], eligibility: 'Min 50% in 10+2' },
  { name: 'BBA Travel & Tourism Management', type: 'BBA', category: 'management', colleges: ['nshm_dgp'], duration: 4, totalFee: 436100, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [168900, 112400, 112400, 42400], hostelBoysYW: [], hostelGirlsYW: [], eligibility: 'Min 50% in 10+2' },
  { name: 'BBA Aviation Hospitality Services & Management', type: 'BBA', category: 'management', colleges: ['nshm_dgp'], duration: 4, totalFee: 436100, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [168900, 112400, 112400, 42400], hostelBoysYW: [], hostelGirlsYW: [], eligibility: 'Min 50% in 10+2' },

  // ===== IEM — Institute of Engineering & Management =====
  { name: 'CSE', type: 'B.Tech (1st Year)', category: 'btech', colleges: ['IEM'], duration: 4, totalFee: 865000, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [216250,216250,216250,216250], hostelBoysYW: [], hostelGirlsYW: [], eligibility: 'Min 90% in Class 10th and 12th. Maximum 1 Year gap after Class 12th. Direct admission without JEE/WBJEE possible.' },
  { name: 'CSE (Artificial Intelligence)', type: 'B.Tech (1st Year)', category: 'btech', colleges: ['IEM'], duration: 4, totalFee: 865000, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [216250,216250,216250,216250], hostelBoysYW: [], hostelGirlsYW: [], eligibility: 'Min 80% in Class 10th and 12th. Maximum 1 Year gap after Class 12th. Direct admission without JEE/WBJEE possible.' },
  { name: 'CSE (AI & ML)', type: 'B.Tech (1st Year)', category: 'btech', colleges: ['IEM'], duration: 4, totalFee: 865000, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [216250,216250,216250,216250], hostelBoysYW: [], hostelGirlsYW: [], eligibility: 'Min 80% in Class 10th and 12th. Maximum 1 Year gap after Class 12th. Direct admission without JEE/WBJEE possible.' },
  { name: 'CSE (IoT)', type: 'B.Tech (1st Year)', category: 'btech', colleges: ['IEM'], duration: 4, totalFee: 865000, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [216250,216250,216250,216250], hostelBoysYW: [], hostelGirlsYW: [], eligibility: 'Min 80% in Class 10th and 12th. Maximum 1 Year gap after Class 12th. Direct admission without JEE/WBJEE possible.' },
  { name: 'CSE (IoT, CS & Business Technology)', type: 'B.Tech (1st Year)', category: 'btech', colleges: ['IEM'], duration: 4, totalFee: 865000, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [216250,216250,216250,216250], hostelBoysYW: [], hostelGirlsYW: [], eligibility: 'Min 80% in Class 10th and 12th. Maximum 1 Year gap after Class 12th. Direct admission without JEE/WBJEE possible.' },
  { name: 'CS & Business Systems (CSBS)', type: 'B.Tech (1st Year)', category: 'btech', colleges: ['IEM'], duration: 4, totalFee: 865000, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [216250,216250,216250,216250], hostelBoysYW: [], hostelGirlsYW: [], eligibility: 'Min 70% in Class 10th and 12th. Maximum 1 Year gap after Class 12th. Direct admission without JEE/WBJEE possible.' },
  { name: 'Information Technology (IT)', type: 'B.Tech (1st Year)', category: 'btech', colleges: ['IEM'], duration: 4, totalFee: 865000, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [216250,216250,216250,216250], hostelBoysYW: [], hostelGirlsYW: [], eligibility: 'Min 70% in Class 10th and 12th. Maximum 1 Year gap after Class 12th. Direct admission without JEE/WBJEE possible.' },
  { name: 'Electronics & Communication Engineering (ECE)', type: 'B.Tech (1st Year)', category: 'btech', colleges: ['IEM'], duration: 4, totalFee: 865000, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [216250,216250,216250,216250], hostelBoysYW: [], hostelGirlsYW: [], eligibility: 'Min 70% in Class 10th and 12th. Maximum 2 Year gap after Class 12th. Direct admission without JEE/WBJEE possible.' },
  { name: 'Electrical Engineering (EE)', type: 'B.Tech (1st Year)', category: 'btech', colleges: ['IEM'], duration: 4, totalFee: 865000, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [216250,216250,216250,216250], hostelBoysYW: [], hostelGirlsYW: [], eligibility: 'Min 65% in Class 10th and 12th. Maximum 2 Year gap after Class 12th. Direct admission without JEE/WBJEE possible.' },

  // ===== HIT — Heritage Institute of Technology =====
  { name: 'CSE', type: 'B.Tech (1st Year)', category: 'btech', colleges: ['HIT'], duration: 4, totalFee: 650200, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [162550,162550,162550,162550], hostelBoysYW: [], hostelGirlsYW: [], eligibility: 'Min 70% in Class 10th and 12th. Maximum 1 Year gap after Class 12th. JEE Main / WBJEE required for admission.' },
  { name: 'CSE (AI & ML)', type: 'B.Tech (1st Year)', category: 'btech', colleges: ['HIT'], duration: 4, totalFee: 650000, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [162500,162500,162500,162500], hostelBoysYW: [], hostelGirlsYW: [], eligibility: 'Min 70% in Class 10th and 12th. Maximum 1 Year gap after Class 12th. JEE Main / WBJEE required for admission.' },
  { name: 'CS & Business Systems (CSBS)', type: 'B.Tech (1st Year)', category: 'btech', colleges: ['HIT'], duration: 4, totalFee: 650000, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [162500,162500,162500,162500], hostelBoysYW: [], hostelGirlsYW: [], eligibility: 'Min 70% in Class 10th and 12th. Maximum 1 Year gap after Class 12th. JEE Main / WBJEE required for admission.' },
  { name: 'CSE (Data Science)', type: 'B.Tech (1st Year)', category: 'btech', colleges: ['HIT'], duration: 4, totalFee: 650000, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [162500,162500,162500,162500], hostelBoysYW: [], hostelGirlsYW: [], eligibility: 'Min 70% in Class 10th and 12th. Maximum 1 Year gap after Class 12th. JEE Main / WBJEE required for admission.' },
  { name: 'CSE (IoT & CS)', type: 'B.Tech (1st Year)', category: 'btech', colleges: ['HIT'], duration: 4, totalFee: 650000, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [162500,162500,162500,162500], hostelBoysYW: [], hostelGirlsYW: [], eligibility: 'Min 70% in Class 10th and 12th. Maximum 1 Year gap after Class 12th. JEE Main / WBJEE required for admission.' },
  { name: 'Information Technology (IT)', type: 'B.Tech (1st Year)', category: 'btech', colleges: ['HIT'], duration: 4, totalFee: 650000, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [162500,162500,162500,162500], hostelBoysYW: [], hostelGirlsYW: [], eligibility: 'Min 70% in Class 10th and 12th. Maximum 1 Year gap after Class 12th. JEE Main / WBJEE required for admission.' },
  { name: 'Electronics & Communication Engineering (ECE)', type: 'B.Tech (1st Year)', category: 'btech', colleges: ['HIT'], duration: 4, totalFee: 650000, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [162500,162500,162500,162500], hostelBoysYW: [], hostelGirlsYW: [], eligibility: 'Min 70% in Class 10th and 12th. Maximum 1 Year gap after Class 12th. JEE Main / WBJEE required for admission.' },
  { name: 'Electrical Engineering (EE)', type: 'B.Tech (1st Year)', category: 'btech', colleges: ['HIT'], duration: 4, totalFee: 650000, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [162500,162500,162500,162500], hostelBoysYW: [], hostelGirlsYW: [], eligibility: 'Min 70% in Class 10th and 12th. Maximum 1 Year gap after Class 12th. JEE Main / WBJEE required for admission.' },
  { name: 'Mechanical Engineering (ME)', type: 'B.Tech (1st Year)', category: 'btech', colleges: ['HIT'], duration: 4, totalFee: 650000, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [162500,162500,162500,162500], hostelBoysYW: [], hostelGirlsYW: [], eligibility: 'Min 70% in Class 10th and 12th. Maximum 1 Year gap after Class 12th. JEE Main / WBJEE required for admission.' },

  // ===== TIU — Techno India University (Google Cloud Campus) =====
  { name: 'CSE', type: 'B.Tech (1st Year)', category: 'btech', colleges: ['TIU'], duration: 4, totalFee: 960000, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [240000,240000,240000,240000], hostelBoysYW: [], hostelGirlsYW: [], eligibility: 'Min 80% in Class 10th and 12th (PCM). Direct admission without JEE/WBJEE possible.' },
  { name: 'CSE (AI & ML)', type: 'B.Tech (1st Year)', category: 'btech', colleges: ['TIU'], duration: 4, totalFee: 960000, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [240000,240000,240000,240000], hostelBoysYW: [], hostelGirlsYW: [], eligibility: 'Min 70% in Class 10th and 12th (PCM). Direct admission without JEE/WBJEE possible.' },
  { name: 'CSE (Data Science)', type: 'B.Tech (1st Year)', category: 'btech', colleges: ['TIU'], duration: 4, totalFee: 960000, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [240000,240000,240000,240000], hostelBoysYW: [], hostelGirlsYW: [], eligibility: 'Min 70% in Class 10th and 12th (PCM). Direct admission without JEE/WBJEE possible.' },
  { name: 'CSE (Cloud Computing)', type: 'B.Tech (1st Year)', category: 'btech', colleges: ['TIU'], duration: 4, totalFee: 960000, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [240000,240000,240000,240000], hostelBoysYW: [], hostelGirlsYW: [], eligibility: 'Min 60% in Class 10th and 12th (PCM). Direct admission without JEE/WBJEE possible.' },
  { name: 'CSE (IoT)', type: 'B.Tech (1st Year)', category: 'btech', colleges: ['TIU'], duration: 4, totalFee: 960000, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [240000,240000,240000,240000], hostelBoysYW: [], hostelGirlsYW: [], eligibility: 'Min 60% in Class 10th and 12th (PCM). Direct admission without JEE/WBJEE possible.' },
  { name: 'CSE (Financial Engineering with AI)', type: 'B.Tech (1st Year)', category: 'btech', colleges: ['TIU'], duration: 4, totalFee: 960000, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [240000,240000,240000,240000], hostelBoysYW: [], hostelGirlsYW: [], eligibility: 'Min 60% in Class 10th and 12th (PCM). Direct admission without JEE/WBJEE possible.' },
  { name: 'Biotechnology with AI', type: 'B.Tech (1st Year)', category: 'btech', colleges: ['TIU'], duration: 4, totalFee: 960000, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [240000,240000,240000,240000], hostelBoysYW: [], hostelGirlsYW: [], eligibility: 'Min 60% in Class 10th and 12th (PCB). Direct admission without JEE/WBJEE possible.' },

  // ===== HALDIA — Haldia Institute of Technology =====
  { name: 'CSE', type: 'B.Tech (1st Year)', category: 'btech', colleges: ['HALDIA'], duration: 4, totalFee: 582700, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [145675,145675,145675,145675], hostelBoysYW: [], hostelGirlsYW: [], eligibility: 'Min 60% in Class 10th and 12th (PCM). Direct admission without JEE/WBJEE possible.' },
  { name: 'CSE (AI & ML)', type: 'B.Tech (1st Year)', category: 'btech', colleges: ['HALDIA'], duration: 4, totalFee: 582700, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [145675,145675,145675,145675], hostelBoysYW: [], hostelGirlsYW: [], eligibility: 'Min 60% in Class 10th and 12th (PCM). Direct admission without JEE/WBJEE possible.' },
  { name: 'CSE (Data Science)', type: 'B.Tech (1st Year)', category: 'btech', colleges: ['HALDIA'], duration: 4, totalFee: 582700, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [145675,145675,145675,145675], hostelBoysYW: [], hostelGirlsYW: [], eligibility: 'Min 60% in Class 10th and 12th (PCM). Direct admission without JEE/WBJEE possible.' },
  { name: 'CSE (Cyber Security)', type: 'B.Tech (1st Year)', category: 'btech', colleges: ['HALDIA'], duration: 4, totalFee: 582700, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [145675,145675,145675,145675], hostelBoysYW: [], hostelGirlsYW: [], eligibility: 'Min 60% in Class 10th and 12th (PCM). Direct admission without JEE/WBJEE possible.' },
  { name: 'Information Technology (IT)', type: 'B.Tech (1st Year)', category: 'btech', colleges: ['HALDIA'], duration: 4, totalFee: 582700, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [145675,145675,145675,145675], hostelBoysYW: [], hostelGirlsYW: [], eligibility: 'Min 60% in Class 10th and 12th (PCM). Direct admission without JEE/WBJEE possible.' },
  { name: 'Electronics & Communication Engineering (ECE)', type: 'B.Tech (1st Year)', category: 'btech', colleges: ['HALDIA'], duration: 4, totalFee: 582700, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [145675,145675,145675,145675], hostelBoysYW: [], hostelGirlsYW: [], eligibility: 'Min 60% in Class 10th and 12th (PCM). Direct admission without JEE/WBJEE possible.' },
  { name: 'Chemical Engineering (CHEM)', type: 'B.Tech (1st Year)', category: 'btech', colleges: ['HALDIA'], duration: 4, totalFee: 582700, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [145675,145675,145675,145675], hostelBoysYW: [], hostelGirlsYW: [], eligibility: 'Min 50% in Class 12th (PCM 45%). Direct admission without JEE/WBJEE possible.' },
  { name: 'Electrical Engineering (EE)', type: 'B.Tech (1st Year)', category: 'btech', colleges: ['HALDIA'], duration: 4, totalFee: 582700, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [145675,145675,145675,145675], hostelBoysYW: [], hostelGirlsYW: [], eligibility: 'Min 60% in Class 10th and 12th (PCM). Direct admission without JEE/WBJEE possible.' },

  // ===== NSEC — Netaji Subhash Engineering College =====
  { name: 'CSE', type: 'B.Tech (1st Year)', category: 'btech', colleges: ['NSEC'], duration: 4, totalFee: 767200, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [191800,191800,191800,191800], hostelBoysYW: [], hostelGirlsYW: [], eligibility: 'Min 60% in Class 12th (PCM). Direct admission without JEE/WBJEE possible.' },
  { name: 'CSE (AI & ML)', type: 'B.Tech (1st Year)', category: 'btech', colleges: ['NSEC'], duration: 4, totalFee: 767200, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [191800,191800,191800,191800], hostelBoysYW: [], hostelGirlsYW: [], eligibility: 'Min 60% in Class 12th (PCM). Direct admission without JEE/WBJEE possible.' },
  { name: 'Information Technology (IT)', type: 'B.Tech (1st Year)', category: 'btech', colleges: ['NSEC'], duration: 4, totalFee: 767200, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [191800,191800,191800,191800], hostelBoysYW: [], hostelGirlsYW: [], eligibility: 'Min 60% in Class 12th (PCM). Direct admission without JEE/WBJEE possible.' },
  { name: 'CS & Business Systems (CSBS)', type: 'B.Tech (1st Year)', category: 'btech', colleges: ['NSEC'], duration: 4, totalFee: 767200, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [191800,191800,191800,191800], hostelBoysYW: [], hostelGirlsYW: [], eligibility: 'Min 60% in Class 12th (PCM). Direct admission without JEE/WBJEE possible.' },
  { name: 'Electronics & Communication Engineering (ECE)', type: 'B.Tech (1st Year)', category: 'btech', colleges: ['NSEC'], duration: 4, totalFee: 767200, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [191800,191800,191800,191800], hostelBoysYW: [], hostelGirlsYW: [], eligibility: 'Min 60% in Class 12th (PCM). Direct admission without JEE/WBJEE possible.' },

  // ===== MSIT — Meghnad Saha Institute of Technology =====
  { name: 'CSE', type: 'B.Tech (1st Year)', category: 'btech', colleges: ['MSIT'], duration: 4, totalFee: 767200, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [191800,191800,191800,191800], hostelBoysYW: [], hostelGirlsYW: [], eligibility: 'Min 60% in Class 12th (PCM). Direct admission without JEE/WBJEE possible.' },
  { name: 'CSE (AI & ML)', type: 'B.Tech (1st Year)', category: 'btech', colleges: ['MSIT'], duration: 4, totalFee: 767200, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [191800,191800,191800,191800], hostelBoysYW: [], hostelGirlsYW: [], eligibility: 'Min 60% in Class 12th (PCM). Direct admission without JEE/WBJEE possible.' },
  { name: 'CSE (Data Science)', type: 'B.Tech (1st Year)', category: 'btech', colleges: ['MSIT'], duration: 4, totalFee: 767200, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [191800,191800,191800,191800], hostelBoysYW: [], hostelGirlsYW: [], eligibility: 'Min 60% in Class 12th (PCM). Direct admission without JEE/WBJEE possible.' },
  { name: 'Information Technology (IT)', type: 'B.Tech (1st Year)', category: 'btech', colleges: ['MSIT'], duration: 4, totalFee: 767200, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [191800,191800,191800,191800], hostelBoysYW: [], hostelGirlsYW: [], eligibility: 'Min 60% in Class 12th (PCM). Direct admission without JEE/WBJEE possible.' },
  { name: 'CSE (Cyber Security)', type: 'B.Tech (1st Year)', category: 'btech', colleges: ['MSIT'], duration: 4, totalFee: 767200, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [191800,191800,191800,191800], hostelBoysYW: [], hostelGirlsYW: [], eligibility: 'Min 60% in Class 12th (PCM). Direct admission without JEE/WBJEE possible.' },
  { name: 'CSE (IoT)', type: 'B.Tech (1st Year)', category: 'btech', colleges: ['MSIT'], duration: 4, totalFee: 767200, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [191800,191800,191800,191800], hostelBoysYW: [], hostelGirlsYW: [], eligibility: 'Min 60% in Class 12th (PCM). Direct admission without JEE/WBJEE possible.' },
  { name: 'CS & Business Systems (CSBS)', type: 'B.Tech (1st Year)', category: 'btech', colleges: ['MSIT'], duration: 4, totalFee: 767200, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [191800,191800,191800,191800], hostelBoysYW: [], hostelGirlsYW: [], eligibility: 'Min 60% in Class 12th (PCM). Direct admission without JEE/WBJEE possible.' },
  { name: 'Electronics & Communication Engineering (ECE)', type: 'B.Tech (1st Year)', category: 'btech', colleges: ['MSIT'], duration: 4, totalFee: 767200, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [191800,191800,191800,191800], hostelBoysYW: [], hostelGirlsYW: [], eligibility: 'Min 50% in Class 12th (PCM 45%). Direct admission without JEE/WBJEE possible.' },
  { name: 'Electrical Engineering (EE)', type: 'B.Tech (1st Year)', category: 'btech', colleges: ['MSIT'], duration: 4, totalFee: 555000, hostelBoys: 'N/A', hostelGirls: 'N/A', yearWise: [138750,138750,138750,138750], hostelBoysYW: [], hostelGirlsYW: [], eligibility: 'Min 60% in Class 12th (PCM). Direct admission without JEE/WBJEE possible.' }
];
