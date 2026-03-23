export default function Loading() {
  return (
    <main>
      <div className="min-h-screen bg-background flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-8 h-8 border border-border border-t-foreground animate-spin" />
        </div>
      </div>
    </main>
  )
}
