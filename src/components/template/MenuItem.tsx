import clsx from "clsx"
import { icons } from "lucide-react"
import { NavLink } from "react-router-dom"
import Icon from "../Icon"

interface MenuItemProps {
  url: string
  text: string
  icon: keyof typeof icons
  className?: string
}
export function MenuItem(props: MenuItemProps) {

  return (
    <li className={`hover:bg-gray-800 cursor-pointer`}>
      {
        <NavLink
          to={props.url}
          className={({ isActive }) => clsx('flex flex-col justify-center items-center h-20 w-20 text-gray-200', {'bg-slate-700': isActive })}
        >
          <Icon name={props.icon} />
          <span className={`text-xs font-light`}>
            {props.text}
          </span>
        </NavLink>
      }
    </li>
  )
}