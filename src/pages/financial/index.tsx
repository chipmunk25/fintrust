import { FormWizard, InputTypes } from "adusei-ui";
import Cart, { CartProps } from "./cart";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FinancialRequestDto, FinancialValidator } from "./types";

const Financial = () => {
  const [financials, setFinancials] = useState<CartProps[]>([
    {
      name: "",
      amount: 0,
    },
  ]);
  const [expenses, setExpenses] = useState<CartProps[]>([
    {
      name: "",
      amount: 0,
    },
  ]);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FinancialRequestDto>({
    resolver: FinancialValidator,
    mode: "onSubmit",
  });

  const onSubmit = () => {};
  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="pb-4">
        <span className="text-2xl font-bold">Financial Information</span>
      </div>
      <div className="w-full h-[600px] overflow-auto">
        <div className="space-y-4">
          <Cart
            title="Financial"
            left="Type of Financial"
            right="Amount"
            cartLists={financials}
            setSelectedCart={setFinancials}
            options={[
              {
                value: "WAGES",
                label: "Wages",
              },
              {
                value: "SALARY",
                label: "Salary",
              },
              {
                value: "BONUSES",
                label: "Bonues",
              },
              {
                value: "OTHERS",
                label: "Others",
              },
            ]}
          />
        </div>
        <div className="space-y-4">
          <Cart
            title="Expenses Information"
            left="Type of Expenses"
            right="Amount"
            cartLists={expenses}
            setSelectedCart={setExpenses}
            options={[
              {
                value: "UTILITIES",
                label: "Utilities",
              },
              {
                value: "GROCERIES",
                label: "Groceries",
              },
              {
                value: "TRANSPORTATION",
                label: "Transportation",
              },
              {
                value: "INSURANCES",
                label: "Insurances",
              },
              {
                value: "OTHERS",
                label: "Others",
              },
            ]}
          />
        </div>
        <div className="space-y-4">
          <Cart
            title="Current Debt Information"
            left="Type of Loan"
            right="Amount"
            cartLists={expenses}
            setSelectedCart={setExpenses}
            options={[
              {
                value: "PERSONAL",
                label: "Personal",
              },
              {
                value: "AUTO",
                label: "Auto",
              },
              {
                value: "MORTGAGE",
                label: "Mortgage",
              },
              {
                value: "STUDENT",
                label: "Student",
              },
              {
                value: "COOPERATE",
                label: "Cooperate",
              },
              {
                value: "BUSINESS",
                label: "Business",
              },
            ]}
          />
        </div>
        <div className="max-w-md space-y-4">
          <div className="pb-4">
            <span className="text-lg font-medium">Credit History</span>
          </div>
          <FormWizard
            config={[
              {
                register: { ...register("detailsOfPreviousLoans") },
                label: "Details of Previous Loans",
                placeholder: "Enter details of previous loans",
                type: InputTypes.TEXT,
                errors: {
                  message: errors.detailsOfPreviousLoans?.message,
                  error: !!errors.detailsOfPreviousLoans,
                },
              },
              {
                register: { ...register("repaymentHistory") },
                label: "Repayment History",
                placeholder: "Enter repayment history",
                type: InputTypes.TEXT,
                errors: {
                  message: errors.repaymentHistory?.message,
                  error: !!errors.repaymentHistory,
                },
              },
              {
                register: { ...register("latePayments") },
                label: "Late Payments",
                placeholder: "Enter late payments",
                type: InputTypes.TEXT,
                errors: {
                  message: errors.latePayments?.message,
                  error: !!errors.latePayments,
                },
              },
            ]}
          />
        </div>
        <div className="max-w-md space-y-4">
          <div className="pb-4">
            <span className="text-lg font-medium">Public Records</span>
          </div>
          <FormWizard
            config={[
              {
                register: { ...register("nationality") },
                label: "Nationality",
                placeholder: "Enter nationality",
                type: InputTypes.TEXT,
                errors: {
                  message: errors.nationality?.message,
                  error: !!errors.nationality,
                },
              },
              {
                type: InputTypes.RADIO,
                control,
                label: "Bankruptcies",
                name: "bankruptcies",
                options: [
                  {
                    value: "Yes",
                    label: "Yes",
                  },
                  {
                    value: "No",
                    label: "No",
                  },
                ],
                errors: {
                  message: errors.bankruptcies?.message,
                  error: !!errors.bankruptcies,
                },
              },
              {
                type: InputTypes.RADIO,
                control,
                label: "Criminal Record",
                name: "criminalRecord",
                options: [
                  {
                    value: "Yes",
                    label: "Yes",
                  },
                  {
                    value: "No",
                    label: "No",
                  },
                ],
                errors: {
                  message: errors.criminalRecord?.message,
                  error: !!errors.criminalRecord,
                },
              },
            ]}
          />
        </div>
      </div>
    </form>
  );
};

export default Financial;
