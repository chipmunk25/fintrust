import { Button, Icon, Input, Option, SelectDropDown } from "adusei-ui";

export interface MultiCartProps {
  name: string;
  amount: number;
  amount1: number;
  amount2: number;
}
interface Props {
  cartLists: MultiCartProps[];
  setSelectedCart: (value: React.SetStateAction<MultiCartProps[]>) => void;
  options: Option[];
  headers: string[];
  title: string;
  left?: string;
  right?: string;
}
const MultiCart = ({
  cartLists,
  setSelectedCart,
  options,
  title,

  headers,
}: Props) => {
  return (
    <div className="space-y-12">
      <div className="w-full">
        <div className="pb-4">
          <span className="text-lg font-medium">{title}</span>
        </div>
        <ul className="w-full space-y-4">
          <li className="flex w-full gap-6">
            {headers?.map((item, idx) => (
              <div className="w-full" key={idx}>
                {item}
              </div>
            ))}
            {/* <div className="w-72">{left}</div> */}
          </li>
          {cartLists?.map((item, idx) => (
            <li className="flex w-full gap-6" key={idx}>
              <div className="w-full">
                <SelectDropDown
                  value={{
                    value: item.name,
                    label: options?.find((opt) => opt?.value === item?.name)
                      ?.label,
                  }}
                  options={options}
                  onChange={(option) => {
                    const opt = option as Option;
                    setSelectedCart((prev) => {
                      const newOption = [...prev];
                      newOption[idx].name = opt?.value;
                      return newOption;
                    });
                  }}
                />
              </div>
              <div className="w-full">
                <div className="w-72">
                  <Input
                    value={item.amount}
                    placeholder="Amount"
                    className="border-neutral-300"
                    onChange={(e) => {
                      setSelectedCart((prev) => {
                        const newOption = [...prev];
                        newOption[idx].amount = Number(e.target.value);
                        return newOption;
                      });
                    }}
                  />
                </div>
              </div>
              <div className="w-full">
                <div className="w-72">
                  <Input
                    value={item.amount1}
                    placeholder="Amount"
                    className="border-neutral-300"
                    onChange={(e) => {
                      setSelectedCart((prev) => {
                        const newOption = [...prev];
                        newOption[idx].amount1 = Number(e.target.value);
                        return newOption;
                      });
                    }}
                  />
                </div>
              </div>
              <div className="w-full">
                <div className="w-72">
                  <Input
                    value={item.amount2}
                    placeholder="Amount"
                    className="border-neutral-300"
                    onChange={(e) => {
                      setSelectedCart((prev) => {
                        const newOption = [...prev];
                        newOption[idx].amount2 = Number(e.target.value);
                        return newOption;
                      });
                    }}
                  />
                </div>
              </div>
              <div>
                <Button
                  onClick={() => {
                    setSelectedCart((prev) => {
                      const newOption = [...prev];
                      newOption.splice(idx, 1);
                      return newOption;
                    });
                  }}
                  variant={"ghost"}
                  className="w-10 h-10 rounded-full bg-destructive-100 text-destructive-500"
                  type="button"
                  size={"icon"}
                >
                  <Icon name="Trash2" />
                </Button>
              </div>
            </li>
          ))}
          <li className="flex w-full gap-6">
            <div className="w-72">
              <Button
                className="flex w-full gap-4 bg-neutral-300 text-neutral-700"
                variant={"ghost"}
                type="button"
                onClick={() =>
                  setSelectedCart((prev) => [
                    ...prev,
                    {
                      name: "",
                      amount: 0,
                      amount1: 0,
                      amount2: 0,
                    },
                  ])
                }
              >
                <Icon name="Plus" className="w-4 h-4" />
                <span>Add More</span>
              </Button>
            </div>
            <div className="w-full"></div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MultiCart;
