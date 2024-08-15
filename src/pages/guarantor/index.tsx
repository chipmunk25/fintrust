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
import { GuarantorRecords, GuarantorValidator } from "./types";
import { useSelector } from "~/redux/store";
import { routes } from "~/lib/constants";
import { useEffect } from "react";
import { toast } from "sonner";
const saveRecords = () => {
  const [guarantorMutation, { isLoading }] =
    restApi.useCreateGurantorMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const personId = useSelector((state) => state.persistedReducer.common.personId);
  useEffect(() => {
    if (!personId) {
      navigate(routes.person());
    }
  }, [personId]);
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
      // personId: "",
    },
  });
  console.log(errors);
  const onSubmit = async (data: GuarantorRecords) => {
    try {
      const response = await guarantorMutation({
        guarantorRequest: { ...data, personId },
      }).unwrap();
      // const result = response.result;

      // return navigate(routes.login());
      console.log(response);
      toast.success("guarantor created successfully");

      return navigate(routes.bank());
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
          <span className="text-lg font-medium">Guarantor Information</span>
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
                register: { ...register("relationship") },
                label: "Relationship",
                placeholder: "Enter Relationship",
                errors: {
                  message: errors.relationship?.message,
                  error: !!errors.relationship,
                },
                type: InputTypes.TEXT,
              },
              {
                title: "Next",
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

export default saveRecords;
