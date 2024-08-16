import { FormWizard, InputTypes, Separator } from "adusei-ui";
import Cart, { CartProps } from "./cart";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { FinancialRequestDto, FinancialValidator } from "./types";
import MultiCart, { MultiCartProps } from "./multi";
import { useSelector } from "~/redux/store";
import { routes } from "~/lib/constants";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { restApi } from "~/redux/restApi";

const Financial = () => {
  const navigate = useNavigate();

  const [financialMutation, { isLoading }] =
    restApi.useCreateFinancialMutation();

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
  const [debt, setDebt] = useState<MultiCartProps[]>([
    {
      name: "",
      amount: 0,
      amount1: 0,
      amount2: 0,
    },
  ]);
  const personId = useSelector(
    (state) => state.persistedReducer.common.personId
  );
  useEffect(() => {
    if (!personId) {
      navigate(routes.person());
    }
  }, [personId]);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FinancialRequestDto>({
    resolver: FinancialValidator,
    mode: "onSubmit",
  });

  const previousLoanWatch = useWatch<FinancialRequestDto>({
    name: "previousLoan",
    control,
  }) as string;

  const onSubmit = async (data: FinancialRequestDto) => {
    console.log(data, debt, financials, expenses);

    // const currentFinancialPayloads = financials.map((item) => {
    //   return {
    //     personId,
    //     type: item.name,
    //     amount: item.amount,
    //   };
    // });
    // const currentExpensesPayloads = expenses.map((item) => {
    //   return {
    //     personId,
    //     type: item.name,
    //     amount: item.amount,
    //   };
    // });
    // const publicRecordsPayload = {
    //   personId,
    //   bankruptcies: data.bankruptcies === "Yes" ? true : false,
    //   criminalRecord: data.criminalRecord === "Yes" ? true : false,
    //   nationality: data.nationality,
    // };
    // const creditHistoryPayload = {
    //   personId,
    //   previousLoan: data.previousLoan === "Yes" ? true : false,
    //   repaymentHistory: data.repaymentSchedule
    //     ? data.repaymentSchedule.value
    //     : "",
    //   latePayments: data.latePayments === "Yes" ? true : false,
    // };
    // const financialRequest = {
    //   currentFinancialPayloads,
    //   currentExpensesPayloads,
    //   publicRecordsPayload,
    //   creditHistoryPayload,
    // };

    // const currentDebtPayloads = cleanedData(
    //   debt.map((item) => {
    //     return {
    //       personId,
    //       loanAmount: item.amount,
    //       existingLoanType: item.name,
    //       outstandingBalance: item.amount1,
    //       monthlyPaymentObligations: item.amount2,
    //     };
    //   })
    // );
    // if (currentDebtPayloads.length > 0) {
    //   financialRequest.currentDebtPayloads = currentDebtPayloads;
    // }
    const currentFinancialPayloads = financials.map((item) => {
      return {
        personId,
        type: item.name,
        amount: item.amount,
      };
    });

    const currentExpensesPayloads = expenses.map((item) => {
      return {
        personId,
        type: item.name,
        amount: item.amount,
      };
    });

    const publicRecordsPayload = {
      personId,
      bankruptcies: data.bankruptcies === "Yes" ? true : false,
      criminalRecord: data.criminalRecord === "Yes" ? true : false,
      nationality: data.nationality,
    };

    const creditHistoryPayload = {
      personId,
      previousLoan: data.previousLoan === "Yes" ? true : false,
      repaymentHistory: data.repaymentSchedule
        ? data.repaymentSchedule.value
        : "",
      latePayments: data.latePayments === "Yes" ? true : false,
    };

    // Initialize financialRequest with an optional currentDebtPayloads property
    const financialRequest: {
      currentFinancialPayloads: {
        personId: string;
        type: string;
        amount: number;
      }[];
      currentExpensesPayloads: {
        personId: string;
        type: string;
        amount: number;
      }[];
      publicRecordsPayload: {
        personId: string;
        bankruptcies: boolean;
        criminalRecord: boolean;
        nationality: string;
      };
      creditHistoryPayload: {
        personId: string;
        previousLoan: boolean;
        repaymentHistory: string;
        latePayments: boolean;
      };
      currentDebtPayloads?: {
        personId: string;
        loanAmount: number;
        existingLoanType: string;
        outstandingBalance: number;
        monthlyPaymentObligations: number;
      }[];
    } = {
      currentFinancialPayloads,
      currentExpensesPayloads,
      publicRecordsPayload,
      creditHistoryPayload,
    };

    // Conditionally add currentDebtPayloads if there are items in the debt array
    const currentDebtPayloads = cleanedData(
      debt.map((item) => {
        return {
          personId,
          loanAmount: item.amount,
          existingLoanType: item.name,
          outstandingBalance: item.amount1,
          monthlyPaymentObligations: item.amount2,
        };
      })
    );

    if (currentDebtPayloads.length > 0) {
      financialRequest.currentDebtPayloads = currentDebtPayloads;
    }

    try {
      console.log(financialRequest, "financialRequest");
      const response = await financialMutation({
        financialRequest,
      });
      console.log(response, "response");
      toast.success("Financial info created successfully");
      return navigate(routes.document());
    } catch (err) {
      const errorResponse = err as {
        error: string;
        status: number;
      };
      toast.error(errorResponse.error);
    }
  };
  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="pb-4">
        <span className="text-2xl font-bold">Financial Information</span>
      </div>
      <div className="w-full h-[600px] overflow-auto space-y-4">
        <div className="pb-5">
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
        <Separator />
        <div className="pb-5">
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
        <Separator />
        <div className="max-w-md space-y-4">
          <div className="pb-4">
            <span className="text-lg font-medium">Credit History</span>
          </div>
          <FormWizard
            config={[
              {
                type: InputTypes.RADIO,
                control,
                label: "Have you taken a loan before",
                name: "previousLoan",
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
                  message: errors.previousLoan?.message,
                  error: !!errors.previousLoan,
                },
              },
            ]}
          />
          {previousLoanWatch === "Yes" && (
            <FormWizard
              config={[
                {
                  label: "Repayment Schedule",
                  control,
                  type: InputTypes.SELECT,
                  name: "repaymentSchedule",
                  required: true,
                  placeholder: "Select repayment schedule",
                  options: [
                    {
                      value: "FULL",
                      label: "Full",
                    },
                    {
                      value: "MONTHLY",
                      label: "Monthly",
                    },
                    {
                      value: "WEEKLY",
                      label: "Weekly",
                    },
                    {
                      value: "DAILY",
                      label: "Daily",
                    },
                    {
                      value: "YEARLY",
                      label: "Yearly",
                    },
                  ],
                  errors: {
                    message: errors.repaymentSchedule?.message,
                    error: !!errors.repaymentSchedule,
                  },
                },
                {
                  type: InputTypes.RADIO,
                  control,
                  label: "Any late payments?",
                  name: "latePayments",
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
                    message: errors.latePayments?.message,
                    error: !!errors.latePayments,
                  },
                },
              ]}
            />
          )}
        </div>
        {previousLoanWatch === "Yes" && (
          <div>
            <Separator />
            <div className="pb-5">
              <MultiCart
                title="Current Debt Information"
                headers={[
                  "Type of Loan",
                  "Loan Amount",
                  "Outstanding Balance",
                  "Monthly Payment Obligations",
                ]}
                // left="Type of Loan"
                // right="Loan Amount"
                cartLists={debt}
                setSelectedCart={setDebt}
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
          </div>
        )}

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

        <FormWizard
          config={[
            {
              title: "Next",
              type: InputTypes.SUBMIT,
              className: "w-full max-w-md text-base",
              loading: isLoading,
              prefix: "ArrowRight",
              prefixClass: "w-6 h-6",
            },
          ]}
        />
      </div>
    </form>
  );
};

const cleanedData = (data: any[]) =>
  data?.filter((parties) => {
    return parties.loanAmount && parties.name;
  });

export default Financial;
