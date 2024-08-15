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
import {GuarantorRecords, GuarantorValidator } from "./types";
const saveRecords = () => {
  const [guarantorMutation, { isLoading }] = restApi.useSaveGuarantorRecordsMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const {
    // control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GuarantorRecords>({
    resolver: GuarantorValidator,
    mode: "all",
    defaultValues: {
      fullname: "",
      address: "",
      telephone: "",
      relationship: "",
      personId: "",
    },
  });

  const onSubmit = async (data: GuarantorRecords) => {
    try {
      const response = await guarantorMutation({
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
                register: { ...register("fullname") },
                label: "Fullname",
                placeholder: "Enter Fullname",
                errors: {
                  message: errors.fullname?.message,
                  error: !!errors.fullname,
                },
                className: "w-full",
                type: InputTypes.TEXT,
              },
              {
                register: { ...register("address") },
                label: "Address",
                placeholder: "Enter Address",
                errors: {
                  message: errors.address?.message,
                  error: !!errors.address,
                },
                className: "w-full",
                type: InputTypes.TEXT,
      
              },
              {
                register: { ...register("telephone") },
                label: "Telephone",
                placeholder: "Enter Phone Number",
                errors: {
                  message: errors.telephone?.message,
                  error: !!errors.telephone,
                },
                type: InputTypes.TEXT,
              },
              {
                title: "Save Guarantor Records",
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
