/**
 * @file supply-chain.db.ts
 * @description מיפוי גיאוגרפי וכלכלי של שרשרת האספקה בישראל:
 * הדיכוטומיה בין מוקד נחלת בנימין ודרום תל אביב לבין מוקד רחוב רבי עקיבא בבני ברק,
 * כולל פרמטרים של שוק הקמעונאות הישראלי (16 מיליארד ש"ח) ושחיקת רווחיות החורף.
 */

import { SourcingHubId, FabricId, ClimateScenarioId } from '../types/fashion.types';

export interface SupplierShop {
  nameHe: string;
  streetOrZoneHe: string;
  specialtyHe: string;
  supportedFabrics: FabricId[];
}

export interface SourcingHub {
  id: SourcingHubId;
  titleHe: string;
  cityHe: string;
  streetsHe: string[];
  targetAudienceHe: string;
  commercialModelHe: string;
  materialSpecialtiesHe: string[];
  shops: SupplierShop[];
  coordinates: { lat: number; lng: number };
}

export const SUPPLY_CHAIN_HUBS_DB: Record<SourcingHubId, SourcingHub> = {
  nahalat_binyamin_tlv: {
    id: 'nahalat_binyamin_tlv',
    titleHe: 'אקוסיסטם נחלת בנימין ודרום תל אביב',
    cityHe: 'תל אביב-יפו',
    streetsHe: [
      'מדרחוב נחלת בנימין',
      'רחוב רמב"ם',
      'רחוב מוהליבר',
      'רחוב גרוזנברג',
      'רחוב השומר',
      'מתחם בית טפר',
      'בניין פנורמה (דרך בן-צבי)',
    ],
    targetAudienceHe:
      'מעצבי שמלות כלה וערב, מותגי בגדי ים עצמאיים, מעצבי קזואל, תדמיתנים, הפקות תיאטרון וטלוויזיה וסטודנטים משנקר ובצלאל.',
    commercialModelHe:
      'שילוב בין ייבוא סיטונאי למעצבים (B2B) למכירה קמעונאית לפי מטר בחנויות המתמחות ובאונליין.',
    materialSpecialtiesHe: [
      'לייקרות עבות ומודפסות לבגדי ים וריקוד',
      'תחרות צרפתיות ומחורזות ורשתות אשליה לשמלות כלה',
      'טול משי, סאטן ארמני ושיפון-לייקרה',
      'בדי כותנה, פשתן טבעי, דריל, חאקי וקנבס לקולקציות קזואל',
    ],
    shops: [
      {
        nameHe: 'מרקו קאירי',
        streetOrZoneHe: 'נחלת בנימין, תל אביב',
        specialtyHe: 'בדי קוטור, משי, תחרות יוקרה ובדים לשמלות ערב וכלה',
        supportedFabrics: ['silk_bridal_tulle', 'lace_chiffon_lycra'],
      },
      {
        nameHe: 'בדי הרצל זכריה',
        streetOrZoneHe: 'נחלת בנימין, תל אביב',
        specialtyHe: 'קטיפת משי למטר, בדי ערב, אריגים קלאסיים ופשתן',
        supportedFabrics: ['linen_galilee', 'silk_bridal_tulle', 'hasidic_wool_velvet_jacquard'],
      },
      {
        nameHe: 'קדנה (Cadena Fabrics & Prints)',
        streetOrZoneHe: 'נחלת בנימין / אונליין',
        specialtyHe: 'בדים נושמים לקיץ, כותנה, פשתן, ויסקוזה ובדים לשמלות כלה',
        supportedFabrics: ['linen_galilee', 'cotton_jersey', 'viscose_bamboo', 'lace_chiffon_lycra'],
      },
      {
        nameHe: 'נייס בדים (Nice Badim)',
        streetOrZoneHe: 'נחלת בנימין, תל אביב',
        specialtyHe: 'לייקרות לבגדי ים, סריגי גרסי, דריל וקנבס',
        supportedFabrics: ['gottex_spandex_lycra', 'cotton_jersey', 'cotton_ata_drill'],
      },
      {
        nameHe: 'קטיפה כחולה',
        streetOrZoneHe: 'נחלת בנימין, תל אביב',
        specialtyHe: 'אריגי כותנה, קורדרוי, דריל, פשתן וטקסטיל לעיצוב',
        supportedFabrics: ['cotton_ata_drill', 'linen_galilee'],
      },
      {
        nameHe: 'קשי טקסטיל',
        streetOrZoneHe: 'נחלת בנימין / רחוב השומר',
        specialtyHe: 'בדי משי, שיפון, טול ואריגים אתניים',
        supportedFabrics: ['silk_bridal_tulle', 'linen_galilee', 'viscose_bamboo'],
      },
      {
        nameHe: 'רוקמת התחרה',
        streetOrZoneHe: 'נחלת בנימין, תל אביב',
        specialtyHe: 'תחרות צרפתיות, אפליקציות מחורזות ורשתות אשליה בצבע גוף',
        supportedFabrics: ['lace_chiffon_lycra', 'silk_bridal_tulle'],
      },
      {
        nameHe: 'פמינה (Femina)',
        streetOrZoneHe: 'נחלת בנימין / גרוזנברג',
        specialtyHe: 'בדי לייקרה, ספנדקס, סאטן ושיפון',
        supportedFabrics: ['gottex_spandex_lycra', 'lace_chiffon_lycra'],
      },
    ],
    coordinates: { lat: 32.0628, lng: 34.7705 },
  },

  rabbi_akiva_bnei_brak: {
    id: 'rabbi_akiva_bnei_brak',
    titleHe: 'אקוסיסטם רחוב רבי עקיבא ובני ברק (ומרכז ירושלים)',
    cityHe: 'בני ברק / ירושלים',
    streetsHe: [
      'ציר רבי עקיבא (בני ברק)',
      'רחוב חזון איש',
      'מתחם פרדס כץ',
      'גאולה / מאה שערים (שלוחת ירושלים לקאפטנים)',
    ],
    targetAudienceHe:
      'תופרות סלון במגזר החרדי והדתי, חייטי קפוטות ובעקיטשעס, מעצבות אופנה צנועה ומשפחות התופרות מערכות לבוש לחתונות וחגים.',
    commercialModelHe:
      'כלכלה פנים-מגזרית ענפה המותאמת ללוח השנה היהודי (שיאי ביקוש לפני חגי תשרי, פסח ועונת החתונות) ולתפירה מותאמת אישית.',
    materialSpecialtiesHe: [
      'בדי צמר משובחים וקטיפת משי (סטראקעס)',
      'אריגי זקארד פרחוני (שחור לימות החול וצבעוני לשבתות לאדמו״רים)',
      'בדים אטומים ונושמים לשמלות צנועות (ויסקוזה, כותנה ושיפון עם בטנה)',
      'בדי נדוניה, בטנות ומערכות רכיסה של 36 לולאות וכפתורים מצופי בד',
    ],
    shops: [
      {
        nameHe: 'דסקל טקסטיל',
        streetOrZoneHe: 'ציר רבי עקיבא, בני ברק',
        specialtyHe: 'אריגי זקארד פרחוניים, בדי בעקיטשע, קטיפת משי וצמר משובח',
        supportedFabrics: ['hasidic_wool_velvet_jacquard', 'silk_bridal_tulle'],
      },
      {
        nameHe: 'בורדורה שירת הבד (ברנשטיין)',
        streetOrZoneHe: 'רחוב רבי עקיבא, בני ברק',
        specialtyHe: 'בדי ערב צנועים, תחרות אטומות, ויסקוזה ומשי לאירועים',
        supportedFabrics: ['viscose_bamboo', 'lace_chiffon_lycra', 'hasidic_wool_velvet_jacquard'],
      },
      {
        nameHe: 'אבנט',
        streetOrZoneHe: 'רבי עקיבא / חזון איש, בני ברק',
        specialtyHe: 'גרטלים, בדי קפוטות, פסי קטיפה לסטראקעס וצמר',
        supportedFabrics: ['hasidic_wool_velvet_jacquard'],
      },
      {
        nameHe: 'פרידמן בדים',
        streetOrZoneHe: 'רחוב רבי עקיבא, בני ברק',
        specialtyHe: 'בדים אטומים ונושמים לשמלות מקסי ומידי צנועות',
        supportedFabrics: ['viscose_bamboo', 'cotton_jersey', 'linen_galilee'],
      },
      {
        nameHe: 'רוטקס (מורשת 1924)',
        streetOrZoneHe: 'בני ברק / אזור התעשייה',
        specialtyHe: 'סריגים, טקסטיל מסורתי ובדי בסיס איכותיים',
        supportedFabrics: ['cotton_jersey', 'viscose_bamboo'],
      },
      {
        nameHe: 'טאובר מרקוס',
        streetOrZoneHe: 'רבי עקיבא, בני ברק',
        specialtyHe: 'יבוא בדי יוקרה לחייטים, צמר אנגלי וזקארד',
        supportedFabrics: ['hasidic_wool_velvet_jacquard', 'cotton_ata_drill'],
      },
      {
        nameHe: 'מקור הבד פיש',
        streetOrZoneHe: 'פרדס כץ / רבי עקיבא, בני ברק',
        specialtyHe: 'בדי שמלות לאירועים, קטיפה ובדים למשפחות ברוכות ילדים',
        supportedFabrics: ['viscose_bamboo', 'hasidic_wool_velvet_jacquard', 'lace_chiffon_lycra'],
      },
    ],
    coordinates: { lat: 32.0841, lng: 34.8352 },
  },

  shenkar_cirtex_tech: {
    id: 'shenkar_cirtex_tech',
    titleHe: 'מוקד הפאשן-טק והמחקר: שנקר (CIRTex), קורנית דיגיטל, סונוביה ואסיב',
    cityHe: 'רמת גן / ראש העין / קיבוץ אפק',
    streetsHe: [
      'מכללת שנקר (מרכז CIRTex וארכיון רוז – 7,000-8,000 פריטים היסטוריים)',
      'קורנית דיגיטל (ראש העין)',
      'סונוביה (רמת גן)',
      'מפעל אסיב תעשיות טקסטיל (קיבוץ אפק – סריגה במכונות עגולות QIZ)',
    ],
    targetAudienceHe:
      'מותגי ייצוא גלובליים, מעצבי פאשן-טק, יצרני Nearshore לפי דרישה (On-Demand) ודלתא גליל.',
    commercialModelHe:
      'קניין רוחני (IP), הדפסה דיגיטלית לפי דרישה (DTG / Roll-to-Roll), אשפרה אולטרסונית ומידול תלת-ממדי ב-AI.',
    materialSpecialtiesHe: [
      'הדפסה ישירה על בגדים וגלילים (Apollo, Atlas MAX, Presto MAX)',
      'החדרת תכונות דוחות-בקטריות וצביעה נקייה באולטרסאונד',
      'סריגה תעשייתית מתקדמת וטקסטיל טכני',
    ],
    shops: [
      {
        nameHe: 'קורנית דיגיטל (Kornit Digital + PrintFactory)',
        streetOrZoneHe: 'ראש העין',
        specialtyHe: 'מערכות DTG (Apollo / Atlas MAX) ו-Roll-to-Roll (Presto MAX)',
        supportedFabrics: ['cotton_jersey', 'linen_galilee', 'viscose_bamboo', 'gottex_spandex_lycra'],
      },
      {
        nameHe: 'סונוביה (Sonovia)',
        streetOrZoneHe: 'רמת גן (בשיתוף שנקר ודלתא)',
        specialtyHe: 'אשפרה אולטרסונית אנטי-בקטריאלית וצביעה נקייה מכימיקלים',
        supportedFabrics: ['cotton_jersey', 'cotton_ata_drill', 'linen_galilee', 'gottex_spandex_lycra'],
      },
      {
        nameHe: 'אסיב תעשיות טקסטיל',
        streetOrZoneHe: 'קיבוץ אפק',
        specialtyHe: 'השריד התעשייתי המוביל לסריגה במכונות עגולות בישראל',
        supportedFabrics: ['cotton_jersey', 'viscose_bamboo'],
      },
    ],
    coordinates: { lat: 32.0898, lng: 34.8032 },
  },
};

