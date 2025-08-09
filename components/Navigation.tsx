export default function Navigation() {
  return (
		<nav className="fixed top-0 w-full bg-background/80 backdrop-blur-sm border-b z-50">
			<div className="container mx-auto px-4 py-4">
				<div className="flex justify-between items-center">
					<h1 className="text-2xl font-bold tracking-tight">
						Pedro Arenas
					</h1>
					<div className="hidden md:flex space-x-6">
						<a
							href="#about"
							className="text-sm font-semibold uppercase tracking-[0.02em] hover:text-primary transition-colors"
						>
							About
						</a>
						<a
							href="#projects"
							className="text-sm font-semibold uppercase tracking-[0.02em] hover:text-primary transition-colors"
						>
							Projects
						</a>
						<a
							href="#skills"
							className="text-sm font-semibold uppercase tracking-[0.02em] hover:text-primary transition-colors"
						>
							Skills
						</a>
						<a
							href="#contact"
							className="text-sm font-semibold uppercase tracking-[0.02em] hover:text-primary transition-colors"
						>
							Contact
						</a>
					</div>
				</div>
			</div>
		</nav>
  );
}


