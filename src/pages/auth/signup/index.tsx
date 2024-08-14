import { FormWizard, InputTypes } from "adusei-ui";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { routes } from "~/lib/constants";
import { waitForTimeout } from "~/lib/utils";
import { restApi } from "~/redux/restApi";
import { authActions } from "~/redux/slice/auth";
import { useForm } from "react-hook-form";
import { LoginValidator, TLogin } from "./types";
const Signin = () => {
  const [loginMutation, { isLoading }] = restApi.useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const {
    // control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLogin>({
    resolver: LoginValidator,
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: TLogin) => {
    try {
      const response = await loginMutation(data).unwrap();
      const result = response.result;
      const { accessToken, refreshToken, userId, expiresIn, avatar } = result;
      dispatch(
        authActions.setTokens({
          accessToken,
          refreshToken,
          userId,
          expiresIn,
          avatar,
        })
      );
      const redirectTo = searchParams.get("redirectTo") ?? routes.home();

      await waitForTimeout(1000);
      if (userId) {
        return navigate(redirectTo, {
          replace: true,
        });
      } else {
        return navigate(routes.login());
      }
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
                register: { ...register("password") },
                label: "Password",
                placeholder: "Enter Password",
                errors: {
                  message: errors.password?.message,
                  error: !!errors.password,
                },
                type: InputTypes.PASSWORD,
              },
              {
                title: "Sign in",
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

export default Signin;
