import { MenuItem } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type Props = {
  menuItem: MenuItem;
  addToCart: () => void;
};

const MenuItems = ({ menuItem, addToCart }: Props) => {
  return (
    <Card onClick={addToCart} className=" cursor-pointer">
      <CardHeader>
        <CardTitle>{menuItem.name}</CardTitle>
      </CardHeader>
      <CardContent className=" font-bold">₹{menuItem.price}</CardContent>
    </Card>
  );
};

export default MenuItems;
