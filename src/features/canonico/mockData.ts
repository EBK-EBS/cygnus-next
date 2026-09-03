import type {
  Tenant,
  BusinessPerson,
  ProductType,
  BusinessProduct,
  ProductHolder,
  TransactionType,
  Voucher,
  VoucherLine,
  Transaction,
  TransactionEntry,
  Balance,
} from './types'

// ── Tenants ──────────────────────────────────────────────────────────────

export const TENANTS: Tenant[] = [
  { id: 1, codigo: 'CACSA', nombre: 'Cooperativa CACSA', estado: 'ACTIVO' },
  { id: 2, codigo: 'COOPEAGRO', nombre: 'Cooperativa COOPEAGRO', estado: 'ACTIVO' },
  { id: 3, codigo: 'FINCOOP', nombre: 'Financiera COOP', estado: 'ACTIVO' },
]

// ── Personas de Negocio ──────────────────────────────────────────────────

export const BUSINESS_PERSONS: BusinessPerson[] = [
  {
    id: 1, tenantId: 1, sourceSystem: 'CACSA', sourcePersonCode: 'ASOC-001',
    identificationNumber: '1130682153', personType: 'NATURAL',
    legalName: 'Hanner Alberto Velez Macias', tradeName: 'Hanner Velez',
    email: 'hanner.velez@email.com', phone: '3104567890',
    address: 'Calle 45 # 12-34, Bogotá', status: 'ACTIVO',
    createdAt: '2022-04-28T10:00:00Z', updatedAt: '2024-01-15T08:30:00Z',
  },
  {
    id: 2, tenantId: 1, sourceSystem: 'CACSA', sourcePersonCode: 'ASOC-002',
    identificationNumber: '5234567890', personType: 'NATURAL',
    legalName: 'Maria Elena Rodriguez Perez', tradeName: 'Maria Rodriguez',
    email: 'maria.rodriguez@email.com', phone: '3209876543',
    address: 'Carrera 65 # 32-11, Medellín', status: 'ACTIVO',
    createdAt: '2020-10-15T09:00:00Z', updatedAt: '2024-02-20T14:15:00Z',
  },
  {
    id: 3, tenantId: 1, sourceSystem: 'CACSA', sourcePersonCode: 'ASOC-003',
    identificationNumber: '1012345678', personType: 'NATURAL',
    legalName: 'Carlos Andres Gomez Sanchez', tradeName: 'Carlos Gomez',
    email: 'carlos.gomez@email.com', phone: '3156789012',
    address: 'Avenida 4N # 8-90, Cali', status: 'ACTIVO',
    createdAt: '2021-03-20T11:00:00Z', updatedAt: '2024-03-10T16:45:00Z',
  },
  {
    id: 4, tenantId: 1, sourceSystem: 'CACSA', sourcePersonCode: 'ASOC-004',
    identificationNumber: '900123456', personType: 'JURIDICA',
    legalName: 'Constructora ABC S.A.S.', tradeName: 'Constructora ABC',
    email: 'contacto@constructoraabc.com', phone: '6012345678',
    address: 'Carrera 7 # 40-20, Bogotá', status: 'ACTIVO',
    createdAt: '2019-06-10T08:00:00Z', updatedAt: '2024-01-20T12:00:00Z',
  },
  {
    id: 5, tenantId: 2, sourceSystem: 'COOPEAGRO', sourcePersonCode: 'AG-001',
    identificationNumber: '890123456', personType: 'JURIDICA',
    legalName: 'Agroindustrias del Valle Ltda.', tradeName: 'AgroValle',
    email: 'info@agrovalle.com', phone: '6023456789',
    address: 'Vereda El Trapiche, Palmira', status: 'ACTIVO',
    createdAt: '2021-08-01T07:30:00Z', updatedAt: '2024-04-05T10:20:00Z',
  },
  {
    id: 6, tenantId: 1, sourceSystem: 'CACSA', sourcePersonCode: 'ASOC-005',
    identificationNumber: '1056781234', personType: 'NATURAL',
    legalName: 'Laura Cristina Ortiz Gomez', tradeName: 'Laura Ortiz',
    email: 'laura.ortiz@email.com', phone: '3001234567',
    address: 'Carrera 14 # 90-21, Bogotá', status: 'ACTIVO',
    createdAt: '2019-01-12T10:00:00Z', updatedAt: '2024-02-28T09:10:00Z',
  },
  {
    id: 7, tenantId: 1, sourceSystem: 'CACSA', sourcePersonCode: 'ASOC-006',
    identificationNumber: '1122334455', personType: 'NATURAL',
    legalName: 'David Felipe Silva Rios', tradeName: 'David Silva',
    email: 'david.silva@email.com', phone: '3119876543',
    address: 'Calle 10 # 20-30, Bucaramanga', status: 'INACTIVO',
    createdAt: '2023-11-05T14:00:00Z', updatedAt: '2024-05-01T11:30:00Z',
  },
  {
    id: 8, tenantId: 2, sourceSystem: 'COOPEAGRO', sourcePersonCode: 'AG-002',
    identificationNumber: '7123456789', personType: 'NATURAL',
    legalName: 'Pedro Nel Jimenez Franco', tradeName: 'Pedro Jimenez',
    email: 'pedro.jimenez@email.com', phone: '3187766554',
    address: 'Km 5 Vía al Mar, Buenaventura', status: 'ACTIVO',
    createdAt: '2020-05-20T08:00:00Z', updatedAt: '2024-03-15T15:00:00Z',
  },
]

