import { Button } from "@radix-ui/themes";
import Link from 'next/link';

interface Props{
    name: string,
    link: string,
}

const ButtonComp = ({name, link}: Props) => {
  return (
    <Link href={link}><Button>{name}</Button></Link>
  )
}

export default ButtonComp
