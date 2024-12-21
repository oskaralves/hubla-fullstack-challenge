const formatCellphone = (value: string) => {
  const cleaned = value.replace(/\D/g, '');

  if (cleaned.length === 0) {
    return '';
  } else if (cleaned.length <= 2) {
    return `(${cleaned}`;
  } else if (cleaned.length <= 7) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
  } else {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`;
  }
};
const formatCpf = (value: string) => {
  const cleaned = value.replace(/\D/g, '');

  if (cleaned.length <= 3) {
    return cleaned;
  } else if (cleaned.length <= 6) {
    return `${cleaned.slice(0, 3)}.${cleaned.slice(3)}`;
  } else if (cleaned.length <= 9) {
    return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6)}`;
  } else {
    return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6, 9)}-${cleaned.slice(9, 11)}`;
  }
};

const formatCnpj = (value: string) => {
  const cleaned = value.replace(/\D/g, '');

  if (cleaned.length <= 2) {
    return cleaned;
  } else if (cleaned.length <= 5) {
    return `${cleaned.slice(0, 2)}.${cleaned.slice(2)}`;
  } else if (cleaned.length <= 8) {
    return `${cleaned.slice(0, 2)}.${cleaned.slice(2, 5)}.${cleaned.slice(5)}`;
  } else if (cleaned.length <= 12) {
    return `${cleaned.slice(0, 2)}.${cleaned.slice(2, 5)}.${cleaned.slice(5, 8)}/${cleaned.slice(8)}`;
  } else {
    return `${cleaned.slice(0, 2)}.${cleaned.slice(2, 5)}.${cleaned.slice(5, 8)}/${cleaned.slice(8, 12)}-${cleaned.slice(12, 14)}`;
  }
};
const formatZipcode = (value: string) => {
  const cleaned = value.replace(/\D/g, '');

  if (cleaned.length <= 5) {
    return cleaned;
  } else {
    return `${cleaned.slice(0, 5)}-${cleaned.slice(5, 8)}`;
  }
};

const formatMonthYear = (value: string) => {
  const cleaned = value.replace(/\D/g, '');

  if (cleaned.length === 0) {
    return '';
  } else if (cleaned.length <= 2) {
    return cleaned;
  } else {
    return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 6)}`;
  }
};

const formatRg = (value: string) => {
  const cleaned = value.replace(/\D/g, '');

  if (cleaned.length <= 2) {
    return cleaned;
  } else if (cleaned.length <= 5) {
    return `${cleaned.slice(0, 2)}.${cleaned.slice(2)}`;
  } else if (cleaned.length <= 8) {
    return `${cleaned.slice(0, 2)}.${cleaned.slice(2, 5)}.${cleaned.slice(5)}`;
  } else {
    return `${cleaned.slice(0, 2)}.${cleaned.slice(2, 5)}.${cleaned.slice(5, 8)}-${cleaned.slice(8)}`;
  }
};

const formatCnh = (value: string) => {
  const cleaned = value.replace(/\D/g, '');

  if (cleaned.length <= 3) {
    return cleaned;
  } else if (cleaned.length <= 6) {
    return `${cleaned.slice(0, 3)}.${cleaned.slice(3)}`;
  } else if (cleaned.length <= 9) {
    return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6)}`;
  } else {
    return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6, 9)}-${cleaned.slice(9, 11)}`;
  }
};
type MaskNameType =
  | 'cellphone'
  | 'cpf'
  | 'rg'
  | 'cnh'
  | 'cnpj'
  | 'zipcode'
  | 'monthYear';

const masksMapper: Record<MaskNameType, (value: string) => string> = {
  cellphone: formatCellphone,
  cpf: formatCpf,
  cnpj: formatCnpj,
  zipcode: formatZipcode,
  monthYear: formatMonthYear,
  rg: formatRg,
  cnh: formatCnh,
};

export { masksMapper, type MaskNameType };
