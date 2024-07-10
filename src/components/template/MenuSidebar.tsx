import { icons } from "lucide-react";
import { menuItems } from "../../utils/menuItens";
import Logo from "./Logo";
import { MenuItem } from "./MenuItem";

export function MenuSidebar() {

  return (
    <aside className={`
            flex flex-col
            bg-gray-900 text-gray-700
        `}>
      <div className={`
                flex flex-col items-center justify-center
                bg-gradient-to-r from-indigo-500 to-purple-800
                h-20 w-20
            `}>
        <Logo />
      </div>
      <ul className="flex-grow">
        {
          menuItems.map(item => (
            <MenuItem key={item.text} url={item.link} text={item.text} icon={item.icon as keyof typeof icons} />
          ))
        }
      </ul>
    </aside>
  )
}