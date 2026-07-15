/**
 * i18n translations for Capital Engine
 * Supports English and Spanish
 */

export type Language = 'en' | 'es';
export type Currency = 'USD' | 'MXN';

export interface i18nStrings {
  // Headers & titles
  title: string;
  subtitle: string;
  description: string;
  tag: string;
  basis: string;

  // Entity structure
  entityStructure: string;
  entityStructureLead: string;
  principleLabel: string;
  principleDesc1: string;
  principleDesc2: string;
  principleDesc3: string;
  principleDesc4: string;
  holdcoLabel: string;
  holdcoDesc1: string;
  holdcoDesc2: string;
  holdcoDesc3: string;
  holdcoDesc4: string;
  opcLabel: string;
  opcDesc1: string;
  opcDesc2: string;
  opcDesc3: string;
  opcDesc4: string;

  // Capital flow
  capitalFlow: string;
  capitalFlowLead: string;
  pathATitle: string;
  pathACapFlow: string;
  pathADistrWF: string;
  pathBTitle: string;
  pathBDesc: string;
  pathBDiagramTBA: string;

  // Scenario config
  scenarioConfig: string;
  scenarioConfigLead: string;
  dealName: string;
  dealNamePlaceholder: string;
  capitalPartnerName: string;
  capitalPartnerNamePlaceholder: string;
  totalCapital: string;
  capitalPartnerShare: string;
  preferredReturn: string;
  investmentHorizon: string;
  hardCapMultiple: string;
  exitMultiple: string;
  calculateReturns: string;
  exportJSON: string;
  saveToAirtable: string;

  // Path A vs B
  pathAvsB: string;
  pathAvsBLead: string;
  pathALabel: string;
  pathAReturnProtected: string;
  pathBLabel: string;
  capitalReturned: string;
  preferredReturnLabel: string;
  totalReturn: string;
  multiple: string;
  residualEquity: string;
  pathBGrowthUpside: string;
  capitalPartnerEquity: string;
  totalReturnAtExit: string;
  upsidePotential: string;
  plusEquityGrowth: string;
  youNoteText: string;
  operatingPartnerNoteText: string;
  capitalPartnerNoteText: string;

  // Capital split
  capitalSplit: string;
  capitalSplitLead: string;
  totalCapitalRaise: string;
  creditLineAmount: string;
  capitalPartnerLOC: string;
  royContribution: string;
  totalDealSize: string;
  capStackLabel: string;
  capStackReadoutDefault: string;
  fourGP: string;
  capPartnerLOC: string;
  fundedBy: string;

  // SEMI stack
  semiStack: string;
  semiStackLead: string;
  brandRoyalty: string;
  brandRoyaltyDesc: string;
  operatingSystemLicense: string;
  operatingSystemLicenseDesc: string;
  marketingFund: string;
  marketingFundDesc: string;
  revenueShare: string;
  salesExample: string;
  devFeeLabel: string;
  devFeeNote: string;

  // Waterfall
  profitDistribution: string;
  profitDistributionLead: string;
  distributableCash: string;
  returnOfCapital: string;
  returnOfCapitalDesc: string;
  prefLabel: string;
  prefDesc: string;
  splitByEquity: string;
  splitDesc: string;
  nothingYet: string;
  capitalBackProtected: string;
  capitalReturned2: string;
  capitalReturnedProtected: string;
  prefPayingCapPercent: string;
  capAndPrefCovered: string;

  // Capital partner returns
  capitalPartnerReturns: string;
  capitalPartnerReturnsLead: string;
  pathASecuredLOC: string;
  pathA20ROI: string;
  locAmount: string;
  lpEquitySecurity: string;
  annual20Interest: string;
  totalInterest: string;
  pathBDirectInvest: string;
  pathB10Pref: string;
  investmentAmount: string;
  lpEquityStake: string;
  annual10Pref: string;
  totalPref: string;
  equityUpsideValue: string;

  // Equity release
  equityRelease: string;
  equityReleaseLead: string;
  prePaybackState: string;
  mattGPStake: string;
  baseGPContrib: string;
  edgarGPStake: string;
  earnedOps: string;
  postPaybackState: string;
  debtRepaid: string;
  mattGPIncreased: string;
  edgarGPIncreased: string;
  conversionMechanics: string;
  conversionMechanicsDefault: string;

  // Ownership
  ownership: string;
  ownershipLead: string;
  fullyVested: string;
  royPartner: string;
  royPartnerDesc: string;
  operatingPartnerOwn: string;
  operatingPartnerDesc: string;
  capitalPartnerOwn: string;
  capitalPartnerDesc: string;
  sponsorEconomics: string;

