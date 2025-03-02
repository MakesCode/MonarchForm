import { createFileRoute } from "@tanstack/react-router"
import { Exemple2 } from "../components/autoform/autoform";

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <Exemple2 />
  )
}
