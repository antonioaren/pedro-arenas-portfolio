import { Github, Linkedin, Mail, ExternalLink, Code, Database, Globe, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import Link from "next/link"

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-sm border-b z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Pedro Arenas</h1>
            <div className="hidden md:flex space-x-6">
              <a href="#about" className="hover:text-primary transition-colors">
                About
              </a>
              <a href="#projects" className="hover:text-primary transition-colors">
                Projects
              </a>
              <a href="#skills" className="hover:text-primary transition-colors">
                Skills
              </a>
              <a href="#contact" className="hover:text-primary transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero/About Section */}
      <section id="about" className="pt-20 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                Senior Full‑Stack
                <span className="text-primary block">Developer</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Senior Full‑Stack Developer with 8+ years of experience designing, building, and deploying scalable,
                robust, business‑driven web applications. I specialize in JavaScript & TypeScript and Python/Django,
                with a focus on clean architecture and delivering solutions that create real impact on users and
                business.
              </p>
              <div className="flex space-x-4">
                <Button asChild>
                  <a href="#contact">Get In Touch</a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/resume.pdf" target="_blank" rel="noreferrer">
                    Download Resume
                  </a>
                </Button>
              </div>
              <div className="flex space-x-4 mt-8">
                <Link href="https://github.com" className="text-muted-foreground hover:text-primary transition-colors">
                  <Github className="w-6 h-6" />
                </Link>
                <Link
                  href="https://linkedin.com"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Linkedin className="w-6 h-6" />
                </Link>
                <Link
                  href="mailto:pedro@example.com"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="w-6 h-6" />
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 p-8">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="Alex Johnson"
                  width={400}
                  height={400}
                  className="rounded-xl object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Here are some of my recent projects that showcase my skills and experience in full-stack development.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project 1 */}
            <Card className="group hover:shadow-lg transition-shadow">
              <CardHeader className="p-0">
                <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 rounded-t-lg relative overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=200&width=350"
                    alt="E-commerce Platform"
                    width={350}
                    height={200}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="mb-2">E-commerce Platform Architecture</CardTitle>
                <CardDescription className="mb-4">
                  Led the technical design and implementation of a scalable e-commerce platform using clean architecture
                  principles, serving thousands of users with high performance.
                </CardDescription>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">Next.js</Badge>
                  <Badge variant="secondary">TypeScript</Badge>
                  <Badge variant="secondary">PostgreSQL</Badge>
                  <Badge variant="secondary">AWS</Badge>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" asChild>
                    <Link href="https://github.com">
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link href="https://demo.com">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Project 2 */}
            <Card className="group hover:shadow-lg transition-shadow">
              <CardHeader className="p-0">
                <div className="aspect-video bg-gradient-to-br from-green-500 to-teal-600 rounded-t-lg relative overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=200&width=350"
                    alt="Task Management App"
                    width={350}
                    height={200}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="mb-2">Team Management Dashboard</CardTitle>
                <CardDescription className="mb-4">
                  Built a comprehensive team management system as Tech Lead at Buscorepuestos, leading a team of four
                  developers through the full development lifecycle.
                </CardDescription>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">Vue.js</Badge>
                  <Badge variant="secondary">Node.js</Badge>
                  <Badge variant="secondary">MongoDB</Badge>
                  <Badge variant="secondary">GitHub Actions</Badge>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" asChild>
                    <Link href="https://github.com">
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link href="https://demo.com">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Project 3 */}
            <Card className="group hover:shadow-lg transition-shadow">
              <CardHeader className="p-0">
                <div className="aspect-video bg-gradient-to-br from-orange-500 to-red-600 rounded-t-lg relative overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=200&width=350"
                    alt="Weather App"
                    width={350}
                    height={200}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="mb-2">International Freelance Platform</CardTitle>
                <CardDescription className="mb-4">
                  Delivered a complete freelance marketplace from technical design to go-live, handling international
                  payments and multi-language support.
                </CardDescription>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">React</Badge>
                  <Badge variant="secondary">Django</Badge>
                  <Badge variant="secondary">DynamoDB</Badge>
                  <Badge variant="secondary">AWS Lambda</Badge>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" asChild>
                    <Link href="https://github.com">
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link href="https://demo.com">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Skills</h2>
            <p className="text-lg text-muted-foreground">Technologies and tools I work with to bring ideas to life.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Frontend */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Frontend</h3>
              <div className="space-y-2">
                <Badge variant="outline" className="mr-2 mb-2">
                  React
                </Badge>
                <Badge variant="outline" className="mr-2 mb-2">
                  Vue.js
                </Badge>
                <Badge variant="outline" className="mr-2 mb-2">
                  Angular
                </Badge>
                <Badge variant="outline" className="mr-2 mb-2">
                  Next.js
                </Badge>
                <Badge variant="outline" className="mr-2 mb-2">
                  Nuxt
                </Badge>
                <Badge variant="outline" className="mr-2 mb-2">
                  TypeScript
                </Badge>
              </div>
            </div>

            {/* Backend */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Database className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Backend</h3>
              <div className="space-y-2">
                <Badge variant="outline" className="mr-2 mb-2">
                  Node.js
                </Badge>
                <Badge variant="outline" className="mr-2 mb-2">
                  Python
                </Badge>
                <Badge variant="outline" className="mr-2 mb-2">
                  Django
                </Badge>
                <Badge variant="outline" className="mr-2 mb-2">
                  PostgreSQL
                </Badge>
                <Badge variant="outline" className="mr-2 mb-2">
                  MongoDB
                </Badge>
                <Badge variant="outline" className="mr-2 mb-2">
                  DynamoDB
                </Badge>
              </div>
            </div>

            {/* Cloud & DevOps */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Cloud & DevOps</h3>
              <div className="space-y-2">
                <Badge variant="outline" className="mr-2 mb-2">
                  AWS
                </Badge>
                <Badge variant="outline" className="mr-2 mb-2">
                  EC2
                </Badge>
                <Badge variant="outline" className="mr-2 mb-2">
                  S3
                </Badge>
                <Badge variant="outline" className="mr-2 mb-2">
                  CloudFront
                </Badge>
                <Badge variant="outline" className="mr-2 mb-2">
                  RDS
                </Badge>
                <Badge variant="outline" className="mr-2 mb-2">
                  Lambdas
                </Badge>
                <Badge variant="outline" className="mr-2 mb-2">
                  GitHub Actions
                </Badge>
              </div>
            </div>

            {/* Mobile */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Testing & Architecture</h3>
              <div className="space-y-2">
                <Badge variant="outline" className="mr-2 mb-2">
                  MSW
                </Badge>
                <Badge variant="outline" className="mr-2 mb-2">
                  Pacts
                </Badge>
                <Badge variant="outline" className="mr-2 mb-2">
                  E2E Testing
                </Badge>
                <Badge variant="outline" className="mr-2 mb-2">
                  Clean Architecture
                </Badge>
                <Badge variant="outline" className="mr-2 mb-2">
                  Hexagonal Architecture
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
            <p className="text-lg text-muted-foreground">
              I'm always interested in new opportunities and collaborations. Let's discuss your project!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h3 className="text-2xl font-semibold mb-6">Let's Connect</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <span>alex.johnson@example.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Github className="w-5 h-5 text-primary" />
                  <span>github.com/alexjohnson</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Linkedin className="w-5 h-5 text-primary" />
                  <span>linkedin.com/in/alexjohnson</span>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="text-lg font-semibold mb-4">Currently Available For</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Freelance opportunities</li>
                  <li>• Tech Lead positions</li>
                  <li>• Senior engineering roles</li>
                  <li>• Architecture consulting</li>
                </ul>
              </div>
            </div>

            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle>Send a Message</CardTitle>
                <CardDescription>Fill out the form below and I'll get back to you as soon as possible.</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="John" />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john@example.com" />
                  </div>
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="Project Collaboration" />
                  </div>
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="Tell me about your project or opportunity..." rows={4} />
                  </div>
                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-muted-foreground">© 2024 Alex Johnson. Built with Next.js and deployed on Vercel.</p>
        </div>
      </footer>
    </div>
  )
}
