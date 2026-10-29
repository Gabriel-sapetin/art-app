import { useInView } from '../hooks/useInView';
import './TeamPage.css';

export const creators = {
  // Top tier (3 members) — Ruby sticks to top apex
  top: [
    {
      id: 'marian',
      name: 'Marian Mae M. Eyac',
      role: 'Project Contributor',
      roleDescription: 'Assisted to develop the project',
      photo: '/assets/marian.jpg',
      position: 'side-left',
    },
    {
      id: 'ruby',
      name: 'Princess Ruby E. Lagunda',
      role: 'Project Contributor',
      roleDescription: 'Assisted to develop the project',
      photo: '/assets/ruby.jpg',
      position: 'apex-top',
    },
    {
      id: 'kerstine',
      name: 'Kerstine Liegh Compe',
      role: 'Project Contributor',
      roleDescription: 'Assisted to develop the project',
      photo: '/assets/kerstine.jpg',
      position: 'side-right',
    },
  ],
  // Center tier (Main lead: Gab)
  lead: {
    id: 'gab',
    name: 'Gabriel L. Sapetin',
    role: 'Project Lead',
    roleDescription: 'Programmed and led the project',
    photo: '/assets/gab.jpg',
    position: 'center-lead',
  },
  // Bottom tier (3 members) — Robert sticks to bottom apex
  bottom: [
    {
      id: 'sam',
      name: 'Sam Dabgate Lipao',
      role: 'Project Contributor',
      roleDescription: 'Assisted to develop the project',
      photo: '/assets/sam.jpg',
      position: 'side-left',
    },
    {
      id: 'robert',
      name: 'Rober Jhon Jorquia',
      role: 'Project Contributor',
      roleDescription: 'Assisted to develop the project',
      photo: '/assets/robert.jpg',
      position: 'apex-bottom',
    },
    {
      id: 'ann',
      name: 'Ann Christia Mejoing Narisma',
      role: 'Project Contributor',
      roleDescription: 'Assisted to develop the project',
      photo: '/assets/ann.jpg',
      position: 'side-right',
    },
  ],
};

export const instructorInfo = {
  name: "Benidict Orejas",
  title: "Course Instructor",
  department: "College of Arts and Sciences (CAS)",
  course: "Art Appreciation",
  courseCode: "GE-ART",
  evaluation: "Midterm Project Evaluation",
  photo: "/assets/instructor.jpg",
};

export default function TeamPage() {
  const [headerRef, headerVisible] = useInView();
  const [teamRef, teamVisible] = useInView({ threshold: 0.05 });

  return (
    <section id="team" className="team section">
      <div className="container">
        {/* Header with Parchment Paper Pad (Matching Sections of Western Art & Reflection) */}
        <div ref={headerRef} className={`team__header scroll-ease-in ${headerVisible ? 'visible' : ''}`} style={{ transitionDelay: '0.04s' }}>
          <div className="team__paper-pad">
            <img
              src="/assets/parchment-paper.avif"
              alt="Parchment manuscript folio"
              className="team__paper-img"
              loading="lazy"
            />
            <div className="team__paper-overlay" />
            <div className="team__header-content">
              <h2 className="section-title">Meet the Creators: Our Team</h2>
              <p className="section-subtitle">Group 3: Art Appreciation Midterm Project Working Committee</p>
              <div className="section-divider" />
            </div>
          </div>
        </div>

        {/* Diamond Arrangement of 7 Members */}
        <div ref={teamRef} className="team__diamond-stage" aria-label="Group 3 Creators Diamond Directory">
          {/* Top Tier: Marian, Ruby (Apex Top), Kerstine */}
          <div className="team__diamond-row team__diamond-row--top">
            {creators.top.map((member, i) => (
              <article
                key={member.id}
                className={`team__creator-card paper-card team__creator-card--${member.position} scroll-ease-in ${teamVisible ? 'visible' : ''}`}
                style={{ transitionDelay: `${0.08 * (i + 1)}s` }}
              >
                <div className="team__creator-portrait-wrap">
                  <img src={member.photo} alt={member.name} className="team__creator-photo" loading="lazy" />
                </div>
                <div className="team__creator-info">
                  <h3 className="team__creator-name">{member.name}</h3>
                  <p className="team__creator-desc">{member.roleDescription}</p>
                </div>
              </article>
            ))}
          </div>

          {/* Center Tier: Gab (Main Lead) */}
          <div className="team__diamond-row team__diamond-row--center">
            <article
              className={`team__creator-card paper-card team__creator-card--lead scroll-ease-in ${teamVisible ? 'visible' : ''}`}
              style={{ transitionDelay: '0.32s' }}
            >
              <div className="team__creator-portrait-wrap team__creator-portrait-wrap--lead">
                <img src={creators.lead.photo} alt={creators.lead.name} className="team__creator-photo team__creator-photo--lead" loading="lazy" />
              </div>
              <div className="team__creator-info">
                <h3 className="team__creator-name team__creator-name--lead">{creators.lead.name}</h3>
                <span className="team__creator-role-title">Project Lead</span>
                <p className="team__creator-desc team__creator-desc--lead">{creators.lead.roleDescription}</p>
              </div>
            </article>
          </div>

          {/* Bottom Tier: Sam, Robert (Apex Bottom), Ann */}
          <div className="team__diamond-row team__diamond-row--bottom">
            {creators.bottom.map((member, i) => (
              <article
                key={member.id}
                className={`team__creator-card paper-card team__creator-card--${member.position} scroll-ease-in ${teamVisible ? 'visible' : ''}`}
                style={{ transitionDelay: `${0.4 + 0.08 * i}s` }}
              >
                <div className="team__creator-portrait-wrap">
                  <img src={member.photo} alt={member.name} className="team__creator-photo" loading="lazy" />
                </div>
                <div className="team__creator-info">
                  <h3 className="team__creator-name">{member.name}</h3>
                  <p className="team__creator-desc">{member.roleDescription}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Instructor Section */}
        <div className={`team__instructor-wrapper scroll-ease-in ${teamVisible ? 'visible' : ''}`} style={{ transitionDelay: '0.6s' }}>
          <article className="team__instructor-card paper-card">
            <div className="team__instructor-header">
              <span className="plate-label">Course Instructor</span>
              <div className="team__instructor-divider" />
            </div>

            <div className="team__instructor-body">
              <div className="team__instructor-portrait">
                <div className="team__instructor-photo-wrap">
                  <img
                    src={instructorInfo.photo}
                    alt={instructorInfo.name}
                    className="team__instructor-photo"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="team__instructor-details">
                <h3 className="team__instructor-name">{instructorInfo.name}</h3>
                <p className="team__instructor-title">{instructorInfo.title}</p>
                <p className="team__instructor-dept">{instructorInfo.department}</p>
                <div className="team__instructor-course-bar">
                  <span className="team__instructor-course-label">{instructorInfo.course}</span>
                  <span className="team__instructor-course-code">{instructorInfo.courseCode}</span>
                </div>
                <p className="team__instructor-eval">{instructorInfo.evaluation}</p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

