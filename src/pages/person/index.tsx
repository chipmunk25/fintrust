import { FormWizard, InputTypes } from "adusei-ui";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { routes } from "~/lib/constants";
import { getFormData, waitForTimeout } from "~/lib/utils";
import { restApi } from "~/redux/restApi";
import { authActions } from "~/redux/slice/auth";
import { useForm } from "react-hook-form";
import { PersonValidator, PersonRequestDto } from "./types";
import { get } from "http";
import {toast} from "sonner"

const Person = () => {

  const [personMutation, { isLoading }] = restApi.useCreatePersonMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const {
     control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonRequestDto>({
    resolver: PersonValidator,
    mode: "all",
    defaultValues: {
      email: "",
      
    },
  });

  const onSubmit = async (data: PersonRequestDto) => {
      const payload=getFormData(data)
    try {
      const response = await personMutation({
        personRequest:payload
      }).unwrap();
      // const result = response.result;
     
        // return navigate(routes.login());
      console.log(response)
      toast.success("person created successfully")
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
                options:[
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
                name: "Passport",
                errors: {
                  message: errors.passport?.message,
                  error: !!errors.passport,
                },
              },
             
              
            ]}
          />
        </div>
      </form>
    </div>
  );
};


export default Person;
