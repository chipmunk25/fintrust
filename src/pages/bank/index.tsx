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
import {BankRequestDto, BankValidator } from "./types";
const saveRecords = () => {
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

  const onSubmit = async (data: BankRequestDto) => {
    try {
      const response = await bankMutation({
        saveRecords:data
      }).unwrap();
      // const result = response.result;
     
        // return navigate(routes.login());
      console.log(response)
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="w-full max-w-md px-8 py-6">
      <form className="w-full space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4 text-center">
          <h1 className="text-2xl font-medium leading-7">Welcome back!</h1>

          <div className="text-xs font-medium">Please enter your details</div>
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
                register: {...register("branchName")},
                label: "Branch Name",
                placeholder: "Enter Branch Name",
                errors:{
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
                register: {...register("balance")},
                label: "Balance",
                placeholder: "Enter balance",
                errors: {
                  message: errors.balance?.message,
                  error: !!errors.balance,
                },
                type: InputTypes.TEXT,
              },
              {
                title: "Save Bank",
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

export default saveRecords;
