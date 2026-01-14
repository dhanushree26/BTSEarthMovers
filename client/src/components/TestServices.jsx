import React from 'react';

const TestServices = () => {
  return (
    <section style={{ padding: '4rem 0', background: '#f0f0f0', textAlign: 'center' }}>
      <div className="container">
        <h2 style={{ color: '#FF9F1C', marginBottom: '2rem' }}>TEST SERVICES SECTION</h2>
        <p>This is a test to see if the services section loads properly.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
          <div style={{ background: 'white', padding: '2rem', borderRadius: '8px' }}>
            <h3>Service 1</h3>
            <p>Test service description</p>
          </div>
          <div style={{ background: 'white', padding: '2rem', borderRadius: '8px' }}>
            <h3>Service 2</h3>
            <p>Test service description</p>
          </div>
          <div style={{ background: 'white', padding: '2rem', borderRadius: '8px' }}>
            <h3>Service 3</h3>
            <p>Test service description</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestServices;