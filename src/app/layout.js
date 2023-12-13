import './globals.css'

export const metadata = {
  title: 'Todora',
  description: 'A todo list app built with NextJS.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
