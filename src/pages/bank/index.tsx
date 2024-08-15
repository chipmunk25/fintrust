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
import { BankRequestDto, BankValidator } from "./types";
import { useSelector } from "~/redux/store";
import { useEffect } from "react";
import { routes } from "~/lib/constants";
import { toast } from "sonner";
const saveBankRecords = () => {
  const [bankMutation, { isLoading }] = restApi.useCreateBankMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BankRequestDto>({
    resolver: BankValidator,
    mode: "all",
    defaultValues: {
      accountNumber: "",
      accountName: "",
      bankName: "",
      branchName: "",
    },
  });
  const personId = useSelector(
    (state) => state.persistedReducer.common.personId
  );
  useEffect(() => {
    if (!personId) {
      navigate(routes.person());
    }
  }, [personId]);
  const onSubmit = async (data: BankRequestDto) => {
    try {
      const response = await bankMutation({
        bankRequest: { ...data, personId, type: data.type.value },
      }).unwrap();
      // const result = response.result;
      toast.success("bank info created successfully");

      console.log(response);
      return navigate(routes.financial());
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
                register: { ...register("accountNumber") },
                label: "Account Number",
                placeholder: "Enter Account Number",
                errors: {
                  message: errors.accountNumber?.message,
                  error: !!errors.accountNumber,
                },
                className: "w-full",
                type: InputTypes.TEXT,
              },
              {
                register: { ...register("accountName") },
                label: "Account Name",
                placeholder: "Enter account Name",
                errors: {
                  message: errors.accountName?.message,
                  error: !!errors.accountName,
                },
                className: "w-full",
                type: InputTypes.TEXT,
              },
              {
                register: { ...register("bankName") },
                label: "Bank Name",
                placeholder: "Enter Bank Name ",
                errors: {
                  message: errors.bankName?.message,
                  error: !!errors.bankName,
                },
                type: InputTypes.TEXT,
              },
              {
                register: { ...register("branchName") },
                label: "Branch Name",
                placeholder: "Enter Branch Name",
                errors: {
                  message: errors.branchName?.message,
                  error: !!errors.branchName,
                },
                type: InputTypes.TEXT,
              },
              {
                label: "Bank Type",
                control,
                type: InputTypes.SELECT,
                name: "type",
                required: true,
                placeholder: " Select Bank Type",
                options: [
                  {
                    value: "SAVINGS",
                    label: "Savings",
                  },
                  {
                    value: "CURRENT",
                    label: "Current",
                  },
                  {
                    value: "COOPERATE",
                    label: "Cooperate",
                  },
                  {
                    value: "SUSU",
                    label: "Susu",
                  },
                  {
                    value: "FIXEDDEPOSIT",
                    label: "Fixed Deposit",
                  },
                  {
                    value: "TBILL",
                    label: "Tbill",
                  },
                  {
                    value: "BONDS",
                    label: "Bonds",
                  },
                ],
                errors: {
                  message: errors.type?.message,
                  error: !!errors.type,
                },
              },

              {
                register: { ...register("balance") },
                label: "Balance",
                placeholder: "Enter balance",
                errors: {
                  message: errors.balance?.message,
                  error: !!errors.balance,
                },
                type: InputTypes.TEXT,
              },
              {
                title: "Next",
                type: InputTypes.SUBMIT,
                className: "w-full text-base",

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

export default saveBankRecords;
