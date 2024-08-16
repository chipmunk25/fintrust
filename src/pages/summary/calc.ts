// Define types for assessment structure
interface Employment {
  type: "FULLTIME" | "PARTTIME" | "CONTRACT" | "SELFEMPLOYED";
  employer: string;
  address: string;
  position: string;
  duration: string;
}

interface Guarantor {
  name: string;
  address: string;
  telephone: string;
  relationship: string;
}

interface Bank {
  type:
    | "SAVINGS"
    | "CURRENT"
    | "COOPERATE"
    | "SUSU"
    | "FIXEDDEPOSIT"
    | "TBILL"
    | "BONDS";
  name: string;
  accountNumber: string;
  accountName: string;
  branch: string;
}

interface Financial {
  type: "WAGES" | "SALARY" | "BONUSES" | "OTHERS";
  amount: number;
}

interface Expense {
  amount: number;
}

interface CurrentDebt {
  outstandingBalance: number;
}

interface CreditHistory {
  previousLoans: boolean;
  repaymentHistory: boolean;
  latePayments: boolean;
}

interface PublicRecord {
  bankruptcies: boolean;
  criminalRecord: boolean;
  nationality: string;
}

interface Document {
  type:
    | "PASSPORT"
    | "NATIONALID"
    | "DRIVERLICENSE"
    | "UTITLITYBILL"
    | "LEASEAGREEMENT"
    | "TAXRETURNS"
    | "BANKSTATMENT"
    | "CREDITREPORT"
    | "RECENTPAYSTUBS";
}

interface Assessment {
  maritalStatus: "SINGLE" | "MARRIED" | "WIDOWED" | "SEPARATED" | "DIVORCED";
  noOfDependants: number;
  previousHomeAddress: string | null;
  email: string | null;
  previousPhone: string | null;
  employments: Employment[];
  guarantors: Guarantor[];
  banks: Bank[];
  financials: Financial[];
  expenses: Expense[];
  currentDebts: CurrentDebt[];
  creditHistories: CreditHistory[];
  publicRecords: PublicRecord[];
  documents: Document[];
}

export function calculateCreditScore(assessment: Assessment): number {
  let score = 0;

  // Fullname
  score += 2;

  // DOB
  score += 2;

  // Marital status
  const maritalStatusScores: { [key in Assessment["maritalStatus"]]: number } =
    {
      SINGLE: 1,
      MARRIED: 3,
      WIDOWED: 0,
      SEPARATED: 2,
      DIVORCED: 1,
    };
  score += maritalStatusScores[assessment.maritalStatus] || 0;

  // Number of dependants
  if (assessment.noOfDependants === 0) score += 0;
  else if (assessment.noOfDependants <= 2) score += 4;
  else if (assessment.noOfDependants <= 5) score -= 2;
  else score += 1;

  // Previous home address
  score += assessment.previousHomeAddress ? 3 : 0;

  // Current home address
  score += 2;

  // Email
  score += assessment.email ? 2 : 0;

  // Telephone
  score += 4;

  // Previous telephone
  score += assessment.previousPhone ? 5 : 0;

  // National ID
  score += 6;

  // Passport picture
  score += 6;

  // Employment details
  assessment.employments.forEach((employment) => {
    score += 2; // Current employer
    score += 3; // Address
    score += 2; // Position
    score += 2; // Duration

    const employmentTypeScores: { [key in Employment["type"]]: number } = {
      FULLTIME: 4,
      PARTTIME: 2,
      CONTRACT: 3,
      SELFEMPLOYED: 1,
    };
    score += employmentTypeScores[employment.type] || 0;
    score += 3; // Previous employment details
  });

  // Guarantor details
  assessment.guarantors.forEach(() => {
    score += 2; // Guarantor name
    score += 3; // Address
    score += 3; // Telephone
    score += 2; // Relationship
  });

  // Bank details
  assessment.banks.forEach((bank) => {
    score += 2; // Bank name
    score += 3; // Account number
    score += 3; // Account name
    score += 2; // Branch

    const bankTypeScores: { [key in Bank["type"]]: number } = {
      SAVINGS: 4,
      CURRENT: 3,
      COOPERATE: 2,
      SUSU: 2,
      FIXEDDEPOSIT: 5,
      TBILL: 6,
      BONDS: 6,
    };
    score += bankTypeScores[bank.type] || 0;
  });

  // Financial details
  assessment.financials.forEach((financial) => {
    const incomeAmountScores = [
      { max: 1000, points: 2 },
      { max: 5000, points: 3 },
      { max: 10000, points: 4 },
      { max: Infinity, points: 6 },
    ];

    const points =
      incomeAmountScores.find((score) => financial.amount <= score.max)
        ?.points || 0;
    score += points;
  });

  // Expenses
  assessment.expenses.forEach((expense) => {
    const expenseAmountScores = [
      { max: 500, points: 6 },
      { max: 2000, points: 5 },
      { max: 5000, points: 4 },
      { max: 10000, points: 3 },
      { max: Infinity, points: 2 },
    ];
    const points =
      expenseAmountScores.find((exp) => expense.amount <= exp.max)?.points || 0;
    score += points;
  });

  // Current debt
  assessment.currentDebts.forEach((debt) => {
    const debtAmountScores = [
      { min: 10000, points: 2 },
      { min: 5000, points: 3 },
      { min: 2000, points: 4 },
      { min: 1000, points: 5 },
      { min: 500, points: 6 },
    ];
    const points =
      debtAmountScores.find((d) => debt.outstandingBalance >= d.min)?.points ||
      0;
    score += points;
  });

  // Credit history
  assessment.creditHistories.forEach(() => {
    score += 4; // Details of previous loans
    score += 4; // Repayment history
    score += 1; // Late payments (no = 1 point)
  });

  // Public records
  assessment.publicRecords.forEach((record) => {
    score += record.bankruptcies ? 1 : 4;
    score += record.criminalRecord ? 1 : 4;
    score += record.nationality === "GHANAIAN" ? 4 : 1;
  });

  // Documents
  assessment.documents.forEach((document) => {
    const documentTypeScores: { [key in Document["type"]]: number } = {
      PASSPORT: 4,
      NATIONALID: 6,
      DRIVERLICENSE: 3,
      UTITLITYBILL: 2,
      LEASEAGREEMENT: 6,
      TAXRETURNS: 5,
      BANKSTATMENT: 4,
      CREDITREPORT: 3,
      RECENTPAYSTUBS: 2,
    };
    score += documentTypeScores[document.type] || 0;
  });

  return score;
}
