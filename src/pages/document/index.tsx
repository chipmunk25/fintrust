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
import { DocumentRequestDto, DocumentValidator } from "./types";
import { useSelector } from "~/redux/store";
import { useEffect } from "react";
import { routes } from "~/lib/constants";
import { toast } from "sonner";
import { getFormData } from "~/lib/utils";
const saveBankRecords = () => {
  const [documentMutation, { isLoading }] = restApi.useCreateDocumentMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<DocumentRequestDto>({
    resolver: DocumentValidator,
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
  const onSubmit = async (data: DocumentRequestDto) => {
    const payload = { ...data, personId, type: data.type.value };
    const documentRequest = getFormData(payload);

    try {
      const response = await documentMutation({
        documentRequest,
      }).unwrap();
      // const result = response.result;
      toast.success("document attached  successfully");

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
                label: "Bank Type",
                control,
                type: InputTypes.SELECT,
                name: "type",
                required: true,
                placeholder: " Select Bank Type",
                options: [
                  {
                    value: "PASSPORT",
                    label: "Passport",
                  },
                  {
                    value: "NATIONALID",
                    label: "National ID",
                  },
                  {
                    value: "DRIVERLICENSE",
                    label: "Driver's License",
                  },
                  {
                    value: "UTITLITYBILL",
                    label: "Utility Bill",
                  },
                  {
                    value: "LEASEAGREEMENT",
                    label: "Lease Agreement",
                  },
                  {
                    value: "BANKSTATMENT",
                    label: "Bank Statement",
                  },
                  {
                    value: "CREDITREPORT",
                    label: "Credit Report",
                  },
                  {
                    value: "RECENTPAYSTUBS",
                    label: "Recent Pay Stubs",
                  },
                ],
                errors: {
                  message: errors.type?.message,
                  error: !!errors.type,
                },
              },
              {
                type: InputTypes.IMAGE,
                control,
                label: "Attach a Document",
                name: "document",
                errors: {
                  error: !!errors?.document,
                  message: errors?.document?.message?.toString(),
                },
              },
              {
                title: "Summary",
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