// ── Tipos de Producto ────────────────────────────────────────────────────

export const PRODUCT_TYPES: ProductType[] = [
  { id: 1, tenantId: 1, family: 'AHORRO', code: 'AHV', name: 'Ahorro a la Vista', sourceTypeCode: 'TIPO_AHORRO', sourceLineCode: 'LINEA_AHORRO', active: true },
  { id: 2, tenantId: 1, family: 'AHORRO', code: 'CDT', name: 'Certificado de Depósito a Término', sourceTypeCode: 'TIPO_CDT', sourceLineCode: 'LINEA_CDT', active: true },
  { id: 3, tenantId: 1, family: 'CRÉDITO', code: 'CR_LIBRE', name: 'Crédito Libre Inversión', sourceTypeCode: 'TIPO_CRED_LIBRE', sourceLineCode: 'LINEA_CREDITO', active: true },
  { id: 4, tenantId: 1, family: 'CRÉDITO', code: 'CR_VIVIENDA', name: 'Crédito de Vivienda', sourceTypeCode: 'TIPO_CRED_VIV', sourceLineCode: 'LINEA_CREDITO', active: true },
  { id: 5, tenantId: 1, family: 'APORTE', code: 'AP_SOCIAL', name: 'Aporte Social', sourceTypeCode: 'TIPO_APORTE', sourceLineCode: 'LINEA_APORTE', active: true },
  { id: 6, tenantId: 2, family: 'AHORRO', code: 'AHV', name: 'Ahorro a la Vista', sourceTypeCode: 'TIPO_AHORRO', sourceLineCode: 'LINEA_AHORRO', active: true },
  { id: 7, tenantId: 2, family: 'CRÉDITO', code: 'CR_AGRO', name: 'Crédito Agropecuario', sourceTypeCode: 'TIPO_CRED_AGRO', sourceLineCode: 'LINEA_CREDITO', active: true },
]

// ── Productos de Negocio ─────────────────────────────────────────────────

export const BUSINESS_PRODUCTS: BusinessProduct[] = [
  { id: 1, tenantId: 1, productTypeId: 1, primaryPersonId: 1, productNumber: 'AHV-10001', sourceProductId: 'SRC-001', openDate: '2022-04-28', closeDate: null, currencyCode: 'COP', status: 'ABIERTO' },
  { id: 2, tenantId: 1, productTypeId: 3, primaryPersonId: 1, productNumber: 'CRED-20001', sourceProductId: 'SRC-002', openDate: '2023-01-15', closeDate: null, currencyCode: 'COP', status: 'ABIERTO' },
  { id: 3, tenantId: 1, productTypeId: 1, primaryPersonId: 2, productNumber: 'AHV-10002', sourceProductId: 'SRC-003', openDate: '2020-10-15', closeDate: null, currencyCode: 'COP', status: 'ABIERTO' },
  { id: 4, tenantId: 1, productTypeId: 2, primaryPersonId: 2, productNumber: 'CDT-30001', sourceProductId: 'SRC-004', openDate: '2024-01-10', closeDate: '2024-07-10', currencyCode: 'COP', status: 'CERRADO' },
  { id: 5, tenantId: 1, productTypeId: 5, primaryPersonId: 3, productNumber: 'APS-40001', sourceProductId: 'SRC-005', openDate: '2021-03-20', closeDate: null, currencyCode: 'COP', status: 'ABIERTO' },
  { id: 6, tenantId: 1, productTypeId: 4, primaryPersonId: 4, productNumber: 'VIV-50001', sourceProductId: 'SRC-006', openDate: '2022-06-01', closeDate: null, currencyCode: 'COP', status: 'ABIERTO' },
  { id: 7, tenantId: 2, productTypeId: 6, primaryPersonId: 5, productNumber: 'AHV-10001', sourceProductId: 'AG-SRC-001', openDate: '2021-08-01', closeDate: null, currencyCode: 'COP', status: 'ABIERTO' },
  { id: 8, tenantId: 2, productTypeId: 7, primaryPersonId: 5, productNumber: 'AGRO-20001', sourceProductId: 'AG-SRC-002', openDate: '2023-03-15', closeDate: null, currencyCode: 'COP', status: 'ABIERTO' },
  { id: 9, tenantId: 1, productTypeId: 1, primaryPersonId: 6, productNumber: 'AHV-10003', sourceProductId: 'SRC-007', openDate: '2019-01-12', closeDate: null, currencyCode: 'COP', status: 'ABIERTO' },
  { id: 10, tenantId: 1, productTypeId: 3, primaryPersonId: 6, productNumber: 'CRED-20002', sourceProductId: 'SRC-008', openDate: '2023-06-20', closeDate: null, currencyCode: 'COP', status: 'ABIERTO' },
]

