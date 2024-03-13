import { FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { cuisineList } from "@/config/restaurant-option-config";
import { useFormContext } from "react-hook-form";
import CiusineCheckbox from "./CiusineCheckbox";

const CuisinesSection = () => {
  const { control } = useFormContext();
  return (
    <div className=" space-y-2">
      <div className=" text-2xl font-bold">
        Cuisines
        <FormDescription>
          Select the Cuisines that your restaurant serves
        </FormDescription>
      </div>
      <FormField
        control={control}
        name="cuisines"
        render={({ field }) => (
          <FormItem>
            <div className=" grid md:grid-cols-5 gap-1">
              {cuisineList.map((cuisineItem) => (
                <CiusineCheckbox cuisine={cuisineItem} field={field} />
              ))}
            </div>
            <FormMessage/>
          </FormItem>
        )}
      />
    </div>
  );
};

export default CuisinesSection;
