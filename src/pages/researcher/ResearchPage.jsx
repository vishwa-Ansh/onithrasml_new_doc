import "./ResearchPage.css";

const founders = [
    {
        name: "Ansh Vishwakarma",
        role: "Founder & Research Lead",
        image: "/images/research/founder-01.jpg",
        description:
            "Founder of OnithrasML, leading the vision, architecture, scientific computing foundation, machine learning library development, documentation, and open-source ecosystem. Focused on building a practical and accessible platform where developers can learn, experiment, research, and contribute.",
        areas: [
            "Scientific Computing",
            "Machine Learning",
            "Python",
            "Open Source"
        ],
        github: "https://github.com/vishwa-Ansh",
        linkedin: "https://www.linkedin.com/in/ansh-vishwakarma-2b55b4361/"
        
    },
    {
        name: "Nitish Vishwakarma",
        role: "Co-Founder & AI/ML Researcher",
        image: "/images/research/founder-02.jpg",
        description:
            "Working across Large Language Models, Natural Language Processing, Transformer architectures, Data Science, Machine Learning, and Deep Learning. Contributing to the research direction of OnithrasML and exploring intelligent, scalable machine learning systems.",
        areas: [
            "LLMs",
            "NLP",
            "Transformers",
            "Data Science",
            "Deep Learning"
        ],
        github: "https://github.com/nitiish877",
        linkedin: "https://www.linkedin.com/in/nitish-vishwakarma-1590683a3/"
        
    }
];

const researchers = [
    {
        name: "Shubham yadav",
        role: "Deep Researcher",
        area: "Machine Learning",
        image: "/images/research/researcher-01.jpg"
    },
    {
        name: "Nitish vishwakarma ",
        role: "Scientific Computing Researcher",
        area: "Scientific Computing",
        image: "/images/research/founder-02.jpg",
        
    },
    {
        name:"Ansh vishwakarma",
        role: "Numerical Methods Researcher",
        area: "Numerical Methods",
        image: "/images/research/founder-01.jpg",
        
    },
    // {
    //     name: "Researcher Name",
    //     role: "Linear Algebra Researcher",
    //     area: "Linear Algebra",
    //     image: "/images/research/researcher-04.jpg"
    // },
    // {
    //     name: "Researcher Name",
    //     role: "Optimization Researcher",
    //     area: "Optimization",
    //     image: "/images/research/researcher-05.jpg"
    // }
];

const teamMembers = [

    {
        name: "Nitish vishwakarma",
        role: "ML Engineer, Deep learning & Transformer Architecture Designer",
        image: "/images/research/founder-02.jpg",
        github: "https://github.com/nitiish877",
        linkedin: "https://www.linkedin.com/in/nitish-vishwakarma-1590683a3/"
    },
    {
        name: "Ansh vishwakarma",
        role: "Software Engineer, Deep learning, C++ High prowed backend developer",
        image: "/images/research/founder-01.jpg",
        github: "https://github.com/vishwa-Ansh",
        linkedin: "https://www.linkedin.com/in/ansh-vishwakarma-2b55b4361/"
    },
   
    // {
    //     name: "Team Member",
    //     role: "Developer Experience",
    //     image: "/images/research/team-03.jpg",
    //     github: "#",
    //     linkedin: "#"
    // }
];

const researchAreas = [
    {
        number: "01",
        title: "Scientific Computing",
        text: "Numerical methods, computational mathematics, and efficient scientific workflows."
    },
    {
        number: "02",
        title: "Machine Learning",
        text: "Practical algorithms, model development, evaluation, and learning systems."
    },
    {
        number: "03",
        title: "Deep Learning",
        text: "Neural architectures, representation learning, and modern deep learning systems."
    },
    {
        number: "04",
        title: "NLP & LLMs",
        text: "Language models, transformers, natural language processing, and intelligent systems."
    },
    {
        number: "05",
        title: "Numerical Methods",
        text: "Optimization, linear algebra, numerical algorithms, and mathematical foundations."
    }
];

