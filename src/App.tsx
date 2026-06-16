import { ParticleCheetah } from "./ParticleCheetah";
import { history, links, projects } from "./data";
import "./styles.css";

function App() {
  return (
    <main>
      <header className="nav">
        <a className="brand" href="#top">Alspencer Omondi</a>
        <nav>
          <a href="#work">Work</a>
          <a href="#story">Story</a>
          <a href={links.github} target="_blank" rel="noreferrer">GitHub</a>
          <a href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
        </nav>
      </header>

      <section id="top" className="hero">
        <div className="heroText">
          <p className="pill">Founder · Engineer · Harvey Mudd CS</p>
          <h1>Infrastructure for agentic software.</h1>
          <p>
            I’m building PreMan, a verification and control layer for AI agents,
            APIs, and MCP-powered workflows. The goal is to make agent actions
            secure, observable, and production-ready.
          </p>
          <div className="actions">
            <a className="button dark" href="#work">See work</a>
            <a className="button" href={links.email}>Email me</a>
          </div>
        </div>
        <ParticleCheetah />
      </section>

      <section className="stats">
        <div><b>4</b><span>YC hackathon wins</span></div>
        <div><b>40K+</b><span>users reached through systems I helped build</span></div>
        <div><b>1,250</b><span>remittance app signups</span></div>
        <div><b>44K</b><span>student scholarship applicant pool</span></div>
      </section>

      <section id="work" className="section">
        <div className="sectionHead">
          <p>Selected work</p>
          <h2>Infrastructure for agents, APIs, and production workflows.</h2>
        </div>
        <div className="featureGrid">
          {projects.map((project) => {
            const Wrapper = project.href ? "a" : "article";
            return (
            <Wrapper className="feature" key={project.title} href={project.href} target={project.href ? "_blank" : undefined} rel={project.href ? "noreferrer" : undefined}>
              <span>{project.codename}</span>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="tagRow">
                {project.tags.map((tag) => <small key={tag}>{tag}</small>)}
              </div>
            </Wrapper>
          )})}
        </div>
      </section>

      <section id="story" className="story">
        <div>
          <p className="label">Background</p>
          <h2>Building with urgency and technical rigor.</h2>
        </div>
        <div>
          <p>
            I was selected from a pool of 44,000 students for a competitive
            scholarship program that shaped my path to Harvey Mudd College.
          </p>
          <p>
            At Harvey Mudd, I have focused on pairing speed with rigor. My work
            sits at the edge of APIs, agents, auth, and developer experience,
            where the hard part is making systems safe, inspectable, and useful
            for real teams.
          </p>
        </div>
      </section>

      <section className="history">
        <div className="sectionHead compact">
          <p>Operational history</p>
          <h2>What I have been building.</h2>
        </div>
        {history.map((item) => (
          <article className="historyRow" key={`${item.range}-${item.title}`}>
            <span>{item.range}</span>
            <div>
              <h3>{item.title}</h3>
              <b>{item.role}</b>
              <p>{item.description}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="finalCta">
        <h2>Building around agents, APIs, or infrastructure?</h2>
        <p>I want to talk to teams working on reliable agent workflows, developer infrastructure, and production systems.</p>
        <div className="actions">
          <a className="button dark" href={links.email}>Email</a>
          <a className="button" href={links.github} target="_blank" rel="noreferrer">GitHub</a>
          <a className="button" href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </section>
    </main>
  );
}

export default App;
