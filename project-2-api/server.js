const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Data dummy sesuai Project 1
let companyInfo = [
  {
    id: 1,
    title: "Network Penetration Testing",
    category: "Network Security",
    risk_level: "Critical",
    updated_at: "2026-11-18",
    summary: "Simulasi serangan siber terkontrol untuk menemukan celah keamanan pada infrastruktur jaringan perusahaan.",
    description: "Layanan Network Penetration Testing dari AegisNet Security dirancang untuk mengidentifikasi kerentanan pada firewall, router, switch, dan server internal."
  },
  {
    id: 2,
    title: "Cloud Infrastructure Audit",
    category: "Cloud Security",
    risk_level: "High",
    updated_at: "2026-11-15",
    summary: "Evaluasi menyeluruh terhadap konfigurasi AWS, GCP, dan Azure untuk mencegah kebocoran data cloud.",
    description: "Audit mendalam pada IAM policy, enkripsi storage, segmentasi VPC, serta kepatuhan standar keamanan ISO 27001."
  },
  {
    id: 3,
    title: "24/7 SOC Monitoring & Incident Response",
    category: "Managed Defense",
    risk_level: "High",
    updated_at: "2026-11-10",
    summary: "Pemantauan ancaman siber secara real-time selama 24 jam penuh dengan respons insiden cepat.",
    description: "Security Operations Center (SOC) memantau log jaringan dan aktivitas endpoint secara terus-menerus menggunakan sistem SIEM modern."
  },
  {
    id: 4,
    title: "Web Application Firewall (WAF) Deployment",
    category: "Application Security",
    risk_level: "Medium",
    updated_at: "2026-11-05",
    summary: "Perlindungan aplikasi web dari serangan SQL Injection, XSS, dan DDoS secara otomatis.",
    description: "Implementasi dan tuning Web Application Firewall (WAF) untuk menyaring traffic berbahaya di lapisan aplikasi."
  }
];

// 1. READ ALL - Ambil semua data layanan
app.get("/api/services", (req, res) => {
  res.status(200).json({
    status: "success",
    total: companyInfo.length,
    data: companyInfo
  });
});

// 2. READ BY ID - Ambil 1 data layanan berdasarkan ID
app.get("/api/services/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const item = companyInfo.find(d => d.id === id);

  if (!item) {
    return res.status(404).json({ status: "error", message: "Layanan tidak ditemukan" });
  }
  res.status(200).json({ status: "success", data: item });
});

// 3. CREATE - Tambah data layanan baru
app.post("/api/services", (req, res) => {
  const { title, category, risk_level, summary, description } = req.body;

  if (!title || !category || !risk_level) {
    return res.status(400).json({ status: "error", message: "title, category, dan risk_level wajib diisi" });
  }

  const newId = companyInfo.length > 0 ? companyInfo[companyInfo.length - 1].id + 1 : 1;
  const newService = {
    id: newId,
    title,
    category,
    risk_level,
    updated_at: new Date().toISOString().split("T")[0],
    summary: summary || "",
    description: description || ""
  };

  companyInfo.push(newService);
  res.status(201).json({
    status: "success",
    message: "Layanan berhasil ditambahkan",
    data: newService
  });
});

// 4. UPDATE - Ubah data layanan berdasarkan ID
app.put("/api/services/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = companyInfo.findIndex(d => d.id === id);

  if (index === -1) {
    return res.status(404).json({ status: "error", message: "Layanan tidak ditemukan" });
  }

  const { title, category, risk_level, summary, description } = req.body;
  companyInfo[index] = {
    ...companyInfo[index],
    title: title || companyInfo[index].title,
    category: category || companyInfo[index].category,
    risk_level: risk_level || companyInfo[index].risk_level,
    summary: summary || companyInfo[index].summary,
    description: description || companyInfo[index].description,
    updated_at: new Date().toISOString().split("T")[0]
  };

  res.status(200).json({
    status: "success",
    message: "Layanan berhasil diperbarui",
    data: companyInfo[index]
  });
});

// 5. DELETE - Hapus data layanan berdasarkan ID
app.delete("/api/services/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = companyInfo.findIndex(d => d.id === id);

  if (index === -1) {
    return res.status(404).json({ status: "error", message: "Layanan tidak ditemukan" });
  }

  const deleted = companyInfo.splice(index, 1);
  res.status(200).json({
    status: "success",
    message: "Layanan berhasil dihapus",
    data: deleted[0]
  });
});

app.listen(PORT, () => {
  console.log(`Server CRUD API berjalan di http://localhost:${PORT}`);
});