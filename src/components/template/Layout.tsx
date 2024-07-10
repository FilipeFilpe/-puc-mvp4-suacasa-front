import { ReactNode } from "react";
import { useAlertMessage } from "../../stores/useAlertMessage";
import { Alert } from "./Alert";
import { Content } from "./Content";
import { Goback } from "./Goback";
import { Header } from "./Header";
import { MenuSidebar } from "./MenuSidebar";

interface LayoutProps {
  title: string
  subtitle: string
  children?: ReactNode
  showGoback?: boolean
}

export default function Layout(props: LayoutProps) {
  const { message } = useAlertMessage();

  return (
    <div className={`flex h-screen w-screen`}>
      {message ? (
        <Alert />
      ) : null}
      <MenuSidebar />
      <div className={`
                    flex flex-col w-full p-7 pb-12
                    bg-gray-800
                    overflow-auto
                `}>
        <Header title={props.title} subtitle={props.subtitle} />
        {
          props?.showGoback ? (
            <Goback />
          ) : null
        }
        <Content>
          {props.children}
        </Content>
      </div>
    </div>
  )
}