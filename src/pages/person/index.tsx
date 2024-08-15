import { Button, FormWizard, InputTypes } from "adusei-ui";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { routes } from "~/lib/constants";
import { getFormData } from "~/lib/utils";
import { restApi } from "~/redux/restApi";

import { useForm } from "react-hook-form";
import { PersonValidator, PersonRequestDto } from "./types";

import { toast } from "sonner";
import { commonActions } from "~/redux/slice/common";

const Person = () => {
  const [personMutation, { isLoading }] = restApi.useCreatePersonMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonRequestDto>({
    resolver: PersonValidator,
    mode: "all",
    defaultValues: {
      id: `P-${new Date().getTime()}`,
    },
  });
  console.log(errors);
  const onSubmit = async (data: PersonRequestDto) => {
    const payload = {
      id: data.id,
      fullname: data.fullname,
      dob: data.dob,
      maritalStatus: data.maritalStatus.value,
      noOfDependants: data.noOfDependants ? Number(data.noOfDependants) : 0,
      previousHomeAddress: data.previousHomeAddress,
      currentHomeAddress: data.currentHomeAddress,
      email: data.email,
      telephone: data.telephone,
      nationalID: data.nationalID,
      passport: data.passport,
    };
    console.log(payload, "payload");
    const personRequest = getFormData(payload);
    try {
      const response = await personMutation({
        personRequest,
      }).unwrap();
      // const result = response.result;

      console.log(response);
      const personId = response.person.id;

      dispatch(commonActions.selectPersonId(personId));

      toast.success("person created successfully");
      return navigate(routes.employment());
    } catch (err) {
      const errorResponse = err as {
        error: string;
        status: number;
      };
      toast.error(errorResponse.error);
      console.log(errorResponse.error, errorResponse.status);
    }
  };
  return (
    <div className="w-full max-w-md px-8 py-6">
      <form className="w-full space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="pb-4">
          <span className="text-lg font-medium">Personal Information</span>
        </div>
        <div className="w-full space-y-2">
          <FormWizard
            config={[
              {
                register: { ...register("id") },
                label: "Person ID",
                readOnly: true,
                description: (
                  <span className="text-sm text-neutral-500">
                    You can’t change the Person ID
                  </span>
                ),
                placeholder: "Enter Person ID",
                type: InputTypes.TEXT,
                errors: {
                  message: errors.id?.message,
                  error: !!errors.id,
                },
              },
              {
                register: { ...register("fullname") },
                label: "Fullname",
                placeholder: "Enter Fullname",
                errors: {
                  message: errors.fullname?.message,
                  error: !!errors.fullname,
                },

                type: InputTypes.TEXT,
              },
              {
                type: InputTypes.DATE,
                label: "Date of Birth",
                name: "dob",
                control,
                errors: {
                  message: errors.dob?.message,
                  error: !!errors.dob,
                },
                disabled: {
                  after: new Date(),
                },
              },
              {
                label: "Marital Status",
                control,
                type: InputTypes.SELECT,
                name: "maritalStatus",
                required: true,
                placeholder: "Marital Status",
                options: [
                  {
                    value: "SINGLE",
                    label: "Single",
                  },
                  {
                    value: "DIVORCED",
                    label: "Divorced",
                  },
                  {
                    value: "MARRIED",
                    label: "Married",
                  },
                  {
                    value: "WIDOWED",
                    label: "Widowed",
                  },
                  {
                    value: "SEPARATED",
                    label: "Separated",
                  },
                ],
                errors: {
                  message: errors.maritalStatus?.message,
                  error: !!errors.maritalStatus,
                },
              },
              {
                register: { ...register("noOfDependants") },
                label: "noOfDependants",
                placeholder: "How many People Depends on You",
                errors: {
                  message: errors.noOfDependants?.message,
                  error: !!errors.noOfDependants,
                },
                type: InputTypes.NUMBER,
              },
              {
                register: { ...register("previousHomeAddress") },
                label: "Previous Home Address",
                placeholder: "Enter your previous home address",
                errors: {
                  message: errors.previousHomeAddress?.message,
                  error: !!errors.previousHomeAddress,
                },
                type: InputTypes.TEXT,
              },
              {
                register: { ...register("currentHomeAddress") },
                label: "Current Home Address",
                placeholder: "Enter your current home address",
                errors: {
                  message: errors.currentHomeAddress?.message,
                  error: !!errors.currentHomeAddress,
                },
                type: InputTypes.TEXT,
              },
              {
                register: { ...register("email") },
                label: "Email",
                placeholder: "Enter email",
                errors: {
                  message: errors.email?.message,
                  error: !!errors.email,
                },
                className: "w-full",
                type: InputTypes.EMAIL,
                suffix: "Mail",
                suffixClass: errors.email
                  ? "text-destructive"
                  : "text-gray-400",
              },
              {
                register: { ...register("telephone") },
                label: "Telephone",
                placeholder: "Enter your phone number",
                errors: {
                  message: errors.telephone?.message,
                  error: !!errors.telephone,
                },
                type: InputTypes.TEXT,
              },
              {
                register: { ...register("previousPhone") },
                label: "Previous Phone",
                placeholder: "Enter your previous phone number",
                errors: {
                  message: errors.previousPhone?.message,
                  error: !!errors.previousPhone,
                },
                type: InputTypes.TEXT,
              },
              {
                register: { ...register("nationalID") },
                label: "National ID",
                placeholder: "Enter your National ID number",
                errors: {
                  message: errors.nationalID?.message,
                  error: !!errors.nationalID,
                },
                type: InputTypes.TEXT,
              },
              {
                type: InputTypes.IMAGE,
                control,
                label: "Passport",
                name: "passport",
                errors: {
                  error: !!errors?.passport,
                  message: errors?.passport?.message?.toString(),
                },
              },
            ]}
          />
        </div>
        <div className="flex justify-start max-w-xs">
          <Button className="" type="submit" disabled={isLoading}>
            Next
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Person;
