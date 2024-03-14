import {
  useCresteMyrestaurant,
  useGetMyRestaurant,
  useUpdateMyrestaurant,
} from "@/api/MyRestaurantApi";
import ManageResturantForm from "@/forms/manage-resturant-form/ManageResturantForm";

const ManagerestaurantPage = () => {
  const { createRestaurant, isLoading: isCreateLoading } =
    useCresteMyrestaurant();
  const { restaurant } = useGetMyRestaurant();
  const { updateRestaurant, isLoading: isUpdateLoading } =
    useUpdateMyrestaurant();

  const isEditing = !!restaurant; //!! means if restaurant exists isEditing will be true else false
  return (
    <ManageResturantForm
      restaurant={restaurant}
      onSave={isEditing ? updateRestaurant : createRestaurant}
      isLoading={isCreateLoading || isUpdateLoading}
    />
  );
};

export default ManagerestaurantPage;
