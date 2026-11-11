// MÁY SINH — đừng sửa tay. Nguồn: Enki/htp/catalog/export_web.py
// Giá lấy từ product/htp-crm/pricing.py (bảng khách lẻ) + htp/gia_them.py, y như catalog PDF.
// Đổi giá: sửa trong CRM rồi chạy lại export_web.py. Thông số: lib/bang-gia-specs.ts

/** Đơn giá đầy đủ (đồng). `null` = chưa niêm yết giá trên web → hiện "Liên hệ". */
export type Gia = number | null;

export interface MauNan {
  code: string; // mã in trên nan
  brand: string;
  line: string; // dòng in trên nan ("High class"…), "" nếu không có
  printed: string; // thông số in trên nan, "" nếu không có
  goc: string | null; // ảnh nghiêng (đã tách nền)
  mat: string | null; // ảnh thẳng mặt
  gia: Gia;
}
export interface DongGia { mau: string; label: string; mm: string; gia: Gia }
export interface NhomTamLien { key: "dai_loan" | "uc" | "inox"; name: string; rows: DongGia[] }
export interface DongKeo { mau: string; label: string; mm: string; coLa: Gia; khongLa: Gia }
export interface Motor {
  name: string;
  sucNang: string | null;
  dienTich: string;
  /** Khoảng diện tích cửa (m²) của tải này, dò từ CRM: tuM2 ≤ diện tích < denM2. null = không giới hạn / cửa Úc. */
  tuM2: number | null;
  denM2: number | null;
  gia: number;
}
export interface PhuKien { key: "khoa_tole" | "khoa_uc"; name: string; donVi: string; gia: number }
/** Bình tích điện, hai loại của catalog (YH, SH). Catalog in để trống ô giá → gia null. */
export interface BinhTichDien { loai: string; gia: Gia }
export interface NhomKinh { group: string; rows: { mau: string; gia: Gia }[] }
/** Dòng chưa có trong CRM (htp/gia_them.py). key = tole_son_tinh_dien | tole_sieu_truong | song_ngang_thep */
export interface SanPhamThem { key: string; name: string; rows: { mau: string; gia: Gia }[] }

export const APPLIED_FROM: string = "11/11/2026";

