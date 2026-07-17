export function DashboardFooter() {
  return (
    <footer className="bg-white border-t border-[#E8EAE0] px-8 py-3 text-center text-sm text-[#708090] flex-shrink-0">
      <span className="font-medium text-[#2D343A]">ZENTHOS</span>
      <span className="mx-2">•</span>
      Gestão, Estratégia & Transformação
      <span className="mx-2">•</span>
      © {new Date().getFullYear()}
    </footer>
  )
}
