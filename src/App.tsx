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
          <p className="pill">Founder · Harvey Mudd CS · Kenya</p>
          <h1>Agent infrastructure, built fast.</h1>
          <p>
            I build tools that turn APIs into agent-callable systems with scoped
            access, audit logs, and observability. I care about speed, but I care
            more about making the system inspectable when agents start touching
            production.
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
        <div><b>44K</b><span>national scholarship applicant pool</span></div>
      </section>

      <section id="work" className="section">
        <div className="sectionHead">
          <p>Selected work</p>
          <h2>Infrastructure for agents, APIs, and hard constraints.</h2>
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
          <p className="label">Origin</p>
          <h2>Pressure made me fast. Harvey Mudd made me precise.</h2>
        </div>
        <div>
          <p>
            I grew up in Kenya without a built-in safety net. Out of 44,000
            students, I was selected into a 192-person scholarship cohort, then
            became one of two students chosen from that group to continue school
            in the United States.
          </p>
          <p>
            That background shapes how I build. I move quickly, test aggressively,
            and keep narrowing until the product has a real reason to exist.
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
        <p>I want to talk to people who move fast and care about systems that can actually survive production.</p>
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