export const NAN_DUC: MauNan[] = [
  {
    "code": "KV380R",
    "brand": "Kovidoor",
    "line": "",
    "printed": "",
    "goc": "/bang-gia/nan/kv380r_goc.webp",
    "mat": "/bang-gia/nan/kv380r_mat.webp",
    "gia": 1450000
  },
  {
    "code": "KV422R",
    "brand": "Kovidoor",
    "line": "",
    "printed": "",
    "goc": "/bang-gia/nan/kv422r_goc.webp",
    "mat": "/bang-gia/nan/kv422r_mat.webp",
    "gia": 1750000
  },
  {
    "code": "KV432R",
    "brand": "Kovidoor",
    "line": "",
    "printed": "",
    "goc": "/bang-gia/nan/kv432r_goc.webp",
    "mat": "/bang-gia/nan/kv432r_mat.webp",
    "gia": 1950000
  },
  {
    "code": "KV468R",
    "brand": "Kovidoor",
    "line": "",
    "printed": "",
    "goc": "/bang-gia/nan/kv468r_goc.webp",
    "mat": "/bang-gia/nan/kv468r_mat.webp",
    "gia": 2150000
  },
  {
    "code": "MT5222R",
    "brand": "Mitadoor",
    "line": "High class",
    "printed": "",
    "goc": "/bang-gia/nan/mt5222r_goc.webp",
    "mat": "/bang-gia/nan/mt5222r_mat.webp",
    "gia": 2300000
  },
  {
    "code": "KV412",
    "brand": "Kovidoor",
    "line": "",
    "printed": "",
    "goc": "/bang-gia/nan/kv412_goc.webp",
    "mat": "/bang-gia/nan/kv412_mat.webp",
    "gia": 1500000
  },
  {
    "code": "VIS 46R",
    "brand": "Mitadoor",
    "line": "Superior",
    "printed": "",
    "goc": "/bang-gia/nan/vis46r_goc.webp",
    "mat": "/bang-gia/nan/vis46r_mat.webp",
    "gia": 2300000
  },
  {
    "code": "VIS 50R",
    "brand": "Mitadoor",
    "line": "High level",
    "printed": "",
    "goc": "/bang-gia/nan/vis50r_goc.webp",
    "mat": "/bang-gia/nan/vis50r_mat.webp",
    "gia": 3500000
  },
  {
    "code": "X205R",
    "brand": "Mitadoor",
    "line": "High level",
    "printed": "",
    "goc": "/bang-gia/nan/x205r_goc.webp",
    "mat": "/bang-gia/nan/x205r_mat.webp",
    "gia": 1600000
  },
  {
    "code": "SD5231",
    "brand": "Mitadoor",
    "line": "Deluxe 3.0",
    "printed": "",
    "goc": "/bang-gia/nan/sd5231_goc.webp",
    "mat": "/bang-gia/nan/sd5231_mat.webp",
    "gia": 3700000
  },
  {
    "code": "MT502R",
    "brand": "Mitadoor",
    "line": "",
    "printed": "",
    "goc": "/bang-gia/nan/mt502r_goc.webp",
    "mat": "/bang-gia/nan/mt502r_mat.webp",
    "gia": 2200000
  },
  {
    "code": "CT5122",
    "brand": "Mitadoor",
    "line": "",
    "printed": "",
    "goc": "/bang-gia/nan/ct5122_goc.webp",
    "mat": "/bang-gia/nan/ct5122_mat.webp",
    "gia": 1600000
  },
  {
    "code": "OT70",
    "brand": "Mitadoor",
    "line": "",
    "printed": "Siêu kín, không lỗ thoáng",
    "goc": "/bang-gia/nan/ot70_goc.webp",
    "mat": "/bang-gia/nan/ot70_mat.webp",
    "gia": 1050000
  },
  {
    "code": "AL70",
    "brand": "Alumdoor",
    "line": "",
    "printed": "Dày 0.7 – 0.8mm",
    "goc": "/bang-gia/nan/al70_goc.webp",
    "mat": "/bang-gia/nan/al70_mat.webp",
    "gia": 1030000
  },
  {
    "code": "AL503",
    "brand": "Alumdoor",
    "line": "",
    "printed": "Dày 1.0 – 1.1mm",
    "goc": "/bang-gia/nan/al503_goc.webp",
    "mat": "/bang-gia/nan/al503_mat.webp",
    "gia": 1650000
  },
  {
    "code": "AL75",
    "brand": "Alumdoor",
    "line": "",
    "printed": "Dày 1.2 – 1.4mm",
    "goc": "/bang-gia/nan/al75_goc.webp",
    "mat": "/bang-gia/nan/al75_mat.webp",
    "gia": 2200000
  },
  {
    "code": "AL-VIP50",
    "brand": "Alumdoor",
    "line": "",
    "printed": "Dày 1.5 – 1.8mm",
    "goc": "/bang-gia/nan/alvip50_goc.webp",
    "mat": "/bang-gia/nan/alvip50_mat.webp",
    "gia": 1900000
  },
  {
    "code": "B5",
    "brand": "OneDoor",
    "line": "",
    "printed": "Nhôm 6063-T5 · dày tối đa 1.3mm",
    "goc": "/bang-gia/nan/b5_goc.webp",
    "mat": "/bang-gia/nan/b5_mat.webp",
    "gia": 1500000
  },
  {
    "code": "B7",
    "brand": "OneDoor",
    "line": "",
    "printed": "Nhôm 6063-T5 · dày tối đa 1.3mm",
    "goc": "/bang-gia/nan/b7_goc.webp",
    "mat": "/bang-gia/nan/b7_mat.webp",
    "gia": 1700000
  }
];

