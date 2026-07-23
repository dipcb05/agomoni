export function Footer() {
  return (
    <footer className="relative z-20 w-full px-4 pb-28 pt-4 text-center text-sm text-muted-foreground sm:pb-10">
      <p>
        Made by{' '}
        <a
          href="https://dipchakraborty.dev"
          target="_blank"
          rel="noreferrer"
          className="font-medium text-primary underline-offset-4 transition-colors hover:text-accent hover:underline"
        >
          Dip Chakraborty
        </a>
        . You can contribute there{' '}
        <a
          href="https://github.com/dipcb05/agomoni.git"
          target="_blank"
          rel="noreferrer"
          className="font-medium text-primary underline-offset-4 transition-colors hover:text-accent hover:underline"
        >
          GitHub
        </a>
        .
      </p>
    </footer>
  )
}
