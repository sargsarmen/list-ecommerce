export function Footer() {
  return (
    <footer className="bg-muted">
      <div className="container px-4 py-6 mx-auto">
        <div className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} BuySell Marketplace. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

