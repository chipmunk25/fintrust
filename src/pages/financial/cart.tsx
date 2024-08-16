import { Button, Icon, Input, Option, SelectDropDown } from "adusei-ui";

export interface CartProps {
  name: string;
  amount: number;
}
interface Props {
  cartLists: CartProps[];
  setSelectedCart: (value: React.SetStateAction<CartProps[]>) => void;
  options: Option[];
  title: string;
  left: string;
  right: string;
}
const Cart = ({
  cartLists,
  setSelectedCart,
  options,
  title,
  left,
  right,
}: Props) => {
  return (
    <div className="space-y-12">
      <div className="w-full">
        <div className="pb-4">
          <span className="text-lg font-medium">{title}</span>
        </div>
        <ul className="w-full space-y-4">
          <li className=" hidden md:flex  w-full gap-6">
            <div className="w-full md:w-72">{left}</div>
            <div className="w-full">{right}</div>
          </li>
          {cartLists?.map((item, idx) => (
            <li className="flex flex-col md:flex-row w-full gap-6" key={idx}>
              <div className="w-full md:w-1/4 ">
                <div className="block md:hidden">
                  <span>{left}</span>
                </div>
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
              <div className="w-full md:w-1/4 flex gap-2 items-center">
                <div className="w-full  ">
                  <div className="block md:hidden ">
                    <span>{right}</span>
                  </div>
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
                <div className="mt-2 md:mt-0">
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
              </div>
            </li>
          ))}
          <li className="flex flex-col md:flex-row w-full gap-6">
            <div className="w-full md:w-72">
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

export default Cart;
