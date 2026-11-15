# ✈️ VOYAGE SCALE
### **Intelligent Dual-Platform Airport Baggage Weighing System**

**Created by Ahmed Pharah**

> **Precision in every kilogram. Confidence in every journey.**

---

## 🌍 Project Overview

**Voyage Scale** is a modern airport baggage-weight calculation and monitoring interface designed to transform complex weighing measurements into a clear, professional, and easy-to-understand passenger experience.

The system is designed around a **dual-platform baggage scale**, where the actual loads on Platform 1 and Platform 2 are calculated from sensor measurements.

Instead of simply displaying a raw sensor reading, Voyage Scale processes the relationship between multiple sensors and the two platform loads to determine the **true baggage weight**.

The result is presented through a premium airport-inspired interface that immediately communicates:

- Total baggage weight
- Individual platform weights
- Passenger baggage allowance
- Remaining/spare allowance
- Underweight or overweight status
- Sensor equations
- Calculation samples
- Saved weighing records

---

# 👨‍💻 Creator

### **Ahmed Pharah**

**Project:** Voyage Scale  
**Category:** Airport Technology / Smart Baggage Weighing  
**Interface:** Web Application  
**Purpose:** Baggage measurement, calculation and allowance monitoring

> *“Turning complex measurements into simple decisions.”*

---

# 🎯 The Problem

Traditional weighing systems may provide measurements without clearly explaining how those measurements relate to the actual load on different platforms.

Voyage Scale addresses this problem by creating a calculation layer between the sensor readings and the final baggage result.

The system considers the relationship between:

**Sensor Measurements → Mathematical Model → Platform Loads → Total Weight → Allowance Decision**

This creates a more transparent and understandable weighing experience.

---

# ⚙️ How Voyage Scale Works

Voyage Scale uses two unknown platform loads:

- **x** = true load on Platform 1
- **y** = true load on Platform 2

Each sensor measures a combination of these two loads.

For example, the interface can display equations such as:

```text
2x + 3y = 18 kg
1x + 2y = 11 kg
```

The system then solves the equations to determine the actual platform weights.

For the example above:

```text
Platform 1 (x) = 3 kg
Platform 2 (y) = 4 kg
```

Therefore:

```text
Total Baggage Weight = x + y

                     = 3 kg + 4 kg

                     = 7 kg
```

---

# 🧮 Mathematical Engine

The core concept can be represented using a system of linear equations:

```text
a₁x + b₁y = c₁

a₂x + b₂y = c₂
```

Voyage Scale determines the values of **x** and **y** and then calculates:

```text
Total Weight = x + y
```

The interface also provides a **“Show the working”** section for displaying the calculation process and inverse-matrix steps.

This makes the system useful not only as a calculator, but also as a visual demonstration of the mathematics behind the measurement.

---

# 🛄 Baggage Allowance

Voyage Scale allows the baggage limit to be selected directly from the interface.

Available allowance examples include:

```text
7 kg
15 kg
20 kg
23 kg
32 kg
Custom
```

The selected allowance is then compared against the calculated total baggage weight.

### Example

```text
Baggage Weight:     7 kg
Allowance:         23 kg
Remaining:         16 kg
Status:             Within allowance
```

The interface communicates this information visually so the user can immediately understand whether the baggage is acceptable.

---

# 📊 Intelligent Weight Status

Voyage Scale provides clear visual states for different weighing situations.

### 🟢 Under Limit

The baggage is within the selected allowance.

### 🔴 Overweight

The baggage exceeds the selected allowance.

### 🔵 Fractions

The system can represent non-integer calculated weights.

### 🟡 Row Swap

A calculation state associated with swapping equation rows during the solving process.

### ⚪ No Inverse

A calculation state indicating that the required matrix inverse is unavailable.

These states help make the mathematical engine easier to understand and debug.

---

# 📋 Weigh Log

Voyage Scale includes a **Weigh Log** designed to keep track of weighing operations.

The interface indicates that weighing records are:

> **Saved on this device only.**

This allows the application to maintain a local record of measurements without requiring a remote database for the basic weighing workflow.

The log can be used to review previous weighing operations directly from the application.

---

# 🎨 Premium Interface

The Voyage Scale interface is designed around an airport/aviation-inspired visual language.

### Interface characteristics

- Premium dark glass-style panels
- Aviation-inspired blue and green atmosphere
- Gold accent details
- Clear weight indicators
- Status badges
- Large numerical results
- Platform-specific cards
- Interactive allowance controls
- Calculation visibility
- Responsive information hierarchy

The goal is to make technical calculations feel like part of a **professional airport weighing terminal** rather than a conventional calculator.

---

# 🧭 User Experience

The typical workflow is:

