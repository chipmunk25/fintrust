import { FormWizard, InputTypes } from "adusei-ui";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { routes } from "~/lib/constants";

import { restApi } from "~/redux/restApi";

import { useForm } from "react-hook-form";
import { EmploymentRequestDto, EmploymentValidator } from "./types";
import { useSelector } from "~/redux/store";
import { toast } from "sonner";
import { useEffect } from "react";
const Employment = () => {
  const [EmploymentMutation, { isLoading }] =
    restApi.useCreateEmployeeMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const personId = useSelector(
    (state) => state.persistedReducer.common.personId
  );
  useEffect(() => {
    if (!personId) {
      navigate(routes.person());
    }
  }, [personId]);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmploymentRequestDto>({
    resolver: EmploymentValidator,
    mode: "all",
    defaultValues: {
      currentEmployerName: "",
      currentEmployerAddress: "",
      position: "",
    },
  });

  const onSubmit = async (data: EmploymentRequestDto) => {
    const payload = {
      duration: data.duration ? Number(data.duration) : 0,
      currentEmployerName: data.currentEmployerName,
      currentEmployerAddress: data.currentEmployerAddress,
      position: data.position,
      type: data.type.value,
      previousEmploymentDetails: data.previousEmploymentDetails,
      personId,
    };
    try {
      const response = await EmploymentMutation({
        employmentRequest: payload,
      }).unwrap();
      // const result = response.result;
      console.log(response);
      toast.success("employment created successfully");

      return navigate(routes.guarantor());
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
          <span className="text-lg font-medium">Employment Information</span>
        </div>
        <div className="w-full space-y-2">
          <FormWizard
            config={[
              {
                register: { ...register("currentEmployerName") },
                label: "Curent Employer's Name",
                placeholder: "Enter Current Employer's Name",
                errors: {
                  message: errors.currentEmployerName?.message,
                  error: !!errors.currentEmployerName,
                },
                className: "w-full",
                type: InputTypes.TEXT,
              },
              {
                register: { ...register("currentEmployerAddress") },
                label: "Current Employer's Address",
                placeholder: "Enter Current Employer's Address",
                errors: {
                  message: errors.currentEmployerAddress?.message,
                  error: !!errors.currentEmployerAddress,
                },
                className: "w-full",
                type: InputTypes.TEXT,
              },
              {
                register: { ...register("position") },
                label: "Position",
                placeholder: "Enter Position",
                errors: {
                  message: errors.position?.message,
                  error: !!errors.position,
                },
                type: InputTypes.TEXT,
              },
              {
                register: { ...register("duration") },
                label: "Duration",
                placeholder: "Enter Duration",
                errors: {
                  message: errors.duration?.message,
                  error: !!errors.duration,
                },
                type: InputTypes.TEXT,
              },
              {
                label: "Employment Type",
                control,
                type: InputTypes.SELECT,
                name: "type",
                required: true,
                placeholder: " Select Employment Type",
                options: [
                  {
                    value: "FULLTIME",
                    label: "Full Time",
                  },
                  {
                    value: "PARTTIME",
                    label: "Part Time",
                  },
                  {
                    value: "CONTRACT",
                    label: "Contract",
                  },
                  {
                    value: "SELFEMPLOYED",
                    label: "Self Employed",
                  },
                ],
                errors: {
                  message: errors.type?.message,
                  error: !!errors.type,
                },
              },

              {
                register: { ...register("previousEmploymentDetails") },
                label: "Previous Employment's Details",
                placeholder: "Enter previous Employment's Details",
                errors: {
                  message: errors.previousEmploymentDetails?.message,
                  error: !!errors.previousEmploymentDetails,
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

export default Employment;
