import { Cheetah } from "./Cheetah";
import { history, links, projects } from "./data";
import "./styles.css";

function App() {
  return (
    <main className="shell">
      <header className="topbar">
        <a className="wordmark" href="#top" aria-label="Home">
          <span className="mark">AO</span>
          <span>ALSPENCER OMONDI</span>
        </a>
        <nav>
          <a href="#history">History</a>
          <a href="#projects">Projects</a>
          <a href="#origin">Origin</a>
          <a href={links.github} target="_blank" rel="noreferrer">GitHub</a>
          <a href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
        </nav>
      </header>

      <section id="top" className="heroGrid">
        <div className="heroText">
          <p className="status">[ STATUS: BUILDING AGENT API INFRA ] [ ORIGIN: KENYA + HARVEY MUDD ]</p>
          <h1>
            ALSPENCER
            <span>OMONDI</span>
          </h1>
          <p className="intro">
            Founder and engineer building infrastructure for coding agents:
            API endpoints into MCP servers, scoped customer tokens, audit logs,
            and the control plane for what agents are allowed to do.
          </p>
          <div className="ctaRow">
            <a className="cta primary" href="#projects">Inspect work</a>
            <a className="cta" href={links.email}>Email</a>
            <a className="cta" href={links.github} target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </div>
        <Cheetah />
      </section>

      <section className="signalStrip" aria-label="Highlights">
        <div>
          <strong>4</strong>
          <span>YC hackathon wins</span>
        </div>
        <div>
          <strong>40K+</strong>
          <span>users reached through systems I helped build</span>
        </div>
        <div>
          <strong>1,250</strong>
          <span>remittance app signups without paid marketing</span>
        </div>
        <div>
          <strong>44K</strong>
          <span>students in national scholarship pool</span>
        </div>
      </section>

      <section id="history" className="sectionGrid">
        <div className="sectionLabel">
          <p>OPERATIONAL HISTORY</p>
          <span>{history.length} ENTRIES</span>
        </div>
        <div className="timeline">
          {history.map((item) => (
            <article className="historyCard" key={`${item.range}-${item.title}`}>
              <div className="range">[ {item.range} ]</div>
              <div>
                <h2>{item.title}</h2>
                <h3>{item.role}</h3>
                <p>{item.description}</p>
                <div className="tags">
                  {item.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="projects" className="projectSection">
        <div className="sectionLabel wide">
          <p>PROJECT LOG</p>
          <span>AGENTS // API // MONEY MOVEMENT // SPEED</span>
        </div>
        <div className="projectGrid">
          {projects.map((project, index) => (
            <article className="projectCard" key={project.codename}>
              <div className="projectMedia">
                <div className={`orb orb${index + 1}`} />
                <div className="matrix">
                  <span>{project.codename}</span>
                  <span>{project.codename}</span>
                  <span>{project.codename}</span>
                </div>
              </div>
              <div className="projectBody">
                <p>{project.codename}</p>
                <h2>{project.title}</h2>
                <span>{project.description}</span>
                <div className="tags">
                  {project.tags.map((tag) => <b key={tag}>{tag}</b>)}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="origin" className="originPanel">
        <div>
          <p className="sectionKicker">ORIGIN STORY</p>
          <h2>Pressure made me fast. Harvey Mudd made me precise.</h2>
        </div>
        <div className="originText">
          <p>
            I grew up in Kenya without a built-in safety net. I was selected
            into a 192-person high school scholarship cohort from 44,000
            students nationwide, then became one of only two from that group
            chosen to continue school in the United States.
          </p>
          <p>
            That background is why I build with urgency. I test ten approaches
            while others are still choosing one, but I care about the system
            being inspectable, secure, and useful enough for real companies.
          </p>
        </div>
      </section>

      <section className="closing">
        <p>CORE_COMPETENCIES: AGENTIC_API_INFRA // MCP_SERVERS // AUTH_AND_AUDIT // FAST_EXECUTION</p>
        <div>
          <a href={links.github} target="_blank" rel="noreferrer">GITHUB</a>
          <a href={links.linkedin} target="_blank" rel="noreferrer">LINKEDIN</a>
          <a href={links.email}>EMAIL</a>
        </div>
      </section>
    </main>
  );
}

export default App;
