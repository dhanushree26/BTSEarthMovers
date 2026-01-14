import React, { useEffect, useRef, useState, useCallback } from 'react';
import testImage from '../assets/testimage.png';
import testImage2 from '../assets/testimage2.png';
import './ServicesSection.css';

const ServicesSection = () => {
  const scrollRef = useRef(null);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, scrollLeft: 0 });

  const services = [
    {
      id: 1,
      icon: "🚛",
      title: "Large Scale Earthmoving",
      description: "Comprehensive excavation and earth movement for major construction projects with precision and efficiency."
    },
    {
      id: 2,
      icon: "📍",
      title: "Site Preparation Works",
      description: "Complete site clearing, grading, and preparation for development ensuring optimal foundation conditions."
    },
    {
      id: 3,
      icon: "🔨",
      title: "Aggregate Crushing & Screening",
      description: "High-quality aggregate production and material processing services for construction requirements."
    },
    {
      id: 4,
      icon: "🌱",
      title: "Soil Remediation Works",
      description: "Environmental soil treatment and contamination remediation solutions for sustainable development."
    },
    {
      id: 5,
      icon: "⛰️",
      title: "Rock Excavation",
      description: "Specialized rock breaking and removal for challenging terrain and geological conditions."
    },
    {
      id: 6,
      icon: "⛏️",
      title: "Mining & Quarrying",
      description: "Professional mining operations and quarry development services with safety compliance."
    },
    {
      id: 7,
      icon: "🏗️",
      title: "Demolition",
      description: "Safe and efficient structural demolition and debris removal with environmental considerations."
    },
    {
      id: 8,
      icon: "🛡️",
      title: "Coastal Protection & Rock Revetment",
      description: "Marine engineering and coastal erosion protection solutions for waterfront infrastructure."
    },
    {
      id: 9,
      icon: "🛣️",
      title: "Road Work",
      description: "Complete road construction, maintenance, and infrastructure development for transportation networks."
    },
    {
      id: 10,
      icon: "🔧",
      title: "Equipment Rental & General",
      description: "Professional equipment rental and general contracting services for diverse project requirements."
    }
  ];

  // Smooth scroll function with easing
  const smoothScrollTo = useCallback((targetScrollLeft) => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const startScrollLeft = scrollContainer.scrollLeft;
    const distance = targetScrollLeft - startScrollLeft;
    const duration = 300; // ms
    let startTime = null;

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const animateScroll = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);

      scrollContainer.scrollLeft = startScrollLeft + (distance * easedProgress);

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  }, []);

  // Enhanced drag functionality with text selection prevention
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId = null;

    const handleMouseDown = (e) => {
      setIsDragging(true);
      setIsUserInteracting(true);
      
      // Prevent text selection
      e.preventDefault();
      document.body.style.userSelect = 'none';
      document.body.style.webkitUserSelect = 'none';
      
      setDragStart({
        x: e.pageX - scrollContainer.offsetLeft,
        scrollLeft: scrollContainer.scrollLeft
      });

      scrollContainer.style.cursor = 'grabbing';
      scrollContainer.style.scrollBehavior = 'auto';
    };

    const handleMouseMove = (e) => {
      if (!isDragging) return;
      
      e.preventDefault();
      
      const x = e.pageX - scrollContainer.offsetLeft;
      const walk = (x - dragStart.x) * 1.5; // Scroll speed multiplier
      const newScrollLeft = dragStart.scrollLeft - walk;
      
      // Smooth animation frame for dragging
      if (animationId) cancelAnimationFrame(animationId);
      animationId = requestAnimationFrame(() => {
        scrollContainer.scrollLeft = newScrollLeft;
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      
      // Re-enable text selection
      document.body.style.userSelect = '';
      document.body.style.webkitUserSelect = '';
      
      scrollContainer.style.cursor = 'grab';
      scrollContainer.style.scrollBehavior = 'smooth';
      
      setTimeout(() => setIsUserInteracting(false), 500);
      
      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
    };

    const handleMouseLeave = () => {
      if (isDragging) {
        handleMouseUp();
      }
    };

    // Touch events for mobile
    const handleTouchStart = (e) => {
      setIsDragging(true);
      setIsUserInteracting(true);
      
      const touch = e.touches[0];
      setDragStart({
        x: touch.pageX - scrollContainer.offsetLeft,
        scrollLeft: scrollContainer.scrollLeft
      });
      
      scrollContainer.style.scrollBehavior = 'auto';
    };

    const handleTouchMove = (e) => {
      if (!isDragging) return;
      
      e.preventDefault();
      
      const touch = e.touches[0];
      const x = touch.pageX - scrollContainer.offsetLeft;
      const walk = (x - dragStart.x) * 1.2;
      
      if (animationId) cancelAnimationFrame(animationId);
      animationId = requestAnimationFrame(() => {
        scrollContainer.scrollLeft = dragStart.scrollLeft - walk;
      });
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
      scrollContainer.style.scrollBehavior = 'smooth';
      setTimeout(() => setIsUserInteracting(false), 1000);
      
      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
    };

    // Mouse events
    scrollContainer.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);

    // Touch events
    scrollContainer.addEventListener('touchstart', handleTouchStart, { passive: false });
    scrollContainer.addEventListener('touchmove', handleTouchMove, { passive: false });
    scrollContainer.addEventListener('touchend', handleTouchEnd);

    // Prevent context menu on right click while dragging
    const handleContextMenu = (e) => {
      if (isDragging) e.preventDefault();
    };
    scrollContainer.addEventListener('contextmenu', handleContextMenu);

    return () => {
      scrollContainer.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
      scrollContainer.removeEventListener('touchstart', handleTouchStart);
      scrollContainer.removeEventListener('touchmove', handleTouchMove);
      scrollContainer.removeEventListener('touchend', handleTouchEnd);
      scrollContainer.removeEventListener('contextmenu', handleContextMenu);
      
      // Cleanup
      document.body.style.userSelect = '';
      document.body.style.webkitUserSelect = '';
      
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isDragging, dragStart]);

  // Auto-scroll functionality with smart pausing
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    // Check if device is mobile
    const isMobile = window.innerWidth <= 767;
    if (isMobile) return; // Don't auto-scroll on mobile

    const autoScroll = () => {
      // Don't auto-scroll if user is interacting
      if (isUserInteracting || isDragging) return;

      const cardWidth = scrollContainer.children[0]?.offsetWidth || 0;
      const gap = 32; // 2rem gap
      const scrollAmount = cardWidth + gap;
      
      if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth - 10) {
        // Reset to beginning
        smoothScrollTo(0);
      } else {
        // Scroll to next card
        smoothScrollTo(scrollContainer.scrollLeft + scrollAmount);
      }
    };

    const interval = setInterval(autoScroll, 3000); // Every 3 seconds

    return () => clearInterval(interval);
  }, [isUserInteracting, isDragging, smoothScrollTo]);

  return (
    <section className="services-section">
      {/* Prominent Dot Pattern Background */}
      <div className="grid-background"></div>
      
      <div className="container">
        <div className="services-header">
          <span className="services-subtitle">OUR SERVICES</span>
          <h2 className="services-title">
            Complete Earthmoving & Site Development Solutions
          </h2>
          <p className="services-description">
            Professional infrastructure services delivered with precision, safety, and excellence across all project scales.
          </p>
        </div>

        <div className="services-content-wrapper">
          <div className="services-scroll-container">
            <div className="services-grid" ref={scrollRef}>
              {services.map((service, index) => (
                <div 
                  key={service.id} 
                  className="service-card"
                  style={{ '--delay': `${index * 0.1}s` }}
                >
                  <div className="service-icon">
                    {service.icon}
                  </div>
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-description">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Left Side Image - Desktop Only */}
          <div className="services-image-left-container">
            <img 
              src={testImage2} 
              alt="Earthmoving Equipment Left" 
              className="services-image-left"
            />
          </div>
          
          {/* Right Side Image - Desktop Only */}
          <div className="services-image-container">
            <img 
              src={testImage} 
              alt="Earthmoving Equipment" 
              className="services-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;