// ── Titulares de Producto ────────────────────────────────────────────────

export const PRODUCT_HOLDERS: ProductHolder[] = [
  { id: 1, tenantId: 1, productId: 1, personId: 1, holderRole: 'TITULAR', startDate: '2022-04-28', endDate: null, isPrimary: true },
  { id: 2, tenantId: 1, productId: 2, personId: 1, holderRole: 'TITULAR', startDate: '2023-01-15', endDate: null, isPrimary: true },
  { id: 3, tenantId: 1, productId: 3, personId: 2, holderRole: 'TITULAR', startDate: '2020-10-15', endDate: null, isPrimary: true },
  { id: 4, tenantId: 1, productId: 4, personId: 2, holderRole: 'TITULAR', startDate: '2024-01-10', endDate: '2024-07-10', isPrimary: true },
  { id: 5, tenantId: 1, productId: 5, personId: 3, holderRole: 'TITULAR', startDate: '2021-03-20', endDate: null, isPrimary: true },
  { id: 6, tenantId: 1, productId: 6, personId: 4, holderRole: 'TITULAR', startDate: '2022-06-01', endDate: null, isPrimary: true },
  { id: 7, tenantId: 1, productId: 2, personId: 6, holderRole: 'CO_TITULAR', startDate: '2023-02-01', endDate: null, isPrimary: false },
  { id: 8, tenantId: 2, productId: 7, personId: 5, holderRole: 'TITULAR', startDate: '2021-08-01', endDate: null, isPrimary: true },
  { id: 9, tenantId: 2, productId: 8, personId: 5, holderRole: 'TITULAR', startDate: '2023-03-15', endDate: null, isPrimary: true },
  { id: 10, tenantId: 1, productId: 9, personId: 6, holderRole: 'TITULAR', startDate: '2019-01-12', endDate: null, isPrimary: true },
]

// ── Tipos de Transacción ────────────────────────────────────────────────

export const TRANSACTION_TYPES: TransactionType[] = [
  { id: 1, tenantId: 1, sourceTransactionTypeCode: 'DEP-EFEC', code: 'DEP_EFECTIVO', name: 'Depósito en Efectivo', movementNature: 'CREDITO', active: true },
  { id: 2, tenantId: 1, sourceTransactionTypeCode: 'RET-EFEC', code: 'RET_EFECTIVO', name: 'Retiro en Efectivo', movementNature: 'DEBITO', active: true },
  { id: 3, tenantId: 1, sourceTransactionTypeCode: 'TRF-INT', code: 'TRF_INTERNA', name: 'Transferencia Interna', movementNature: 'DEBITO', active: true },
  { id: 4, tenantId: 1, sourceTransactionTypeCode: 'PAG-CRED', code: 'PAGO_CREDITO', name: 'Pago de Crédito', movementNature: 'CREDITO', active: true },
  { id: 5, tenantId: 1, sourceTransactionTypeCode: 'DES-CRED', code: 'DESEMBOLSO', name: 'Desembolso de Crédito', movementNature: 'DEBITO', active: true },
  { id: 6, tenantId: 1, sourceTransactionTypeCode: 'REV-GEN', code: 'REVERSION', name: 'Reversión Genérica', movementNature: 'CREDITO', active: true },
  { id: 7, tenantId: 2, sourceTransactionTypeCode: 'DEP-EFEC', code: 'DEP_EFECTIVO', name: 'Depósito en Efectivo', movementNature: 'CREDITO', active: true },
  { id: 8, tenantId: 2, sourceTransactionTypeCode: 'RET-EFEC', code: 'RET_EFECTIVO', name: 'Retiro en Efectivo', movementNature: 'DEBITO', active: true },
]

