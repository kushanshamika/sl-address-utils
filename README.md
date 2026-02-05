# 🇱🇰 sl-address-utils

A lightweight, zero-dependency JavaScript & TypeScript package that provides **complete, structured access to Sri Lanka’s administrative address hierarchy**, extracted from official government sources.

`sl-address-utils` is designed for **forms, address validation, selectors, analytics, and backend services**, offering fast in-memory lookups with a clean, typed API.

---

## ✨ Features

* ✅ Supports **JavaScript and TypeScript**
* ✅ Fully structured administrative hierarchy
* ✅ Covers **ALL Sri Lankan postal codes**
* ✅ Covers **20,000+ villages / cities**
* ✅ Stable **string-based IDs**
* ✅ Zero runtime dependencies
* ✅ Tree-shakable ES modules
* ✅ Optimized lookups using prebuilt indexes
* ✅ Read-only, side-effect-free API

---

## 🧭 Administrative Coverage

This package includes **complete national coverage**:

### 🏛 Administrative Hierarchy

```
Province
 └── District
      └── Divisional Secretariat
           └── Grama Niladhari Division
                └── Village / City
```

### 📦 Dataset Size

* **9 Provinces**
* **25 Districts**
* **331+ Divisional Secretariats**
* **14,000+ Grama Niladhari Divisions**
* **20,000+ Villages / Cities**
* **2,050 Postal Codes** (full national coverage)

---

## 📦 Installation

```bash
npm install sl-address-utils
```

or

```bash
yarn add sl-address-utils
```

---

## 📁 Package Structure

```
src/
├─ data/
│  ├─ provinces.json
│  ├─ districts.json
│  ├─ divisional-secretariats.json
│  ├─ grama-niladhari-divisions.json
│  ├─ villages.json
│  └─ postal-codes.json
│
├─ access/
│  ├─ provinces.ts
│  ├─ districts.ts
│  ├─ divisionalSecretariats.ts
│  ├─ gramaNiladhari.ts
│  ├─ villages.ts
│  └─ postalCodes.ts
│
├─ indexes/
│  └─ buildIndexes.ts
│
├─ types/
│  └─ models.ts
│
└─ index.ts
```

---

## 🧩 TypeScript Models

All entities use **string IDs** for long-term stability.

```ts
export interface Province {
  id: string;
  name: string;
}

export interface District {
  id: string;
  provinceId: string;
  name: string;
}

export interface DivisionalSecretariat {
  id: string;
  districtId: string;
  name: string;
}

export interface GramaNiladhariDivision {
  id: string;
  divisionalSecretariatId: string;
  name: string;
}

export interface Village {
  id: string;
  gramaNiladhariDivisionId: string;
  name: string;
}

export interface PostalCode {
  code: string;
  districtId: string;
  name: string;
}
```

---

## 🚀 Usage Examples

### Importing the package

```ts
import {
  getProvinces,
  getDistrictsByProvince,
  getDivisionalSecretariatsByDistrict,
  getGramaNiladhariDivisionsByDS,
  getVillagesByGN,
  getVillagesByDistrict,
  getPostalCodesByDistrict
} from "sl-address-utils";
```

---

### Get all provinces

```ts
const provinces = getProvinces();
```

---

### Get districts by province

```ts
const districts = getDistrictsByProvince("P02"); // Central Province
```

---

### Get Divisional Secretariats by district

```ts
const dsList = getDivisionalSecretariatsByDistrict("D04"); // Kandy
```

---

### Get Grama Niladhari divisions by DS

```ts
const gnDivisions = getGramaNiladhariDivisionsByDS("DS015");
```

---

### Get villages / cities by district

```ts
const villages = getVillagesByDistrict("D04");
```

---

### Get villages / cities by GN division

```ts
const villages = getVillagesByGN("GN1023");
```

---

### Get postal codes by district

```ts
const postalCodes = getPostalCodesByDistrict("D04");
```

---

### Resolve full administrative path for a village

```ts
const path = getVillagePath("V20341");

/*
{
  province,
  district,
  divisionalSecretariat,
  gramaNiladhariDivision,
  village
}
*/
```

---

## ⚡ Performance Characteristics

* Data is loaded once at startup
* Lookups are **O(1)** via prebuilt indexes
* No async operations
* No filesystem or network access at runtime

Ideal for:

* Address forms
* Validation logic
* Static websites
* APIs
* Analytics pipelines

---

## 🧪 Testing

This package uses **Vitest**, ensuring compatibility with both JS and TS consumers.

```bash
npm test
```

Test coverage includes:

* ID-based lookups
* Name-based queries
* Hierarchical mappings
* Edge-case validations

---

## 📊 Data Sources

All data is extracted from **official Sri Lankan government sources**:

* **Villages / Cities (20,000+)**
  Source: Ministry of Home Affairs
  [http://moha.gov.lk:8090/lifecode/village_list](http://moha.gov.lk:8090/lifecode/village_list)

* **Postal Codes (2,050 – full coverage)**
  Source: Sri Lanka Post
  [https://slpost.gov.lk/postcode_new/](https://slpost.gov.lk/postcode_new/)

---

## ⚠️ Disclaimer

This package provides **read-only reference data**.

Administrative boundaries, names, or postal codes may change over time.
For legal, regulatory, or official use, always verify against the latest government publications.

---

## 🤝 Contributions

Contributions are welcome:

* Data corrections
* New helper functions
* Performance improvements
* Additional test coverage

Please open an issue or submit a pull request.

---

## 📄 License

MIT License

---

## 👤 Author

Author is looking for **full-time software engineering roles**.
Kindly contact me via **[shamikakushan@gmail.com](mailto:shamikakushan@gmail.com)** or
**LinkedIn:** [https://www.linkedin.com/in/kushanshamika/](https://www.linkedin.com/in/kushanshamika/)
