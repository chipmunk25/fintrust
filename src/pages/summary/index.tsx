import { cn, Icon } from "adusei-ui";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "~/lib/constants";
import { restApi } from "~/redux/restApi";
import { useSelector } from "~/redux/store";
import { waitForTimeout } from "~/lib/utils";

const Summary = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const [results, setResults] = useState(0);
  const [loadPersonDetails, { data, isLoading }] =
    restApi.useLazyPersonInfoQuery();
  const personId = useSelector(
    (state) => state.persistedReducer.common.personId
  );
  const personInfo = data?.person;
  useEffect(() => {
    if (!personId) {
      navigate(routes.person());
    } else {
      loadPersonDetails({ id: personId });
    }
  }, [personId]);

  useEffect(() => {
    if (personInfo) {
      setLoader(true);
      const score = calculateCreditScore(personInfo);
      console.log("Total Credit Score:", score);

      const analysing = async () => {
        await waitForTimeout(5000);
        setResults(score);
        setLoader(false);
      };
      analysing();
    }
  }, [personInfo]);
  console.log(data, "data");
  return (
    <div className="flex flex-col items-center justify-center min-h-96">
      {isLoading ||
        (loader && (
          <div className="flex items-center justify-center mx-auto space-y-12">
            <Icon name="LoaderCircle" className="w-20 h-20 animate-spin" />
          </div>
        ))}
      <div className="text-3xl">
        {isLoading || loader ? (
          <div className="">Please wait we are analyzing your data</div>
        ) : (
          <div className="space-y-12">
            <div className="space-y-4 text-4xl text-primary">
              <span>Your credit score is: {results} </span>
            </div>
            <div>
              <span
                className={cn("text-4xl", {
                  "text-red-500": results < 100,
                  "text-green-500": results >= 100,
                })}
              >
                {results >= 100 ? "Low Risk" : "High Risk"}
              </span>
            </div>
            <div>
              {results >= 100
                ? "Congratulations, you are eligible for a loan"
                : "Sorry, you are not eligible for a loan"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
function calculateCreditScore(assessment: any) {
  let score = 0;

  // Fullname
  score += 2;

  // DOB
  score += 2;

  // Marital status
  const maritalStatusScores = {
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
  assessment.employments.forEach((employment: any) => {
    score += 2; // Current employer
    score += 3; // Address
    score += 2; // Position
    score += 2; // Duration
    const employmentTypeScores = {
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
  assessment.banks.forEach((bank: any) => {
    score += 2; // Bank name
    score += 3; // Account number
    score += 3; // Account name
    score += 2; // Branch
    const bankTypeScores = {
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
  assessment.financials.forEach((financial: any) => {
    const incomeTypeScores = {
      WAGES: 0,
      SALARY: 0,
      BONUSES: 0,
      OTHERS: 0,
    };
    const incomeAmountScores = [
      { max: 1000, points: 2 },
      { max: 5000, points: 3 },
      { max: 10000, points: 4 },
      { max: Infinity, points: 6 },
    ];

    const points = incomeAmountScores.find(
      (score) => financial.amount <= score.max
    ).points;
    score += points;

    incomeTypeScores[financial.type] = points;
  });

  // Expenses
  assessment.expenses.forEach((expense: any) => {
    const expenseAmountScores = [
      { max: 500, points: 6 },
      { max: 2000, points: 5 },
      { max: 5000, points: 4 },
      { max: 10000, points: 3 },
      { max: Infinity, points: 2 },
    ];
    const points = expenseAmountScores.find(
      (exp) => expense.amount <= exp.max
    ).points;
    score += points;
  });

  // Current debt
  assessment.currentDebts.forEach((debt: any) => {
    const debtAmountScores = [
      { min: 10000, points: 2 },
      { min: 5000, points: 3 },
      { min: 2000, points: 4 },
      { min: 1000, points: 5 },
      { min: 500, points: 6 },
    ];
    const points = debtAmountScores.find(
      (d) => debt.outstandingBalance >= d.min
    ).points;
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
    const documentTypeScores = {
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

// Example usage
const assessment = {
  // The provided assessment data here
};

export default Summary;
