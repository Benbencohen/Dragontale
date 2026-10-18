# ארגמן-CAD 3D | מערכת הפאשן-טק, מידול תלת-ממדי ומתיחת גבולות של הטקסטיל הישראלי

מערכת WebGL / Three.js מתקדמת לעיצוב, דקונסטרוקציה וטרנספורמציה רדיקלית של פרטי לבוש, המבוססת על מסד נתונים היסטורי, אקלימי, הלכתי וסוציו-תרבותי של תעשיית האופנה והטקסטיל בישראל (1920–2026).

## מבנה תיקיות הפרויקט (Clean Modular Architecture)

```text
project-root/
├── public/
│   └── assets/
│       ├── textures/            # מפות טקסטורה (Normal, Roughness, Bump, Alpha) לבדים השונים
│       ├── patterns/            # וקטורים של רקמות (תימנית, בדואית, פלסטינית, חרציות גוטקס)
│       └── base-meshes/         # מודלים תלת-ממדיים התחלתיים (GLTF/OBJ)
├── src/
│   ├── core/                    # הליבה ההנדסית והפיזיקלית
│   │   ├── physics-engine/
│   │   │   └── clothSimulation.ts  # סימולציית בדים (Drape, Elasticity, Gravity, קריסת עיטורים)
│   │   ├── morph-engine/
│   │   │   └── morphEngine.ts      # מנוע "מתיחת גבולות" ושינוי טופולוגיה (כמו מכנס -> צעיף)
│   │   └── pattern-parser/
│   │       └── patternParser.ts    # המרה בין גזרה דו-ממדית (2D UV) למודל תלת-ממדי (3D Mesh)
│   ├── data/                    # מסדי נתונים מובנים (JSON/TS) מתוך מחקר הטקסטיל הישראלי
│   │   ├── fabrics.db.ts        # תכונות פיזיקליות וסיבתיות של בדים (פשתן, משי, לייקרה וכו')
│   │   ├── archetypes.db.ts     # תבניות בסיס היסטוריות ומגזריות (אתא, משכית, חסידי, כלה, גוטקס, הייטק)
│   │   ├── supply-chain.db.ts   # מיפוי ספקים: נחלת בנימין מול רבי עקיבא (בני ברק) + סימולטור אקלים
│   │   └── fashion-tech.db.ts   # פרמטרים של קיימות וייצור (Kornit DTG/R2R, Sonovia, Styletech)
│   ├── components/              # רכיבי UI מחולקים לפי תחומי אחריות
│   │   ├── workspace-3d/
│   │   │   └── Workspace3D.tsx     # קנבס תלת-ממד, תאורה, אווטאר וירטואלי וכלי מתיחה חופשית
│   │   ├── pattern-editor-2d/
│   │   │   └── PatternEditor2D.tsx # עורך גזרות שטוח (פתיחת תפרים, איחוי שרוולים, שינוי פרופורציות)
│   │   ├── fabric-inspector/
│   │   │   └── FabricInspector.tsx # בחירת בד, מיקרו-מבנה, מדד התרככות בכביסות וסימולטור אקלים
│   │   └── analytics-panel/
│   │       └── AnalyticsPanel.tsx  # מחשבון עלויות, מפת ספקים ומדד זיהום/קיימות
│   ├── state/
│   │   └── useFashionStore.ts   # ניהול מצב גלובלי (Zustand)
│   ├── types/
│   │   └── fashion.types.ts     # הגדרות טיפוסים קפדניות (TypeScript Interfaces)
│   ├── utils/
│   │   └── geometryUtils.ts     # פונקציות עזר, חישובים גיאומטריים וייצוא קובצי OBJ/JSON
│   └── App.tsx                  # קומפוננטת שורש ראשית
├── package.json
└── tsconfig.json
```