export const TAM_LIEN: NhomTamLien[] = [
  {
    "key": "dai_loan",
    "name": "Cửa cuốn tole Đài Loan",
    "rows": [
      {
        "mau": "6zem",
        "label": "6 zem",
        "mm": "0.6mm",
        "gia": 500000
      },
      {
        "mau": "8zem",
        "label": "8 zem",
        "mm": "0.8mm",
        "gia": 560000
      },
      {
        "mau": "1ly",
        "label": "1 ly",
        "mm": "1.0mm",
        "gia": 780000
      }
    ]
  },
  {
    "key": "uc",
    "name": "Cửa cuốn công nghệ Úc",
    "rows": [
      {
        "mau": "Tole màu 5.2 zem",
        "label": "Tole màu 5.2 zem",
        "mm": "0.52mm",
        "gia": 700000
      },
      {
        "mau": "Tole màu 5.2 zem blusc",
        "label": "Tole blusc 5.2 zem",
        "mm": "0.52mm",
        "gia": 900000
      }
    ]
  },
  {
    "key": "inox",
    "name": "Cửa cuốn Inox SUS 304",
    "rows": [
      {
        "mau": "6zem",
        "label": "6 zem",
        "mm": "0.6mm",
        "gia": 1700000
      },
      {
        "mau": "8zem",
        "label": "8 zem",
        "mm": "0.8mm",
        "gia": 1900000
      }
    ]
  }
];

export const UC_SWATCHES: string[] = [
  "/bang-gia/nan/uc-2.webp",
  "/bang-gia/nan/uc-1.webp",
  "/bang-gia/nan/uc-3.webp",
  "/bang-gia/nan/uc-4.webp",
  "/bang-gia/nan/uc-5.webp"
];

export const TOLE_THEM: SanPhamThem[] = [
  {
    "key": "tole_son_tinh_dien",
    "name": "Cửa cuốn tole sơn tĩnh điện",
    "rows": [
      {
        "mau": "0.6mm (6 dem)",
        "gia": null
      },
      {
        "mau": "0.8mm (8 dem)",
        "gia": null
      },
      {
        "mau": "1.0mm (1 ly)",
        "gia": null
      }
    ]
  },
  {
    "key": "tole_sieu_truong",
    "name": "Cửa cuốn tole siêu trường",
    "rows": [
      {
        "mau": "1.0mm (1 ly)",
        "gia": 800000
      },
      {
        "mau": "1.2mm (1.2 ly)",
        "gia": 920000
      },
      {
        "mau": "1.4mm (1.4 ly)",
        "gia": 1100000
      }
    ]
  }
];

export const SONG_NGANG: SanPhamThem[] = [
  {
    "key": "song_ngang_thep",
    "name": "Cửa cuốn song ngang, mắc võng thép sơn tĩnh điện",
    "rows": [
      {
        "mau": "Mắc võng",
        "gia": 900000
      },
      {
        "mau": "Song vuông",
        "gia": 1100000
      }
    ]
  }
];

export const CUA_KEO: DongKeo[] = [
  {
    "mau": "6zem",
    "label": "U 6 zem",
    "mm": "0.6mm",
    "coLa": 640000,
    "khongLa": 540000
  },
  {
    "mau": "8zem",
    "label": "U 8 zem",
    "mm": "0.8mm",
    "coLa": 700000,
    "khongLa": 600000
  },
  {
    "mau": "1ly",
    "label": "U 1 ly",
    "mm": "1.0mm",
    "coLa": 760000,
    "khongLa": 660000
  },
  {
    "mau": "1.2ly",
    "label": "U 1.2 ly",
    "mm": "1.2mm",
    "coLa": 820000,
    "khongLa": 720000
  },
  {
    "mau": "1.4ly",
    "label": "U 1.4 ly",
    "mm": "1.4mm",
    "coLa": 900000,
    "khongLa": 800000
  },
  {
    "mau": "1.6ly",
    "label": "U 1.6 ly",
    "mm": "1.6mm",
    "coLa": null,
    "khongLa": null
  }
];

