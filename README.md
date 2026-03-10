# CarbonWise

**Lifecycle vehicle emissions intelligence. Built for India's EV era.**

CarbonWise calculates the true environmental cost of any vehicle — manufacturing, fuel or energy consumption, and battery disposal — adjusted for the electricity grid of your exact state or country. It goes beyond tailpipe emissions to give consumers an honest, data-driven picture of their vehicle's carbon impact over its full lifetime.

---

## The Problem

Consumers comparing vehicles in India face a fundamental data gap. Fuel efficiency figures are widely published, but lifecycle carbon costs — which include vehicle manufacturing, real-world energy consumption adjusted for regional grid intensity, and end-of-life battery disposal — are not. This makes it impossible to make an informed environmental decision.

A Tata Nexon EV charged on Jharkhand's coal-heavy grid (1.10 kg CO₂/kWh) has a higher lifecycle footprint than a Toyota Prius Hybrid. The same Nexon EV in Himachal Pradesh (0.12 kg CO₂/kWh) saves over 30 tonnes across its lifetime. No existing tool surfaces this distinction for Indian consumers.

---

## Features

- **Vehicle Comparison** — Side-by-side lifecycle breakdown for up to three vehicles, with bar charts and break-even line charts
- **Personal Calculator** — Ranked recommendations based on daily mileage, ownership period, state grid, and budget
- **Grid-Adjusted Scoring** — Live recalculation across 18 Indian states and 50+ countries
- **Greenwash Detector** — Scores marketing claims against a database of lifecycle red flags
- **AI Carbon Advisor** — Conversational AI that answers specific questions about vehicle carbon trade-offs
- **Live News Feed** — Curated RSS articles from Down To Earth, Carbon Brief, and Electrek
- **Honest Leaderboard** — 14 vehicles ranked by total lifecycle CO₂, filterable by type

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                        Client                           │
│                                                         │
│   React 18  ─  React Router v6  ─  Framer Motion       │
│   Chart.js  ─  Lucide Icons     ─  Vite                 │
└────────────────────────┬────────────────────────────────┘
                         │ HTTP / REST
                         │ (proxied via Vite dev server)
┌────────────────────────▼────────────────────────────────┐
│                    Django Backend                        │
│                                                         │
│   Django 5.0  ─  Django REST Framework                  │
│   django-cors-headers  ─  SQLite                        │
│                                                         │
│   ┌──────────┐  ┌───────────┐  ┌────────────────────┐  │
│   │  /chat   │  │/lifecycle │  │    /greenwash       │  │
│   │  POST    │  │  POST     │  │      POST           │  │
│   └────┬─────┘  └─────┬─────┘  └────────────────────┘  │
│        │              │                                  │
│        │         Carbon Math                             │
│        │         Engine (pure Python)                    │
│        │                                                 │
└────────┼────────────────────────────────────────────────┘
         │ HTTPS
┌────────▼────────┐
│   Groq API      │
│  Llama 3.1 8B   │
│  (free tier)    │
└─────────────────┘
```

---

## Carbon Calculation Model

```
Lifecycle CO₂  =  Manufacturing  +  Operational  +  End of Life

For EVs:
  Operational  =  (kWh / 100km ÷ 100)  ×  grid_intensity  ×  total_km

For ICE:
  Operational  =  (litres / 100km ÷ 100)  ×  2.31 kg/litre  ×  total_km

Where:
  total_km       =  daily_km  ×  365  ×  ownership_years
  grid_intensity =  kg CO₂ per kWh  (varies by state / country)
```

Grid intensity data sourced from CEA India 2023 for Indian states and IEA 2023 for international regions. Manufacturing and disposal figures derived from EPA and EEA lifecycle studies.

---

## Tech Stack

### Frontend

| Package | Version | Purpose |
|---|---|---|
| React | 18.3 | UI framework |
| Vite | 5.3 | Build tool and dev server |
| React Router | 6.24 | Client-side routing |
| Framer Motion | 11.2 | Animations and transitions |
| Chart.js | 4.4 | Data visualisation |
| react-chartjs-2 | 5.2 | React wrapper for Chart.js |
| Lucide React | 0.383 | Icon system |

### Backend

| Package | Version | Purpose |
|---|---|---|
| Django | 5.0.6 | Web framework |
| djangorestframework | 3.15.2 | REST API layer |
| django-cors-headers | 4.4.0 | Cross-origin request handling |

### External APIs

| Service | Usage | Cost |
|---|---|---|
| Groq (Llama 3.1 8B) | AI chat endpoint | Free tier |
| rss2json.com | RSS feed parsing | Free tier |

---

## Project Structure

```
carbonwise/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── AIChat.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Compare.jsx
│   │   │   ├── Calculator.jsx
│   │   │   ├── GoGreen.jsx
│   │   │   ├── TheReality.jsx
│   │   │   ├── Community.jsx
│   │   │   └── Insights.jsx
│   │   ├── data/
│   │   │   └── index.js          # Vehicle + grid dataset
│   │   ├── styles/
│   │   │   └── globals.css       # Design system
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
└── backend/
    ├── carbonwise/
    │   ├── settings.py
    │   ├── urls.py
    │   └── wsgi.py
    ├── api/
    │   ├── views.py              # All endpoint logic
    │   └── urls.py
    ├── manage.py
    └── requirements.txt
```

---

## API Reference

### `POST /api/chat/`
AI carbon advisor. Accepts a user message and optional conversation history.

```json
{
  "message": "Is a Nexon EV better than a Prius in Delhi?",
  "context": "optional — current comparison context",
  "history": []
}
```

### `POST /api/lifecycle/`
Calculate lifecycle CO₂ for one or more vehicles under a given scenario.

```json
{
  "cars": ["nexon-ev", "creta"],
  "grid": "DL",
  "km": 40,
  "years": 8
}
```

### `POST /api/greenwash/`
Score a marketing claim for greenwashing indicators.

```json
{
  "text": "This vehicle is carbon neutral and produces zero emissions."
}
```

### `GET /api/cars/`
Returns the full vehicle database.

### `GET /api/grids/`
Returns all grid intensity values (18 Indian states + 50+ countries).

### `GET /api/health/`
Health check.

---

## Getting Started

### Prerequisites
- Python 3.10+
- Node.js 18+

### Backend

```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Set your Groq API key in `backend/carbonwise/settings.py`:

```python
GROQ_API_KEY = 'your_key_here'
```

Free key available at [console.groq.com](https://console.groq.com).

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The Vite dev server proxies `/api/*` requests to `http://localhost:8000` automatically.

---

## Data Sources

| Source | Data Used |
|---|---|
| CEA India 2023 | State-wise grid emission intensity |
| IEA 2023 | International grid intensities |
| EPA | Vehicle lifecycle CO₂ methodology |
| EEA | European fleet lifecycle benchmarks |
| ARAI | Indian vehicle fuel consumption figures |

---

## Contributors

Ayushi Agrawal · Neha Malhotra · Reshmi Yadav · Jhalak Mittal

---

## License

MIT
