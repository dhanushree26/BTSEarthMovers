import React from 'react';
import './ProjectsSection.css';

const ProjectsSection = () => {
  const projects = [
    // Completed Projects
    {
      id: 1,
      name: "Highway Expansion Project",
      type: "Road Work",
      location: "Chennai - Bangalore Highway",
      status: "Completed",
      description: "Major highway expansion including earthmoving and road construction for improved traffic flow."
    },
    {
      id: 2,
      name: "Industrial Site Development",
      type: "Earthmoving",
      location: "Coimbatore Industrial Area",
      status: "Completed",
      description: "Complete site preparation and grading for large-scale industrial complex development."
    },
    {
      id: 3,
      name: "Residential Complex Foundation",
      type: "Site Preparation",
      location: "Thottipalayam, Coimbatore",
      status: "Completed",
      description: "Site clearing and foundation preparation for 200-unit residential development project."
    },
    {
      id: 4,
      name: "Mining Operations Support",
      type: "Mining",
      location: "Salem District",
      status: "Completed",
      description: "Heavy equipment support and material handling for granite quarry operations."
    },
    {
      id: 5,
      name: "Bridge Construction Support",
      type: "Infrastructure",
      location: "Erode - Karur Route",
      status: "Completed",
      description: "Earthmoving and site preparation for major bridge construction project."
    },
    {
      id: 6,
      name: "Airport Runway Extension",
      type: "Infrastructure",
      location: "Coimbatore Airport",
      status: "Completed",
      description: "Precision earthmoving and grading for airport runway extension and taxiway development."
    },

    // Ongoing Projects
    {
      id: 7,
      name: "Smart City Infrastructure",
      type: "Urban Development",
      location: "Coimbatore Smart City",
      status: "Ongoing",
      description: "Comprehensive infrastructure development including roads, utilities, and site preparation."
    },
    {
      id: 8,
      name: "Industrial Park Development",
      type: "Earthmoving",
      location: "Tirupur Industrial Zone",
      status: "Ongoing",
      description: "Large-scale earthmoving and site development for new industrial park complex."
    },
    {
      id: 9,
      name: "Coastal Protection Works",
      type: "Marine Engineering",
      location: "Rameswaram Coast",
      status: "Ongoing",
      description: "Rock revetment and coastal erosion protection for critical shoreline infrastructure."
    },
    {
      id: 10,
      name: "Township Road Network",
      type: "Road Work",
      location: "Pollachi Township",
      status: "Ongoing",
      description: "Complete road network development for new residential township project."
    },
    {
      id: 11,
      name: "Quarry Expansion Project",
      type: "Mining",
      location: "Dharmapuri District",
      status: "Ongoing",
      description: "Quarry expansion and modernization with advanced crushing and screening operations."
    },
    {
      id: 12,
      name: "Metro Rail Foundation",
      type: "Infrastructure",
      location: "Coimbatore Metro Phase 2",
      status: "Ongoing",
      description: "Foundation work and earthmoving support for metro rail expansion project."
    }
  ];

  const completedProjects = projects.filter(project => project.status === "Completed");
  const ongoingProjects = projects.filter(project => project.status === "Ongoing");

  const ProjectCard = ({ project }) => (
    <div className="project-card">
      <div className="project-header">
        <div className="project-type">{project.type}</div>
        <div className={`project-status ${project.status.toLowerCase()}`}>
          {project.status}
        </div>
      </div>
      <h3 className="project-name">{project.name}</h3>
      <div className="project-location">
        <span className="location-icon">📍</span>
        {project.location}
      </div>
      <p className="project-description">{project.description}</p>
    </div>
  );

  return (
    <section className="projects-section">
      <div className="container">
        <div className="projects-header">
          <span className="projects-subtitle">OUR PROJECTS</span>
          <h2 className="projects-title">
            Projects we have successfully completed and are currently executing
          </h2>
        </div>

        {/* Completed Projects */}
        <div className="projects-category">
          <h3 className="category-title">Completed Projects</h3>
          <div className="projects-grid">
            {completedProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>

        {/* Ongoing Projects */}
        <div className="projects-category">
          <h3 className="category-title">Ongoing Projects</h3>
          <div className="projects-grid">
            {ongoingProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;