// ── Comprobantes ─────────────────────────────────────────────────────────

export const VOUCHERS: Voucher[] = [
  { id: 1, tenantId: 1, voucherType: 'INGRESO', voucherNumber: 'V-2024-0001', sourceVoucherId: 'SRC-V001', voucherDate: '2024-06-01', status: 'CONTABILIZADO', createdAt: '2024-06-01T08:00:00Z' },
  { id: 2, tenantId: 1, voucherType: 'EGRESO', voucherNumber: 'V-2024-0002', sourceVoucherId: 'SRC-V002', voucherDate: '2024-06-01', status: 'CONTABILIZADO', createdAt: '2024-06-01T09:30:00Z' },
  { id: 3, tenantId: 1, voucherType: 'TRASPASO', voucherNumber: 'V-2024-0003', sourceVoucherId: 'SRC-V003', voucherDate: '2024-06-02', status: 'APROBADO', createdAt: '2024-06-02T10:00:00Z' },
  { id: 4, tenantId: 1, voucherType: 'INGRESO', voucherNumber: 'V-2024-0004', sourceVoucherId: 'SRC-V004', voucherDate: '2024-06-03', status: 'BORRADOR', createdAt: '2024-06-03T11:00:00Z' },
  { id: 5, tenantId: 1, voucherType: 'AJUSTE', voucherNumber: 'V-2024-0005', sourceVoucherId: 'SRC-V005', voucherDate: '2024-06-03', status: 'ANULADO', createdAt: '2024-06-03T14:00:00Z' },
  { id: 6, tenantId: 2, voucherType: 'INGRESO', voucherNumber: 'V-2024-0001', sourceVoucherId: 'AG-V001', voucherDate: '2024-06-01', status: 'CONTABILIZADO', createdAt: '2024-06-01T08:00:00Z' },
]

// ── Líneas de Comprobante ────────────────────────────────────────────────

export const VOUCHER_LINES: VoucherLine[] = [
  // Voucher 1 (Ingreso - Depósito)
  { id: 1, tenantId: 1, voucherId: 1, lineNumber: 1, accountCode: '1110-01', debitAmount: 0, creditAmount: 5000000, description: 'Depósito en efectivo - Ahorro Vista' },
  { id: 2, tenantId: 1, voucherId: 1, lineNumber: 2, accountCode: '1105-01', debitAmount: 5000000, creditAmount: 0, description: 'Caja General' },
  // Voucher 2 (Egreso - Retiro)
  { id: 3, tenantId: 1, voucherId: 2, lineNumber: 1, accountCode: '1110-01', debitAmount: 2000000, creditAmount: 0, description: 'Retiro en efectivo' },
  { id: 4, tenantId: 1, voucherId: 2, lineNumber: 2, accountCode: '1105-01', debitAmount: 0, creditAmount: 2000000, description: 'Caja General' },
  // Voucher 3 (Traspaso)
  { id: 5, tenantId: 1, voucherId: 3, lineNumber: 1, accountCode: '1110-01', debitAmount: 3000000, creditAmount: 0, description: 'Traspaso entre cuentas de ahorro' },
  { id: 6, tenantId: 1, voucherId: 3, lineNumber: 2, accountCode: '1110-02', debitAmount: 0, creditAmount: 3000000, description: 'Traspaso entre cuentas de ahorro' },
  // Voucher 4 (Borrador - incompleto)
  { id: 7, tenantId: 1, voucherId: 4, lineNumber: 1, accountCode: '1110-01', debitAmount: 1000000, creditAmount: 0, description: 'Pago de crédito - pendiente línea contrapartida' },
]

// ── Transacciones ────────────────────────────────────────────────────────

