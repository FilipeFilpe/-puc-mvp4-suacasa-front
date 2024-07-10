
interface UserPhotoProps {
  className?: string
}
export function UserPhoto(props: UserPhotoProps) {
  return (
    // <Link to="/perfil">
    // </Link>
    <img
      src={'https://randomuser.me/portraits/lego/1.jpg'}
      alt="Foto do Usuário"
      className={`
                  h-14 w-14 rounded-full cursor-pointer
                  ${props.className}
              `}
    />
  )
}