import { Title } from "./Title"
import { UserPhoto } from "./UserPhoto"

interface HeaderProps {
  title: string
  subtitle: string
}

export function Header(props: HeaderProps) {
  return (
    <div className={`flex`}>
      <Title title={props.title} subtitle={props.subtitle} />
      <div className={`
                flex flex-grow justify-end items-center
            `}>
        <UserPhoto className="ml-3" />
      </div>
    </div>
  )
}