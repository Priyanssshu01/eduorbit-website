// EduOrbit - College & Fee Structure Data
// JIS Group - West Bengal | Admission 2026 | Bihar Student Credit Card Scheme

const COLLEGES = [
  { id: 'jisce', name: 'JIS College of Engineering', abbr: 'JISCE', est: 2000, naac: 'A', location: 'Kalyani (60 KM from Kolkata)', img: '🏛️' },
  { id: 'nit', name: 'Narula Institute of Technology', abbr: 'NIT', est: 2001, naac: 'A', location: 'Agarpara, Kolkata', img: '🏫' },
  { id: 'gnit', name: 'Guru Nanak Institute of Technology', abbr: 'GNIT', est: 2003, naac: 'A+', location: 'Sodepur, Kolkata', img: '🎓' },
  { id: 'surtech', name: 'Dr Sudhir Chandra Sur Institute of Technology', abbr: 'SURTECH', est: 2009, naac: 'A', location: 'Dumdum, Kolkata', img: '🏢' },
  { id: 'aec', name: 'Asansol Engineering College', abbr: 'AEC', est: 1998, naac: 'A', location: 'Asansol', img: '🏗️' },
];

const COURSES = [
  // ===== B.Tech (1st Year) =====
  { name: 'Agricultural Engineering', type: 'B.Tech (1st Year)', category: 'btech', colleges: ['JISCE'], duration: 4, totalFee: 360000, hostelBoys: 550000, hostelGirls: 530000, yearWise: [90000,90000,90000,90000], hostelBoysYW: [140000,140000,135000,135000], hostelGirlsYW: [135000,135000,130000,130000] },
  { name: 'Bio Medical Engineering', type: 'B.Tech (1st Year)', category: 'btech', colleges: ['JISCE'], duration: 4, totalFee: 360000, hostelBoys: 550000, hostelGirls: 530000, yearWise: [90000,90000,90000,90000], hostelBoysYW: [140000,140000,135000,135000], hostelGirlsYW: [135000,135000,130000,130000] },
  { name: 'Civil Engineering', type: 'B.Tech (1st Year)', category: 'btech', colleges: ['JISCE','NIT','AEC','SURTECH'], duration: 4, totalFee: 360000, hostelBoys: 550000, hostelGirls: 530000, yearWise: [90000,90000,90000,90000], hostelBoysYW: [140000,140000,135000,135000], hostelGirlsYW: [135000,135000,130000,130000] },
  { name: 'Mechanical Engineering', type: 'B.Tech (1st Year)', category: 'btech', colleges: ['JISCE','NIT','AEC','SURTECH'], duration: 4, totalFee: 360000, hostelBoys: 550000, hostelGirls: 530000, yearWise: [90000,90000,90000,90000], hostelBoysYW: [140000,140000,135000,135000], hostelGirlsYW: [135000,135000,130000,130000] },
  { name: 'Electrical Engineering', type: 'B.Tech (1st Year)', category: 'btech', colleges: ['JISCE','GNIT','AEC','SURTECH'], duration: 4, totalFee: 360000, hostelBoys: 550000, hostelGirls: 530000, yearWise: [90000,90000,90000,90000], hostelBoysYW: [140000,140000,135000,135000], hostelGirlsYW: [135000,135000,130000,130000] },
  { name: 'Food Technology', type: 'B.Tech (1st Year)', category: 'btech', colleges: ['GNIT'], duration: 4, totalFee: 360000, hostelBoys: 550000, hostelGirls: 530000, yearWise: [90000,90000,90000,90000], hostelBoysYW: [140000,140000,135000,135000], hostelGirlsYW: [135000,135000,130000,130000] },
  { name: 'Automobile Engineering', type: 'B.Tech (1st Year)', category: 'btech', colleges: ['SURTECH'], duration: 4, totalFee: 360000, hostelBoys: 550000, hostelGirls: 530000, yearWise: [90000,90000,90000,90000], hostelBoysYW: [140000,140000,135000,135000], hostelGirlsYW: [135000,135000,130000,130000] },
  { name: 'Electronics & Communication Engineering', type: 'B.Tech (1st Year)', category: 'btech', colleges: ['JISCE','GNIT','AEC'], duration: 4, totalFee: 450000, hostelBoys: 650000, hostelGirls: 630000, yearWise: [115000,115000,110000,110000], hostelBoysYW: [165000,165000,160000,160000], hostelGirlsYW: [160000,160000,155000,155000] },
  { name: 'Electronics & Communication Engineering', type: 'B.Tech (1st Year)', category: 'btech', colleges: ['SURTECH'], duration: 4, totalFee: 410000, hostelBoys: 600000, hostelGirls: 580000, yearWise: [110000,100000,100000,100000], hostelBoysYW: [150000,150000,150000,150000], hostelGirlsYW: [145000,145000,145000,145000] },
  { name: 'Computer Science & Technology', type: 'B.Tech (1st Year)', category: 'btech', colleges: ['JISCE'], duration: 4, totalFee: 600000, hostelBoys: 800000, hostelGirls: 780000, yearWise: [150000,150000,150000,150000], hostelBoysYW: [200000,200000,200000,200000], hostelGirlsYW: [195000,195000,195000,195000] },
  { name: 'Information Technology', type: 'B.Tech (1st Year)', category: 'btech', colleges: ['JISCE','AEC'], duration: 4, totalFee: 600000, hostelBoys: 800000, hostelGirls: 780000, yearWise: [150000,150000,150000,150000], hostelBoysYW: [200000,200000,200000,200000], hostelGirlsYW: [195000,195000,195000,195000] },
  { name: 'CSE (IOT) / CS & Business Systems', type: 'B.Tech (1st Year)', category: 'btech', colleges: ['AEC'], duration: 4, totalFee: 600000, hostelBoys: 800000, hostelGirls: 780000, yearWise: [150000,150000,150000,150000], hostelBoysYW: [200000,200000,200000,200000], hostelGirlsYW: [195000,195000,195000,195000] },
  { name: 'CSE (Data Science) / CSE (Cyber Security)', type: 'B.Tech (1st Year)', category: 'btech', colleges: ['SURTECH'], duration: 4, totalFee: 560000, hostelBoys: 800000, hostelGirls: 780000, yearWise: [140000,140000,140000,140000], hostelBoysYW: [200000,200000,200000,200000], hostelGirlsYW: [195000,195000,195000,195000] },
  { name: 'CSE / CSE (AI & ML)', type: 'B.Tech (1st Year)', category: 'btech', colleges: ['SURTECH'], duration: 4, totalFee: 580000, hostelBoys: 850000, hostelGirls: 830000, yearWise: [145000,145000,145000,145000], hostelBoysYW: [215000,215000,210000,210000], hostelGirlsYW: [210000,210000,205000,205000] },

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

  // ===== MCA =====
  { name: 'MCA', type: 'MCA', category: 'mca', colleges: ['JISCE'], duration: 2, totalFee: 300000, hostelBoys: 400000, hostelGirls: 390000, yearWise: [160000,140000], hostelBoysYW: [210000,190000], hostelGirlsYW: [205000,185000] },

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
];