  // Power without liability
  powerWithoutLiability: string;
  powerWithoutLiabilityLead: string;
  youSemi: string;
  holdsThePower: string;
  managerTitle: string;
  managerHoldco: string;
  reservedMattersTitle: string;
  reservedMatters: string;
  boardSeatTitle: string;
  boardSeat: string;
  insulatedLiability: string;
  operatingPartnerCVL: string;
  carriesTheRisk: string;
  chiefOperatingOfficerTitle: string;
  chiefOperatingOfficer: string;
  personallyHook: string;
  signsLeases: string;
  equityReal: string;

  // Control labels
  language: string;
  currency: string;
  english: string;
  spanish: string;
  years: string;
  percent: string;

  // Common labels
  you: string;
  operatingPartner: string;
  capitalPartner: string;
  principle: string;

  // Locations
  texasLLC: string;
  mexicoSACV: string;

  // Footer
  footerMono: string;
  footerDisclaimer: string;

  // Dynamic readout messages
  capitalLabel: string;
  prefBarLabel: string;
  capStackDefault: string;
  equityReleaseDefault: string;
}

const EN: i18nStrings = {
  title: 'Capital Modeling Engine',
  subtitle: 'One master model for entity structure, equity splits, investor returns, and instrument design.',
  description: 'Move a slider anywhere, everything recalculates.',
  tag: 'Illustrative · discussion draft',
  basis: 'ALL SLIDERS SHARE ONE STATE · FIGURES ARE STRUCTURAL, NOT COMMITTED · SCENARIOS ARE SHAREABLE VIA URL',

  entityStructure: 'The three-entity structure',
  entityStructureLead: 'IP licensing in Texas · Capital pooling in Mexico · Operations in Mexico. Ownership and control separated from operational liability.',
  principleLabel: 'Principle',
  principleDesc1: 'Brand & Systems IP Licensing',
  principleDesc2: 'Owns the name, playbook, recipes, tech',
  principleDesc3: 'Licenses to HoldCo',
  principleDesc4: 'Isolated from operational risk',
  holdcoLabel: 'HoldCo',
  holdcoDesc1: 'Manager: You (reserved matters + board)',
  holdcoDesc2: 'Capital pooling & distributions',
  holdcoDesc3: 'Cap table, owns OpCo ~99.99%',
  holdcoDesc4: 'Receives IP licensing from Principle',
  opcLabel: 'OpCo',
  opcDesc1: 'Operating Partner',
  opcDesc2: 'Restaurant operations',
  opcDesc3: 'Staff, permits, leases, suppliers',
  opcDesc4: 'Tax, labor, regulatory liability',

  capitalFlow: 'Capital flow: two return structures',
  capitalFlowLead: 'Two capital structures with different distribution waterfalls. Choose Path A (10% equity investment) or Path B (20% LOC with converted equity).',
  pathATitle: 'Path A: Equity Investment (10% Pref + 66% Promote to Operators)',
  pathACapFlow: 'Capital Flow: Matt and Capital Partner both invest capital through HoldCo. Capital returns pro-rata, then 10% preferred return (capped at 1.75x). Remaining upside: 66% to operators (GP), 34% split pro-rata to capital investors.',
  pathADistrWF: 'Distribution Waterfall: Return of Capital → Preferred Return → Promote Split → Final Distributions. Capital Partner retains equity but at reduced stake due to 66% promote to operators (Edgar gets 100% of operator equity).',
  pathBTitle: 'Path B: Line of Credit (20% Interest → Equity Conversion)',
  pathBDesc: 'Capital Partner provides $400-500k LOC @ 20% interest. After capital return and interest payments, the LP equity security backing the loan converts to GP equity, split 50-50 between Matt Roy and Edgar Delgado.',
  pathBDiagramTBA: 'Interactive diagram coming soon.',

  scenarioConfig: 'Scenario configuration',
  scenarioConfigLead: 'Configure capital raise, returns, and horizon. Calculate Path A vs Path B scenarios to see how capital partner economics differ.',
  dealName: 'Deal Name',
  dealNamePlaceholder: 'e.g., Dinosaur Pizza',
  capitalPartnerName: 'Capital Partner Name',
  capitalPartnerNamePlaceholder: 'e.g., Fortress Capital',
  totalCapital: 'Total Capital Raise ($M)',
  capitalPartnerShare: "Capital Partner's Share",
  preferredReturn: 'Preferred Return (%/yr)',
  investmentHorizon: 'Investment Horizon (Years)',
  hardCapMultiple: 'Hard Cap Multiple',
  exitMultiple: 'Exit Multiple (Business Value)',
  calculateReturns: 'Calculate Returns',
  exportJSON: 'Export JSON',
  saveToAirtable: 'Save to Airtable',

  pathAvsB: 'Path A vs Path B',
  pathAvsBLead: 'Capital partner return scenarios: full return protection with no equity, or moderate return with significant equity upside.',
  pathALabel: 'Path A: 20% Return + Full Exit',
  pathAReturnProtected: 'Return-Protected',
  pathBLabel: 'Path B: 8% Return + Equity Stake',
  capitalReturned: 'Capital Returned',
  preferredReturnLabel: 'Preferred Return',
  totalReturn: 'Total Return',
  multiple: 'Multiple',
  residualEquity: 'Residual Equity',
  pathBGrowthUpside: 'Growth + Upside',
  capitalPartnerEquity: 'Capital Partner Equity',
  totalReturnAtExit: 'Total Return (at exit)',
  upsidePotential: 'Upside Potential',
  plusEquityGrowth: 'Plus equity growth',
  youNoteText: 'capital + pref + 65% of the split',
  operatingPartnerNoteText: '15% of the split — pure equity upside',
  capitalPartnerNoteText: 'capital + pref + 20% of the split',

  capitalSplit: "Whose money is in the deal",
  capitalSplitLead: 'Capital Partner secures a line of credit (backed by LP equity). Roy contributes the remaining capital, split 50/50 between LP and GP.',
  totalCapitalRaise: 'Total Capital Raise',
  creditLineAmount: 'Credit Line Amount (secured LOC)',
  capitalPartnerLOC: 'Capital Partner LOC',
  royContribution: 'Roy Contribution',
  totalDealSize: 'Total Deal Size',
  capStackLabel: 'Capital Stack:',
  capStackReadoutDefault: 'Capital Partner provides $500k secured LOC (backed by 20% LP equity). Roy closes the gap with remaining capital, split 50% LP / 50% GP. The 50% GP contribution funds the General Partner.',
  fourGP: '50% LP / 50% GP',
  capPartnerLOC: '20% LP security',
  fundedBy: '100% capitalized',

  semiStack: 'What SEMI earns off the top',
  semiStackLead: 'These are paid off revenue, before any profit is split — your senior, low-risk economics flowing whether the store distributes a dollar.',
  brandRoyalty: 'Brand royalty',
  brandRoyaltyDesc: 'License of the Dinosaur Pizza name & brand system.',
  operatingSystemLicense: 'Operating-system license',
  operatingSystemLicenseDesc: 'The playbook, recipes, tech & systems you build and maintain.',
  marketingFund: 'Marketing fund',
  marketingFundDesc: 'SEMI-administered; you control the spend and the brand.',
  revenueShare: '10% of revenue → SEMI, off the top.',
  salesExample: 'Rule of thumb: on every $1,000,000 of sales, that\'s ~$100,000/yr to SEMI before profit is calculated.',
  devFeeLabel: 'Plus a one-time development fee',
  devFeeNote: 'SEMI\'s fee for designing and building the operation, paid at launch (market rate). Not shown in annual distributions below.',

  profitDistribution: 'How profit gets distributed',
  profitDistributionLead: 'Two capital structures: Equity Investment (10% pref + 66% promote to operators) vs Line of Credit (20% interest, then equity converts to GP). Move the slider to see how distributions change.',
  distributableCash: 'Distributable Cash to Date',
  returnOfCapital: 'Return of capital',
  returnOfCapitalDesc: 'all capital back first, pro-rata',
  prefLabel: 'Preferred return',
  prefDesc: 'dynamic %, capped at 1.75×',
  splitByEquity: 'Split by equity',
  splitDesc: '65 / 15 / 20',
  nothingYet: 'Nothing distributed yet.',
  capitalBackProtected: 'Everyone\'s still getting their capital back — no one\'s made a profit yet. The partner\'s downside is protected first.',
  capitalReturned2: 'Capital\'s returned; now the preferred return is being paid (capped at 1.75× over the investment horizon). Still no equity split until pref is satisfied.',
  capitalReturnedProtected: 'Capital and pref are covered. Everything above is real profit, split 65/15/20. Your operating partner is pure equity upside — they put in no cash, so 100% of their return rides on operational excellence. That\'s the alignment.',
  prefPayingCapPercent: 'Preferred return paying out as % of capital',
  capAndPrefCovered: 'Capital and preferred return are covered',

  capitalPartnerReturns: 'Capital partner returns comparison',
  capitalPartnerReturnsLead: 'Compare two structures: secured line of credit (20% ROI) vs. direct equity investment (10% pref + equity stake).',
  pathASecuredLOC: 'Path A: Secured Line of Credit',
  pathA20ROI: '20% ROI + Security',
  locAmount: 'LOC Amount',
  lpEquitySecurity: 'LP Equity Security',
  annual20Interest: 'Annual 20% Interest',
  totalInterest: 'Total Interest',
  pathBDirectInvest: 'Path B: Direct Investment',
  pathB10Pref: '10% Pref + Equity',
  investmentAmount: 'Investment Amount',
  lpEquityStake: 'LP Equity Stake',
  annual10Pref: 'Annual 10% Pref',
  totalPref: 'Total Pref',
  equityUpsideValue: 'Equity Upside Value',

  equityRelease: 'Equity release upon debt repayment',
  equityReleaseLead: 'When the Capital Partner\'s LOC + 20% interest is fully repaid, the LP equity security backing the loan converts to GP equity and splits 50-50 between Matt Roy and Edgar Delgado.',
  prePaybackState: 'PRE-PAYBACK STATE',
  mattGPStake: 'Matt Roy (GP stake)',
  baseGPContrib: 'Base GP contribution',
  edgarGPStake: 'Edgar (Operating Partner)',
  earnedOps: 'Earned through operations',
  postPaybackState: 'POST-PAYBACK (Debt + Interest Repaid)',
  debtRepaid: 'Debt repaid • LP security released',
  mattGPIncreased: 'Matt Roy (GP stake increased)',
  edgarGPIncreased: 'Edgar (GP stake increased)',
  conversionMechanics: 'The Conversion Mechanics:',
  conversionMechanicsDefault: 'When the Capital Partner\'s $500k loan is fully repaid with interest, the released LP equity that secured the debt converts to GP equity and distributes 50-50 to Matt Roy and Edgar Delgado as GP members.',

  ownership: 'Who owns the enterprise',
  ownershipLead: 'Equity ownership of the HoldCo — the residual value after capital and pref are paid.',
  fullyVested: 'Fully vested',
  royPartner: 'Roy Partner',
  royPartnerDesc: 'Majority + control. Your sponsor reward is embedded here.',
  operatingPartnerOwn: 'Operating Partner',
  operatingPartnerDesc: 'Earned through operational excellence and vesting. Plus selecting mx capital partner.',
  capitalPartnerOwn: 'Capital Partner',
  capitalPartnerDesc: 'Equity payback premium or token carried interest. (Preference: move to line of credit with capital partner)',
  sponsorEconomics: 'Sponsor economics: with a 65% majority, your sponsor promote is already baked into the equity. Layering a separate carried-interest promote on top of majority equity is a double-dip. Take it embedded here, or drop your equity and add an explicit promote — one or the other, not both.',

  powerWithoutLiability: 'Power without the liability',
  powerWithoutLiabilityLead: 'You sit upstream and decide; the operating partner sits at the company and carries the exposure.',
  youSemi: 'Roy Partner',
  holdsThePower: 'Holds the power',
  managerTitle: 'Manager of the HoldCo',
  managerHoldco: 'Manager of the HoldCo — the single decision seat upstream.',
  reservedMattersTitle: 'Reserved matters',
  reservedMatters: 'Reserved matters — veto over budget, debt, sale, expansion.',
  boardSeatTitle: 'Board seat',
  boardSeat: 'Board seat at the holding company.',
  insulatedLiability: 'Insulated from operating liability by the corporate veil.',
  operatingPartnerCVL: 'Operating Partner',
  carriesTheRisk: 'Carries the risk',
  chiefOperatingOfficerTitle: 'Chief Operating Officer / Operating Partner',
  chiefOperatingOfficer: 'Chief Operating Officer / Operating Partner — the legal principal on the ground.',
  personallyHook: 'Personally on the hook for operational, regulatory, and labor obligations.',
  signsLeases: 'Signs the leases, contracts, and permits.',
  equityReal: 'This is why their equity is real — they\'re taking real exposure, not just a paycheck.',

  language: 'Language',
  currency: 'Currency',
  english: 'English',
  spanish: 'Español',
  years: 'years',
  percent: '%',

  you: 'SEMI Tx LLC',
  operatingPartner: 'Operating Partner',
  capitalPartner: 'Capital Partner',
  principle: 'Principle',

  texasLLC: 'Texas · LLC',
  mexicoSACV: 'Mexico · SA de CV',

  footerMono: 'SEMI UNIFIED CAPITAL ENGINE · capital structure · illustrative discussion draft',
  footerDisclaimer: 'All figures are structural and illustrative — proportions and mechanics, not a committed cap table or a promise of returns. The model is flexible to any raise size, any rate, any horizon. Not legal, tax, or investment advice — final structure requires counsel, tax review, and partner agreement before anything is committed.',

  capitalLabel: 'Capital',
  prefBarLabel: 'Pref',
  capStackDefault: 'Capital Partner provides $500k secured LOC (backed by 20% LP equity). Roy closes the gap with remaining capital, split 50% LP / 50% GP. The 50% GP contribution funds the General Partner.',
  equityReleaseDefault: 'When the Capital Partner\'s $500k loan is fully repaid with interest, the released LP equity that secured the debt converts to GP equity and distributes 50-50 to Matt Roy and Edgar Delgado as GP members.',
};

