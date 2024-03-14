import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import DetailsSection from "./DetailsSection";
import { Separator } from "@/components/ui/separator";
import CuisinesSection from "./CuisinesSection";
import MenuSection from "./MenuSection";
import ImageSection from "./ImageSection";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { Restaurant } from "@/types";
import { useEffect } from "react";

const formSchema = z.object({
  restaurantName: z
    .string({
      required_error: "resturant name is required",
    })
    .refine((value) => value.trim() !== "", {
      message: "name cannot be empty or contain only spaces",
    }),
  city: z
    .string({
      required_error: "city name is required",
    })
    .refine((value) => value.trim() !== "", {
      message: "city cannot be empty or contain only spaces",
    }),
  country: z
    .string({
      required_error: "country name is required",
    })
    .refine((value) => value.trim() !== "", {
      message: "country cannot be empty or contain only spaces",
    }),
  deliveryPrice: z.coerce
    .number({
      required_error: "delivery price is required",
      invalid_type_error: "must be a valid number",
    })
    .min(1, "Delivery Price is required"),
  estimatedDeliveryTime: z.coerce
    .number({
      required_error: "Estimated Delivery Time is required",
      invalid_type_error: "must be a valid number",
    })
    .min(1, "Estimated Delivery Time is required"),
  cuisines: z.array(z.string()).nonempty({
    message: "Please select atleast one item",
  }),
  menuItems: z.array(
    z.object({
      name: z
        .string()
        .min(1, "name is required")
        .refine((value) => value.trim() !== "", {
          message: "name cannot be empty or contain only spaces",
        }),
      price: z.coerce.number().min(1, "price is required"),
    })
  ),
  imageFile: z.instanceof(File, { message: "Image is required" }),
});

type ResturantFormdata = z.infer<typeof formSchema>;

type Props = {
  restaurant?: Restaurant; //? means optional parameter
  onSave: (restaurantFormdata: FormData) => void;
  isLoading: Boolean;
};

const ManageResturantForm = ({ onSave, isLoading, restaurant }: Props) => {
  const form = useForm<ResturantFormdata>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cuisines: [],
      menuItems: [{ name: "", price: 0 }],
    },
  });

  useEffect(() => {
    if (!restaurant) {
      return;
    }
    const menuItemsFormatted = restaurant.menuItems.map((item) => ({
      ...item,
      price: parseInt(item.price.toFixed(2)),
    }));

    const updatedRestaurant = {
      ...restaurant,
      menuItems: menuItemsFormatted,
    };
    form.reset(updatedRestaurant);
  }, [form, restaurant]);

  const onSubmit = (formDataJson: ResturantFormdata) => {
    const fromData = new FormData();

    fromData.append("restaurantName", formDataJson.restaurantName);
    fromData.append("city", formDataJson.city);
    fromData.append("country", formDataJson.country);

    fromData.append("deliveryPrice", formDataJson.deliveryPrice.toString());
    fromData.append(
      "estimatedDeliveryTime",
      formDataJson.estimatedDeliveryTime.toString()
    );
    formDataJson.cuisines.forEach((cuisine, index) => {
      fromData.append(`cuisines[${index}]`, cuisine);
    });
    formDataJson.menuItems.forEach((menuItem, index) => {
      fromData.append(`menuItems[${index}][name]`, menuItem.name);
      fromData.append(`menuItems[${index}][price]`, menuItem.price.toString());
    });
    fromData.append(`imageFile`, formDataJson.imageFile);

    onSave(fromData);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" space-y-8 bg-gray-50 p-10 rounded-lg"
      >
        <DetailsSection />
        <Separator />
        <CuisinesSection />
        <Separator />
        <MenuSection />
        <Separator />
        <ImageSection />
        {isLoading ? <LoadingButton /> : <Button type="submit">Submit</Button>}
      </form>
    </Form>
  );
};

export default ManageResturantForm;
