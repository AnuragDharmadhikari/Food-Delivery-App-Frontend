import { useCresteMyrestaurant } from "@/api/MyRestaurantApi";
import ManageResturantForm from "@/forms/manage-resturant-form/ManageResturantForm";

const ManagerestaurantPage = () => {
  const { createRestaurant, isLoading } = useCresteMyrestaurant();
  return (
    <ManageResturantForm onSave={createRestaurant} isLoading={isLoading} />
  );
};

export default ManagerestaurantPage;
