import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export function UserNav() {
  return (
    <div className="flex gap-4 items-center">
      <Avatar className=" h-12 w-12">
        <AvatarImage src="/avatars/01.png" alt="@shadcn" />
        <AvatarFallback>SC</AvatarFallback>
      </Avatar>
      <div className="text-base font-medium text-gray-700 dark:text-gray-300">
        Username
      </div>
    </div>
  )
}
