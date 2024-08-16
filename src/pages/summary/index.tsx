import { Button, cn, Icon } from "adusei-ui";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "~/lib/constants";
import { restApi } from "~/redux/restApi";
import { useSelector } from "~/redux/store";
import { waitForTimeout } from "~/lib/utils";
import { commonActions } from "~/redux/slice/common";
import { useDispatch } from "react-redux";
import { calculateCreditScore } from "./calc";

const Summary = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const [results, setResults] = useState(0);
  const [loadPersonDetails, { data, isLoading }] =
    restApi.useLazyPersonInfoQuery();
  const personId = useSelector(
    (state) => state.persistedReducer.common.personId
  );
  const personInfo = data?.person;
  useEffect(() => {
    if (!personId) {
      navigate(routes.person());
    } else {
      loadPersonDetails({ id: personId });
    }
  }, [personId]);

  useEffect(() => {
    if (personInfo) {
      setLoader(true);
      const score = calculateCreditScore(personInfo);
      console.log("Total Credit Score:", score);

      const analysing = async () => {
        await waitForTimeout(5000);
        setResults(score);
        setLoader(false);
      };
      analysing();
    }
  }, [personInfo]);
  console.log(data, "data");
  return (
    <div className="flex flex-col items-center justify-center min-h-96">
      {isLoading ||
        (loader && (
          <div className="flex items-center justify-center mx-auto space-y-12">
            <Icon name="LoaderCircle" className="w-20 h-20 animate-spin" />
          </div>
        ))}
      <div className="text-3xl">
        {isLoading || loader ? (
          <div className="">Please wait we are analyzing your data</div>
        ) : (
          <div className="space-y-12">
            <div className="space-y-4 text-4xl text-primary">
              <span>Your credit score is: {results} </span>
            </div>
            <div>
              <span
                className={cn("text-4xl", {
                  "text-red-500": results < 100,
                  "text-green-500": results >= 100,
                })}
              >
                {results >= 100 ? "Low Risk" : "High Risk"}
              </span>
            </div>
            <div>
              {results >= 100
                ? "Congratulations, you are eligible for a loan"
                : "Sorry, you are not eligible for a loan"}
            </div>

            <div>
              <Button
                onClick={() => {
                  dispatch(commonActions.resetPersonId());

                  navigate(routes.person());
                }}
              >
                Start New Loan Application
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Summary;
