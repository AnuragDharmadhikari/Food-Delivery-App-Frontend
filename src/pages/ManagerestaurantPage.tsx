import {
  useCresteMyrestaurant,
  useGetMyRestaurant,
} from "@/api/MyRestaurantApi";
import ManageResturantForm from "@/forms/manage-resturant-form/ManageResturantForm";

const ManagerestaurantPage = () => {
  const { createRestaurant, isLoading } = useCresteMyrestaurant();
  const { restaurant } = useGetMyRestaurant();
  return (
    <ManageResturantForm
      restaurant={restaurant}
      onSave={createRestaurant}
      isLoading={isLoading}
    />
  );
};

export default ManagerestaurantPage;
