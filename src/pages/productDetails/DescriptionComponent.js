import React, { useState } from 'react';

const DescriptionComponent = ({ description }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className='my-4 shadow p-3 bg-body-tertiary rounded'>
      <h4 className="text-center fw-bold">Description</h4>
      <div>
        {isExpanded ? (
          <div>
            {description}
            <button onClick={toggleDescription} className="btn btn-link text-decoration-none">Show less</button>
          </div>
        ) : (
          <div>
            {description.slice(0, 200)}... 
            {description.length > 200 && (
              <button onClick={toggleDescription} className="btn btn-link text-decoration-none">Show more</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DescriptionComponent;
