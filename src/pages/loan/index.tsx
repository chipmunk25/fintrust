/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import { FormWizard, InputTypes } from "adusei-ui";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
// import { routes } from "~/lib/constants";
// import { waitForTimeout } from "~/lib/utils";
import { restApi } from "~/redux/restApi";
// import { authActions } from "~/redux/slice/auth";
import { useForm } from "react-hook-form";
import { LoanRequestDto, LoanValidator } from "./types";
import { useSelector } from "~/redux/store";
import { useEffect } from "react";
import { routes } from "~/lib/constants";
import { toast } from "sonner";
const Loans = () => {
  const [loanMutation, { isLoading }] = restApi.useCreateLoanMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoanRequestDto>({
    resolver: LoanValidator,
    mode: "all",
  });
  const personId = useSelector(
    (state) => state.persistedReducer.common.personId
  );
  useEffect(() => {
    if (!personId) {
      navigate(routes.person());
    }
  }, [personId]);

  console.log(errors, "errors");
  const onSubmit = async (data: LoanRequestDto) => {
    try {
      const response = await loanMutation({
        loanRequest: {
          ...data,
          personId,
          type: data.type.value,
          loanAmountRequested: data.loanAmountRequested
            ? Number(data.loanAmountRequested)
            : 0,
          loanTerm: data.loanTerm ? Number(data.loanTerm) : 0,
        },
      }).unwrap();
      // const result = response.result;
      toast.success("Loan request created successfully");

      console.log(response);
      return navigate(routes.summary());
    } catch (err) {
      const errorResponse = err as {
        error: string;
        status: number;
      };
      toast.error(errorResponse.error);
    }
  };
  return (
    <div className="w-full max-w-md px-8 py-6">
      <form className="w-full space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="pb-4">
          <span className="text-lg font-medium">Bank Information</span>
        </div>
        <div className="w-full space-y-2">
          <FormWizard
            config={[
              {
                label: "Loan Type",
                control,
                type: InputTypes.SELECT,
                name: "type",
                required: true,
                placeholder: " Select Loan Type",
                options: [
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
                ],
                errors: {
                  message: errors.type?.message,
                  error: !!errors.type,
                },
              },
              {
                register: { ...register("loanAmountRequested") },
                label: "Loan Amount Requested",
                placeholder: "Enter Loan Amount",
                errors: {
                  message: errors.loanAmountRequested?.message,
                  error: !!errors.loanAmountRequested,
                },
                className: "w-full",
                type: InputTypes.TEXT,
              },
              {
                register: { ...register("loanTerm") },
                label: "Loan Term (In Months)",
                placeholder: "Enter Loan Term",
                errors: {
                  message: errors.loanTerm?.message,
                  error: !!errors.loanTerm,
                },
                type: InputTypes.TEXT,
              },
              {
                register: { ...register("purpose") },
                label: "Purpose of Loan",
                placeholder: "Enter purpose",
                errors: {
                  message: errors.purpose?.message,
                  error: !!errors.purpose,
                },
                className: "w-full",
                type: InputTypes.TEXT,
              },
              {
                register: { ...register("collateral") },
                label: "Collateral",
                placeholder: "Enter Collateral ",
                errors: {
                  message: errors.collateral?.message,
                  error: !!errors.collateral,
                },
                type: InputTypes.TEXT,
              },

              {
                title: "Summary",
                type: InputTypes.SUBMIT,
                className: "w-full text-base",
                loading: isLoading,
                prefix: "ArrowRight",
                prefixClass: "w-6 h-6",
              },
            ]}
          />
        </div>
      </form>
    </div>
  );
};

export default Loans;