export const TRANSACTIONS: Transaction[] = [
  { id: 1, tenantId: 1, voucherId: 1, operationNumber: 'OP-20240601-001', sourceOperationId: 'SRC-OP001', transactionDate: '2024-06-01T08:05:00Z', reversalOfTransactionId: null, status: 'COMPLETADA' },
  { id: 2, tenantId: 1, voucherId: 2, operationNumber: 'OP-20240601-002', sourceOperationId: 'SRC-OP002', transactionDate: '2024-06-01T09:35:00Z', reversalOfTransactionId: null, status: 'COMPLETADA' },
  { id: 3, tenantId: 1, voucherId: 3, operationNumber: 'OP-20240602-001', sourceOperationId: 'SRC-OP003', transactionDate: '2024-06-02T10:05:00Z', reversalOfTransactionId: null, status: 'COMPLETADA' },
  { id: 4, tenantId: 1, voucherId: 4, operationNumber: 'OP-20240603-001', sourceOperationId: 'SRC-OP004', transactionDate: '2024-06-03T11:05:00Z', reversalOfTransactionId: null, status: 'PENDIENTE' },
  { id: 5, tenantId: 1, voucherId: 1, operationNumber: 'OP-20240603-002', sourceOperationId: 'SRC-OP005', transactionDate: '2024-06-03T14:30:00Z', reversalOfTransactionId: 1, status: 'COMPLETADA' },
  { id: 6, tenantId: 1, voucherId: 5, operationNumber: 'OP-20240603-003', sourceOperationId: 'SRC-OP006', transactionDate: '2024-06-03T14:35:00Z', reversalOfTransactionId: null, status: 'ANULADA' },
  { id: 7, tenantId: 2, voucherId: 6, operationNumber: 'OP-20240601-001', sourceOperationId: 'AG-OP001', transactionDate: '2024-06-01T08:05:00Z', reversalOfTransactionId: null, status: 'COMPLETADA' },
]

// ── Movimientos de Transacción ───────────────────────────────────────────

export const TRANSACTION_ENTRIES: TransactionEntry[] = [
  { id: 1, tenantId: 1, transactionId: 1, transactionTypeId: 1, productId: 1, personId: 1, amount: 5000000, entryDate: '2024-06-01T08:05:00Z', sourceEntryId: 'SRC-ENT001' },
  { id: 2, tenantId: 1, transactionId: 2, transactionTypeId: 2, productId: 3, personId: 2, amount: 2000000, entryDate: '2024-06-01T09:35:00Z', sourceEntryId: 'SRC-ENT002' },
  { id: 3, tenantId: 1, transactionId: 3, transactionTypeId: 3, productId: 1, personId: 1, amount: 3000000, entryDate: '2024-06-02T10:05:00Z', sourceEntryId: 'SRC-ENT003' },
  { id: 4, tenantId: 1, transactionId: 4, transactionTypeId: 4, productId: 2, personId: 1, amount: 1500000, entryDate: '2024-06-03T11:05:00Z', sourceEntryId: 'SRC-ENT004' },
  { id: 5, tenantId: 1, transactionId: 5, transactionTypeId: 6, productId: 1, personId: 1, amount: 5000000, entryDate: '2024-06-03T14:30:00Z', sourceEntryId: 'SRC-ENT005' },
  { id: 6, tenantId: 1, transactionId: 7, transactionTypeId: 1, productId: 7, personId: 5, amount: 8000000, entryDate: '2024-06-01T08:05:00Z', sourceEntryId: 'AG-ENT001' },
]

// ── Saldos ───────────────────────────────────────────────────────────────

export const BALANCES: Balance[] = [
  { id: 1, tenantId: 1, productId: 1, balanceDate: '2024-06-30', balanceType: 'DISPONIBLE', amount: 12500000 },
  { id: 2, tenantId: 1, productId: 1, balanceDate: '2024-06-30', balanceType: 'CONTABLE', amount: 12500000 },
  { id: 3, tenantId: 1, productId: 2, balanceDate: '2024-06-30', balanceType: 'DISPONIBLE', amount: 0 },
  { id: 4, tenantId: 1, productId: 2, balanceDate: '2024-06-30', balanceType: 'CONTABLE', amount: 35000000 },
  { id: 5, tenantId: 1, productId: 3, balanceDate: '2024-06-30', balanceType: 'DISPONIBLE', amount: 8750000 },
  { id: 6, tenantId: 1, productId: 4, balanceDate: '2024-07-10', balanceType: 'DISPONIBLE', amount: 15000000 },
  { id: 7, tenantId: 1, productId: 5, balanceDate: '2024-06-30', balanceType: 'CONTABLE', amount: 3200000 },
  { id: 8, tenantId: 1, productId: 6, balanceDate: '2024-06-30', balanceType: 'CONTABLE', amount: 85000000 },
  { id: 9, tenantId: 2, productId: 7, balanceDate: '2024-06-30', balanceType: 'DISPONIBLE', amount: 25000000 },
  { id: 10, tenantId: 2, productId: 8, balanceDate: '2024-06-30', balanceType: 'CONTABLE', amount: 42000000 },
  { id: 11, tenantId: 1, productId: 9, balanceDate: '2024-06-30', balanceType: 'DISPONIBLE', amount: 6300000 },
  { id: 12, tenantId: 1, productId: 10, balanceDate: '2024-06-30', balanceType: 'CONTABLE', amount: 18500000 },
]
