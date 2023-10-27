import { ReactNode, PropsWithChildren } from 'react'

interface ContentProps {
  header: ReactNode
}

export const Content = ({ children, header }: PropsWithChildren<ContentProps>) => {
  return (
    <main className="bg-layout-background rounded-tl-2xl grow">
      { header }
      { children }
    </main>
  )
}
