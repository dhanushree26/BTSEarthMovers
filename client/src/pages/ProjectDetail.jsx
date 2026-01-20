import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { projectsData } from '../projectsData';
import { ArrowLeft } from 'lucide-react';
import './ProjectDetail.css';

const ProjectDetail = () => {
  const { id } = useParams();
  const project = projectsData.find(p => p.id === parseInt(id));

  if (!project) {
    return (
      <div className="project-detail-page">
        <div className="container section-padding">
          <div className="project-not-found">
            <h1>Project Not Found</h1>
            <p>The project you're looking for doesn't exist.</p>
            <Link to="/projects" className="btn">
              ← Back to Projects
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="project-detail-page">
      {/* Header */}
      <div className="project-detail-header">
        <div className="container">
          <Link to="/projects" className="back-link">
            <ArrowLeft size={20} />
            Back to Projects
          </Link>
          <div className="project-title-section">
            <div className="project-meta">
              <span className="project-category">{project.category}</span>
              <span className={`project-status ${project.status.toLowerCase()}`}>
                {project.status}
              </span>
            </div>
            <h1 className="project-title">{project.name}</h1>
            <div className="project-location">
              <span className="location-icon">📍</span>
              {project.location}
            </div>
          </div>
        </div>
      </div>

      <div className="section-padding container">
        <div className="project-detail-content">
          {/* Main Content */}
          <div className="project-main-content">
            {/* Project Description */}
            <div className="content-section">
              <h2 className="section-title">Project Overview</h2>
              <p className="project-description">{project.description}</p>
            </div>

            {/* Scope of Work */}
            <div className="content-section">
              <h2 className="section-title">Scope of Work</h2>
              <p className="project-scope">{project.scope}</p>
            </div>

            {/* Machinery Used */}
            <div className="content-section">
              <h2 className="section-title">Machinery & Equipment</h2>
              <p className="project-machinery">{project.machinery}</p>
            </div>

            {/* Challenges & Solutions */}
            {project.challenges && (
              <div className="content-section">
                <h2 className="section-title">Challenges & Solutions</h2>
                <p className="project-challenges">{project.challenges}</p>
              </div>
            )}

            {/* Image Placeholder */}
            <div className="content-section">
              <h2 className="section-title">Project Images</h2>
              <div className="image-placeholder">
                <div className="placeholder-content">
                  <span className="placeholder-icon">🖼️</span>
                  <p>Project images will be added here</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="project-sidebar">
            <div className="project-info-card">
              <h3 className="info-card-title">Project Information</h3>
              
              <div className="info-item">
                <span className="info-label">Status</span>
                <span className={`info-value project-status ${project.status.toLowerCase()}`}>
                  {project.status}
                </span>
              </div>

              <div className="info-item">
                <span className="info-label">Category</span>
                <span className="info-value">{project.category}</span>
              </div>

              <div className="info-item">
                <span className="info-label">Location</span>
                <span className="info-value">{project.location}</span>
              </div>

              <div className="info-item">
                <span className="info-label">Duration</span>
                <span className="info-value">{project.duration}</span>
              </div>
            </div>

            {/* Related Projects */}
            <div className="related-projects">
              <h3 className="related-title">Related Projects</h3>
              {projectsData
                .filter(p => p.id !== project.id && p.category === project.category)
                .slice(0, 3)
                .map(relatedProject => (
                  <Link 
                    key={relatedProject.id} 
                    to={`/projects/${relatedProject.id}`}
                    className="related-project-link"
                  >
                    <div className="related-project-card">
                      <h4 className="related-project-name">{relatedProject.name}</h4>
                      <p className="related-project-location">{relatedProject.location}</p>
                      <span className={`related-project-status ${relatedProject.status.toLowerCase()}`}>
                        {relatedProject.status}
                      </span>
                    </div>
                  </Link>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;