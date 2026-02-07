import React from 'react';
import { projectsData } from '../projectsData';
import './Projects.css';

const Projects = () => {
  const completedProjects = projectsData.filter(project => project.status === "Completed");
  const ongoingProjects = projectsData.filter(project => project.status === "Ongoing");

  const ProjectCard = ({ project }) => (
    <div className="project-card">
      <div className="project-header">
        <div className="project-category">{project.category}</div>
        <div className={`project-status ${project.status.toLowerCase()}`}>
          {project.status}
        </div>
      </div>
      <h3 className="project-name">{project.name}</h3>
      <div className="project-location">
        <span className="location-icon">📍</span>
        {project.location}
      </div>
      <p className="project-summary">{project.summary}</p>
    </div>
  );

  return (
    <div className="projects-page">
      {/* Header */}
      <div className="projects-page-header">
        <div className="container">
          <h1 className="page-title">Earthmoving & Infrastructure Projects</h1>
          <p className="page-subtitle">Showcase of our completed and ongoing earthmoving, excavation, and construction works across Tamil Nadu and India. Professional project execution with modern equipment and experienced teams.</p>
        </div>
      </div>

      <div className="section-padding container">
        {/* Completed Projects */}
        <div className="projects-category-section">
          <h2 className="category-title">
            Completed Projects
            <span className="project-count">({completedProjects.length})</span>
          </h2>
          <div className="projects-grid">
            {completedProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>

        {/* Ongoing Projects */}
        <div className="projects-category-section">
          <h2 className="category-title">
            Ongoing Projects
            <span className="project-count">({ongoingProjects.length})</span>
          </h2>
          <div className="projects-grid">
            {ongoingProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;