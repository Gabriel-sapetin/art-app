import { useInView } from '../hooks/useInView';
import './TeamPage.css';

export const groupMembers = [
  {
    id: 1,
    name: "Group Member 1",
    role: "Project Lead & Content Architect",
    contribution: "Coordinated research on Module 3: The Western Art History, structured module rewrites, oversaw academic accuracy, and drafted historical reflections.",
    avatarText: "GM1",
    tag: "Editorial & Curation"
  },
  {
    id: 2,
    name: "Group Member 2",
    role: "Lead Interactive Developer & UI Designer",
    contribution: "Designed and engineered the interactive sketchbook, ThreeUI-inspired tactile plate viewer, dynamic magnifying lens, and responsive frontend system.",
    avatarText: "GM2",
    tag: "Engineering & Experience"
  },
  {
    id: 3,
    name: "Group Member 3",
    role: "Classical Antiquities & Prehistoric Specialist",
    contribution: "Authored sections on Paleolithic cave art, stone tool taxonomy (lithic reduction, Acheulean hand axes), and Classical Greek pottery shapes.",
    avatarText: "GM3",
    tag: "Archaeological Research"
  },
  {
    id: 4,
    name: "Group Member 4",
    role: "Medieval Art & Manuscript Archivist",
    contribution: "Curated medieval art disciplines including illuminated manuscripts, Byzantine mosaics, stained glass cathedrals, and the Bayeux Tapestry narrative.",
    avatarText: "GM4",
    tag: "Medieval History"
  },
  {
    id: 5,
    name: "Group Member 5",
    role: "Assessment Designer & Interactive Zone Lead",
    contribution: "Formulated the 10-item Art History quiz, tactile matching game mechanics, progressive clue mystery identification game, and visitor poll.",
    avatarText: "GM5",
    tag: "Pedagogy & Assessment"
  }
];

export const instructorInfo = {
  title: "Course Instructor & Academic Evaluator",
  department: "Department of Humanities & Art Appreciation",
  course: "Art Appreciation (GE-ART) · Midterm Project Evaluation",
  note: "In strict compliance with assignment guidelines, official instructor portrait and full name are designated with curatorial placeholders pending direct classroom presentation and formal consent."
};

export default function TeamPage() {
  const [headerRef, headerVisible] = useInView();
  const [teamRef, teamVisible] = useInView();

  return (
    <section id="team" className="team section">
      <div className="container">
        <div ref={headerRef} className={`fade-in ${headerVisible ? 'visible' : ''}`}>
          <h2 className="section-title">Meet the Creators: Our Team</h2>
          <p className="section-subtitle">Group 3 — Art Appreciation Midterm Project Working Committee</p>
          <div className="section-divider" />
        </div>

        {/* Editorial Introduction */}
        <div className="team__intro-box paper-card">
          <p>
            Welcome to the working directory of <strong>Group 3</strong>. As assigned by our course instructor, our collaborative mission was to transform <em>Module 3: The Western Art History</em> into an original, engaging digital sketchbook. Each member contributed dedicated scholarly research, creative content writing, visual curation, or software development to realize <strong>Atelier Occidental</strong>.
          </p>
          <span className="annotation team__permission-notice">
            ⚖️ Privacy & Ethics Notice: In adherence to university digital privacy protocols, member portraits utilize verified academic profile markers until authorized publication permissions are recorded for open access.
          </span>
        </div>

        {/* Member Directory Grid */}
        <div ref={teamRef} className={`team__grid fade-in ${teamVisible ? 'visible' : ''}`}>
          {groupMembers.map((member) => (
            <article key={member.id} className="team__member-card paper-card">
              <div className="team__avatar-wrap">
                <div className="team__avatar-placeholder">
                  <span className="team__avatar-initials">{member.avatarText}</span>
                  <div className="team__avatar-ring" />
                </div>
                <span className="plate-label team__member-tag">{member.tag}</span>
              </div>

              <div className="team__member-info">
                <span className="plate-label">Group 3 Researcher</span>
                <h3 className="team__member-name">{member.name}</h3>
                <h4 className="team__member-role">{member.role}</h4>
                <p className="team__member-contribution">{member.contribution}</p>
              </div>
            </article>
          ))}
        </div>

        {/* Instructor Section */}
        <div className="team__instructor-wrapper">
          <article className="team__instructor-card paper-card">
            <div className="team__instructor-badge">
              <span className="plate-label">Faculty Mentor</span>
            </div>
            
            <div className="team__instructor-body">
              <div className="team__instructor-avatar">
                <div className="team__instructor-icon">🏛️</div>
                <span className="annotation">Course Faculty</span>
              </div>

              <div className="team__instructor-details">
                <span className="plate-label">{instructorInfo.course}</span>
                <h3 className="team__instructor-title">{instructorInfo.title}</h3>
                <p className="team__instructor-dept">{instructorInfo.department}</p>
                <div className="team__instructor-note">
                  <p><strong>Curatorial Note on Faculty Information:</strong> {instructorInfo.note}</p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