export const MOTOR: Motor[] = [
  {
    "name": "Motor + remote 300kg",
    "sucNang": "300kg",
    "dienTich": "Cửa dưới 12m²",
    "tuM2": 0.0,
    "denM2": 12.0,
    "gia": 3300000
  },
  {
    "name": "Motor + remote 400kg",
    "sucNang": "400kg",
    "dienTich": "Cửa 12m² đến dưới 14,5m²",
    "tuM2": 12.0,
    "denM2": 14.5,
    "gia": 3500000
  },
  {
    "name": "Motor + remote 500kg",
    "sucNang": "500kg",
    "dienTich": "Cửa từ 14,5m² trở lên",
    "tuM2": 14.5,
    "denM2": null,
    "gia": 4000000
  },
  {
    "name": "Motor + remote cửa Úc",
    "sucNang": null,
    "dienTich": "Cửa cuốn công nghệ Úc, mọi kích thước",
    "tuM2": null,
    "denM2": null,
    "gia": 5500000
  }
];

export const PHU_KIEN: PhuKien[] = [
  {
    "key": "khoa_tole",
    "name": "Khóa ngang",
    "donVi": "cái",
    "gia": 350000
  },
  {
    "key": "khoa_uc",
    "name": "Khóa ngang",
    "donVi": "cái",
    "gia": 450000
  }
];

export const BINH_TICH_DIEN: BinhTichDien[] = [
  {
    "loai": "YH",
    "gia": null
  },
  {
    "loai": "SH",
    "gia": null
  }
];

export const NHOM_KINH: NhomKinh[] = [
  {
    "group": "Nhôm Việt",
    "rows": [
      {
        "mau": "Cửa đi 1.2ly",
        "gia": 2100000
      },
      {
        "mau": "Cửa đi 1.4ly",
        "gia": 2200000
      },
      {
        "mau": "Cửa đi 2.0ly",
        "gia": 2300000
      },
      {
        "mau": "Cửa sổ 1.2ly",
        "gia": 2000000
      },
      {
        "mau": "Cửa sổ 1.4ly",
        "gia": 2100000
      },
      {
        "mau": "Vách kính 1.2ly",
        "gia": 1200000
      },
      {
        "mau": "Vách kính 1.4ly",
        "gia": 1300000
      }
    ]
  },
  {
    "group": "Nhôm Nhập",
    "rows": [
      {
        "mau": "Cửa đi 1.4ly",
        "gia": 2400000
      },
      {
        "mau": "Cửa đi 2.0ly",
        "gia": 2500000
      },
      {
        "mau": "Cửa sổ 1.4ly",
        "gia": 2300000
      },
      {
        "mau": "Vách kính 1.4ly",
        "gia": 1700000
      }
    ]
  },
  {
    "group": "Nhôm Maxpro",
    "rows": [
      {
        "mau": "Hệ 55",
        "gia": 4000000
      },
      {
        "mau": "Hệ 65",
        "gia": 4600000
      },
      {
        "mau": "Hệ 83",
        "gia": 5800000
      }
    ]
  },
  {
    "group": "Cửa kính bản lề sàn",
    "rows": [
      {
        "mau": "10 ly",
        "gia": 1250000
      },
      {
        "mau": "12 ly",
        "gia": 1350000
      }
    ]
  },
  {
    "group": "Lan can cầu thang",
    "rows": [
      {
        "mau": "Tay gỗ",
        "gia": 1950000
      },
      {
        "mau": "Tay nhôm 3D 2*2",
        "gia": 2050000
      },
      {
        "mau": "Tay nhôm 3D 3*3",
        "gia": 2300000
      },
      {
        "mau": "Tay nhôm 3D 4*4",
        "gia": 2600000
      },
      {
        "mau": "Máng cover",
        "gia": 5800000
      }
    ]
  }
];
