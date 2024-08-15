import { FormWizard, InputTypes } from "adusei-ui";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { routes } from "~/lib/constants";
import { waitForTimeout } from "~/lib/utils";
import { restApi } from "~/redux/restApi";
import { authActions } from "~/redux/slice/auth";
import { useForm } from "react-hook-form";
import { EmploymentRequestDto, EmploymentValidator } from "./types";
const Employment = () => {
  const [EmploymentMutation, { isLoading }] =
    restApi.useCreateEmployeeMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

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
    try {
      const response = await EmploymentMutation({
        employmentRequest: data,
      }).unwrap();
      // const result = response.result;

      // return navigate(routes.login());
      console.log(response);
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
                title: "Save Employment",
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