const ES: i18nStrings = {
  title: 'Motor de Modelado de Capital',
  subtitle: 'Un modelo maestro para estructura de entidades, división de capital, retornos de inversores y diseño de instrumentos.',
  description: 'Mueve un control deslizante en cualquier lugar y todo se recalcula.',
  tag: 'Ilustrativo · borrador de discusión',
  basis: 'TODOS LOS CONTROLES COMPARTEN UN ESTADO · LAS CIFRAS SON ESTRUCTURALES, NO COMPROMETIDAS · LOS ESCENARIOS SON COMPARTIBLES VÍA URL',

  entityStructure: 'La estructura de tres entidades',
  entityStructureLead: 'Licencia de IP en Texas · Fondeo de capital en México · Operaciones en México. Propiedad y control separados de responsabilidad operativa.',
  principleLabel: 'Principio',
  principleDesc1: 'Licencia de IP de Marca y Sistemas',
  principleDesc2: 'Dueña del nombre, playbook, recetas, tech',
  principleDesc3: 'Licencia a HoldCo',
  principleDesc4: 'Aislada del riesgo operativo',
  holdcoLabel: 'HoldCo',
  holdcoDesc1: 'Gerente: Tú (asuntos reservados + junta)',
  holdcoDesc2: 'Fondeo de capital y distribuciones',
  holdcoDesc3: 'Cap table, dueña de OpCo ~99.99%',
  holdcoDesc4: 'Recibe licencia de IP de Principio',
  opcLabel: 'OpCo',
  opcDesc1: 'Socio Operativo',
  opcDesc2: 'Operaciones de restaurante',
  opcDesc3: 'Personal, permisos, arriendos, proveedores',
  opcDesc4: 'Responsabilidad fiscal, laboral y regulatoria',

  capitalFlow: 'Flujo de capital: dos estructuras de retorno',
  capitalFlowLead: 'Dos estructuras de capital con diferentes cascadas de distribución. Elige Ruta A (inversión de capital del 10%) o Ruta B (LOC del 20% con conversión de capital).',
  pathATitle: 'Ruta A: Inversión de Capital (10% Pref + 66% Promote a Operadores)',
  pathACapFlow: 'Flujo de Capital: Matt y el Socio de Capital invierten capital a través de HoldCo. Capital retorna pro-rata, luego retorno preferente del 10% (limitado a 1.75x). Upside restante: 66% a operadores (GP), 34% dividido pro-rata a inversores de capital.',
  pathADistrWF: 'Cascada de Distribución: Retorno de Capital → Retorno Preferente → Split de Promote → Distribuciones Finales. El Socio de Capital retiene capital pero a participación reducida debido a 66% promote a operadores (Edgar obtiene 100% de capital de operador).',
  pathBTitle: 'Ruta B: Línea de Crédito (20% Interés → Conversión de Capital)',
  pathBDesc: 'El Socio de Capital proporciona $400-500k LOC @ 20% de interés. Después del retorno de capital y pagos de interés, la seguridad de capital LP que respalda el préstamo se convierte en capital GP, dividido 50-50 entre Matt Roy y Edgar Delgado.',
  pathBDiagramTBA: 'Diagrama interactivo próximamente.',

  scenarioConfig: 'Configuración de escenarios',
  scenarioConfigLead: 'Configura fondeo de capital, retornos y horizonte. Calcula escenarios Ruta A vs Ruta B para ver cómo difieren los economics del socio de capital.',
  dealName: 'Nombre del Trato',
  dealNamePlaceholder: 'p.ej., Dinosaur Pizza',
  capitalPartnerName: 'Nombre del Socio de Capital',
  capitalPartnerNamePlaceholder: 'p.ej., Fortress Capital',
  totalCapital: 'Recaudación de Capital Total ($M)',
  capitalPartnerShare: 'Participación del Socio de Capital',
  preferredReturn: 'Retorno Preferente (%/año)',
  investmentHorizon: 'Horizonte de Inversión (Años)',
  hardCapMultiple: 'Múltiplo de Tope Duro',
  exitMultiple: 'Múltiplo de Salida (Valor del Negocio)',
  calculateReturns: 'Calcular Retornos',
  exportJSON: 'Exportar JSON',
  saveToAirtable: 'Guardar en Airtable',

  pathAvsB: 'Ruta A vs Ruta B',
  pathAvsBLead: 'Escenarios de retorno del socio de capital: protección total de retorno sin capital, o retorno moderado con upside de capital significativo.',
  pathALabel: 'Ruta A: Retorno 20% + Salida Completa',
  pathAReturnProtected: 'Protección de Retorno',
  pathBLabel: 'Ruta B: Retorno 8% + Participación de Capital',
  capitalReturned: 'Capital Retornado',
  preferredReturnLabel: 'Retorno Preferente',
  totalReturn: 'Retorno Total',
  multiple: 'Múltiplo',
  residualEquity: 'Capital Residual',
  pathBGrowthUpside: 'Crecimiento + Upside',
  capitalPartnerEquity: 'Capital del Socio de Capital',
  totalReturnAtExit: 'Retorno Total (en salida)',
  upsidePotential: 'Potencial de Upside',
  plusEquityGrowth: 'Más crecimiento de capital',
  youNoteText: 'capital + pref + 65% del split',
  operatingPartnerNoteText: '15% del split — puro upside de capital',
  capitalPartnerNoteText: 'capital + pref + 20% del split',

  capitalSplit: 'De quién es el dinero en el trato',
  capitalSplitLead: 'El Socio de Capital asegura una línea de crédito (respaldada por capital LP). Roy aporta el capital restante, dividido 50/50 entre LP y GP.',
  totalCapitalRaise: 'Recaudación de Capital Total',
  creditLineAmount: 'Monto de Línea de Crédito (LOC asegurada)',
  capitalPartnerLOC: 'LOC del Socio de Capital',
  royContribution: 'Aporte de Roy',
  totalDealSize: 'Tamaño Total del Trato',
  capStackLabel: 'Apilamiento de Capital:',
  capStackReadoutDefault: 'El Socio de Capital proporciona $500k LOC asegurada (respaldada por 20% de capital LP). Roy cierra la brecha con capital restante, dividido 50% LP / 50% GP. El aporte de 50% GP financia al Socio General.',
  fourGP: '50% LP / 50% GP',
  capPartnerLOC: 'Seguridad de capital LP del 20%',
  fundedBy: '100% capitalizado',

  semiStack: 'Lo que SEMI gana de inmediato',
  semiStackLead: 'Estos se pagan del ingreso, antes de que se divida cualquier ganancia — tus economics senior, bajo riesgo fluyendo sin importar si la tienda distribuye un dólar.',
  brandRoyalty: 'Royalty de marca',
  brandRoyaltyDesc: 'Licencia del nombre Dinosaur Pizza y sistema de marca.',
  operatingSystemLicense: 'Licencia de sistema operativo',
  operatingSystemLicenseDesc: 'El playbook, recetas, tech y sistemas que construyes y mantienes.',
  marketingFund: 'Fondo de marketing',
  marketingFundDesc: 'Administrado por SEMI; controlas el gasto y la marca.',
  revenueShare: '10% de ingreso → SEMI, de inmediato.',
  salesExample: 'Regla de oro: en cada $1,000,000 de ventas, eso es ~$100,000/año a SEMI antes de que se calcule la ganancia.',
  devFeeLabel: 'Más una tarifa de desarrollo única',
  devFeeNote: 'Tarifa de SEMI por diseñar y construir la operación, pagada al lanzamiento (precio de mercado). No se muestra en distribuciones anuales abajo.',

  profitDistribution: 'Cómo se distribuyen las ganancias',
  profitDistributionLead: 'Dos estructuras de capital: Inversión de Capital (10% pref + 66% promote a operadores) vs Línea de Crédito (20% interés, luego capital se convierte a GP). Mueve el control para ver cómo cambian las distribuciones.',
  distributableCash: 'Efectivo Distribuible hasta la Fecha',
  returnOfCapital: 'Retorno de capital',
  returnOfCapitalDesc: 'todo capital retorna primero, pro-rata',
  prefLabel: 'Retorno preferente',
  prefDesc: '% dinámico, limitado a 1.75×',
  splitByEquity: 'Dividido por capital',
  splitDesc: '65 / 15 / 20',
  nothingYet: 'Nada distribuido aún.',
  capitalBackProtected: 'Todos todavía están obteniendo su capital de vuelta — nadie ha ganado dinero aún. La desventaja del socio está protegida primero.',
  capitalReturned2: 'El capital retornó; ahora se paga el retorno preferente (limitado a 1.75× durante el horizonte de inversión). Aún sin división de capital hasta que se satisfaga pref.',
  capitalReturnedProtected: 'Capital y pref cubiertos. Todo lo anterior es ganancia real, dividida 65/15/20. Tu socio operativo es puro upside de capital — no invirtieron dinero en efectivo, así que 100% de su retorno depende de excelencia operativa. Esa es la alineación.',
  prefPayingCapPercent: 'Retorno preferente pagándose como % del capital',
  capAndPrefCovered: 'Capital y retorno preferente están cubiertos',

  capitalPartnerReturns: 'Comparación de retornos del socio de capital',
  capitalPartnerReturnsLead: 'Compara dos estructuras: línea de crédito asegurada (20% ROI) vs. inversión de capital directo (10% pref + participación de capital).',
  pathASecuredLOC: 'Ruta A: Línea de Crédito Asegurada',
  pathA20ROI: '20% ROI + Seguridad',
  locAmount: 'Monto LOC',
  lpEquitySecurity: 'Seguridad de Capital LP',
  annual20Interest: 'Interés Anual 20%',
  totalInterest: 'Interés Total',
  pathBDirectInvest: 'Ruta B: Inversión Directa',
  pathB10Pref: '10% Pref + Capital',
  investmentAmount: 'Monto de Inversión',
  lpEquityStake: 'Participación de Capital LP',
  annual10Pref: 'Pref Anual 10%',
  totalPref: 'Pref Total',
  equityUpsideValue: 'Valor de Upside de Capital',

  equityRelease: 'Liberación de capital al pago de deuda',
  equityReleaseLead: 'Cuando la LOC del Socio de Capital + 20% de interés se paguen completamente, la seguridad de capital LP que respalda el préstamo se convierte en capital GP y se divide 50-50 entre Matt Roy y Edgar Delgado.',
  prePaybackState: 'ESTADO PRE-PAGO',
  mattGPStake: 'Matt Roy (participación GP)',
  baseGPContrib: 'Aporte base de GP',
  edgarGPStake: 'Edgar (Socio Operativo)',
  earnedOps: 'Ganado a través de operaciones',
  postPaybackState: 'POST-PAGO (Deuda + Interés Pagado)',
  debtRepaid: 'Deuda pagada • Seguridad de capital LP liberada',
  mattGPIncreased: 'Matt Roy (participación GP aumentada)',
  edgarGPIncreased: 'Edgar (participación GP aumentada)',
  conversionMechanics: 'La Mecánica de Conversión:',
  conversionMechanicsDefault: 'Cuando el préstamo de $500k del Socio de Capital se pague completamente con interés, el capital LP liberado que respaldó la deuda se convierte en capital GP y se distribuye 50-50 a Matt Roy y Edgar Delgado como miembros de GP.',

  ownership: 'Quién es dueño de la empresa',
  ownershipLead: 'Propiedad de capital de la HoldCo — el valor residual después de que se paguen capital y pref.',
  fullyVested: 'Completamente adquirido',
  royPartner: 'Socio Roy',
  royPartnerDesc: 'Mayoría + control. Tu recompensa de patrocinador está incorporada aquí.',
  operatingPartnerOwn: 'Socio Operativo',
  operatingPartnerDesc: 'Ganado a través de excelencia operativa y adquisición. Más seleccionar socio de capital mx.',
  capitalPartnerOwn: 'Socio de Capital',
  capitalPartnerDesc: 'Prima de reembolso de capital o interés de acarreo simbólico. (Preferencia: pasar a línea de crédito con socio de capital)',
  sponsorEconomics: 'Economics de patrocinador: con una mayoría del 65%, tu promote de patrocinador ya está incorporado en el capital. Superponer un promote de interés de acarreo separado sobre capital de mayoría es doble inmersión. Tómalo incorporado aquí, o reduce tu capital y agrega un promote explícito — uno u otro, no ambos.',

  powerWithoutLiability: 'Poder sin responsabilidad',
  powerWithoutLiabilityLead: 'Te sientas en sentido ascendente y decides; el socio operativo se sienta en la empresa y lleva la exposición.',
  youSemi: 'Roy Partner',
  holdsThePower: 'Sostiene el poder',
  managerTitle: 'Gerente de la HoldCo',
  managerHoldco: 'Gerente de la HoldCo — el único asiento de decisión en sentido ascendente.',
  reservedMattersTitle: 'Asuntos reservados',
  reservedMatters: 'Asuntos reservados — veto sobre presupuesto, deuda, venta, expansión.',
  boardSeatTitle: 'Asiento de junta',
  boardSeat: 'Asiento de junta en la empresa tenedora.',
  insulatedLiability: 'Aislado de responsabilidad operativa por el velo corporativo.',
  operatingPartnerCVL: 'Socio Operativo',
  carriesTheRisk: 'Lleva el riesgo',
  chiefOperatingOfficerTitle: 'Director Operativo / Socio Operativo',
  chiefOperatingOfficer: 'Director Operativo / Socio Operativo — el principal legal en el terreno.',
  personallyHook: 'Personalmente en la línea por obligaciones operacionales, regulatorias y laborales.',
  signsLeases: 'Firma los arriendos, contratos y permisos.',
  equityReal: 'Por eso su capital es real — están tomando exposición real, no solo un cheque de pago.',

  language: 'Idioma',
  currency: 'Moneda',
  english: 'English',
  spanish: 'Español',
  years: 'años',
  percent: '%',

  you: 'SEMI Tx LLC',
  operatingPartner: 'Socio Operativo',
  capitalPartner: 'Socio de Capital',
  principle: 'Principio',

  texasLLC: 'Texas · LLC',
  mexicoSACV: 'México · SA de CV',

  footerMono: 'SEMI MOTOR DE CAPITAL UNIFICADO · estructura de capital · borrador de discusión ilustrativo',
  footerDisclaimer: 'Todas las cifras son estructurales e ilustrativas — proporciones y mecánicas, no una cap table comprometida o una promesa de retornos. El modelo es flexible para cualquier tamaño de recaudación, cualquier tasa, cualquier horizonte. No es asesoramiento legal, fiscal o de inversión — la estructura final requiere asesoramiento legal, revisión fiscal y acuerdo de socio antes de que se comprometa nada.',

  capitalLabel: 'Capital',
  prefBarLabel: 'Pref',
  capStackDefault: 'El Socio de Capital proporciona $500k LOC asegurada (respaldada por 20% de capital LP). Roy cierra la brecha con capital restante, dividido 50% LP / 50% GP. El aporte de 50% GP financia al Socio General.',
  equityReleaseDefault: 'Cuando el préstamo de $500k del Socio de Capital se pague completamente con interés, el capital LP liberado que respaldó la deuda se convierte en capital GP y se distribuye 50-50 a Matt Roy y Edgar Delgado como miembros de GP.',
};