```text
             SENSOR INPUT
                  │
                  ▼
        ┌─────────────────────┐
        │  Sensor Equations   │
        └──────────┬──────────┘
                   │
                   ▼
        ┌─────────────────────┐
        │ Mathematical Solver │
        └──────────┬──────────┘
                   │
                   ▼
        ┌─────────────────────┐
        │ Platform 1 + 2 Load │
        └──────────┬──────────┘
                   │
                   ▼
        ┌─────────────────────┐
        │  Total Weight       │
        └──────────┬──────────┘
                   │
                   ▼
        ┌─────────────────────┐
        │ Allowance Check     │
        └──────────┬──────────┘
                   │
          ┌────────┴────────┐
          ▼                 ▼
     WITHIN LIMIT        OVERWEIGHT
          │
          ▼
     SAVE WEIGHING
```

---

# 🧪 Example Calculation

Given:

```text
Sensor 1:
2x + 3y = 18

Sensor 2:
x + 2y = 11
```

The solver determines:

```text
x = 3 kg
y = 4 kg
```

Therefore:

```text
Total = 3 + 4
      = 7 kg
```

If the baggage allowance is:

```text
23 kg
```

then:

```text
23 - 7 = 16 kg
```

### Final result

```text
TOTAL BAGGAGE WEIGHT

7 KG

16 KG TO SPARE

STATUS: WITHIN ALLOWANCE
```

---

# 💻 Project Structure

```text
baggage-scale-program/
│
└── voyage-scale/
    │
    ├── index.html
    ├── style.css
    ├── app.js
    └── README.txt
```

### `index.html`

Defines the structure and interface of the Voyage Scale application.

### `style.css`

Controls the premium visual design, layout, panels, colors, typography and responsive presentation.

### `app.js`

Contains the application logic, including calculations, baggage-weight processing, allowance evaluation and interaction behavior.

### `README.txt`

Provides project information and documentation.

---

# 🚀 Running the Project

Clone the repository:

```bash
git clone https://github.com/ahmedfaarax7605-creator/baggage_scale_program.git
```

Enter the project directory:

```bash
cd baggage_scale_program
```

Open the web application through your preferred local development environment.

For a simple browser-based preview, open:

```text
voyage-scale/index.html
```

---

# 🛠️ Technology

Voyage Scale is built as a web-based application using:

- **HTML5** — application structure
- **CSS3** — visual design and responsive interface
- **JavaScript** — calculation engine and application interaction
- **Git** — version control
- **GitHub** — source-code hosting

---

# 🔐 Data Philosophy

The current interface is designed around local weighing records.

The **Weigh Log** is presented as being saved on the device, keeping the basic weighing workflow simple and independent of a remote database.

Future versions could introduce secure cloud synchronization if required.

---

# ✨ Key Features

| Feature | Description |
|---|---|
| ⚖️ Dual-platform weighing | Calculates separate Platform 1 and Platform 2 loads |
| 🧮 Equation solving | Converts sensor equations into actual platform weights |
| 📐 Matrix workflow | Supports inverse-matrix calculation presentation |
| 🛄 Allowance selection | Supports predefined and custom baggage limits |
| 📊 Weight comparison | Compares calculated weight against allowance |
| 🟢 Status detection | Indicates whether baggage is within the limit |
| 🔴 Overweight detection | Identifies baggage exceeding the allowance |
| 💾 Weigh log | Stores weighing records on the device |
| 🎨 Premium UI | Airport-inspired modern interface |
| 📱 Interactive design | Designed for a clear and accessible weighing workflow |

---

# 🏆 Design Philosophy

Voyage Scale follows three principles:

### **1. Precision**

Every calculation should have a clear mathematical relationship to the sensor measurements.

### **2. Clarity**

Passengers and operators should be able to understand the result without interpreting complicated raw data.

### **3. Confidence**

The final screen should make the most important information immediately visible:

**How heavy is the baggage?**

**What is the allowance?**

**How much weight remains?**

**Is the baggage within the limit?**

---

# 🔮 Future Development

Voyage Scale can be expanded into a more complete airport weighing platform.

Possible future capabilities include:

- Real physical load-cell sensor integration
- Real-time hardware readings
- Multiple baggage stations
- Airport counter integration
- QR/barcode baggage identification
- Passenger receipt generation
- Thermal-printer support
- Airline-specific baggage rules
- Multiple passenger baggage records
- Secure cloud synchronization
- Operator/admin dashboard
- Historical weighing analytics
- Multi-language airport interface
- Touchscreen kiosk mode
- Calibration and sensor diagnostics

---

# 🌐 Repository

**GitHub Repository**

https://github.com/ahmedfaarax7605-creator/baggage_scale_program

---

# 📜 Project Identity

```text
PROJECT
Voyage Scale

CREATOR
Ahmed Pharah

DOMAIN
Airport Baggage Technology

CORE FUNCTION
Dual-platform baggage weight calculation

INTERFACE
Web Application

STATUS
Active Development
```

---

# 💎 Final Statement

**Voyage Scale is more than a baggage calculator.**

It is a visual interpretation of sensor data, mathematics and passenger baggage limits — brought together into a single airport-inspired interface.

From the first sensor equation to the final **“Within allowance”** decision, every stage is designed to make baggage weighing more understandable, more transparent and more professional.

> **Voyage Scale**  
> **Measure precisely. Calculate intelligently. Travel confidently.**

---

### © 2026 Ahmed Pharah
**Voyage Scale — Intelligent Baggage Weighing System**
