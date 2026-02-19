import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { Hero } from './components/sections/Hero'
import { About } from './components/sections/About'
import { Projects } from './components/sections/Projects'
import { Skills } from './components/sections/Skills'
import { Blog } from './components/sections/Blog'
import { Contact } from './components/sections/Contact'

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
