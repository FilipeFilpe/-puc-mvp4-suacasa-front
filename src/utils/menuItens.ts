import { icons } from "lucide-react";

type MenuItem = {
  text: string;
  link: string;
  icon?: keyof typeof icons;
  sublinks?: Array<MenuItem>;
};

export const menuItems: Array<MenuItem> = [
  {
    text: "Dashboard",
    link: "/",
    icon: "LineChart",
  },
  {
    text: "Propriedades",
    link: "/propriedades",
    icon: "House",
    sublinks: [{ text: "Novo", link: "/propriedades/novo", icon: "HousePlus" }],
  },
  {
    text: "Clientes",
    link: "/clientes",
    icon: "Users",
    sublinks: [{ text: "Novo", link: "/clientes/novo", icon: "UserPlus" }],
  },
];
