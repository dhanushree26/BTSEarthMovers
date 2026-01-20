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
      title: "Large Scale Earthmoving Services",
      description: "Professional excavation and earth movement services for major construction and infrastructure projects across Tamil Nadu. Our modern fleet handles residential, commercial, and industrial developments with precision and efficiency."
    },
    {
      id: 2,
      icon: "📍",
      title: "Site Preparation & Development",
      description: "Complete site clearing, grading, and preparation services ensuring optimal foundation conditions for construction projects. We specialize in land development and terrain modification across diverse soil conditions."
    },
    {
      id: 3,
      icon: "🔨",
      title: "Road Construction & Infrastructure",
      description: "Comprehensive road construction services including excavation, grading, and base preparation for highways, residential roads, and commercial access routes throughout Tamil Nadu and neighboring states."
    },
    {
      id: 4,
      icon: "🌱",
      title: "Environmental Earthworks",
      description: "Sustainable earthmoving solutions including soil remediation, environmental restoration, and eco-friendly construction practices for responsible development projects across India."
    },
    {
      id: 5,
      icon: "⛰️",
      title: "Rock Excavation & Blasting",
      description: "Specialized rock breaking, removal, and controlled blasting services for challenging terrain and geological conditions. Expert handling of hard rock excavation for infrastructure projects."
    },
    {
      id: 6,
      icon: "⛏️",
      title: "Mining & Quarrying Support",
      description: "Professional mining operations support and quarry development services with full safety compliance. Experienced in mineral extraction and aggregate production operations."
    },
    {
      id: 7,
      icon: "🏗️",
      title: "Demolition & Site Clearance",
      description: "Safe and efficient structural demolition and debris removal services with environmental considerations. Complete site clearance for redevelopment projects across Tamil Nadu."
    },
    {
      id: 8,
      icon: "🛡️",
      title: "Coastal & Marine Earthworks",
      description: "Specialized marine engineering and coastal protection solutions for waterfront infrastructure projects. Expert handling of coastal erosion control and marine construction support."
    },
    {
      id: 9,
      icon: "🛣️",
      title: "Highway & Transportation Infrastructure",
      description: "Complete highway construction, maintenance, and transportation infrastructure development. Experienced in major road projects and traffic management during construction phases."
    },
    {
      id: 10,
      icon: "🔧",
      title: "Heavy Equipment Rental Services",
      description: "Professional excavator, JCB, and heavy machinery rental services for diverse construction projects. Modern fleet available for short-term and long-term project requirements across India."
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
      const touch = e.touches[0];
      const startX = touch.pageX;
      const startY = touch.pageY;
      
      setDragStart({
        x: startX - scrollContainer.offsetLeft,
        y: startY,
        scrollLeft: scrollContainer.scrollLeft,
        startX,
        startY
      });
      
      scrollContainer.style.scrollBehavior = 'auto';
    };

    const handleTouchMove = (e) => {
      if (!dragStart.startX) return;
      
      const touch = e.touches[0];
      const currentX = touch.pageX;
      const currentY = touch.pageY;
      
      const deltaX = Math.abs(currentX - dragStart.startX);
      const deltaY = Math.abs(currentY - dragStart.startY);
      
      // Only prevent default and handle horizontal drag if horizontal movement is greater
      if (deltaX > deltaY && deltaX > 10) {
        e.preventDefault();
        setIsDragging(true);
        setIsUserInteracting(true);
        
        const x = currentX - scrollContainer.offsetLeft;
        const walk = (x - dragStart.x) * 1.2;
        
        if (animationId) cancelAnimationFrame(animationId);
        animationId = requestAnimationFrame(() => {
          scrollContainer.scrollLeft = dragStart.scrollLeft - walk;
        });
      }
      // Allow vertical scrolling for vertical movements
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
      scrollContainer.style.scrollBehavior = 'smooth';
      setTimeout(() => setIsUserInteracting(false), 1000);
      
      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
      
      // Reset drag start
      setDragStart({ x: 0, scrollLeft: 0 });
    };

    // Mouse events
    scrollContainer.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);

    // Touch events
    scrollContainer.addEventListener('touchstart', handleTouchStart, { passive: true });
    scrollContainer.addEventListener('touchmove', handleTouchMove, { passive: false });
    scrollContainer.addEventListener('touchend', handleTouchEnd, { passive: true });

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
          <span className="services-subtitle">EARTHMOVING SERVICES COIMBATORE</span>
          <h2 className="services-title">
            Complete Earthmoving & Construction Solutions in Tamil Nadu
          </h2>
          <p className="services-description">
            Professional earthmoving, excavation, and heavy machinery services delivered across Coimbatore, Tirupur, Erode, and Tamil Nadu with precision, safety, and excellence for all construction project scales.
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