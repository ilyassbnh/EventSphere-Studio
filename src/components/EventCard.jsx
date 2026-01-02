import React from 'react';

const EventCard = ({ event, onAddToCart, onEdit }) => {
  return (
    <div className="bento-card d-flex flex-column">
      {/* Image Wrapper */}
      <div className="card-img-wrapper">
        <img
          src={event.image}
          alt={event.name}
          onError={(e) => (e.target.src = 'https://via.placeholder.com/400x300/1a1a1a/ffffff?text=Event')}
        />
        <span className="category-badge">{event.category}</span>
      </div>

      {/* Card Content */}
      <div className="p-4 d-flex flex-column flex-grow-1">
        <h3 className="fw-bold mb-2 text-white" style={{ fontSize: '1.5rem' }}>
          {event.name}
        </h3>
        <p className="text-white-50 small mb-4 flex-grow-1">
          {event.description
            ? event.description.substring(0, 100)
            : "No description available"}
          ...
        </p>

        {/* Footer: Price + Buttons */}
        <div className="d-flex justify-content-between align-items-center mt-auto pt-3 border-top border-secondary border-opacity-25">
          <span className="price-tag">${event.price}</span>
          
          <div className="d-flex align-items-center gap-2">
            {/* Edit Button (Only shows if onEdit is passed) */}
            {onEdit && (
               <button 
                  onClick={() => onEdit(event)}
                  className="edit-btn"
                  title="Edit Event"
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '50%',
                    width: '40px', 
                    height: '40px',
                    color: '#fff'
                  }}
               >
                 ✏️
               </button>
            )}

            {/* Cart Button */}
            <button
              className="action-btn"
              onClick={() => onAddToCart(event)}
            >
              Get Ticket
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;