export default function ResearchPage() {
    return (
        <main className="research-page">
            <section className="research-hero">
                <div className="research-hero-grid" />

                <div className="research-hero-content">
                    <div className="research-eyebrow">
                        ONITHRASML / RESEARCH
                    </div>

                    <h1>
                        Researching the
                        <span> foundations</span>
                        <br />
                        of intelligent systems.
                    </h1>

                    <p>
                        We explore scientific computing,
                        mathematical foundations, machine
                        learning, deep learning, and modern
                        AI systems to build the next generation
                        of accessible research tools.
                    </p>

                    <div className="hero-stats">
                        <div>
                            <strong>1.2+</strong>
                            <span>Research Areas</span>
                        </div>

                        <div>
                            <strong>02</strong>
                            <span>Founders</span>
                        </div>

                        <div>
                            <strong>∞</strong>
                            <span>Ideas to Explore</span>
                        </div>
                    </div>
                </div>

                <div className="hero-mark">
                    <span>O</span>
                    <small>RESEARCH</small>
                </div>
            </section>

            <section className="research-introduction">
                <div className="section-number">
                    01
                </div>

                <div className="intro-content">
                    <div className="section-label">
                        RESEARCH VISION
                    </div>

                    <h2>
                        From mathematical
                        foundations to
                        intelligent systems.
                    </h2>

                    <p>
                        OnithrasML is being developed around
                        the idea that machine learning should
                        not be treated as a black box. Our
                        research connects mathematics,
                        numerical computation, algorithms,
                        and modern AI into practical systems
                        that developers can understand and
                        build upon.
                    </p>
                </div>
            </section>

            <section className="founders-section">
                <div className="section-top">
                    <div>
                        <div className="section-label">
                            02 / FOUNDERS
                        </div>

                        <h2>
                            The people shaping
                            the vision.
                        </h2>
                    </div>

                    <p>
                        OnithrasML is driven by a founding
                        team focused on combining research,
                        engineering, and open-source
                        development.
                    </p>
                </div>

                <div className="founders-grid">
                    {founders.map((founder, index) => (
                        <article
                            className="founder-card"
                            key={founder.name}
                        >
                            <div className="founder-number">
                                0{index + 1}
                            </div>

                            <div className="founder-image">
                                <img
                                    src={founder.image}
                                    alt={founder.name}
                                />

                                <div className="image-overlay">
                                    <span>
                                        ONITHRASML
                                    </span>
                                </div>
                            </div>

                            <div className="founder-body">
                                <div className="founder-role">
                                    {founder.role}
                                </div>

                                <h3>
                                    {founder.name}
                                </h3>

                                <p>
                                    {founder.description}
                                </p>

                                <div className="founder-areas">
                                    {founder.areas.map(
                                        (area) => (
                                            <span
                                                key={area}
                                            >
                                                {area}
                                            </span>
                                        )
                                    )}
                                </div>

                                <div className="founder-links">
                                    <a
                                        href={founder.github}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        GitHub
                                        <span>↗</span>
                                    </a>

                                    <a
                                        href={
                                            founder.linkedin
                                        }
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        LinkedIn
                                        <span>↗</span>
                                    </a>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <section className="research-team-section">
                <div className="section-top">
                    <div>
                        <div className="section-label">
                            03 / RESEARCH TEAM
                        </div>

                        <h2>
                            Different disciplines.
                            One direction.
                        </h2>
                    </div>

                    <p>
                        Researchers working across
                        mathematical, computational, and
                        machine learning disciplines.
                    </p>
                </div>

                <div className="researchers-grid">
                    {researchers.map(
                        (researcher, index) => (
                            <article
                                className="researcher-card"
                                key={index}
                            >
                                <div className="researcher-image">
                                    <img
                                        src={
                                            researcher.image
                                        }
                                        alt={
                                            researcher.name
                                        }
                                    />

                                    <span>
                                        0{index + 1}
                                    </span>
                                </div>

                                <div className="researcher-body">
                                    <div>
                                        {
                                            researcher.area
                                        }
                                    </div>

                                    <h3>
                                        {
                                            researcher.name
                                        }
                                    </h3>

                                    <p>
                                        {
                                            researcher.role
                                        }
                                    </p>
                                </div>
                            </article>
                        )
                    )}
                </div>
            </section>

            <section className="core-team-section">
                <div className="core-team-heading">
                    <div className="section-label">
                        04 / CORE TEAM
                    </div>

                    <h2>
                        Turning research
                        into reality.
                    </h2>

                    <p>
                        The engineering team transforms
                        research ideas into reliable software,
                        tools, documentation, and developer
                        experiences.
                    </p>
                </div>

                <div className="team-members-grid">
                    {teamMembers.map(
                        (member, index) => (
                            <article
                                className="team-member-card"
                                key={index}
                            >
                                <div className="team-member-image">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                    />
                                </div>

                                <div className="team-member-content">
                                    <span>
                                        TEAM · 0
                                        {index + 1}
                                    </span>

                                    <h3>
                                        {member.name}
                                    </h3>

                                    <p>
                                        {member.role}
                                    </p>

                                    <div className="member-links">
                                        <a
                                            href={
                                                member.github
                                            }
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            GitHub ↗
                                        </a>

                                        <a
                                            href={
                                                member.linkedin
                                            }
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            LinkedIn ↗
                                        </a>
                                    </div>
                                </div>
                            </article>
                        )
                    )}
                </div>
            </section>

            <section className="research-areas-section">
                <div className="research-areas-header">
                    <div className="section-label">
                        05 / RESEARCH AREAS
                    </div>

                    <h2>
                        Where curiosity
                        <span> becomes research.</span>
                    </h2>
                </div>

                <div className="research-area-list">
                    {researchAreas.map((area) => (
                        <article
                            className="research-area-row"
                            key={area.number}
                        >
                            <span className="area-number">
                                {area.number}
                            </span>

                            <h3>
                                {area.title}
                            </h3>

                            <p>
                                {area.text}
                            </p>

                            <span className="area-arrow">
                                ↗
                            </span>
                        </article>
                    ))}
                </div>
            </section>

            <section className="research-closing">
                <div className="closing-line" />

                <div className="closing-content">
                    <div className="section-label">
                        ONITHRASML RESEARCH
                    </div>

                    <h2>
                        Build.
                        <span> Research.</span>
                        <br />
                        Discover.
                    </h2>

                    <p>
                        We are building an environment where
                        ideas can move from mathematical
                        foundations to working systems.
                    </p>
                </div>

                <div className="closing-symbol">
                    O
                </div>
            </section>
        </main>
    );
}