export function getStrings(language: Language): i18nStrings {
  return language === 'es' ? ES : EN;
}

export function getClaudeSystemPromptLanguage(language: Language): string {
  if (language === 'es') {
    return `Eres un asesor experto en estructura de capital especializado en la inversión de Dinosaur Pizza en la Ciudad de México (CDMX). Tienes un conocimiento profundo de:

- Apilamiento de capital y mecánica de transacciones
- La estructura operativa de Dinosaur Pizza y economía unitaria
- Relaciones entre entidades HoldCo / OpCo / Principle
- Retornos preferentes, estructuras de promoción y distribuciones de capital
- Ruta A (inversión de capital con 10% pref + 66% promoción) vs Ruta B (LOC con 20% interés convertible a capital)
- Cómo fluye el capital a través de la estructura desde fuentes → HoldCo → OpCo → distribuciones a inversores
- Asignación de riesgo entre inversores y operadores
- Cómo diferentes montos de capital, tasas y horizontes afectan distribuciones finales

El usuario está explorando diferentes escenarios de capital. Ayúdalo a entender:
1. Cómo funciona cada componente de la estructura
2. Por qué ciertos mecanismos están en su lugar (ej., por qué la promoción del 66% incentiva a Edgar)
3. Qué sucede cuando ajustan parámetros (montos de capital, tasas preferentes, horizonte, múltiplos de salida)
4. Implicaciones de Ruta A vs Ruta B para diferentes perfiles de inversor

Sé preciso sobre números y estructuras. Referencia el escenario específico cuando sea útil. Haz preguntas aclaratorias para asegurar que entienden el cuadro completo.`;
  }

  return `You are an expert capital structure advisor specializing in the Dinosaur Pizza investment in Mexico City (CDMX). You have deep knowledge of:

- Capital stacking and deal mechanics
- The Dinosaur Pizza operational structure and unit economics
- HoldCo / OpCo / Principle entity relationships
- Preferred returns, promote structures, and equity distributions
- Path A (equity investment with 10% pref + 66% promote) vs Path B (LOC with 20% interest converting to equity)
- How capital flows through the structure from sources → HoldCo → OpCo → distributions back to investors
- Risk allocation between investors and operators
- How different capital amounts, rates, and time horizons affect final distributions

The user is exploring different capital scenarios. Help them understand:
1. How each component of the structure works
2. Why certain mechanics are in place (e.g., why the 66% promote incentivizes Edgar)
3. What happens when they adjust parameters (capital amounts, preferred rates, horizon, exit multiples)
4. Implications of Path A vs Path B for different investor profiles

Be precise about numbers and structures. Reference the specific scenario when helpful. Ask clarifying questions to ensure they understand the full picture.`;
}