export interface ClimateScenario {
  id: ClimateScenarioId;
  nameHe: string;
  tempCelsius: number;
  relativeHumidityPercent: number;
  windVelocityMps: number;
  acShockDeltaCelsius: number;
  descriptionHe: string;
}

export const CLIMATE_SCENARIOS_DB: Record<ClimateScenarioId, ClimateScenario> = {
  coastal_humid_summer: {
    id: 'coastal_humid_summer',
    nameHe: 'קיץ במישור החוף (תל אביב – חום ולחות גבוהים)',
    tempCelsius: 33,
    relativeHumidityPercent: 78,
    windVelocityMps: 2.1,
    acShockDeltaCelsius: 0,
    descriptionHe:
      'תנאי קיצון של חום ולחות במישור החוף ההופכים בדים סינתטיים אטומים וצמר כבד לבלתי נסבלים ומחייבים נידוף זיעה מואץ (פשתן, כותנה, ויסקוזה).',
  },
  ac_sharp_transition: {
    id: 'ac_sharp_transition',
    nameHe: 'מעבר חד מרחוב לוהט לחלל ממוזג (משרדי הייטק)',
    tempCelsius: 21,
    relativeHumidityPercent: 45,
    windVelocityMps: 0.8,
    acShockDeltaCelsius: 13,
    descriptionHe:
      'מעבר יומיומי חד בין 34°C בחוץ ל-21°C במשרד ממוזג. דורש בדים נושמים שאינם לוכדים זיעה קרה ומאפשרים שכבות קלות (Smart Casual).',
  },
  short_israeli_winter: {
    id: 'short_israeli_winter',
    nameHe: 'חורף ישראלי מתקצר (משבר האקלים והקמעונאות)',
    tempCelsius: 17,
    relativeHumidityPercent: 62,
    windVelocityMps: 4.5,
    acShockDeltaCelsius: 4,
    descriptionHe:
      'התקצרות ימי החורף בישראל פוגעת במכירות מעילים וצמר עתירי הרווח הגולמי ויוצרת לחץ תזרימי על רשתות האופנה המקומיות.',
  },
  jerusalem_evening_breeze: {
    id: 'jerusalem_evening_breeze',
    nameHe: 'ערב הררי בירושלים / בני ברק (עונת החתונות והחגים)',
    tempCelsius: 19,
    relativeHumidityPercent: 50,
    windVelocityMps: 3.4,
    acShockDeltaCelsius: 2,
    descriptionHe:
      'אוויר הרים קריר יותר בערב, שבו נלבשים קפוטות, סטראקעס בעקיטשע, מעיל מדבר של משכית ושמלות כלה וערב בחתונות חוץ.',
  },
  negev_desert_dry: {
    id: 'negev_desert_dry',
    nameHe: 'יובש מדברי בצפון הנגב ועין גדי',
    tempCelsius: 36,
    relativeHumidityPercent: 22,
    windVelocityMps: 5.2,
    acShockDeltaCelsius: 0,
    descriptionHe:
      'קרינה ישירה ויובש מדברי עם רוחות ערב – סביבת ההשראה של "משכית", שמלת "עין גדי" וגלימת "בד סיני" הזורמות.',
  },
};

export const ISRAELI_RETAIL_BENCHMARKS = {
  annualMarketSizeBillionILS: 16.0,
  historicalMarketSizeBillionILS: 7.0,
  customsDrop1995To2018Percent: 27,
  workforceDropPercent: 80,
  workforce1995: 45100,
  workforceCurrent: 9000,
  annualBusinessClosureRiskPercent: 11.8,
  winterTargetGrossMarginPercent: 68,
  summerTargetGrossMarginPercent: 46,
  bridalExportGrossMarginPercent: 78,
};
