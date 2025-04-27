import { Message, messages } from "@/lib/message-data"
import { atom, useAtom } from "jotai"


type Config = {
  selected: Message["id"] | null
}

const configAtom = atom<Config>({
  selected: messages[0].id,
})

export function useMessage() {
  return useAtom(configAtom)
}
